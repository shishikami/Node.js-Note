// 初始化.json
// {
//     "name":"...",
//     "version":"1.0.0",
//      包的入口
//     "main":"index.js",
//      搜索后能看到的简短介绍
//     "description":"简单介绍",
//      搜索用到的关键词
//     "keywords":["..","..."],
//      遵循的协议:
//     "license":"ISC"
// }
const date = require('./src/dateFormat.js');

module.exports = {
    ...date
}