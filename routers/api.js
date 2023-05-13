var db = require('../config.js');
const express = require("express");
const bcrypt = require('bcrypt');
const util = require('util');
const router = express.Router();
const query = util.promisify(db.query).bind(db);
const SECRET = process.env.SECRET
const jwt = require('jsonwebtoken');
const { create } = require('lodash');


async function verifyJWT(token) {
    const decoded = jwt.verify(token, SECRET);
    return decoded;
}

router.post('/user/selectCharacter', async function (req, res) {
    try {
        let token = req.body.token
        let user_id = await verifyJWT(token)
        let character_class = req.body.characterClass
        
        let row = await query(`SELECT character_id,character_name,character_level,character_class FROM characters where user_id=? AND character_class=?;`, [user_id,character_class]) 
        if (row==""){
            console.log("no character")
            res.send("no character")
            res.end()
        }
        else{
        console.log(row)
        res.send(row)
        res.end()
        }
    }
    catch (error) {
        console.log(error)
    }
});


router.post('/user/creatCharacter', async function (req, res) {
    try {
        let token = req.body.token
        let user_id = await verifyJWT(token)
        let character_name = req.body.characterName 
        let character_class = req.body.characterClass 
        let row = await query(`INSERT INTO characters (character_name,character_level,character_class,user_id)
        VALUES (?,?,?,?); `, [character_name, 0,character_class,user_id]);  
        res.send("create success")
        res.end() 
    }
    catch (error) {
        console.log(error)
    }
});







router.post('/user/register', async function (req, res) {
    try {
        let username = req.body.username
        console.log(username)
        let password = await bcrypt.hash(req.body.password, 5);
        let r = await query(`SELECT username FROM users WHERE username=?`, (username))
        if (r == "") {
            let row = await query(`INSERT INTO users (username,password)
        VALUES (?,?); `, [username, password]);
            res.send("200")
            console.log("註冊")
        }
        else {
            res.send("204")
            console.log("使用者重複")
        }
        //console.log(await bcrypt.compare(req.body.password, password))
    }
    catch (error) {
        console.log(error)
    }
});



module.exports = router;