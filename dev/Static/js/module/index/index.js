/////////////////////////////////////////////////////////////////////////////////首页
	


	//banner
	function banner(obj){
		var now=0;
		var flag=true;
		var num=$(".imgs",obj).length;
		if (window.navigator.userAgent.indexOf("MSIE")>=1){
			$('.btnn ul',obj).width(num*30);
		}
		
		$('.imgs',obj).eq(now).css('left',$(window).width()/2-960);
		$(window).resize(function(){
			$('.imgs',obj).eq(now).css('left',$(window).width()/2-960);
			if (window.navigator.userAgent.indexOf("MSIE")>=1){
				$('.btnn ul',obj).width(num*30);
			}
		})
		$(".btn",obj).eq(0).css("background","#fff");
		function move(){
			if(flag){
				var next=now+1;
				flag=false;
				if(next>=$(".imgs",obj).length){
					next=0;
				}
				$(".imgs",obj).eq(now).animate({"left":$(window).width()/2-2880});
				$(".btn",obj).eq(next).css("background","#fff");
				$(".btn",obj).eq(now).css("background","transparent");
				$(".imgs",obj).eq(next).animate({"left":$(window).width()/2-960},function(){
					$(".imgs",obj).eq(now).css("left",'100%');
					now=next;
					flag=true;
				});
			}else{
				return
			}
		}
		function moveback(){
			if (flag) {
				var next=now-1;
				flag=false;
				if(next<0){
					next=$(".imgs",obj).length-1;
				}
				$(".imgs",obj).eq(next).css("left",$(window).width()/2-2880);
				$(".btn",obj).eq(now).css("background","transparent");
				$(".btn",obj).eq(next).css("background","#fff");
				$(".imgs",obj).eq(now).animate({"left":'100%'});
				$(".imgs",obj).eq(next).animate({"left":$(window).width()/2-960},function(){
					now=next;
					flag=true;
				});
			}else{
				return;
			};
		}
		$(".btn",obj).each(function(index){
			var index=index;
			$(this).mouseover(function(){
				if(flag){
					flag=false;
					if(now!=index){
						$(this).css("background","#fff");
						$(".btn",obj).eq(now).css("background","transparent");
						if(now>index){
							$(".imgs",obj).eq(index).css({"left":$(window).width()/2-2880});
							$(".imgs",obj).eq(now).animate({"left":'100%'});
							$(".imgs",obj).eq(index).animate({"left":$(window).width()/2-960},function(){
								now=index;
								flag=true;
							});
						}else{
							$(".imgs",obj).eq(now).animate({"left":$(window).width()/2-2880});
							$(".imgs",obj).eq(index).animate({"left":$(window).width()/2-960},function(){
								$(".imgs",obj).eq(now).css({"left":'100%'});
								now=index;
								flag=true;
							});
						}
					}else{
						flag=true;
					}
				}
			})
		})
		var t=setInterval(move,2000);
		obj.hover(function(){
			clearInterval(t);
		},function(){
			t=setInterval(move,2000);
		})
	}
	banner($('#banner .picture'))
	

	//搜索框下模拟复选框
	$('#banner .banner-search ul').on('click','li',function(){
		if(this.className=='show'){
			$(this).removeClass('show')
		}else if(this.className!=='show'){
			$(this).addClass('show');
		}
	})

	//公告栏公告上下滚动效果
	function announcementRolling(obj){
		obj.find('a').eq(0).css('top',0);
		var now=0;
		function move (){
			var next=now+1;
			if(next>obj.find('a').length-1){
				next=0;
			}
			obj.find('a').eq(now).animate({'top':-16},500,function(){
				$(this).css('top','16px');
			});
			obj.find('a').eq(next).animate({'top':0},500);
			now=next;
		}
		var t=setInterval(move,5000);
	}
	$('#notice').find('li').each(function(){
		announcementRolling($(this));
	})
	

	//第一商务滑动效果
	$('#service1 .services li').hover(function(){
		$(this).addClass('shadow');
	},function(){
		$(this).removeClass('shadow');
	})

	//安全、稳定的虚拟主机服务hover效果
	$('#service2 .services').on('mouseenter','.services2-lis',function(){
		$(this).closest('ul').find('.now').removeClass('now');
		$(this).addClass('now');
	})
	// 安全、稳定的虚拟主机服务 滑动效果
	$('#service2 .link').on('click','li',function(){
		var index=$(this).index();
		$(this).closest('ul').find('.show').removeClass('show');
		$(this).addClass('show');
		$('#service2 .services').find('ul.box-ul.show').removeClass('show');
		$('#service2 .services').find('ul.box-ul').eq(index).addClass('show');
	})

	//footer鼠标移入显示二维码图标
	$(".footer .service-lis li:last dd a").on('mouseenter',function(){
		$(this).closest('dl').find('.show').removeClass('show');
		$(this).closest('dd').addClass('show');
		var index=$(this).parent().index()-1;
		$(this).closest('.last').find('.show-hide-icon.show').removeClass('show');
		$(this).closest('.last').find('.show-hide-icon').eq(index).addClass('show');
	})


	//返回顶部
	$('#fixed').on('click','.backtop',function(){
		$('html,body').animate({"scrollTop":0});
	})
	if($(window).scrollTop()>580){
		$('#fixed').css('display','block');
	}else{
		$('#fixed').css('display','none');
	}