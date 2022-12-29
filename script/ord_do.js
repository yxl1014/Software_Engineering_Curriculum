$(document).on('click','#ord_back',function(){
    window.location.href = "./index.html"
})


$(function(){
    set_data();
});
function set_data()
{
    var str = window.localStorage.getItem("nus");
   var j = window.localStorage.getItem("jin");
   // var str = $.query.get("nus");
   // var  j = $.query.get("jin");
   $("#meals").text(str);
   $("#jin").text(j);

}


$(function () {
    $('#Ti').on('click', function () {
        //String car_tel,String mark,String meals,String sum
        var datas = {
            'car_tel': $('#tel').val(),
            'mark': $('#marks').val(),
            'meals': $('#meals').text(),
            'sum': $('#jin').text(),
        }
        console.error(datas)
        $.ajax({
            url: '/user/addOrd',
            type: 'POST',
            data: datas,
            success: function (res) {
                var obj = JSON.parse(res);

                if (obj.status) {
                    alert(obj.msg);
                    window.location.href = '../templates/user_main.html'
                } else {
                    alert(obj.msg);
                }

            }, error: function (res) {

            }
        })
    })
})