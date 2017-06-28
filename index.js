var svg = require('svgo');

var svgo = new svg({
    plugins: [
    {removeTitle: true},
    {removeXMLNS: true},
    {removeStyleElement: true},
    {removeScriptElement: true}
  ]
});

module.exports = function (content) {
  this.cacheable && this.cacheable(true);
  this.addDependency(this.resourcePath);

  var cb = this.async();

  svgo.optimize(content, function (result) {
    if (result.error) {
      return cb(result.error);
    }
    cb(null, "module.exports = {template: '" + result.data + "'};");
  });
};
