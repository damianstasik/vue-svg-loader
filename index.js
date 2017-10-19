var svg = require('svgo');
var compiler = require('vue-template-compiler');
var loaderUtils = require('loader-utils');
var cloneDeep = require('lodash.clonedeep');
var html2json = require('html2json').html2json;
var json2html = require('html2json').json2html;

var svgo = new svg({
  plugins: ['removeDoctype', 'removeComments'],
});

module.exports = function (content) {
  var options = cloneDeep(loaderUtils.getOptions(this) || {});

  this.cacheable && this.cacheable(true);
  this.addDependency(this.resourcePath);

  var cb = this.async();

  svgo.optimize(content, function (result) {
    if (result.error) {
      return cb(result.error);
    }

    var html = result.data;

    if (options.classes) {
        try {
            var json = html2json(html);
            var addClasses = options.classes.split(' ');
            var addedClasses = [];

            if (json.child[0].attr.class) {
                addedClasses = json.child[0].attr.class.split(' ');
            }

            addClasses.forEach(function (className) {
                addedClasses.push(className);
            });

            if (addClasses) {
                json.child[0].attr.class = addedClasses.join(' ');
            }

            html = json2html(json);
        }
        catch(error) {
            return cb(error);
        }
    }

    var compiled = compiler.compile(html, {preserveWhitespace: false});
    cb(null, "module.exports = {render: function () {" + compiled.render + "}};");
  });
};
