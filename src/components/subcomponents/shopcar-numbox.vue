<template>
  <div class="mui-numbox" data-numbox-min='1' style="height:25px">
	<button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
	<input id="test" class="mui-input-numbox" type="number" :value="goodsCount"  @change="countChanged" ref="numbox" readonly />
	<button class="mui-btn mui-btn-numbox-plus" type="button">+</button>
</div>
</template>
<script>
import mui from "../../lib/mui/js/mui.js";
export default {
  mounted() {
    mui(".mui-numbox").numbox();
  },
  methods: {
    countChanged() {
      this.$store.commit('updateGoodsInfo',{id:this.goodsId,count:this.$refs.numbox.value})
    }
  },
  props:["goodsCount","goodsId"]
  
};
</script>
<style lang="scss" scoped>

</style>
