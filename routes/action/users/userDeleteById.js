const Users = require('../../../model/userInfo');
const fs = require('fs');
const path = require('path');
module.exports = async(req, res) => {
    let LoginUseId = req.session.uid;
    let { role } = await Users.findById(LoginUseId);
    if (role == 'normal') {
        return res.send({
            status: 0,
            msg: '您不是管理员，无法对用户进行删除'
        })
    };
    let { id } = req.params;
    let val = await Users.findOneAndDelete({ _id: id });
    if (val.avatar) {
        let avatar = path.join(__dirname, '../../../public' + val.avatar);
        fs.unlink(avatar, function(err) {
            if (err) {
                return console.log(err);
            }
        });
    }
    return res.send({
        status: 1,
        msg: '删除用户成功',
        val
    });
}