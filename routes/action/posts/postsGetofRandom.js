const { Posts } = require('../../../model/articleInfo');
module.exports = async(req, res) => {
    let posts = await Posts.aggregate([{ $match: { 'state': 1 } }, { $sample: { size: 5 } }, { $project: { _id: 1, thumbnail: 1, 'meta.views': 1, title: 1 } }]);
    res.send({ posts, status: 1 });
}