<template>
    <div>
        <!-- 头部列表分类-->
        <div id="slider" class="mui-slider">
            <div class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted">
                <div class="mui-scroll">
                    <a :class="['mui-control-item', item.id == 0 ? 'mui-active' : '']" v-for="item in cates"
                       :key="item.id" @click="getPhotoListByCateId(item.id)">
                        {{ item.title }}
                    </a>
                </div>
            </div>
        </div>
        <!-- 内容 -->
        <div>
            <ul class="photo-list">
                <router-link v-for="item in list" :key="item.id"
                             :to="'/home/photoinfo/' + item.id" tag="li">
                        <div>
                            <img v-lazy="item.img_url">
                            <div class="info">
                                <h1 class="info-title">{{ item.title }}</h1>
                                <div class="info-body">{{ item.zhaiyao }}</div>
                            </div>
                        </div>
                </router-link>
            </ul>
        </div>
    </div>
</template>

<script>
    import mui from '../../lib/MUI/dist/js/mui.min.js'
  export default {
    data(){
      return {
        cates: [], // 所有分类列表数组
        list: [] // 获取图片数组
      }
    },
    methods:{
      getAllCategory(){
        // 获取所有的图片分类
        this.$http.get("api/getimgcategory").then(result => {
          if(result.body.status === 0) {
            result.body.message.unshift({title: "全部", id: 0});
            this.cates = result.body.message;
          }
        })
      },
      getPhotoListByCateId(cateId){
        this.$http.get('api/getimages/' + cateId).then(result => {
          if(result.body.status === 0) {
            this.list = result.body.message;
          }
        })
      }
    },
    created(){
      this.getAllCategory();
      this.getPhotoListByCateId(0);
    },
    mounted() { // 当组件中的 DOM 结构渲染好后，会调用这个钩子函数
      mui('.mui-scroll-wrapper').scroll({
        deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
      });
    }
  };
</script>

<style scoped>
    *{
        touch-action: pan-y;
    }
    .photo-list{
        list-style: none;
        margin: 0;
        padding: 10px;
        padding-bottom: 0;
    }
    .photo-list li{
        text-align: center;
        margin-bottom: 10px;
        box-shadow: 0 0 9px #999;
        border-radius: 10px;
        position: relative;
    }
    .photo-list img{
        width: 100%;
        vertical-align: middle;
        border-radius: 10px;
    }
    .photo-list img[lazy=loading] {
        /*list-style: none;*/
        width: 40px;
        height: 300px;
        margin: auto;
    }
    .info{
        color: white;
        text-align: left;
        position: absolute;
        bottom: 0;
        background-color: rgba(0,0,0,0.4);
        border-radius: 0 0 10px 10px;
        padding: 10px 10px 10px;
        max-height: 94px;
    }
    .info .info-title{
        font-size: 14px;
    }
    .info .info-body{
        font-size: 13px;
    }
</style>