/*Miss Wang*/
import Vue from 'vue'
// var api = 'http://127.0.0.1:3003'
var api = 'http://10.192.26.23:3003'
// 买家登录
export const login = (data) => Vue.axios.post(api + '/login', data).then(res => res.data)
// 买家注册
export const registerAccount = (users) => Vue.axios.post(api + '/register', users).then(res => res.data)
// 商家注册
export const registerBusiness = (users) => Vue.axios.post(api + '/registerBusiness', users).then(res =>res.data)
// 商家登录
export const loginBusiness = (users) => Vue.axios.post(api + '/loginBusiness', users).then(res =>res.data)
// 查找买家用户详细信息
export const findUser = (users) => Vue.axios.post(api + '/findUser', users).then(res => res.data)
// 查找商家详细信息
export const findSellerUser = (users) => Vue.axios.post(api + '/findSellerUser', users).then(res => res.data)
// 上传头像
export const uploadUserHead = d => Vue.axios.post(api + '/uploadHead', d).then(res => res.data)

// 将商品添加到购物车
export const saveCart = obj => Vue.axios.post(api + '/addtocart', obj).then(res => res.data)
// 从数据库请求添加到购物车的商品
export const getCartGoods = id => Vue.axios.get(api + '/getcartgoods', {params: id}).then(res => res.data)
// export const getCartFormId = id => Vue.axios.post(api + '/getFormCartId', id).then(res => res.data)
// 从购物车中删除商品
export const deleteCartGoods = id => Vue.axios.post(api + '/deletecartgoods', id).then(res => res.data)
// 保存收货地址
export const saveAddress = val => Vue.axios.post(api + '/saveaddress', val).then(res => res.data)
// 获取收货地址
export const getAddress = val => Vue.axios.get(api + '/getaddress', {params: val}).then(res => res.data)
// 结算商品
export const payList = val => Vue.axios.post(api + '/paylist', val).then(res => res.data)
// export const getpayList = val => Vue.axios.get(api + '/getPayList', val).then(res => res.data)
// 获取商家上传的商品
export const getSellerGoods = () => Vue.axios.get(api + '/getGoods').then(res => res.data)
// 商家上传商品
export const upload = obj => Vue.axios.post(api + '/uploadFile', obj).then(res => res.data)
/*
* author: Miss.Wang
* 2018-12-19
*/
export const getsearchList = (obj) => Vue.axios.get('https://suggest.taobao.com/sug', {params: obj}).then(res => res.data)
// 获取买家聊天列表
export const getChat = (val) => Vue.axios.get(api + '/getChat', {params: val}).then(res => res.data)
// 获取商家聊天列表
export const getBussinessChat = (val) => Vue.axios.get(api + '/getBussinessChat', {params: val}).then(res => res.data)
// 存储聊天列表
export const setChat = (obj) => Vue.axios.post(api + '/setChat', obj).then(res => res.data)
// 通过用户名根据时间统计
export const getEchPayList = (data) => Vue.axios.get(api + '/getEchPayList', {params: data}).then(res => res.data)
