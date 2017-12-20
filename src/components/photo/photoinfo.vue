<template>
    <div id="tmpl">
        <div id="desc">
            <h3 class="title">详情信息：</h3>
            <p>分类：{{cate}}</p>
            <p>发布时间：{{time | datefmt('YYYY-MM-DD HH:mm:ss')}}</p>
            <hr>
            <div class="mui-content">
                <ul class="mui-table-view mui-grid-view mui-grid-9">
                    <li v-for="(item,index) in imglist" class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                        <img class="preview-img" height="100" :src="item.picUrl" @click="$preview.open(index, imglist)">
                    </li>
                </ul>
            </div>
        </div>
        <div id="comment">
            <comment :id="id"></comment>
        </div>
    </div>
</template>
<script>
    import config from "../../common/config.js";
    import comment from "../subcom/comment.vue";
    export default {
        components: {
            comment
        },
        data() {
            return {
                cate: "",
                id: 0,
                time: new Date(),
                imglist: []
            };
        },
        created() {
            this.cate = this.$route.params.cate;
            this.getimglist();
        },
        methods: {
            getimglist() {
                let url = config.apiurl + this.cate + "/?key=" + config.apikey + "&num=9";
                this.$http.get(url).then(function (response) {
                    let list=response.body.newslist;
                    list.forEach(function(item){
                        let img=document.createElement('img');
                        img.src=item.picUrl;
                        console.log(img.height);
                        
                        item.h=img.height;
                        item.w=img.width;
                    });
                    this.imglist = list;
                    console.log(this.imglist);
                    
                });
            }
        }
    };
</script>
<style scoped>
    ul,
    li {
        margin: 0;
        padding: 0;
    }

    #desc .title {
        color: #666;
        font-size: 16px;
        line-height: 30px;
    }

    li.mui-table-view-cell img {
        width: 100%;
        height: 100%;
    }
</style>