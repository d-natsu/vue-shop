<template>
    <div class="goods-list">
        <router-link class="goods-item" v-for="item in goodsList"
                     :key="item.id" :to="'/home/goodsinfo/' + item.id" tag="div">
            <img :src="item.img_url" alt="">
            <h1 class="title">{{ item.title }}</h1>
            <div class="info">
                <p class="price">
                    <span class="now">￥{{ item.sell_price }}</span>
                    <span class="old">￥{{ item.market_price }}</span>
                </p>
                <p class="sell">
                    <span>热卖中</span>
                    <span>剩{{ item.stock_quantity }}件</span>
                </p>
            </div>
        </router-link>
        <mt-button type="danger" size="large" @click="getMore">加载更多</mt-button>
    </div>
</template>

<script>
    import {Toast} from 'mint-ui'
  export default {
    data(){
      return {
        pageIndex: 1, // 分页的页数
        goodsList:[]
      }
    },
    created(){
      this.getGoodsList();
    },
    methods:{
      getGoodsList(){
        this.$http.get('api/getgoods?pageindex=' + this.pageIndex).then(result =>{
          if(result.body.status === 0){
            if(result.body.message.length === 0){
              Toast("没有更多数据了！");
            } else {
              this.goodsList = this.goodsList.concat(result.body.message);
            }
          }
        })
      },
      getMore(){
        this.pageIndex++;
        this.getGoodsList();
      }
    }
  };
</script>

<style scoped>
    .goods-list{
        display: flex;
        flex-wrap: wrap;
        padding: 7px;
        justify-content: space-between;
    }
    .goods-list .goods-item{
        width: 49%;
        border: 1px solid #ccc;
        box-shadow: 0 0 8px #ccc;
        margin: 2px 1px;
        padding: 2px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        min-height: 293px;
    }
    .goods-list .goods-item img{
        width: 100%;
    }
    .goods-list .goods-item .title{
        font-size: 14px;
    }
    .goods-list .goods-item .info{
        background-color: #eee;
    }
    .goods-list .goods-item .info p{
        margin: 0;
        padding: 5px;
    }
    .goods-list .goods-item .info .price .now{
        color: red;
        font-weight: bold;
        font-size: 16px;
    }
    .goods-list .goods-item .info .price .old{
        text-decoration: line-through;
        font-size: 12px;
        margin-left: 10px;
    }
    .goods-list .goods-item .info .sell{
        display: flex;
        justify-content: space-between;
        font-size: 12px;
    }
</style>