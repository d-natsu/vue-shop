import VueRouter from 'vue-router'
// 导入对应的路由组件
import HomeContainer from './components/tabBar/HomeContainer.vue';
import MemberContainer from './components/tabBar/MemberContainer.vue';
import ShopContainer from './components/tabBar/ShopContainer.vue';
import SearchContainer from './components/tabBar/SearchContainer.vue';
import NewsList from './components/news/NewsList.vue'
import NewsInfo from './components/news/NewsInfo.vue';

var router = new VueRouter({
  routes:[
    {path:'/', redirect: 'home'},
    {path:'/home', component: HomeContainer},
    {path: '/member', component: MemberContainer},
    {path:'/shopCar', component: ShopContainer},
    {path:'/search', component: SearchContainer},
    {path: '/home/newsList', component: NewsList},
    {path: '/home/newsinfo/:id', component: NewsInfo}
  ],
  linkActiveClass: 'mui-active',
});

export default router;