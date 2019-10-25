const express = require('express');
const router = express.Router();

const { create } = require('../controllers/order');
const {requireSignin, isAuth} = require('../controllers/auth');
const { userById, addOrderToUserHistory } = require('../controllers/user');

router.post('/order/create/:userId', requireSignin, isAuth, addOrderToUserHistory, create)

router.param('userId', userById);

module.exports = router;