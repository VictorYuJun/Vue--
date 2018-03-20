// 入口文件
import Vue from 'vue';

//导入路由
import VueRouter from 'vue-router'
Vue.use(VueRouter)
//注册 vuex
import Vuex from 'vuex'
Vue.use(Vuex)

var car = JSON.parse(localStorage.getItem('car') || '[]')

var store = new Vuex.Store({
    state: {//this.$store.state.***
        car: car
    },
    mutations: {//this.$store.commit('方法名称','按需传递唯一参数')
        addToCar(state, goodsinfo) {
            var flag = false
            state.car.some(item => {
                if (item.id == goodsinfo.id) {
                    item.count += parseInt(goodsinfo.count)
                    flag = true
                    return true
                }
            })
            if (!flag) {
                state.car.push(goodsinfo)
            }
            localStorage.setItem('car', JSON.stringify(state.car))
        },
        updateGoodsInfo(state, goodsinfo) {
            state.car.some(item => {
                if (item.id == goodsinfo.id) {
                    item.count = parseInt(goodsinfo.count)
                    return true
                }
            })
            localStorage.setItem('car', JSON.stringify(state.car))
        },
        removeFromCar(state, id) {
            state.car.some((item, i) => {
                if (item.id = id) {
                    state.car.splice(i, 1)
                    return true
                }
            })
            localStorage.setItem('car', JSON.stringify(state.car))
        },
        updateGoodsSelected(state, info) {
            state.car.some(item => {
                if (item.id == info.id) {
                    item.selected = info.selected
                }
                return
            })
            localStorage.setItem('car', JSON.stringify(state.car))
        }

    },
    getters: {//this.$store.getters.***
        getAllCount(state) {
            var c = 0;
            state.car.forEach(item => {
                c += item.count
            })
            return c
        },
        getGoodsCount(state) {
            var o = {};
            state.car.forEach(item => {
                o[item.id] = item.count
            });
            return o;
        },
        getGoodsSelected(state) {
            var o = {}
            state.car.forEach(item => {
                o[item.id] = item.selected
            })
            return o;
        },
        getGoodsCountAndAmount(state) {
            var o = {
                count:0,
                amount:0
            }
            state.car.forEach(item => {
                if (item.selected) {
                    o.count += item.count
                    o.amount += item.price * item.count
                }
            })
            return o;
        }
    }
})

//导入moment:格式化时间
import moment from 'moment'
//定义全局过滤器
Vue.filter('dateFormat', function (dataStr, pattern = "YYYY-MM-DD hh:mm:ss") {
    return moment(dataStr).format(pattern)
})

//导入安装 vue-resaource
import VueResource from 'vue-resource'
Vue.use(VueResource)
//设置请求根路径
Vue.http.options.root = 'http://vue.studyit.io';
//设置全局post表单数据格式
Vue.http.options.emulateJSON = true;

//缩放图
import VuePreview from 'vue-preview'

// defalut install
Vue.use(VuePreview)


//导入MUI 样式
import './lib/mui/css/mui.min.css'
import './lib/mui/css/icons-extra.css'

// 按需求导入Mint-UI 组件
// import { Header, Swipe, SwipeItem,Button,Lazyload} from 'mint-ui';

// Vue.component(Header.name, Header);
// Vue.component(Swipe.name, Swipe);
// Vue.component(SwipeItem.name, SwipeItem);
// Vue.component(Button.name, Button);
// Vue.use(Lazyload);
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
Vue.use(MintUI)
//导入路由模块
import router from './router.js'

// 导入app 跟组件
import app from './App.vue'
import { parse } from 'path';
var vm = new Vue({
    el: '#app',
    data: {

    },
    render: c => c(app),
    router,
    store
})