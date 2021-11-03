const User = require('../model/user');
const Product = require('../model/product');
const Cart = require('../model/cart');
const Bidding =require('../model/bidding');
module.exports.home = async (req, res) => {

    try {
        
        let products = [{ name: "Red Printed T-Shirt", rating: 4, desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua', price: 999, image: 'product-1.jpg', gallery: ['gallery-1.jpg', 'gallery-2.jpg'] },
        { name: "HRX Black Shoes", rating: 3.5, desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua', price: 1999, image: 'product-2.jpg', gallery: ['product-10.jpg', 'product-2.jpg']},
        { name: "Comfortable Gray Pant", rating: 4.5, desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua', price: 4999, image: 'product-3.jpg', gallery: ['product-3.jpg', 'product-12.jpg']},
        { name: "Plain Navy Blue T-Shirt", rating: 4.0, desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua', price: 1499, image: 'product-4.jpg', gallery: ['product-4.jpg', 'product-6.jpg'] }
        ]
        productDB = await Product.find({})

        if (!productDB.length) {
            for (let x of products) {
                await Product.create({ name: x['name'], price: x['price'], Desc: x['desc'], rating: x['rating'], image: x['image'], gallery: x['gallery'] })
            }
            productDB=await Product.find({})
            for(let p of productDB)
            {
                await Bidding.create({product:p.id,bidding_time:3,base_bid:p.price/10,curr_max_bid:p.price/10})
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
    // console.log()
    cartDB = await Cart.find({user:req.user.id,bought:false}); 
    
    return res.render('cart',{cart:cartDB}); 
}

// for registeration
module.exports.create = async (req, res) => {

    try {

        let user = await User.findOne({ email: req.body.email });

        if (!user) {
            await User.create({ email: req.body.email, password: req.body.password, name: req.body.name,points:0 });

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

module.exports.profile = async (req,res) => {

    pastOrders=await Cart.find({user:req.user.id,bought:true})
    // console.log(user)
    res.render('profile',{
        past:pastOrders
    });
}

// for adding items into cart
module.exports.addItem = async (req,res) => {
    
    try{
        // await Cart.deleteMany({productId:req.query.id});
        let productToAdd = await Product.findById(req.query.id); 
        await Cart.create({ 
            productId: productToAdd.id,
            name: productToAdd.name, 
            price: productToAdd.price, 
            image: productToAdd.image,
            quantity: 1,
            bought:false,
            user:req.user._id 
        });
        
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

module.exports.increaseQuantity = async (req,res) => {
    // console.log("Hello!");
    let productToUpdate = await Cart.findById(req.query.id); 
    Cart.findByIdAndUpdate(req.query.id, {quantity:productToUpdate.quantity+1} ,function(err,updated){
        if(err){
            console.log(err);
        }
    });
    return res.redirect('/cart');
}

module.exports.decreaseQuantity = async (req,res) => {
    
    let productToUpdate = await Cart.findById(req.query.id); 
    if(productToUpdate.quantity == 1){
        Cart.findByIdAndRemove(req.query.id, function(err,deleted){
            if(err){
                console.log(err);
            }
        }); 
    }else{
        Cart.findByIdAndUpdate(req.query.id, {quantity:productToUpdate.quantity-1} ,function(err,updated){
            if(err){
                console.log(err);
            }
        });
    }
    return res.redirect('/cart');
}

module.exports.BuyFromCart=async (req,res)=>{
    
    try {
        let products=await Cart.find({})

    let tot_price=0.0

    for(let x of products)
    {
        tot_price+=(x['price']*x['quantity']);
    }

    // console.log(tot_price);

    let coins_earned=parseInt(tot_price*0.05)

    let user=await User.findById(req.user.id);

    user.points+=coins_earned;

    // after buying the products from the cart remove all the elements from the cart
    let cart=await Cart.find({user:req.user.id,bought:false})
    // console.log(cart)
    if(cart)
    {
        for(c of cart){
            // console.log(c._id);
            c.bought=true;
            user.products.push(c.id)
            c.save();
        }
        // console.log(cart)
        // cart.save();
        
    }
    user.save();
    
    return res.redirect('back');
    } catch (error) {
        console.log("Error in buying the products",error);
    }
    
}

module.exports.bidding_page=async (req,res)=>{

    try {
        
        bid_product=await Bidding.findOne({product:req.query.id}).populate('product');
        // console.log(bid_product);
        return res.render('bidding_page',{bp:bid_product})
    } catch (error) {
        
        console.log("Error in rendering bidding page");
    }
}