/**
 * 整个项目的主模块文件
 * 负责创建Web服务器对象，监听指定端口
 * 并向客户端提供静态资源+动态资源服务器
 */

 const http = require('http');
 const express = require('express');
 var user = require('./user');

 var app = express();
 http.createServer(app).listen(8080);
 //向客户端提供静态资源的响应
 app.use(express.static('public'));

 //向客户端提供动态资源的响应
 app.post('/user/register',user.register);