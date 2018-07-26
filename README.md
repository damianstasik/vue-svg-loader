<p align="center"><img src="docs/.vuepress/public/logo.svg" width="40%"></p>
<h1 align="center">vue-svg-loader</h1>
<p align="center">webpack loader that lets you use SVG files as Vue components</p>
<hr>
<p align="center">
  <a href="https://vue-svg-loader.js.org">Documentation</a> -
  <a href="https://vue-svg-loader.js.org/faq.html">FAQ</a>
</p>

## Installation
``` bash
npm i -D vue-svg-loader
yarn add --dev vue-svg-loader
```

## Basic configuration
### webpack
``` js
module.exports = {
  module: {
    rules: [
      {
        test: /\.svg$/,
        loader: 'vue-svg-loader',
      },
    ],
  },
};
```
### Vue CLI
``` js
module.exports = {
  chainWebpack: (config) => {
    const svgRule = config.module.rule('svg');

    svgRule.uses.clear();

    svgRule
      .use('vue-svg-loader')
      .loader('vue-svg-loader');
  },
};
```

### Nuxt.js
``` js
module.exports = {
  build: {
    extend: (config) => {
      const svgRule = config.module.rules.find(rule => rule.loader === 'url-loader');

      svgRule.test = /\.(png|jpe?g|gif)$/;

      config.module.rules.push({
        test: /\.svg$/,
        loader: 'vue-svg-loader',
      });
    },
  },
};
```

## Example usage
``` vue
<template>
  <nav>
    <a href="https://github.com/vuejs/vue">
      <VueLogo />
      Vue
    </a>
    <a href="https://github.com/svg/svgo">
      <SVGOIcon />
      SVGO
    </a>
    <a href="https://github.com/webpack/webpack">
      <WebpackIcon />
      webpack
    </a>
  </nav>
</template>
<script>
import VueLogo from './public/vue.svg';
import SVGOIcon from './public/svgo.svg';
import WebpackIcon from './public/webpack.svg';

export default {
  name: 'Example',
  components: {
    VueLogo,
    SVGOIcon,
    WebpackIcon,
  },
};
</script>
```
