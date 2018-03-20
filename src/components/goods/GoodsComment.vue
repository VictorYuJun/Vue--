<template>
  <div>
      <cmt :id="id"></cmt>
  </div>
</template>
<script>
    import cmt from '../subcomponents/comment.vue'
    export default {
      data(){
        return{
          id:this.$route.params.id
        }
      },
      components:{
          cmt
      }
    }
</script>
<style lang="scss" scoped>

</style>