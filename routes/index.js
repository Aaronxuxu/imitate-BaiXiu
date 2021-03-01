const express = require('express');
const index = express.Router();



index.post('/login', require('./action/others/login'));
index.post('/logout', require('./action/others/logout'));
index.get('/login/status', require('./action/others/loginStatus'));
module.exports = index;