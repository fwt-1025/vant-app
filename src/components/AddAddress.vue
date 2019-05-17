<template>
  <div>
    <van-popup v-model="addshowPop" position="right" :overlay="true" lazy-render>
      <van-nav-bar
        title="添加收货地址"
        left-text="返回"
        left-arrow
        @click-left="onClickLeft"
      />
      <van-address-edit
        :area-list="areaList"
        show-postal
        show-delete
        show-set-default
        show-search-result
        :search-result="searchResult"
        @save="onSave"
        @change-detail="onChangeDetail"
      />
    </van-popup>
  </div>
</template>

<script>
import {saveAddress} from '@/api/load-data.js'
import {localUser} from '@/util/local.js'
import areaList from '@/util/area.js'
export default {
  data () {
    return {
      areaList,
      searchResult: [],
      addshowPop: false,
      address: {}
    }
  },
  mounted () {
    console.log(localUser().id)
    this.addshowPop = true
  },
  methods: {
    // 地址编辑
    onSave(d) {
      this.address = d
      console.log(localUser().id)
      this.address.userid = localUser().id
      saveAddress(this.address).then(res => {
        if (res.success) {
          this.$toast.success('保存成功')
        } else {
          this.$toast.fail('保存失败')
        }
      })
    },
    onChangeDetail(val) {
      if (val) {
        this.searchResult = [{
          name: '河北北方学院',
          address: '张家口市'
        }];
      } else {
        this.searchResult = [];
      }
    },
    onClickLeft () {
      window.history.go(-1)
    }
  }
}
</script>

<style lang="scss" scoped>
.van-popup{
  width: 100%;
  height: 100vh;
  overflow: hidden
}
.van-address-edit{
  margin-top: 60px;
}
</style>
