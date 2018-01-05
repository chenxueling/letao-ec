var search = getQueryString('search');
console.log(search);
var page = 1;
$(function () {

    $('.search-input').val(search);
    //获取的数
    //初始化拉动刷新的效果
    mui.init({
        pullRefresh: {
            container: '#pullrefresh',
            down: {
                callback: function () {
                    setTimeout(function () {
                        productListData({
                            'proName': '鞋',
                            'brandId': 1,
                            'price': 1,
                            'num': 1,
                            'page': 2,
                            'pageSize': 2
                        }, function () {
                            setTimeout(function () {
                                productListData({
                                    'proName': '鞋',
                                    'brandId': 1,
                                    'price': 1,
                                    'num': 1,
                                    'page': page,
                                    'pageSize': 4
                                }, function (backData) {
                                   
                                        var html = template('productListTep', backData);
                                        // console.log(23);
                                    $('.productList-search .mui-row').html(html);
                                    mui('#pullrefresh').pullRefresh().endPulldownToRefresh();
                                    mui('#pullrefresh').pullRefresh().refresh(true);
                                    if(!$('.productList-search .mui-row').find()) {
                                        html='你搜索的没有哦';
                                        $('.productList-search .mui-row').html(html);
                                       }
                                })
                            }, 1000)
                        })

                    }, 1000)
                }
            },
            up: {
                contentrefresh: '正在加载...',
                contentnomore: '没有更多数据了',
                callback: function () {
                    setTimeout(function () {
                        page++;
                        productListData({
                            'proName': '鞋',
                            'brandId': 1,
                            'price': 1,
                            'num': 1,
                            'page': page,
                            'pageSize': 4
                        }, function (backData) {
                           
                                var html = template('productListTep', backData);
                                // console.log(23);
                        
                            $('.productList-search .mui-row').append(html);
                            mui('#pullrefresh').pullRefresh().endPullupToRefresh(true);
                            if(!$('.productList-search .mui-row').find()) {
                                html='你搜索的没有哦';
                                $('.productList-search .mui-row').html(html);
                               }
                        })

                    }, 1000)
                }
            }
        }
    });
    productListData({
        'proName': '鞋',
        //  'brandId':1,
        'price': 1,
        'num': 1,
        'page': 1,
        'pageSize': 2
    }, function (backData) {
        if (backData.data.length) {
            var html = template('productListTep', backData);
            // console.log(23);
        } else {
            var html = '你搜索的没有哦';
            // console.log(12);
        }
        $('.productList-search .mui-row').html(html);

    })
    searchClick();
    arrayClick();
})

// 请求产品数据
function productListData(options, callBack) {
    $.ajax({
        url: '/product/queryProduct',
        data: options,
        success: function (backData) {
            // console.log(backData);

            callBack && callBack(backData);
        }
    })
}
// 点击搜索
function searchClick() {
    $('.btn-search').on('click', function () {
        var searchVal = $('.search-input').val();
        if(!searchVal){
            mui.toast('请输入要搜索的商品哦');
            return;
        }
        productListData({
            'proName': searchVal,
            //  'brandId':2,
            'price': 1,
            'num': 1,
            'page': 1,
            'pageSize': 2
        }, function (backData) {
            if (backData.data.length) {
                var html = template('productListTep', backData);
                // console.log(23);
            } else {
                var html = '你搜索的没有哦';
                // console.log(12);
            }
            $('.productList-search .mui-row').html(html);
        })
    })
}


//点击产品列表

function arrayClick() {
    $('.productlist-nav .mui-row > div').on('tap', function () {
        //  console.log(12);
        $('.productlist-nav .mui-row > div').removeClass('mui-active')
        $(this).addClass('mui-active');
        var type = $(this).data('type');

        //获取排序的顺序并改值和赋值
        var sort = $(this).data('sort');
        if (sort == 1) {
            sort = 2
            //    console.log(2)
            $(this).find('i').removeClass('fa-angle-down').addClass('fa-angle-up');
        } else {
            sort = 1
            $(this).find('i').removeClass('fa-angle-up').addClass('fa-angle-down');

        }
        $(this).data('sort', sort);
        //p判断点击的是什么数据
        if (type == 'price') {
            productListData({
                'proName': '鞋',
                //  'brandId':1,
                'price': sort,
                'num': 1,
                'page': 1,
                'pageSize': 4
            }, function (backData) {
               
                    var html = template('productListTep', backData);
                    $('.productList-search .mui-row').html(html);
                   if(!$('.productList-search .mui-row').find()) {
                    html='你搜索的没有哦';
                    $('.productList-search .mui-row').html(html);
                   }

            })


        }
        if (type == 'num'){
            productListData({
                'proName': '鞋',
                //  'brandId':1,
                'price': 1,
                'num': sort,
                'page': 1,
                'pageSize': 4
            }, function (backData) {
                if (backData.data.length) {
                    var html = template('productListTep', backData);
                    // console.log(23);
                } else {
                    var html = '你搜索的没有哦';
                    // console.log(12);
                }
                $('.productList-search .mui-row').html(html);

            })

  
        }


    })
}


//获取url中的参数并且解决中文乱码问题
function getQueryString(key) {
    var reg = new RegExp("(^|&)" + key + "=([^&]*)(&|$)");
    var result = window.location.search.substr(1).match(reg);
    return result ? decodeURIComponent(result[2]) : null;
}