$(function(){
	
/////////////////////////////////////////////////////////////////////////////////首页
	//首页导航栏跟随效果
	$(window).scroll(function(){
		if($(window).scrollTop()>30){
			$('#shouye-nav').css({'position':'fixed','box-shadow':'0 2px 10px #ccc','top':0});
		}else{
			$('#shouye-nav').css({'position':'absolute','box-shadow':'none','top':30});
		}


		// 右边显示栏
		if($(window).scrollTop()>580){
			$('#fixed').css('display','block');
		}else{
			$('#fixed').css('display','none');
		}
	})
	if($(window).scrollTop()>30){
		$('#shouye-nav').css({'position':'fixed','box-shadow':'0 2px 10px #ccc','top':0});
	}else{
		$('#shouye-nav').css({'position':'absolute','box-shadow':'none','top':30});
	}


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
		var mx=250*index;
		$('#service2 .service-lis').find('.show-line').animate({'left':mx},250)
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
		$("body").animate({scrollTop:0});
		if (window.navigator.userAgent.indexOf("MSIE")>=1){
			document.documentElement.scrollTop=0;
		}
	})
	if($(window).scrollTop()>580){
		$('#fixed').css('display','block');
	}else{
		$('#fixed').css('display','none');
	}


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
	$("#serviceCentter-price .contents .top ul").on('click','li',function(){
		$(this).closest('ul').find('.now').removeClass('now');
		$(this).addClass('now');
	})

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




/////////////////////////////////////////////////////////////////////////////虚拟主机
	//虚拟主机首页上半部hover效果；
	function virtualHomepageshang(){
		$('#virtual-homepage .floor-box .classify-lis').hover(function(){
			$(this).addClass('show');
		},function(){
			$(this).removeClass('show');
		})
	}
	virtualHomepageshang();
	//虚拟主机首页技术参数拼线框
	function virtualHomepageLine(obj){
		
		//数据库高度
		var databaseHW=0;
		$('.database',obj).each(function(i,v){
			if($(v).height()>databaseHW){
				databaseHW=$(v).height();
			}
		})
		$('.database',obj).height(databaseHW);
		$('.t1 .database',obj).css('lineHeight',databaseHW+'px');
		//支持语言高度
		var languageHW=0;
		$('.support-language',obj).each(function(i,v){
			if($(v).height()>languageHW){
				languageHW=$(v).height();
			}
		})
		//价格高度
		var priseHW=0;
		$(' .prise',obj).each(function(i,v){
			if($(v).outerHeight()>priseHW){
				priseHW=$(v).outerHeight();
			}
		})
		$('.prise:first',obj).outerHeight(priseHW+1).css('lineHeight',priseHW+1-30+'px');
		if (window.navigator.userAgent.indexOf("MSIE")>=1){
			$('.prise:first',obj).css({'height':"77px",'lineHeight':"77px"})
		}
		
		


		$('.support-language',obj).height(languageHW);
		$('.t1 .support-language',obj).css('lineHeight',languageHW+'px');
		//最后一个线框
		//hover 效果
		$('.obtain',obj).hover(function(){
			$(this).addClass('hover');
		},function(){
			$(this).removeClass('hover');
		})
		//楼层跳转
		var boss=$('#virtual-homepage .floor-box .f3');
		var bosstop=boss.offset().top;
		var t2=$('#virtual-homepage .floor-box .f3 .jscs').offset().top-120;
		var t3=$('#virtual-homepage .floor-box .f3 .cjwt').offset().top-120;
		var t4=$('.footer').offset().top-120;
		$(window).scroll(function(){
			if($(window).scrollTop()>=bosstop){
				$('.fixbox',boss).css({'position':'fixed','top':0,'left':0,'width':'100%','zIndex':20});
			}else{
				$('.fixbox',boss).css('position','static');
			}
			if($(window).scrollTop()>=t2){
				$('#virtual-homepage .floor-box .f3 .top .fixbox ul').find('.now').removeClass('now').end().find('li').eq(1).addClass('now');
			}else{
				$('#virtual-homepage .floor-box .f3 .top .fixbox ul').find('.now').removeClass('now').end().find('li').eq(0).addClass('now');
			}
			if($(window).scrollTop()>=t3){
				$('#virtual-homepage .floor-box .f3 .top .fixbox ul').find('.now').removeClass('now').end().find('li').eq(2).addClass('now');
			}
			if($(window).scrollTop()>=t4){
				$('.fixbox',boss).css('position','static');
			}
		})
		boss.on('click','.top .f3-nav',function(){
			var index=$(this).index();
			if(index==0){
				$('body,html').animate({'scrollTop':bosstop});
			}else if(index==1){
				$('body,html').animate({'scrollTop':t2});
			}else if(index==2){
				$('body,html').animate({'scrollTop':t3});
			}
			
		})
		
	}
	var obj=$('#virtual-homepage .floor-box .f3 .nav-list.jscs .tiny-box');
	if(obj.length>0){
		virtualHomepageLine(obj);
	}


	//虚拟主机购买页面数据绑定
	function virtual_buypage(obj){
		//模拟数据
		var data=[
			{
				productName:'ASP虚拟主机',
				size:['100M','300M','500M','1000M','3000M','5000M'],
				discribe:{
					a:{total:'支持语言：',bind:'HTML、ASP'},
					b:{total:'数据库：',bind:'支持常见类型的数据库'},
					c:{total:'机房线路：',bind:'杭州双线机房'},
					d:{total:'IIS连接数：',bind:'100'},
					e:{total:'月流量：', bind:'5G'},
					f:{total:'服务器IP地址：',bind:'2个'},
					g:{total:'备案：',bind:'免费备案'},
					h:{total:'防火墙：',bind:'4G金盾赢家你防火墙'},
					i:{total:'域名绑定：',bind:'可自由邦洞20个域名(含中英文)，赠送6464.cn为后缀的三级域名'},
					j:{total:'支持组件：',bind:'ADODB基本组件,FilesystemObjetct,Jmail,ASPJpeg,ASPUpload,UrlRewrite,Dictionary'}
				},
				prise:['150','180','200','300','500','650']
			},
			{
				productName:'PHP虚拟主机',
				size:['200M','250M','300M','400M','500M','600M'],
				discribe:{
					a:{total:'支持语言：',bind:'HTML、ASP'},
					b:{total:'数据库：',bind:'支持常见类型的数据库'},
					c:{total:'机房线路：',bind:'杭州双线机房'},
					d:{total:'IIS连接数：',bind:'100'},
					e:{total:'月流量：', bind:'5G'},
					f:{total:'服务器IP地址：',bind:'2个'},
					g:{total:'备案：',bind:'免费备案'},
					h:{total:'防火墙：',bind:'4G金盾赢家你防火墙'},
					i:{total:'域名绑定：',bind:'可自由邦洞20个域名(含中英文)，赠送6464.cn为后缀的三级域名'},
					j:{total:'支持组件：',bind:'ADODB基本组件,FilesystemObjetct,Jmail,ASPJpeg,ASPUpload,UrlRewrite,Dictionary'}
				},
				prise:['200','250','300','350','400']
			},
			{
				productName:'.NET虚拟主机',
				size:['150M','200M','250M','300M','350M','400M'],
				discribe:{
					a:{total:'支持语言：',bind:'HTML、ASP'},
					b:{total:'数据库：',bind:'支持常见类型的数据库'},
					c:{total:'机房线路：',bind:'杭州双线机房'},
					d:{total:'IIS连接数：',bind:'100'},
					e:{total:'月流量：', bind:'5G'},
					f:{total:'服务器IP地址：',bind:'2个'},
					g:{total:'备案：',bind:'免费备案'},
					h:{total:'防火墙：',bind:'4G金盾赢家你防火墙'},
					i:{total:'域名绑定：',bind:'可自由邦洞20个域名(含中英文)，赠送6464.cn为后缀的三级域名'},
					j:{total:'支持组件：',bind:'ADODB基本组件,FilesystemObjetct,Jmail,ASPJpeg,ASPUpload,UrlRewrite,Dictionary'}
				},
				prise:['250','300','350','400','450']
			},
			{
				productName:'LINUX虚拟主机',
				size:['250M','300M','350M','400M','450M','500M'],
				discribe:{
					a:{total:'支持语言：',bind:'HTML、ASP'},
					b:{total:'数据库：',bind:'支持常见类型的数据库'},
					c:{total:'机房线路：',bind:'杭州双线机房'},
					d:{total:'IIS连接数：',bind:'100'},
					e:{total:'月流量：', bind:'5G'},
					f:{total:'服务器IP地址：',bind:'2个'},
					g:{total:'备案：',bind:'免费备案'},
					h:{total:'防火墙：',bind:'4G金盾赢家你防火墙'},
					i:{total:'域名绑定：',bind:'可自由邦洞20个域名(含中英文)，赠送6464.cn为后缀的三级域名'},
					j:{total:'支持组件：',bind:'ADODB基本组件,FilesystemObjetct,Jmail,ASPJpeg,ASPUpload,UrlRewrite,Dictionary'}
				},
				prise:['300','350','400','450','500']
			}
		];
		var data2=[
			{
				productName:'MSSQL',
				size:['50M','100M','200M','300M','500M','1000M'],
				discribe:{
					a:{total:'机房：',bind:'杭州双线'},
					b:{total:'操作系统：',bind:'window'},
					c:{total:'MYSQL版本：',bind:'MYSQL5.1'}
				},
				prise:['150','200','250','300','350']
			},
			{
				productName:'MSSQL',
				size:['100M','150M','200M','250M','300M','350M'],
				discribe:{
					a:{total:'机房：',bind:'杭州双线'},
					b:{total:'操作系统：',bind:'LINUX'},
					c:{total:'MYSQL版本：',bind:'MYSQL5.1'}
				},
				prise:['300','400','500','600','700']
			},
			{
				productName:'海外MSSQL',
				size:['50M','100M','200M','300M','500M','1000M'],
				discribe:{
					a:{total:'机房：',bind:'杭州双线'},
					b:{total:'操作系统：',bind:'LINUX'},
					c:{total:'MYSQL版本：',bind:'MYSQL5.1'}
				},
				prise:['200','300','400','500','600']
			},
			{
				productName:'海外MSSQL',
				size:['100M','150M','200M','250M','300M','350M'],
				discribe:{
					a:{total:'机房：',bind:'杭州双线'},
					b:{total:'操作系统：',bind:'LINUX'},
					c:{total:'MYSQL版本：',bind:'MYSQL5.1'}
				},
				prise:['400','500','600','700','800']
			}
		];
		// 定义用户选择
		var user={
			name:0,
			size:0,
			ftpzh:'',
			ftpmm:'',
			yearline:0,
			reader:true
		};
		//随页面滚动数据
		var mh,mgMh,maxt;
		// 产品名渲染
		function productName(data,obj,user){
			var arr=new Array;
			$.each(data,function(i,v){
				arr.push(v.productName);
			})

			var father=obj.find('.product-nameBox');
			obj.find('h4').text('产品名：');
			rander.grid(arr,father);
			father.find('div').addClass('fl-same-lis').eq(user.name).addClass('bingo');
		}

		//主机容量渲染
		function size(data,obj,user){
			obj.find('h4').text('主机容量：');
			var father=obj.find('.engine-capacityBox');
			rander.grid(data.size,father);
			father.find('div').addClass('fl-same-lis').eq(user.size).addClass('bingo');
		}

		//产品基础配置渲染
		function basic(data,obj,user){
			rander.base(data,obj);

			obj.find('div').each(function(i,v){
				$(v).addClass('fl');
				if(i<8){
					$(v).css('width','50%');
				}else{
					$(v).css('width','100%');
				}
			})
		}

		//根据用户选择改变渲染
		function ur(data,user){
			var namenum=user.name;
			var sizenum=user.size;
			var timenum=user.yearline;
			productName(data,$('.form-left-top .product-name',obj),user);
			size(data[namenum],$('.form-left-top .engine-capacity',obj),user);
			basic(data[namenum].discribe,$('.form-left-top .product-discribe',obj),user);
			$('.form-left-bottom .yearBox').find('.bingo').removeClass('bingo').end().find('.time').eq(timenum).addClass('bingo');
			var userchose=new Object;
			var year=timenum+1;
			var prise=year*data[namenum].prise[sizenum];
			if($('.tab',obj).find('.now').index()<3){
				var jf=data[namenum].discribe.c.bind+'(IP'+data[namenum].discribe.d.bind+')'
				userchose={
					a:{total:'产品名：',bind:data[namenum].productName},
					b:{total:'主机容量：',bind:data[namenum].size[sizenum]},
					c:{total:'月流量：',bind:data[namenum].discribe.e.bind},
					d:{total:'机房：',bind:jf},
					e:{total:'免费赠送：',bind:'标准邮局200M(2用户)'},
					f:{total:'年限：',bind:year+'年'},
					f:{total:'配置费用：',bind:prise+'元'}
				}
			}else{
				userchose={
					a:{total:'产品名：',bind:data[namenum].productName},
					b:{total:'数据库大小：',bind:data[namenum].size[sizenum]},
					c:{total:'机房：',bind:data[namenum].discribe.a.bind},
					d:{total:'操作系统：',bind:data[namenum].discribe.b.bind},
					e:{total:'MYSQL版本：',bind:data[namenum].discribe.c.bind},
					f:{total:'购买年限：',bind:year+'年'},
					f:{total:'配置费用：',bind:prise+'元'}
				}
				$('.form-right',obj).find('h2').text('已选数据库规格');
				$('.product-discribe',obj).find('div').css('width','33.33333%');
			}
			rander.base(userchose,$('.form-right .pz',obj));
			$('.form-right .pz',obj).find('div').addClass('pzlis');
			$('.form-right .pz',obj).find('div').eq(5).addClass('prise');
		}
		ur(data,user);

		//tab切换
		function tab(){
			$('.tab',obj).on('click','li',function(){
				$(this).parent().find('.now').removeClass('now');
				$(this).addClass('now');
				user={
					name:0,
					size:0,
					ftpzh:'',
					ftpmm:'',
					yearline:0,
					reader:true
				};
				var index=$(this).index();
				if(index<3){
					ur(data,user)
					mh=$('.form-right',obj).offset().top;
					mgMh=$('.buybox',obj).height()-$('.form-right',obj).outerHeight();
					maxt=mh+mgMh;
				}else{
					ur(data2,user)
					mh=$('.form-right',obj).offset().top;
					mgMh=$('.buybox',obj).height()-$('.form-right',obj).outerHeight();
					maxt=mh+mgMh;
				}
				
				
			})
		}
		tab();
		//产品名切换
		function nametab(){
			$('.checkout-information .product-nameBox',obj).on('click','.fl-same-lis',function(){
				$(this).parent().find('.bingo').removeClass('bingo');
				$(this).addClass('bingo');
				var index=$(this).index();
				user.name=index;
				if($('.tab',obj).find('.now').index()<3){
					ur(data,user)
				}else{
					ur(data2,user)
				}
				
			})
		}
		nametab();
		//主机容量切换
		function sizetab(){
			$('.checkout-information .engine-capacityBox',obj).on('click','.fl-same-lis',function(){
				$(this).parent().find('.bingo').removeClass('bingo');
				$(this).addClass('bingo');
				var index=$(this).index();
				user.size=index;
				if($('.tab',obj).find('.now').index()<3){
					ur(data,user)
				}else{
					ur(data2,user)
				}
			})
		}
		sizetab();
		//购买年限切换
		function yeartab(){
			$('.form-left-bottom .yearBox',obj).on('click','.time',function(){
				$(this).parent().find('.bingo').removeClass('bingo');
				$(this).addClass('bingo');
				var index=$(this).index();
				user.yearline=index;
				if($('.tab',obj).find('.now').index()<3){
					ur(data,user)
				}else{
					ur(data2,user)
				}
			})
		}
		yeartab();



		//输入框正则验证
		$('.form-left-middle .ftpzh',obj).on('blur','input',function(){
			var val=$(this).val();
			var father=$(this).parent();
			if(val){
				var reg=/^[A-Za-z][A-Za-z0-9]{5,15}/;
				if(!reg.test(val)){
					$('p',father).text('请输入正确的FTP账号').addClass('default');
				}else{
					$('p',father).text('').removeClass('default');
					user.ftpzh=val;
				}
			}
		})
		$('.form-left-middle .ftpmm',obj).on('blur','input',function(){
			var val=$(this).val();
			var father=$(this).parent();
			if(val){
				var reg=/[A-Za-z0-9_]{6,16}/;
				if(!reg.test(val)){
					$('p',father).text('请输入正确形式的密码').addClass('default');
				}else{
					$('p',father).text('').removeClass('default');
					user.ftpmm=val;
				}
			}
		})

		$('.form-right .terms',obj).on('click','.kuang',function(){
			var flag=$(this).attr('value');
			if(flag=='true'){
				flag=false;
				user.reader=flag;
				$(this).removeClass('checked').attr('value',flag);

			}else{
				flag=true;
				user.reader=flag;
				$(this).addClass('checked').attr('value',flag);
			}
			
		})



		// hover效果
		$('.form-left-same',obj).hover(function(){
			$('.form-title',this).css('background','#dd2726').find('p').css('color','#fff');
		},function(){
			$('.form-title',this).css('background','#f7f7f7').find('p').css('color','#999');
		})
		/////////////////////////////////////////////////////////////////
		
		mh=$('.form-right',obj).offset().top;
		mgMh=$('.buybox',obj).outerHeight()-$('.form-right',obj).outerHeight();
		maxt=mh+mgMh;
		$(window).scroll(function(){
			if($(window).scrollTop()<mh){
				$('.form-right',obj).css('top',0);
			}else if($(window).scrollTop()>=mh&&$(window).scrollTop()<maxt){
				$('.form-right',obj).css('top',$(window).scrollTop()-mh);
			}else if($(window).scrollTop()>maxt){
				$('.form-right',obj).css('top',mgMh);
			}
		})
		
	}

	if($('#virtual-buypage .buy-form').length>0){
		virtual_buypage($('#virtual-buypage .buy-form'));
	}



////////////////////////////////////////////////////////////////////////////邮局
	//购买页面数据绑定
	function postoffice(obj){
		//构建数据
		var data=[
			{
				name:'标准企业邮局',
				pop:['10','20','30','50','100','200','300','500'],
				time:['1年','2年','3年','4年','5年'],
				room:['双线机房'],
				prise:['150','300','450','650','1500','3000','4500','7500']
			},
			{
				name:'外邮邮局',
				pop:['102','203','301','504','1001','2003','3002','5001'],
				time:['1年','2年','3年','4年','5年'],
				room:['双线机房'],
				prise:['200','3001','4503','6501','15003','30001','45003','75001']
			},
			{
				name:'集团邮局',
				pop:['101','202','302','503','1002','2002','3001','5002'],
				time:['1年','2年','3年','4年','5年'],
				room:['双线机房'],
				prise:['300','3002','4502','6502','15002','30002','45002','75002']
			},
			{
				name:'云邮G邮局',
				pop:['103','201','303','501','1003','2001','3003','5003'],
				time:['1年','2年','3年','4年','5年'],
				room:['双线机房'],
				prise:['400','3003','4501','6503','15001','30003','45001','75003']
			}
		];
		//用户选购
		var user={
			name:0,
			pop:0,
			time:0,
			em:'',
			pw:'',
			room:0
		}


		// 类型渲染
		function name(data,obj){
			var arr=new Array;
			$.each(data,function(i,v){
				arr.push(v.name);
			})
			var father=obj.find('.type .lis-box-same');
			rander.grid(arr,father);
			father.find('div').addClass('lis').eq(user.name).addClass('bingo');
		}

		//用户数渲染
		function pop(data,obj){
			var father=obj.find('.popnum .lis-box-same');
			rander.grid(data,father);
			father.find('div').addClass('lis').eq(user.pop).addClass('bingo');
		}

		//年限渲染
		function time(data,obj){
			var father=obj.find('.yearline .lis-box-same');
			rander.grid(data,father);
			father.find('div').addClass('lis').eq(user.time).addClass('bingo');
		}

		//机房渲染
		function room(data,obj){
			var father=obj.find('.room .lis-box-same');
			rander.grid(data,father);
			father.find('div').addClass('lis').eq(user.room).addClass('bingo');
		}



		//根据用户选择改变渲染
		function ur(data,user){
			var nn=user.name;
			var pn=user.pop;
			var tn=user.time;
			var rn=user.room;

			//配置框渲染
			name(data,$('.form-left',obj));
			pop(data[nn].pop,$('.form-left',obj));
			time(data[nn].time,$('.form-left',obj));
			room(data[nn].room,$('.form-left',obj));



			var userchose=new Object;
			var year=tn+1;
			var prise=year*data[nn].prise[pn];
			var em=user.em===''?'eb.com.cn':user.em;
			userchose={
				a:{total:'类型：',bind:data[nn].name},
				b:{total:'用户数：',bind:data[nn].pop[pn]},
				c:{total:'购买年限：',bind:year+'年'},
				d:{total:'邮箱域名：',bind:em},
				e:{total:'容量：',bind:'100M'},
				f:{total:'费用总计：',bind:prise+'元'}
			}
			
			rander.base(userchose,$('.form-right .pz',obj));
			$('.form-right .pz',obj).find('div').addClass('pzlis');
			$('.form-right .pz',obj).find('div').eq(5).addClass('prise');
		}
		ur(data,user);

		// 邮局类型选择
		$('.type',obj).on('click','.lis',function(){
			var index=$(this).index();
			user.name=index;
			ur(data,user);
		})
		//用户数选择
		$('.popnum',obj).on('click','.lis',function(){
			var index=$(this).index();
			user.pop=index;
			ur(data,user);
		})
		//年限选择
		$('.yearline',obj).on('click','.lis',function(){
			var index=$(this).index();
			user.time=index;
			ur(data,user);
		})


		//输入框正则验证
		$('.form-left .email',obj).on('blur','input',function(){
			var val=$(this).val();
			var father=$(this).parent();
			if(val){
				var reg=/^(?=^.{3,255}$)[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+$/;
				if(!reg.test(val)){
					$('p',father).text('请输入正确的域名');
				}else{
					$('p',father).text('');
					user.ftpzh=val;
				}
			}
		})
		$('.form-left .password',obj).on('blur','input',function(){
			var val=$(this).val();
			var father=$(this).parent();
			if(val){
				var reg=/\S{5,15}/;
				if(!reg.test(val)){
					$('p',father).text('请输入正确形式的密码').addClass('default');
				}else{
					$('p',father).text('').removeClass('default');
					user.ftpmm=val;
				}
			}
		})

		$('.form-right .terms',obj).on('click','.kuang',function(){
			var flag=$(this).attr('value');
			if(flag=='true'){
				flag=false;
				user.reader=flag;
				$(this).removeClass('checked').attr('value',flag);

			}else{
				flag=true;
				user.reader=flag;
				$(this).addClass('checked').attr('value',flag);
			}
			
		})


	}
	if($('#postOffice-buypage').length>0){
		postoffice($('#postOffice-buypage'))
	}


	//邮局主页效果
	$('#postOffice-homepage .top li').hover(function(){
		$(this).addClass('hover');
	},function(){
		$(this).removeClass('hover');
	})
	

////////////////////////////////////////////////////////////////////////////云服务器
	//购买页
	function cloudServer_buypage(obj){
		var data={
			type:['入门型','标准型','商务型','舒适型','企业型','豪华型'],
			cpu:['1核','2核','4核','8核','16核'],
			memory:['1GB','2GB','4GB','8GB'],
			network:['北京BGP','辽宁BJP','香港BGP'],
			protect:['5G(免费)','6G','7G','8G','10G','15G','25G','35G','55G','105G','205G'],
			protecttime:['1个月','2个月','3个月','4个月','5个月','6个月','7个月','8个月','9个月','1年','2年','3年'],
			prise:[100,200,300,400,500,600,700]
		}
		var user={
			type:0,
			cpu:0,
			memory:0,
			disk:10,
			network:0,
			protect:0,
			broadband:1,
			system:'Windows Server 2008 64位 企业版',
			protecttime:0
		}
		//渲染
		function ur(data,user){
			var type=user.type;
			var cpu=user.cpu;
			var mm=user.memory;
			var disk=user.disk;
			var nw=user.network;
			var pt=user.protect;
			var bb=user.broadband;
			var st=user.system;
			var ptt=user.protecttime;
			$('.type',obj).find('.bingo').removeClass('bingo').end().find('.lis').eq(type).addClass('bingo');

			$('.cpu',obj).find('.bingo').removeClass('bingo').prev().removeClass('prev');
			$('.cpu',obj).find('.lis').eq(cpu).addClass('bingo').prev().addClass('prev');

			$('.memory',obj).find('.bingo').removeClass('bingo').prev().removeClass('prev');
			$('.memory',obj).find('.lis').eq(mm).addClass('bingo').prev().addClass('prev');

			$('.network',obj).find('.bingo').removeClass('bingo').prev().removeClass('prev');
			$('.network',obj).find('.lis').eq(nw).addClass('bingo').prev().addClass('prev');

			$('.protect',obj).find('.bingo').removeClass('bingo').prev().removeClass('prev');
			$('.protect',obj).find('.lis').eq(pt).addClass('bingo').prev().addClass('prev');

			$('.protect-time',obj).find('.bingo').removeClass('bingo').prev().removeClass('prev');
			$('.protect-time',obj).find('.lis').eq(ptt).addClass('bingo').prev().addClass('prev');
			//拖动条
			// 磁盘
			var left=0;
			if(disk>=10&&disk<250){
				left=((disk-10)/240)*110
			}else if(disk>=250&&disk<500){
				left=((disk-250)/240)*110+110;
			}else if(disk>=500&&disk<=1000){
				left=((disk-500)/500)*110+220;
			}
			$('.disk',obj).find('input').val(disk);
			$('.disk',obj).find('.point').css('left',left-12).end().find('.mask').css('width',left);
			//宽带
			var bl=((bb-1)/(300-1))*(330);
			$('.broadband',obj).find('.point').css('left',bl-12).end().find('.mask').css('width',bl);
			$('.broadband',obj).find('input').val(bb);

			//右边框渲染
			var uc={
				a:{total:'CPU：',bind:data.cpu[cpu]},
				b:{total:'内存：',bind:data.memory[mm]},
				c:{total:'磁盘：',bind:disk+'GB'},
				d:{total:'网络：',bind:data.network[nw].substring(0,2)},
				e:{total:'网络防护：',bind:data.protect[pt].substring(0,2)},
				f:{total:'带宽：',bind:bb+'Mbps'},
				g:{total:'操作系统：',bind:st},
				h:{total:'时长：',bind:data.protecttime[ptt]},
				i:{total:'费用：',bind:data.prise[0]}
				
			}
			rander.base(uc,$('.form-right .pz',obj));
			$('.form-right .pz',obj).find('div').addClass('pzlis');
			$('.form-right .pz',obj).find('div').eq(8).addClass('prise');
			$('.form-right .pz',obj).find('div').eq(6).addClass('system');
		}
		ur(data,user);

		$('.type',obj).on('click','.lis',function(){
			var index=$(this).index();
			user.type=index;
			ur(data,user);
		});
		$('.cpu',obj).on('click','.lis',function(){
			var index=$(this).index();
			user.cpu=index;
			ur(data,user);
		});
		$('.memory',obj).on('click','.lis',function(){
			var index=$(this).index();
			user.memory=index;
			ur(data,user);
		});
		$('.network',obj).on('click','.lis',function(){
			var index=$(this).index();
			user.network=index;
			ur(data,user);
		});

		$('.protect .frd:first',obj).on('click',' .lis',function(){
			var index=$(this).index();
			user.protect=index;
			ur(data,user);
		});
		$('.protect .frd:last',obj).on('click',' .lis',function(){
			var index=$(this).index()+6;
			user.protect=index;
			ur(data,user);
		});

		$('.protect-time .frd:first',obj).on('click','.lis',function(){
			var index=$(this).index();
			user.protecttime=index;
			ur(data,user);
		});
		$('.protect-time .frd:last',obj).on('click','.lis',function(){
			var index=$(this).index()+6;
			user.protecttime=index;
			ur(data,user);
		});
		$('.system',obj).on('change','select',function(){
			var val=this.value;
			user.system=val;
			ur(data,user);
		});
		//磁盘
		$('.disk',obj).on('mousedown','.article',function(e){
			var that=this;
			var mw=e.clientX-$(that).offset().left;
				var num=10;
				if(mw>0&&mw<110){
					num=240/110*mw+10;
				}else if(mw>=110&&mw<220){
					num=250/110*(mw-110)+250;
				}else if(mw>=220&&mw<=330){
					num=500/110*(mw-220)+500;
				}else if(mw<0){
					num=10
				}else if(mw>330){
					num=1000;
				}
				num=Math.ceil(num/10)*10;
				
				user.disk=num;
				ur(data,user);
			$(document).on('mousemove',function(e){
				var mw=e.clientX-$(that).offset().left;
				var num=10;
				if(mw>0&&mw<110){
					num=240/110*mw+10;
				}else if(mw>=110&&mw<220){
					num=250/110*(mw-110)+250;
				}else if(mw>=220&&mw<=330){
					num=500/110*(mw-220)+500;
				}else if(mw<0){
					num=10
				}else if(mw>330){
					num=1000;
				}
				num=Math.ceil(num/10)*10;
				
				user.disk=num;
				ur(data,user);
			})
			return false;	
		})
		$('.disk',obj).on('mousedown','.point',function(e){
			var that=this;
			$(document).on('mousemove',function(e){
				var mw=e.clientX-$(that).offset().left;
				var num=10;
				if(mw>0&&mw<110){
					num=240/110*mw+10;
				}else if(mw>=110&&mw<220){
					num=250/110*(mw-110)+250;
				}else if(mw>=220&&mw<=330){
					num=500/110*(mw-220)+500;
				}else if(mw<0){
					num=10
				}else if(mw>330){
					num=1000;
				}
				num=Math.ceil(num/10)*10;
				
				user.disk=num;
				ur(data,user);
			})
		})
		$(document).on('mouseup',function(e){
			$(document).unbind('mousemove');
		})
		$('.disk',obj).on('change','input',function(e){
			var val=$(this).val();
			var num=10;
			var reg=/^[0-9]/;
			if(reg.test(val)){
				num=parseInt(val);
				if(num<10){
					num=10;
				}else if(num>=10&&num<=1000){
					num=Math.ceil(num/10)*10;
				}else if(num>1000){
					num=1000;
				}
			}else{
				num=10;
			}
			
			$(this).val(num);
			user.disk=num;
			ur(data,user);
		})
		$('.broadband',obj).on('change','input',function(e){
			var val=$(this).val();
			var num=1;
			var reg=/^[0-9]/;
			if(reg.test(val)){
				num=parseInt(val);
				if(num<1){
					num=1;
				}else if(num>=1&&num<=300){
					num=Math.ceil(num);
				}else if(num>300){
					num=300;
				}
			}else{
				num=1;
			}
			$(this).val(num);
			user.broadband=num;
			ur(data,user);
		})

		//宽带
		$('.broadband',obj).on('mousedown','.article',function(e){
			var that=this;
			var mw=e.clientX-$(that).offset().left;
			var num=1;
			if(mw>=0&&mw<=330){
				num=mw/330*299;
			}else if(mw<0){
				num=1;
			}else if(mw>330){
				num=300;
			}
			num=Math.ceil(num);
			
			user.broadband=num;
			ur(data,user);
			$(document).on('mousemove',function(e){
				var mw=e.clientX-$(that).offset().left;
				var num=1;
				if(mw>=0&&mw<=330){
					num=mw/330*299;
				}else if(mw<0){
					num=1;
				}else if(mw>330){
					num=300;
				}
				num=Math.ceil(num);
			
				
				user.broadband=num;
				ur(data,user);
			})
			return false;
		})
		$('.broadband',obj).on('mousedown','.point',function(e){
			var that=this;
			$(document).on('mousemove',function(e){
				var mw=e.clientX-$(that).offset().left;
				var num=1;
				if(mw>=0&&mw<=330){
					num=mw/330*299;
				}else if(mw<0){
					num=1;
				}else if(mw>330){
					num=300;
				}
				num=Math.ceil(num);
			
				
				user.broadband=num;
				ur(data,user);
			})
		})

		//hover
		$('.fenlei',obj).hover(function(){
			$('.form-title',this).css('background','#dd2726').find('p').css('color','#fff');
		},function(){
			$('.form-title',this).css('background','#f7f7f7').find('p').css('color','#999');
		})

		var mh=$('.form-right',obj).offset().top;
		var mgMh=obj.outerHeight()-$('.form-right',obj).outerHeight();
		var maxt=mh+mgMh;
		$(window).scroll(function(){
			if($(window).scrollTop()<mh){
				$('.form-right',obj).css('top',0);
			}else if($(window).scrollTop()>=mh&&$(window).scrollTop()<maxt){
				$('.form-right',obj).css('top',$(window).scrollTop()-mh);
			}else if($(window).scrollTop()>maxt){
				$('.form-right',obj).css('top',mgMh);
			}
		})

	}
	if($('#cloudServer-buypage').length>0){
		cloudServer_buypage($('#cloudServer-buypage .buybox'))
	}



//////////////////////////////////////////////////////////////////////////增值应用
	//网络移动服务
	function netmoveser(obj){
		var user={
			time:1,

			type:0,
			mc:'',
			idtype:'certificate',
			idnum:'',
			idname:'',
			file:'',

			name:'',
			province:0,
			city:0,
			address:'',
			mobile:'',
			emile:'',

			phone:'',
			fax:'',
			zipcode:''
		}
		//渲染函数
		function ur(user){
			

			
		}
		$('input[name="time"]',obj).closest('li').find('.sub').find('b').css('background','#e4e4e4');
		$('input[name="time"]',obj).on('change',function(){
			var val=$(this).val();
			var num=1;
			var reg=/^[0-9]/;
			$('input[name="time"]',obj).closest('li').find('.sub').find('b').css('background','#e4e4e4');
			if(reg.test(val)){
				num=parseInt(val);
				if(num>1){
					num=Math.ceil(num);
					$('input[name="time"]',obj).closest('li').find('.sub').find('b').css('background','#333');
				}
			}
			$(this).val(num);
		})
		$('input[name="time"]',obj).closest('li').find('.sub').on('click',function(){
			var num=parseInt($('input[name="time"]',obj).val());
			num--;
			if(num<=1){
				num=1;
			$('input[name="time"]',obj).closest('li').find('.sub').find('b').css('background','#e4e4e4');
			}
			$('input[name="time"]',obj).val(num);
		})
		$('input[name="time"]',obj).closest('li').find('.add').on('click',function(){
			var num=parseInt($('input[name="time"]',obj).val());
			num++;
			$('input[name="time"]',obj).val(num);
			$('input[name="time"]',obj).closest('li').find('.sub').find('b').css('background','#333');
		})


		$('.type',obj).find('.bind').on('click',function(){
			$('.type',obj).find('.bingo').removeClass('bingo');
			$(this).addClass('bingo');
		})
		$('input[name="idcard"]').on('change',function(){
			user.mc=$(this).val();
			ur(user)
		})
		$('#subtract').on('change',function(){
			console.log($(this).val());
		})
		//文件上传// upload
		var uploader = new WebUploader.Uploader({
		    swf: './Uploader.swf',
		    pick:'#picker',
		    auto:false,
		    resize: false

		});
		uploader.on('fileQueued',function(file){
			$('#picker').closest('li').find('.filename').text(file.name);
		})

	}
	if($("#application-urlService_form").length>0){
		netmoveser($("#application-urlService_form .form"));
	}

	//增值应用-可信赖网站（表单）
	function trustedSite_form(obj){
		$('.sqcllx',obj).on('click','.bind',function(){
			$(this).closest('.chose-box').find('.bingo').removeClass('bingo');
			$(this).addClass('bingo');
		})
		
		
	}
	if($('#application-trustedSite_form').length>0){
		trustedSite_form($('#application-trustedSite_form .form'));
	}

	//增值应用-QQ内页
	function qq(obj){
		var user={
			type:0,
			package:0,
			popnum:0,
			yearline:1
		}
		function ur(user){
			var type=$('.type').find('.bingo').removeClass('bingo').end().find('.lis').eq(user.type).addClass('bingo').text();
			var package=$('.package').find('.bingo').removeClass('bingo').end().find('.lis').eq(user.package).addClass('bingo').text();
			var popnum=$('.popnum').find('.bingo').removeClass('bingo').end().find('.lis').eq(user.popnum).addClass('bingo').text();
			$('.yearline').find('input').val(user.yearline);
			if(user.yearline>1){
				$('.yearline').find('.sub').find('b').css('background','#333');
			}else{
				$('.yearline').find('.sub').find('b').css('background','#e4e4e4');
			}
			userchose={
				a:{total:'类型：',bind:type},
				b:{total:'套餐：',bind:package},
				c:{total:'工号数：',bind:popnum+'个'},
				d:{total:'购买年限：',bind:user.yearline+'年'},
				e:{total:'费用总计：',bind:user.yearline+'元'}
			}
			
			rander.base(userchose,$('.form-right .pz',obj));
			$('.form-right .pz',obj).find('div').addClass('pzlis');
			$('.form-right .pz',obj).find('div').eq(4).addClass('prise');
		}
		ur(user);
		$('.type').on('click','.lis',function(){
			var index=$(this).index();
			user.type=index;
			ur(user);
		});
		$('.package').on('click','.lis',function(){
			var index=$(this).index();
			user.package=index;
			ur(user);
		});
		$('.popnum').on('click','.lis',function(){
			var index=$(this).index();
			user.popnum=index;
			ur(user);
		});
		$('.yearline').on('change','input',function(){
			var index=$(this).val();
			var reg=/^[0-9]/;
			if(reg.test(index)){
				index=Math.ceil(parseInt(index));
			}else{
				index=1;
			}
			user.yearline=index;
			ur(user);
		})
		$('.yearline').on('click','.add',function(){
			var index=user.yearline;
			index++;
			user.yearline=index;
			ur(user);
		})
		$('.yearline').on('click','.sub',function(){
			var index=user.yearline;
			index--;
			if(index<1){
				index=1;
			}
			user.yearline=index;
			ur(user);
		})
	}
	if($('#application-qq').length>0){
		qq($('#application-qq'));
	}


///////////////////////////////////////////////////////////////////////////租用托管
	function rentescrow(obj){
		$('.top-nav').on('click','.lis',function(){
			var index=$(this).index();
			$(this).closest('.top-nav').find('.show').removeClass('show');
			$(this).addClass('show');
			$('.content').find('.show').removeClass('show').end().find('.blis').eq(index).addClass('show');
		})
		$('.zjzy-box').find('.lis').hover(function(){
			$(this).addClass('hover');
		},function(){
			$(this).removeClass('hover');
		});
		$('.xgzjzy').find('.cp').find('ul').hover(function(){
			$(this).addClass('hover');
		},function(){
			$(this).removeClass('hover');
		});
		$('.zjtg').find('.sjtg-qhbox').find('.lis').hover(function(){
			$(this).addClass('hover');
		},function(){
			$(this).removeClass('hover');
		});
		$('.zjtg').find('.sjtg-navBox').on('click','.sjtg-navlis',function(){
			$(this).closest('.sjtg-nav').find('.sjtg-show').removeClass('sjtg-show');
			var index=$(this).index();
			$(this).addClass('sjtg-show');
			$('.zjtg').find('.sjtg-qhbox').find('.sjtg-show').removeClass('sjtg-show');
			$('.zjtg').find('.sjtg-qhbox').find('.sjtg-qhlis').eq(index).addClass('sjtg-show');
			var mw=$(this).width();
			var mx=$(this).offset().left-$(this).closest('.sjtg-navBox').offset().left;
			console.log(mw,mx)
			$('.zjtg').find('.sjtg-navBox').find('.line').animate({'left':mx,'width':mw});
		})
	}
	if($('#rentescrow').length>0){
		rentescrow($('#rentescrow'));
	}
	
	
///////////////////////////////////////////////////////////////////////////域名注册
	//购物车
	function buycar(){
		//所有数据
		var all=[];
		$('.form').find('.good ul').each(function(i,v){
			var obj={
				id:i,
				md:0,
				time:1,
				prise:$(this).find('li').eq(5).val(),
				check:false
			}
			all.push(obj);
		})
		//render函数
		function render(data){
			var checknum=0;
			var checkprise=0;
			$('.good').empty();
			$.each(data,function(i,v){
				var classname='';
				if(data[i].check){
					classname='check';
				}
				var el=$('<ul class="no-float '+classname+'">\
						<li class="fl checkbox"><span><i class="icon"></i>'+(i+1)+'</span></li>\
						<li class="fl">英文国际域名</li>\
						<li class="fl">域名产品</li>\
						<li class="fl">2233.com</li>\
						<li class="fl">\
							<select name="module">\
								<option value="0">未选择模板</option>\
								<option value="1">选择模板</option>\
							</select>\
						</li>\
						<li class="fl" value="55">55元</li>\
						<li class="fl">\
							<select name="time">\
								<option value="1">1年</option>\
								<option value="2">2年</option>\
								<option value="3">3年</option>\
								<option value="4">4年</option>\
								<option value="5">5年</option>\
							</select>\
						</li>\
						<li class="fl cz">\
							<a href="#">结算</a>\
							<span>删除</span>\
						</li>\
					</ul>')
				el.find('select[name="module"]').find('option').eq(v.md).attr('selected',true);
				el.find('select[name="time"]').find('option').eq(v.time-1).attr('selected',true);
				if(this.check){
					el.addClass('checked');
					checknum++;
					checkprise=checkprise+(parseInt(this.prise)*parseInt(this.time));
				}
				el.appendTo($('.good'));
			})
			if(checknum==data.length){
				$('.operation').find('.allcheck').addClass('checked');
				if(!checknum){
					$('.operation').find('.checked').removeClass('checked');
				}
			}else{
				$('.operation').find('.checked').removeClass('checked');
			}
			$('.title').find('.num').find('b').text(checknum);
			$('.title').find('.prise').find('b').text(checkprise.toFixed(2));
			$('.operation').find('.num').find('b').text(checknum);
			$('.operation').find('.prise').find('b').text(checkprise.toFixed(2));
				
		}
		render(all);
		$('.form').on('click','.checkbox span',function(){
			var index=$(this).closest('ul').index();
			all[index].check=!all[index].check;
			render(all);
		});
		$('.good').on('click','.cz span',function(){
			var index=$(this).closest('ul').index();
			all.splice(index,1);
			render(all);
		});
		$('.operation').on('click','.allcheck',function(){
			var reg=/checked/;
			if(reg.test($(this).attr('class'))){
				$.each(all,function(i,v){
					this.check=false;
				})
			}else{
				$.each(all,function(i,v){
					this.check=true;
				})
			}
			render(all);
		})
		$('.operation').on('click','.delete',function(){
			var newall=new Array;
			$.each(all,function(i,v){
				if(!this.check){
					newall.push(this);
				}
			})
			all=newall;
			render(all);
		})
		$('.operation').on('click','.empty',function(){
			all=[];
			render(all);
		});
		$('.good').on('change','select[name="module"]',function(){
			var index=$(this).closest('ul').index();
			all[index].md=parseInt($(this).val());
			console.log(all)
			render(all);
		})
		$('.good').on('change','select[name="time"]',function(){
			var index=$(this).closest('ul').index();
			all[index].time=parseInt($(this).val());
			render(all);
		})
		$('.supplement').on('click','span',function(){
			$(this).parent().toggleClass('check')
		})

	}
	if($('#domain-buycar').size()>0){
		buycar();
	}

	//单域名查询
	function domain_single(){
		//文本框
		var domian_val=$('.domain-input').val();
		$('.domain-input').blur(function(){
			var val=$(this).val();
			val=$.trim(val);
			if(val){
				$(this).val(val);
			}else{
				$(this).val(domian_val);
			}
			$(this).css('borderColor','#e6e6e6')
		}).focus(function(){
			if($(this).val()==domian_val){
				$(this).val('').css('borderColor','#e2383a');
			}else{
				$(this).css('borderColor','#e2383a');
			}
		})
	}
	if($('#domain-single').length>0){
		domain_single();
	}

	//注册
	function registered (){
		$('.floor2 .read').find('span').on('click',function(){
			$(this).toggleClass('check');
		})
	}
	if($('#domain-registered').size()>0){
		registered ();
	}
	//批量注册
	function batchregistered(){
		$('.floor1 .yms').on('click','span',function(){
			$(this).closest('li').toggleClass('check');
			$('.floor1 .cz').find('.check').removeClass('check');
		})
		$('.floor1 .cz').on('click','span.allcheck',function(){
			$(this).addClass('check');
			$('.floor1 .yms').find('li').addClass('check');
			$('.floor1 .cz').find('.allchecknot.check').removeClass('check');
		})
		$('.floor1 .cz').on('click','span.allchecknot',function(){
			$(this).addClass('check');
			$('.floor1 .yms').find('li.check').removeClass('check');
			$('.floor1 .cz').find('.allcheck.check').removeClass('check');
		})
		//域名价格
		//英文域名类型 type=0，中文 1 ，新顶级 2
		var data=[
			{
				name:'.com',
				type:0,
				describe:'全球注册量第一，注册首选',
				prise:'60',
				last_prise:'(原价60)'
			},{
				name:'.me',
				type:0,
				describe:'代表"自己"，打造个性站点',
				prise:'35',
				last_prise:'(原价80)'
			},{
				name:'.cn',
				type:1,
				describe:'中国企业和个人的互联网标识',
				prise:'35',
				last_prise:'(原价8)'
			},{
				name:'.win',
				type:0,
				describe:'新购/续费/转入促销',
				prise:'80',
				last_prise:'(原价80)'
			},{
				name:'.net',
				type:0,
				describe:'为企业树立全球化商业品牌',
				prise:'80',
				last_prise:'(原价80)'
			},{
				name:'.link',
				type:0,
				describe:'即刻链接世界',
				prise:'150',
				last_prise:''
			},{
				name:'.club',
				type:0,
				describe:'俱乐部、会所专属域名',
				prise:'80',
				last_prise:''
			},{
				name:'.wang',
				type:2,
				describe:'寓意网络，互联网域名首选',
				prise:'46',
				last_prise:''
			},{
				name:'.co',
				type:0,
				describe:'代表公司和商业',
				prise:'230',
				last_prise:''
			},{
				name:'.tv',
				type:0,
				describe:'媒体域名，视频服务首选',
				prise:'80',
				last_prise:''
			},{
				name:'.ltd',
				type:2,
				describe:'有限公司简称，公司专属域名',
				prise:'105',
				last_prise:''
			},{
				name:'.name',
				type:2,
				describe:'个人品牌推广最佳选择',
				prise:'99',
				last_prise:''
			},{
				name:'.cc',
				type:0,
				describe:'简单好记，极具商业潜力',
				prise:'140',
				last_prise:''
			},{
				name:'.info',
				type:0,
				describe:'信息时代的标识域名',
				prise:'320',
				last_prise:''
			},{
				name:'.store',
				type:2,
				describe:'网上超市、便利网店的专属域名',
				prise:'46',
				last_prise:''
			},{
				name:'.asia',
				type:0,
				describe:'含义为“亚洲”，标识强烈',
				prise:'320',
				last_prise:''
			},{
				name:'.org',
				type:0,
				describe:'非盈利组织或机构的首选',
				prise:'320',
				last_prise:''
			},{
				name:'.中国',
				type:1,
				describe:'最具中国色彩的域名',
				prise:'200',
				last_prise:''
			},{
				name:'.vip',
				type:2,
				describe:'尊贵、特权',
				prise:'400',
				last_prise:''
			},{
				name:'.ren',
				type:2,
				describe:'以人为本的域名，彰显团队力量',
				prise:'140',
				last_prise:'(原价188)'
			},{
				name:'.gov.cn',
				type:1,
				describe:'中国政府机关/部门的专属域名',
				prise:'100',
				last_prise:''
			},{
				name:'.hk',
				type:1,
				describe:'香港特别行政区域名',
				prise:'330',
				last_prise:''
			},{
				name:'.公司',
				type:1,
				describe:'具有显著的标识作用',
				prise:'180',
				last_prise:''
			},{
				name:'.公司',
				type:1,
				describe:'具有显著的标识作用',
				prise:'120',
				last_prise:''
			},{
				name:'.网络',
				type:1,
				describe:'适合应用于网络服务',
				prise:'230',
				last_prise:''
			},{
				name:'.网络',
				type:1,
				describe:'适合应用于网络服务',
				prise:'700',
				last_prise:''
			},{
				name:'.biz',
				type:0,
				describe:'代表商业，最具竞争力的域名',
				prise:'75',
				last_prise:''
			},{
				name:'.biz',
				type:0,
				describe:'代表商业，最具竞争力的域名',
				prise:'330',
				last_prise:''
			},{
				name:'.mobi',
				type:0,
				describe:'建立WAP网站的首选域名',
				prise:'120',
				last_prise:''
			},{
				name:'.mobi',
				type:0,
				describe:'建立WAP网站的首选域名',
				prise:'158',
				last_prise:''
			}
		];
		function render(data){
			$('.floor2 .ymjs').empty();
			$.each(data,function(i,v){
				var el=$('<li class="lis fl no-float">\
								<div class="type fl">\
									<span class="name">'+v.name+'</span>\
									<span class="js">'+v.describe+'</span>\
								</div>\
								<div class="prise fl">\
									<span>'+v.prise+'</span>\
									<del>'+v.last_prise+'</del>\
									<b>元/年</b>\
								</div>\
							</li>')
				el.appendTo($('.floor2 .ymjs'));
			})
		}
		render(data);
		var yw=new Array,zw=new Array,xdj=new Array;
		$.each(data,function(i,v){
			if(v.type==0){
				yw.push(v);
			}else if(v.type==1){
				zw.push(v);
			}else if(v.type==2){
				xdj.push(v);
			}
		})
		var reg=/checked/;
		$('.floor2 .checkbox .yw').on('click',function(){
			console.log(1)
			var cn=$(this).attr('class');
			if(reg.test(cn)){
				$(this).removeClass('checked');
				render(data);
			}else{
				$(this).closest('.checkbox').find('.checked').removeClass('checked');
				$(this).addClass('checked');
				render(yw);
			}
		})
		$('.floor2 .checkbox .zw').on('click',function(){
			var cn=$(this).attr('class');
			if(reg.test(cn)){
				$(this).removeClass('checked');
				render(data);
			}else{
				$(this).closest('.checkbox').find('.checked').removeClass('checked');
				$(this).addClass('checked');
				render(zw);
			}
		})
		$('.floor2 .checkbox .xdj').on('click',function(){
			var cn=$(this).attr('class');
			if(reg.test(cn)){
				$(this).removeClass('checked');
				render(data);
			}else{
				$(this).closest('.checkbox').find('.checked').removeClass('checked');
				$(this).addClass('checked');
				render(xdj);
			}
		})

		//文本框
		var domian_val=$('.domain-textarea').val();
		$('.domain-textarea').blur(function(){
			var val=$(this).val();
			val=$.trim(val);
			if(val){
				$(this).val(val);
			}else{
				$(this).val(domian_val);
			}
			$(this).css('borderColor','#e6e6e6')
		}).focus(function(){
			if($(this).val()==domian_val){
				$(this).val('').css('borderColor','#e2383a');
			}else{
				$(this).css('borderColor','#e2383a');
			}
		})
			
	}
	if($('#domain-batchregistered').length>0){
		batchregistered();
	}

	//域名注册-首页
	function domainIndex (){
		//常用cy,热hot,图片src,域名价格中的对象：po：sp,xf,zr,sh,域名价格中是否含有has
		var data=[
			{
				name:'.com',
				describe:'全球注册量第一，注册首选',
				prise:'60',
				cy:true,
				hot:true,
				has:true,
				lp:'45',
				src:'../static/img/ym/single_logo_com.png',
				po:{
					sp:60,
					xf:80,
					zr:60,
					sh:1200
				}
			},{
				name:'.me',
				describe:'代表"自己"，打造个性站点',
				prise:'35',
				cy:true,
				hot:true,
				has:true,
				lp:'45',
				src:'../static/img/ym/single_logo_me.png',
				po:{
					sp:60,
					xf:80,
					zr:60,
					sh:1200
				}
			},{
				name:'.cn',
				describe:'中国企业和个人的互联网标识',
				type:0,
				prise:'35',
				cy:true,
				hot:false,
				has:true,
				lp:'45',
				src:'../static/img/ym/single_logo_cn.png',
				po:{
					sp:60,
					xf:80,
					zr:60,
					sh:1200
				}
			},{
				name:'.win',
				describe:'新购/续费/转入促销',
				prise:'80',
				src:'',
				cy:false,
				hot:false,
				has:false,
				po:{
					sp:60,
					xf:80,
					zr:60,
					sh:1200
				}
			},{
				name:'.net',
				describe:'为企业树立全球化商业品牌',
				prise:'80',
				src:'../static/img/ym/single_logo_net.png',
				cy:true,
				hot:false,
				has:true,
				po:{
					sp:60,
					xf:80,
					zr:60,
					sh:1200
				}
			},{
				name:'.link',
				describe:'即刻链接世界',
				prise:'150',
				src:'',
				cy:false,
				hot:false,
				has:true,
				po:{
					sp:60,
					xf:80,
					zr:60,
					sh:1200
				}
			},{
				name:'.club',
				describe:'俱乐部、会所专属域名',
				prise:'80',
				src:'',
				cy:false,
				hot:false,
				has:true,
				po:{
					sp:60,
					xf:80,
					zr:60,
					sh:1200
				}
			},{
				name:'.wang',
				describe:'寓意网络，互联网域名首选',
				prise:'46',
				src:'',
				cy:false,
				hot:false,
				has:true,
				po:{
					sp:60,
					xf:80,
					zr:60,
					sh:1200
				}
			},{
				name:'.co',
				describe:'代表公司和商业',
				prise:'230',
				src:'',
				cy:false,
				hot:false,
				has:true,
				po:{
					sp:60,
					xf:80,
					zr:60,
					sh:1200
				}
			},{
				name:'.tv',
				describe:'媒体域名，视频服务首选',
				prise:'80',
				src:'../static/img/ym/single_logo_tv.png',
				cy:true,
				hot:false,
				has:true,
				po:{
					sp:60,
					xf:80,
					zr:60,
					sh:1200
				}
			},{
				name:'.ltd',
				describe:'有限公司简称，公司专属域名',
				prise:'105',
				src:'',
				cy:false,
				hot:false,
				has:true,
				po:{
					sp:60,
					xf:80,
					zr:60,
					sh:1200
				}
			},{
				name:'.name',
				describe:'个人品牌推广最佳选择',
				prise:'99',
				src:'',
				cy:false,
				hot:false,
				has:true,
				po:{
					sp:60,
					xf:80,
					zr:60,
					sh:1200
				}
			},{
				name:'.cc',
				describe:'简单好记，极具商业潜力',
				prise:'140',
				src:'../static/img/ym/single_logo_cc.png',
				cy:false,
				hot:true,
				has:true,
				po:{
					sp:60,
					xf:80,
					zr:60,
					sh:1200
				}
			},{
				name:'.info',
				describe:'信息时代的标识域名',
				prise:'320',
				src:'../static/img/ym/single_logo_info.png',
				cy:false,
				hot:false,
				has:true,
				po:{
					sp:60,
					xf:80,
					zr:60,
					sh:1200
				}
			},{
				name:'.store',
				describe:'网上超市、便利网店的专属域名',
				prise:'46',
				src:'',
				cy:false,
				hot:false,
				has:true,
				po:{
					sp:60,
					xf:80,
					zr:60,
					sh:1200
				}
			},{
				name:'.asia',
				describe:'含义为“亚洲”，标识强烈',
				prise:'320',
				src:'../static/img/ym/single_logo_asia.png',
				cy:false,
				hot:false,
				has:true,
				po:{
					sp:60,
					xf:80,
					zr:60,
					sh:1200
				}
			},{
				name:'.org',
				describe:'非盈利组织或机构的首选',
				prise:'320',
				src:'../static/img/ym/single_logo_org.png',
				cy:false,
				hot:false,
				has:true,
				po:{
					sp:60,
					xf:80,
					zr:60,
					sh:1200
				}
			},{
				name:'.中国',
				describe:'最具中国色彩的域名',
				prise:'200',
				src:'',
				cy:false,
				hot:true,
				has:true,
				po:{
					sp:60,
					xf:80,
					zr:60,
					sh:1200
				}
			},{
				name:'.vip',
				describe:'尊贵、特权',
				prise:'400',
				src:'../static/img/ym/single_logo_vip.png',
				cy:true,
				hot:true,
				has:true,
				po:{
					sp:60,
					xf:80,
					zr:60,
					sh:1200
				}
			},{
				name:'.ren',
				describe:'以人为本的域名，彰显团队力量',
				prise:'140',
				src:'',
				cy:false,
				hot:false,
				has:true,
				po:{
					sp:60,
					xf:80,
					zr:60,
					sh:1200
				}
			},{
				name:'.gov.cn',
				describe:'中国政府机关/部门的专属域名',
				prise:'100',
				src:'',
				cy:true,
				hot:false,
				has:true,
				po:{
					sp:60,
					xf:80,
					zr:60,
					sh:1200
				}
			},{
				name:'.hk',
				describe:'香港特别行政区域名',
				prise:'330',
				src:'',
				cy:false,
				hot:true,
				has:true,
				po:{
					sp:60,
					xf:80,
					zr:60,
					sh:1200
				}
			},{
				name:'.公司',
				describe:'具有显著的标识作用',
				prise:'180',
				src:'',
				cy:false,
				hot:true,
				has:true,
				po:{
					sp:60,
					xf:80,
					zr:60,
					sh:1200
				}
			},{
				name:'.网络',
				describe:'适合应用于网络服务',
				prise:'230',
				src:'',
				cy:false,
				hot:false,
				has:true,
				po:{
					sp:60,
					xf:80,
					zr:60,
					sh:1200
				}
			},{
				name:'.biz',
				describe:'代表商业，最具竞争力的域名',
				prise:'75',
				src:'',
				cy:false,
				hot:false,
				has:true,
				po:{
					sp:60,
					xf:80,
					zr:60,
					sh:1200
				}
			},{
				name:'.mobi',
				describe:'建立WAP网站的首选域名',
				prise:'120',
				src:'../static/img/ym/single_logo_mobi.png',
				cy:false,
				hot:false,
				has:true,
				po:{
					sp:60,
					xf:80,
					zr:60,
					sh:1200
				}
			},{
				name:'.shop',
				describe:'建立WAP网站的首选域名',
				prise:'120',
				src:'../static/img/ym/single_logo_shop.png',
				cy:false,
				hot:false,
				has:true,
				po:{
					sp:60,
					xf:80,
					zr:60,
					sh:1200
				}
			}
		];
		//节点轮播图数组
		var img=new Array;
		//域名价格数组
		var pa=new Array;
		$('.img-box ul').empty();
		$.each(data,function(i,v){
			if(v.src){
				var el=$('<li class="fl">\
								<a href="#">\
									<div class="img"><img src="'+v.src+'" alt=""></div>\
									<h4>'+v.describe+'</h4>\
									<p class="prise">￥<span>'+v.prise+'</span></p>\
								</a>\
							</li>')
				el.appendTo($('.floor1 .img-box ul'));
			}
			if(v.has){
				var lp='';
				if(v.lp){
					lp=v.lp;
				}
				var el=$('<ul class="no-float">\
						<li class="fl r1 blue"><a href="#">'+v.name.toLocaleUpperCase()+'</a></li>\
						<li class="fl r2">'+v.describe+'</li>\
						<li class="fl r3 red">'+'<del>'+lp+'</del>'+v.po.sp+'</li>\
						<li class="fl r4 red ">'+v.po.xf+'</li>\
						<li class="fl r5 red ">'+v.po.zr+'</li>\
						<li class="fl r6 red">'+v.po.sh+'</li>\
					</ul>')
				el.appendTo($('.floor2 .yms'));
			}
		})

		


		//render函数
		function render(data){
			$('#domain-banner .yms ul').empty();
			$.each(data,function(i,v){
				var cm=''
				if(v.cy){
					cm='check';
				}
				var hot=''
				if(v.hot){
					hot='<i class="icon hot"></i>'
				}
				var el=$('<li class="fl">\
								<span class="'+cm+'"><i class="icon nick"></i>'+hot+v.name+'</span>\
							</li>')
				el.appendTo($('.yms-box ul'));
			})
		}
		render(data);

		// 节点轮播
		function jdlb(){
			var num=$('.img-box ul').find('li').length;
			var gw=$('.img-box ul').find('li').outerWidth();
			var mw = num*gw+40*(num-1);
			var obj=$('.jdlb');
			$('.img-box ul').css('width',mw);
			obj.hover(function(){
				$('.btnl,.btnr').toggleClass('hover');
				clearInterval(t);
			},function(){
				$('.btnl,.btnr').toggleClass('hover');
				t=setInterval(move,5000);
			})
			//开关
			var flag=true;

			//正向移动函数
			function move(){
				if(flag){
					flag=false;
					$('ul',obj).animate({left:-(gw+40)},1500,function(){
						$(this).find('li:first').insertAfter($('ul li:last',obj));
						$(this).css('left',0);
						flag=true;
					})
				}else{return}
			}
			function back () {
				if(flag){
					flag=false;
					$('ul',obj).css({left:-(gw+40)});
					$('ul',obj).find('li:last').insertBefore($('ul li:first',obj));
					$('ul',obj).animate({left:0},1500,function(){
						flag=true;
					})
				}else{return}
			}
			var t=setInterval(move,5000);
			$('.btnr',obj).on('click',function(){
				move();
			});
			$('.btnl',obj).on('click',function(){
				back();
			});
		}
		jdlb();

		//banner下check选择

		$('#domain-banner .yms ul').on('click','span',function(){
			$('#domain-banner .yms .cz').find('.check').removeClass('check');
			$(this).toggleClass('check');
			var nn=$(this).closest('ul').find('.check').size();
			var mn=$(this).closest('ul').find('li').size();
			if(nn==mn){
				$('#domain-banner .yms .cz').find('span.all').addClass('check');
			}else if(nn==0){
				$('#domain-banner .yms .cz').find('span.allnot').addClass('check');
			}
		})

		$('#domain-banner .yms .cz').on('click','span.all',function(){
			var f=$(this).parent();
			$('.check',f).removeClass('check');
			$(this).addClass('check');
			$('#domain-banner .yms ul').find('span').addClass('check');
		})
		$('#domain-banner .yms .cz').on('click','span.allnot',function(){
			var f=$(this).parent();
			$('.check',f).removeClass('check');
			$(this).addClass('check');
			$('#domain-banner .yms ul').find('span').removeClass('check');
		})
		$('#domain-banner .yms .cz').on('click','span.cy',function(){
			var f=$(this).parent();
			$('.check',f).removeClass('check');
			$(this).addClass('check');
			render(data);
		})

		//下form hover效果
		$('.floor2 .yms').find('ul').hover(function(){
			$(this).find('li').css('borderRightColor','transparent');
			$(this).find('li:last').css('borderRightColor','#e6e6e6');
		},function(){
			$(this).find('li').css('borderRightColor','#e6e6e6');
		})

	}
	if($('#domainAresult').length>0){
		domainIndex();
	}

	//域名查询结果页面
	function domain_result(){
		$('#domain-banner .input-box input').on('focus',function(){
			$('#domain-banner input').css('borderBottomLeftRadius','0px');
				$('#domain-banner .yms-box').slideDown();
		}).on('blur',function(){
			$('#domain-banner .yms-box').slideUp(function(){
					$('#domain-banner input').css('borderBottomLeftRadius','10px');
				});
		})
		$('#domain-result .wzc').find('ul').on('click','.left span',function(){
			$(this).toggleClass('check');
		})
		var cflag=true;
		$('#domain-result .cz').find('span').on('click',function(){
			if(cflag){
				cflag=!cflag;
				$(this).addClass('check');
				$('#domain-result .wzc').find('.left span').addClass('check');
			}else{
				cflag=!cflag;
				$(this).removeClass('check');
				$('#domain-result .wzc').find('.left span').removeClass('check');
			}
			
		})
		$('#domain-result .wzc ul').on('click','.right .car',function(){
			$(this).html('<span><i class="icon"></i>已加入购物车</span>');
			$(this).addClass('added');
		})
	}
	if($('#domain-result').length>0){
		domain_result();
	}


/////////////////////////////////////////////////////////////登录页
	function load_index(){
		$('.cz-left').on('click',function(){
			$(this).find('span .icon').toggleClass('checked');
		})	
	}
	if($('#loading').length>0){
		load_index();
	}	

	function load_zc1(){
		$('.lis.ydtk').on('click','span',function(){
			$(this).find('.icon').toggleClass('checked');
		})
	}

	if($('#load-zc1').length>0){
		load_zc1()
	}

	function load_zc2(){
		$('.lis.zzlx').on('click','span',function(){
			$(this).find('.icon').toggleClass('checked');
		})
	}

	if($('#load-zc2').length>0){
		load_zc2()
	}


})
	