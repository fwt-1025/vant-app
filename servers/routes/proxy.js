var request = require('request')

exports.getGoods = async(ctx, next) => {
  console.log(ctx.request.body)
  request.post({
    url: 'https://m.vip.com/server.html?rpc&method=SearchRpc.getSearchList&f=www&_=1553060559064',
    json: ctx.request.body
  }, (err, response, body) => {
    if (err) {
      console.log(response)
    } else {
      ctx.body = {
        success: true,
        data: body,
        message: ''
      }
    }
  })
}
