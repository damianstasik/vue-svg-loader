const svgo = require('svgo');
const loaderUtils = require('loader-utils');
const compiler = require('vue-template-compiler');
const transpile = require('vue-template-es2015-compiler');

module.exports = function (content) {
  const {
    svgo: svgoOptions = {},
    functional = false,
  } = loaderUtils.getOptions(this) || {};

  const svg = new svgo(svgoOptions);
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
        modules: [
          !!functional && {
            transformNode: (el) => {
              if (el.tag === 'svg') {
                el.classBinding = '[data.class, data.staticClass]';
                el.styleBinding = '[data.style, data.staticStyle]';
              }
            },
          }
        ],
      });
      
      const transpileCode = `var render = function (${functional ? '_h, _vm' : ''}) { ${compiled.render} };`;

      const transpileOptions = {
        transforms: {
          stripWithFunctional: !!functional,
        },
      };

      component = `${transpile(transpileCode, transpileOptions)}\n`;

      if (functional) {
        component += 'module.exports = { functional: true, render: render };';
      } else {
        component += 'module.exports = { render: render };';
      }

      cb(null, component);
    })
    .catch(cb);
};
