<template>
<div>
  <van-popup v-model="show" position="right" :overlay="true" lazy-render>
    <van-nav-bar
        title="简介"
        left-text="返回"
        left-arrow
        @click-left="onClickLeft"
      />
    <div class="common-box">
      <div>
        <div style="color: #f44;margin: 20px 0;">欢迎来到月淘淘</div>
        有一种动力促使我开发下去,正在慢慢的往上填东西,敬请期待哦!
        先返回看看其他的吧!!!
      </div>
    </div>
  </van-popup>
</div>
</template>

<script>
export default {
  data () {
    return {
      show: false
    }
  },
  mounted () {
    this.show = true
  },
  methods: {
    onClickLeft () {
      window.history.go(-1)
    }
  }
}
</script>

<style lang="scss" scoped>
.van-popup{
  width: 100%;
  height: 100%;
}
.common-box{
  width: 100vw;
  height: 100vh;
  display: flex;
  text-align:left;
  justify-content: center;
  align-items: center;
  div{
    width: 50vw;
    font-size: 26px;
  }
}
</style>
