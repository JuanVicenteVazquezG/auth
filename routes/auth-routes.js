/* eslint-disable comma-dangle */
/* eslint-disable no-unused-vars */
/* eslint-disable linebreak-style */
const express = require('express');

const router = express.Router();

router.post('/', (req, res, next) => {
  const theUsername = req.body.username;
  const thePassword = req.body.password;
  if (theUsername === '' || thePassword === '') {
    res.render('auth/login', {
      errorMessage: 'Please enter both, username and password to sign up.'
    });
    return;
  }
  User.findOne({ username: theUsername })
    .then((user) => {
      if (!user) {
        res.render('auth/login', {
          errorMessage: 'The username doesn\'t exist.'
        });
        return;
      }
      if (bcrypt.compareSync(thePassword, user.password)) {
        // Save the login in the session!
        req.session.currentUser = user;
        res.redirect('/');
      } else {
        res.render('auth/login', {
          errorMessage: 'Incorrect password'
        });
      }
    })
    .catch((error) => {
      next(error);
    });
});

router.get('/logout', (req, res, next) => {
  req.session.destroy((err) => {
    // cannot access session here
    res.redirect('/login');
  });
});

module.exports = router;
