<template>
  <div>
    <van-nav-bar
      title="购物车"
      :right-text="goodsList.length === 0 ? '' : clickFlag ? '完成' : '管理'"
      @click-right="onClickRight"
    />
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
      <div v-for="(item,index) in goodsList" :key="index">
        <van-cell icon="shop-o">
          <template slot="title">
            <van-checkbox @change='toggleChange(index, item)' ref="checkboxes" v-model="checked[index]">{{item.shopName ? item.shopName : '张家口大型服装公司 >'}}</van-checkbox>
            <van-card
              :num="item.goodsnumber"
              :price="item.price"
              :desc="item.goodsdescript"  
              title="商品标题"
              :thumb="item.imgurl"
              :origin-price="(Number(item.price) + 50).toFixed(2)"
            >
              <div slot="footer">
                <van-stepper @plus='plus()' @minus='minus()' v-model="item.goodsnumber" />
              </div>
            </van-card>
          </template>
        </van-cell>
      </div>
    </van-pull-refresh>
    <van-submit-bar
      :price="allGoodPrice * 100"
      :button-text="clickFlag ? '删除' : '提交订单'"
      @submit="onSubmit"
      v-if="this.goodsList.length > 0"
    >
      <!-- <van-checkbox @click="allchecked" ref="allCheck" v-model="allChecked">全选</van-checkbox> -->
      <span slot="tip">
        你的收货地址不支持同城送, <span>修改地址</span>
      </span>
    </van-submit-bar>
    <div class="show" v-if="goodsList.length === 0">
      <van-icon name="cart" />
      <p>购物车里啥都没有,在忙也要记得买点东西犒劳自己</p>
      <van-button type="info" @click="$router.push('/home')">去逛逛</van-button>
    </div>
  </div>
</template>

<script>
import {getCartGoods, deleteCartGoods} from '@/api/load-data.js'
import { setTimeout } from 'timers';
export default {
  data () {
    return {
      clickFlag: false,
      goodsList: [],
      checked: [],
      isLoading: false,
      allGoodPrice: 0,
      checkList: []
    }
  },
  created () {
    this.$store.commit('setActiveMenu', 3)
  },
  mounted () {
    this.getGoodsList()
  },
  methods: {
    getGoodsList () {
      getCartGoods().then(res => {
        if (res.success) {
          this.goodsList = res.data
          this.goodsList.map(() => {
            var f = false
            this.checked.push(f)
            this.checkList.push(null)
          })
        } else {
          this.$toast.fail('网络开小差了!稍后再试')
        }
      })
    },
    onClickRight () {
      this.clickFlag = !this.clickFlag
    },
    toggleChange (index, info) {
      if (this.$refs.checkboxes[index].checked) {
        if (this.checkList.indexOf(info.goodsid) < 0) {
          this.checkList[index] = Number(info.goodsid)
          this.getAllPrice(true, info.price, info.goodsnumber)
        }
      } else {
        this.checkList.splice(this.checkList.indexOf(Number(info.goodsid)), 1, null)
        this.getAllPrice(false, info.price, info.goodsnumber)
      }
    },
    getAllPrice (f, price, number) {
      if (f) {
        this.allGoodPrice += price * number
      } else {
        this.allGoodPrice -= price * number
      }
    },
    onRefresh () {
      setTimeout(() => {
        this.$toast('刷新成功')
        this.isLoading = false
      }, 500)
    },
    plus (info) {
      console.log(info)
      if (info) this.getAllPrice(true, info.price, 1)
    },
    minus (info) {
      if (info) this.getAllPrice(false, info.price, 1)
    },
    onSubmit () {
      if (this.checkList.length === 1 && this.checkList[0] === null) { 
        this.$toast.fail('请选择一个商品')
        return false
      }
      if (!this.clickFlag) {
        this.$store.commit('setgoodsId', this.checkList)
        this.$router.push({name: 'pay'})
      } else {
        let data = {
          goodsid: this.checkList
        }
        deleteCartGoods(data).then(res => {
          if (res.success) {
            this.$toast.success('删除成功')
            this.clickFlag = false
            this.getGoodsList()
            this.$store.dispatch('getCartNumber')
          }
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.van-submit-bar{
  bottom: 50px;
}

.van-pull-refresh{
  margin-top: 46px;
  margin-bottom: 150px;
}
.show{
  width: 60vw;
  text-align: center;
  margin: 0 auto;
  color: #ccc;
  p{
    margin-bottom: 20px;
  }
  .van-icon{
    font-size: 50px;
  }
}
</style>