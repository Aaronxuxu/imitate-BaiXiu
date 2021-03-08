const pagination = require('mongoose-sex-page');
const mongoose = require('mongoose');
const { Posts, Category } = require('../../../model/articleInfo');
module.exports = async(req, res) => {
    let { id } = req.params;
    let { state } = req.query;
    let page = req.query.page || 1
    let val;
    if (!state) {
        let cate = await Category.findById(id)
        val = await Posts.aggregate([{
            $match: {
                'category': mongoose.Types.ObjectId(id),
                'state': 1
            }
        }, {
            $lookup: {
                from: 'categories',
                localField: 'category',
                foreignField: '_id',
                as: 'category'
            }
        }, {
            $lookup: {
                from: 'users',
                localField: 'auth',
                foreignField: '_id',
                as: 'auth'
            }
        }]);
        val.forEach(element => {
            element.category = element.category[0];
            element.auth = element.auth[0]
        });
        return res.send({ val, status: 1, cate });
    }
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