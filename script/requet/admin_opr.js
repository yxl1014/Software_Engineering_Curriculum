


$(function () {
    $('#screah').on('click',function () {
        console.log("被触发")
        console.log($("#Id").val())
        var str = "";
        if ($("#Id").val() != ""){
            $("tbody tr").stop().hide() //将tbody中的tr都隐藏
                .filter("tr:contains('"+($("#Id").val())+"')").show();
        }
        if($("#Name").val() != ""){
            $("tbody tr").stop().hide() //将tbody中的tr都隐藏
                .filter("tr:contains('"+($("#Name").val())+"')").show();
        }
        if($("#Time").val() != ""){
            $("tbody tr").stop().hide() //将tbody中的tr都隐藏
                .filter("tr:contains('"+($("#Time").val())+"')").show();
        }
        //，将符合条件的筛选出来
    })
})
