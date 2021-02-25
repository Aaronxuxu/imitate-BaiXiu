const Users = require('../../../model/userInfo');
module.exports = async(req, res) => {
    let val = await Users.find({}, { password: 0 });
    if (val) {
        return res.send({ status: 1, val });
    } else {
        return res.send({
            status: 0,
            msg: '并未查询到用户信息'
        })
    }
}