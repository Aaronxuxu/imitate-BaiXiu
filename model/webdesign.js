const mongoose = require('mongoose');
const Slides = mongoose.model('Slide', new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    link: {
        type: String
    },
    image: {
        type: String,
        required: true,
    }
}));
const Settings = mongoose.model('Setting', new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    comment: {
        type: Boolean,
        required: true,
    },
    review: {
        type: Boolean,
        required: true,
    },
    logo: {
        type: String,
    }
}));
module.exports = { Slides, Settings };