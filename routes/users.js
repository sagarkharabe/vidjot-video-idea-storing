const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
var passport = require('passport');
const express = require('express');
const router = express.Router();
require('../models/index');
const User = mongoose.model('Users');

router.get('/login', (req, res) => {
    res.render('users/login')
})
router.get('/register', (req, res) => {
    res.render('users/register')
})

router.post('/register', (req, res) => {
    let errors = [];
    if (req.body.password.length != req.body.password2.length) {
        errors.push({
            text: "Password does not matches"
        })
    } else if (req.body.password != req.body.password2) {
        errors.push({
            text: "Password does not matches"
        })
    }
    if (errors.length > 0) {
        console.log(errors)
        res.render('users/register', {
            errors: errors,
            name: req.body.name,
            email: req.body.email
        })
    } else {
        User.findOne({
                email: req.body.email
            })
            .then(user => {
                if (user) {
                    req.flash('error_msg', "Email already registered")
                    res.redirect('/users/register');
                } else {
                    const newUser = {
                        name: req.body.name,
                        email: req.body.email,
                        password: req.body.password
                    }
                    bcrypt.genSalt(10, function (err, salt) {
                        bcrypt.hash(newUser.password, salt, function (err, hash) {
                            if (err) throw err;
                            newUser.password = hash;
                            new User(newUser)
                                .save()
                                .then(user => {
                                    req.flash('success_msg', "Congratulation, You are registered")
                                    res.redirect('/users/login')
                                })
                                .catch(err => {
                                    console.log(err)
                                })
                        });
                    });

                }
            })
    }

})
module.exports = router;