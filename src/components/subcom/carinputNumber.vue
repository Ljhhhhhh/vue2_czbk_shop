<template>
  <div id="subtmpl">
      <div class="inleft btn" @click='substrict'>-</div>
      <div class="incenter btn" v-text="count"></div>
      <div class="inright btn" @click='add'>+</div>
  </div>
</template>
<script>
    export default {
        props:['initCount','goodsid'],
        data(){
            return {
                count:1,
                resObj:{goodsid:0,type:'add'}
            }
        },
        created(){
            this.count=this.initCount;
        },
        methods:{
            substrict(){
                this.count--;
                if(this.count<1){
                    this.count=1;
                    return;
                };
                this.sendmsg('substrict');
            },
            add(){
                this.count++;
                this.sendmsg('add');
            },
            sendmsg(type){
                this.resObj.type=type;
                this.resObj.goodsid=this.goodsid;
                this.$emit('cardataobj',this.resObj);
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

