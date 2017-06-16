///////////////////////////////////////////////////////////////////帮助中心+服务中心
	//各页面左侧导航栏hover效果
	$('.page-commonContent .left li').hover(function(){
		$(this).find('a').css('background','#f3f3f3');
	},function(){
		if(!$(this).hasClass('now')){
			$(this).find('a').css('background','#fff');
		}
	})
	//帮助中心中间图标hover效果
	$('#help-center .problem li').hover(function(){
		$(this).addClass('hover');
		$(this).find('a').css('color','#ed5351');
	},function(){
		$(this).removeClass('hover');
		$(this).find('a').css('color','#747474');
	})
	//价格预览手动切换
	if($('#serviceCentter-price').length>0){
		$("#serviceCentter-price .contents .top ul").on('click','li',function(){
			var index=$(this).index();
			$(this).closest('ul').find('.now').removeClass('now');
			$(this).addClass('now');
			$('.contents .bottom').find('.show').removeClass('show').end().find('div.same').eq(index).addClass('show');
		})
	}
		

	//帮助中心-关于我们节点轮播
	function helpCenterAboutmeL3jd(){
		var mw=$("#helpCenter-aboutme .center .floor.l3 .jdlb .jdlbl li").outerWidth(true);
		var index=$("#helpCenter-aboutme .center .floor.l3 .jdlb .jdlbl li").size();
		$("#helpCenter-aboutme .center .floor.l3 .jdlb .jdlbl ul").width(mw*index);
		var flag=true;



		function move(){
			if(flag){
				flag=false
				$("#helpCenter-aboutme .center .floor.l3 .jdlb .jdlbl ul").animate({left:-mw},10000,function(){
					$(this).find('li').first().insertAfter($("#helpCenter-aboutme .center .floor.l3 .jdlb .jdlbl li:last"));
					$("#helpCenter-aboutme .center .floor.l3 .jdlb .jdlbl ul").css("left",0);
					flag=true;
				})
			}else{
				return;
			}
		}



		function moveback(){
			if(flag){
				flag=false;
				$("#helpCenter-aboutme .center .floor.l3 .jdlb .jdlbl ul").css("left",-mw);
				$("#helpCenter-aboutme .center .floor.l3 .jdlb .jdlbl li").last().insertBefore($("#helpCenter-aboutme .center .floor.l3 .jdlb .jdlbl li:first"));
				$("#helpCenter-aboutme .center .floor.l3 .jdlb .jdlbl ul").animate({left:0},10000,function(){
					flag=true;
				});
			}else{
				return;
			}
		}



		function clickmove(){
			if(flag){
				flag=false;
				$("#helpCenter-aboutme .center .floor.l3 .jdlb .jdlbl ul").animate({left:-mw},function(){
					$(this).find('li').first().insertAfter($("#helpCenter-aboutme .center .floor.l3 .jdlb .jdlbl li:last"));
					$("#helpCenter-aboutme .center .floor.l3 .jdlb .jdlbl ul").css("left",0);
					flag=true;
				})
			}else{
				return;
			}
		}




		function clickmoveback(){
			if(flag){
				flag=false;
				$("#helpCenter-aboutme .center .floor.l3 .jdlb .jdlbl ul").css("left",-mw);
				$("#helpCenter-aboutme .center .floor.l3 .jdlb .jdlbl li").last().insertBefore($("#helpCenter-aboutme .center .floor.l3 .jdlb .jdlbl li:first"));
				$("#helpCenter-aboutme .center .floor.l3 .jdlb .jdlbl ul").animate({left:0},function(){
					flag=true;
				});
			}else{
				return;
			}
		}


		var t=setInterval(move,100);

		$("#helpCenter-aboutme .center .floor.l3 .jdlb").hover(function(){
			clearInterval(t)
			$(this).find('.icon').css("display","block");
		},function(){
			t=setInterval(move,100);
			$(this).find('.icon').css("display","none");
		})


		$("#helpCenter-aboutme .center .floor.l3 .jdlb .icon.move").click(clickmove);
		$("#helpCenter-aboutme .center .floor.l3 .jdlb .icon.back").click(clickmoveback);
			
	}

	helpCenterAboutmeL3jd();

	function helpCenterAboutmeL4jd(){
		var mw=$("#helpCenter-aboutme .center .floor.l4 .jdlb li").outerWidth(true);
		var index=$("#helpCenter-aboutme .center .floor.l4 .jdlb li").size();
		$("#helpCenter-aboutme .center .floor.l4 .jdlb ul").width(mw*index);
		function move(){
			$("#helpCenter-aboutme .center .floor.l4 .jdlb ul").animate({left:-mw},10000,function(){
				$(this).find('li').first().insertAfter($("#helpCenter-aboutme .center .floor.l4 .jdlb li:last"));
				$("#helpCenter-aboutme .center .floor.l4 .jdlb ul").css("left",0);
			})
		}
		var t=setInterval(move,0);
	}
	helpCenterAboutmeL4jd();
	//加入我们效果
function helpCenterAboutmeL5joinus(obj){
	$(function(){
		$('.slide',obj).eq(0).show();
		var h=$('li',obj).eq(2).find('.click').offset().top-
				$('li',obj).eq(0).find('.click').offset().top
		$('.line',obj).css('height',h);
		$('.click',obj).on('click',function(){
			var old_index=$(obj).find('.now').index();
			var new_index=$(this).closest('li').index()
			if(old_index==new_index){
				return
			}
			$(obj).find('.now').removeClass('now').find('.slide').slideUp();
			$(this).closest('li').addClass('now').find('.slide')
				.slideDown(function(){
					t=null
					$('.line',obj).css('height',h);
				});
			clearInterval(t)
			var t=setInterval(function(){
				h=$('li',obj).eq(2).find('.click').offset().top-
					$('li',obj).eq(0).find('.click').offset().top
				$('.line',obj).css('height',h);
			},10)
		})
	})
}
if($('#helpCenter-aboutme .floor.l5 .right').length>0){
	helpCenterAboutmeL5joinus($('#helpCenter-aboutme .floor.l5 .right'))
}
