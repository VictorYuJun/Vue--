<template>
  <div class="picinfo-container">
      <h3 >{{picinfos.title}}</h3>
      <p class="subtitle">
          <span>发表时间:{{picinfos.add_time | dateFormat}}</span>
          <span>点击:{{picinfos.click}}次</span>  
      </p>
      <hr>

      <!-- 图区域 -->
      <div class="thumbs">
        <vue-preview :slides="list" @close="handleClose"  height="100" ></vue-preview>
      </div>
      <!-- 图片内容 -->
      <div class="content" v-html="picinfos.content"></div>
      <!-- 评论子组件 -->
      <cmt :id="id"></cmt>
  </div>
</template>
<script>
import comment from "../subcomponents/comment.vue";
import { Toast } from "mint-ui";
export default {
  data() {
    return {
      id: this.$route.params.id,
      picinfos: {},
      list: []
    };
  },
  created() {
    this.getPicInfo();
    this.getThumbs();
  },
  methods: {
    getPicInfo() {
      this.$http.get("api/getimageInfo/" + this.id).then(result => {
        if (result.body.status === 0) {
          this.picinfos = result.body.message[0];
        } else {
          Toast("图片详情加载失败");
        }
      });
    },
    getThumbs() {
      // 获取缩略图
      this.$http.get("api/getthumimages/" + this.id).then(result => {
        if (result.body.status === 0) {
          // 循环每个图片数据，补全图片的宽和高
          result.body.message.forEach(item => {
            item.msrc=item.src;
            item.w = 600;
            item.h = 400;
          });
          // 把完整的数据保存到 list 中
          this.list = result.body.message;
        }
      });
    },
    handleClose() {
      console.log("close event");
    }
  },
  components: {
    cmt: comment
  }
};
</script>
<style lang="scss" scoped>
.picinfo-container {
  padding: 0 4px;
  h3 {
    font-size: 16px;
    margin: 15px 0;
    text-align: center;
    color: lightblue;
  }
  .subtitle {
    font-size: 13px;
    color: lightgray;
    display: flex;
    justify-content: space-between;
  }
  .content {
    font-size: 13px;
    line-height: 30px;
  }
  .thumbs {
    img {
      width: 30px;
      height: 30px;
      margin: 10px;
      box-shadow: 0 0 8px #999;
    }
  }
}
</style>
