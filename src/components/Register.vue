<template>
  <div class="loginBox">
    <van-nav-bar
      title="注册"
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
      <van-field
        v-model="userForm.repwd"
        left-icon="closed-eye"
        label="确认密码"
        required
        clearable
        :error='repwdFlag'
        placeholder="请再次输入密码"
      />
      <van-field
        v-model="userForm.phone"
        type='tel'
        maxLength='11'
        label="手机号"
        left-icon="phone-o"
        placeholder="请输入手机号"
      />
      <van-field
        type='email'
        v-model="userForm.email"
        left-icon="envelop-o"
        label="邮箱"
        placeholder="请输入邮箱地址"
      />
      <van-radio-group v-model="userForm.radio" label-position='left'>
        <van-radio name="10001">买家</van-radio>
        <van-radio name="20002">商家</van-radio>
      </van-radio-group>
    </van-cell-group>
    <div style="width:100%;text-align:center;">
      <van-button type="primary" @click="register">注册</van-button>
    </div>
  </div>
</template>

<script>
import {registerAccount, registerBusiness} from '@/api/load-data.js'
import { setPriority } from 'os';
export default {
  data () {
    return {
      userForm: {
        username: null,
        password: null,
        repwd: null,
        phone: null,
        email: null,
        radio: '10001',
        sms: null,
        account_img: '',
        createTime: null
      },
      usernameFlag: false,
      pwdFlag: false,
      smsFlag: false,
      repwdFlag: false
    }
  },
  methods: {
    register () {
      var that = this
      // this.account_img
      let createTime = this.$moment().format('YYYY-MM-DD HH:mm:ss')
      this.usernameFlag = this.userForm.username ? false : true
      this.pwdFlag = this.userForm.password ? false : true
      this.repwdFlag = this.userForm.repwd ? false : true
      this.userForm.createTime = createTime
      if (this.usernameFlag || this.repwdFlag || this.pwdFlag) {
        return false
      } else {
        if (this.userForm.repwd === this.userForm.password) {
          if (this.userForm.radio === '10001') {
            registerAccount(this.userForm).then(res => {
              if (res.success) {
                this.$store.commit('setBuyer', res.user)
                this.$toast({
                  type: 'success',
                  mask: true,
                  loading: 'spinner',
                  message: '注册成功三秒后自动登录',
                  duration: 3000,
                  onClose: () => {
                    that.$router.push('/buyerme')
                  }
                })
              } else {
                this.$toast.fail(res.message)
              }
            })
          } else {
            registerBusiness(this.userForm).then(res => {
              if (res.success) {
                this.$store.commit('setBussiness', res.user)
                this.$toast({
                  type: 'success',
                  mask: true,
                  loading: 'spinner',
                  message: '注册成功三秒后自动登录',
                  duration: 3000,
                  onClose: () => {
                    that.$router.push('/bussinessMe')
                  }
                })
              } else {
                this.$toast.fail(res.message)
              }
            })
          }
        }
      }
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