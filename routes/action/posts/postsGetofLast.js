const { Posts } = require('../../../model/articleInfo');
module.exports = async(req, res) => {
    let val = await Posts.find().sort({ createAt: -1 });
    res.send(val);
}