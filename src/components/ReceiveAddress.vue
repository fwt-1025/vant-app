<template>
  <div>
    <van-popup v-model="show" position="right" :overlay="true" lazy-render>
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
import {getAddress} from '@/api/load-data.js'
import {localUser} from '@/util/local.js'
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
    this.addressGet()
  },
  methods: {
    // 获取收货地址
    addressGet () {
      let data = {
        userid: localUser().id
      }
      getAddress(data).then(res => {
        if (res.success) {
          this.list = res.data
          this.list.map(item => {
            item.address = item.province + item.city + item.county + item.addressDetail
          })
        } else {
          this.$toast.fail('网络开小差了')
        }
      })
    },
    // 选择地址
    onAdd() {
      // this.$toast('新增地址');
      this.$router.push('/addAddress')
    },
    onEdit(item, index) {
      this.$toast('编辑地址:' + index);
    },
    onSelect (item) {
      console.log(item)
      let data = {
        name: item.name,
        address: item.address,
        tel: item.tel
      }
      this.$router.push({name: 'pay', params: {d: data}})
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
.van-popup{
  width: 100%;
  height: 100%;
  height: 100vh;
  overflow: hidden
}
.van-address-list{
  margin-top: 46px;
}
</style>
