const { Posts } = require('../../../model/articleInfo');
module.exports = async(req, res) => {
    let val = await Posts.find({ state: 1 }).populate([{ path: 'auth' }, { path: 'category' }]);
    let random = []
    for (let i = 0; i < 5; i++) {
        let num = Math.floor(Math.random() * val.length);
        random[i] = val[num];
    }
    console.log(random);
    res.send(random);
}