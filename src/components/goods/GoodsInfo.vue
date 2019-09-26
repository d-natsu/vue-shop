<template>
    <div class="goodsInfo-container">
        <transition
                @before-enter="beforeEnter"
                @enter="enter"
                @after-enter="afterEnter">
            <div class="ball" v-show="ballFlag" ref="ball"> </div>
        </transition>
        <div class="mui-card">
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                   <swiper :cover-list="images" :isfull="false"></swiper>
                </div>
            </div>
        </div>

        <div class="mui-card">
            <div class="mui-card-header">{{ goodsinfo.title }}</div>
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <p class="price">
                        市场价：<del>￥{{ goodsinfo.market_price }}</del>&nbsp;&nbsp;销售价：<span class="now_price">
                            ￥{{ goodsinfo.sell_price }}</span>
                    </p>
                    <p>购买数量：<goodsinfo_numbox @getcount="getSelectCount" :max="goodsinfo.stock_quantity"></goodsinfo_numbox></p>
                    <p>
                        <mt-button type="primary" size="small">立即购买</mt-button>
                        <mt-button type="danger" size="small" @click="addToShopCar">加入购物车</mt-button>
                    </p>
                </div>
            </div>
        </div>

        <div class="mui-card">
            <div class="mui-card-header">商品参数</div>
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <p>商品货号：{{ goodsinfo.goods_no }}</p>
                    <p>库存情况：{{ goodsinfo.stock_quantity }}件</p>
                    <p>上架时间：{{ goodsinfo.add_time | dateFormat }}</p>
                </div>
            </div>
            <div class="mui-card-footer">
                <mt-button type="primary" size="large" plain @click="goDesc(id)">图文介绍</mt-button>
                <mt-button type="danger" size="large" plain @click="goComment(id)"> 商品评论</mt-button>
            </div>
        </div>
    </div>
</template>

<script>
  import swiper from '../subcomponents/swiper.vue';
  import goodsinfo_numbox from '../subcomponents/goodsinfo_numbox.vue';

  export default {
    data(){
      return {
        id: this.$route.params.id,
        images:[],
        goodsinfo:{},
        ballFlag: false,
        selectCount:1,
      }
    },
    created(){
      this.getImg();
      this.getGoodsInfo();
    },
    methods:{
      getImg(){
        this.$http.get('api/getthumimages/' + this.id).then(result => {
          if(result.body.status === 0){
            result.body.message.forEach(item => {
              item.img = item.src;
            });
            this.images = result.body.message;
          }
        })
      },
      getGoodsInfo(){
        this.$http.get('api/goods/getinfo/' + this.id).then(result => {
          if(result.body.status === 0){
            this.goodsinfo = result.body.message[0];
          }
        })
      },
      goDesc(id){
        this.$router.push({name: "goodsdesc", params:{id}});
      },
      goComment(id){
        this.$router.push({name:"goodscomment", params:{id}});
      },
      addToShopCar(){
        this.ballFlag = !this.ballFlag;
        var goodsInfoFromCar = {
          id: this.id,
          count: this.selectCount,
          price: this.goodsinfo.sell_price,
          selected: true,
        };
        this.$store.commit("addToCar", goodsInfoFromCar);
      },
      beforeEnter(el){
        el.style.transform = "translate(0, 0)";
      },
      enter(el, done){
        el.offsetWidth;
        const ballPosition = this.$refs.ball.getBoundingClientRect();
        const badgePosition = document
        .getElementById("badge")
        .getBoundingClientRect();
        const xDist = badgePosition.left - ballPosition.left;
        const yDist = badgePosition.top - ballPosition.top;
        el.style.transform = `translate(${xDist}px, ${yDist}px)`;
        el.style.transition = 'all 1s cubic-bezier(.58,-0.45,1,.71)';
        done();
      },
      afterEnter(el){
        this.ballFlag = !this.ballFlag;
      },
      getSelectCount(count){
        this.selectCount = count;
        console.log(this.selectCount);
      }
    },
    components:{
      swiper,
      goodsinfo_numbox,
    }
  };
</script>

<style scoped>
    .goodsInfo-container{
        background-color: #eee;
        overflow: hidden;
    }
    .goodsInfo-container .now_price{
        color: red;
        font-size: 16px;
        font-weight: bold;
    }
    .mui-card-footer, .mui-card-header{
        display: block;
    }
    .mui-card, .mui-card-footer button {
        margin: 15px 0;
    }
    .ball{
        width: 15px;
        height: 15px;
        border-radius: 50%;
        background-color: red;
        position: absolute;
        z-index: 99;
        top: 390px;
        left:146px;
    }
</style>