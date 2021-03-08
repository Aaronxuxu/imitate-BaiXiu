const { Posts } = require('../../../model/articleInfo');
module.exports = async(req, res) => {
    let { id } = req.params;
    let posts = await Posts.findById(id).populate('auth category');
    posts.meta.views += 1;
    posts = await posts.save();
    return res.send({ value: posts });
}