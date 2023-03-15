<p align="center"><img src="docs/.vuepress/public/logo.svg?sanitize=true" width="40%"></p>
<h1 align="center">vue-svg-loader-2</h1>
<p align="center">A maintained version of the popular vue-svg-loader webpack loader that lets you use SVG files as Vue components</p>
<p align="center">
  <a href="https://vue-svg-loader.js.org">Documentation</a> -
  <a href="https://vue-svg-loader.js.org/faq.html">FAQ</a>
</p>

## Installation
``` bash
npm i -D vue-svg-loader-2@beta

yarn add --dev vue-svg-loader-2@beta
```

## Basic configuration
### webpack
``` js
module.exports = {
  module: {
    rules: [
      {
        test: /\.svg$/,
        use: [
          'vue-loader',
          'vue-svg-loader-2',
        ],
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
    
    // prevent injection of webpack-5 asset loaders
    svgRule.delete('type');
    svgRule.delete('generator');

    svgRule
      .use('vue-loader')
      .loader('vue-loader') // or `vue-loader-v16` if you are using a preview support of Vue 3 in Vue CLI
      .end()
      .use('vue-svg-loader-2')
      .loader('vue-svg-loader-2');
  },
};
```

### Nuxt.js (1.x / 2.x)
``` js
module.exports = {
  build: {
    extend: (config) => {
      const svgRule = config.module.rules.find(rule => rule.test.test('.svg'));

      svgRule.test = /\.(png|jpe?g|gif|webp)$/;

      config.module.rules.push({
        test: /\.svg$/,
        use: [
          'vue-loader',
          'vue-svg-loader-2',
        ],
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
      <SVGOLogo />
      SVGO
    </a>
    <a href="https://github.com/webpack/webpack">
      <WebpackLogo />
      webpack
    </a>
  </nav>
</template>
<script>
import VueLogo from './public/vue.svg';
import SVGOLogo from './public/svgo.svg';
import WebpackLogo from './public/webpack.svg';

export default {
  name: 'Example',
  components: {
    VueLogo,
    SVGOLogo,
    WebpackLogo,
  },
};
</script>
```

## License
[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2Fgammacommunications%2Fvue-svg-loader-2.svg?type=large)](https://app.fossa.com/projects/git%2Bgithub.com%2Fgammacommunications%2Fvue-svg-loader-2?ref=badge_large)
