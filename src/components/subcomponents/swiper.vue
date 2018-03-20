<template>
  <div>
      <mt-swipe :auto="3000">
        <!-- 组件中使用v-for 必须设置key -->
            <mt-swipe-item v-for="item in lunbotuList" :key="item.url">
                <img :src="item.img" alt="" :class={full:isfull}>
            </mt-swipe-item>
        </mt-swipe>
  </div>
</template>
<script>
    export default {
        props:["lunbotuList","isfull"]
    }
</script>
<style lang="scss" scoped>
.mint-swipe {
     height: 200px;
   text-align: center;
  .mint-swipe-item {
     
    // &:nth-child(1) {
    //   background-color: lightblue;
    // }
    // &:nth-child(2) {
    //   background-color: lightgreen;
    // }
    // &:nth-child(3) {
    //   background-color: lightcoral;
    // }
    img {
    
      height: 100%;
    }
  }
}
.full{
    width: 100%;
}
</style>
