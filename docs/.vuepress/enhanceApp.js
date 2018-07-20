import { Tabs, Tab } from 'vue-tabs-component';
import Logo from './public/logo.svg';
import Example from './Example';

export default ({
  Vue,
}) => {
  Vue.component('Tabs', Tabs);
  Vue.component('Tab', Tab);
  Vue.component('Logo', Logo);
  Vue.component('Example', Example);
};
