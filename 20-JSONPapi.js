// * 如果项目已经配置了CORS跨域资源共享
// 为了防止冲突 必须在配置CORS中间件之前生命JSONP接口

const express = require('express');
const cors = require('cors');

const app = express();

app.use(express.urlencoded({ extended: false }));
// app.use(express.json);

app.get('/jsonp', (req, res) => {
    // 1.获取客户端发送过来的回调函数名字
    const funcName = req.query.callback;
    // 2.得到要通过JSONP形式发送给客户端的数据
    const data = { name: 'zs', age: 20 };
    // 3.拼接出函数调用的字符串
    const scriptStr = `${funcName}(${JSON.stringify(data)})`
    // 4.把上一步得到的字符串响应给客户端的<script>标签进行解析执行
    res.send(scriptStr);
})

// 配置cors
app.use(cors());

const router = require('./17-apiroutermodule.js');
app.use(router);

app.listen(8080, () => {
    console.log('server started!');
})