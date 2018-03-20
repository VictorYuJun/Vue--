import VueRouter from 'vue-router'

//导入路由组建
import HomeContainer from './components/tabbar/HomeContainer.vue'
import MemberContainer from './components/tabbar/MemberContainer.vue'
import SearchContainer from './components/tabbar/SearchContainer.vue'
import ShopcarContainer from './components/tabbar/ShopcarContainer.vue'
import NewsList from './components/news/NewsList.vue'
import NewsInfo from './components/news/NewsInfo.vue'
import PictureList from './components/pictures/pictureLists.vue'
import PictureInfo from './components/pictures/pictureInfo.vue'
import GoodList from './components/goods/GoodList.vue'
import GoodsInfo from './components/goods/GoodsInfo.vue'
import GoodsDesc from './components/goods/Goodsdesc.vue'
import GoodsComment from './components/goods/GoodsComment.vue'



// 3. 创建路由对象
var router = new VueRouter({
  routes: [
    { path: '/', redirect: '/home' },
    { path: '/home', component: HomeContainer},
    { path: '/member', component: MemberContainer },
    { path: '/search', component: SearchContainer },
    { path: '/shopcar', component: ShopcarContainer },
    { path: '/home/newslist', component: NewsList },
    { path: '/home/newsinfo/:id', component: NewsInfo },
    { path: '/home/picturelist', component: PictureList },
    { path: '/home/pictureinfo/:id', component: PictureInfo },
    { path: '/home/goodslist', component: GoodList },
    { path: '/home/goodsinfo', component: GoodsInfo, name:'GoodsI' },
    { path: '/home/goodsdesc/:id', component: GoodsDesc, name: 'GoodsDesc' },
    { path: '/home/goodscomment/:id', component: GoodsComment, name: 'GoodsComment' }
    
  ],
  linkActiveClass:'mui-active'  //覆盖默认的路由高亮的类，默认的是router-link-active
})

// 把路由对象暴露出去
export default router