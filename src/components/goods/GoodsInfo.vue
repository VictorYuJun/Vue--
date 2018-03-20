<template>
  <div class="goods-container">
      <transition
      @before-enter="beforeEnter"
      @enter="enter"
      @after-enter="afterEnter" >
      <div class="ball" v-show="ballFlag" ref="ball"></div>
      </transition>
      <div class="mui-card">
				<div class="mui-card-content">
					<div class="mui-card-content-inner">
						<swiper :lunbotuList="lunbotuList1" :isfull="false"></swiper>
					</div>
				</div>
			</div>
      <!-- 商品购买 -->
			<div class="mui-card">
				<div class="mui-card-header">{{infos.title}}</div>
				<div class="mui-card-content">
					<div class="mui-card-content-inner">
						<p class="price">
              市场价: <del>￥{{infos.market_price}}</del>&nbsp;&nbsp;销售价: <span class="now_price">￥{{infos.sell_price}}</span>
            </p>
            <p>购买数量: <numbox @getconut="getSelectedCount" :max="infos.stock_quantity"></numbox> </p>
            
            <p>
              <mt-button type="primary" >立即购买</mt-button>
              <mt-button type="danger" @click="goIncar" >加入购物车</mt-button>
            </p>
					</div>
				</div>
			</div>
      <div class="mui-card">
				<div class="mui-card-header">商品参数</div>
				<div class="mui-card-content">
					<div class="mui-card-content-inner">
						<p>商品货号:{{infos.goods_no}}</p>
            <p>库存情况:{{infos.stock_quantity}}件</p>
            <p>上架时间:{{infos.add_time | dateFormat}}</p>
					</div>
          <div class="mui-card-footer">
            <mt-button type="primary" size="large" plain @click="goDesc(id)">图文详情</mt-button>
            <mt-button type="danger" size="large" plain @click="goComment(id)">商品评论</mt-button>
          </div>
				</div>
			</div>
  </div>
</template>
<script>
import swiper from "../subcomponents/swiper.vue";
import numbox from "../subcomponents/goodsinfo-numbox.vue";
export default {
  data() {
    return {
      id: this.$route.params.id,
      lunbotuList1: [],
      infos: {},
      ballFlag: false,
      selectedCount: 1
    };
  },
  created() {
    this.getLunbotus();
    this.getInfos();
  },
  methods: {
    getLunbotus() {
      this.$http.get("api/getthumimages/" + this.id).then(result => {
        if (result.body.status === 0) {
          result.body.message.forEach(item => {
            item.img = item.src;
          });
          this.lunbotuList1 = result.body.message;
        }
      });
    },
    getInfos() {
      this.$http.get("api/goods/getinfo/" + this.id).then(result => {
        if (result.body.status === 0) {
          this.infos = result.body.message[0];
        }
      });
    },
    goDesc(id) {
      this.$router.push({ name: "GoodsDesc", params: { id } });
    },
    goComment(id) {
      this.$router.push({ name: "GoodsComment", params: { id } });
    },
    goIncar() {
      this.ballFlag = !this.ballFlag;
      var goodsinfo = {
        id: this.id,
        count: this.selectedCount,
        price: this.infos.sell_price,
        selected: true
      };
      this.$store.commit('addToCar',goodsinfo)
    },
    beforeEnter(el) {
      el.style.transform = "translate(0,0)";
    },
    enter(el, done) {
      el.offsetWidth;

      //获取小球的位置
      const ballPosition = this.$refs.ball.getBoundingClientRect();
      const badgePosition = document
        .getElementById("badge")
        .getBoundingClientRect();

      const xDist = badgePosition.left - ballPosition.left;
      const yDist = badgePosition.top - ballPosition.top;

      el.style.transform = `translate(${xDist}px,${yDist}px)`;
      el.style.transition = "all 0.5s cubic-bezier(.4,.02,1,.79)";
      done();
    },
    afterEnter(el) {
      this.ballFlag = !this.ballFlag;
    },
    getSelectedCount(count) {
      this.selectedCount = count;
    }
  },
  components: {
    swiper,
    numbox
  }
};
</script>
<style lang="scss" scoped>
.goods-container {
  background-color: #eee;
  overflow: hidden;

  .now_price {
    color: red;
    font-size: 16px;
    font-weight: bold;
  }
  .mui-card-footer {
    display: block;
    button {
      margin: 15px 0;
    }
  }
  .ball {
    width: 15px;
    height: 15px;
    position: absolute;
    border-radius: 50%;
    z-index: 98;
    background-color: red;
    top: 390px;
    left: 146px;
  }
}
</style>
