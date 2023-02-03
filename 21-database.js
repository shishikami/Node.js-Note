// 数据库 组织 存储 管理 数据的地方
// MySQL数据库 目前最广泛 流行度最高
// Community免费（Enterprise付费
// 还有Oracle SQLserver
// 以上三者 传统型数据库/关系型数据库/SQL数据库

// Mongodb 非关系型数据库/NoSQL数据库

// 传统数据库的数据组织结构
// 数据的组织结构分为 数据库(database) 数据表(table) 数据行(row) 字段(field)
// 字段有对应的数据类型

// 一般而言每个项目对应单独的数据库
// 不同的数据一般存储到不同的表中
// 每个表中存储的信息由字段决定


// 使用SQL管理数据库 Structured Query Language
// 结构化查询语言 访问和处理数据库
// 1.数据库编程语言
// 2.编写出来的代码 SQL语句
// 3.只能使用在关系型数据库中
// * 关键字对大小写不敏感

// SELECT语句
// 从表里查询数据 执行结果存储在结果表/结果集中
// SELECT * FROM tableName
// SELECT columeName FROM tableName
// 多个列之间逗号间隔

// INSERT INTO语句
// INSERT INTO tableName (col1,col2...) VALUES (val1,val2...)
// 列和值一一对应，多个列/值之间逗号分隔

// UPDATE
// UPDATE tableName SET colName = newValue WHERE colName = someValue
// 多个列之间键值对用逗号分隔

// DELETE
// DELETE FROM tableName WHERE colName = someValue

// WHERE子句
// 限定选择的标准 再SELECT UPDATE DELETE中都能使用
// WHERE colName 运算符 value
// 运算符 = <> > < <= >= BETWEEN LIKE
// <> 不等于（可以写为!=
// BETWEEN 在某个范围内
// LIKE 搜索某种模式

// AND OR

// ORDER BY语句
// 根据指定的列对结果集进行排序
// 默认按照升序（ASC
// 降序的话使用关键字 DESC
// 多重排序：
// ORDER BY colName DESC，colName ASC

// COUNT(*)
// 返回查询结果的总数据条数
// SELECT COUNT(*) FROM tableName

// AS设置别名
// 给查询出的列设置别名

// 项目中操作MySQL
// 1.使用模块
// 2.连接数据库
// 3.通过MySQL模块执行SQL语句
const mysql = require('mysql');
const db = mysql.createPool({
    host: '127.0.0.1',
    user: 'root',
    password: 'admin',
    database: 'sqldatabase'
})
// 测试能否工作
// db.query('SELECT * FROM user', (err, results) => {
//     if (err) {
//         return console.log(err.message);
//     }
//     console.log(results);
// })

// SELECT语句 res为一个数组

// 插入数据
const newuser = {
    username: 'asdqfsf',
    password: 'pcc12441'
}
const sqlStr = 'INSERT INTO user (username,password) VALUES (?,?)';
db.query(sqlStr, [newuser.username, newuser.password], (err, res) => {
    if (err) {
        return console.log(err.message);
    }
    if (res.affectedRows === 1) {
        console.log('插入成功');
    }
    else {
        console.log('好像有点小问题');
    }
})
// INSEERT INTO返回一个对象
// 其affectedRows属性可以用来判断数据是否插入成功

// 快速插入
// 如果数据对象每个属性和数据表的字段一一对应
// sqlStr = 'INSERT INTO user SET ?'
// db.query(sqlStr,user,(err,res)=>{...})

// 更新对象
// const sqlStr = 'UPDATE user SET username=?, passwoed=? WHERE id=?';
//  db.query(sqlStr,[user.username,user.password,user.id],(err,res)=>{
//     if(err){
//         return console.log(err.message);
//     }
//     if(res.affectedRows === 1){
//         console.log('Success');
//     }
//     else{
//         ...
//     }
// })
// res结果为对象

// 更新数据的便捷形式
// 数据对象属性和table字段一一对应
// sqlStr = 'UPDATE user SET ? WhERE id=?';
// db.query(sqlStr,[user,user.id],(err,res)=>{...});

// 删除数据
// 推荐使用id这种具有唯一性的标识
// const sqlStr = 'DELETE FROM user WHERE id=?';
// db.query(sqlStr, 2, (err, res) => {
//     if (err) {
//         return console.log(err.message)
//     }
//     if (res.affectedRows === 1) {
//         console.log('Success!')
//     }else{
//         ...
//     }
// })
// 如果SQL语句有多个占位符，必须使用数组为每个占位符指定具体的值
// 如果只有一个占位符 可以省略数组

// 使用DELETE语句，会真正的把数据从表中删除掉
// 为保险起见，推荐使用标记删除的形式
// 设置类似Statusd的状态字段 通过UPDATE语句来标记删除