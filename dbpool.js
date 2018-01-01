/**
 *  此模块用来创建连接的数据库
 *  向外提供pool对象模块
 */

 const mysql = require('mysql');

 var pool = mysql.createPool({
   host:'127.0.0.1',
   user:'root',
   password:'haoqin89127',
   database:'jd',
   port:3306,
   connectionLimit:9
 })

 module.exports = pool;