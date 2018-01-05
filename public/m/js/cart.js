$(function () {
    getCartData();
    DownRefresh();
    getProductPrice();
    cartDelete();
    cartEdit();
    selectedSize();

})


function getCartData() {
    $.ajax({
        url: '/cart/queryCart',
        success: function (backData) {
            if (backData.error) {
                window.location.href = 'index.html';
            } else {
                console.log(backData);
                var html = template('cartDataTmp', backData);
                $('ul.mui-table-view').html(html);

            }
        }
    })
}


function DownRefresh() {
    mui.init({
        pullRefresh: {
            container: '#pullrefresh',
            down: {
                callback: function () {
                    setInterval(function () {
                        mui('#pullrefresh').pullRefresh().endPulldownToRefresh();

                    }, 1000)
                    getCartData();
                },
            }

        }
    });
}

function getProductPrice() {

    mui('body').on('change', '.btn-check', function () {
        console.log(12);

        var sum = 0;
        $('.btn-check:checked').each(function (i, e) {
            var price = $(e).siblings('.mui-media-body ').find('.nowprice').data('price');
            var num = $(e).siblings('.mui-media-body ').find('.num').data('num');
            sum += price * num;
            console.log(sum);

        })

        $('.totalPrice span').html(Math.ceil(sum * 100) / 100);
    })
}

function cartDelete() {
    $('body').on('tap', '.btn-delete', function () {
        var elem = $(this).parent().parent()[0];

        var deleteId = $(this).data('id');
        console.log(deleteId);
        mui.confirm('你要删除这件商品么', '温馨提示', ['确定', '取消'], function (e) {
            if (e.index == 0) {
                $.ajax({
                    url: '/cart/deleteCart',
                    data: {
                        'id': deleteId
                    },
                    success: function (backData) {
                        mui.toast('删除成功',{ duration:200, type:'div' });
                        setTimeout(function () {
                        
                            getCartData();
                            mui.swipeoutClose(elem);
                        }, 1000)
                    }
                })
            } else {
                mui.swipeoutClose(elem);
            }
        })
    })
}

function cartEdit() {
    $('body').on('tap', '.btn-edit', function () {
    var elem = $(this).parent().parent()[0];
    var Nowsize =parseInt( $(this).data('now-size'));
    var productNum =$(this).data('product-num');
    var totalNum = $(this).data('total-num');
    var productSize =$(this).data('old-size').split('-');
    var id = $(this).data('id');
    var size = [];
    var sizeStart = parseInt(productSize[0])
    var sizeEnd = parseInt(productSize[1])
    
    for(var i = sizeStart;i <= sizeEnd;i++){
        size.push(i);
    }
    // console.log(size);
    var product = {
        'editId':id,
        'Nowsize':Nowsize,
        'size':size,
        'productNum':productNum,
        'totalNum':totalNum
    }
    // console.log(product);
    var html = template('editTmp',product);
    html = html.replace(/(\r)?\n/g, "");

        mui.confirm(html, '编辑商品', ['确定', '取消'], function (e) {
          
            if (e.index == 0) {
             
                var editNum =    $('.selectedSize').val();
                var editSize = $('.product-size span.mui-active').html();
                
                $.ajax({
                    url: '/cart/updateCart',
                    type:'post',
                    data: {
                        'id':id,
                        'size':editSize,
                        'num':editNum
                    },
                    success: function (backData) {
                        mui.toast('删除成功',{ duration:200, type:'div' });
                        setTimeout(function () {
                            getCartData();
                            mui.swipeoutClose(elem);
                        }, 500)
                    }
                })
            } else {
                mui.swipeoutClose(elem);
            }
        })
    })
}

// var changeSize = 0;
function selectedSize(){
  $('body').on('tap','.btn-size',function(){
      $('.btn-size').removeClass('mui-active');
      $(this).addClass('mui-active');
  }) 

  $('body').on('tap','.num-sub',function(){
   var num = parseInt($('.selectedSize').val());
   num -- ;
   if(num <= 0 ){
       num = 0;
   }
   $('.selectedSize').val(num);
  })
  
  $('body').on('tap','.num-add',function(){
    var num = parseInt($('.selectedSize').val());
    var totalNum = parseInt($(this).data('total-num'));
    console.log(totalNum);
    num ++ ;
    if(num >= totalNum ){
        num = totalNum;
    }
    $('.selectedSize').val(num);
   })
}