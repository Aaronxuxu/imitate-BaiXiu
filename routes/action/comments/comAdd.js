const { Comments } = require('../../../model/articleInfo');
module.exports = async(req, res) => {
    let artId = req.body.id;
    let { content } = req.body;
    let { uid, isLogin } = req.session;
    if (!isLogin) {
        return res.send({
            msg: '评论前需要登录',
            status: 0
        });
    }
    let commen = await Comments.create({
        content,
        auth: uid,
        post: artId,
        state: false
    })
    return res.send({
        msg: '评论成功，请等待审核。',
        commen,
        status: 1
    })
}