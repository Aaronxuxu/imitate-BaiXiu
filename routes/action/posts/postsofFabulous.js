const { Posts } = require('../../../model/articleInfo');
module.exports = async(req, res) => {
    let { commend } = req.body;
    let { id } = req.params;
    let { isLogin, status } = req.session;
    if (!isLogin) {
        return res.send({
            msg: '需要登录才能进行点赞与评论',
            status: 0
        });
    };
    if (!status) {
        return res.send({
            msg: '该账号还未激活，无法点赞与评论，请联系管理员。',
            status: 0
        })
    };
    let posts = await Posts.findById(id).populate('auth category');
    let msg;
    if (commend == 'like') {
        posts.meta['likes'] += 1;
        msg = '赞+1'
    } else {
        posts.meta['likes'] -= 1;
        msg = '赞-1'
    };
    posts = await posts.save();
    res.send({
        msg,
        posts,
        status: 1
    });
}