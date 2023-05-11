var db = require('../config.js');
const express = require("express");
const bcrypt = require('bcrypt');

const util = require('util');
const router = express.Router();
const query = util.promisify(db.query).bind(db);
router.get('/', async function (req, res) {
    try {
        const row =  await query(`SELECT username FROM users;`)
        res.send(row)
        res.end()
    }
    catch (error) {
        console.log(error)
    }
});

router.post('/register', async function (req, res) {
    try {
        let username = req.body.username
        let password = await bcrypt.hash(req.body.password, 10);
        const row =  await db.query(`INSERT INTO users (username,password)
        VALUES (,?,?); `, [username, password]);
    }
    catch (error) {
        console.log(error)
    }
});


module.exports = router;