const express = require('express');
const router = express.Router();

const userHandler = require('../router_handler/user');

const joi = require('joi');
const { reg_login_schema } = require('../schema/user');

router.post('/reguser', joi(reg_login_schema), userHandler.regUser);

router.post('/login', userHandler.login);

module.exports = router;