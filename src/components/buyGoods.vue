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
import {getCartFormId, payList, deleteCartGoods} from '@/api/load-data.js'
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
      allPrice: null
    }
  },
  computed: mapState({
    goodsShow: state => state.goosShow,
    goodsId: state => state.goodsId
  }),
  created () {
    console.log(this.goodsId)
    window.console.log(eval(this.$route.params.id))
    this.user = this.$route.params.d ? this.$route.params.d : this.dataUser
    if (this.goodsShow.length > 0) {
      this.showGoodsList = this.goodsShow
    } else {
      this.$toast('网络开小差了')
    }
    this.showGoodsList.map(item => {
      this.allPrice += item.price * item.goodsnumber
    })
    console.log(this.allPrice)
  },
  mounted () {
    // window.console.log(this.goodsShow)
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
      var that = this
      console.log(this.goodsId)
      let d = {
        goodsid: this.goodsId
      }
      this.showGoodsList.map(item => {
        item.createtime = this.$moment().format('YYYY-MM-DD')
        // item.createtime = new Date()
      })
      payList(this.showGoodsList).then(res => {
        if (res.success) {
          if (this.$route.query.id) {
            this.$toast({
              type: 'success',
              mask: true,
              loading: 'spinner',
              message: '结算成功',
              duration: 1500,
              onClose: () => {
                that.$router.push('/home')
              }
            })
          } else {
            deleteCartGoods(d).then(re => {
              if (re.success) {
                this.$toast({
                  type: 'success',
                  mask: true,
                  loading: 'spinner',
                  message: '结算成功',
                  duration: 1500,
                  onClose: () => {
                    that.$router.push('/cart')
                  }
                })
              }
            })
          }
        } else {
          this.$toast.success('结算失败')
        }
      })
      // this.showPop = false
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