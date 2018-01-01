/**
 * 此模块为用户模块，为主模块提供登录和注册功能
 */

const pool = require('./dbpool');
const qs = require('querystring');

module.exports = {
  /**
   * 接受客户端POST提交的请求数据：uname、upwd
   * 保存入数据库，向客户端返回JSON字符串
   * 形如
   * {"code":1,"msg":"注册成功","uid":31}
   */
  register: (req, res) => {
    req.on('data', (buf) => {
      var obj = qs.parse(buf.toString());
      pool.getConnection((err, conn) => {
        conn.query(
          'insert into t_login values(NULL,?,?)', [obj.uname, obj.upwd], (err, results) => {
            if (results.affectedRows == 1) {
              var output = {
                code: 1,
                msg: '注册成功',
                uid: results.insertId
              }
              res.json(output);
              conn.release();
            }
          }
        )
      })
    })
  },
  /**
   * 接受客户端发送的upwd,uname
   * 从数据库拉出数据判断并发送给客户端判断结果
   * 类似 {"code":1,"msg":"匹配正确","uid":}
   */
  login: (req, res) => {
    req.on('data', (buf) => {
      var obj = qs.parse(buf.toString());
      pool.getConnection((err, conn) => {
        conn.query('select id from t_login where uname = ? and upwd = ?', [obj.uname,obj.upwd],(err,results)=>{
          if(results.length>0){
            // 代表查到匹配的数据
            var output = {
              code : 1,
              msg : '匹配正确',
              uid : results[0].id
            }
          }else{
            var output = {
              code : 2,
              msg : '匹配失败'
            }
          }
          res.json(output);
          conn.release();
        })
      });

    })
  }
}