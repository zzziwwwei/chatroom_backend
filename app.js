
const express = require('express');
const multer = require("multer");
const app = express();
app.use(express.urlencoded({ extended: true })); 
app.use(express.json());
app.use(multer().none()); 
app.set('views', './views');
app.set('view engine', 'ejs')
app.use('/static', express.static(__dirname + '/public'));
const indexRouter = require('./routers/index');
app.use('/',indexRouter)
const apiRouter = require('./routers/api');
app.use('/api',apiRouter)
const authRouter = require('./routers/authRouter');
app.use('/api/auth',authRouter)
const axios = require("axios");



const port = 3000;
app.listen(port, () => {
  console.log(port)
})
