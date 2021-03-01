const Users = require('../../../model/userInfo');
module.exports = async(req, res) => {
    let { id } = req.query;
    let { email } = req.params;
    let val = await Users.findOne({ email });
    if (val && val._id != id) {
        return res.send({
            msg: '账号已经存在',
            status: 0
        });
    };
    return res.send({
        status: 1
    });
}