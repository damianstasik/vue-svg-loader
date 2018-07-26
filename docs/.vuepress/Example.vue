<template>
  <nav>
    <a href="https://github.com/vuejs/vue" class="btn btn-vue">
      <VueLogo class="icon" />
      Vue
    </a>
    <a href="https://github.com/svg/svgo" class="btn btn-svgo">
      <SVGOIcon class="icon" />
      SVGO
    </a>
    <a href="https://github.com/webpack/webpack" class="btn btn-webpack">
      <WebpackIcon class="icon" />
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
<style scoped>
.btn {
  display: inline-flex;
  align-items: center;
  margin-right: 10px;
  padding: 6px 10px;
  border-radius: 6px;
  border: 2px solid currentColor;
}

.btn-vue { color: #4fc08d; }
.btn-svgo { color: #2364c0; }
.btn-webpack { color: #1d78c1; }

.icon {
  width: 28px;
  height: 28px;
  margin-right: 10px;
}
</style>
