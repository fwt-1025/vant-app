<template>
  <div>
    <van-nav-bar
      title="我的"
      right-text="设置"
      @click-right="onClickRight"
    />
    <div style="margin-top: 46px;text-align:center">
      <van-uploader :after-read="onRead" accept="image/gif, image/jpeg" multiple>
        <img v-if="account_img" class="img-box" :src="account_img" alt="">
        <van-icon class="user-icon" v-else name="user-circle-o" />
        <p>点击上传头像</p>
        <p style="margin: 10px 0; color: #55ddff">用户名: {{userName}}</p>
      </van-uploader>
    </div>
    <van-cell icon='passed' title="支付" is-link to="common" />
    <van-cell icon='star-o' title="收藏" is-link to="common" />
    <van-cell icon='balance-pay' title="订单" is-link to="common" />
    <van-cell icon='location-o' title="收货地址" is-link to="/receiveAddress" />
    <van-cell icon='setting-o' title="设置" is-link to="settings" />
  </div>
</template>

<script>
import {uploadUserHead, findUser} from '@/api/load-data.js'
import {mapState} from 'vuex'
import {localUser} from '@/util/local.js'
export default {
  data () {
    return {
      account_img: '',
      userName: ''
    }
  },
  // computed: mapState({
  //   buyer: state => state.buyer,
  //   bussiness: state => state.bussiness
  // }),
  created () {
    this.$store.commit('setActiveMenu', 4)
    this.getBuyerImg()
    this.userName = localUser().username
  },
  methods: {
    onClickRight () {},
    getBuyerImg () {
      let d = {
        username: localUser().username,
        auth: localUser().auth
      }
      findUser(d).then(res => {
        if (res.success) {
          this.account_img = res.data.account_img
        }
      })
    },
    onRead (file) {
      let data = {
        data_img: file.content,
        username: localUser().username
      }
      uploadUserHead(data).then(res => {
        if (res.success) {
          this.getBuyerImg()
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.user-icon{
  margin: 20px;
  font-size: 60px;
}
.img-box{
  width: 60px;
  height: 60px;
  border-radius: 50%;
  margin: 20px;
}
.van-cell{
  border-bottom: 1px solid rgba(153,153,153, .2);
}
</style>
