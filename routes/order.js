const express = require('express');
const router = express.Router();

const {create} = require('../controllers/order');
const {decreaseQuantity} = require('../controllers/product');
const {requireSignin, isAuth} = require('../controllers/auth');
const {userById, addOrderToUserHistory} = require('../controllers/user');

router.post(
  '/order/create/:userId',
  requireSignin,
  isAuth,
  addOrderToUserHistory,
  decreaseQuantity,
  create
);

router.param('userId', userById);

module.exports = router;
