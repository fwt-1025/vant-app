const router = require('koa-router')()
const account = require('./account')
const cart = require('./cart')
const uploader = require('./upload')
// const seller = require('./seller')
const multer = require('koa-multer') // 加载multer插件
const Upload = multer()
const proxy = require('./proxy')
const chat = require('./chat')
const seller = require('./seller')

// 文件上传
// 配置
var storage = multer.diskStorage({
  // 文件保存路径
//   destination: (req, file, cb) => {
//     cb(null, './src/assets/upload/')
//   },
  // 修改文件名称
  filename: (req, file, cb) => {
    var fileFormat = (file.originalname).split(".");
    cb(null,Date.now() + "." + fileFormat[fileFormat.length - 1]);
  }
})
// 加载配置
// var upload = multer({storage: storage})

// 路由
router.post('/login', account.login)
// 注册
router.post('/register', account.register)
// 查询用户
router.post('/findUser', account.findBuyerUser)
// 上传头像
router.post('/uploadHead', account.uploadBuyerHead)
// add to cart
router.post('/addtocart', cart.saveCart)
// get from cart
router.get('/getcartgoods', cart.getCartGoods)
// delete from cart
router.post('/deletecartgoods', cart.deleteCartGoods)
// 根据多个id查找购物车中的数据
router.post('/getFormCartId', cart.getCartFormId)
// save address
router.post('/saveaddress', cart.saveAddress)
router.post('/paylist', cart.payList)
router.get('/getPayList', cart.getPayList)
router.post('/uploadFile', Upload.single('file'), uploader.uploadFile)
router.get('/getGoods', seller.sellerGoods)
// 获取商品
router.post('/getVipGoods', proxy.getGoods)
// 获取聊天列表
router.get('/getChat', chat.getChat)
// 添加聊天人
router.post('/setChat', chat.setChat)
// 注册商家
router.post('/registerBusiness', seller.registerSeller)
// 商家登录
router.post('/loginBusiness', seller.loginSeller)
module.exports = router
