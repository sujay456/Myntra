const User = require('../model/user');
const Product = require('../model/product');
const Cart = require('../model/cart');
const Bidding =require('../model/bidding');
module.exports.home = async (req, res) => {

    try {
        
        let products = [{ name: "Red Printed T-Shirt", rating: 4, desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua', price: 999, image: 'product-1.jpg', gallery: ['gallery-1.jpg', 'gallery-2.jpg'] },
        { name: "HRX Black Shoes", rating: 3.5, desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua', price: 1999, image: 'product-2.jpg', gallery: ['product-10.jpg', 'product-2.jpg']},
        { name: "Comfortable Gray Pant", rating: 4.5, desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua', price: 4999, image: 'product-3.jpg', gallery: ['product-3.jpg', 'product-12.jpg']},
        { name: "Plain Navy Blue T-Shirt", rating: 4.0, desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua', price: 1499, image: 'product-4.jpg', gallery: ['product-4.jpg', 'product-6.jpg'] },
        { name: "Rainbow Shoes", rating: 4.0, desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua', price: 2000, image: 'product-101.jpg', gallery: ['product-101.jpg', 'product-102.jpg'] },
        { name: "Strayhorn SP", rating: 4.0, desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua', price: 2500, image: 'product-102.jpg', gallery: ['product-102.jpg', 'product-104.jpg'] },
        { name: "Bradley Mid", rating: 4.0, desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua', price: 3500, image: 'product-103.jpg', gallery: ['product-103.jpg', 'product-104.jpg'] },
        { name: "Crop Top", rating: 4.0, desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua', price: 1500, image: 'product-104.jpg', gallery: ['product-104.jpg', 'single-product.jpg'] },
        { name: "Nike watch", rating: 4.0, desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua', price: 1500, image: 'product-8.jpg', gallery: ['product-8.jpg', 'product-9.jpg'] }
        
        ]
        
        productDB = await Product.find({})

        if (!productDB.length) {
            for (let x of products) {
                await Product.create({ name: x['name'], price: x['price'], Desc: x['desc'], rating: x['rating'], image: x['image'], gallery: x['gallery'] , })
            }
            productDB=await Product.find({})
            let i=6
            for(let i=6;i<=8;++i)
            {
                await Bidding.create({product:productDB[i].id,bidding_time:3,base_bid:productDB[i].price/10,curr_max_bid:parseInt( productDB[i].price/10),start_time:"Tue Nov 16 2021 12:05:00",end_time:"Tue Nov 17 2021 01:50:00",closed:false})
            }
        }
        bproducts=await Bidding.find({}).populate('product');
        return res.render('home2', { products: productDB,bproducts:bproducts });
    } catch (error) {
        console.log(error);

    }   

}
module.exports.shop=async (req,res)=>{

    try {
        let products=await Product.find({});

        return res.render('shop',{
            products:products
        })

    } catch (error) {
        
        console.log("error in shop rendering",error);
    }
}

module.exports.login = (req, res) => {
    if (req.isAuthenticated())
        return res.redirect('/');
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
    
    return res.render('cart2',{cart:cartDB}); 
}
module.exports.confirmation=async (req,res)=>{
    try {
        // console.log("here");
        return res.render('confirmation');
    } catch (error) {
        console.log("Error in confirmation",error);
    }
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

module.exports.checkout=async (req,res)=>{

    try {
        cartP=await Cart.find({user:req.user.id,bought:false})
        return res.render('checkout',{
            cartP:cartP
        });

    } catch (error) {
        console.log("Error in rendering the checkout page",error);
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
        
    
        cart=await Cart.findOne({productId:productToAdd.id,user:req.user.id,bought:false})
        if(cart)
        {
            cart.quantity+=1;
            cart.save();
        }
        else
        {
            await Cart.create({ 
                productId: productToAdd.id,
                name: productToAdd.name, 
                price: productToAdd.price, 
                image: productToAdd.image,
                quantity: 1,
                bought:false,
                user:req.user._id 
            });
            
        }
        
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
        let products=await Cart.find({user:req.user.id,bought:false})

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
    
    return res.redirect('/confirm');
    } catch (error) {
        console.log("Error in buying the products",error);
    }
    
}

module.exports.bidding_page=async (req,res)=>{

    try {
        // console.log(req);
        bid_product=await Bidding.findById(req.query.id).populate('product');
        //console.log("Bid Product :",bid_product);
        let f=new Date(bid_product.end_time).getTime()
        let c=new Date().getTime();
        let gap=f-c;
        //console.log(gap)
        if(gap<=0)
        {
            bid_product.closed=true;
        }else{
            bid_product.closed=false;
        }
       
        bid_product.save();
        // check whether bid is over or not
        // console.log(bid_product);
        return res.render('bidding_page2',{bp:bid_product})
    } catch (error) {
        
        console.log("Error in rendering bidding page",error);
    }
}

module.exports.bidRaise=async (req,res)=>{

    console.log(req.body.value)
    let bidP=await Bidding.findById(req.query.bidId)
    // console.log(bidP);
    let user=await User.findById(req.user.id);
    if(bidP.curr_max_bid>=req.body.value)
    {
        // i am sorry babu
        return res.status(200).json({
            bid:false,
            message:"Your bid Value is less than the current max value"
        })
    }
    else if(user.points<req.body.value)
    {
        return res.status(200).json({
            bid:false,
            message:"You don't have enough coins"
        })
    }
    else
    {
        bidP.curr_max_bid=req.body.value;
        bidP.curr_winning_user=req.user.id;

        bidP.save();
        user.save();
    }


    return res.status(200).json({
        message:"Successfully placed the bid",
        rem_point:user.points,
        bid:true
        
    })
}

module.exports.bidcloser=async (req,res)=>{
    let bid=await Bidding.findById(req.query.id);



    

    if(bid)
    {

        bid.closed=true;
        bid.save();

        if(bid.curr_winning_user == req.user.id)
        {
            let user=await User.findById(bid.curr_winning_user);

            user.points-=bid.curr_max_bid;
            user.save();
            return res.status(200).json({
                winner:true,
                message:"Bid Over",
                wonUser:user.name,
                biddingPoints:bid.curr_max_bid
            })
        }
        else
        {
            return res.status(200).json({
                winner:false
            })
        }
       

    }
    else
    {
        return res.status(404).json({
            message:"Bid not Found"
        })
    }
}

module.exports.winner=async (req,res)=>{

    cartP=await Cart.find({user:req.user.id,bought:false});

    if(req.query.id=='*')
    {
        return res.render('winner',{
            winnerName:"No one",
            cartP:cartP
        })
    }
    console.log(req.query.id);
    let bidWinner=await Bidding.findById(req.query.id).populate('curr_winning_user');


    return res.render('winner',{
        winnerName:bidWinner.curr_winning_user,
        cartP:cartP
    })
}