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
      let template = result.data;

      // https://github.com/vuejs/vue-loader/issues/1014
      if (options.functional) {
        template = template.replace(/<svg([^>]+)>/, `<svg$1 :class="[ data.class, data.staticClass ]" :style="[ data.style, data.staticStyle ]">`);
      }

      const compiled = compiler.compile(template, {
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
