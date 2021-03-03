const { Posts } = require('../../../model/articleInfo');
const formidable = require('formidable');
const path = require('path');
module.exports = async(req, res) => {
    let id = req.session.uid;
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.uploadDir = path.join(__dirname, '../../../public/uploads');
    form.parse(req, async(err, field, file) => {
        if (Object.keys(file).length != 0) {
            field.thumbnail = file['thumbnail'].path.split('public')[1]
        };
        field.createAt == '' ? field.createAt = new Date() : field.createAt;
        field.auth = id;
        await Posts.create(field);
        res.send({
            msg: '发表文章成功，并在两秒钟后跳转回所有文章页面。',
            status: 1
        });
    });
}