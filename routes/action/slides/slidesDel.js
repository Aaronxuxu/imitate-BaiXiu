const { Slides } = require('../../../model/webdesign');
module.exports = async(req, res) => {
    let { id } = req.params;
    let { urole } = req.session;
    if (urole != 'admin') {
        return res.send({
            msg: '您没有删除轮播图的权限',
            status: 0
        })
    };
    let slides = await Slides.findOneAndDelete({ _id: id });
    return res.send({
        slides,
        status: 1,
    })
}