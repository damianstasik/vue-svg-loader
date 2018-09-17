const SVGO = require('svgo');
const { getOptions } = require('loader-utils');
const { compile } = require('vue-template-compiler');
const stripWith = require('vue-template-es2015-compiler');

function getSvg(content, path, svgoConfig) {
  if (svgoConfig === false) {
    return Promise.resolve(content);
  }

  return new SVGO(svgoConfig)
    .optimize(content, { path })
    .then(result => result.data);
};

module.exports = function (content) {
  const path = this.resourcePath;
  const callback = this.async();
  const options = getOptions(this) || {};

  const {
    svgo: svgoConfig = {},
    functional = false,
  } = options;

  getSvg(content, path, svgoConfig)
    .then((result) => {
      let { render: renderFn } = compile(result, {
        preserveWhitespace: false,
        modules: [
          !!functional && {
            transformNode: (el) => {
              if (el.tag === 'svg') {
                el.classBinding = '[data.class, data.staticClass]';
                el.styleBinding = '[data.style, data.staticStyle]';
              }
            },
          },
        ],
      });

      renderFn = `
        function render(${functional ? '_h, _vm' : ''}) {
          ${renderFn};
        };
      `;

      renderFn = stripWith(renderFn, {
        transforms: {
          stripWithFunctional: !!functional,
        },
      });

      const component = `
        ${renderFn}

        module.exports = {
          ${functional ? 'functional: true,' : ''}
          render: render,
        };
      `;

      callback(null, component);
    })
    .catch(callback);
};
