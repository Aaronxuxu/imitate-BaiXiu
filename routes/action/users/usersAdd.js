const Users = require('../../../model/userInfo');
const bcrypt = require('bcrypt');
const formidable = require('formidable');
const path = require('path');
module.exports = async(req, res) => {
    let form = new formidable.IncomingForm();
    form.uploadDir = path.join(__dirname, '../../../public/uploads');
    form.keepExtensions = true;
    form.parse(req, async(err, field, file) => {
        let ranStr = await bcrypt.genSalt(6);

        field.password = await bcrypt.hash(field.password, ranStr);

        if (Object.keys(file).length != 0) {
            field.avatar = file.avatar.path.split('public')[1];
        }
        let val = await Users.create(field);
        res.send({
            status: 2,
            msg: '创建成功',
            val
        });
    })

};