// CORS解决跨域 Cross-Origin Resource sharing
// 接口服务器配置了CORS相关的http响应头 可以接触浏览器跨域访问的限制
// 配置Access-Control-Allow-*

// * 只需要在服务端开启
//   存在兼容性

// 响应头
// 1. Access-Control-Allow-Origin:<origin> | *
//    origin参数指定了允许访问该资源的外域url
//    * 指所有域名都可以访问
// 2. Access-Control-Allow-Headers
//    默认CORS仅支持浏览器向雾浮起发送九个请求头：
//    Accept Accept-Language Content-Language DPR Downlink Save-Data
//    Viewport-Width Width Content-Type(值仅限于text/plain multiple/form-data application/x-www-form-urlencoded)
//    如果客户端向服务器发送了额外的请求头，则需要在服务器端通过Access-Control-Allow-Headers对额外请求头进行声明
//    否则请求失败
// 3. Access-Control-Allow-Methods
//    默认情况下CORS仅支持客户端发起GET POST HEAD请求
//    其余方法需要在服务器端进行配置
//    e.g. res.setHeader('Access-Control-Allow-Methods','*')

// CORS请求的分类，根据请求方式和请求头的不同 分为两大类：
// 1.简单请求
//   请求方式限于 GET POST HEAD
//   HTTP头部信息不超过以下几个字段：无自定义头部字段：Accept Accept-Language Content-Language DPR Downlink Save-Data
//                                 Viewport-Width Width 
//                                 Content-Type(值仅限于text/plain multiple/form-data application/x-www-form-urlencoded)
//   特点：只发生一次请求
// 2.预检请求
//   为GET、POST、HEAD之外的请求
//   包含自定义头部字段
//   向服务器发送了application/json格式的数据
//   特点：发生两次请求，预检成功后发起真正的请求
// 浏览器和服务器正是通信之前，浏览器会先发送OPTION请求进行遇见，获知服务器是否允许该实际请求
// 该option请求为预检请求。服务器响应预检请求后，客户端再发送真正的请求

// 使用cors中间件解决跨域问题
// 安装中间件后
// const cors = require('cors);导入中间件

// * 在路由之前配置中间件
// 接口
const express = require('express');
const cors = require('cors');

const app = express();

app.use(express.urlencoded({ extended: false }));
// app.use(express.json);

// 配置cors
app.use(cors());

const router = require('./17-apiroutermodule.js');
app.use(router);

app.listen(8080, () => {
    console.log('server started!');
})