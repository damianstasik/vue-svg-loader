const { optimize } = require('svgo');
const { version } = require('vue');
const semverMajor = require('semver/functions/major')

const defaultConfig = {
  plugins: [
    {
      name: 'preset-default',
      params: {
        overrides: {
          inlineStyles: {
            //force deletion of <style> tags in order for vue-loader to accept the template (no nested tags with side effects allowed)
            onlyMatchedOnce: false
          }
        }
      }
    }
  ]
}

module.exports = function vueSvgLoader(svg) {
  let { svgo: svgoConfig } = this.getOptions() || {};

  // merge svgoConfig with defaultConfig in order to force inlining <style> tags
  svgoConfig = {...svgoConfig, ...defaultConfig};

  let optimized;
  optimized = optimize(svg, {
    path: this.resourcePath,
    ...svgoConfig
  });
  
  const error = (optimized.modernError || optimized.error) || false

  if(error){
    // we'll throw a fatal error here for now
    // this will stop the current compilation run and make the user aware that at least one of the svgs could not be processed
    throw error;
  }

  let data = optimized.data;

  if (semverMajor(version) === 2) {
    data = data.replace('<svg', '<svg v-on="$listeners"');
  }

  return `<template>${data}</template>`;
};
