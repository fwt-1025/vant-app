<template>
  <div>
      <van-nav-bar
        title="消息通知"
      />
      <div style="width: 100%;margin-top: 60px;">
      </div>
      <div v-if="chatList.length > 0">
        <div v-for="(item,index) in chatList" :key="index">
          <van-cell @click="toChat(item)" :value="item.goods_name" icon="shop-o">
            <template slot="title">
              <span class="custom-text">商家: {{item.bussinessName}}</span>
            </template>
          </van-cell>
        </div>
      </div>
      <div class='no-msg' v-else>
          暂无最新消息
        </div>
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
  created () {
    this.$store.commit('setActiveMenu', 2)
  },
  mounted () {
    getChat().then(res => {
      if (res.success) {
        this.chatList = res.data
      }
    })
  },
  methods: {
    toChat (item) {
      this.$router.push({path: '/buyerchat', query: {id: item.bussinessName}})
    }
  }
}
</script>

<style lang="scss" scoped>
.van-popup{
  width: 100%;
  height: calc(100vh - 50px);
}
.van-cell{
  border-bottom: 1px solid rgba(153,153,153, .2);
}
.no-msg{
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
