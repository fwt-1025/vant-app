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
const address = require('./address')

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
// console.log(Upload.single('files'))
// 路由
router.post('/login', account.login)
// 注册
router.post('/register', account.register)
// 查询用户
router.post('/findUser', account.findBuyerUser)
// 上传头像
router.post('/uploadHead', Upload.single('file'), uploader.uploadBuyerHead)
// add to cart
router.post('/addtocart', cart.saveCart)
// get from cart
router.get('/getcartgoods', cart.getCartGoods)
// delete from cart
router.post('/deletecartgoods', cart.deleteCartGoods)
// 根据多个id查找购物车中的数据
router.post('/getFormCartId', cart.getCartFormId)
// save address
router.post('/saveaddress', address.saveAddress)
// 获取收货地址
router.get('/getaddress', address.getAddress)
router.post('/paylist', cart.payList)
router.get('/getPayList', cart.getPayList)
router.get('/getEchPayList', cart.echPayList)
router.post('/uploadFile', Upload.single('file'), uploader.uploadFile)
router.get('/getGoods', seller.sellerGoods)
// 获取商品
router.post('/getVipGoods', proxy.getGoods)
// 获取买家聊天列表
router.get('/getChat', chat.getChat)
// 获取商家聊天列表
router.get('/getBussinessChat', chat.findBussinessChat)
// 添加聊天人
router.post('/setChat', chat.setChat)
// 注册商家
router.post('/registerBusiness', seller.registerSeller)
// 商家登录
router.post('/loginBusiness', seller.loginSeller)
// 查询商家详细信息
router.post('/findSellerUser', seller.findSellerUser)
module.exports = router
