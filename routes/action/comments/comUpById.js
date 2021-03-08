const { Comments } = require('../../../model/articleInfo');
module.exports = async(req, res) => {
    let { id } = req.params;
    let comment = await Comments.findById(id).populate('auth post');
    let { urole, uid } = req.session;
    if (urole == 'normal' && uid != comment.auth._id) {
        return res.send({
            msg: '您不是管理员或这篇文章作者，无法对评论进行审核',
            status: 0
        })
    }
    comment.state == true ? comment.state = false : comment.state = true
    comment = await comment.save();
    res.send({ comment, status: 1 });
}