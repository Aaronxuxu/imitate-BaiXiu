const { Posts } = require('../../../model/articleInfo');
module.exports = async(req, res) => {
    let postCount = await Posts.find().countDocuments();
    let draftCount = await Posts.find({ state: 0 }).countDocuments()
    res.send({ postCount, draftCount });
}