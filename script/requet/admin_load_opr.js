window.onload = function () {//收货地,货号,数量,状态,完成时间
    var start = 0;
    var size = 10;
    $.ajax({
        url: "/admin/selectAllOpertor",
        method: "post",
        data: {},
        xhrFields: {
            withCredentials: true //允许跨域带Cookie
        },
        success: function (res) {
            console.error(res);
            var obj = JSON.parse(JSON.stringify(res))
            for (var i = 0; i < obj.users.length; i++) {
                var trTemp = $("<tr id='tr" + eval("(" + obj.users[i].oid + ")") + "'></tr>");
                trTemp.append("<td>" + eval("(" + obj.users[i].oid + ")") + "</td>");
                trTemp.append("<td>" + eval("(" + obj.users[i].accout + ")") + "</td>");
                trTemp.append("<td>" + eval("(" + obj.users[i].weight + ")") + "</td>");
                trTemp.append("</tr>");
                trTemp.appendTo("#in_table");
            }
        },
        error: function () {
            window.location.href = "./TestCors.html";
        }
    })
}