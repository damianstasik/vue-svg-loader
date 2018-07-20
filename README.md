# vue-svg-loader <img src="https://img.shields.io/npm/dt/vue-svg-loader.svg">
A webpack loader that allows to use SVG files as Vue Components.

## Installation
```
npm install --save-dev vue-svg-loader
yarn add --dev vue-svg-loader
```

## Configuration
```js
{
  test: /\.svg$/,
  loader: 'vue-svg-loader', // `vue-svg` for webpack 1.x
  options: {
    // optional [svgo](https://github.com/svg/svgo) options
    svgo: {
      plugins: [
        {removeDoctype: true},
        {removeComments: true}
      ]
    }
  }
}
```

**Warning**: By default, `vue-cli` will put in a catch-all loader like so:

```js
{
    test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
    loader: 'url-loader'
}
```

This is great until you wish to use a different loader for one of the filetypes. In order to use `vue-svg-loader` you'll need to do one of the following:

- Remove the `|svg` part of the `url-loader` test so that it doesn't try to take over `vue-svg-loader`'s new job.

- Place the `vue-svg-loader` block _above_ the `url-loader` to that [webpack loader chaining](https://webpack.js.org/concepts/loaders/) sees `vue-svg-loader` first and then doesn't do anyting with the SVG (not recommended as it can be confusing).

- Use webpack's `oneOf` functionality demoed by @robsterlini in Issue #27.

## Example code

```html
<template>
  <nav id="menu">
    <a href="...">
      <SomeIcon class="icon" />
      Some page
    </a>
  </nav>
</template>

<script>
import SomeIcon from './assets/some-icon.svg';

export default {
  name: 'menu',
  components: {
    SomeIcon,
  },
};
</script>
```
---
*The idea behind this was inspired by [react-svg-loader](https://github.com/boopathi/react-svg-loader)*.
