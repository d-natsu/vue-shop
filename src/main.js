import Vue from 'vue'
// import {Header, Swipe, SwipeItem, Button, Lazyload} from 'mint-ui'
import app from './App.vue'
import './lib/MUI/dist/css/mui.min.css'
import './lib/MUI/dist/css/icons-extra.css'
import VueRouter from 'vue-router';
import router from './router.js'
import VueResource from 'vue-resource'
// 导入时间格式化的插件
import moment from 'moment'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
import VuePreview from 'vue-preview'
Vue.use(MintUI);
Vue.use(VuePreview);
// 按需导入 Mint-UI 组件
// Vue.component(Header.name, Header);
// Vue.component(Swipe.name, Swipe);
// Vue.component(SwipeItem.name, SwipeItem);
// Vue.component(Button.name, Button);
// 启用 vue-router
Vue.use(VueRouter);
Vue.use(VueResource);
// Vue.use(Lazyload);
Vue.http.options.root = 'http://www.liulongbin.top:3005';
// 全局设置 post 表单数据格式组织形式 application/x-www-form-urlencoded
Vue.http.options.emulateJSON = true;

// 定义全局过滤器
Vue.filter('dateFormat', function(dateStr, pattern = "YYYY-MM-DD HH:mm:ss") {
  return moment(dateStr).format(pattern);
});

const vm = new Vue({
  el: '#app',
  render: c => c(app),
  router,
});