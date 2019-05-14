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
  let data = [datas.data_source, datas.data_name, ctx.req.body.goods_name, ctx.req.body.goods_price, ctx.req.body.goods_descript, ctx.req.body.goods_area, ctx.req.body.userName, upload_time]
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