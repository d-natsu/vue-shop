<template>
    <div class="goodsdesc-container">
        <h3>{{ info.title }}</h3>
        <hr>
        <div class="content" v-html="info.content"></div>
    </div>
</template>

<script>
  export default {
    data(){
      return {
        info:{}
      }
    },
    created(){
      this.getGoodsDesc();
    },
    methods:{
      getGoodsDesc(){
        this.$http.get('api/goods/getdesc/' + this.$route.params.id).then(result => {
          if(result.body.status === 0){
            this.info = result.body.message[0];
          }
        })
      }
    }
  };
</script>

<style>
.goodsdesc-container{
    padding: 4px;
}
.goodsdesc-container h3{
    color: #555555;
    font-size: 16px;
    text-align: center;
    margin: 15px 0;
}
.goodsdesc-container .content img{
    width: 100%;
}
</style>