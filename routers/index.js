var db= require('../config.js');
const express = require("express");
const router = express.Router();
const bcrypt = require('bcrypt');
const util = require('util');
const query = util.promisify(db.query).bind(db);
router.get('/', (req, res) => {
    res.render('index', {
    })
})


router.get('/game', (req, res) => {
    res.render('game', {
    })
})


router.get('/player', (req, res) => {
    res.render('player', {
    })
})

module.exports = router;