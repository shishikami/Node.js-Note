// 使用nodemon
// 监听项目，代码变化后自动重启
const express = require('express');

const app = express();

app.listen(8888, () => {
    console.log('Server started');
    // console.log('restart');
})