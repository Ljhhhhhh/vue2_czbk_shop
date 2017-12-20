<template>
  <div id="tmpl">
      <mt-swipe :auto="0">
      <mt-swipe-item v-for="item in imgs" :key="item.id">
        <img :src="item.src">
      </mt-swipe-item>
    </mt-swipe>
  </div>
</template>
<script>
    export default{
        props:['imgs'],//接收父组件传入数据
        data(){
            return {

            }
        }
    }
</script>
<style lang="less" scoped>
.mint-swipe{
  height: 250px;
}
.mint-swipe-item{
  background-color: red;
  width: 100%;
  height: 250px;
}
.mint-swipe-item img{
  width: 100%;
}
</style>
