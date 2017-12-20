<template lang="html">
  <div class="" id="tmpl">
    <div v-for="(item,index) in datalist" class="carlist">
      <mt-switch v-model="incar[index]" class="switch"></mt-switch>
      <img :src="item.picture">
      <div class="num">
        <h5>{{item.product_name}}</h5>
        <p>
          ￥{{item.price*item.discount}}
          <carinputNumber :initCount="item.cou" :goodsid="item.id" v-on:cardataobj="getinputnumber"></carinputNumber>
          <span @click="delpro(index,item.id)">删除</span>
        </p>
      </div>
    </div>
    <div class="countmoney">
      <h3>总计(不含运费)</h3>
      <p>已经勾选商品
        <span>{{totalcount}}</span>件，总价￥
        <span>{{totalprice}}</span>元</p>
      <mt-button type="danger" class="buybtn">去结算</mt-button>
    </div>
  </div>
</template>

<script>
import carinputNumber from "../subcom/carinputNumber.vue";
import {
  getgoodsObject,
  updateDate,
  removeItem
} from "../../common/localsg.js";
export default {
  components: {
    carinputNumber
  },
  data() {
    return {
      incar: [],
      inputNumberCount: 0,
      datalist: [],
      totalprice: 0
    };
  },
  computed: {
    totalcount() {
      var turearr = this.incar.filter(function(item) {
        return item;
      });
      var amout = 0;
      this.incar.forEach((item, index) => {
        if (item) {
          var count = this.datalist[index].cou;
          var price = this.datalist[index].price;
          var discount = this.datalist[index].discount;
          var itemtotal = count * price * discount;
          amout += itemtotal;
        }
      });
      this.totalprice = amout;
      return turearr.length;
    }
  },
  created() {
    this.getdatalist();
  },
  methods: {
    delpro(index, id) {
      this.incar.splice(index, 1);
      this.datalist.splice(index, 1);
      removeItem(id);
    },
    getinputnumber(resObj) {
      updateDate(resObj);
      for (var i = 0; i < this.datalist.length; i++) {
        if (this.datalist[i].id == resObj.goodsid) {
          if ((resObj.type = "add")) {
            this.datalist[i].cou = this.datalist[i].cou + 1;
          } else {
            this.datalist[i].cou = this.datalist[i].cou - 1;
          }
          break;
        }
      }
    },
    getcount(count) {
      this.inputNumberCount = count;
    },
    getdatalist() {
      var obj = getgoodsObject();
      var idstring = "";
      for (var key in obj) {
        idstring += key + ",";
      }
      idstring = idstring.substring(0, idstring.length - 1);
      let url = "http://www.ljhzx.com/apicarshow?idstr=" + idstring;
      let _this = this;
      this.$http.get(url).then(function(response) {
        this.datalist = response.body;
        this.datalist.forEach(item => {
          item.cou = obj[item.id];
          this.incar.push(true);
          item.picture =
            "http://www.ljhzx.com/qxhat/public/uploads/" + item.picture;
        });
        console.log(this.datalist);
      });
    }
  }
};
</script>

<style lang="less" scoped>
.carlist {
  width: 100%;
  height: auto;
  margin-bottom: 15px;
  .switch {
    display: inline-block;
  }
  img {
    width: 100px;
    height: auto;
  }
  div.num {
    display: inline-block;
    width: 55%;
    h5 {
      color: #333;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
      margin-top: 0;
      line-height: 20px;
    }
    p {
      font-size: 16px;
      margin-bottom: 0;
      span {
        color: red;
      }
    }
  }
}

.countmoney {
  padding: 10px;
  text-align: left;
  background-color: #ccc;
  margin-top: 15px;
  position: relative;
  h3 {
    font-size: 18px;
    font-weight: normal;
    margin-bottom: 10px;
  }
  .buybtn {
    position: absolute;
    right: 15px;
    top: 50%;
    transform: translateY(-50%);
  }
}
</style>