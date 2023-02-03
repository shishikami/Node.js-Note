// JWT
// JSON Web Token
// 最流行的跨域认证解决方案

// 工作原理
// 验证通过后将用户信息对象经过加密后生成Token字符串
// 服务器将token发送到客户端
// 客户端将token存储到localStorage/sessionstorage中
// 客户端再次发起请求时通过请求头的Authorization字段，将token发送给服务器
// 服务器将token还原为用户信息对象
// 认证....

// JWT组成部分
// Header头部 Payload有效和在 Signature签名
// 三者之间用英文的.分隔
// payload真正的用户信息 用户信息经过加密之后生成的字符串
// header和signature安全性相关的部分 为了保证token的安全性

// 使用方式
// 客户端收到后存储在 localStorage/sessionStorage中
// 此后每次通信都带上JWT字符串进行身份验证
// 推荐做法是把JWT放在HTTP请求头的Authorization字段中
// 格式：
// Authorization：Bearer <token>

// Express中的JWT
// 两个包：
// jsonwebtoken
// express-jwt
const jwt = require('jsonwebtoken');
const { expressjwt: expressJWT } = require('express-jwt');

const express = require('express');

const app = express();

const cors = require('cors');
app.use(cors());

// 定义secret密钥
// 用于加密和解密
const secretKey = 'sbzzh';

app.use(express.urlencoded({ extended: false }));
// 生成JWT字符串
// 调用jsonwebtoken包中的sign()方法
// jwt.sign()需要三个参数 用户对象信息 加密密钥 配置对象
// expireIn:作废时间
app.post('/', (req, res) => {
    let str = req.body.username;
    // console.log(str);
    res.send({
        status: 200,
        message: 'success',
        token: jwt.sign({ username: str }, secretKey, { expiresIn: '90s' })
    })
})

// JWT还原为json对象
// 客户端访问需要权限的接口，需要主动通过请求头中的Authorization字段将token字符串发送到服务器进行身份认证
// 通过express-jwt中间件将token解析为json对象
// 使用app.use()注册中间件
// expressJWT({secret:secretKey})用来解析Token的中间件
// .unless({path:...})用来指定哪些端口不需要访问权限
app.use(expressJWT({ secret: secretKey, algorithms: ['HS256'] }).unless({ path: [/^\/api\//] }));

// 使用req.user
// 配置jwt中间件后可以用req.auth对象访问JWT字符串中解析出来的用户信息
// req本身没用auth属性，由中间件挂载
app.get('/user', (req, res) => {
    res.send({
        status: 200,
        message: 'success',
        data: req.auth
    })
})

// 如果Token不合法或者过期，会产生解析失败的错误
// 通过错误中间件捕获错误并进行相关的处理
app.use((err, req, res, next) => {
    console.log(err.message);
    if (err.message === 'UnauthorizedError') {
        return res.send({ status: 401, message: 'invalid Token' });
    }
    // jwt expired
    // ...
    res.send({
        status: 500,
        message: 'Unknown Error'
    })
})

app.listen(8080, () => {
    console.log('started');
})