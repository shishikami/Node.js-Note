// 接口
const express = require('express');

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json);

const router = require('./17-apiroutermodule.js');
app.use('/api', router);

app.listen(8080, () => {
    console.log('server started!');
})