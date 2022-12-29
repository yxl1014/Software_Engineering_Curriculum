$(function () {

    $('#meal_add').on('click', function () {
      var img = document.getElementById("m_img").value;
      var type = $("#m_type").val();
      var name = $("#m_name").val();
      var sum  = $("#m_sum").val();
      var intro = $("#m_intro").val();
      var teste = $("#m_taste").val();

        var datas = {
            'type': type,
            'name': name,
            'sum': sum,
            'intro': intro,
            'teste': teste,
            'img': img,
        }

      console.error(datas);
        $.ajax({
            url: '/opertor/addMeal',
            type: 'POST',
            data: datas,
            success: function (res) {
                var obj = JSON.parse(JSON.stringify(res));

                if (obj.status) {
                   alert(obj.msg);
                } else {
                    alert(obj.msg);
                }

            }, error: function (res) {

            }
        })
    })
})

$(function () {
    $('#opertor_login').on('click', function () {
        var datas = {
            'accout': $('#id').val(),
            'password': $('#pwd').val(),
        }
        console.error(datas)
        $.ajax({
            url: '/opertor/login',
            type: 'POST',
            data: datas,
            success: function (res) {
                var obj = JSON.parse(JSON.stringify(res));

                if (obj.status) {
                    window.location.href = '../../templates/operatorpage.html'
                } else {
                    alert(obj.msg);
                }

            }, error: function (res) {

            }
        })
    })
})


$(function () {
    $('#up_state').on('click', function () {
        var datas = {
            'oid': $('#Id').val(),
            'status': $('#Name').val(),
        }
        console.error(datas)
        $.ajax({
            url: '/opertor/updateOrder',
            type: 'POST',
            data: datas,
            success: function (res) {
                var obj = JSON.parse(JSON.stringify(res));

                if (obj.status) {
                    alert(obj.msg);
                } else {
                    alert(obj.msg);
                }

            }, error: function (res) {

            }
        })
    })
})
$(function () {
    $('#up_state_er').on('click', function () {
        var datas = {
            'oid': $('#Id').val(),
            'tel': $('#Time').val(),
        }
        console.error(datas)
        $.ajax({
            url: '/opertor/updateDelTel',
            type: 'POST',
            data: datas,
            success: function (res) {
                var obj = JSON.parse(JSON.stringify(res));

                if (obj.status) {
                    alert(obj.msg);
                } else {
                    alert(obj.msg);
                }

            }, error: function (res) {

            }
        })
    })
})