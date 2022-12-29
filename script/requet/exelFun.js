
//读取Excel数据
function getExcelData(obj) {
    var reader = new FileReader();

    //文件加载完成后调用
    reader.onload = function (e) {
        var data = e.target.result;

        //type为buffer时，IE浏览器不兼容xls
        //var workbook = XLSX.read(data, {
        //    type: 'buffer'
        //});

        //兼容IE，需把type改为binary，并对data进行转化
        var workbook = XLSX.read(arrayBufferToBinaryString(data), {     //手动转化
            type: 'binary'
        });

        //获取json格式的Excel数据
        var jsonData = XLSX.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]], {
            defval: 'null'  //单元格为空时的默认值
        });
        console.log(JSON.stringify(jsonData))
   $(function () {
        $.ajax({
            url:'/count/exelIn',
            type:'GET',
            data:{
                'data':JSON.stringify(jsonData)
            },

            success:function (res)
            {

                if(res.toString() == 'Y'){
                    //window.open('main.html')
                    alert("成功")
                    console.log("成功")

                }else{
                  alert("失败")
                }


            },error:function (res){

            }
        })
        })



        // document.querySelector("p").innerHTML = JSON.stringify(jsonData, null, "\t");
        //document.querySelector("p").innerHTML = JSON.stringify(jsonDataToCells(jsonData), null, "\t");
    };

    //加载文件
    reader.readAsArrayBuffer(obj.files[0]);

    //不兼容IE，该特性是非标准的，请尽量不要在生产环境中使用它！
    //reader.readAsBinaryString(file);

}
function getExcelDataOut(obj) {
    var reader = new FileReader();

    //文件加载完成后调用
    reader.onload = function (e) {
        var data = e.target.result;
        //type为buffer时，IE浏览器不兼容xls
        //var workbook = XLSX.read(data, {
        //    type: 'buffer'
        //});

        //兼容IE，需把type改为binary，并对data进行转化
        var workbook = XLSX.read(arrayBufferToBinaryString(data), {     //手动转化
            type: 'binary'
        });

        //获取json格式的Excel数据
        var jsonData = XLSX.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]], {
            defval: 'null'  //单元格为空时的默认值
        });
        console.log(JSON.stringify(jsonData))
        $(function () {
            $.ajax({
                url:'/count/exelOut',
                type:'GET',
                data:{
                    'data':JSON.stringify(jsonData)
                },

                success:function (res)
                {

                    if(res.toString() == 'Y'){
                        //window.open('main.html')
                        alert("成功")
                        console.log("成功")

                    }else{
                        alert("失败")
                    }


                },error:function (res){

                }
            })
        })



        // document.querySelector("p").innerHTML = JSON.stringify(jsonData, null, "\t");
        //document.querySelector("p").innerHTML = JSON.stringify(jsonDataToCells(jsonData), null, "\t");
    };

    //加载文件
    reader.readAsArrayBuffer(obj.files[0]);

    //不兼容IE，该特性是非标准的，请尽量不要在生产环境中使用它！
    //reader.readAsBinaryString(file);

}

//ArrayBuffer转BinaryString
function arrayBufferToBinaryString(data) {
    var o = "",
        l = 0,
        w = 10240;
    for (; l < data.byteLength / w; ++l) o += String.fromCharCode.apply(null, new Uint8Array(data.slice(l * w, l * w + w)));
    o += String.fromCharCode.apply(null, new Uint8Array(data.slice(l * w)));
    return o;
}

function getTableContent(){
    var mytable = document.getElementById("ii");
    var data = [];
    var cells=mytable.rows[0].cells.length;
    var rows=mytable.rows.length;
    var resstr = "";
    console.log("cell is"+cells);
    console.log("rows is"+rows);
    for(let i=0; i<rows; i++){
        for(let j=0; j<cells; j++){
            data[i] = new Array();
            data[i][j] = mytable.rows[i].cells[j].innerHTML;
            if(data[i][j] != "")
                resstr+=data[i][j]+",";
            console.log(data[i][j]);
        }
    }
    $.ajax({
        url:'/count/DoinTab',
        type:'GET',
        data:{
            data:resstr
        },
        success:function(res){
            if(res == "Y"){
                console.log("成功")
                alert("成功")
            }else {
                console.log("失败")
                alert("失败")
            }
        } ,
        error:function () {
            alert("执行失败")
        }

    })
}
function getTableContentOut(){
    var mytable = document.getElementById("ii");
    var data = [];
    var cells=mytable.rows[0].cells.length;
    var rows=mytable.rows.length;
    var resstr = "";
    console.log("cell is"+cells);
    console.log("rows is"+rows);
    for(let i=0; i<rows; i++){
        for(let j=0; j<cells; j++){
            data[i] = new Array();
            data[i][j] = mytable.rows[i].cells[j].innerHTML;
            if(data[i][j] != "")
                resstr+=data[i][j]+",";
            console.log(data[i][j]);
        }
    }
    $.ajax({
        url:'/count/DoOutTab',
        type:'GET',
        data:{
            data:resstr
        },
        success:function(res){
            if(res == "Y"){
                console.log("成功")
                alert("成功")
            }else {
                console.log("失败")
                alert("失败")
            }
        } ,
        error:function () {
            alert("执行失败")
        }

    })
}
