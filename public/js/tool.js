
/**
 *  用于检查用户是否登录，并为退出按钮绑定清除session功能
 */
function logincheck() {
  //检查是否登录，若没登录跳转到登录界面
  if (sessionStorage['loginUname'] == 'undefined') {
    location.href = "login.html";
  } else {
    $('#welcome .user').show();
    $('.login_show').hide();
    $('.user .user_name').text(sessionStorage['loginUname']);
  }
  //给退出按钮绑定 
  $('.user .user_quit').click(function () {
    sessionStorage.clear();
    location.href = "login.html";
  })
}

