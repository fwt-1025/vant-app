<template>
<div>
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
</div>
</template>

<script>
export default {
  data () {
    return {}
  },
  methods: {
    onClickLeft () {
      window.history.go(-1)
    }
  }
}
</script>

<style lang="scss" scoped>
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
