const { Comments } = require('../../../model/articleInfo');
module.exports = async(req, res) => {
    let { id } = req.params;
    let commen = await Comments.findById(id);
    let { uid, urole } = req.session;
    if (urole == 'normal' && uid != commen.auth._id) {
        return res.send({
            msg: '不是本文章作者或管理员无权限删除此评论',
            status: 0
        })
    }
    let comment = await Comments.findOneAndDelete({
        _id: id
    })
    return res.send({
        status: 1,
        comment
    })


}