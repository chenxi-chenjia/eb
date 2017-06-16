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
				src:'../../static/img/ym/single_logo_com.png',
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
				src:'../../static/img/ym/single_logo_me.png',
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
				src:'../../static/img/ym/single_logo_cn.png',
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
				src:'../../static/img/ym/single_logo_net.png',
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
				src:'../../static/img/ym/single_logo_tv.png',
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
				src:'../../static/img/ym/single_logo_cc.png',
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
				src:'../../static/img/ym/single_logo_info.png',
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
				src:'../../static/img/ym/single_logo_asia.png',
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
				src:'../../static/img/ym/single_logo_org.png',
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
				src:'../../static/img/ym/single_logo_vip.png',
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
				src:'../../static/img/ym/single_logo_mobi.png',
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
				src:'../../static/img/ym/single_logo_shop.png',
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
		var slide_flag=false;
		$('#domain-banner .input-box input').on('focus',function(){
			$('#domain-banner input').css('borderBottomLeftRadius','0px');
			$('#domain-banner .yms-box').slideDown(function(){
				slide_flag=true;
			});
		})
		$(document).on('click',function(){
			if(slide_flag){
				$('#domain-banner .yms-box').slideUp(function(){
						$('#domain-banner input').css('borderBottomLeftRadius','4px');
						slide_flag=false;
					});
			}
		})
		$('#domain-banner .yms-box').on('click',function(){
			return false;
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