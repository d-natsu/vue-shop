import Vue from 'vue'
import {Header, Swipe, SwipeItem, Button} from 'mint-ui'
import app from './App.vue'
import './lib/MUI/dist/css/mui.min.css'
import './lib/MUI/dist/css/icons-extra.css'
import VueRouter from 'vue-router';
import router from './router.js'
import VueResource from 'vue-resource'
// 导入时间格式化的插件
import moment from 'moment'
// 按需导入 Mint-UI 组件
Vue.component(Header.name, Header);
Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);
Vue.component(Button.name, Button);
// 启用 vue-router
Vue.use(VueRouter);
Vue.use(VueResource);
Vue.http.options.root = 'http://www.liulongbin.top:3005';

// 定义全局过滤器
Vue.filter('dateFormat', function(dateStr, pattern = "YYYY-MM-DD HH:mm:ss") {
  return moment(dateStr).format(pattern);
});

const vm = new Vue({
  el: '#app',
  render: c => c(app),
  router,
});