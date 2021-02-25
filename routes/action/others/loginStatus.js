module.exports = (req, res) => {
    let { isLogin, uid } = req.session;
    let { href } = req.query;
    if (!isLogin) {
        req.app.locals.url = href;
        res.send({
            status: 0,
            msg: '您好未登录，正在前往登陆页面！',
        });
    } else {
        res.send({
            status: 1,
            msg: '登陆中'
        })
    }
}