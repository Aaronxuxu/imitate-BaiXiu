const express = require('express');
const Category = express.Router();

// 查询分类列表
Category.get('/', require('./action/category/catGet'));

// 根据title查询分类
Category.get('/title', require('./action/category/catGetByTitle'));

// 获取分类数量
Category.get('/count', require('./action/category/catCount'));

// 根据ID查询分类
Category.get('/:id', require('./action/category/catGetById'));

// 根据ID修改分类
Category.put('/:id', require('./action/category/catUpById'));

// 添加分类
Category.post('/', require('./action/category/catAdd'));

// 删除分类
Category.delete('/:id', require('./action/category/catDeleteById'));


module.exports = Category;