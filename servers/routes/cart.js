const userModel = require('../models/mysql')
// 购物车数据存数据库

exports.saveCart = async (ctx, next) => {
  let goods = ctx.request.body
  let data = [goods.goodsid, goods.imgurl, goods.price, goods.goodsnumber, goods.goodsdescript,goods.bussinessname, goods.username]
  // 存购物车数据时,要考虑是否存了同一件商品,所以要先查找数据库中是否已存在相同的商品
  let da = {
    goodsid: goods.goodsid,
    username: goods.username
  }
  await userModel.getCartGoods(da).then(async res => {
    if (res.length > 0) {
      let goodsnumber = Number(res[0].goodsnumber) + Number(goods.goodsnumber)
      await userModel.updateCartGoods([goodsnumber.toString(), goods.goodsid, goods.username]).then(rex => {
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
  let da = ctx.request.query
  await userModel.getCartGoods(da).then(res => {
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
  let username = ctx.request.body.username
  await userModel.deleteCartGoods(goodsId, username).then(res => {
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
// 根据多个goodsid 查找数据
exports.getCartFormId = async (ctx, next) => {
  let goodsId = eval(ctx.request.body.goodsid)
  await userModel.getCartFormID(goodsId).then(res => {
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

//结算
exports.payList = async (ctx, next) => {
  let goods = eval(ctx.request.body)
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
// 根据时间统计购买数量
exports.echPayList = async (ctx) => {
  let d = ctx.request.query[0]
  console.log(d)
  await userModel.echPayList(d).then(res => {
    if (res) {
      let d = []
      res.map((item,index) => {
        d[index] = [item.time, item['sum(goodsnumber)']]
      })
      ctx.body = {
        data: d
      }
    }
  })
}