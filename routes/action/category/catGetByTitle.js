const { Category } = require('../../../model/articleInfo');
module.exports = async(req, res) => {
    let { title, id } = req.query;
    let val = await Category.findOne({ title });
    if (val && id != val._id) {
        return res.send({
            msg: '该分类名已经存在',
            status: 0
        });
    }
    return res.send({
        status: 1
    })
}