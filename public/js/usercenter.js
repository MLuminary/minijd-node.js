(function () {
  $('#header').load('header.html',function(){
    logincheck();
    $('.firstPage').click(function(){
      window.location.href = "productlist.html"
    })
    $('#settle_up').click(function () {
      window.location.href = "shoppingcart.html";
    })
  });
  $('#footer').load('footer.html');
  
})();