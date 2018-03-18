<template>
  <div class="app-container">
    <!-- header -->
    <mt-header fixed title="黑马程序员-Victor·Vue项目">
      <router-link to="/" slot="left">  
            <mt-button icon="back" @click="goBack(-1)">返回</mt-button>  
          </router-link>  
          <!-- <mt-button icon="more" slot="right" @click="more"></mt-button> -->
    </mt-header>
    <!-- container  router -->
    <transition>
			<router-view></router-view>
		</transition>
    <!-- footer tabbar -->
    <nav class="mui-bar mui-bar-tab">
			<router-link class="mui-tab-item-z" to="/home">
				<span class="mui-icon mui-icon-home"></span>
				<span class="mui-tab-label">首页</span>
			</router-link>
			<router-link class="mui-tab-item-z" to="/member">
				<span class="mui-icon mui-icon-contact"></span>
				<span class="mui-tab-label">会员</span>
			</router-link>
			<router-link class="mui-tab-item-z" to="/shopcar">
				<span class="mui-icon mui-icon-extra mui-icon-extra-cart"><span class="mui-badge">0</span></span>
				<span class="mui-tab-label">购物车</span>
			</router-link>
			<router-link class="mui-tab-item-z" to="/search">
				<span class="mui-icon mui-icon-search"></span>
				<span class="mui-tab-label">搜索</span>
			</router-link>
		</nav>
  
  </div>
</template>

<script>

export default{
  methods:{
    goBack(n){
      this.$router.go(n)
    }
  }
}
</script>


<style lang="scss" scoped>
.app-container {
  padding-top: 40px;
  padding-bottom: 52px;
  overflow-x: hidden;
  .mint-header.is-fixed {
    z-index: 99;
  }
}
.v-enter {
  opacity: 0;
  transform: translateX(100%);
}
.v-leave-to {
  opacity: 0;
  transform: translateX(-100%);
  position: absolute;
}
.v-enter-active,
.v-leave-active {
  transition: all 0.5s linear;
}
.mui-bar-tab .mui-tab-item-z {
  display: table-cell;
  overflow: hidden;
  width: 1%;
  height: 50px;
  text-align: center;
  vertical-align: middle;
  white-space: nowrap;
  text-overflow: ellipsis;
  color: #929292;
}
.mui-bar-tab .mui-tab-item-z.mui-active {
  color: #007aff;
}
.mui-bar-tab .mui-tab-item-z .mui-icon {
  top: 3px;
  width: 24px;
  height: 24px;
  padding-top: 0;
  padding-bottom: 0;
}
.mui-bar-tab .mui-tab-item-z .mui-icon ~ .mui-tab-label {
  font-size: 11px;
  display: block;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
