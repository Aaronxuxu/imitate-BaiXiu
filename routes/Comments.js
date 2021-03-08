const express = require('express');
const Comments = express.Router();
// 创建评论
Comments.post('/', require('./action/comments/comAdd'));
// 获取评论列表
Comments.get('/', require('./action/comments/comGet'));
// 获取最新评论
Comments.get('/lasted', require('./action/comments/comGetOfLast'));
// 修改评论状态
Comments.put('/:id', require('./action/comments/comUpById'));
// 根据id删除评论
Comments.delete('/:id', require('./action/comments/comDelById'));
module.exports = Comments