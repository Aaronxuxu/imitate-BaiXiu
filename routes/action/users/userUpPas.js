const formidable = require('formidable');
const bcrypt = require('bcrypt');
const Users = require('../../../model/userInfo');
module.exports = async(req, res) => {
    let { uid } = req.session;
    let form = new formidable.IncomingForm();
    form.parse(req, async(err, field, file) => {
        let { oldPwd, newPwd } = field;
        let val = await Users.findById(uid);
        let result = await bcrypt.compare(oldPwd, val.password);
        if (!result) {
            return res.send({
                msg: '密码不正确，无法修改密码',
                status: 0
            });
        };
        let str = bcrypt.genSaltSync(6);
        newPwd = await bcrypt.hash(newPwd, str);
        await Users.findByIdAndUpdate(uid, { password: newPwd });

        res.send({
            msg: '修改密码成功',
            status: 1
        })
    });
}