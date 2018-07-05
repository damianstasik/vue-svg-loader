const svgo = require('svgo');
const loaderUtils = require('loader-utils');
const compiler = require('vue-template-compiler');
const transpile = require('vue-template-es2015-compiler');

module.exports = function (content) {
  const options = loaderUtils.getOptions(this) || {};
  const svg = new svgo(options.svgo || {});
  const path = this.resourcePath;

  this.cacheable && this.cacheable(true);
  this.addDependency(this.resourcePath);

  const cb = this.async();
  let component;

  svg
    .optimize(content)
    .then((result) => {
      const compiled = compiler.compile(result.data, { preserveWhitespace: false });

      component = transpile(`var render = function () {${compiled.render}};`);
      component += `module.exports = { render };`;

      cb(null, component);
    })
    .catch(cb);
};
