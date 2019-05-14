<template>
  <div>
    <router-view></router-view>
    <van-tabbar v-model="active">
      <van-tabbar-item icon="wap-home" v-if="buyer === '10001'" to='/home'>首页</van-tabbar-item>
      <van-tabbar-item icon="send-gift-o" v-if="buyer === '10001'" to='/smallpay' dot>微淘</van-tabbar-item>
      <van-tabbar-item icon="chat-o" v-if="buyer === '10001'" to="/message" :info="msgContent">消息</van-tabbar-item>
      <van-tabbar-item icon="cart-o" v-if="buyer === '10001'" to="/cart" :info="cartGoods">购物车</van-tabbar-item>
      <van-tabbar-item icon='upgrade' v-if="business === '20002'" to="/business/upload">发布</van-tabbar-item>
      <van-tabbar-item icon='chat-o' v-if="business === '20002'" to="/business/chat">聊天</van-tabbar-item>
      <van-tabbar-item icon='chart-trending-o' v-if="business === '20002'" to="/business/echarts-o">统计</van-tabbar-item>
      <van-tabbar-item icon='contact' v-if="buyer === '10001'" to="/buyerme">我的</van-tabbar-item>
      <van-tabbar-item icon='contact' v-if="business === '20002'" to="/bussinessMe">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
  data () {
    return {
      active: this.$store.state.activeMenu,
      msgContent: null,
      cartGoods: null
    }
  },
  computed: mapState({
    buyer: state => state.buyer.auth || '',
    business: state => state.business.auth || ''
  }),
  mounted () {
    console.log(this.active)
    console.log(this.$store.state.activeMenu)
    // console.log('buyer',this.buyer)
    // console.log('business',this.business)
  }
}
</script>

<style lang="scss" scoped>

</style>