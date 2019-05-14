/*Miss Wang*/
import Vue from 'vue'
// var config = require('./config')
// console.log(config)
// var root = process.env.API_ROOT
// console.log(root)
var api = 'http://127.0.0.1:3003'
// 买家登录
export const login = (data) => Vue.axios.post(api + '/login', data).then(res => res.data)
// 买家注册
export const registerAccount = (users) => Vue.axios.post(api + '/register', users).then(res => res.data)
// 商家注册
export const registerBusiness = (users) => Vue.axios.post(api + '/registerBusiness', users).then(res =>res.data)
// 商家登录
export const loginBusiness = (users) => Vue.axios.post(api + '/loginBusiness', users).then(res =>res.data)
// add to cart
export const saveCart = obj => Vue.axios.post(api + '/addtocart', obj).then(res => res.data)
// get from cart
export const getCartGoods = id => Vue.axios.get('/apis/getcartgoods', {params: id}).then(res => res.data)
// delete from cart
export const deleteCartGoods = id => Vue.axios.post('/apis/deletecartgoods', id).then(res => res.data)
export const saveAddress = val => Vue.axios.post('/apis/saveAddress', val).then(res => res.data)
export const payList = val => Vue.axios.post('/apis/paylist', val).then(res => res.data)
export const getpayList = val => Vue.axios.get('/apis/getPayList', val).then(res => res.data)
export const getSellerGoods = _ => Vue.axios.get('/apis/getGoods').then(res => res.data)

export const getGoods = (obj) => Vue.axios.post('/apis/getVipGoods', obj).then(res => res.data)
/*
* author: Miss.Wang
* 2018-12-19
*/
export const getsearchList = (obj) => Vue.axios.get('https://suggest.taobao.com/sug', {params: obj}).then(res => res.data)

export const getChat = () => Vue.axios.get('/apis/getChat').then(res => res.data)
export const setChat = (obj) => Vue.axios.post('/apis/setChat', obj).then(res => res.data)
