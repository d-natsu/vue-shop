<template>
    <div>
        <!-- 轮播图 -->
        <swiper :cover-list="coverList" :isfull="true"></swiper>


        <ul class="mui-table-view mui-grid-view mui-grid-9">
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><router-link to="/home/newsList">
                <img src="../../images/menu1.png" alt="">
                <div class="mui-media-body">新闻资讯</div></router-link></li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><router-link to="/home/photo_list">
                <img src="../../images/menu2.png" alt="">
                <div class="mui-media-body">图片分享</div></router-link></li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><router-link  to="/home/goodslist">
                <img src="../../images/menu3.png" alt="">
                <div class="mui-media-body">商品购买</div></router-link ></li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><router-link to="">
                <img src="../../images/menu4.png" alt="">
                <div class="mui-media-body">留言反馈</div></router-link></li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
                <img src="../../images/menu5.png" alt="">
                <div class="mui-media-body">视频专区</div></a></li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
                <img src="../../images/menu6.png" alt="">
                <div class="mui-media-body">联系我们</div></a></li>
        </ul>
    </div>
</template>

<script>
    import { Toast } from 'mint-ui'
    import swiper from '../subcomponents/swiper.vue';
  export default {
    data(){
      return {
        coverList:[] // 保存轮播图的数组
      };
    },
    created(){
      this.getCover();
    },
    methods:{
      getCover(){
        this.$http.get('api/getlunbo').then(result => {
          if(result.body.status === 0){
            this.coverList = result.body.message;
          } else {
            Toast("加载轮播图失败！！！");
          }
        });
      }
    },
    components:{
      swiper,
    }
  };
</script>

<style scoped>

   .mui-grid-view.mui-grid-9{
       background-color: white;
       border: none;
   }
   .mui-grid-view.mui-grid-9 .mui-table-view-cell{
       border: 0;
   }
   .mui-grid-view img{
       width: 60px;
       height: 60px;
   }
   .mui-table-view.mui-grid-view .mui-table-view-cell .mui-media-body{
       font-size: 13px;
       color: #6d6d72;
   }
</style>