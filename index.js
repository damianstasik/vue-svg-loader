const svgo = require('svgo');
const loaderUtils = require('loader-utils');
const compiler = require('vue-template-compiler');
const transpile = require('vue-template-es2015-compiler');

module.exports = function (content) {
  const options = loaderUtils.getOptions(this) || {};
  const svg = new svgo(options.svgo || {});
  const path = this.resourcePath;

  this.cacheable && this.cacheable(true);
  this.addDependency(path);

  const cb = this.async();
  let component;

  svg
    .optimize(content, { path })
    .then((result) => {
      const compiled = compiler.compile(result.data, {
        preserveWhitespace: false,
      });
      
      const transpileCode = `var render = function (${options.functional ? '_h,_vm' : ''}) { ${compiled.render} };`;

      const transpileOptions = {
        transforms: {
          stripWith: true,
          stripWithFunctional: options.functional || false
        }
      };

      component = `${transpile(transpileCode, transpileOptions)}\n`;

      if (options.functional) {
        component += 'module.exports = { functional: true, render: render };';
      } else {
        component += 'module.exports = { render: render };';
      }

      cb(null, component);
    })
    .catch(cb);
};
