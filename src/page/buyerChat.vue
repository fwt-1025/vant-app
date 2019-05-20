<template>
  <div>
    <van-nav-bar
      title="chat"
      left-text="返回"
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
import {localUser} from '@/util/local.js'
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
    this.sellerUserName = this.sellerData.userName
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
      oDiv.className = 'msg-content'
      oDiv.innerHTML = receiveData.msg
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
      oDiv.className = 'msg-content right'
      oDiv.innerHTML = this.sendMsg
      this.$refs.contentBox.appendChild(oDiv)
      this.sendMsg = ''
    }
  }
}
</script>

<style lang='scss' scoped>
.header{
  position: fixed;
  width: 100%;
  height: 4vh;
  top:0;
  text-align: center;
  line-height: 4vh;
  background: linear-gradient(60deg, rgb(255, 100, 20), #f00);
  z-index: 1000;
  color: #fff;
}
.contentBox{
  width:100%;
  height: 96vh;
  overflow-y: scroll;
}
.footer{
  position: fixed;
  bottom: 0;
  display: flex;
  flex: 1;
  input{width: 80vw;
   height: 10vw;
   border-radius: 5px 0 0 5px;
   outline: 0;
   border: 0;
   padding-left:10px;
  }
  .btn{
    width: 20vw;
    height: 10vw;
    padding: 0
  }
}
</style>