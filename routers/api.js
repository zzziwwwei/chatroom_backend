var db = require('../config.js');
const express = require("express");
const bcrypt = require('bcrypt');
const util = require('util');
const router = express.Router();
const query = util.promisify(db.query).bind(db);
const SECRET = process.env.SECRET
const jwt = require('jsonwebtoken');


async function verifyJWT(token) {
    const decoded = jwt.verify(token, SECRET);
    return decoded;
}

router.get('/user/take_garage', async function (req, res) {
    try {
        let token = req.body.token   
        let user_id = await verifyJWT(token)
        let row = await query(`SELECT user_car,user_money FROM users_garage where user_id=?;`, (user_id))
        res.send(row)
        res.end()
    }
    catch (error) {
        console.log(error)
    }
});

router.post('/user/register', async function (req, res) {
    try {
        let username = req.body.username
        let password = await bcrypt.hash(req.body.password, 5);
        let row = await query(`INSERT INTO users (username,password)
        VALUES (?,?); `, [username, password]);
        console.log(await bcrypt.compare(req.body.password, password))
        res.render('index')
    }
    catch (error) {
        console.log(error)
    }
});



module.exports = router;