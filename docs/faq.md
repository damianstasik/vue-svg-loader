---
sidebar: auto
---

# Frequently Asked Questions

## How to use both inline and external SVGs?

<Tabs>
<Tab name="webpack">

``` js
module.exports = {
  module: {
    rules: [
      {
        test: /\.svg$/,
        oneOf: [
          {
            resourceQuery: /inline/,
            loader: 'vue-svg-loader',
          },
          {
            loader: 'file-loader',
            query: {
              name: 'assets/[name].[hash:8].[ext]',
            },
          },
        ],
      },
    ],
  },
};
```

</Tab>
<Tab name="Vue CLI">

``` js
module.exports = {
  chainWebpack: (config) => {
    const svgRule = config.module.rule('svg');

    svgRule.uses.clear();

    svgRule
      .oneOf('inline')
      .resourceQuery(/inline/)
      .use('vue-svg-loader')
      .loader('vue-svg-loader')
      .end()
      .end()
      .oneOf('external')
      .use('file-loader')
      .loader('file-loader')
      .options({
        name: 'assets/[name].[hash:8].[ext]',
      });
  },
};
```

</Tab>
<Tab name="Nuxt.js">

``` js
module.exports = {
  build: {
    extend: (config) => {
      const svgRule = config.module.rules.find(rule => rule.loader === 'url-loader');

      svgRule.test = /\.(png|jpe?g|gif)$/;

      config.module.rules.push({
        test: /\.svg$/,
        oneOf: [
          {
            resourceQuery: /inline/,
            loader: 'vue-svg-loader',
          },
          {
            loader: 'file-loader',
            query: {
              name: 'assets/[name].[hash:8].[ext]',
            },
          },
        ],
      });
    },
  },
};
```

</Tab>
</Tabs>

``` vue
<template>
  <div>
    <InlineSVG />
    <img :src="externalSVG" />
    <div class="external-svg" />
  </div>
</template>
<script>
import InlineSVG from './public/inline.svg?inline'; // Note the `?inline` query string
import ExternalSVG from './public/external.svg';

export {
  name: 'Example',
  components: {
    InlineSVG,
  },
  computed: {
    externalSVG() {
      return ExternalSVG;
    },
  },
};
</script>
<style>
.external-svg {
  background-image: url("./public/external.svg");
}
</style>
```

## How to prefix `id` attributes?
To avoid the situation where two or more SVGs are using the same `id` attribute, you can use the `prefixIds` option provided by `SVGO`.

<Tabs>
<Tab name="webpack">

``` js
module.exports = {
  module: {
    rules: [
      {
        test: /\.svg$/,
        loader: 'vue-svg-loader',
        options: {
          svgo: {
            plugins: [
              { prefixIds: true },
            ],
          },
        },
      },
    ],
  },
};
```

</Tab>
<Tab name="Vue CLI">

``` js
module.exports = {
  chainWebpack: (config) => {
    const svgRule = config.module.rule('svg');

    svgRule.uses.clear();

    svgRule
      .use('vue-svg-loader')
      .loader('vue-svg-loader')
      .options({
        svgo: {
          plugins: [
            { prefixIds: true },
          ],
        },
      });
  },
};
```

</Tab>
<Tab name="Nuxt.js">

``` js
module.exports = {
  build: {
    extend: (config) => {
      const svgRule = config.module.rules.find(rule => rule.loader === 'url-loader');

      svgRule.test = /\.(png|jpe?g|gif)$/;

      config.module.rules.push({
        test: /\.svg$/,
        loader: 'vue-svg-loader',
        options: {
          svgo: {
            plugins: [
              { prefixIds: true },
            ],
          },
        },
      });
    },
  },
};
```

</Tab>
</Tabs>

If you want to customize generated IDs, you can pass a function instead of `true` to the `prefixIds` plugin.
Here is an example for generating IDs that are prefixed by the file name:

<Tabs>
<Tab name="webpack">

``` js
const { basename } = require('path');

module.exports = {
  module: {
    rules: [
      {
        test: /\.svg$/,
        loader: 'vue-svg-loader',
        options: {
          svgo: {
            plugins: [
              {
                prefixIds: {
                  prefix: (node, { path }) => basename(path, '.svg'),
                  delim: '-',
                },
              },
            ],
          },
        },
      },
    ],
  },
};
```

</Tab>
<Tab name="Vue CLI">

``` js
const { basename } = require('path');

module.exports = {
  chainWebpack: (config) => {
    const svgRule = config.module.rule('svg');

    svgRule.uses.clear();

    svgRule
      .use('vue-svg-loader')
      .loader('vue-svg-loader')
      .options({
        svgo: {
          plugins: [
            {
              prefixIds: {
                prefix: (node, { path }) => basename(path, '.svg'),
                delim: '-',
              },
            },
          ],
        },
      });
  },
};
```

</Tab>
<Tab name="Nuxt.js">

``` js
const { basename } = require('path');

module.exports = {
  build: {
    extend: (config) => {
      const svgRule = config.module.rules.find(rule => rule.loader === 'url-loader');

      svgRule.test = /\.(png|jpe?g|gif)$/;

      config.module.rules.push({
        test: /\.svg$/,
        loader: 'vue-svg-loader',
        options: {
          svgo: {
            plugins: [
              {
                prefixIds: {
                  prefix: (node, { path }) => basename(path, '.svg'),
                  delim: '-',
                },
              },
            ],
          },
        },
      });
    },
  },
};
```

</Tab>
</Tabs>


## How to use this loader with TypeScript?

If you want to use this loader in a project that is written in TypeScript, you will get the "Cannot find module" error.
To fix that you need to provide a type definition which is needed by TypeScript to know how to handle SVG components.

``` ts
declare module '*.svg' {
  const content: any;
  export default content;
}
```

## How to use this loader with Jest?

There is one major issue when it comes to integrating vue-svg-loader with Jest, and it is async behaviour. Jest's transforms are synchronous, webpack loaders can be both. That means we cannot use SVGO to process the SVG files, which can be bad in some cases. It is always good idea to always pass the SVG files through SVGO before putting them in a project [(for example using this great tool)](https://jakearchibald.github.io/svgomg/), so that the end result does not contain:

- XML declaration,
- `<script>` tags,
- `<style>` tags.

If your SVGs are prepared, create a transform file named for example `svgTransform.js` with:

``` js
const vueJest = require('vue-jest/lib/template-compiler');

module.exports = {
  process(content) {
    const { render } = vueJest({
      content,
      attrs: {
        functional: false,
      },
    });

    return `module.exports = { render: ${render} }`;
  },
};
```

And then modify your `jest.config.js` to use the transform file above (note that `<rootDir>` is injected by Jest):

``` js
module.exports = {
  transform: {
    '^.+\\.svg$': '<rootDir>/path/to/svgTransform.js',
  },
};
```
