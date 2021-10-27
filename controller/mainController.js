const User = require('../model/user');
module.exports.home = (req, res) => {
    return res.render('home');
}

module.exports.login = (req, res) => {
    return res.render('login_page');
}

module.exports.product = (req, res) => {
    return res.render('product');
}

module.exports.signup = (req, res) => {

    if (req.isAuthenticated())
        return res.redirect('/');

    return res.render('signup_page');
}

module.exports.cart = (req,res) => {
    return res.render('cart');
}

// for registeration
module.exports.create = async (req, res) => {

    try {

        let user = await User.findOne({ email: req.body.email });

        if (!user) {
            await User.create({ email: req.body.email, password: req.body.password, name: req.body.name });

            return res.redirect('/login');
        }
        else {
            return res.redirect('back');
        }
    } catch (error) {
        console.log("Error", error);
    }
}


// for loggin in / creating the session

module.exports.createSession = (req, res) => {
    console.log(`logged in as ${req.user.name}`);
    return res.redirect('/');
}