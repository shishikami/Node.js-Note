const express = require('express');
const cors = require('cors');

const joi = require('joi');

const app = express();

// 解析application/x-www-form-urlencoded表单数据
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.use((req, res, next) => {
    res.cc = function (err, status = 1) {
        res.send({
            status,
            message: err instanceof Error ? err.message : err
        })
    }
    next();
})

const userRouter = require('./router/user');
app.use('/api', userRouter);

app.use((err, req, res, next) => {
    if (err instanceof joi.ValidationError) {
        return res.cc(err);
    }
    res.cc(err);
})

app.listen(8080, () => {
    console.log('server started');
})