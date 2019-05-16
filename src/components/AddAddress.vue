<template>
  <div>
    <van-popup v-model="addshowPop" position="bottom" :overlay="true" lazy-render>
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
import areaList from '@/util/area.js'
export default {
  data () {
    return {
      areaList,
      searchResult: []
    }
  },
  methods: {
    // 地址编辑
    onSave() {
      this.$toast("save")
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

</style>
