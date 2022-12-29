$(function () {
    window.onload = function () {
        $.ajax({
            url: '/count/load',
            type: 'GET',
            data: {},
            success: function (res) {
                console.log("load被调用")
                if (res.toString() == 'N') {
                    location.href = "../../login.html";
                }else {
                    getName();
                    console.log("日历")
                    angdo();
                }
            }, error: function (res) {
                console.error("错误")
            }
        })
    }
})
//
//
// var isSign = false;
// var myday = new Array(); //已签到的数组
// //			myday[0] = "1528646400"
// //			myday[1] = "1528387200"
// //			myday[2] = "1525708800"
//
// var cale = new Calendar("idCalendar", {
//     qdDay: myday,
//     onToday: function(o) {
//         o.className = "onToday";
//     },
//     onSignIn: function (){
//         $$("sign-txt").innerHTML = '';
//     },
//     onFinish: function() {
//         $$("sign-count").innerHTML = myday.length //已签到次数
//         $$("idCalendarYear").innerHTML = this.Year;
//         $$("idCalendarMonth").innerHTML = this.Month; //表头年份
//
//     }
// });
// $$("idCalendarPre").onclick = function() {
//     cale.PreMonth();
// }
// $$("idCalendarNext").onclick = function() {
//     cale.NextMonth();
// }
// //添加今天签到
// function angdo() {
//     console.log("执行日历")
//     if(isSign == false) {
//         var res = cale.SignIn();
//         if(res == '1') {
//             $$("sign-txt").innerHTML = '';
//             $$("sign-count").innerHTML = parseInt($$("sign-count").innerHTML) + 1;
//             isSign = true;
//         } else if (res == '2'){
//             $$("sign-txt").innerHTML = '';
//             $$("sign-txt").innerHTML = '';
//             $$("sign-count").innerHTML = parseInt($$("sign-count").innerHTML) + 1;
//             isSign = true;
//         }
//     } else {
//
//     }
//
// }




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