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
		$('.prise',obj).each(function(i,v){
			if($(v).outerHeight()>priseHW){
				priseHW=$(v).outerHeight(false);
			}
		})
		console.log(priseHW)
		$('.prise:first',obj).height(priseHW+1).css('lineHeight',priseHW+1-30+'px');
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
		var t2=$('#virtual-homepage .floor-box .f3 .jscs').offset().top-60;
		var t3=$('#virtual-homepage .floor-box .f3 .cjwt').offset().top-60;
		var t4=$('.footer').offset().top-60;
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