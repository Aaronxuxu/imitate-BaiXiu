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
    id = id.split('-');
    let uArr = []
    for (const key in id) {
        uArr[key] = await Users.findOneAndDelete({ _id: id[key] })
    }
    for (const key in uArr) {
        if (uArr[key].avatar) {
            let avatar = path.join(__dirname, '../../../public' + uArr[key].avatar);
            fs.unlink(avatar, function(err) {
                if (err) {
                    console.log(err);
                }
            })
        }
    }

    return res.send({
        status: 1,
        msg: '删除用户成功',
        val: uArr
    });
}