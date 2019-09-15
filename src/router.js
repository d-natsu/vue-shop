import VueRouter from 'vue-router'
// 导入对应的路由组件
import HomeContainer from './components/tabBar/HomeContainer.vue';
import MemberContainer from './components/tabBar/MemberContainer.vue';
import ShopContainer from './components/tabBar/ShopContainer.vue';
import SearchContainer from './components/tabBar/SearchContainer.vue';

var router = new VueRouter({
  routes:[
    {path:'/', redirect: 'home'},
    {path:'/home', component: HomeContainer},
    {path: '/member', component: MemberContainer},
    {path:'/shopCar', component: ShopContainer},
    {path:'/search', component: SearchContainer},
  ],
  linkActiveClass: 'mui-active',
});

export default router;