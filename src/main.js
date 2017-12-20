// 1.0 导入vue核心包
import Vue from 'vue';

// 2.0 导入App.vue的vue对象
import App from './App.vue';

// 3.0 将vue-router集成到这个项目中来
import vueRouter from 'vue-router';
// 3.0.1 将vueRouter对象绑定到Vue对象上
Vue.use(vueRouter);

// 3.0.2 导入路由规则对应的组件对象
import home from './components/home.vue';
import shopcar from './components/shopcar/car.vue';
import newslist from './components/news/newslist.vue';
import newsinfo from './components/news/newsinfo.vue';
import photolist from './components/photo/photolist.vue';
import photoinfo from './components/photo/photoinfo.vue';
import goodslist from './components/goods/goodslist.vue';
import goodsinfo from './components/goods/goodsinfo.vue';
import car from './components/shopcar/car.vue';
// 3.0.2 定义路由规则
var router1 = new vueRouter({
    linkActiveClass: 'mui-active', //改变路由激活时的class名称
    routes: [
        { path: '/', redirect: 'home' }, //重定向
        { path: '/home', component: home },
        { path: '/shopcar', component: shopcar },
        { path: '/news/newslist', component: newslist },
        { path: '/news/newsinfo/:id', component: newsinfo },
        { path: '/photo/photolist', component: photolist },
        { path: '/photo/photoinfo/:cate', component: photoinfo },
        { path: '/goods/goodslist', component: goodslist },
        { path: '/goods/goodsinfo/:id', component: goodsinfo },
        { path: '/shopcar/car', component: car },
    ]
});
import 'mint-ui/lib/style.min.css';
import mintui from 'mint-ui';
Vue.use(mintui);
import '../statics/mui/css/mui.css';
import '../statics/css/site.css';
import vueResource from 'vue-resource';
import moment from 'moment';
Vue.filter('datefmt', function(input, fmtstring) {
    return moment(input).format(fmtstring);
});
Vue.filter('inttimefmt', function(input, fmtstring) {
    return moment.unix(input).format(fmtstring);
});
Vue.use(vueResource);
// 3.0 利用Vue对象进行解析渲染
import VuePreview from 'vue-preview';
Vue.use(VuePreview); //使用图片预览组件

new Vue({
    el: '#app',
    // 使用路由对象实例
    router: router1,
    // render:function(create){create(App)} //es5的写法
    render: c => c(App) // es6的函数写法 =>：goes to
});