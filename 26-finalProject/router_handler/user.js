const db = require('../db/index');
const bcrypt = require('bcryptjs');

module.exports.regUser = (req, res) => {
    const userinfo = req.body;
    // 对表单数据合法性验证
    if (!userinfo.username || !userinfo.password) {
        // return res.send({
        //     status: 1,
        //     message: '用户名或密码不合法'
        // })
        return res.cc('用户名或密码不合法');
    }
    // 检测用户名是否被占用
    const sqlStr = 'SELECT * FROM ev_users WHERE username=?';
    db.query(sqlStr, userinfo.username, (err, result) => {
        if (err) {
            // res.send({
            //     status: 1,
            //     message: err.message
            // })
            return res.cc(err);
        } else if (result.length > 0) {
            // return res.send({
            //     status: 1,
            //     message: '用户名已被占用'
            // })
            return res.cc('用户名被占用');
        }
        userinfo.password = bcrypt.hashSync(userinfo.password, 10);
        // res.send(userinfo.password);
        const sql = 'INSERT INTO ev_users SET ?';
        db.query(sql, { username: userinfo.username, password: userinfo.password }, (err, resu) => {
            if (err) {
                // return res.send({
                //     status: 1,
                //     message: err.message
                // })
                return res.cc(err);
            }
            if (resu.affectedRows !== 1) {
                // return res.send({
                //     status: 1,
                //     message: '注册失败'
                // })
                return res.cc('注册失败');
            }
            // res.send({
            //     status: 0,
            //     message: '注册成功'
            // })
            res.cc('注册成功', 0);
        })
    })
}

module.exports.login = (req, res) => {
    res.send('login OK');
}