// Express
// 基于Node.js的web开发框架
// 专门用来创建Web网站的服务器/API接口的服务器
// https://www.expressjs.com.cn/

// 创建基本的Web服务器
// 导包
const express = require('express');
// 创建服务器
const app = express()
// 调用app.listen(端口号,回调函数)
app.listen(8080, () => {
    console.log('express server running at http://127.0.0.1:8080');
})

// 监听GET请求
// app.get('URL',处理函数);
// URL为用户请求的url地址
// 处理函数 req 请求对象 包含与请求相关的属性 方法
//         res 响应对象 包含与响应相关的属性 方法

// 监听POST请求
// app.post('URL',处理函数);
// URL为用户请求的url地址
// 处理函数 req 请求对象 包含与请求相关的属性 方法
//         res 响应对象 包含与响应相关的属性 方法

// 把内容响应到客户端
// res.send();

// 获取URL中携带的查询参数
// req.query对象 访问到客户端通过查询字符串形式发送的参数
// 默认为空对象

// 获取动态参数
// req.params对象 通过:匹配到的动态参数
// /:str

// 托管静态资源
// express.static()
// 创建静态资源服务器
// app.use(express.static('public'));
// 以上代码将public目录下的所有文件
// * Express在指定的静态目录下查找文件并对外提供资源的访问路径
//   所以静态文件的目录名不会出现在URL中
// 托管多个资源可以多次调用
// 挂载路径前缀：如果希望在托管的静态资源访问路径之前挂载前缀
// app.use('public',express.static('public'));
// 此后访问需要加上/public 