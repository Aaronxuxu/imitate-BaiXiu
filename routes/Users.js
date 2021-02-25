const express = require('express');
const Users = express.Router();
Users.get('/', require('./action/users/usersGet'))
Users.put('/password', require('./action/users/userUpPas'));

module.exports = Users