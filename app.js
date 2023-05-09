const express = require('express');
const app = express();
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
  // res.send('Hello World!')
  res.render('index', {

  })
})
app.post('/test', function (req, res) {
  res.render('index')
});
app.listen(port, () => {
  console.log(port)
})
