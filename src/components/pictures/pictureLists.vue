<template>
  <div>
      <!-- 顶部滑动 -->
      <div id="slider" class="mui-slider ">
				<div id="sliderSegmentedControl" class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted">
					<div class="mui-scroll" >
						<a :class="['mui-control-item',item.id===0?'mui-active':'']" v-for="item in cates" :key="item.id" @click="getPicById(item.id)">{{item.title}}</a>
					</div>
        </div>
      </div>
        <ul class="piclist">
            <router-link v-for="item in piclists" :key="item.id" tag="li" :to="'/home/pictureinfo/'+item.id">
                <img v-lazy="item.img_url">
                <div class="info">
                    <h3 class="info-title">{{item.title}}</h3>
                    <div class="info-con">{{item.zhaiyao}}</div>
                </div>
            </router-link>
        </ul>
  </div>
</template>
<script>
import mui from "../../lib/mui/js/mui.js";
import { Toast } from "mint-ui";
export default {
  data() {
    return {
      cates: [],
      piclists: []
    };
  },
  created() {
    this.getCategory()
    this.getPicById(0)
  },
  mounter() {
    mui(".mui-scroll-wrapper").scroll({
      deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
    });
  },
  methods: {
    getCategory() {
      this.$http.get("api/getimgcategory").then(result => {
        if (result.body.status === 0) {
          result.body.message.unshift({ title: "全部", id: 0 });
          this.cates = result.body.message;
        } else {
          Toast("加载失败");
        }
      });
    },
    getPicById(cateid) {
      this.$http.get("api/getimages/" + cateid).then(result => {
        if (result.body.status === 0) {
          this.piclists = result.body.message;
        } else {
          Toast("加载失败");
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
* {
  touch-action: pan-y;
}
.piclist {
  margin: 0;
  padding: 10px;
  padding-bottom: 0;
  li {
    list-style: none;
    background-color: #ccc;
    text-align: center;
    margin-top: 10px;
    position: relative;
  }
  img {
    width: 100%;
    background-color: #ccc;
    box-shadow: 0 0 9px #999;
    display: block;
    
  }
  img[lazy="loading"] {
    width: 40px;
    height: 300px;
    margin: auto;
  }
  .info{
      position: absolute;
      left: 0;
      bottom: 0;
      color: #fff;
      background-color: rgba(0,0,0, .4);
      text-align: left;
      max-height: 84px;
      .info-title{
          font-size: 14px;
      }
      .info-con{
          font-size: 13px;
      }
  }
}
</style>
