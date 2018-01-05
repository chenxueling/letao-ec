$(function () { 
    getCategoryleftDate();
    CategoryleftClick();
    getCategoryRightData(1);
    //初始化mui中的touch事件
    mui('.mui-scroll-wrapper').scroll({
        deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
    });
   
 })

 function getCategoryleftDate(){
     $.ajax({
         url:'/category/queryTopCategory',
         success : function(backData){
            //  console.log(backData);
             var html =template('categoryLeftTem',backData);
             $('.category-left ul').html(html);
             $('.category-left ul li').eq(0).addClass('active');
         }
     })
 }

 //点击左边的自动生成右边的
 function CategoryleftClick(){
     $('.category-left ul').on('click','li',function(){     
        //获取点击的id
        var id = $(this).data('id');
        // console.log(id);
        //请求数据
        $('.category-left ul li').removeClass('active');
        $(this).addClass('active');
        getCategoryRightData(id);
        
     })
 }

 function getCategoryRightData(id){
    $.ajax({
        url:'/category/querySecondCategory',
        data:{
            id:id
        },
        success:function(backData){
            // console.log(backData);
            var html = template('categoryRightTem',backData);
            html=  backData.rows.length ?html:'没有数据哦';
           
            $('.category-right .mui-scroll').html(html);
        }
    })
 }