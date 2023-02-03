// 官方提供的 操作文件的模块

// 导入方法
// const fs = require('fs');
const fs = require('fs');

// fs.readFile()方法
// fs.readFile(path[,option],callback)
// path 必选 文件路径
// options 可选 读取文件用的编码格式
// callback 必选 读取完毕后的回调函数
fs.readFile('./02-test.js', function (err, dataStr) {
    console.log(err);
    console.log('-------------');
    console.log(dataStr.toString());
    // 如果读取成功，err为null
    // 读取失败 err为错误对象
    //         dataStr为undefined
})

/*
判断文件是否读取成功：
fs.readFile('./02-test.js', function (err, dataStr) {
    if(err){
        return console.log(err.message);
    }
    console.log(dataStr.toString());
})
 */

// 写入内容
// fs.writeFile(file,data[,options],callback)
// file 必选 指定文件路径字符串
// data 必选 写入内容
// opt  可选 写入格式 默认utf9
// callback 必选 回调函数
// 会覆盖之前的内容

fs.writeFile("./04-test.txt", "Hello,world!", function (err) {
    // console.log(err);
    // 写入成功，err为null
    // 写入失败，err为错误对象
    if (err) {
        console.log("寄了");
    }
    console.log("写入成功");
})

// 动态拼接路径的问题
// 以./ ../开头的相对路径有可能出现错误
// 以执行node命令时所处的目录进行动态拼接 得到完整的路径

// 获取当前文件所处目录
console.log("当前路径为：" + __dirname);