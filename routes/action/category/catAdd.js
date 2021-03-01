const { Category } = require('../../../model/articleInfo');
const formidable = require('formidable')
module.exports = async(req, res) => {
    let form = new formidable.IncomingForm();
    form.parse(req, async(err, field, file) => {
        let val = await Category.create(field);
        return res.send({
            status: 1,
            val,
            msg: '恭喜添加成功'
        })
    })
}