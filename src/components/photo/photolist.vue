<template>
    <div id="tmpl">
        <div id="cate">
            <ul>
                <li v-for="item in cates" :key=item.cate @click="getlists(item.cate)">
                    {{item.name}}
                </li>
            </ul>
        </div>
        <div id="imglist">
            <ul>
                <li v-for="item in list" :key="item.url">
                    <router-link v-bind="{to:'/photo/photoinfo/'+cates[Math.floor(Math.random()*5)].cate}">
                    <img v-lazy="item.picUrl">
                    <p>{{item.title}}</p>
                    </router-link>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
    import config from '../../common/config.js';
    import {
        Toast
    } from 'mint-ui';
    export default {
        data() {
            return {
                url: '',//config.apiurl + config.apiit + '?key=' + config.apikey + '&num=10',
                cates: [
                    {
                        name: '互联网',
                        cate: 'it/'
                    },
                    {
                        name: '体育',
                        cate: 'tiyu/'
                    },
                    {
                        name: '花边',
                        cate: 'huabian/'
                    },
                    {
                        name: '奇闻',
                        cate: 'qiwen/'
                    },
                    {
                        name: '健康',
                        cate: 'health/'
                    },
                ],
                list: [
                ] //存图片
            }
        },
        created() {
            this.getlists();
        },
        methods: {
            getlists(c) {
                let cate=c || 'it/';
                this.url=config.apiurl+cate+'?key=' + config.apikey + '&num=10';
                this.$http.get(this.url).then(function(response){
                    console.log(response.body);
                    this.list=response.body.newslist;
                })
            }
        }
    }
</script>
<style scoped>
    ul,li{
        margin: 0;
        padding: 0;
        list-style-type: none;
    }
    #cate {
        margin: 0;
        padding: 0;
        width: 100%;
        line-height: 30px;
        overflow-x: auto;
    }

    #cate ul {
        margin: 0;
        padding: 0;
        white-space: nowrap;
    }

    #cate ul li {
        list-style-type: none;
        display: inline-block;
        padding: 0 10px;
        color: #4a82d1;
        cursor: pointer;
    }
    #imglist img{
        width: 100%;
    }
    #imglist li{
        position: relative;
        margin-bottom: 15px;
    }
    #imglist li p{
        margin-bottom: 0;
        position: absolute;
        bottom: 0;
        left: 0;
        line-height: 40px;
        background-color: rgba(0, 0, 0, 0.3);
        color: #FFF;
        text-indent: 1em;
        width: 100%;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
    }
</style>