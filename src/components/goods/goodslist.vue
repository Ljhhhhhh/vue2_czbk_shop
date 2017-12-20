<template>
    <div id="tmpl">
        <div class="mui-content" style="background-color:#fff">
            <ul class="mui-table-view mui-grid-view">
                <li class="mui-table-view-cell mui-media mui-col-xs-6" v-for="item in list">
                    <router-link v-bind="{to:'/goods/goodsinfo/'+item.id}">
                        <img class="mui-media-object" :src=item.picture>
                        <div class="mui-media-body">{{item.product_name}}</div>
                        <div class="desc">
                            <p>
                                <span>￥{{item.price*item.discount}}</span>
                                <s>￥{{item.price}}</s>
                            </p>
                            <strong>{{item.color}}</strong>
                        </div>
                    </router-link>
                </li>
            </ul>
        </div>

    </div>
</template>
<script>
    export default {
        data() {
            return {
                list: []
            }
        },
        created() {
            this.getproducts();
        },
        methods: {
            getproducts() {
                let url = 'http://www.ljhzx.com/apiproduct';
                this.$http.get(url).then(function (response) {
                    let products = response.body;
                    products.forEach(function (item) {
                        item.picture = 'http://www.ljhzx.com/qxhat/public/uploads/' + item.picture;
                    });
                    this.list = products;
                    console.log(this.list);
                })
            }
        }
    }
</script>
<style lang="less" scoped>
    .mui-content li.mui-table-view-cell {
        border: 1px solid #CCC;
        padding: 0;
        margin: 0;
        margin-bottom: 10px;
        a {
            margin: 0;
            .desc {
                width: 100%;
                height: 60px;
                background-color: rgba(0, 0, 0, 0.1);
                p {
                    padding: 5px 0;
                    text-align: left;
                    span {
                        display: inline-block;
                        padding: 0 10px;
                        &:first-child {
                            color: red;
                            font-size: 1.5em;
                        }
                    }
                }
                strong {
                    text-align: left;
                    color: red;
                }
            }
        }
    }

    .mui-table-view.mui-grid-view .mui-table-view-cell>a:not(.mui-btn) {
        margin: 0;
    }

    .mui-table-view.mui-grid-view {
        padding: 0;
    }

    .mui-table-view.mui-grid-view .mui-table-view-cell .mui-media-object {
        width: 100%;
        height: 200px;
    }

    .mui-table-view.mui-grid-view .mui-table-view-cell .mui-media-body {
        margin-top: 0;
        line-height: 30px;
        font-size: 16px;
        color: #333;
        font-weight: bolder;
        height: 30px;
    }
</style>