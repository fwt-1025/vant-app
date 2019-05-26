<template>
  <div>
    <van-nav-bar
        title="发布商品"
      />
    <van-cell-group style="margin-top: 60px;">
      <van-field
        v-model="goodInfo.goods_name"
        required
        clearable
        label="商品名称"
        placeholder="请输入商品名称"
      />
      <van-field
        v-model="goodInfo.goods_price"
        type="number"
        label="商品价格"
        placeholder="请输入商品价格"
        required
      />
      <van-field
        v-model="goodInfo.goods_descript"
        type="text"
        label="商品描述"
        placeholder="请描述商品"
        required
      />
      <van-field
        v-model="goodInfo.goods_area"
        type="text"
        label="商品产地"
        placeholder="请输入商品产地"
        required
      />
      <van-uploader name="file" :after-read="onRead">
        <van-icon v-if="!images" class="user-icon" name="photograph" />
        <img class="goods-img" v-else :src="images" alt="">
        <div>点击上传商品图片</div>
      </van-uploader>
    </van-cell-group>
    <div style="width:100%;display:flex;justify-content: center">
      <van-button style="margin: 10px auto;" type='info' @click="uploadGoods">上传商品</van-button>
    </div>
  </div>
</template>

<script>
import {upload, findSellerUser} from '@/api/load-data.js'
import {localUser, arrayBufferToBase64, base64ToUint8Array} from '@/util/local.js'
export default {
  data () {
    return {
      goodInfo: {
        goods_name: '',
        goods_price: '',
        goods_descript: '',
        goods_area: '',
        userName: '',
        account_img: '',
        file: ''
      },
      images: null,
      sendfile: null
    }
  },
  created () {
    this.$store.commit('setActiveMenu', 0)
    let d = {
      username: localUser().username,
      auth: localUser().auth
    }
    findSellerUser(d).then(res => {
      // this.goodInfo.account_img = res.data.account_img
      var str12 = arrayBufferToBase64(res.data.account_img.data)//转换字符串
      this.goodInfo.account_img = 'data:image/png;base64,' + str12
    })
  },
  methods: {
    onRead (file) {
      this.images = file.content
      this.sendfile = file.file
    },
    uploadGoods () {
      var formData = new FormData()
      formData.append('file', this.sendfile)
      formData.append('goods_name', this.goodInfo.goods_name)
      formData.append('goods_price', this.goodInfo.goods_price)
      formData.append('goods_descript', this.goodInfo.goods_descript)
      formData.append('goods_area', this.goodInfo.goods_area)
      formData.append('userName', localUser().username)
      formData.append('goodsid', localUser().username + Math.ceil(Math.random() * 10000))
      formData.append('account_img', this.goodInfo.account_img)
      console.log(formData)
      upload(formData).then(res => {
        if (res.success) {
          this.$toast.success('上传成功')
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.user-icon{
  margin: 20px;
  font-size: 60px;
}
.goods-img{
  width: 100px;
  height: 100px;
  border-radius: 15px;
}
</style>