const mySqlModels = require('../models/mysql')
exports.getChat = async (ctx, next) => {
  await mySqlModels.findChat().then(res => {
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
