# vue-svg-loader
A webpack loader that allows to use SVG files as Vue Components.

## Installation
`npm install --save-dev vue-svg-loader`

## Configuration
```js
{
  test: /\.svg$/,
  loader: 'vue-svg-loader', // `vue-svg` for webpack 1.x
}
```

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
