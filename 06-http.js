// 创建Web服务器的模块
// 可以将普通的电脑转换为Web服务器

// 导入模块
const http = require('http');

// 服务器和普通电脑的区别
// 服务器安装了Web服务器软件 IIS Apache等
// Node.js可以通过提供的http模块实现服务器软件的功能

// ip地址
// 域名 域名服务器
// 字符型的地址方案 域名地址
// ip地址和域名一一对应，对应关系存放在域名服务器中（DNS, Domain name server）
// 域名服务器提供ip地址和域名之间的转换服务的服务器
// 127.0.0.1 对应域名 localhost

// 端口号
// 每个web服务对应唯一端口号
// 每个端口号不能同时被多个web服务站用
// 实际应用中80端口号可以省略

// 创建基本web服务器
// 1.导入模块
// 2.创建web服务器实例
const server = http.createServer();
// 3.为服务器绑定request事件，监听客户端请求
// req请求对象 存储与客户端相关的数据或请求
// req.url 客户端请求的url地址
// req.method 客户端method请求类型

// res响应对象
// 访问与服务器相关的属性
// res.end() 向客户端发送制定的内容，并结束这次请求的处理过程
// 解决乱码问题：手动配置内容编码格式
// res.setHeader('Content-Type','text/html;charset=utf-8');
server.on('request', (req, res) => {
    let url = req.url;
    let meth = req.method;
    console.log(`Request by url ${url}, and method as ${meth}`);
    // res.setHeader('Content-Type', 'text/html;charset=utf-8');
    // res.end(`Request by url ${url}, and method as ${meth}`);
    res.setHeader('Content-Type', 'text/html;charset=utf-8')
    res.end("我是中文乱码（不是");
})
// 4.启动服务器
// server.listen(端口号，回调函数)
server.listen(8888, () => {
    console.log('http server running at localhost:8888.')
})

