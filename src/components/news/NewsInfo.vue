<template>
  <div class="newsinfo-container">
      <h3 class="title">{{newsinfos.title}}</h3>
      <p class="subtitle">
          <span>发表时间：{{newsinfos.add_time}}</span>
          <span>点击：{{newsinfos.click}}次</span>
      </p>
      <hr>
      <div class="content" v-html="newsinfos.content"></div>
      <cmt-box :id="this.id">

      </cmt-box>
  </div>
</template>
<script>
    import comment from '../subcomponents/comment.vue'
    import {Toast} from 'mint-ui'

    export default{
        data(){
            return{
                id:this.$route.params.id,
                newsinfos:{}
            }
        },
        created(){
            this.getNewsInfo();
        },
        methods:{
            getNewsInfo(){
                this.$http.get("api/getnew/"+this.id).then(result=>{
                    if(result.body.status===0){
                        this.newsinfos=result.body.message[0];
                    }else{
                        Toast('新闻详情加载失败')
                    }
                })
            }
        },
        components:{
            'cmt-box':comment
        }
    }
</script>
<style lang="scss" >
.newsinfo-container{
    padding: 0 4px;
    .title{
        font-size: 16px;
        margin: 15px 0;
        text-align: center;
        color: lightcoral;
    }
    .subtitle{
        font-size: 13px;
        color: lightblue;
        display: flex;
        justify-content: space-between;
    }
    .content{
        img{
            width: 100%;
        }
    }

}
</style>
