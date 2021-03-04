const { Posts } = require('../../../model/articleInfo');
const pagination = require('mongoose-sex-page');
module.exports = async(req, res) => {
    let page = req.query.page || 1
    let val = await pagination(Posts).page(page).size(3).display(3).populate('auth').populate('category').exec();
    res.send({
        val
    });
}