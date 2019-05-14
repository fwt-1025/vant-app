<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
html,body,div,p,img,span,ul,li,h1~h6{
  margin:0;
  padding:0;
}
::-webkit-scrollbar{
  display: none;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
  overflow: hidden;
}
/* .van-cell-group, .van-cell{
  background: none !important;
  color: #fff !important;
} */
</style>
