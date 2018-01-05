$(function () {
    searchClick();
    getData();
    historyRemove();
    historyRemoveAll();

})


//点击search的时候获取val值 进行存储
function searchClick() {

    $('.btn-search').on('click', function () {

        var historyData = localStorage.getItem('historyData');
        var addVal = $('.search-input').val();
        if (addVal) {
            if (historyData) {

                historyData = JSON.parse(historyData);

            } else {
                historyData = [];
            }
            if (historyData.indexOf(addVal + '') == -1) {

                historyData.unshift(addVal);

            }

            historyData = JSON.stringify(historyData);

            localStorage.setItem('historyData', historyData);

            historyData = JSON.parse(historyData);
            // historyData.reverse();

            var html = template('historySearch', {
                historyData
            })

            $('.history ul').html(html);
        }

        var search = $('.search-input').val();
        window.location.href = 'productList.html?serach=' + search;
        // console.log(search);
    })

}

function getData() {
    var historyData = localStorage.getItem('historyData');
    historyData = historyData ? JSON.parse(historyData) : [];
    //在ul中渲染数据
    //    console.log({history:historyData});
    // historyData.reverse();
    var html = template('historySearch', {
        historyData
    })
    //    console.log(html);
    $('.history ul').html(html);
}

function historyRemove() {
    $('.history ul').on('click', '.btn-remove', function () {
        //   console.log(this);
        var history = $(this).data('history');
        var historyData = localStorage.getItem('historyData');
        historyData = JSON.parse(historyData);
        var index = historyData.indexOf(history + '');
        historyData.splice(index, 1);
        historyData = JSON.stringify(historyData);

        localStorage.setItem('historyData', historyData);

        historyData = JSON.parse(historyData);
        // historyData.reverse();

        var html = template('historySearch', {
            historyData
        })

        $('.history ul').html(html);
    })


}

function historyRemoveAll() {
    $('.navbar .btn-removeall').on('click', function () {
        // console.log(124);
        var historyData = localStorage.getItem('historyData');
        historyData = [];
        historyData = JSON.stringify(historyData);

        localStorage.setItem('historyData', historyData);

        historyData = JSON.parse(historyData);
        // historyData.reverse();

        var html = template('historySearch', {
            historyData
        })

        $('.history ul').html(html);
        $('.history ul').css({
            border: 0
        })
    })
}