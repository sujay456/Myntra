module.exports.home = (req, res) => {
    return res.render('home');
}

module.exports.login = (req, res) => {
    return res.render('login_page');
}

module.exports.product = (req, res) => {
    return res.render('product');
}