(function () {
  $('#sub').click(function () {
    var uname = $('#uname').val(),
      upwd = $('#upwd').val();

    $.ajax({
      type: 'post',
      url: '/user/login',
      data : { uname: uname, upwd: upwd },
      success: function (data) {
        if(data.code==1){
          //存储登录的姓名和uid
          sessionStorage['loginUname'] = uname;
          sessionStorage['loginUid'] = data.uid;
          location.href = 'productlist.html';
        }else{
          alert("密码输入错误");
        }
      },
      error: function (err) {
        console.log(err);
      }
    })
  });
})();