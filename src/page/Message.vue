<template>
  <div>
      <van-nav-bar
        title="消息通知"
      />
      <div style="width: 100%;margin-top: 60px;">
      </div>
      <div v-for="(item,index) in chatList" :key="index">{{item}}</div>
  </div>
</template>

<script>
import {getChat} from '@/api/load-data.js'
export default {
  data () {
    return {
      chatList: []
    }
  },
  mounted () {
    getChat().then(res => {
      if (res.success) {
        this.chatList = res.data
      }
    })
  },
  methods: {
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
