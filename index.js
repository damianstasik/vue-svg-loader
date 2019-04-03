const svgToVue = require('svg-to-vue');
const { getOptions } = require('loader-utils');
const findUp = require('find-up');
const yaml = require('js-yaml');
const fs = require('fs');

module.exports = function (content) {
  const callback = this.async();
  const { svgo } = getOptions(this) || {};

  (async () => {
	let svgoConfig = {}
	try {
		const svgoConfigPath = await findUp('.svgo.yaml')
		svgoConfig = yaml.safeLoad(fs.readFileSync(svgoConfigPath, 'utf8'))
	} catch (err) { }

	svgToVue(content, {
		svgoPath: this.resourcePath,
		svgoConfig: { ...svgoConfig, ...svgo },
	})
	.then(component => callback(null, component))
	.catch(callback);
  })()
};
