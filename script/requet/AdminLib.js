function getIn()
{
    var start = 0;
    var size = 10;
    $.ajax({
        url: "/count/inlib",
        method: "GET",
        data: {'start': start, 'size': size},
        xhrFields: {
            withCredentials: true //允许跨域带Cookie
        },
        success: function (result) {
            console.log(result)

            // $("#message").html(result);
            var result2=eval("("+result+")");
            // $("#message").html(result);
            for (var i = 0; i < result2.length; i++) {
                var trTemp = $("<tr id='tr" + result2[i].goodid + "'></tr>");
                trTemp.append("<td>" + result2[i].goodid+ "</td>");
                trTemp.append("<td>" + result2[i].inaddress+ "</td>");
                trTemp.append("<td>" + result2[i].wareid + "</td>");
                trTemp.append("<td>" + result2[i].goarea + "</td>");
                trTemp.append("<td>" + result2[i].timestemp + "</td>");
                trTemp.append("</tr>");
                trTemp.appendTo("#in_table");
            }
        },
        error: function () {
            window.location.href = "../../404.html";
        }
    })
}

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

function getOut()
{
    var start = 0;
    var size = 10;
    $.ajax({
        url: "/count/outlib",
        method: "GET",
        data: {'start': start, 'size': size},
        xhrFields: {
            withCredentials: true //允许跨域带Cookie
        },
        success: function (result) {
            console.log(result)

            // $("#message").html(result);
            var result2=eval("("+result+")");
            // $("#message").html(result);
            for (var i = 0; i < result2.length; i++) {
                var trTemp = $("<tr id='tr" + result2[i].goodid + "'></tr>");
                trTemp.append("<td>" + result2[i].goodid+ "</td>");
                trTemp.append("<td>" + result2[i].outaddress+ "</td>");
                trTemp.append("<td>" + result2[i].wareid + "</td>");
                trTemp.append("<td>" + result2[i].goarea + "</td>");
                trTemp.append("<td>" + result2[i].timestemp + "</td>");
                trTemp.append("</tr>");
                trTemp.appendTo("#out_table");
            }
        },
        error: function () {
            window.location.href = "../../404.html";
        }
    })
}

function AdmGood()
{
    console.log("查看所有仓库");
    var start = 0;
    var size = 10;
    $.ajax({
        url: "/count/goodlib",
        method: "GET",
        data: {'start': start, 'size': size},
        xhrFields: {
            withCredentials: true //允许跨域带Cookie
        },
        success: function (result) {
            console.log(result);
            var result2=eval("("+result+")");
            for (var i = 0; i < result2.length; i++) {
                var trTemp = $("<tr id='tr" + result2[i].wareid + "'></tr>");
                trTemp.append("<td>" + result2[i].goodid+ "</td>");
                trTemp.append("<td>" + result2[i].goname+ "</td>");
                trTemp.append("<td>" + result2[i].wareid+ "</td>");
                trTemp.append("<td>" + result2[i].area + "</td>");
                trTemp.append("<td>" + result2[i].uid + "</td>");
                trTemp.appendTo("#GoodTable");
            }
        },
        error: function () {
            window.location.href = "../../404.html";
        }
    })
}

function getUser()
{
    console.log("查看所有仓库");
    var start = 0;
    var size = 10;
    $.ajax({
        url: "/count/userlib",
        method: "GET",
        data: {'start': start, 'size': size},
        xhrFields: {
            withCredentials: true //允许跨域带Cookie
        },
        success: function (result) {
            console.log(result);
            var result2=eval("("+result+")");
            for (var i = 0; i < result2.length; i++) {
                var trTemp = $("<tr id='tr" + result2[i].wareid + "'></tr>");
                trTemp.append("<td>" + result2[i].auttuct_id+ "</td>");
                trTemp.append("<td>" + result2[i].tel+ "</td>");
                trTemp.append("<td>" + result2[i].name+ "</td>");
                trTemp.append("<td>" + result2[i].Emil + "</td>");
                trTemp.append("<td>" + result2[i].sex + "</td>");
                trTemp.appendTo("#UserTable");
            }
        },
        error: function () {
            window.location.href = "../../404.html";
        }
    })
}

