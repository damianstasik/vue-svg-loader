---
home: true
heroText: vue-svg-loader
heroImage: /logo.svg
actionText: Example →
tagline: Use SVG files as Vue components
actionLink: /#example
features:
- title: Easily styleable
  details: This loader inlines the SVGs which enables you to style aspects like for example stroke/fill color.
- title: Optimized
  details: Each SVG you import is optimized on-the-fly using powerful SVGO without you having to do anything.
- title: SSR ready
  details: You can import the SVG components inside the code that is going to be rendered on the server side.
---

## Installation

<Tabs>
<Tab name="yarn">

``` bash
yarn add -D vue-svg-loader vue-template-compiler
```

</Tab>
<Tab name="npm">

``` bash
npm i -D vue-svg-loader vue-template-compiler
```

</Tab>
</Tabs>

## Configuration

<Tabs>
<Tab name="webpack">

::: warning
Make sure that your current configuration is not already processing the SVG files.
Check this [FAQ](/faq#how-to-use-both-inline-and-external-svgs) section if you want to use both inline and external SVGs.
:::

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

</Tab>
<Tab name="Vue CLI">

By default Vue CLI uses the `file-loader` to process the SVG files, you can replace it in `vue.config.js`:

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

</Tab>
<Tab name="Nuxt.js">

Similarly to Vue CLI, you need to modify existing rule (in `nuxt.config.js`) that processes the SVG files:

``` js
module.exports = {
  build: {
    extend: (config) => {
      const svgRule = config.module.rules.find(rule => rule.test.test('.svg'));

      svgRule.test = /\.(png|jpe?g|gif|webp)$/;

      config.module.rules.push({
        test: /\.svg$/,
        loader: 'vue-svg-loader',
      });
    },
  },
};
```

</Tab>
</Tabs>

## Example

### Preview

<Example />

### Code

<<< @/docs/.vuepress/Example.vue{4,8,12,18-20,25-27}
