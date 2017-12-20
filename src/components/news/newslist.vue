<template>
<div id="tmpl">
  <ul class="mui-table-view" v-for="item in list">
    <li class="mui-table-view-cell mui-media">
        <router-link v-bind="{to:'/news/newsinfo/'+item.title}">
            <img class="mui-media-object mui-pull-left" :src="item.picUrl">
            <div class="mui-media-body">
                {{item.title}}
                <p class='mui-ellipsis'>{{date | datefmt('YYYY-MM-DD HH:mm:ss')}}</p>
            </div>
        </router-link>
    </li>
</ul>
</div>
</template>
<script>
import {
  Toast
} from 'mint-ui';
import config from '../../common/config';
export default {
  //http://api.huceo.com/huabian?key=0a9cfa0ce6be71dcb4e3c500f6c2577f&num=3
  data() {
    return {
      date:new Date(),
      list: []
    };
  },
  created() {
    //do something after creating vue instance
    this.getnewslist();
  },
  methods: {
    getnewslist() {
      let url=config.apiurl+config.apiit+'?key='+config.apikey+'&num=10';
      this.$http.get(url).then(function(response) {
        let data = response.body;
        if (data.code != 200) {
          Toast(data.msg);
          return;
        }
        this.list = data.newslist;
      })
    }
  }
}
</script>
<style scoped>
</style>
