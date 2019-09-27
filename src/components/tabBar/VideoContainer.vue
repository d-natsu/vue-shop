<template>
    <div class="video-vue">
<!--        <swiper :cover-list="coverList" :isfull="true"></swiper>-->
        <div class="video-container">
            <div class="video-box" v-for="item in videoList" :key="item.id">
                <div class="video">
                    <div v-html="item.url"></div>
                    <div class="video-subtitle">
                        <div class="video-little-detail"><span class="mui-icon mui-icon-eye"></span> {{ item.clicked }}&nbsp;&nbsp;
                            <span class="mui-icon mui-icon-extra mui-icon-extra-order"></span> {{ item.comment }}</div>
                        <span class="video-time">{{ item.time }}</span>
                    </div>
                </div>
                <div class="video-title">
                    {{ item.title }}
                </div>
                <div class="video-kind">
                    {{ item.type }}
                </div>
            </div>
            <div class="video-box">
                <div class="video">
                   <div>
                       <iframe src="//player.bilibili.com/player.html?aid=67637507&cid=117260338&page=1" scrolling="no" border="0" frameborder="no" framespacing="0" allowfullscreen="true"> </iframe>
                   </div>
                    <div class="video-subtitle">
                        <div class="video-little-detail"><span class="mui-icon mui-icon-eye"></span> 10.3万&nbsp;&nbsp;
                            <span class="mui-icon mui-icon-extra mui-icon-extra-order"></span> 612</div>
                        <span class="video-time">04:26</span>
                    </div>
                </div>
                <div class="video-title">
                    【GUMI】little bunny【低所得P】
                </div>
                <div class="video-kind">
                    音乐
                </div>
            </div>
        </div>
    </div>
</template>

<script>
  export default {
    data(){
      return {
        videoList:[],
      }
    },
    created(){
      this.getVideoList();
    },
    methods:{
      getVideoList(){
        this.$http.get('https://www.easy-mock.com/mock/5d8df79c1c2da8652b76805f/video/videoList').then(result =>{
          if(result.body.status === 0){
            this.videoList = result.body.message;
          }
        })
      }
    }
  };
</script>

<style>
    .video-container{
        background-color: #eeeeee;
        display: flex;
        flex-wrap: wrap;
        padding: 10px;
        justify-content: space-between;
    }
    .video-container .video iframe{
        width: 100%;

    }
    .video-container .video{
        position: relative;
    }
    .video-container .video-box {
        background-color: white;
        box-shadow: 0 1px 4px #bbbbbb;
        border-radius: 5px;
        width: 350px;
        overflow: hidden;
        margin-bottom: 10px;
    }
    .video-container .video-title{
        font-size: 13px;
        color: #555555;
        padding-left: 13px;
        padding-top: 20px;
        padding-bottom: 5px;
    }
    .video-subtitle{
        font-size: 10px;
        color: white;
        background-color: black;
        opacity: 0.4;
        display: flex;
        width: 100%;
        justify-content: space-between;
        padding: 0 5px;
        position: absolute;
        bottom: -15px;

    }
    .video-little-detail .mui-icon{
        font-size: 12px;
    }
    .video-container .video-box .video-kind{
        font-size: 10px;
        color: #777777;
        padding-left: 12px;
    }
</style>