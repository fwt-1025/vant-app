const userModel = require('../models/mysql')
// const router = require('koa-router')()
// 买家
exports.login = async (ctx, next) => {
  let userName = ctx.request.body.username
  await userModel.login(userName).then(res => {
    if (res.length) {
      if (res[0].passWord === ctx.request.body.password) {
        ctx.body = {
          success: true,
          message: '欢迎进入月淘淘',
          user: {
            username: res[0].userName,
            id: res[0].id,
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

exports.register = async (ctx, next) => {
  let users = ctx.request.body
  await userModel.findUser(users.username).then(async res => {
    // console.log(res)
    if (res.length) {
      try {
        ctx.body = {
          success: false,
          message: '用户名已存在'
        }
        throw new Error('用户名已存在')
      } catch (error) {
        window.console.log(error)
      }
    } else {
      users.phone = users.phone ? users.phone : ''
      users.email = users.email ? users.email : ''
      await userModel.insertUser([users.username, users.password, users.radio, users.phone, users.email, users.account_img, users.createTime]).then(res => {
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
exports.findBuyerUser = async (ctx, next) => {
  var users = ctx.request.body
  console.log(users)
  await userModel.findUser(users.username).then(async res => {
    // console.log(res)
    if (res.length) {
      try {
        ctx.body = {
          success: true,
          data: res[0]
        }
      } catch (error) {
        window.console.log(error)
      }
    }
  })
}
exports.uploadBuyerHead = async(ctx, next) => {
  let data = ctx.request.body
  await userModel.findUser(data.username).then(async res=> {
    if (res.length > 0) {
      await userModel.uploadBuyerHead(data).then(r => {
        if (r) {
          ctx.body = {
            success: true,
            message: '上传成功!'
          }
        }
      })
    }
  })
}