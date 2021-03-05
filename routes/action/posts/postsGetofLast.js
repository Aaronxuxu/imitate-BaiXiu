const { Posts } = require('../../../model/articleInfo');
module.exports = async(req, res) => {
    let posts = await Posts.aggregate([{
        $lookup: {
            from: 'users',
            localField: 'auth',
            foreignField: '_id',
            as: 'auth'
        }
    }, {
        $lookup: {
            from: 'categories',
            localField: 'category',
            foreignField: '_id',
            as: 'category'
        }
    }, {
        $sort: { 'createAt': -1 }
    }, {
        $limit: 4
    }, {
        $project: {
            _id: 1,
            title: 1,
            content: 1,
            createAt: 1,
            'category.title': 1,
            'category._id': 1,
            thumbnail: 1,
            'auth.nickName': 1,
            meta: 1
        }
    }]);
    res.send({ posts, status: 1 });
}