<template>
    <div>
        <div class="ChatHead">
            <img src="https://static.hdslb.com/images/member/noface.gif" alt="用户头像">
            <p class="user-name">匿名用户</p>
        </div>
        <div>
            <mt-cell title="用户详情">
                <span class="detail">点击登录</span>
                <span class="mui-icon mui-icon-person" slot="icon"></span>
            </mt-cell>
            <mt-cell title="购物车" is-link to="/shopCar">
                <span class="mui-icon mui-icon-extra mui-icon-extra-cart" slot="icon"></span>
            </mt-cell>
            <mt-cell title="评分" is-link>
                <span class="mui-icon mui-icon-star" slot="icon"></span>
            </mt-cell>
            <mt-cell title="联系我们" is-link>
                <span class="mui-icon mui-icon-extra mui-icon-extra-custom" slot="icon"></span>
            </mt-cell>
            <mt-cell title="建议反馈" is-link>
                <span class="mui-icon mui-icon-help" slot="icon"></span>
            </mt-cell>
            <mt-cell title="设置" is-link>
                <span class="mui-icon mui-icon-gear" slot="icon"></span>
            </mt-cell>
        </div>
    </div>
</template>

<script>
  export default {
    name: 'MemberContainer',
  };
</script>

<style scoped>
    .ChatHead{
        margin-top: 20px;
        margin-bottom: 20px;
        text-align: center;
    }
    .ChatHead img{
        border-radius: 50%;
        padding-bottom: 10px;
        height: 150px;
        width: 150px;
    }
    .user-name{
        font-size: 20px;
        color: skyblue;
    }
    .mui-icon{
        width: 40px;
    }
    .detail{
        color: skyblue;
        font-size: 14px;
    }
</style>