const { Posts } = require('../../../model/articleInfo');
const formidable = require('formidable');
const path = require('path');
const fs = require('fs');
module.exports = async(req, res) => {
    let { id } = req.params;
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.uploadDir = path.join(__dirname, '../../../public/uploads');
    form.parse(req, async(err, field, file) => {
        let oldImg = await Posts.findById(id);
        if (Object.keys(file).length > 0) {
            if (oldImg.thumbnail) {
                fs.unlink(path.join(__dirname, '../../../public/' + oldImg.thumbnail), function(err) {
                    if (err) {
                        console.log(err);
                    }
                });
            };
            field.thumbnail = file['thumbnail'].path.split('public')[1]
        };
        await Posts.findByIdAndUpdate(id, field);
        return res.send({
            msg: '修改成功,并两秒钟内跳回文章页面',
            status: 1
        })
    })

}