<template>
    <div class="cmt-container">
        <h3>发表评论</h3>
        <hr>
        <textarea placeholder="请输入您的评论（最多吐槽120字）" maxlength="120"></textarea>
        <mt-button type="primary" size="large">发表评论</mt-button>
        <div class="cmt-list" v-for="item in comments" :key="item.add_time">
            <div class="cmt-item">
                <div class="cmt-img">
                    <img src="https://static.hdslb.com/images/member/noface.gif"/>
                </div>
                <div class="cmt-main">
                    <div class="cmt-comment">
                        <span class="cmt-title">{{ item.user_name }}</span><br>
                        <span class="cmt-time">{{ item.add_time | dateFormat }}</span>
                    </div>
                    <div class="cmt-body">
                        {{ item.content === '' ? '此用户很懒，什么都没说。。。' : item.content }}
                    </div>
                </div>
            </div>
            <hr>
        </div>
        <mt-button type="danger" size="large" plain @click="getMore">加载更多</mt-button>
    </div>
</template>

<script>
    import comment from '../subcomponents/comment.vue';
    import { Toast } from 'mint-ui';
  export default {
    data(){
      return {
        pageIndex: 1,
        comments: [],
      }
    },
    created() {
      this.getComments();
    },
    methods: {
      getComments(){
        this.$http
        .get('api/getcomments/' + this.id + '?pageindex=' + this.pageIndex)
            .then(result => {
              if(result.body.status === 0){
                this.comments = this.comments.concat(result.body.message);
              } else {
                Toast("获取评论失败！");
              }
        })
      },
      getMore(){
        this.pageIndex++;
        this.getComments();
      }
    },
    props:['id'],
  };
</script>

<style scoped>
    .cmt-container h3,textarea{
        font-family: "Arial","Microsoft YaHei","黑体","宋体",sans-serif;
        color: #555555;
        font-size: 15px;
    }
    .cmt-container textarea{
        height: 85px;
        margin: 0;
    }
    .cmt-item{
        font-size: 12px;
        display: flex;
    }
    .cmt-list{
        margin: 10px 0;
    }
    .cmt-list hr{
        background-color: #bbbbbb;
        height: 1px;
        border: none;
    }
    .cmt-img{
        width: 25%;
        padding-left: 20px;
    }
    .cmt-img img{
        width: 48px;
        height: 48px;
        border-radius:24px;
    }
    .cmt-main{
        width: 75%;
    }
    .cmt-title{
        font-weight: bold;
        color: skyblue;
    }
    .cmt-time{
        font-size: 12px;
        color: #999999;
    }
    .cmt-body{
        color: #555555;
        font-size: 12px;
    }
</style>