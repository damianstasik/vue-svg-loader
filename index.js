const svgo = require('svgo');
const fs = require("fs");
const loaderUtils = require('loader-utils');
const compiler = require('vue-template-compiler');
const transpile = require('vue-template-es2015-compiler');

function getSvg(content, path, options) {
    const svg = new svgo(options.svgo || {});
    const useSvgo = options.useSvgo === undefined ? true : options.useSvgo;

    return new Promise((resolve, reject) => {
        if (useSvgo) resolve(svg.optimize(content, { path }));
        else {
            fs.readFile(path, "utf8", (err, data) => {
                if (err) reject(err);
                else resolve({ data });
            });
        }
    });
}

module.exports = function (content) {
  const options = loaderUtils.getOptions(this) || {};
  const path = this.resourcePath;

  this.cacheable && this.cacheable(true);
  this.addDependency(this.resourcePath);

  const cb = this.async();
  let component;

  getSvg(content, path, options)
    .then((result) => {
      const compiled = compiler.compile(result.data, { preserveWhitespace: false });

      component = transpile(`var render = function () {${compiled.render}};`);
      component += `var toString = function () {return ${JSON.stringify(path)}};`;
      component += `module.exports = { render: render, toString: toString };`;

      cb(null, component);
    })
    .catch(cb);
};
