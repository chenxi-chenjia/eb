
////////////////////////////////////////////////////////////////////////////云服务器
	//购买页
	function cloudServer_buypage(obj){
		var data={
			type:['入门型','标准型','商务型','舒适型','企业型','豪华型'],
			cpu:[1,2,4,8,16],
			memory:[],
			protect:[5,10,20,30,50,100,200,300],
			protecttime:['1个月','2个月','3个月','4个月','5个月','6个月','7个月','8个月','9个月','1年','2年','3年'],
			system_class:[],
			defense:0
		}
		var user={
			type:0,
			cpu:0,
			memory:0,
			disk:10,
			network:0,
			protect:0,
			broadband:1,
			system:0,
			protecttime:0,
			prise:''
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
			var prise=user.prise;
			$('.type',obj).find('.bingo').removeClass('bingo').end().find('.lis').eq(type).addClass('bingo');

			$('.cpu',obj).find('.bingo').removeClass('bingo').prev().removeClass('prev');
			$('.cpu',obj).find('.lis').eq(cpu).addClass('bingo').prev().addClass('prev');
			

			$('.memory',obj).find('.lis-box-same').empty();
			data.memory=[];
			if(user.cpu<4){
				for(var i=0;i<4;i++){
					var el=$('<div class="lis l1">'+data.cpu[user.cpu]*Math.pow(2,i)+'GB<i class="icon nick"></i><i class="icon lw"></i><i class="icon song"></i></div>')
					el.appendTo($('.memory',obj).find('.lis-box-same'));
					data.memory.push(data.cpu[user.cpu]*Math.pow(2,i));
				}
			}else if(user.cpu==4){
				for(var i=0;i<3;i++){
					var el=$('<div class="lis l1">'+data.cpu[user.cpu]*Math.pow(2,i)+'GB<i class="icon nick"></i><i class="icon lw"></i><i class="icon song"></i></div>')
					el.appendTo($('.memory',obj).find('.lis-box-same'));
					data.memory.push(data.cpu[user.cpu]*Math.pow(2,i));
				}
			}
			$('.memory',obj).find('.bingo').removeClass('bingo').prev().removeClass('prev');
			$('.memory',obj).find('.lis').eq(mm).addClass('bingo').prev().addClass('prev');

			$('.network',obj).find('.lis-box-same').empty();
			$.each(data.lines,function(i,v){
				var el=$('<div class="lis l1" data_id='+v.id+'>'+v.name+'<i class="icon nick"></i><i class="icon lw"></i><i class="icon song"></i></div>')
				el.appendTo($('.network',obj).find('.lis-box-same'));
			})
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
				a:{total:'CPU：',bind:data.cpu[cpu]+'核'},
				b:{total:'内存：',bind:$('.memory').find('.bingo').text()},
				c:{total:'磁盘：',bind:disk+'GB'},
				d:{total:'网络：',bind:data.lines[nw].name},
				e:{total:'网络防护：',bind:data.protect[pt]},
				f:{total:'带宽：',bind:bb+'Mbps'},
				g:{total:'操作系统：',bind:data.system_class[st].name},
				h:{total:'时长：',bind:data.protecttime[ptt]},
				i:{total:'费用：',bind:prise}
				
			}
			rander.base(uc,$('.form-right .pz',obj));
			$('.form-right .pz',obj).find('div').addClass('pzlis');
			$('.form-right .pz',obj).find('div').eq(8).addClass('prise');
			$('.form-right .pz',obj).find('div').eq(6).addClass('system');
		}


		//初始化form
		var disk=[];
		var API_URL="http://192.168.1.147/server/buy/getParams.html";

		var initial_url=API_URL + "?sign=init&" + "&query=lines,defense,system_class,price,rams,discount&format=jsonp&jsoncallback=?";
		$.ajax({
			type:'get',
			url:initial_url,
			dataType:'jsonp',
			success:function(e){
				user={
					type:0,
					cpu:0,
					memory:0,
					disk:10,
					network:0,
					protect:0,
					broadband:1,
					system:0,
					protecttime:0,
					prise:e.price.price+'元'
				}
				data.system_class=e.system_class;
				data.lines=e.lines;
				data.rams=e.rams;

				var protect_index;
				$.each(data.protect,function(i,v){
					if(v==e.defense){
						protect_index=i;
					}
				})
				user.protect=protect_index;
				data.defense=protect_index;
			
				ur(data,user);
				$('.form-left select').empty();
				$.each(data.system_class,function(i,v){
					var el=$('<option value='+i+'>'+v.name+'</option>');
					el.appendTo($('.form-left select'));
				})

				

			},
			error:function(){

			}
		})

		
		// 转换提取ajax传输数据
		function getdata(user){
			var protecttime=parseInt(data.protecttime[user.protecttime]);
			var l=data.protecttime[user.protecttime].length;
			if(data.protecttime[user.protecttime].substring(l-1,l)=='年'){
				protecttime=parseInt(data.protecttime[user.protecttime])*12;
			}
			var ndata={
				type:1,
				number:1,
				cpu:data.cpu[user.cpu],
				ram:data.memory[user.memory],
				lineid:parseInt(data.lines[user.network].id),
				harddisks:[user.disk],
				defense:parseInt(data.protect[user.protect]),
				months:protecttime,
				bandwidth:user.broadband,
				system_class_id:parseInt(data.system_class[user.system].id),
				systemID:parseInt(data.system_class[user.system].id)
			}
			return ndata;
		}
		
		//发送ajax
		function faj(user,b){
			var m;
			if(b==undefined){
				m='system_class,price';
			}else{
				switch(b){
					case 'cpu':
					m='rams,system_class,price';
					break;
					case 'lines':
					m='defense,price';
					break;
				}
			}
				
			var url=API_URL + "?sign=init&" + "&query="+m+"&format=jsonp&jsoncallback=?";
			user.prise='正在计算中...';
			ur(data,user);
			$.ajax({
				url:url,
				type:'get',
				data:getdata(user),
				dataType:'jsonp',
				success:function(e){
					user.prise=e.price.price+'元';
					if(e.defense){
						var protect_index;
						$.each(data.protect,function(i,v){
							if(v==e.defense){
								protect_index=i;
							}
						})
						user.protect=protect_index;
						data.defense=protect_index;
					}
						
					ur(data,user);
				},
				error:function(){

				}
			})
		}



		$('.type',obj).on('click','.lis',function(){
			
		});
		$('.cpu',obj).on('click','.lis',function(){
			var index=$(this).index();
			user.memory=0;
			user.cpu=index;
			$('.form-left select').empty();
			$.each(data.system_class,function(i,v){
				var el=$('<option value='+i+'>'+v.name+'</option>');
				el.appendTo($('.form-left select'));
			})
			faj(user,'cpu');
			
		});
		$('.memory',obj).on('click','.lis',function(){
			var index=$(this).index();
			user.memory=index;

			faj(user);
		});
		$('.network',obj).on('click','.lis',function(){
			var index=$(this).index();
			user.network=index;
			faj(user,'lines');
		});

		$('.protect .frd:first',obj).on('click',' .lis',function(){
			var index=$(this).index();
			if(data.defense<=index){
				user.protect=index;
			}
			faj(user);
		});
		$('.protect .frd:last',obj).on('click',' .lis',function(){
			var index=$(this).index()+6;
			if(data.defense<=index){
				user.protect=index;
			}
			faj(user);
		});

		$('.protect-time .frd:first',obj).on('click','.lis',function(){
			var index=$(this).index();
			user.protecttime=index;
			faj(user);
		});
		$('.protect-time .frd:last',obj).on('click','.lis',function(){
			var index=$(this).index()+6;
			user.protecttime=index;
			faj(user);
		});
		$('.system',obj).on('change','select',function(){
			var index=parseInt(this.value);
			user.system=index;
			faj(user);
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
				user.prise='正在计算中...';
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
				user.prise='正在计算中...';
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
				user.prise='正在计算中...';
				user.disk=num;
				ur(data,user);
			})
		})
		$(document).on('mouseup',function(e){
			$(document).unbind('mousemove');
		})
		$('.article').on('mouseup',function(){
			console.log(user.disk)
			faj(user);
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
			faj(user);
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

		//右边滚动
		if($('.form-right').length>0){
			var mh=$('.form-right').offset().top;
			var mgMh=$('.buybox').outerHeight()-$('.form-right').outerHeight();
			var maxt=mh+mgMh;
			if($(window).scrollTop()<mh){
				$('.form-right').css('top',0);
			}else if($(window).scrollTop()>=mh&&$(window).scrollTop()<maxt){
				$('.form-right').css('top',$(window).scrollTop()-mh);
			}else if($(window).scrollTop()>maxt){
				$('.form-right').css('top',mgMh);
			}
			$(window).scroll(function(){
				if($(window).scrollTop()<mh){
					$('.form-right').css('top',0);
				}else if($(window).scrollTop()>=mh&&$(window).scrollTop()<maxt){
					$('.form-right').css('top',$(window).scrollTop()-mh);
				}else if($(window).scrollTop()>maxt){
					$('.form-right').css('top',mgMh);
				}
			})
		}
			

	}
	if($('#cloudServer-buypage').length>0){
		cloudServer_buypage($('#cloudServer-buypage .buybox'))
	}