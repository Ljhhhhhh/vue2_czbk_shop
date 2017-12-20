<template>
    <div id="tmpl">
        <div id="hostcomment">
            <h3>提交评论</h3>
            <hr>
            <textarea name="" id="" cols="10" rows="5" placeholder="请输入需要评论的内容" v-model="postcontent"></textarea>
            <mt-button type="primary" size="large" @click="postcomment">提交</mt-button>
        </div>
        <div id="list">
            <h3>评论列表</h3>
            <ul class="mui-table-view">
                <li class="mui-table-view-cell" v-for="(item,index) in list">
                    <div class="mui-media-body">
                        {{item.id}}楼<span class="time">{{item.create_time | inttimefmt('YYYY-MM-DD HH:mm:ss')}}</span>
                        <p class='mui-ellipsis'>{{item.content}}</p>
                    </div>
                </li>
            </ul>
            <mt-button type="danger" @click="loadmore" size="large" :disabled="disabled">加载更多</mt-button>
        </div>
    </div>
</template>
<script>
    import { Toast } from 'mint-ui';
    export default{
        data(){
            return {
                postcontent: '',
                list:[],//评论数据
                page:1,
                disabled:false
            }
        },
        props: ['id'],
        created(){
            this.getlist(this.page);
        },
        methods: {
            getlist(){
                let url = 'http://www.ljhzx.com/apiget?page='+this.page;
                this.$http.get(url).then(function(response){
                    if(!response.body.length){
//                        this.disabled=true;
                        Toast('没有更多评论');
                        this.page=this.page-1;
                    }
                    this.list=this.list.concat(response.body);
                })
            },
            loadmore(){

              this.page+=1;
                this.getlist();
                console.log(this.page)
            },
            postcomment(){
                if(this.postcontent.trim().length<=0){
                    Toast('评论的内容不能为空');
                    return;
                }
                let url = 'http://www.ljhzx.com/apiadd';
                this.$http.post(url, {content: this.postcontent}, {emulateJSON: true}).then(function (response) {
                    console.log(response.body);
                    if(response.body==1){
                        Toast('评论成功');
                        this.getlist();
                        this.postcontent='';
                    }else{
                        Toast('评论失败');
                    }

                })
            }
        }
    }
</script>
<style scoped>
    #postcomment {
        padding: 5px;
    }

    #postcomment p {
    }
    #list{
        margin-top: 30px;
    }
    #list .time{
        padding-left: 15px;
        font-size: 0.6em;
    }
    #list .mui-ellipsis{
        line-height: 1.5em;
        font-size: 18px;
    }
</style>