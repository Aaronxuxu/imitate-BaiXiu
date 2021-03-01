const Users = require('../../../model/userInfo');
const formidable = require('formidable');
const path = require('path');
module.exports = async(req, res) => {
    let { id } = req.params;
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.uploadDir = path.join(__dirname, '../../../public/uploads');
    form.parse(req, async(err, field, file) => {
        let { email } = field;
        let hasEmail = await Users.findOne({ email });
        let UpUser = await Users.findById(id);
        if (hasEmail.email != UpUser.email && hasEmail) {
            return res.send({
                msg: '该账号已存在，无法修改',
                status: 0
            })
        }
        if (Object.keys(file).length != 0) {
            field.avatar = file.avatar.path.split('public')[1];
        }
        let val = await Users.findByIdAndUpdate(id, field, { new: true });
        return res.send({
            val,
            msg: '修改个人信息成功',
            status: 1
        });
    });
}