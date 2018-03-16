// 入口文件
import Vue from 'vue';

//导入路由
import VueRouter from 'vue-router'
Vue.use(VueRouter)

//导入MUI 样式
import './lib/mui/css/mui.min.css'
import './lib/mui/css/icons-extra.css'
// 按需求导入Mint-UI 组件
import { Header } from 'mint-ui';

Vue.component(Header.name, Header);
//导入路由模块
import router from './router.js'

// 导入app 跟组件
import app from './App.vue'
var vm = new Vue({
    el: '#app',
    data: {

    },
    render: c => c(app),
    router
})