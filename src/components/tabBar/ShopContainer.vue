<template>
    <div class="shopcar-container">
        <div class="goods-list">
            <!-- 商品列表顶区域 -->
            <div class="mui-card" v-for="(item, i) in goodslist" :key="item.id">
                <div class="mui-card-content">
                    <div class="mui-card-content-inner">
                       <mt-switch
                               v-model="$store.getters.getGoodsSelected[item.id]"
                               @change="selectedChanged(item.id, $store.getters.getGoodsSelected[item.id])"
                       ></mt-switch>
                        <img :src="item.thumb_path">
                        <div class="info">
                            <h1>{{ item.title }}</h1>
                            <p>
                                <span class="price">￥{{ item.sell_price }}</span>
                                <shopcar_numbox :initcount="$store.getters.getGoodsCount[item.id]" :goods-id="item.id"></shopcar_numbox>
                                <a href="#" @click.prevent="remove(item.id, i)">删除</a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- 结算区域 -->
        <div class="mui-card">
            <div class="mui-card-content">
                <div class="mui-card-content-inner jiesuan">
                    <div class="left">
                        <p>总计（不含运费）</p>
                        <p>已勾选商品 <span class="red">{{ $store.getters.getGoodsCountAndAmount.count }}</span> 件，总价
                            <span class="red">￥{{ $store.getters.getGoodsCountAndAmount.amount }}</span></p>
                    </div>
                    <mt-button type="danger">去结算</mt-button>
                </div>
            </div>
        </div>
        <p>{{ $store.getters.getGoodsSelected }}</p>
    </div>
</template>

<script>
    import shopcar_numbox from '../subcomponents/shopcar_numbox.vue';
  export default {
    components:{
      shopcar_numbox,
    },
    data(){
      return {
        goodslist:[],
      }
    },
    created(){
      this.getGoodsList();
    },
    methods:{
      getGoodsList(){
        var idArr = [];
        this.$store.state.car.forEach(item => idArr.push(item.id));
        if(idArr.length <= 0) {
          return;
        }
        this.$http.get('api/goods/getshopcarlist/' + idArr.join(","))
            .then(result => {
              if(result.body.status == 0) {
                this.goodslist = result.body.message;
              }
        });
      },
      remove(id, i){
        this.goodslist.splice(i, 1);
        this.$store.commit('removeFromCar', id);
      },
      selectedChanged(id, val){
        // console.log(id + ' --- ' + val);
        this.$store.commit("updateGoodsSelected", {id, selected: val});
      }
    }
  };
</script>

<style scoped>
    .shopcar-container{
        background-color: #eee;
        overflow: hidden;
    }
    .goods-list img{
        width: 60px;
        height: 60px;
    }
    .goods-list h1{
        font-size: 13px;
    }
    .goods-list .info{
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }
    .goods-list .info .price {
        color: red;
        font-weight: bold;
    }
    .mui-card-content-inner{
        display: flex;
        align-content: center;
    }
    .jiesuan{
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .red{
        color: red;
        font-weight: bold;
        font-size: 16px;
    }
</style>