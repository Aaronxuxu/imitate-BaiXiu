const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const session = require('express-session');
const moment = require('moment');
require('./model/connect')
const app = express();

// 设置post请求处理
app.use(bodyParser.urlencoded({ extended: false }));

// 设置静态文件默认路径
app.use(express.static(path.join(__dirname, 'public')));

// 设置登录的时候生成session
app.use(session({
    secret: 'key',
    cookie: { maxAge: 1000 * 60 * 60 },
    saveUninitialized: true,
}));


app.locals.moment = moment;

app.use('/Users', require('./routes/Users'));
app.use('/Slides', require('./routes/Slides'));
app.use('/Settings', require('./routes/Settings'));
app.use('/Posts', require('./routes/Posts'));
app.use('/Comments', require('./routes/Comments'));
app.use('/Category', require('./routes/Category'));

app.listen(80);
console.log('服务器开启成功');