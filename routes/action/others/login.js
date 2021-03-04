const Users = require('../../../model/userInfo');
const bcrypt = require('bcrypt');
module.exports = async(req, res) => {
    let { email, password } = req.body;
    let acc = await Users.findOne({ email });
    let url = req.app.locals.url;
    if (!acc) {
        return res.send({
            'status': '-1',
            'msg': '账号密码错误',
        });
    };

    let result = await bcrypt.compare(password, acc.password);
    if (!result) {
        return res.send({
            'status': '-1',
            'msg': '账号密码错误',
        });
    };

    req.session.uemail = acc.email;
    req.session.isLogin = true;
    req.session.uname = acc.nickName;
    req.session.uid = acc._id;
    req.session.urole = acc.role;

    req.app.locals.uname = acc.nickName;

    return res.send({
        status: '1',
        msg: '账号密码正确',
        url,
    });
}