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
  add_cart: (req, res) => {
    req.on('data', (result) => {
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
                [count + 1, uid, pid],
                (err, results) => {
                  if (results.affectedRows == 1) {
                    var output = {
                      code: 1,
                      msg: '增加成功',
                      count: count + 1
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
  },
  /**
   * 接受用户编号uid
   * 返回该用户购物车中的商品
   */
  cart_list: (req, res) => {
    req.on('data', (results) => {
      var uid = qs.parse(results.toString()).uid;
      pool.getConnection((err, conn) => {
        conn.query('select c.productid,p.pname,p.price,p.pic,c.count from jd_product p,jd_cart c where c.productid = p.pid and c.uid = ?',
          [uid],
          (err, results) => {
            res.json(results);
            conn.release();
          })
      })
    })
  },
  /**
   * 接受用户编号uid和商品编号pid
   * 将其在购物车表中删除
   */
  del_cart: (req, res) => {
    req.on('data', (results) => {
      var obj = qs.parse(results.toString());
      var uid = obj.uid,
        pid = obj.pid;
      pool.getConnection((err, conn) => {
        conn.query('delete from jd_cart where uid = ? and productid = ?',
          [uid, pid],
          (err, results) => {
            if (results.affectedRows == 1) {
              var output = {
                code: 1,
                msg: '删除成功'
              }
            } else {
              var output = {
                code: -1,
                msg: '删除失败'
              }
            }
            res.json(output);
            conn.release();
          })
      })
    })
  },
  update_cart: (req, res) => {
    req.on('data', (results) => {
      var obj = qs.parse(results.toString());

      var count = obj.count,
        uid = obj.uid,
        pid = obj.pid;

        pool.getConnection((err,conn)=>{
          conn.query('update jd_cart set count=count+? where uid = ? and productid = ?',
          [count,uid,pid],
          (err,results)=>{
            conn.release();
          })
        })
    })
  }
}