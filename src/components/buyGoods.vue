<template>
  <div>
    <van-nav-bar
      title="确认订单"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    />
    <van-cell icon="location-o" is-link @click='onCellClick'>
      <template slot="title">
        <p class="custom-text">{{user.name + ' ' + user.tel}}</p>
        <p style="width: 80%">{{user.address}}</p>
        <p style="font-size: 12px; color: orange">收货不便时,可选择免费代收货服务</p>
      </template>
    </van-cell>
    <van-cell>
      <template slot="title">
        <van-card
          :num="goodsInfo.goodsnumber"
          :price="goodsInfo.price"
          desc="整就中了,家里又不是没条件"  
          :title="goodsInfo.goodsdescript"
          :thumb="goodsInfo.imgurl"
        />
      </template>
    </van-cell>
    <van-submit-bar
      :price="goodsInfo.price * 100"
      button-text="提交订单"
      tip="你的收货地址不支持同城送, 我们已为你推荐快递"
      @submit="onSubmit"
    />
    <van-popup v-model="show" position="bottom" :overlay="true" lazy-render>
      <van-nav-bar
        title="我的收货地址"
        left-text="返回"
        right-text="添加新地址"
        left-arrow
        @click-left="show = false"
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
    <van-popup v-model="showPop" position="bottom" :overlay="true" lazy-render>
      <van-nav-bar
        title="输入密码"
        left-text="返回"
        left-arrow
        @click-left="showPop=false"
      />
      <van-password-input
        :value="value"
        info="密码为 6 位数字"
        @focus="showKeyboard = true"
      />
      <!-- 数字键盘 -->
      <van-number-keyboard
        :show="true"
        theme="custom"
        extra-key="."
        close-button-text="完成"
        @blur="showKeyboard = false"
        @input="onInput"
        @delete="onDelete"
        @close='onClose'
      />
    </van-popup>
    <van-popup v-model="addshowPop" position="bottom" :overlay="true" lazy-render>
      <van-nav-bar
        title="添加收货地址"
        left-text="返回"
        left-arrow
        @click-left="addshowPop=false;show=true"
      />
      <van-address-edit
        :area-list="areaList"
        show-postal
        show-delete
        show-set-default
        show-search-result
        :search-result="searchResult"
        @save="onSave"
        @delete="onDelete"
        @change-detail="onChangeDetail"
      />
    </van-popup>
  </div>
</template>

<script>
import { PasswordInput, NumberKeyboard } from 'vant';
import areaList from '@/util/area.js'
// Vue.use(PasswordInput).use(NumberKeyboard);
export default {
  data () {
    return {
      value: '',
      show: false,
      showPop: false,
      addshowPop: false,
      user: {
        name: '张三',
        tel: '13000000000',
        address: '浙江省杭州市西湖区文三路 138 号东方通信大厦 7 楼 501 室'
      },
      goodsInfo: null,
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
      ],
      areaList,
      searchResult: []
    }
  },
  created () {
    this.goodsInfo = this.$route.query
  },
  methods: {
    onClickLeft () {
      window.history.go(-1)
    },
    onCellClick () {
      this.show = true
    },
    // 选择地址
    onAdd() {
      // this.$toast('新增地址');
      this.addshowPop = true
    },
    onEdit(item, index) {
      this.$toast('编辑地址:' + index);
    },
    onSelect (item, index) {
      this.user.name = item.name
      this.user.address = item.address
      this.user.tel = item.tel
      this.show = false
    },
    onSubmit () {
      this.showPop = true
    },
    // 密码输入
    onInput (key) {
      this.value = (this.value + key).slice(0, 6);
    },
    onDelete () {
      this.value = this.value.slice(0, this.value.length - 1);
    },
    onClose () {
      this.showPop = false
    },
    // 地址编辑
    onSave() {
      this.$toast('save');
    },
    onDelete() {
      this.$toast('delete');
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
    }
  }
}
</script>

<style lang="scss" scoped>
.van-cell{
  align-items: center;
  width: 90vw;
  border-radius: 15px;
  margin: 10px auto;
  background: #eeeeee
}
.van-popup{
  height: 100%;
}
.van-password-input{
  top: 50vh;
}
</style>