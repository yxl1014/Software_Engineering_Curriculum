$(function () {
    window.onload = function () {
        console.log("asda");
        $.ajax({
            url: '/count/load',
            type: 'GET',
            data: {},
            success: function (res) {
                console.log("load被调用")
                if (res.toString() == 'N') {
                    location.href = "../../templates/login.html";
                }else {
                    getName();
                    }
                    // AdmNUid();
                }, error: function (res) {
                console.error("错误")
            }
        })
    }
})


function getName() {

    $.ajax({
        url: '/count/loadName',
        type: 'GET',
        data: {},
        success: function (res) {
            var x=document.getElementById("demoName");  // 找到元素
            x.innerHTML="<img src=\"./img/100.jpg\" class=\"layui-nav-img\">"+res;
            console.log("调用");
        }, error: function (res) {
            console.error("错误")
        }
    })}