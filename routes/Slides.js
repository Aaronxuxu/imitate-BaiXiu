const express = require('express');
const Slides = express.Router();
// 获取轮播图列表
Slides.get('/', require('./action/slides/slidesGet'));
// 添加轮播图片
Slides.post('/', require('./action/slides/slidesAdd'));
// 删除轮播图片
Slides.delete('/:id', require('./action/slides/slidesDel'))
module.exports = Slides