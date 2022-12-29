
function status(num){
    var res = "";

    if (num == 0){
        res+=" 接收中"
    }
    if (num == 1){
        res+=" 配送中"
    }
    if (num == 2){
        res += "已完成"
    }
    return res;

}
window.onload = function ()
{//收货地,货号,数量,状态,完成时间
    var start = 0;
    var size = 10;
    $.ajax({
        url: "/admin/selectAllOrder",
        method: "post",
        data: {},
        xhrFields: {
            withCredentials: true //允许跨域带Cookie
        },
        success: function (result) {

            // $("#message").html(result);
            var result2=eval("("+result+")");
            console.error(result2);
            // $("#message").html(result);
            for (var i = 0; i < result2.length; i++) {
                var trTemp = $("<tr id='tr" + result2[i].order_num+ "'></tr>");
                trTemp.append("<td>" + result2[i].order_num+ "</td>");
                trTemp.append("<td>" + result2[i].car_tel+ "</td>");
                trTemp.append("<td>" + result2[i].del_tel+ "</td>");
                trTemp.append("<td>" + status(result2[i].status) + "</td>");
                trTemp.append("<td>" + result2[i].timestamp + "</td>");
                trTemp.append("<td>" + result2[i].sum + "</td>");
                trTemp.append("</tr>");
                console.log(result2[i].timestemp)
                trTemp.appendTo("#in_table");
            }
        },
        error: function () {
            window.location.href = "./TestCors.html";
        }
    })
}
