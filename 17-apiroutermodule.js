const express = require('express');

const router = express.Router();

express().use(express.urlencoded({ extended: false }));

router.get('/get', (req, res) => {
    const query = req.query;
    res.send({
        status: 0,
        msg: 'GET 请求成功',
        data: query
    })
    console.log(query);
})

router.post('/post', (req, res) => {
    const query = req.body;
    res.send({
        status: 0,
        msg: 'POST 请求成功',
        data: query
    })
    console.log(query);
})

router.delete('/delete', (req, res) => {
    res.send({
        status: 0,
        msg: 'DELETE 请求成功',
    })
})

module.exports = router;