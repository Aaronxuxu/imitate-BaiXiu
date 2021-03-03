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
        default: false,
    },
    content: {
        type: String,
        required: true,
        default: ''
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
    },
    meta: [{
        views: {
            type: Number,
            default: 0,
            required: true
        },
        likes: {
            type: Number,
            default: 0,
            required: true
        },
        comments: {
            type: Number,
            default: 0,
            required: true
        }
    }],
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

module.exports = { Posts, Category, Comments };