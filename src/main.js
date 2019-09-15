import Vue from 'vue'
import {Header, Swipe, SwipeItem} from 'mint-ui'
import app from './App.vue'
import './lib/MUI/dist/css/mui.min.css'
import './lib/MUI/dist/css/icons-extra.css'
import VueRouter from 'vue-router';
import router from './router.js'
import VueResource from 'vue-resource'
// 按需导入 Mint-UI 组件
Vue.component(Header.name, Header);
Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);
// 启用 vue-router
Vue.use(VueRouter);
Vue.use(VueResource);

const vm = new Vue({
  el: '#app',
  render: c => c(app),
  router,
});