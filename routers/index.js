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
router.get('/get', async function (req, res) {
    console.log("get")
    query(`SELECT username FROM users;`, (err, res) => {
        return console.log(res);
    })
    res.render('index')
});

router.post('/post', async function (req, res) {
    try {
        let username = req.body.username
        let password = await bcrypt.hash(req.body.password,5);
        const row =  await query(`INSERT INTO users (username,password)
        VALUES (?,?); `, [username, password]);
        console.log(await bcrypt.compare(req.body.password,password))
        res.render('index')
    }
    catch (error) {
        console.log(error)
        res.render('index')
    }
});


module.exports = router;