const { Category } = require('../../../model/articleInfo');
module.exports = async(req, res) => {
    let deleData = [];
    let { id } = req.params;
    id = id.split('-');
    for (const key in id) {
        let val = await Category.findOneAndDelete({ _id: id[key] });
        deleData.push(val);
    }
    res.send({
        status: 1,
        deleData
    });
}