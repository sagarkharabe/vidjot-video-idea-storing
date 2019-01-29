const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
require('../models/index');
const Idea = mongoose.model('Ideas');

router.get('/login', (req, res) => {
    res.render('users/login')
})
router.get('/register', (req, res) => {
    res.render('users/register')
})


module.exports = router;