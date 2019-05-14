const userModel = require('../models/mysql.js')
// const router = require('koa-router')()
// 卖家
exports.loginSeller = async (ctx, next) => {
  console.log(ctx.request.body)
  let userName = ctx.request.body.username
  await userModel.loginSeller(userName).then(res => {
    if (res.length) {
      console.log(res[0], ctx.request.body.password)
      if (res[0].passWord === ctx.request.body.password) {
        ctx.body = {
          success: true,
          message: '欢迎进入商家平台',
          user: {
            id: res[0].id,
            userName: res[0].userName,
            auth: res[0].auth
          }
        }
      } else {
        ctx.body = {
          success: false,
          message: '用户名或密码错误'
        }
      }
    } else {
      ctx.body = {
        success: false,
        message: '用户名不存在'
      }
    }
  })
}

exports.registerSeller = async (ctx, next) => {
  console.log(ctx.request.body)
  let users = ctx.request.body
  await userModel.findSeller(users.username).then(async res => {
    // console.log(res)
    if (res.length) {
      try {
        ctx.body = {
          success: false,
          message: '用户名已存在'
        }
        throw new Error('用户名已存在')
      } catch (error) {
        console.log(error)
      }
    } else {
      users.phone = users.phone ? users.phone : ''
      users.email = users.email ? users.email : ''
      await userModel.insertSeller([users.username, users.password, users.radio, users.phone, users.email, users.createTime]).then(res => {
        if (res.insertId) {
          ctx.body = {
            success: true,
            message: '注册成功'
          }
        }
      })
    }
  })
}
exports.sellerGoods = async (ctx, next) => {
  await userModel.findSellerGoods().then(res => {
    if (res.length > 0) {
      ctx.body = {
        success: true,
        message: '',
        data: res
      }
    }
  })
}
