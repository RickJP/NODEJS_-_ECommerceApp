const User = require('../models/user');
const jwt = require('jsonwebtoken');
const expressjwt = require('express-jwt');
const { errorHandler } = require('../helpers/dbErrorHandler');


exports.signup = (req, res) => {
  console.log('req.body', req.body);
  const user = new User(req.body);
  user.save((err, user) => {
    if (err) {
      return res.json({
        err: errorHandler(err)
      });
    }
    user.salt = undefined;
    user.hashed_password = undefined;
    res.json({
      user
    });
  });
};

exports.signin = (req, res) => {
  // find the user by Email
  const { email, password } = req.body;
  User.findOne({ email }, (err, user) => {
    if (err || !user) {
      return res.status(400).json({ 
        err: "User with that email does not exist. Please sign up!"
      });
    }
    // if user is found, make sure email & password match
    // create auth method in user model
    if (!user.authenticate(password)) {
      return res.status(401).json({
        error: "Email and password do not match"
      });
    }

    // generate signed token with user id & secret
    const token = jwt.sign({ _id: user._id}, process.env.JWT_SECRET);

    // persist token as 't' in cookie with expiry date
    res.cookie('t', token, { expire: new Date() + 9999});

    // return response with user & token to frontend client
    const {_id, name, email, role } = user;
    return res.json({token, user: {_id, email, name, role}});
  }); 
};


exports.signout = (req, res) => {
  res.clearCookie('t');
  res.json({ message: "Signout success"});
};