const express = require('express');
const router = express.Router();
const mainController = require('../controller/mainController');
const passport = require('passport');


router.get('/', mainController.home);
router.get('/login', mainController.login);
router.get('/product', mainController.product);
router.get('/signup', mainController.signup);
router.get('/cart', mainController.cart);
router.get('/add-item', mainController.addItem); 
router.get('/delete-item', mainController.deleteItem); 
router.get('/profile', mainController.profile);
router.get('/logout', mainController.signout);

router.post('/register', mainController.create);

router.post('/session', passport.authenticate(
    'local',
    { failureRedirect: '/login' }
), mainController.createSession);
module.exports = router;