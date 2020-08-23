const SVGO = require('svgo');
const { getOptions } = require('loader-utils');
const { version } = require('vue');
const { major } = require('semver')

module.exports = async function (svg) {
  const callback = this.async();
  const { svgo: svgoConfig } = getOptions(this) || {};

  if (svgoConfig !== false) {
    const svgo = new SVGO(svgoConfig);

    try {
      ({ data: svg } = await svgo.optimize(svg, {
        path: this.resourcePath,
      }));
    } catch (error) {
      callback(error);
      return;
    }
  }

  if (major(version) === 2) {
    svg = svg.replace('<svg', '<svg v-on="$listeners"');
  }

  callback(null, `<template>${svg}</template>`)
};
