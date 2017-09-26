var svg = require('svgo');
var loaderUtils = require('loader-utils');
var compiler = require('vue-template-compiler');

module.exports = function (content) {
  var options = loaderUtils.getOptions(this) || {
    plugins: [{removeDoctype: true}, {removeComments: true}],
  };
  var svgo = new svg(options);

  this.cacheable && this.cacheable(true);
  this.addDependency(this.resourcePath);

  var cb = this.async();

  svgo.optimize(content, function (result) {
    if (result.error) {
      return cb(result.error);
    }
    
    var compiled = compiler.compile(result.data, {preserveWhitespace: false});
    cb(null, "module.exports = {render: function () {" + compiled.render + "}};");
  });
};
