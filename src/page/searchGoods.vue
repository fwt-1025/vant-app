<template>
  <div>
     <van-search
      v-model="value"
      placeholder="请输入搜索关键词"
      show-action
      @search="onSearch"
      @cancel="onCancel"
    />
    <div class="history">
      搜索历史：<span>上衣</span><span>裤子</span><span>连衣裙</span><span>鞋帽</span>
    </div>
    <div class="text">
      输入你想要搜索的商品，这里应有尽有哦！
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      value: null
    }
  },
  methods: {
    onSearch () {
      this.$router.push('/common')
    },
    onCancel () {
      this.$router.push('/home')
    }
  }
}
</script>

<style lang="scss" scoped>
.text{
  width: 100%;
  text-align: center;
  margin-top: 100px;
  color: #999;
}
.history{
  width: 100%;
  padding: 10px;
  span{
    display: inline-block;
    width: auto;
    padding:2px 10px;
    border: 1px solid #999;
    border-radius: 15px;
    margin: 5px 10px;
  }
}
</style>
