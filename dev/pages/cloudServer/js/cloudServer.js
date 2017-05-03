

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
			prise:[100,200,300,400,500,600,700],
			system_class:[
				{
					name:'',
					id:'',
					code:''
				}
			]
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
			$('.form-left select').empty();
			$.each(data.system_class,function(i,v){
				var el=$('<option value='+v.code+' data_id='+v.id+'>'+v.name+'</option>');
				el.appendTo($('.form-left select'));
			})
			
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


		//初始化form
		var disk=[];
		$.ajax({
			type:'get',
			url:'http://192.168.1.147/server/buy/getParams.html?sign=3&type=1&lineid=1&cpu=1&ram=2&harddisks%'+data.protect[0].substring(0,1)+'B%5D=10&bandwidth=1&defense=20&system_class_id=&systemID=&loginPassword=&loginPassword2=&months=1&number=1&&query=lines,defense,system_class,price,rams,discount,system_class&format=jsonp&jsoncallback=?',
			dataType:'jsonp',
			success:function(e){
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
				data.system_class=e.system_class;
				ur(data,user);
			}
		})


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


		// 楼层跳转
		var boss=$('#cloudServer-buypage .other');
		var bosstop=boss.offset().top;
		var t2=$('#cloudServer-buypage .other .c2').offset().top-90;
		var t3=$('#cloudServer-buypage .other .c3').offset().top-90;
		var t4=$('.footer').offset().top;
		$(window).scroll(function(){
			if($(window).scrollTop()>=bosstop){
				$('.other-choose',boss).css({'position':'fixed','top':0,'left':0,'width':'100%','zIndex':20});
			}else{
				$('.other-choose',boss).css('position','static');
			}
			if($(window).scrollTop()>=t2){
				$('#cloudServer-buypage .other .other-choose ul').find('.now').removeClass('now').end().find('li').eq(1).addClass('now');
			}else{
				$('#cloudServer-buypage .other .other-choose ul').find('.now').removeClass('now').end().find('li').eq(0).addClass('now');
			}
			if($(window).scrollTop()>=t3){
				$('#cloudServer-buypage .other .other-choose ul').find('.now').removeClass('now').end().find('li').eq(2).addClass('now');
			}
			if($(window).scrollTop()>=t4){
				$('.other-choose',boss).css('position','static');
			}
		})
		boss.on('click','.other-choose li',function(){
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
	if($('#cloudServer-buypage').length>0){
		cloudServer_buypage($('#cloudServer-buypage .buybox'))
	}