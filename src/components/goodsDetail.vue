<template>
  <div>
    <van-nav-bar
      title="商品详情"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    />
    <div class="goods">
      <div class="good-img">
        <img style="width:80vw;height:100%" :src=goodsInfo.imgurl alt="">
      </div>
      <div class="good-detail">
        <div class="good-price">
          ￥{{goodsInfo.price}}
        </div>
        <div class="good-descript">
          {{goodsInfo.descript}}
        </div>
        <div class="good-other">
          <div class="good-send">
            快递: 免运费
          </div>
          <div class="good-pay">
            月销{{goodsInfo.payNumber}}
          </div>
          <div class="good-area">
            {{goodsInfo.payarea}}
          </div>
        </div>
      </div>
    </div>
    <van-goods-action>
      <van-goods-action-mini-btn
        icon="chat-o"
        text="客服"
        :info='messageNumber'
        @click="onClickChatBtn"
      />
      <van-goods-action-mini-btn
        icon="cart-o"
        text="购物车"
        :info='cartNum'
        @click="onClickCartBtn"
      />
      <van-goods-action-big-btn
        text="加入购物车"
        @click="addCart"
      />
      <van-goods-action-big-btn
        primary
        text="立即购买"
        @click="onClickToBuy"
      />
    </van-goods-action>
    <van-sku
      v-model="showBase"
      :sku="sku"
      :goods="goods"
      :goods-id="goodsId"
      :hide-stock="sku.hide_stock"
      :quota="quota"
      :quota-used="quotaUsed"
      :reset-stepper-on-hide="resetStepperOnHide"
      :reset-selected-sku-on-hide="resetSelectedSkuOnHide"
      :close-on-click-overlay="closeOnClickOverlay"
      :disable-stepper-input="disableStepperInput"
      :message-config="messageConfig"
      @buy-clicked="onBuyClicked"
      @add-cart="onAddCartClicked"
    />
    <van-loading v-if="loading" color="#1989fa" size='70px' vertical>正在玩命加载中...</van-loading>
  </div>
</template>

<script>
import {saveCart, getCartGoods, getChat} from '@/api/load-data.js'
import {localUser} from '@/util/local.js'
export default {
  data () {
    return {
      cartNum: null,
      messageNumber: null,
      showBase: false,
      goodsId: null,
      sku: {},
      goods: {},
      quota: null,
      quotaUsed: null,
      resetStepperOnHide: false,
      resetSelectedSkuOnHide: false,
      closeOnClickOverlay: true,
      disableStepperInput: false,
      messageConfig: {},
      loading: false
    }
  },
  created () {
    this.getCartNum()
    console.log(this.$route.params)
    this.goodsInfo = this.$route.query.id ? this.$route.query : this.$route.params.id
    console.log(this.goodsInfo)
    this.goods = {
      // 商品标题
      title: this.goodsInfo.descript,
      // 默认商品 sku 缩略图
      picture: this.goodsInfo.imgurl
    }
    this.sku = {
      tree: [
        {
          k: '尺码', // skuKeyName：规格类目名称
          v: [
            {
              id: '1001s', // skuValueId：规格值 id
              name: 'S', // skuValueName：规格值名称
              // imgUrl: 'https://img.yzcdn.cn/1.jpg' // 规格类目图片，只有第一个规格类目可以定义图片
            },
            {
              id: '1001l', // skuValueId：规格值 id
              name: 'L', // skuValueName：规格值名称
              // imgUrl: 'https://img.yzcdn.cn/1.jpg' // 规格类目图片，只有第一个规格类目可以定义图片
            }
          ],
          k_s: 's1' // skuKeyStr：sku 组合列表（下方 list）中当前类目对应的 key 值，value 值会是从属于当前类目的一个规格值 id
        }
      ],
      // 所有 sku 的组合列表，比如红色、M 码为一个 sku 组合，红色、S 码为另一个组合
      list: [
        {
          id: 2259, // skuId，下单时后端需要
          price: this.goodsInfo.price * 100, // 价格（单位分）
          s1: '1001s', // 规格类目 k_s 为 s1 的对应规格值 id
          s3: '1001m', // 最多包含3个规格值，为0表示不存在该规格
          stock_num: this.goodsInfo.payNumber // 当前 sku 组合对应的库存
        }, {
          id: 2259,
          price: '6666',
          s2: '1001l', // 规格类目 k_s 为 s2 的对应规格值 id
        }
      ],
      price: this.goodsInfo.price, // 默认价格（单位元）
      stock_num: this.goodsInfo.payNumber, // 商品总库存
      collection_id: 2261, // 无规格商品 skuId 取 collection_id，否则取所选 sku 组合对应的 id
      none_sku: false, // 是否无规格商品
      messages: [
        {
          // 商品留言
          datetime: '0', // 留言类型为 time 时，是否含日期。'1' 表示包含
          multiple: '0', // 留言类型为 text 时，是否多行文本。'1' 表示多行
          name: '留言', // 留言名称
          type: 'text', // 留言类型，可选: id_no（身份证）, text, tel, date, time, email
          required: '1' // 是否必填 '1' 表示必填
        }
      ],
      hide_stock: false // 是否隐藏剩余库存
    }
  },
  methods: {
    getCartNum () {
      this.loading = true
      let data = {
        goodsid: '',
        username: localUser().username
      }
      getCartGoods(data).then(res => {
        if (res.success) {
          this.cartNum = res.data.length
          this.loading = false
        }
      })
      let d = {
        username: localUser().username
      }
      getChat(d).then(res => {
        if (res.success) {
          this.messageNumber = res.data.length
          this.loading = false
        }
      })
    },
    onClickLeft () {
      window.history.go(-1)
    },
    onChange(index) {
      this.index = index;
    },
    onClickChatBtn () {
      // this.
    },
    onClickCartBtn () {
      this.$router.push('/cart')
    },
    addCart () {
      this.showBase = true
      // window.console.log(this.showBase)
    },
    onClickToBuy () {
      this.showBase = true
    },
    onBuyClicked (info) {
      let data = {
        goodsid: this.goodsInfo.id,
        price: this.goodsInfo.price,
        goodsdescript: this.goodsInfo.descript,
        goodsnumber: info.selectedNum,
        imgurl: this.goodsInfo.imgurl,
        bussinessname: this.goodsInfo.bussinessname,
        username: localUser().username
      }
      let d = []
      d.push(data)
      this.$store.commit('setGoodsShow', d)
      let a = 1
      this.$router.push({path: '/goodsDetail/pay', query: {id: a}})
    },
    onAddCartClicked (info) {
      this.loading = true
      let data = {
        goodsid: this.goodsInfo.id,
        price: this.goodsInfo.price,
        goodsdescript: this.goodsInfo.descript,
        goodsnumber: info.selectedNum,
        imgurl: this.goodsInfo.imgurl,
        bussinessname: this.goodsInfo.bussinessname,
        username: localUser().username
      }
      saveCart(data).then(res => {
        if (res.success) {
          this.loading = false
          this.$toast.success('添加成功,宝贝在购物车等你哦')
          this.getCartNum()
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.good-detail{
    background: #fff;
    padding:3vw;
    .good-price{
      color: #f44;
      font-size: 26px;
    }
    .good-descript{
      font-size: 5vw;
      word-wrap: break-all;
      margin:2px 0;
    }
    .good-other{
      display: flex;
      /*padding:2vw 3vw;*/
      justify-content: space-between;
      color: #999;
      font-size:12px;
    }
  }
  .good-img{
    height: 60vh;
    // overflow: hidden;
    text-align: center
  }
</style>