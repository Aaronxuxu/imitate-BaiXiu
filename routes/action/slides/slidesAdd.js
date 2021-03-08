const { Slides } = require('../../../model/webdesign');
const formidable = require('formidable');
const path = require('path');
module.exports = async(req, res) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.uploadDir = path.join(__dirname, '../../../public/uploads/');
    form.parse(req, async(err, field, file) => {
        if (Object.keys(file).length != 0) {
            field.image = file.file.path.split('public')[1]
        }
        let slides = await Slides.create(field);
        return res.send({
            msg: '创建成功',
            slides,
            status: 1
        })
    })
}