var svg = require('svgo');
var compiler = require('vue-template-compiler');

var svgo = new svg({
  plugins: ['removeDoctype', 'removeComments'],
});

module.exports = function (content) {
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
