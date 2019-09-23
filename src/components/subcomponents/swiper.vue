<template>
    <div>
        <mt-swipe :auto="4000">
            <mt-swipe-item v-for="item in coverList" :key="item.id">
                <img :src="item.img" alt="" :class="{ 'full': isfull}">
            </mt-swipe-item>
        </mt-swipe>
    </div>
</template>

<script>
  export default {
    data(){
      return {}
    },
    methods:{},
    props:["coverList", "isfull"]
  };
</script>

<style scoped>
    .mint-swipe{
        height: 200px;
        text-align: center;
    }
    .mint-swipe img{
        height: 100%;
    }
    .full{
        width: 100%;
    }
</style>