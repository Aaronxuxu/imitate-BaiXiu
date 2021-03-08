const { Slides } = require('../../../model/webdesign');
module.exports = async(req, res) => {
    let slides = await Slides.find();
    return res.send({
        status: 1,
        slides
    })
}