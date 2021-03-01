const { Category } = require('../../../model/articleInfo');
module.exports = async(req, res) => {
    let value = await Category.find();
    return res.send({
        msg: '查找数据成功',
        status: 1,
        value
    })
}