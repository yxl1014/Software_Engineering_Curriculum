$(function () {

    $('#Lon_Btn').on('click',function () {
        var datas = {
            auttuct_id:$('#tel_S').val(),
            password:$('#pwd_S').val(),
            tel:"",
            name:"",
            type:0
        }
        console.log(datas)
        $.ajax({
            url:'/count/Lon',
            type:'POST',
            data:JSON.stringify(datas),
            dataType:"text",
            contentType:"application/json;charset=utf-8",
            success:function (res)
            {

                if(res.toString() == 'Y'){
                    console.log(res)
                    location.href = '../../operatorpage.html'

                }else if (res.toString() == "AY"){
                    console.log(res)
                     location.href = '../../adminpage.html'
                }else {
                    alert("密码或用户名填写错误")
                }
            },error:function (res){

            }
        })
    })
    $('#Reg').on('click',function () {
        $.ajax({
            url:'/count/reg',
            type:'POST',
            data:{
                'Tel':$('#rid').val(),
                'Password':$('#rpwd').val()
            },

            success:function (res)
            {

                if(res.toString() == 'Y'){
                    //window.open('main.html')
                    alert("注册成功")
                    console.log("注册成功")

                }else{
                    if(res.toString() == 'N'){
                        alert("手机号已被注册")
                    }else{
                        alert("请输入正确的手机号")
                    }
                }


            },error:function (res){

            }
        })
    })
})