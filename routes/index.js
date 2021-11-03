const express = require('express');
const router = express.Router();
const mainController = require('../controller/mainController');
const passport = require('passport');


router.get('/', mainController.home);
router.get('/login', mainController.login);
router.get('/product', mainController.product);
router.get('/signup', mainController.signup);
router.get('/cart', passport.CheckAuth,mainController.cart);
router.get('/add-item', passport.CheckAuth,mainController.addItem); 
router.get('/delete-item',passport.CheckAuth, mainController.deleteItem); 
router.get('/decrease-quantity',passport.CheckAuth,mainController.decreaseQuantity); 
router.get('/increase-quantity',passport.CheckAuth,mainController.increaseQuantity); 
router.get('/profile',passport.CheckAuth, mainController.profile);
router.get('/logout', mainController.signout);
router.get('/bidding_page',mainController.bidding_page);
router.post('/bidraise',mainController.bidRaise);
router.get('/buy',passport.CheckAuth,mainController.BuyFromCart);

router.post('/register', mainController.create);

router.post('/session', passport.authenticate(
    'local',
    { failureRedirect: '/login' }
), mainController.createSession);

router.get('/auth/google',passport.authenticate('google',{scope:['profile','email']}),mainController.createSession);
router.get('/callback',passport.authenticate('google',{failureRedirect:'/login'}),mainController.createSession)

module.exports = router;