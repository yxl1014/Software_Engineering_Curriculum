
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
        success: function (res) {
            console.log(res)
            var obj = JSON.parse(JSON.stringify(res))
            // $("#message").html(result);
            for (var i = 0; i < obj.orders.length; i++) {
                var trTemp = $("<tr id='tr" + obj.orders[i].Var1+ "'></tr>");
                trTemp.append("<td>" + obj.orders[i].Var1+ "</td>");
                trTemp.append("<td>" + obj.orders[i].Var2+ "</td>");
                trTemp.append("<td>" + obj.orders[i].Var3.String+ "</td>");
                trTemp.append("<td>" + status(obj.orders[i].Var4) + "</td>");
                trTemp.append("<td>" + obj.orders[i].Var8 + "</td>");
                trTemp.append("<td>" + obj.orders[i].Var10 + "</td>");
                trTemp.append("</tr>");
                console.log(obj.orders[i].Var8)
                trTemp.appendTo("#in_table");
            }
        },
        error: function () {
            window.location.href = "./TestCors.html";
        }
    })
}
