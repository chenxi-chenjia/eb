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
	function helpCenterAboutmeL5joinus(){
		var datalist=[];
		var obj=$("#helpCenter-aboutme .center .floor.l5 .content .right");
		
		$('li .slide',obj).css('display','none');
		$('li:first .slide',obj).css('display','block');


		function lih(index){
			var lih=0;
			
			$('li',obj).each(function(i,v){
				if(i<$('li',obj).size()-1){
					lih=lih+$(this).outerHeight(true);
				}
				datalist.push($(this).find('.slide').height());
			})
			$('.line',obj).css('height',lih+23);
		}
		lih(0);
		
		$('li',obj).on('click',function(){
			var index1=$(this).closest('ul').find('.now').index();
			var index=$(this).index();
			if (window.navigator.userAgent.indexOf("MSIE")>=1){
				$(this).closest('ul').find('.now').removeClass('now').find('.slide').css('display','none');
				$(this).addClass('now').find('.slide').css('display','block');
				var lh=0;
				$('li',obj).each(function(i,v){
					if(i<$('li',obj).size()-1){
						lh=lh+$(v).outerHeight(true);
					}
				})
				$('.line',obj).css('height',lh+23);
			}else{
				if(index!==index1){
					$(this).closest('ul').find('.now').removeClass('now');
					$(this).addClass('now');
					$('li',obj).eq(index1).find('.slide').slideUp();
					$(this).find('.slide').slideDown();
					if(index===$(this).closest('ul').find('li').size()-1){
						var lih=($(this).closest('ul').find('li').size()-1)*76;
					}else{
						var lh=datalist[index];
						var lih=($(this).closest('ul').find('li').size()-1)*76+lh;
					}
					$('.line',obj).animate({'height':lih});
				}
			}
		})

	}
	helpCenterAboutmeL5joinus();