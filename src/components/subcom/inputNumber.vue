<template>
  <div id="subtmpl">
      <div class="inleft btn" @click='substrict'>-</div>
      <div class="incenter btn" v-text="count"></div>
      <div class="inright btn" @click='add'>+</div>
  </div>
</template>
<script>
    export default {
        data(){
            return {
                count:1
            }
        },
        methods:{
            substrict(){
                this.count--;
                if(this.count<1){
                    this.count=1;
                };
                this.sendmsg();
            },
            add(){
                this.count++;
                this.sendmsg();
            },
            sendmsg(){
                this.$emit('dataobj',this.count);
            }
        }
    }
</script>
<style lang="less" scoped>
    #subtmpl{
        display: inline-block;
         .btn{
        display: inline-block;
        width: 30px;
        height: 20px;
        border:1px solid #000;
        text-align: center;
        line-height: 20px;
    }
    }
    .inleft{

    }
</style>

