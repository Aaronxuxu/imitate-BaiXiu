const { Posts } = require('../../../model/articleInfo')
module.exports = async(req, res) => {
    // let posts = await Posts.find({ state: 1 }).sort({ 'meta.comments': -1 }).limit(4);
    let posts = await Posts.aggregate([{
        $match: {
            state: 1
        }
    }, {
        $sort: {
            'meta.comments': -1
        }
    }, {
        $limit: 4
    }, {
        $project: {
            _id: 1,
            title: 1,
            thumbnail: 1,
        }
    }])
    res.send({ posts, status: 1 });
}