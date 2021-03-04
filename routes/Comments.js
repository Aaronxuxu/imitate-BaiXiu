const express = require('express');
const Comments = express.Router();

Comments.post('/', require('./action/comments/comAdd'));
module.exports = Comments