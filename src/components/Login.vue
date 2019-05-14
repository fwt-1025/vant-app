<template>
  <div class="loginBox">
    <van-nav-bar
      title="登录"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    />
    <div class="login-title">
      Welcome to YueTaoTao
    </div>
    <van-cell-group>
      <van-field
        v-model="userForm.username"
        left-icon="contact"
        label="用户名"
        required
        clearable
        placeholder="请输入用户名"
        :error='usernameFlag'
      />
      <van-field
        v-model="userForm.password"
        left-icon="closed-eye"
        label="密码"
        required
        clearable
        :error='pwdFlag'
        placeholder="请输入密码"
      />
      <!-- <van-field
        v-model="userForm.phone"
        label="手机号"
        left-icon="phone-o"
        placeholder="请输入手机号"
      />
      <van-field
        v-model="userForm.email"
        left-icon="envelop-o"
        label="邮箱"
        placeholder="请输入邮箱地址"
      /> -->
      <van-radio-group v-model="userForm.radio" label-position='left'>
        <van-radio name="10001">买家</van-radio>
        <van-radio name="20002">商家</van-radio>
      </van-radio-group>
      <van-field
        v-model="userForm.sms"
        center
        required
        clearable
        label="验证码"
        :error='smsFlag'
        placeholder="请输入验证码"
      >
        <van-button style="width: auto" slot="button" size="small" type="primary" @click="changeAuthCode">{{authCode}}</van-button>
      </van-field>
    </van-cell-group>
    <div style="width:100%;text-align:center;">
      <van-button type="primary" @click="loginIn">登录</van-button>
      <van-button type="default" @click="goRegister">前往注册</van-button>
    </div>
  </div>
</template>

<script>
import {login, loginBusiness} from '@/api/load-data.js'
export default {
  data () {
    return {
      userForm: {
        username: '',
        password: '',
        // phone: '', 
        // email: '',
        radio: '10001',
        sms: ''
      },
      authCode: '',
      usernameFlag: false,
      pwdFlag: false,
      smsFlag: false
    }
  },
  mounted () {
    this.changeAuthCode()
  },
  methods: {
    changeAuthCode () {
      var arr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
      let str = ''
      var strlength = 4
      for (var i = 0; i < strlength; i++) {
        var num = Math.floor(Math.random() * arr.length)
        str += arr[num] + ' '
      }
      this.authCode = str
    },
    loginIn () {
      var that = this
      this.usernameFlag = this.userForm.username ? false : true
      this.pwdFlag = this.userForm.password ? false : true
      this.smsFlag = this.userForm.sms ? false : true
      if (this.usernameFlag || this.smsFlag || this.pwdFlag) {
        return false
      } else {
        if (this.userForm.sms === this.authCode.toLowerCase().replace(/\s*/g,"") || this.userForm.sms === this.authCode.toUpperCase().replace(/\s*/g,"")) {
          if (this.userForm.radio === '10001') {
            login(this.userForm).then(res => {
              if (res.success) {
                console.log(res.user)
                this.$store.commit('setBuyer', res.user)
                this.$toast({
                  type: 'success',
                  mask: true,
                  loading: 'spinner',
                  message: '买家登录成功',
                  duration: 1500,
                  onClose: () => {
                    that.$router.push('/buyerme')
                  }
                })
              } else {
                this.$toast.fail(res.message)
              }
            })
          } else {
            loginBusiness(this.userForm).then(res => {
              if (res.success) {
                this.$store.commit('setBussiness', res.user)
                this.$toast({
                  type: 'success',
                  mask: true,
                  loading: 'spinner',
                  message: '商家登录成功',
                  duration: 1500,
                  onClose: () => {
                    that.$router.push('/bussinessMe')
                  }
                })
              } else {
                this.$toast.fail(res.message)
              }
            })
          }
        } else {
          this.$toast.fail('验证码错误')
        }
      }
    },
    goRegister () {
      this.$router.push('/register')
    },
    onClickLeft () {
      window.history.go(-1)
    }
  }
}
</script>

<style lang="scss" scoped>
.loginBox{
  padding: 0 10px;
  .login-title{
    font-size: 26px;
    font-weight: 500;
    text-align:center;
    padding: 50px 0;
  }
}

.van-radio{
  display: inline-block;
  margin: 10px;
}
.van-button{
  width: 200px;
  height: auto;
  margin: 10px auto;
}
</style>