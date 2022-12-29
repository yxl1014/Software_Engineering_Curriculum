// del
$(function () {

    $('#del').on('click', function () {
        console.error("触发")
        // String userAccout,boolean status
        var d = {
            'userAccout':$('#Id').val(),
        }
        console.error(d)
        $.ajax({
            url: '/admin/deleteUser',
            type: 'POST',
            data: d,
            success: function (res) {
                var obj = JSON.parse(JSON.stringify(res));
                if (obj.status){
                    alert(obj.msg)
                }else {
                    alert(obj.msg);
                }

            }, error: function (res) {

            }
        })
    })
})
$(function () {

    $('#uphandle').on('click', function () {
        console.error("触发")
        // String userAccout,boolean status
        var d = {
            'userAccout':$('#Id').val(),
            'status':$('#Time').val(),
        }
        console.error(d)
        $.ajax({
            url: '/admin/updateStatus',
            type: 'POST',
            data: d,
            success: function (res) {
                var obj = JSON.parse(JSON.stringify(res));
                if (obj.status){
                    alert(obj.msg)
                }else {
                    alert(obj.msg);
                }

            }, error: function (res) {

            }
        })
    })
})
$(function () {
    $('#admin_login').on('click', function () {
        var datas = {
            'accout': $('#rid').val(),
            'password': $('#rpwd').val(),
        }
        //console.error(datas)
        $.ajax({
            url: '/admin/login',
            type: 'POST',
            data: datas,
            success: function (res) {
                var obj = JSON.parse(JSON.stringify(res));

                if (obj.status) {
                    window.location.href = '../templates/adminpage.html'
                } else {
                    alert(obj.msg);
                }

            }, error: function (res) {

            }
        })
    })
})
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

$(function () {
    $('#btn_add').on('click',function () {
        if ($("#old_password").val()!=$("#new_password").val()) {
            alert("两次密码不一致")
        }else{
        if($("#phone1").val() != "" && $("#old_password").val() != "" && $("#new_password").val() != ""){
            var datas = {
                'accout': $('#phone1').val(),
                'password': $('#old_password').val(),
            }
            $.ajax({
                url: '/admin/addUser',
                type: 'POST',
                data: datas,
                success: function (res) {
                    var obj = JSON.parse(JSON.stringify(res));
                    if (obj.status){
                        alert(obj.msg)
                    }else {
                        alert(obj.msg);
                    }
                }, error: function () {
                    console.error("错误")
                }
            })
        }
        }

    })
})



$(function () {
    $('#admin_add').on('click',function () {
        if ($("#old_password").val()!=$("#new_password").val()) {
            alert("两次密码不一致")
        }else{
            if($("#phone1").val() != "" && $("#old_password").val() != "" && $("#new_password").val() != ""){
                var datas = {
                    'accout': $('#phone1').val(),
                    'password': $('#old_password').val(),
                }
                $.ajax({
                    url: '/admin/addAdmin',
                    type: 'POST',
                    data: datas,
                    success: function (res) {
                        var obj = JSON.parse(res);
                        if (obj.status){
                            alert(obj.msg)
                        }else {
                            alert(obj.msg);
                        }
                    }, error: function (res) {
                        console.error("错误")
                    }
                })
            }
        }

    })
})