const { Category } = require('../../../model/articleInfo');
const formidable = require('formidable');
module.exports = async(req, res) => {
    let { id } = req.params;
    let form = new formidable.IncomingForm();
    form.parse(req, async(err, field, file) => {
        let val = await Category.findByIdAndUpdate(id, field, {
            new: true
        });
        return res.send({
            status: 2,
            val,
        });
    });
}