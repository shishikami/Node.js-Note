// 中间件 业务流程中的中间处理环节

// 当一个请求到达Express服务器后可以连续调用多个中间件，对请求进行预处理
// Express中间件本质为function处理函数
// 格式：
// app.get('/',function(req,res,next){
//     next()
// })
// next()函数作用：实现多个中间件连续调用
// 表示把流转关系转交给下一个中间件或路由
const express = require('express');
const mytime = require('./10-mpackage/index.js')
const qs = require('querystring');

const app = express();

const mw = function (req, res, next) {
    // console.log("这是一个中间件函数");
    req.requestTime = mytime.dateFormat(new Date());
    next();
}

// 全局生效的中间件
// 客户端发起的任何请求都会触发的中间件
// 用app.use(functionName)定义全局生效的中间件
app.use(mw);

// app.get('/', (req, res) => {
//     res.send('/ request at ' + req.requestTime);
// })

// app.get('/user', (req, res) => {
//     res.send('/user request');
// })

// 全局中间件简化形式
// app.use((req, res, next) => {
//     next();
// })

// 中间件的作用
// 多个中间件和路由共享req，res
// 可以在上游对req/res添加自定义属性或者方法，由下游中间件/路由使用

// 定义多个全局中间件
// 连续调用app.use()方法
// 中间件按添加顺序被调用

// 不使用app.use()定义的中间件时局部生效的中间件
// 使用：
// app.get('/',mw,function(req,res){...})
// 仅在访问'/'目录时生效
// 可以用逗号分隔，或者放到一个数组里
// 调用顺序由该写入顺序决定

// * 一定在路由之前调用中间件
//   中间件之间要调用next()函数
//   调用next()之后不要写其他的代码了

// 中间件分类：
// 1.应用级别：
//   app.use/get/post 绑定到app实例上的中间件
// 2.路由级别
//   绑定到express.Router()实例上的中间件
// 3.错误级别
//   专门捕获整个项目中发生的异常错误，防止项目异常崩溃
//   格式：必须包含四个形参(err,req,res,next)
// app.get('/error', function (req, res) {
//     throw new Error('寄啦');
//     res.send('Home page');
// })

// app.use(function (err, req, res, next) {
//     console.log('发生了错误 ' + err.message);
//     res.send('Error! ' + err.message);
// })
// * 错误中间件必须注册在所有路由之后！！！
// 4.Express内置
// express.static
// express.json 解析JSON格式的请求体数据
// app.use(express.json());
// 服务器可以用req.body获取客户端发送的请求体数据
// 不配置解析表单的中间件 req.body默认为undefined 

// express.urlencoded解析URL-encoded格式的请求数据
// app.use(express.urlencoded({ extended: false }))
// 5.第三方

// 自定义中间件
// 模拟express.urlencoded中间件
// 1.定义中间件
// 2.监听req的data事件
// 3.监听req的end事件
// 4.使用querystring模块解析请求体数据
// 5.解析数据挂载为req.body
app.use((req, res, next) => {
    // 监听data事件
    // 数据量较大的情况 客户端会对数据进行切割，分批发送到服务器
    // 所以data时间可能多次触发
    let str = '';
    req.on('data', (chunk) => {
        str += chunk;
    })
    // 数据接收完毕后自动触发end()事件
    req.on('end', () => {
        // 将字符串形式的请求体数据解析为对象格式
        const body = qs.parse(str);
        // console.log(body);
        // 挂载
        req.body = body;
        next();
    })
    // 后续要封装这个模块~~
})

// Nodejs内置了querystring模块，专门用来处理查询字符串
// 该模块提供parse()函数，将查询字符串解析为对象格式
// const qs = require('querystring');

app.get('/', (req, res) => {
    res.send('/ request at ' + req.requestTime);
})

app.get('/user', (req, res) => {
    res.send('/user request');
})

app.get('/error', function (req, res) {
    throw new Error('寄啦');
    res.send('Home page');
})

app.post('/', (req, res) => {
    res.send(req.body);
})

app.use(function (err, req, res, next) {
    console.log('发生了错误 ' + err.message);
    res.send('Error! ' + err.message);
})

app.listen(8080, () => {
    console.log("server started");
})