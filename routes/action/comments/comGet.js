const { Comments } = require('../../../model/articleInfo');
const pagnition = require('mongoose-sex-page');
module.exports = async(req, res) => {
    let comment = await pagnition(Comments).populate('auth post').page(1).size(10).display(3).exec();
    res.send({ comment });
}