const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const {createPool} = require('mysql');
const multer = require("multer");
const app = express();
app.use(express.urlencoded({ extended: true })); 
app.use(express.json());
app.use(multer().none()); 


const databasePool = createPool({
  host:process.env.MYSQL_HOST,
  user:process.env.MYSQL_ROOT,
  password:process.env.MYSQL_PASSWORD,
  database:process.env.MYSQL_DATEBASE
})





const port = 3000;
app.set('views', './views');
app.set('view engine', 'ejs')
app.use('/static', express.static(__dirname + '/public'));




const { WebSocketServer } = require('ws');
const wss = new WebSocketServer({ port: 8080 });
wss.on('connection', function connection(ws) {
  ws.on('message', data => {
    console.log(data.toString())
    //取得所有連接中的 client
    let clients = wss.clients
    //做迴圈，發送訊息至每個 client
    clients.forEach(client => {
        client.send(data.toString())
    })
})
});

app.get('/', (req, res) => {
  res.render('index', {

  })
})
app.get('/get', async function (req, res) {
  console.log("get")
  databasePool.query(`SELECT username FROM users;`,(err,res)=>{
    return console.log(res);
  })
  res.render('index')
});

app.post('/post', async function (req, res) {
  console.log("post");
  let username = req.body.username
  let password = req.body.password
  databasePool.query(`INSERT INTO users (username,password)
  VALUES (?,?); `,[username, password]);
  res.render('index');
});
app.listen(port, () => {
  console.log(port)
})
