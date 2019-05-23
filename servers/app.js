const chalk = require('chalk');
var Koa = require('koa')
const router = require('koa-router')()
const bodyParser = require('koa-bodyparser')
const MysqlStore = require('koa-mysql-session')
const session = require('koa-session-minimal')
const config = require('./config')
const cors = require('koa2-cors')
const http = require('http')
const WebSocket = require('ws')
var app = new Koa()
var server = http.createServer(app.callback())
var wss = new WebSocket.Server({server})
var websoc = {}
app.use(bodyParser())
app.use(cors({
    origin: function (ctx) {
        if (ctx.url === '/test') {
            return false; // 允许来自所有域名请求
        }
        return '*'; // 这样就能只允许 http://localhost:8080 这个域名的请求了
    },
    exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
    maxAge: 5,
    credentials: true,
    allowMethods: ['GET', 'POST', 'DELETE'],
    allowHeaders: ['Content-Type', 'Authorization', 'Accept'],
}))
// session 存储配置
const sessionMysqlConfig = {
  user: config.database.USERNAME,
  password: config.database.PASSWORD,
  database: config.database.DATABASE,
  host: config.database.HOST
}
wss.on('connection', (ws, req) => {
  console.log(req.url)
  var userID = req.url.slice(1)
  // var userID = req.url
  console.log('userID', userID)
  websoc[userID] = ws
  console.log('连接ws成功')
  ws.on('message', data => {
    // ws.send('receive from '+ userID + ':' + data)
    console.log('data', data)
    var msg = JSON.parse(data)
    console.log('msg', msg)
    // wss.broadcast(msg.to, data)
    // v)
    var toUserWebsocket = websoc[msg.id]
    // console.log(toUserWebsocket)
    if (toUserWebsocket) {
      toUserWebsocket.send(JSON.stringify({
        'formUser': userID,
        'data': data
      }))
    }
    // console.log(websoc[userID])
    // console.log(wss.clients[msg.id])
  })
})
// wss.broadcast = function broadcast(s, data){
//   wss.clients.forEach(client => {
//     if (s === 2019) {
//       client.send(data)
//     }
//   })
// }
app.use(session({
  key: 'USER_SID',
  store: new MysqlStore(sessionMysqlConfig)
}))

app.use(require('./routes/index').routes())

server.listen(config.port, () => {
  console.log(chalk.yellow('[月淘淘温馨提示]:'),chalk.blueBright('hello，yours servers is ruuning at localhost:' + config.port))
})




