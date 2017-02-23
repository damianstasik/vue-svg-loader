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

## Use

Once you have an svg file as a component, you can work with individually named parts of it. For instance, you could change the color of a particular path when a mouse hovers over it, as shown below:

```css
<style>
    #foo:hover {
        fill: green;
    }
</style>
```

You can also fire off events when part of an image is clicked on:

```js
mounted() {
    // Insert a "click" watcher
    document.getElementById('foo').onclick = this.foo;
},

methods: {
    foo() {
        alert('foo clicked!');
    }
},
```

---
*The idea behind this was inspired by [react-svg-loader](https://github.com/boopathi/react-svg-loader)*.
