/**
 * 此模块提供商品信息
 */

var pool = require('./dbpool');
const qs = require('querystring');

module.exports = {
  /**
   * 接受页码page和每页显示的商品个数num
   * 返回需要展示的商品数据
   */
  product_list: function (req, res) {
    req.on('data', function (buf) {
      var obj = qs.parse(buf.toString());
      var startNum = (obj.page - 1) * obj.num;
      //这里需要转换为整数
      var num = parseInt(obj.num);
      
      pool.getConnection((err, conn) => {
        //num若为字符的会查不到结果
        conn.query("SELECT * FROM jd_product LIMIT ?,?",
          [startNum,num],
          function (err, result) {
            res.json(result);
            conn.release();
          }
        )
      })
    })
  },
  /**
   * 查询商品总数
   */
  product_count: function (req, res) {
    pool.getConnection((err, conn) => {
      conn.query('select count(*) productNum from jd_product',
        [],
        function (err, result) {
          res.json(result[0].productNum);
          conn.release();
        })
    })
  }
}