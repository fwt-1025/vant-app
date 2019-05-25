const mySqlModels = require('../models/mysql')
// 查询数据库chat表中买家用户的聊天列表
exports.getChat = async (ctx, next) => {
  let user = ctx.request.query
  console.log(user)
  await mySqlModels.findChat(user).then(res => {
    if (res) {
      ctx.body = {
        message: '',
        data: res,
        success: true
      }
    }
  })
}
// 查询数据库chat表中商家用户的聊天列表
exports.findBussinessChat = async (ctx, next) => {
  let user = ctx.request.query
  console.log(user)
  await mySqlModels.findBussinessChat(user).then(res => {
    if (res) {
      ctx.body = {
        message: '',
        data: res,
        success: true
      }
    }
  })
}
exports.setChat = async(ctx, next) => {
  console.log(ctx.request.body)
  await mySqlModels.findChat(ctx.request.body.buyerName).then(async res => {
    console.log(res)
    if (res.length > 0) {
      ctx.body = {
        success: false
      }
    } else {
      await mySqlModels.insertChat([ctx.request.body.goods_name, ctx.request.body.buyerName, ctx.request.body.bussinessName]).then(res => {
        if (res.warningCount === 0) {
          ctx.body = {
            message: '',
            data: null,
            success: true
          }
        }
      })
    }
  })
}
