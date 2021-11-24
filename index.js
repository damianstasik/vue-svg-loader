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

  const extracted = extractStyle(svg);
  svg = extracted.svg;
  const styles = extracted.styles;

  return `<template>${svg}</template><style scoped>${styles.join('\n')}</style>`;
};

/**
 * Extract all <style> content from SVG content.
 * It also returns svg content from which all <style> elements are removed.
 */
function extractStyle(svg) {
  const styleRE = /<style[^>]*>([\s\S]*?)<\/style>/ig;
  let styles = [];
  let match;

  while (match = styleRE.exec(svg)) {
    const style = match[1];
    styles.push(style);

    const from = match.index;
    const to = from + match[0].length;
    svg = svg.slice(0, from) + svg.slice(to);
    styleRE.lastIndex -= match[0].length;
  }

  return {
    svg,
    styles
  };
}
