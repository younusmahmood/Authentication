const User = require('../models/user');
const jwt = require('jwt-simple');
const config = require('../config');

function tokenForUser(user) {
  const timestamp = new Date().getTime();
  return jwt.encode({ sub: user.id, iat: timestamp }, config.secret);
}


exports.signin = function(req, res, next) {
  res.send({ token: tokenForUser(req.user)})
}

exports.signup = function(req, res, next) {
  const email = req.body.email;
  const password = req.body.password;

  if(!email || !password) {
    return res.status(422).send({ error: 'You must provide an email and password' });
  }

  // 1. See if user with given email exists
  User.findOne({ email: email }, function(err, existingUser){
    if (err) { return next(err); } // If the search itself threw an error, not the user

    // 2. If a user with emial does exist, return an error
    if(existingUser) {
      return res.status(422).send({ error: 'Email is in use' });
    }

    // 3. If a user with email does not exist, create and save user record
    const user = new User({
      email: email,
      password: password
    });

    user.save(function(err){ 
      if (err) { return next(err); }
    });

    // 4. Respond to request indication the user was created
    res.json({ token: tokenForUser(user) });
  });
}
