(function () {
  $('#sub').click(function(){
    var uname = $('#uname').val(),
        upwd  = $('#upwd').val();

    $.ajax({
      type:'post',
      url:'/user/register',
      data:{uname:uname,upwd:upwd},
      success:function(data){
        if(data.code == 1){
          alert("注册成功!3秒跳到登录界面!");
          setTimeout(() => {
            location.href = "login.html";
          },3000);
        }
      },
      error:function(err){
        console.log(err);
      }
    })
  })
})();