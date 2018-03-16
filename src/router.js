import VueRouter from 'vue-router'

//导入路由组建
import HomeContainer from './components/tabbar/HomeContainer.vue'
import MemberContainer from './components/tabbar/MemberContainer.vue'
import SearchContainer from './components/tabbar/SearchContainer.vue'
import ShopcarContainer from './components/tabbar/ShopcarContainer.vue'

// 3. 创建路由对象
var router = new VueRouter({
  routes: [
    { path: '/home', component: HomeContainer},
    { path: '/member', component: MemberContainer },
    { path: '/search', component: SearchContainer },
    { path: '/shopcar', component: ShopcarContainer }
  ],
  linkActiveClass:'mui-active'  //覆盖默认的路由高亮的类，默认的是router-link-active
})

// 把路由对象暴露出去
export default router