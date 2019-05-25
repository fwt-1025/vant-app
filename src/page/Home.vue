<template>
  <div>
    <!-- 搜索区 -->
      <!-- 头部搜索框 -->
    <div class="header-search">
      <div class="login" @click="buyer ? $router.push('/buyerme') : $router.push('/login')">
        <van-icon name="contact"/>
        <p>{{buyer ? '我的' : '登录'}}</p>
      </div>
      <div class="search-box" @click="$router.push('/searchgoods')">
        <!-- <i class="fa fa-search"></i> -->
        <van-icon name="search"/>
        <input type="text" style="width: 150px;" disabled placeholder="商品五折起">
      </div>
      <div class="helper">
        <van-icon name="like-o"/>
        <!-- <i class="fa fa-heart-o"></i> -->
        <p>会员</p>
      </div>
    </div>
    <!-- 热搜 -->
    <div class="hot" style="padding-top:60px;">
      <p>热搜:</p> <span v-for="item in hotSearch" :key="item">{{item}}</span>
    </div>
    <!-- 轮播图 -->
    <van-swipe :autoplay="3000">
      <van-swipe-item v-for="(image, index) in images" :key="index">
        <img style="width:414px;" :src="image" />
      </van-swipe-item>
    </van-swipe>
    <van-panel title="头条" desc="今日头条低价售卖各类服装" status="Hot">
      <div class="hot-box">
        <div  v-for="item in imgList" :key="item">
          <img style="width: 100%;height: 100%;" :src=item alt="">
        </div>
      </div>
    </van-panel>
    <!-- 滚动导航 -->
    <div class="home-list">
      <div class="list-box">
        <a v-for="(item, index) in options" :key="index">
          <div @click='searchGoods(index)'>
            <div :class="className(index)"></div>
            <p style="display:inline-block" ref='goodsDescript'>{{item.descript}}</p>
          </div>
        </a>
      </div>
    </div>
    <Goods clothName='pants' />
  </div>
</template>

<script>
import {mapState} from 'vuex'
import Goods from '@/components/goodList.vue'
import image1 from '@/assets/banner/0b8e926de6ad2360e819b88ace8f71a4.jpg'
import image2 from '@/assets/banner/5a5963dbe9c2cb010bd10b6bc61d31e6.jpg'
import image3 from '@/assets/banner/a60ef2989505a0a4016c9cb8f7d8cc17.png'
import image4 from '@/assets/banner/cd3258c9e6e2116b37709ffe07ad50c8.jpg'
import image5 from '@/assets/banner/f43dea7aeca14b172041a7daea7d1e95.jpg'
import image6 from '@/assets/hoters/2.jpg'
import image7 from '@/assets/hoters/3.jpg'
import image8 from '@/assets/hoters/4.jpg'
import image9 from '@/assets/hoters/5.jpg'
export default {
  data () {
    return {
      value: '',
      hotSearch: ['高跟鞋', '内衣', '平板鞋', '水乳'],
      options: [{
        url: '123123',
        descript: '上衣'
      }, {
        url: '123123',
        descript: '短裤'
      }, {
        url: '123123',
        descript: '裤子'
      }, {
        url: '123123',
        descript: '裙子'
      }, {
        url: '123123',
        descript: '内衣'
      }, {
        url: '123123',
        descript: '内裤'
      }, {
        url: '123123',
        descript: '鞋子'
      }, {
        url: '123123',
        descript: '包包'
      }],
      imgList: [image6, image7, image8, image9],
      images: [image1, image2, image3, image4, image5]
    }
  },
  components: {Goods},
  created () {
    this.$store.commit('setActiveMenu', 0)
  },
  computed: mapState({
    buyer: state => state.buyer.userName
  }),
  methods: {
    className (index) {
      return "item-list" + index
    },
    searchGoods () {
      this.$router.push({path: '/searchgoods'})
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../styles/home.scss'
</style>