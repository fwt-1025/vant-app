<template>
  <div>
  <div class="shopContent">
    <div class="hot-box" v-for="(item,index) in shopOptions" :key="index">
      <div class="hot-goods" @click='goodsContent(index)'>
        <a href="javascript:;" class="hot-img">
          <img v-lazy="item.imgUrl" alt="">
        </a>
        <a href="javascript:;" class="hot-title">{{item.descript}}</a>
        <p class="shop-price">
          <span><span class="pay">￥</span>{{item.price}}</span>
          <span class="pay-people">{{item.payNumber}}人付款</span>
        </p>
      </div>
    </div>
  </div>
  <p style="padding:30px 0;text-align:center;color:#aaa">没有更多内容了</p>
</div>
</template>

<script>
export default {
  props: ['clothName'],
  data () {
    return {
      shopOptions: [],
      shopData: [],
      cloName: ''
    }
  },
  watch: {
    clothName: {
      handler (o, n) {
        if (o) {
          this.shopData = []
          this.cloName = o
          this.getGoods()
        }
      },
      deep: true
    }
  },
  created () {
    this.getGoods()
  },
  methods: {
    getGoods () {
      this.cloName = this.clothName
      let data = {}
      for (var i = 0; i < 10; i++) {
        data = {
          id: '3000' + i,
          descript: '上衣打折快来抢购' + i,
          price: (Math.ceil(Math.random()*100) + 20.99).toFixed(2),
          payNumber: Math.ceil(Math.random() * 1000),
          payarea: '北京市',
          imgurl: require(`@/assets/${this.cloName}/${(i + 1)}.jpg`)
        }
        this.shopData.push(data)
      }
      this.shopOptions = this.shopData
    },
    goodsContent (index) {
      let data = this.shopOptions[index]
      this.$router.push({path: '/gooddetail', query: data})
    }
  },
  destroyed () {
    this.shopData = []
  }
}
</script>

<style lang='scss' scoped>
img{
  width:100%;
  height:100%;
}
.shopContent{
  /deep/ .hot-box{
    width:45.5vw;
    height: 40vh;
    float:left;
    margin-right: 3vw;
    margin-top:3vw;
    background: #fff;
    border-radius: 5px;
    box-shadow: 1px 2px 3px 1px #ccc;
    .hot-goods{ width: 100%;height: 100%}
    .hot-img{
      display: block;
      width: 100%;
      height:70%;
      border-radius: 5px 5px 0 0;
      background: #f00;
    }
    .hot-title{
      display: block;
      width: 95%;
      height: 20px;
      margin: 5px auto;
      font-size: 12px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .shop-price {
      width: 95%;
      height: auto;
      margin: 0 auto;
      color: #f00;
      .pay,.pay-people{font-size: 12px;}
      .pay-people{color: #777777;}
    }
  }
  /deep/ .hot-box:nth-child(odd) {
    margin-left: 3vw !important;
  }
}
</style>