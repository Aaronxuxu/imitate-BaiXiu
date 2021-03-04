const { Posts } = require('../../../model/articleInfo');
module.exports = async(req, res) => {
    let { commend } = req.body;
    let { id } = req.params;
    let posts = await Posts.findById(id);
    let msg;
    if (commend == 'like') {
        posts.meta['likes'] += 1;
        msg = '赞+1'
    } else {
        posts.meta['likes'] -= 1;
        msg = '赞-1'
    };
    posts.save();
    res.send({
        msg
    });
}