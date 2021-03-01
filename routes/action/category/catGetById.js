const { Category } = require('../../../model/articleInfo');
module.exports = async(req, res) => {
    let { id } = req.params;
    let value = await Category.findById(id);
    if (!value) {
        return res.send({
            msg: '找不到此分类',
            status: 0
        })
    };
    return res.send({
        status: 1,
        value
    })
}