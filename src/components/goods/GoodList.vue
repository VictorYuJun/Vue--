<template>
  <div class="goods-list">
      <div class="goods-item" v-for="item in goodslists" :key="item.id" @click="toGoods(item.id)">
          <img :src="item.img_url" alt="">
          <h3 class="title">{{item.zhaiyao}}</h3>
          <div class="info">
              <p class="price">
                  <span class="now">￥{{item.sell_price}}</span>
                  <span class="old">￥{{item.market_price}}</span>
              </p>
              <p class="sell">
                  <span>热卖中</span>
                  <span>剩{{item.stock_quantity}}件</span>
              </p>
          </div>
        
      </div>
      <mt-button type="danger" size="large" @click="getMore">加载更多</mt-button>
  </div>
</template>
<script>
export default {
  data() {
    return {
      pageindex: 1,
      goodslists: []
    };
  },
  created() {
    this.getgoods();
  },
  methods: {
    getgoods() {
      this.$http.get("api/getgoods?pageindex=" + this.pageindex).then(result => {
        if (result.body.status === 0) {
          this.goodslists = this.goodslists.concat(result.body.message);
        }
      });
    },
    getMore() {
      this.pageindex++;
      this.getgoods();
    },
    toGoods(id){
        this.$router.push({name:'GoodsI',params:{id}})
    }
  }
};
</script>
<style lang="scss" scoped>
.goods-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 7px;
  .goods-item {
    width: 49%;
    border: 1px solid #ccc;
    box-shadow: 0 0 8px #ccc;
    margin: 4px 0;
    padding: 2px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    min-height: 293px;
    img {
      width: 100%;
    }
    .title {
      font-size: 14px;
    }
    .info {
      background-color: #eee;
      p {
        margin: 0;
        padding: 5px;
      }
      .price {
        .now {
          color: red;
          font-weight: bold;
          font-size: 16px;
        }
        .old {
          font-size: 12px;
          text-decoration: line-through;
          margin-left: 10px;
        }
      }
      .sell {
        display: flex;
        justify-content: space-between;
        font-size: 13px;
      }
    }
  }
}
</style>
