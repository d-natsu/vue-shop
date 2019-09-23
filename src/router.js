import VueRouter from 'vue-router'
// 导入对应的路由组件
import HomeContainer from './components/tabBar/HomeContainer.vue';
import MemberContainer from './components/tabBar/MemberContainer.vue';
import ShopContainer from './components/tabBar/ShopContainer.vue';
import SearchContainer from './components/tabBar/SearchContainer.vue';
import NewsList from './components/news/NewsList.vue'
import NewsInfo from './components/news/NewsInfo.vue';
import PhotoList from './components/photo/PhotoList.vue';
import PhotoInfo from './components/photo/PhotoInfo.vue';
import GoodsList from './components/goods/GoodsList.vue';
import GoodsInfo from './components/goods/GoodsInfo.vue';
import GoodsComment from './components/goods/GoodsComment.vue';
import GoodsDesc from './components/goods/GoodsDesc.vue';

var router = new VueRouter({
  routes:[
    {path:'/', redirect: 'home'},
    {path:'/home', component: HomeContainer},
    {path: '/member', component: MemberContainer},
    {path:'/shopCar', component: ShopContainer},
    {path:'/search', component: SearchContainer},
    {path: '/home/newsList', component: NewsList},
    {path: '/home/newsinfo/:id', component: NewsInfo},
    {path: '/home/photo_list', component: PhotoList},
    {path: '/home/photoinfo/:id', component: PhotoInfo},
    {path: '/home/goodslist', component: GoodsList},
    {path: '/home/goodsinfo/:id', component: GoodsInfo},
    {path: '/home/goodsdesc/:id', component: GoodsDesc, name: 'goodsdesc'},
    {path: '/home/goodscomment/:id', component: GoodsComment, name: 'goodscomment'},
  ],
  linkActiveClass: 'mui-active',
});

export default router;