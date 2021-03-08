const { Posts } = require('../../../model/articleInfo');
module.exports = async(req, res) => {
    let { key } = req.params;
    let posts = await Posts.find({ content: { $regex: key } });
    if (posts.length == 0) {
        return res.send({
            msg: '文章不存在'
        })
    }
}