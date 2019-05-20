<template>
  <div>
      <van-nav-bar
        title="微淘"
      />
      <div style="width: 100%;margin-top: 60px;">
        <div class="small-pay-box">
          <div v-for="(item,index) in showList" :key='index' class="uploadGoods" @click="goodDetails(item)">
            <div class="seller-top" style="margin-bottom: 5vw;"><span class="pic"><img v-if="account_img" class="img-box" :src="account_img" alt="">
        <van-icon class="user-icon" v-else name="user-circle-o" /></span>{{item.userName}} 于 {{$moment(item.upload_time).format('YYYY-MM-DD HH:mm:ss')}}发布了</div>
            <img :src="item.data_source" alt="" @click="show = true">
            <van-image-preview
              v-model="show"
              :images="images"
              @change="onChange"
            >
              <template v-slot:index>第{ index }页</template>
            </van-image-preview>
            <div class="msg" @click="chat(item, $event)">联系商家</div>
          </div>
        </div>
      </div>
  </div>
</template>

<script>
import {getSellerGoods, setChat} from '@/api/load-data.js'
export default {
  data () {
    return {
      addshowPop: false,
      showList: [],
      account_img: null,
      images: [],
      show: false
    }
  },
  created () {
    this.$store.commit('setActiveMenu', 1)
  },
  mounted () {
    getSellerGoods().then(res => {
      if (res.success) {
          res.data.map(item => {
            var str12 = this.arrayBufferToBase64(item.data_source.data)//转换字符串
            item.data_source = 'data:image/png;base64,' + str12
            this.images.push(item.data_source)
          })
        this.showList = res.data
      }
    })
    this.addshowPop = true
  },
  methods: {
    arrayBufferToBase64 (buffer) {
      var binary = ''
      var bytes = new Uint8Array( buffer )
      var len = bytes.byteLength
      for (var i = 0; i < len; i++) {
        binary += String.fromCharCode( bytes[ i ] )
      }
      return window.btoa( binary )
    },
    goodDetails () {},
    chat (item, e) {
      e.preventDefault()
      e.stopPropagation()
      let data = {
        goods_name: item.goods_name,
        userName: item.userName
      }
      setChat(data).then(res => {
        // if (res.success) {
        this.$router.push({path: '/buyerchat', query: {id: item}})
        // } else {

        // }
      })
    },
    onChange () {}
  }
}
</script>

<style lang="scss" scoped>
.van-popup{
  width: 100%;
  height: calc(100vh - 50px);
}
.message-box {
		background: linear-gradient(60deg, rgb(255, 100, 20), #f00);
    padding: 2vw;
    position: fixed;
    top: 0;
    width: 100vw;
    z-index: 1000;
		/*padding-bottom:;*/
		// height: 22vw;
		color: #fff;

		p:nth-child(1) {
			font-weight: 600;
      text-align:center
		}

		p:nth-child(2) {
			font-size: 12px;
		}
	}
.small-pay-box{
  // margin-top: 70px;
  margin: 50px 0;
  padding: 10px 20px;
  text-align: center;
  .seller-top{
    display: flex;
    align-items: center
  }
  img{
    width:50%;
  }
  .uploadGoods{
    width: 100%;
    margin-bottom: 20px;
    border-radius: 5px;
    box-shadow: 1px 1px 3px 3px #ccc;
  }
  .pic{
    display: inline-block;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    // background: url('../../assets/logo/logo.jpg') no-repeat;
    // background-origin: content-box;
    // background-clip:content-box;
    // background-size: 100% 100%;
  }
}
.msg{
  width: 80px !important;
  height: 30px;
  border: 1px solid #ccc;
  border-radius: 4px;
  text-align: center;
  color: #fff;
  background: linear-gradient(60deg, #ff6414, #f00)
}
.msg:active{
  background: #ffcccc;
  color: #f00
}
.user-icon{
  margin: 10px;
  font-size: 30px;
}
.img-box{
  width: 30px;
  height: 30px;
  border-radius: 50%;
  margin:10px;
}
</style>
