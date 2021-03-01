const mongoose = require('mongoose');

// 文章
const Posts = mongoose.model('Posts', new mongoose.Schema({
    title: {
        type: String,
        trim: true,
        required: true,

    },
    auth: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    state: {
        type: Boolean,
        required: true,
    },
    content: {
        type: String,
        required: true
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true,
    },
    thumbnail: {
        type: String,
    },
    createAt: {
        type: Date,
        default: Date.now,
        required: true,
    },
    updateAt: {
        type: Date,
        default: Date.now,
        required: true,
    }
}));

// 文章类别
const Category = mongoose.model('Category', new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    className: {
        type: String,
        required: true,
    },
    createAt: {
        type: Date,
        require: true,
        default: Date.now,
    }
}));

// 文章点赞/评论/点赞数量
const Meta = mongoose.model('Meta', new mongoose.Schema({
    post: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Posts'
    },
    views: {
        type: Number,
        default: 0
    },
    likes: {
        type: Number,
        default: 0
    },
    comments: {
        type: Number,
        default: 0
    }
}));

// 评论
const Comments = mongoose.model('Comment', new mongoose.Schema({
    content: {
        type: String,
        required: true
    },
    auth: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Posts',
        required: true
    },
    state: {
        type: Boolean,
        default: false,
        required: true,
    },
    createAt: {
        type: Date,
        default: Date.now,
        required: true,
    }
}));

module.exports = { Posts, Category, Comments, Meta };