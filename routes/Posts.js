const express = require('express');
const Posts = express.Router();

// 创建文章
Posts.post('/', require('./action/posts/postAdd'));

// 查询所有文章
Posts.get('/', require('./action/posts/postsGet'));

// 根据分类获取文章列表
Posts.get('/category/:id', require('./action/posts/postsByCateInId'));
module.exports = Posts