<template>
  <div>
    <van-nav-bar
      title="确认订单"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    />
    <van-cell style="margin-top: 60px" icon="location-o" is-link @click='onCellClick'>
      <template slot="title">
        <p class="custom-text">{{user.name + ' ' + user.tel}}</p>
        <p style="width: 80%">{{user.address}}</p>
        <p style="font-size: 12px; color: orange">收货不便时,可选择免费代收货服务</p>
      </template>
    </van-cell>
    <van-cell v-for="(item,index) in showGoodsList" :key="index">
      <template slot="title">
        <van-card
          :num="item.goodsnumber"
          :price="item.price"
          desc="整就中了,家里又不是没条件"  
          :title="item.goodsdescript"
          :thumb="item.imgurl"
        />
      </template>
    </van-cell>
    <van-submit-bar
      :price="allPrice * 100"
      button-text="提交订单"
      tip="你的收货地址不支持同城送, 我们已为你推荐快递"
      @submit="onSubmit"
    />
    
    <van-popup v-model="showPop" position="bottom" :overlay="true" lazy-render>
      <van-nav-bar
        title="输入密码"
        left-text="返回"
        left-arrow
        @click-left="showPop=false"
      />
      <van-password-input
        :value="value"
        info="密码为 6 位数字"
        @focus="showKeyboard = true"
      />
      <!-- 数字键盘 -->
      <van-number-keyboard
        :show="true"
        theme="custom"
        extra-key="."
        close-button-text="完成"
        @blur="showKeyboard = false"
        @input="onInput"
        @delete="onDelete"
        @close='onClose'
      />
    </van-popup>
    
  </div>
</template>

<script>
import {getCartFormId} from '@/api/load-data.js'
import {mapState} from 'vuex'
export default {
  data () {
    return {
      value: '',
      show: false,
      showPop: false,
      dataUser: {
        name: '张三',
        tel: '13000000000',
        address: '浙江省杭州市西湖区文三路 138 号东方通信大厦 7 楼 501 室'
      },
      user: {},
      showGoodsList: [],
      goodsInfo: [],
      goodsid: [],
      allPrice: null
    }
  },
  computed: mapState({
    goodsShow: state => state.goosShow,
    goodsId: state => state.goodsId
  }),
  created () {
    window.console.log(eval(this.$route.params.id))
    this.user = this.$route.params.d ? this.$route.params.d : this.dataUser
    this.goodsInfo = this.goodsShow.length > 0 ? this.goodsShow : this.goodsId
    if (!this.goodsShow.length > 0) {
      this.goodsInfo.map(item => {
        this.goodsid.push(item)
      })
      // console.log(this.goodsInfo)
      let data = {
        goodsid: this.goodsid
      }
      getCartFormId(data).then(res => {
        if (res.success) {
          this.showGoodsList = res.data
          this.showGoodsList.map(item => {
            this.allPrice += item.price * item.goodsnumber
          })
        }
      })
    } else {
      this.showGoodsList = this.goodsInfo
    }
  },
  mounted () {
    window.console.log(this.goodsShow)
  },
  methods: {
    /*eslint no-dupe-keys: "error"*/
    onClickLeft () {
      window.history.go(-1)
    },
    onCellClick () {
      this.$router.push('/receiveAddress')
    },
    onSubmit () {
      this.showPop = true
    },
    // 密码输入
    onInput (key) {
      this.value = (this.value + key).slice(0, 6)
    },
    onDelete () {
      this.value = this.value.slice(0, this.value.length - 1)
    },
    onClose () {
      this.showPop = false
    }
  }
}
</script>

<style lang="scss" scoped>
.van-cell{
  align-items: center;
  width: 90vw;
  border-radius: 15px;
  margin: 10px auto;
  background: #eeeeee
}
.van-popup{
  height: 100%;
}
.van-password-input{
  top: 46px;
}
</style>