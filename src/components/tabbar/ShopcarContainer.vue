<template>
    <div class="shopcar-container">
        <div class="goods-list">
            <!-- 商品列表 -->
            <div class="mui-card" v-for="(item,i) in goodslist" :key="item.id">
				<div class="mui-card-content">
					<div class="mui-card-content-inner">
						<mt-switch 
                        v-model="$store.getters.getGoodsSelected[item.id]"
                        @change="getChange(item.id,$store.getters.getGoodsSelected[item.id])"></mt-switch>
                        <img :src="item.thumb_path" alt="">
                        <div class="info">
                            <h3>{{item.title}}</h3>
                            <p>
                                <span class="price">￥{{item.sell_price}}</span>
                                <numbox :goodsCount="$store.getters.getGoodsCount[item.id]" :goodsId="item.id"></numbox>
                                <a href="" @click.prevent="remove(item.id,i)">删除</a>
                            </p>
                        </div>
					</div>
				</div>
			</div>
        </div>
        <div class="goods-pay">
            <!-- 结算区域 -->
            <div class="mui-card">
				<div class="mui-card-content">
					<div class="mui-card-content-inner">
						<div class="left">
                            <p>总计(不含运费)</p>
                            <p>已勾选 <span class="red">{{$store.getters.getGoodsCountAndAmount.count}}</span> 件,总价 <span class="red">￥{{$store.getters.getGoodsCountAndAmount.amount}}</span>   </p>
                        </div>
                        <mt-button type="danger">去结算</mt-button>
					</div>
				</div>
			</div>
        </div>
    </div>
</template>
<script>
import numbox from "../subcomponents/shopcar-numbox.vue";
export default {
  data() {
    return {
      goodslist: {}
    };
  },
  created() {
    this.getGoodsList();
  },
  methods: {
    getGoodsList() {
      var idArr = [];
      this.$store.state.car.forEach(item => idArr.push(item.id));
      if (idArr.length <= 0) {
        return;
      }
      this.$http
        .get("api/goods/getshopcarlist/" + idArr.join(","))
        .then(result => {
          if (result.body.status === 0) {
            this.goodslist = result.body.message;
          }
        });
    },
    remove(id, index) {
      this.goodslist.splice(index, 1);
      this.$store.commit("removeFromCar", id);
    },
    getChange(id, val) {
      this.$store.commit("updateGoodsSelected", { id, selected: val });
    }
  },
  components: {
    numbox
  }
};
</script>
<style lang="scss" scoped>
.shopcar-container {
  background-color: #eee;
  overflow: hidden;
  .goods-list {
    .mui-card-content-inner {
      display: flex;
      align-items: center;
    }
    img {
      width: 60px;
      height: 60px;
    }

    .info {
      display: flex;
      flex-direction: column;
      justify-content: space-between;

      h3 {
        font-size: 13px;
        padding-left: 2px;
      }
      p {
        margin: 0;
      }
      .price {
        color: red;
      }
    }
  }
  .goods-pay {
    .mui-card-content-inner {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .red {
        color: red;
        font-weight: bold;
        font-size: 16px;
      }
    }
  }
}
</style>
