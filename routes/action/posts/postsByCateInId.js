const pageination = require('mongoose-sex-page');
const { Posts } = require('../../../model/articleInfo');
module.exports = async(req, res) => {
    let { state } = req.query;
    let category = req.params.id;
    if (state == 'all') {
        delete state
    } else if (category == 'all') {
        delete category
    }
    let val = await Posts.find({ category, state });
    // let val;
    // if (Status == 'all' && id != 'all') {
    //     val = await Posts.find({
    //         category: id
    //     });
    // } else if (id == 'all' && Status != 'all') {
    //     val = await Posts.find({
    //         state: Status
    //     });
    // } else if (id == 'all' && Status == 'all') {
    //     val = await Posts.find();
    // } else {
    //     val = await Posts.find({
    //         category: id,
    //         state: Status
    //     });
    // }
    console.log(val);
};