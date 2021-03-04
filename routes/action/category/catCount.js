const { Category } = require('../../../model/articleInfo');
module.exports = async(req, res) => {
    let val = await Category.find().countDocuments();
    res.send({
        status: 1,
        val
    })
}