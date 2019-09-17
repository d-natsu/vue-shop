<template>
    <div class="photoinfo-container">
        <h3>{{ photoinfo.title }}</h3>
        <p class="subtitle">
            <span>发表时间：{{ photoinfo.add_time | dateFormat }}</span>
            <span>点击：{{ photoinfo.click }}次</span>
        </p>
        <hr>
        <vue-preview :slides="list" class="imgPrev"></vue-preview>

        <div class="content" v-html="photoinfo.content"></div>
        <cmt-box :id="id"></cmt-box>
    </div>
</template>

<script>
    import comment from '../subcomponents/comment.vue';
  export default {
    data(){
      return {
        id: this.$route.params.id,
        photoinfo:{},
        list:[]
      }
    },
    created(){
      this.getPhotoInfo();
      this.getThumbs();
    },
    methods:{
      getPhotoInfo(){
        this.$http.get('api/getimageInfo/' + this.id).then(result => {
              if(result.body.status === 0) {
                this.photoinfo = result.body.message[0];
              }
        })
      },
      getThumbs(){
        this.$http.get('api/getthumimages/' + this.id).then(result => {
          if(result.body.status === 0) {
            result.body.message.forEach(item => {
              item.w = 600;
              item.h = 400;
              item.src;  //大图
              item.msrc = item.src;  //小图
              item.alt = '图片无法显示';
            });
            this.list = result.body.message;
          }
        })
      }
    },
    components:{
      'cmt-box': comment
    }
  };
</script>

<style>
    .photoinfo-container{
        padding: 10px;
    }
    .photoinfo-container h3{
        color: #555555;
        font-size: 15px;
        margin: 15px 0;
    }
    .subtitle{
        display: flex;
        justify-content: space-between;
        font-size: 12px;
        padding: 0 10px;
    }
    .content{
        font-size: 13px;
        line-height: 30px;
        color: #777777;
    }
    .photoinfo-container .imgPrev .my-gallery figure{
        display: inline-block;
        margin: 4px;
    }
    .photoinfo-container .imgPrev .my-gallery img{
        width: 150px;
        height: 100px;
    }
</style>