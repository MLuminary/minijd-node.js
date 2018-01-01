(function () {
  $('#sub').click(function () {
    var uname = $('#uname').val(),
      upwd = $('#upwd').val();

    $.ajax({
      type: 'post',
      url: '/user/login',
      data : { uname: uname, upwd: upwd },
      success: function (data) {
        console.log(data.code)
        if(data.code==1){
          location.href = 'usercenter.html';
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