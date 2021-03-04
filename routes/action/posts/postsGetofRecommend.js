const { Posts } = require('../../../model/articleInfo')
module.exports = async(req, res) => {
    let posts = await Posts.find().sort({ comments: 1 });
    res.send(posts);
}