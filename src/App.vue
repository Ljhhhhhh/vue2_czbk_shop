<!-- 以后项目的根组件 -->
<template>
<div>
  <mt-header fixed title="卢洁辉.VUE2项目"></mt-header>
  <div id="back">
    <a v-show="isshow" @click.prevent="backto">返回</a>
  </div>
  <router-view></router-view>
  <nav class="mui-bar mui-bar-tab">
    <router-link class="mui-tab-item" to="/home">
      <span class="mui-icon mui-icon-home"></span>
      <span class="mui-tab-label">首页</span>
    </router-link>
    <router-link class="mui-tab-item" to="/tabbar-with-chat">
      <span class="mui-icon mui-icon-email"></span>
      <span class="mui-tab-label">会员</span>
    </router-link>
    <router-link class="mui-tab-item" to="/shopcar/car">
      <span class="mui-icon mui-icon-contact">
        <span id="badge" class="mui-badge">0</span>
      </span>
      <span class="mui-tab-label">购物车</span>
    </router-link>
    <router-link class="mui-tab-item" to="/tabbar-with-map">
      <span class="mui-icon mui-icon-gear"></span>
      <span class="mui-tab-label">搜索</span>
    </router-link>
  </nav>
</div>
</template>

<script>
// 按需导入
import { vm, COUNTSTR } from "./common/vm.js";
vm.$on(COUNTSTR, function(count) {
  var badgeobj = document.getElementById("badge");
  //  console.log(badgeobj);

  badgeobj.innerText = parseInt(badgeobj.innerText) + count;
});
export default {
  // es6的导出对象的写法
  data() {
    //等价于 es5的 data:function(){
    return {
      isshow: false
    };
  },
  watch: {
    $route: function(newroute, oldroute) {
      if (newroute.path.toLowerCase() == "/home") {
        this.isshow = false;
      } else {
        this.isshow = true;
      }
    }
  },
  methods: {
    backto() {
      this.$router.go(-1);
    }
  },
  created() {}
};
</script>

<style lang="less" scoped>
/*当前页面的css样式写到这里，其中scoped表示这个里面写的css代码只是在当前组件页面上有效，不会去影响到其他组件页面*/
#back {
  z-index: 101;
  position: absolute;
  top: 6px;
  left: 15px;
  a {
    color: white;
    font-size: 14px;
    line-height: 30px;
  }
}
</style>
