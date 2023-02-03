// 身份认证

// 服务器端渲染
// Session认证机制
// 前后端分离
// JWT认证机制

// http协议的无状态性
// 客户端的每次http请求都是独立的，连续的多个请求之间没有直接的关系
// 服务器不会保留每次http请求的状态

// Session认证机制
// 突破http协议：cookie
// cookie：存储在用户浏览器中的一段不超过4kb的字符串
// 由名称Name、值Value和其他几个用于控制cookie有效期 安全性 使用范围的可选属性组成
// 不同域名下的Cookie各自独立 客户端发起请求自动将当前域名下的所有未过期的Cookie一同发送到服务器
// 特性：自动发送 域名独立 过期时限 4KB限制

// cookie在身份认证中的作用
// 客户端第一次请求服务器时，服务器通过响应头形式，向客户端发送身份认证的cookie，客户端自动保存cookie
// 此后客户端访问时浏览器自动将身份认证相关的cookie通过请求头的形式发送给服务器
// 服务器即可验明客户端身份
// * Cookie不具有安全性
// cookie存储在浏览器中 浏览器提供了读写cookie的api，所以cookie很容易被伪造
// 不建议服务器将重要的隐私数据通过cookie的形式发送给浏览器
// 提高安全性：服务器验证cookie

// Express-session中间件
// 配置中间件
const express = require('express');
const app = express();

const session = require('express-session');

app.use(session({
    // secret值为任意字符串
    secret: 'keyboard cat',
    // 固定写法
    resave: false,
    // 固定写法
    saveUninitialized: true
}))

app.use(express.urlencoded({ extended: false }));

// 向session中存储数据
// 配置完成后，通过req.session来访问和使用session对象
app.post('/', (req, res) => {
    if (req.body.username !== 'admin' || req.body.password !== '123') {
        return res.send({ status: 1, msg: '登陆失败' })
    }
    req.session.user = req.body;
    req.session.isLogIn = true;
    res.send('登陆成功');
})

// 从Session上取数据
app.get('/user', (req, res) => {
    if (!req.session.isLogIn) {
        return res.send({
            status: 1,
            msg: 'fail'
        })
    }
    res.send({
        status: 0,
        msg: 'success',
        username: req.session.user.username
    })
})

// 清空Session
// 调用req.session.destroy()
// 清空服务器保存的session信息

app.listen(8080, () => {
    console.log('started');
})

// Session局限性
// session认证机制需要配合cookie使用
// cookie默认不支持跨域访问 涉及到前端跨域请求后端接口时要额外配置很多内容

// 前端请求后端接口不存在跨域问题时推荐使用session
// 需要跨域使用JWT认证机制