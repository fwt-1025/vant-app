<template>
  <div>
    <van-popup v-model="show" position="bottom" :overlay="true" lazy-render>
      <van-nav-bar
        title="我的收货地址"
        left-text="返回"
        right-text="添加新地址"
        left-arrow
        @click-left="onClickLeft"
        @click-right="onAdd"
      />
      <van-address-list
        v-model="chosenAddressId"
        :list="list"
        :disabled-list="disabledList"
        disabled-text="以下地址超出配送范围"
        @add="onAdd"
        @edit="onEdit"
        @select='onSelect'
      />
    </van-popup>
  </div>
</template>

<script>
export default {
  data () {
    return {
      show: false,
      chosenAddressId: '1',
      list: [
        {
          id: '1',
          name: '张三',
          tel: '13000000000',
          address: '浙江省杭州市西湖区文三路 138 号东方通信大厦 7 楼 501 室'
        },
        {
          id: '2',
          name: '李四',
          tel: '1310000000',
          address: '浙江省杭州市拱墅区莫干山路 50 号'
        }
      ],
      disabledList: [
        {
          id: '3',
          name: '王五',
          tel: '1320000000',
          address: '浙江省杭州市滨江区江南大道 15 号'
        }
      ]
    }
  },
  mounted () {
    this.show = true
  },
  methods: {
     // 选择地址
    onAdd() {
      // this.$toast('新增地址');
      this.$router.push('/addAddress')
    },
    onEdit(item, index) {
      this.$toast('编辑地址:' + index);
    },
    onSelect (item) {
      // this.user.name = item.name
      // this.user.address = item.address
      // this.user.tel = item.tel
      // this.show = false
    },
    onClickLeft () {
      window.history.go(-1)
    }
  }
}
</script>

<style lang="scss" scoped>
.van-popup--bottom{
  height: 100vh;
  overflow: hidden
}
.van-address-list{
  margin-top: 46px;
}
</style>
