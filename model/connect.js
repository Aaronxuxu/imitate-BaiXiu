const mongoose = require('mongoose');
mongoose.connect('mongodb://root:033010@localhost:27017/BaiXiu?authSource=admin', {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useFindAndModify: false,
    })
    .then(() => console.log('数据库连接成功'))
    .catch(err => console.log('数据库连接失败，失败的原因是：' + err.codeName));