<template>
  <div>
    <van-nav-bar
      :title="'商家:' + sellerUserName"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    />
    <!-- <div class="header">商家--{{sellerUserName}}</div> -->
    <div style="margin-top: 50px;"></div>
    <article>
      <div class="contentBox" ref="contentBox"></div>
    </article>
    <footer class="footer">
      <input type="text" v-model="sendMsg"><van-button class="btn" @click='sendSellerMsg'>发送</van-button>
    </footer>
  </div>
</template>

<script>
import '@/styles/chat.scss'
import {findUser, findSellerUser} from '@/api/load-data.js'
import {localUser, arrayBufferToBase64} from '@/util/local.js'
// import {XButton, XHeader} from 'vux'
export default {
  // components: {XButton, XHeader},
  data () {
    return {
      sellerData: {},
      sellerUserName: '',
      sendMsg: 'hello',
      buyMsgBox: [],
      sellerMsgBox: [],
      websocket: null
    }
  },
  created () {
    this.sellerData = this.$route.query.id
    this.sellerUserName = this.sellerData.bussinessName
  },
  mounted () {
    let buyer = localUser()
    let b = 'buyer'
    this.websocket = new WebSocket(`ws://127.0.0.1:3003/${b}${buyer.username}`)
    this.websocket.onopen = this.websocketOnopen
    this.websocket.onerror = this.websocketOnerror
    this.websocket.onmessage = this.websocketOnmessage
    this.websocket.onsend = this.websocketSendmessage
    this.websocket.onclose = this.websocketClose
    let d = {
      username: this.sellerUserName,
    }
    findSellerUser(d).then(res => {
      var str12 = arrayBufferToBase64(res.data.account_img.data)//转换字符串
      this.seller_img = 'data:image/png;base64,' + str12
    })
    let da = {
      username: localUser().username
    }
    findUser(da).then(res => {
      var str12 = arrayBufferToBase64(res.data.account_img.data)//转换字符串
      this.buyer_img = 'data:image/png;base64,' + str12
    })
  },
  methods: {
    onClickLeft () {
      window.history.go(-1)
    },
    websocketOnopen () {
      console.log('连接成功')
      let s = 'seller'
      this.websocket.send(`{"msg": "${this.sendMsg}", "id": "${s}${this.sellerUserName}"}`)
    },
    websocketOnerror (e) {
      console.log('连接出现错误', e)
    },
    websocketOnmessage (e) {
      console.log('收到的信息：', e)
      let buyData = JSON.parse(e.data)
      let receiveData = JSON.parse(buyData.data)
      let oDiv = document.createElement('div')
      let oDiv2 = document.createElement('div')
      let oImg = document.createElement('img')
      oDiv.className = 'msg-content'
      oDiv.innerHTML = receiveData.msg
      oImg.src = `${this.seller_img}`
      oDiv.appendChild(oDiv2)
      oDiv.appendChild(oImg)
      this.$refs.contentBox.appendChild(oDiv)
    },
    websocketOnClose (e) {
      console.log('关闭连接', e)
    },
    websocketClose () {
      this.websocket.close()
    },
    sendSellerMsg () {
      let s = 'seller'
      this.websocket.send(`{"msg": "${this.sendMsg}", "id": "${s}${this.sellerUserName}"}`)
      let oDiv = document.createElement('div')
      let oDiv2 = document.createElement('div')
      let oImg = document.createElement('img')
      oDiv.className = 'msg-content right'
      oDiv2.innerHTML = this.sendMsg
      oImg.src = `${this.buyer_img}`
      oDiv.appendChild(oDiv2)
      oDiv.appendChild(oImg)
      this.$refs.contentBox.appendChild(oDiv)
      this.sendMsg = ''
    }
  }
}
</script>

<style lang='scss' scoped>

</style>