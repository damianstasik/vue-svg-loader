const SVGO = require('svgo');
const { getOptions } = require('loader-utils');

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

  callback(null, `<template>${svg.replace('<svg', '<svg v-on="$listeners"')}</template>`)
};
