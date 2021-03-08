const { Comments } = require('../../../model/articleInfo');
module.exports = async(req, res) => {
    let comment = await Comments.aggregate([{
        $match: {
            state: true
        }
    }, {
        $sort: {
            createAt: -1
        }
    }, {
        $limit: 5
    }, {
        $lookup: {
            from: 'users',
            localField: 'auth',
            foreignField: '_id',
            as: 'auth'
        }
    }, {
        $lookup: {
            from: 'posts',
            localField: 'post',
            foreignField: '_id',
            as: 'post'
        }
    }, {
        $project: {
            '_id': 1,
            'content': 1,
            'createAt': 1,
            'auth.nickName': 1,
            'auth.avatar': 1,
            'post._id': 1
        }
    }]);
    res.send({ comment })
}