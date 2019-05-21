const request = require('request')
const uploadMysql = require('../models/mysql.js')
// 路由
exports.uploadFile = async (ctx, next) => {
  console.log(ctx.req.file)
  // console.log(ctx.req.body.goods_name)
  let datas = {}
  // let goods = ctx.request.body
  datas.data_source = ctx.req.file.buffer
  datas.data_name = ctx.req.file.originalname
  let upload_time = new Date()
  let data = [datas.data_source, datas.data_name, ctx.req.body.goods_name, ctx.req.body.goods_price, ctx.req.body.goods_descript, ctx.req.body.goods_area, ctx.req.body.userName,ctx.req.body.account_img, upload_time]
  await uploadMysql.uploadImg(data).then(res => {
    if (res.warningCount === 0) {
      ctx.body = {
        success: true,
        data: null,
        message: '上传成功'
      }
    } else {
      ctx.body = {
        success: false,
        data: null,
        message: '上传失败'
      }
    }
  }).catch(err => {
    ctx.body = {
      success: false,
      data: null,
      message: err
    }
  })
}
// 上传头像
exports.uploadBuyerHead = async(ctx, next) => {
  let data = ctx.req.body
  let d = {
    username: data.username,
    data_img: ctx.req.file.buffer
  }
  if (data.auth === '10001') {
    await uploadMysql.findUser(data.username).then(async res=> {
      if (res.length > 0) {
        await uploadMysql.uploadBuyerHead(d).then(r => {
          if (r) {
            ctx.body = {
              success: true,
              message: '上传成功!'
            }
          }
        })
      }
    })
  } else {
    await uploadMysql.findSeller(data.username).then(async res=> {
      if (res.length > 0) {
        await uploadMysql.uploadSellerHead(d).then(r => {
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
}