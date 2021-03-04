const pagination = require('mongoose-sex-page');
const { Posts } = require('../../../model/articleInfo');
module.exports = async(req, res) => {
    let { id } = req.params;
    let { state } = req.query;
    let page = req.query.page || 1
    let val;
    if (state == 'all') {
        state = [0, 1];
    }
    if (id == 'all') {
        val = await pagination(Posts).find({ state: { $in: state } }).page(page).size(3).display(3).populate('auth').populate('category').exec();
        return res.send({ val });
    };
    val = await pagination(Posts).find({ category: id, state: { $in: state } }).page(page).size(3).display(3).populate('auth').populate('category').exec();
    return res.send({ val });
};