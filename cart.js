/**
 * 此模块用于提供购物车功能的函数
 */

var pool = require('./dbpool');
const qs = require('querystring');

module.exports = {
  /**
   * 接受用户uid和商品pid
   * 将商品添加到用户的购物车数据库中
   */
  add_cart: function (req, res) {
    req.on('data', function (result) {
      var obj = qs.parse(result.toString());

      var uid = parseInt(obj.uid),
        pid = parseInt(obj.pid);

      //首先要检查用户购物车中是否有此商品
      pool.getConnection((err, conn) => {
        conn.query('select count from jd_cart where uid = ? and productid=?',
          [uid, pid],
          (err, results) => {
            //如果有此商品
            if (results.length > 0) {
              var count = results[0].count;
              conn.query('update jd_cart set count=? where uid=? and productid = ?',
                [count+1, uid, pid],
                (err, results) => {
                  if (results.affectedRows == 1) {
                    var output = {
                      code: 1,
                      msg: '增加成功',
                      count: count+1
                    }
                    res.json(output);
                    conn.release();
                  }
                })
            } else {
              //如果没有此商品
              conn.query('insert into jd_cart values(null,?,?,?)',
                [uid, pid, 1],
                (err, results) => {
                  if (results.affectedRows == 1) {
                    var output = {
                      code: 1,
                      msg: '增加成功',
                      count: 1
                    }
                    res.json(output);
                    conn.release();
                  }
                })
            }
          })
      })

    })
  }
}