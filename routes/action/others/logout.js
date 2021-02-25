module.exports = async(req, res) => {
    req.session.destroy(function(e) {
        req.app.locals.uname = ''
        req.app.locals.url = ''
        res.send({
            status: 1,
            msg: '账号退出成功'
        });
    })
}