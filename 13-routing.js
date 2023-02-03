// 路由 映射关系

// Express中路由时客户端请求和服务器处理函数之间的映射关系
// express中路由由三部分组成：请求类型 请求的url地址 处理函数
// 格式：app.METHOD(PATH, HANDLER);
// e.g. app.get('/',function(req,res){
//          ...
//      })

// 路由的匹配过程
// 请求到达服务器后需要先经过路由的匹配，只有匹配成功后才会调用对应的处理函数
// 到匹配时会先按照路由的顺序进行匹配，如果请求类型和请求的URL同时匹配成功
// 则Express会将这次的请求转交给对应的function函数进行处理
// * 1.按照定义的顺序进行匹配
//   2.请求类型和URL均匹配成功才会执行对应函数

// 路由的使用
// 1.最简单方法挂载在app上（实际使用较少
// 2.模块化路由  将路由抽离为模块
//   (1)创建路由模块对应的.js文件
//   (2)调用express.Router()函数创建路由对象
//   (3)向路由对象挂载对应的路由
//   (4)使用module.exports向外共享路由对象
//   (5)使用app.use()函数注册路由模块
const express = require('express');
const app = express();

const router = require('./14-routingModule.js');

// 注册全局中间件
app.use(router);

app.listen(8888, () => {
    console.log("Server started");
})

// 为路由模块添加前缀
// app.use('前缀',router);