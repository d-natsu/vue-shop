import Vue from 'vue'
import {Header} from 'mint-ui'
import app from './App.vue'
import './lib/MUI/dist/css/mui.min.css'
// 按需导入 Mint-UI 组件
Vue.component(Header.name, Header);

const vm = new Vue({
  el: '#app',
  render: c => c(app),
});