$(function(){
    getuserData();
    loginOut();

})


function getuserData(){
    $.ajax({
     url:'/user/queryUserMessage',
     success:function(backData){
         console.log(backData);
        if(backData.error){
       
            mui.toast('请登录',{ duration:500, type:'div' });
            window.location.href = 'login.html';
        }else{
            $('.username').html(backData.username);
            $('.mobile').html(backData.mobile);
        }
     } 
    })
} 


function loginOut(){
    $('.btn-loginout').on('click',function(){
        $.ajax({
            url:'/user/logout',
            success:function (backData) { 
                mui.toast('退出成功');
                setTimeout(function(){
                    window.location.href = 'login.html';
                },200)
             }
        })
    })
  }