var id = getQueryString('id');
var productSize = 0;
// console.log(id);

$(function () {
    getDetailsData(id);
    //区域滚动初始化
    DownRefresh();
    productSizeClick();
    addCartData();
})
// 启动上拉刷新
function DownRefresh(){
    mui.init({
        pullRefresh: {
            container: '#pullrefresh',
            down: {
                callback: function () {
                    setTimeout(function () {
                        getDetailsData(id,function(){
                            mui('#pullrefresh').pullRefresh().endPulldownToRefresh();
                            mui('#pullrefresh').pullRefresh().refresh(true);
                        })      
                    },1000)   
            },}
          
        }
    });
}

function getDetailsData(id,callBack) {
    $.ajax({
        url: '/product/queryProductDetail',
        data: {
            'id': id
        },
        success: function (backData) {
            var sizeArr = backData.size.split('-');
            var sizeStart = parseInt(sizeArr[0]);
            var sizeEnd = parseInt(sizeArr[1]);
            var size = [];
            for (var i = sizeStart; i <= sizeEnd; i++) {
                size.push(i);
            }
            backData.size = size;
            console.log(backData);
            var html = template('productDetalisTmp', backData);
            $('.product-detail').html(html);
            //自动轮播需要4张图片要克隆生成
            var first = $('.mui-slider-item').first().clone().addClass('mui-slider-item-duplicate');
            var last = $('.mui-slider-item').last().clone().addClass('mui-slider-item-duplicate');
            //此处要先克隆好.再来增加

            first.appendTo($('#solid .mui-slider-group'));
            last.prependTo($('#solid .mui-slider-group'));
            //此处要先克隆好.在来调用轮播图的初始化

            //轮播图初始化
            mui('.mui-slider').slider({
                interval: 1000 //自动轮播周期，若为0则不自动播放，默认为0；
            });
 
           callBack&&callBack();

        }
    })
}

// 尺码的点击事件
function productSizeClick(){
  $('body').on('tap','.product-size .btn-size',function () { 
       $('.product-size .btn-size').removeClass('mui-btn-success');
       $(this).addClass('mui-btn-success');
   })

   $('body').on('tap','.product-num .num-sub',function(){
        productSize--;
        if(productSize<=0){
            productSize=0;
        }  
        $('.product-num .buy-num').val(productSize);  
        // console.log('LOG');
   })

   $('body').on('tap','.product-num .num-add',function(){
    productSize++;
    var maxNum = $('.product-num .residue-size').html();
    if(productSize>maxNum){
        productSize=maxNum;
    }   
    $('.product-num .buy-num').val(productSize);    
    // console.log(12); 
    // console.log(productSize);
})
}


function addCartData() {
    $('body').on('tap','#footer .btn-add',function(){
        var selectedSize = $('.product-size .mui-btn-success').html();
        var selectedNum = $('.product-num .buy-num').val();
        if(!selectedSize){
          mui.toast('请选择尺码',{ duration:1000, type:'div' });
          return;
        }
        if(!selectedNum){
            mui.toast('请添加数量',{ duration:1000, type:'div' });
            return;
        }
        // console.log(12);
       //  请求数据存入数据
       $.ajax({
           url:'/cart/addCart',
           type:'post',
           data:{
               'productId':id,
               'num':selectedNum,
               'size':selectedSize
           },
           success:function (backData) { 
             if(backData.success){
                mui.confirm('添加成功，是否去购物车去看看', '温馨提示', ['确定','取消'], function(e) {
                    if (e.index == 0) {
                       window.location.href = 'cart.html';
                    } 
                })
             }else{
                 
             }
            }
       })


    })
   
}




//获得url中的数据
function getQueryString(name) {
    var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
    var r = window.location.search.substr(1).match(reg);
    if (r != null) {
        return unescape(r[2]);
    }
    return null;
}