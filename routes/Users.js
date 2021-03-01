const express = require('express');
const Users = express.Router();

//  获取用户列表
Users.get('/', require('./action/users/usersGet'));


// 修改用户密码
Users.put('/password', require('./action/users/userUpPas'));

// 根据 id 查找用户
Users.get('/:id', require('./action/users/userGetById'));

//根据email查找用户
Users.get('/email/:email', require('./action/users/userGetByEmail'))

// 根据id修改用户信息
Users.put('/:id', require('./action/users/userUpById'));

// 根据id删除用户
Users.delete('/:id', require('./action/users/userDeleteById'));

// 创建用户
Users.post('/', require('./action/users/usersAdd'));

module.exports = Users;