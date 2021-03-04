const express = require('express');
const Posts = express.Router();

// 创建文章
Posts.post('/', require('./action/posts/postAdd'));

// 查询所有文章
Posts.get('/', require('./action/posts/postsGet'));

// 获取随机推荐
Posts.get('/random', require('./action/posts/postsGetofRandom'));

// 获取热门推荐
Posts.get('/recommend', require('./action/posts/postsGetofRecommend'));

// 获取最新发布文章
Posts.get('/lasted', require('./action/posts/postsGetofLast'));

// 获取文章数量
Posts.get('/count', require('./action/posts/postsCount'));

// 根据ID获取文章
Posts.get('/:id', require('./action/posts/postsGetById'));

// 根据分类获取文章列表
Posts.get('/category/:id', require('./action/posts/postsByCateInId'));

// 根据ID删除文章
Posts.delete('/:id', require('./action/posts/postsDeletebyId'));

// 根据ID修改文章
Posts.put('/:id', require('./action/posts/postsUpbyId'));

// 文章点赞
Posts.post('/fabulous/:id', require('./action/posts/postsofFabulous'));
module.exports = Posts