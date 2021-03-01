const Users = require('../../../model/userInfo');
module.exports = async(req, res) => {
    let val = await Users.findById(req.params.id, { password: 0 });
    if (!val) {
        return res.send({
            status: 0,
            msg: '抱歉，查无此账号（可能已经被删除）'
        })
    }
    return res.send({
        status: 1,
        msg: val
    })
}