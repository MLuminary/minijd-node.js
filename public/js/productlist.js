(function () {
  $('#header').load('header.html', function () {
    logincheck();
    //跳转到购物车
    $('#settle_up').click(function () {
      window.location.href = "shoppingcart.html";
    })
  });
  $('#footer').load('footer.html');


   //加载商品
    //一页需要加载的商品的个数
    var num = 8;

    loadProduct(1);
    /**
     * 
     * @param {*第几页} page 
     */
    function loadProduct(page) {
        //加载商品
        $.ajax({
            type: 'post',
            url: '/product/product_list',
            data: { page: page, num: num },
            success: function (data) {
              console.log(data);
                var html = "";
                for (var i = 0; i < data.length; i++) {
                    var obj = data[i];
                    var imgSrc = obj.pic,
                        Price = obj.price,
                        des = obj.pname,
                        pid = obj.pid;
                    html +=
                        `<li>
                            <a href=""><img src="${imgSrc}" alt=""/></a>
                            <p>￥${Price}</p>
                            <h1><a href="">${des}</a></h1>
                            <div>
                                <a href="" class="contrast"><i></i>对比</a>
                                <a href="" class="p-operate"><i></i>关注</a>
                                <a href="${pid}" class="addcart"><i></i>加入购物车</a>
                            </div>
                    </li>`
                }
                $('#plist ul').html(html);
            },
            error: function (error) {
                // console.log(error);
                alert("请检查网络");
            }
        })
       
    }
    //加载页码
    loadPageNum();
    function loadPageNum() {
         //加载a标签个数
         $.ajax({
            type: 'get',
            url: '/product/product_count',
            success: function (data) {
                var pageNum = Math.ceil(data / num);
                var html = `<li  class="active"><a href="#">1</a></li>`;
                if (pageNum > 1) {
                    for (var i = 2; i <= pageNum; i++) {
                        html += `<li><a href="#">${i}</a></li>`;
                    }
                }
                $('#plist .pager').html(html);
            },
            error: function (error) {
                alert("请检查网络");
            }
        })
    }


    // //点击添加到购物车
    // //利用事件委托
    // $("#plist").on('click', 'a.addcart', function (e) {
    //     //取消默认事件
    //     e.preventDefault();
    //     // 获得pid
    //     var pid = $(this).attr('href');
    //     $.ajax({
    //         type: 'post',
    //         url: '/cart/add_cart',
    //         data: { uid: sessionStorage['loginUid'], pid: pid },
    //         success: function (data) {
    //             if (data > 0) {
    //                 alert("添加成功!该商品己购买" + data);
    //             } else {
    //                 alert("添加失败");
    //             }
    //         },
    //         error: function (error) {
    //             alert("请检查网络");
    //         }
    //     })
    // })

    //分页查询
    $('#plist .pager').on('click', 'a', function (e) {
        e.preventDefault();
        var page = $(this).text();
        loadProduct(page);
        $(this).parent().addClass('active').siblings().removeClass('active');
    })



})();