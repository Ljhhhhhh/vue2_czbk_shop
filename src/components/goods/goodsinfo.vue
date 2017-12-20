<template>
    <div id="tmpl">
        <slider :imgs="imgs"></slider>
        <div id="buy">
            <h3>{{product.product_name}}</h3>
            <hr>
            <p>
                市场价：
                <s>￥{{product.price}}</s>
                &nbsp;&nbsp;限购价：
                <span>￥{{product.price*product.discount}}</span>
            </p>
            <p>购买数量：
                <inputNumber v-on:dataobj="getcount"></inputNumber>
                <transition name="show" v-on:before-enter="beforeEnter" v-on:enter="enter" v-on:after-enter="afterEnter">
                    <div v-show="isshow" class="ball"></div>
                </transition>
            </p>
            <p>
                <mt-button type="primary">立即购买</mt-button>
                <mt-button type="danger" @click='toshopcar'>加入购物车</mt-button>
            </p>
        </div>
        <div class="info">
            <p>产品货号：
                <span>{{product.no}}</span>
            </p>
            <p>产品颜色：
                <span>{{product.color}}</span>
            </p>
            <p>产品主材：
                <span>{{product.materials}}</span>
            </p>
            <p>产品品牌：
                <span>{{product.brand_name}}</span>
            </p>
            <p>产品款式：
                <span>{{product.design}}</span>
            </p>
            <p>产品风格：
                <span>{{product.product_style_name}}</span>
            </p>
        </div>
        <div class="content" v-html="product.content"></div>
        <comment :id='id'></comment>
    </div>
</template>
<script>
    import slider from '../subcom/slider.vue';
    import comment from '../subcom/comment.vue';
    import inputNumber from '../subcom/inputNumber.vue';
    import {
        vm,
        COUNTSTR
    } from '../../common/vm.js';
    import {
        setItem,
        valueObj
    } from '../../common/localsg.js';
    export default {
        components: {
            slider,
            comment,
            inputNumber
        },
        data() {
            return {
                id: 0, //产品ID
                product: '',
                imgs: [],
                inputNumberCount: 1,
                isshow: false
            }
        },
        created() {
            this.id = this.$route.params.id;
            this.getproduct(this.id)
        },
        methods: {
            //3个动画
            beforeEnter(el) {
                el.style.transform = "translate(0px,0px)";
            },
            enter(el, done) {
                el.offsetWidth;
                el.style.transform = "translate(75px,268px)";
                done();
            },
            afterEnter(el) {
                this.isshow = !this.isshow;
            },
            getproduct(id) {
                let _this = this;
                let url = 'http://www.ljhzx.com/apiproductshow?id=';
                this.$http.get(url + id).then(function (response) {
                    this.product = response.body;
                    let img = this.product.images;
                    img.forEach(function (item) {
                        item.src = 'http://www.ljhzx.com/qxhat/public/uploads/' + item.src;
                    });
                    this.imgs = img;
                })
            },
            getcount(count) {
                this.inputNumberCount = count;
            },
            toshopcar() { //加入购物车
                vm.$emit(COUNTSTR, this.inputNumberCount);
                valueObj.goodsid = this.id;
                valueObj.count = this.inputNumberCount;
                setItem(valueObj);
                this.isshow = !this.isshow;
            }
        }
    }
</script>
<style lang="less">
    .content p img {
        width: 100%;
        margin: 10px auto;
    }

    .ball {
        display: block;
        width: 15px;
        height: 15px;
        border-radius: 50%;
        background-color: red;
        position: absolute;
        left: 40%;
        bottom: 95px;
        transition: all 0.4s ease;
        z-index: 99;
    }
</style>