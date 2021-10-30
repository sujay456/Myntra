const User = require('../model/user');
const Product = require('../model/product');
const Cart = require('../model/cart');
module.exports.home = async (req, res) => {

    try {
        let products = [{ name: "Red Printed T-Shirt", rating: 4, desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua', price: 999, image: 'product-1.jpg', gallery: ['gallery-1.jpg', 'gallery-2.jpg'] },
        { name: "HRX Black Shoes", rating: 3.5, desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua', price: 1999, image: 'product-2.jpg', gallery: ['product-10.jpg', 'product-2.jpg'] },
        { name: "Comfortable Gray Pant", rating: 4.5, desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua', price: 4999, image: 'product-3.jpg', gallery: ['product-3.jpg', 'product-12.jpg'] },
        { name: "Plain Navy Blue T-Shirt", rating: 4.0, desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua', price: 1499, image: 'product-4.jpg', gallery: ['product-4.jpg', 'product-6.jpg'] }
        ]
        productDB = await Product.find({})

        if (!productDB.length) {
            for (let x of products) {
                await Product.create({ name: x['name'], price: x['price'], Desc: x['desc'], rating: x['rating'], image: x['image'], gallery: x['gallery'] })
            }
        }

        return res.render('home', { products: productDB });
    } catch (error) {
        console.log(error);

    }

}

module.exports.login = (req, res) => {

    return res.render('login_page');
}

module.exports.product = async (req, res) => {

    try {

        product = await Product.findById(req.query.id)

        return res.render('product', { product: product });

    } catch (error) {
        console.log("Error in product controller");
    }
}

module.exports.signup = (req, res) => {

    if (req.isAuthenticated())
        return res.redirect('/');

    return res.render('signup_page');
}

module.exports.cart = async (req, res) => {
    cartDB = await Cart.find({}); 
    return res.render('cart',{cart:cartDB}); 
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

module.exports.signout = (req, res) => {

    req.logout();
    res.clearCookie('myntra');
    console.log("Logged out");
    res.redirect('/login');
}

module.exports.profile = (req,res) => {
    res.render('profile');
}

// for adding items into cart
module.exports.addItem = async (req,res) => {
    
    try{
        await Cart.deleteMany({productId:req.query.id});
        let productToAdd = await Product.findById(req.query.id); 
        await Cart.create({ 
            productId: productToAdd._id,
            name: productToAdd.name, 
            price: productToAdd.price, 
            image: productToAdd.image,
            quantity: 1,
        });
        //cartDB = await Cart.find({}); 
        //console.log(cartDB);
        return res.redirect('/cart'); 
    }catch(error){
        console.log("Error in adding item to cart (mainController)");
        console.log(error);
    }

}

// for removing items from cart
module.exports.deleteItem = async (req,res) => {
    Cart.findByIdAndRemove(req.query.id, function(err,deleted){
        if(err){
            console.log(err);
        }
    }); 
    return res.redirect('/cart');
}
