const { Posts } = require('../../../model/articleInfo');
const fs = require('fs');
const path = require('path');
module.exports = async(req, res) => {
    let { id } = req.params;
    let { auth } = await Posts.findById(id);
    let { urole, uid } = req.session;
    if (urole != 'admin' && auth != uid) {
        return res.send({
            msg: '您没有权限删除此文章',
            status: 0
        });
    }
    let val = await Posts.findOneAndDelete({ _id: id });
    if (val.thumbnail) {
        fs.unlink(path.join(__dirname, '../../../public/' + val.thumbnail), function(err) {
            if (err) {
                console.log(err);
            }
        });
    }
    // if (val)
    return res.send({
        msg: '删除成功',
        status: 1
    });
}