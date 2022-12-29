$(function () {
	var str_list = new Map;
	var jin = 0;

	$(document).ready(function(){
		$.ajax({
			url: '/user/getAllMeal',
			type: 'POST',
			data: {},
			success: function (res) {
				f1(res)
			}, error: function (res) {
			}
		})
	})
	function f1(res) {
		var obj = JSON.parse(res);
		console.log(obj)
		for (var val in obj) {
			// console.error(val);//输出如:name
			f(val,obj[val]);
		}
	}

	function f( type,arr) {
		id = type
		var typess = $("<li><span>" + arr[0].type + "</span></li>")
		typess.appendTo("#types")
		console.log(arr)

			var trTemp = $("<div id='" + id + "' class=" + "right-con con-active" + " style=" + "display: none;" + "></div>");
			var ulTemp = $("<ul id='" + id + "1" + "' ></ul>")
			trTemp.appendTo("#muns")
			ulTemp.appendTo("#" + id)
			for (var i = 0; i < arr.length ; i++) {
				var liTemp = $("<li id='" + id + "1" + i + "' ></li>");
				liTemp.appendTo("#" + id + "1");

				var m_img = $("<div id='" + id + "2" + i + "' class=\"menu-img\"></divid>")
				m_img.appendTo("#" + id + "1" + i);
				var img_data = $("<img src=\""+arr[i].img+"\">")
				img_data.appendTo("#" + id + "2" + i)


				var text_mer = $("<div id='" + id + "3" + i + "' class=\"menu-txt\"></div>")
				text_mer.appendTo("#" + id + "1" + i);

				var data_h4 = $("<h4 data-icon=\"01\">" + arr[i].name + "</h4>")
				data_h4.appendTo("#" + id + "3" + i);

				var xiao_num = $("<p class=\"list1\">"+arr[i].taste+"</p>")
				xiao_num.appendTo("#" + id + "3" + i);

				var pic_div = $("<p id='" + id + "mon" + i + "' class=\"list2\"></p>")
				pic_div.appendTo("#" + id + "3" + i);

				var money_dan = $("<b>￥</b>")
				money_dan.appendTo("#" + id + "mon" + i);
				var pice = $("<b>"+arr[i].sum+"</b>")
				pice.appendTo("#" + id + "mon" + i);

				var add_div = $("<div id='" + id + "btn" + i + "' class=\"btn\"></div>");
				add_div.appendTo("#" + id + "3" + i)

				var add_btn = $("<button class=\"minus\"></button>");
				add_btn.appendTo("#" + id + "btn" + i)

				var prt = $("<i>0</i>");
				prt.appendTo("#" + id + "btn" + i);

				var m_btn = $("<button class=\"add\"></button>")
				m_btn.appendTo("#" + id + "btn" + i);

				var pir = $("<i class=\"price\">" + arr[i].sum + "</i>")
				pir.appendTo("#" + id + "btn" + i);


		}

	}
	function  strMapToObj(strMap){
		let obj= Object.create(null);
		for (let[k,v] of strMap) {
			obj[k] = v;
		}
		return obj;
	}
	/**
	 *map转换为json
	 */
	function  mapToJson(map) {
		return JSON.stringify(strMapToObj(map));
	}

    $("#left li:first-child").addClass("active");
    var e;
	//商品点击增加$(document).on('click','dom节点',function(){})
    // $(".add").click(function(){

	$(document).on('click','#btnselect',function(){
		var s = mapToJson(str_list);
		jin = parseFloat($("#totalpriceshow").text())
		window.localStorage.setItem("nus", s);
		window.localStorage.setItem("jin",jin);
		url = "ordfrom.html";//此处拼接内容
		window.location.href = url;
	})
	$(document).on('click','#back_main',function(){
		window.location.href = "./user_main.html"
	})

	$(document).on('click','.add',function(){
        var n = $(this).prev().text();
        var num = parseFloat(n)+1;
        e = $(this).prev();//当前数量
		var ms = e.text(num-1);
	    if(ms!=0){      //判断是否显示减号及数量
	        e.css("display","inline-block");
	        e.prev().css("display","inline-block")
	    }
        e.text(num); //设置数量
        var parent = $(this).parent();
        var m=parent.parent().children("h4").text(); //当前商品名称
        var danjia=$(this).next().text(); //获取单价
	    var a = $("#totalpriceshow").html();  //获取当前所选总价
	    $("#totalpriceshow").html((a * 1 + danjia * 1).toFixed(2));//计算当前所选总价
	    var nm = $("#totalcountshow").html(); //获取数量
	    $("#totalcountshow").html(nm*1+1);
	    jss();   //改变按钮样式
		str_list.set(m,parseInt(num))


		var acount =num;
	    var sum = (danjia*acount).toFixed(2);
	    var price =danjia;
		//判断购物车里是否有商品，是否有相同规格的商品
		if($(".list-content ul li").length <= 0){
			var addtr = '<li class="food">';
			addtr += '<div><span class="accountName">'+m+'</span></div>';
			addtr += '<div><span>￥</span><span class="accountPrice">'+sum+'</span></div>'	;					
			addtr += '<div class="btn">';
			addtr += '<button class="ms2" style="display: inline-block;"></button>';
			addtr += '<i class="li_acount">'+acount+'</i>';
			addtr += '<button class="ad2"></button>';
			addtr += '<i class="price" style="display: none;">'+price+'</i>';
			addtr += '</div>';						
			addtr += '</li>';						
			$(".list-content ul").append(addtr);
			return;
		}else{          
			$(".list-content ul li").each(function(){
				if ($(this).find("span.accountName").html() == m) {
					var count = parseInt($(this).find(".li_acount").html());
					count = parseInt(num);
					$(this).find(".li_acount").html(count); //对商品的数量进行重新赋值
					$(this).find(".accountPrice").html((count*price).toFixed(2));//对商品的价格进行重新赋值
					flag = true;
					return false;
				}else {
					flag = false;
				}
			})
		}
		//如果为默认值也就是说里面没有此商品，所以添加此商品。
		if (flag == false) {
			var addtr = '<li class="food">';
			addtr += '<div><span class="accountName">'+m+'</span></div>';
			addtr += '<div><span>￥</span><span class="accountPrice">'+sum+'</span></div>'	;					
			addtr += '<div class="btn">';
			addtr += '<button class="ms2" style="display: inline-block;"></button><i class="li_acount">'+acount+'</i><button class="ad2"></button><i class="price" style="display: none;">'+price+'</i>';
			addtr += '</div>';						
			addtr += '</li>';						
			$(".list-content ul").append(addtr);
		}
	
    });
	$(document).on('click','.minus',function(){
        $('.shopcart-list,.up1').show();
    });

	//购物车 - 加
	$(document).on('click','.ad2',function(){
		var n = parseInt($(this).prev().text())+1;
		$(this).prev().text(n);    //当前商品数量+1
		e.text(n);    //赋值给商品列表的数量
		var p = parseFloat($(this).next().text());    //隐藏的价格
		$(this).parent().prev().children("span.accountPrice").text((p*n).toFixed(2));  //计算该商品规格的总价值
	   
		$("#totalcountshow").text(parseFloat($("#totalcountshow").text())+1);   //总数量＋1
		$("#totalpriceshow").text((parseFloat($("#totalpriceshow").text())+p).toFixed(2));   //总价加上该商品价格
	});
	
	//购物车 - 减
	$(document).on('click','.ms2',function(){
		var e;
		var m = $(this).parent().parent().find(".accountName").text();  //当前商品名字
		var a = parseFloat($(this).siblings(".price").text());  //当前商品单价
		var n = parseInt($(this).next().text())-1;  //当前商品数量
		var s = parseFloat($("#totalpriceshow").text());  //总金额
		var znum=0;
		str_list.set(m,n);
		$(".list-content ul li").each(function(){
			znum = znum + parseInt($(this).find('.li_acount').text());
		})
		znum = znum-1;

			console.log(m);
		$('.right-con ul li').each(function(){
			console.log(11111);
			if(m==$(this).find('h4').text()){
				console.log(2222);
				e=$(this).find('.add').prev();
			}
		})
		if(n == 0){
			$(this).parent().parent().remove();

			e.css("display","none");
            e.prev().css("display","none")

            if(znum==0){
            	$(".up1").hide();
            }
		}
		$(this).next().text(n);
	    e.text(n);    //赋值给商品列表的数量
		$(this).parent().prev().children("span:nth-child(2)").text((a*n).toFixed(2));
		
		$("#totalcountshow").text(parseInt($("#totalcountshow").text())-1);
		$("#totalpriceshow").text((s-a).toFixed(2));
		if(parseFloat($("#totalcountshow").text())==0){
			$(".shopcart-list").hide();
		}
	});

    function jss() {
        var m = $("#totalcountshow").html();
        if (m > 0) {
            $(".right").find("a").removeClass("disable");
        } else {
            $(".right").find("a").addClass("disable");
        }
    };
	
    //选项卡
    $(".con>div").hide();
    $(".con>div:eq(0)").show();
	$(document).on('click','.left-menu li',function(){
        $(this).addClass("active").siblings().removeClass("active");
        var n = $(".left-menu li").index(this);
        $(".left-menu li").index(this);
        $(".con>div").hide();
        $(".con>div:eq("+n+")").show();
    });

    $(".footer>.left").click(function(){
        var content = $(".list-content>ul").html();
        if(content!=""){
            $(".shopcart-list.fold-transition").toggle();
            $(".up1").toggle();
        }
    });

    $(".up1").click(function(){
        $(".up1").hide();
        $(".shopcart-list.fold-transition").hide();
    })
	
	//清空购物车
    $(".empty").click(function(){
        $(".list-content>ul").html("");
        $("#totalcountshow").text("0");
        $("#totalpriceshow").text("0");
        $(".minus").next().text("0");
        $(".minus").hide();
        $(".minus").next().hide();
        $(".shopcart-list").hide();
        $(".up1").hide();
        jss();//改变按钮样式
    });
});
