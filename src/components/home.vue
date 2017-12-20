<template lang="html">
  <div class="" id="tmpl">
    <!-- <mt-swipe :auto="0">
      <mt-swipe-item v-for="item in list" :key=item.url>
        <img :src="item.picUrl" alt="title">
      </mt-swipe-item>
    </mt-swipe> -->
    <slider :imgs="list"></slider>
    <div class="mui-content">
      <ul class="mui-table-view mui-grid-view mui-grid-9">
          <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
            <router-link to='/news/newslist'>
                  <span class="mui-icon mui-icon-1"></span>
                  <div class="mui-media-body">新闻资讯</div>
                </router-link>
              </li>
          <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
            <router-link to='/photo/photolist'>
                  <span class="mui-icon mui-icon-2"></span>
                  <div class="mui-media-body">图片分享</div>
                  <!-- <span class="mui-badge">5</span> -->
                </router-link>
              </li>
          <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
            <router-link to='/goods/goodslist'>
                  <span class="mui-icon mui-icon-3"></span>
                  <div class="mui-media-body">商品购买</div>
                </router-link>
              </li>
          <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
            <router-link to='/feedback'>
                  <span class="mui-icon mui-icon-4"></span>
                  <div class="mui-media-body">留言反馈</div>
                </router-link>
              </li>
              <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                <router-link to='/vide'>
                      <span class="mui-icon mui-icon-5"></span>
                      <div class="mui-media-body">视频专区</div>
                    </router-link>
                  </li>
          <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
            <router-link to='/callme'>
                  <span class="mui-icon mui-icon-6"></span>
                  <div class="mui-media-body">联系我们</div>
                </router-link>
              </li>
      </ul>
		</div>
  </div>
</template>

<script>
import { Toast } from 'mint-ui';
import config from '../common/config';
import slider from './subcom/slider.vue';
export default {
  components:{
    slider
  },
  data() {
    return {
      list: [ //http://api.huceo.com/meinv/?key=0a9cfa0ce6be71dcb4e3c500f6c2577f&num=3

      ]
    }
  },
  created() {
    this.getimgs();
  },
  methods: {
    getimgs() {
      let url = 'http://www.ljhzx.com/apiproductshow?id=2';
      this.$http.get(url).then(function(response) {
        let data = response.body.images;
        // this.list = data.images;
        data.forEach(function(item){
          item.src='http://www.ljhzx.com/qxhat/public/uploads/'+item.src;
        })
        this.list=data;
      })
    }
  }
}
</script>

<style lang="css" scoped>
.mui-content,.mui-content ul{
  background-color: #FFF;
}
.mui-content ul{
  border-top: 0;
  border-left: 0;
}
.mui-grid-view.mui-grid-9 .mui-table-view-cell{
  border-right: 0;
  border-bottom: 0;
}
.mui-icon::before{
  content: '';
  background-repeat: round;
  display: inline-block;
  width: 50px;
  height: 50px;
}
.mui-icon-1::before{
  background-image: url(../../statics/imgs/1.png);
}
.mui-icon-2::before{
  background-image: url(../../statics/imgs/2.png);
}
.mui-icon-3::before{
  background-image: url(../../statics/imgs/3.png);
}
.mui-icon-4::before{
  background-image: url(../../statics/imgs/4.png);
}
.mui-icon-5::before{
  background-image: url(../../statics/imgs/5.png);
}
.mui-icon-6::before{
  background-image: url(../../statics/imgs/6.png);
}
</style>
