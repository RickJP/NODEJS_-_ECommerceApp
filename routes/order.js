const express = require('express');
const router = express.Router();

const {create, categoryById, read, update, remove, list} = require('../controllers/category');
const {requireSignin, isAuth, isAdmin} = require('../controllers/auth');
const { userById } = require('../controllers/user');




