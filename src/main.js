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
import Vuex from 'vuex'
Vue.use(Vuex);
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

var car = JSON.parse(localStorage.getItem('car') || '[]');

const store = new Vuex.Store({
  state:{
    car: car, // 将购物车数据存下来
  },
  mutations:{
    addToCar(state, goodsinfo){
      var flag = false;
      state.car.some(item => {
        if(item.id === goodsinfo.id){
          item.count += parseInt(goodsinfo.count);
          flag = true;
          return true;
        }
      });
      if(!flag){
        state.car.push(goodsinfo);
      }
      localStorage.setItem('car', JSON.stringify(state.car));
    },
    updateGoodsInfo(state, goodsinfo){
      state.car.some(item => {
        if(parseInt(item.id) === goodsinfo.id){
          item.count = parseInt(goodsinfo.count);
          return true;
        }
      });
      // console.log("state.car[0].id: " + typeof(state.car[0].id));  // string
      // console.log("goodsinfo.id: " + typeof(goodsinfo.id)); // number
      localStorage.setItem('car', JSON.stringify(state.car));
    },
    removeFromCar(state, id){
      state.car.some((item, i) => {
        if(item.id == id){
          state.car.splice(i, 1);
          return true;
        }
      });
      localStorage.setItem('car', JSON.stringify(state.car));
    },
    updateGoodsSelected(state, info){
      state.car.some(item => {
        if(item.id == info.id){
          item.selected = info.selected;
        }
      });
      localStorage.setItem('car', JSON.stringify(state.car));
    }
  },
  getters:{
    getAllCount(state){
      var c = 0;
      state.car.forEach(item => {
        c += item.count;
      });
      return c;
    },
    getGoodsCount(state){
      var o = {};
      state.car.forEach(item => {
        o[item.id] = item.count;
      });
      return o;
    },
    getGoodsSelected(state){
      var o = {};
      state.car.forEach(item => {
        o[item.id] = item.selected;
      });
      return o;
    },
    getGoodsCountAndAmount(state){
      var o = {
        count: 0,
        amount: 0,
      };
      state.car.forEach(item => {
        if(item.selected){
          o.count += item.count;
          o.amount += item.price * item.count;
        }
      });
      return o;
    }
  },
});

const vm = new Vue({
  el: '#app',
  render: c => c(app),
  router,
  store,
});