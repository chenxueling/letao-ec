$(function () {
    loginData();
   

  })


  function loginData(){
   $('.btn-login').on('tap', function() { 
       var username = $('.username').val();
       var password = $('.password').val();

       if(!username){
           mui.toast('请输入用户名',{ duration:1000, type:'div' });
           return;
       }
       if(!password){
        mui.toast('请输入用户名',{ duration:1000, type:'div' });
        return;
    }

       $.ajax({
           url:'/user/login',
           type:'post',
           data:{
               'username':username,
               'password':password
           },
           success:function(backData){
              if(backData.success){
                mui.toast('登录成功',{duration:500, type:'div' });
                history.back();
                // console.log(2);
              }else{
                mui.toast(backData.message,{duration:500, type:'div' });
              }
           }
       })



   })

  }


