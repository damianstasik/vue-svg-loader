const { optimize } = require('svgo');
const { getOptions } = require('loader-utils');
const { version } = require('vue');
const semverMajor = require('semver/functions/major')

module.exports = function vueSvgLoader(svg) {
  const { svgo: svgoConfig } = getOptions(this) || {};

  if (svgoConfig !== false) {
    ({ data: svg } = optimize(svg, {
      path: this.resourcePath,
      ...svgoConfig
    }));
  }

  if (semverMajor(version) === 2) {
    svg = svg.replace('<svg', '<svg v-on="$listeners"');
  }

  return `<template>${svg}</template>`;
};
