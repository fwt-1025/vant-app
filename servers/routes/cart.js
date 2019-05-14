const userModel = require('../models/mysql')
// 购物车数据存数据库

exports.saveCart = async (ctx, next) => {
  let goods = ctx.request.body
  console.log(goods)
  let data = [goods.goodsid, goods.imgurl, goods.price, goods.goodsnumber, goods.goodsdescript]
  // 存购物车数据时,要考虑是否存了同一件商品,所以要先查找数据库中是否已存在相同的商品
  await userModel.getCartGoods(goods.goodsid).then(async res => {
    if (res.length > 0) {
      let goodsnumber = Number(res[0].goodsnumber) + Number(goods.goodsnumber)
      await userModel.updateCartGoods([goodsnumber.toString(), goods.goodsid]).then(rex => {
        if (rex.protocol41) {
          ctx.body = {
            success: true,
            message: '更新成功',
            data: null
          }
        } else {
          ctx.body = {
            success: false,
            message: '更新失败',
            data: null
          }
        }
      })
    } else {
      await userModel.saveCart(data).then(res => {
        if (res.insertId) {
          ctx.body = {
            success: true,
            message: '添加成功',
            data: null
          }
        } else {
          ctx.body = {
            success: true,
            message: '添加失败',
            data: null
          }
        }
      })
    }
  })
}
// 从数据库取购物车数据
exports.getCartGoods = async (ctx, next) => {
  let id = ctx.request.query.goodsid
  await userModel.getCartGoods(id).then(res => {
    if (res) {
      ctx.body = {
        success: true,
        message: null,
        data: res ? res : []
      }
    } else {
      ctx.body = {
        success: false,
        message: '处理错误',
        data: null
      }
    }
  })
}
// 从数据库中删除指定数据
exports.deleteCartGoods = async (ctx, next) => {
  let goodsId = ctx.request.body.goodsid
  console.log(goodsId)
  let data = eval(goodsId)
  let i = data.findIndex(item => item === null)
  console.log(i)
  if (i >= 0) {
    data.splice(i, 1)
  }
  console.log(data)
  await userModel.deleteCartGoods(data).then(res => {
    console.log(res)
    if (res.protocol41) {
      ctx.body = {
        success: true,
        message: '删除成功',
        data: null
      }
    } else {
      ctx.body = {
        success: false,
        message: '删除失败',
        data: null
      }
    }
  })
}
// 保存地址数据
exports.saveAddress = async (ctx, next) => {
  let obj = ctx.request.body
  await userModel.saveAddress([obj.areacode, obj.areaname, obj.phone, obj.userid]).then(res => {
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
//结算
exports.payList = async (ctx, next) => {
  let goods = eval(ctx.request.body)
  console.log('goods', typeof goods)
  // 存购物车数据时,要考虑是否存了同一件商品,所以要先查找数据库中是否已存在相同的商品
  await userModel.payList(goods).then(res => {
    if (res.insertId) {
      ctx.body = {
        success: true,
        message: '添加成功',
        data: null
      }
    } else {
      ctx.body = {
        success: true,
        message: '添加失败',
        data: null
      }
    }
  })
}
exports.getPayList = async (ctx, next) => {
  await userModel.getPayList().then(res => {
    if (res) {
      ctx.body = {
        success: true,
        message: null,
        data: res ? res : []
      }
    } else {
      ctx.body = {
        success: false,
        message: '处理错误',
        data: null
      }
    }
  })
}