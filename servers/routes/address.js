const userModel = require('../models/mysql')

// 保存地址数据
exports.saveAddress = async (ctx, next) => {
  let obj = ctx.request.body
  await userModel.saveAddress([obj.areaCode, obj.addressDetail, obj.tel, obj.isDefault, obj.name, obj.postalCode, obj.province, obj.city, obj.county, obj.userid]).then(res => {
    if (res.protocol41) {
      ctx.body = {
        success: true,
        message: '保存成功',
        data: null
      }
    } else {
      ctx.body = {
        success: false,
        message: '保存失败',
        data: null
      }
    }
  })
}

// 获取地址数据
exports.getAddress = async (ctx, next) => {
  console.log(ctx.request.query.userid)
  let id = ctx.request.query.userid
  await userModel.getAddress(id).then(res => {
    if (res.length > 0) {
      ctx.body = {
        success: true,
        message: '获取成功',
        data: res
      }
    } else {
      ctx.body = {
        success: false,
        message: '获取失败',
        data: null
      }
    }
  })
}
