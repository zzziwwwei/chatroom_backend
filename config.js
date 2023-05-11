const dotenv = require('dotenv');
dotenv.config();
const {createPool} = require('mysql');
const databasePool = createPool({
    host:process.env.MYSQL_HOST,
    user:process.env.MYSQL_ROOT,
    password:process.env.MYSQL_PASSWORD,
    database:process.env.MYSQL_DATEBASE
  })

  databasePool.getConnection((err,connection)=> {
    if(err)
    throw err;
    console.log('Database connected successfully');
    connection.release();
  });
  
  module.exports = databasePool;