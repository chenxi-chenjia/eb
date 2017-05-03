//////////////////////////////////////////////////////////////////////////增值应用

	//网址移动服务
	function appurlser(){
		$('#application-urlService .left-nav').on('click','.lis',function(){
			$(this).closest('.left-nav').find('.now').removeClass('now').css('borderTopColor','transparent');
			var index=$(this).index();
			$(this).find('a').addClass('now');
			if(index>0){
				$(this).find('a').css('borderTopColor','#e4e4e4');
			}
			$('.right-content').find('.now').removeClass('now').end().find('.right-lis').eq(index).addClass('now');
		})
	}
	if($('#application-urlService').length>0){
		appurlser();
	}
		

	//网址移动服务
	function netmoveser(obj){
		var user=new Array;
		$('input[name="yearline"]',obj).closest('li').find('.sub').find('b').css('background','#e4e4e4');
		$('input[name="yearline"]',obj).on('change',function(){
			var val=$(this).val();
			var num=1;
			var reg=/^[0-9]/;
			$('input[name="yearline"]',obj).closest('li').find('.sub').find('b').css('background','#e4e4e4');
			if(reg.test(val)){
				num=parseInt(val);
				if(num>1){
					num=Math.ceil(num);
					$('input[name="yearline"]',obj).closest('li').find('.sub').find('b').css('background','#333');
				}
			}
			$(this).val(num);
		})
		$('input[name="yearline"]',obj).closest('li').find('.sub').on('click',function(){
			var num=parseInt($('input[name="yearline"]',obj).val());
			num--;
			if(num<=1){
				num=1;
			$('input[name="yearline"]',obj).closest('li').find('.sub').find('b').css('background','#e4e4e4');
			}
			$('input[name="yearline"]',obj).val(num);
		})
		$('input[name="yearline"]',obj).closest('li').find('.add').on('click',function(){
			var num=parseInt($('input[name="yearline"]',obj).val());
			num++;
			$('input[name="yearline"]',obj).val(num);
			$('input[name="yearline"]',obj).closest('li').find('.sub').find('b').css('background','#333');
		})


		$('.type',obj).find('.bind').on('click',function(){
			$('.type',obj).find('.bingo').removeClass('bingo');
			$(this).addClass('bingo');
		})


		//弹窗设置
		//证件类型
		function  cardtype(){
			var val=$('select[name="cardtype"]').val();
			var m=$('select[name="cardtype"]').find('option').eq(val).text();
			return m;
		}
		//地址
		function dizhi (){
			var sh=$('select[name="sheng"]').val();
			var s=$('select[name="shi"]').val();
			var m=$('select[name="sheng"]').find('option').eq(sh).text()+$('select[name="shi"]').find('option').eq(s).text()+$('input[name="address"]').val();

			return m;
		}



		//打开弹窗，传递数据
		$('.floor.button a.go').on('click',function(e){
			user=[
				{
					name:'注册年数：',
					bind:$('input[name="yearline"]').val()+'年'
				},
				{
					name:'用户名称：',
					bind:$('input[name="username"]').val()
				},
				{
					name:'证件类型：',
					bind:$('select[name=""]').val()
				},
				{
					name:'证件号码：',
					bind:cardtype()
				},
				{
					name:'联系人姓名：',
					bind:$('input[name="lxrname"]').val()
				},
				{
					name:'地址：',
					bind:dizhi ()
				},
				{
					name:'手机号码：',
					bind:$('input[name="mphone"]').val()
				},
				{
					name:'电子邮箱：',
					bind:$('input[name="email"]').val()
				},
				{
					name:'座机号码：',
					bind:$('input[name="phone"]').val()
				},
				{
					name:'传真：',
					bind:$('input[name="fax"]').val()
				},
				{
					name:'邮政编码：',
					bind:$('input[name="zipcode"]').val()
				}
			];
			$('.tanchuang .zhanshi-form').empty();
			$.each(user,function(i,v){
				if(v.bind){
					var el=$('<div class="lis"><div class="title">'+v.name+'</div><span class="bind">'+v.bind+'</span></div>');
					el.appendTo($('.tanchuang .zhanshi-form'));
				}
				
			})
			e.preventDefault();
			$('body').css('overflow','hidden');
			$('.tanchuang').css('display','block').delay().queue(function(){
				$(this).addClass('show').dequeue();
			})

		})
		$('#application-urlService_form').on('click','.tanchuang.show .button-box .no',function(){
			if(window.navigator.userAgent.indexOf("MSIE")>=1){
				$('.tanchuang').removeClass('show').css('display','none');
			}else{
				$('.tanchuang').removeClass('show')
				.delay(500).queue(function(){
					$(this).css('display','none').dequeue();
				})
				
			}
			$('body').css('overflow','auto');

		})

		//弹窗点击确定后购买成功
		$('#application-urlService_form').on('click','.tanchuang.show .button-box .sure',function(){
			if(window.navigator.userAgent.indexOf("MSIE")>=1){
				$('.tanchuang').removeClass('show').css('display','none');
			}else{
				$('.tanchuang').removeClass('show')
				.delay(500).queue(function(){
					$(this).css('display','none').dequeue();
				})
			}
			$('body').css('overflow','auto');
			$('#application-urlService_form .top .icon').removeClass('tx').addClass('wc');
			$('#application-urlService_form').find('.form').removeClass('now').end().find('.success').addClass('now');
			$('body,html').scrollTop(0)

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
		var user=[];
		$('.button a').on('click',function(e){
			$('.tanchuang .zhanshi-form').empty();
			e.preventDefault();
			$.each(user,function(i,v){
				if(v.bind){
					var el=$('<div class="lis"><div class="title">'+v.name+'</div><span class="bind">'+v.bind+'</span></div>');
					el.appendTo($('.tanchuang .zhanshi-form'));
				}
				
			})

			$('body').css('overflow','hidden');
			$('.tanchuang').css('display','block').delay().queue(function(){
				$(this).addClass('show').dequeue();
			})
		});

		$('#application-trustedSite_form').on('click','.tanchuang.show .button-box .no',function(){
			if(window.navigator.userAgent.indexOf("MSIE")>=1){
				$('.tanchuang').removeClass('show').css('display','none');
			}else{
				$('.tanchuang').removeClass('show')
				.delay(500).queue(function(){
					$(this).css('display','none').dequeue();
				})
				
			}
			$('body').css('overflow','auto');

		})

		//弹窗点击确定后购买成功
		$('#application-trustedSite_form').on('click','.tanchuang.show .button-box .sure',function(){
			if(window.navigator.userAgent.indexOf("MSIE")>=1){
				$('.tanchuang').removeClass('show').css('display','none');
			}else{
				$('.tanchuang').removeClass('show')
				.delay(500).queue(function(){
					$(this).css('display','none').dequeue();
				})
			}
			$('body').css('overflow','auto');
			$('#application-trustedSite_form .top .icon').removeClass('tx').addClass('wc');
			$('#application-trustedSite_form').find('.form').removeClass('now').end().find('.success').addClass('now');
			$('body,html').scrollTop(0)

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
	if($('#application-qq1').length>0){
		qq($('#application-qq1'));
	}


	//增值应用-服务器证书（表单）
	function application_serverCertificate_form(){
		var user=[];
		$('.floor.button a.go').on('click',function(e){
			$('.tanchuang .zhanshi-form').empty();
			e.preventDefault();
			$.each(user,function(i,v){
				if(v.bind){
					var el=$('<div class="lis"><div class="title">'+v.name+'</div><span class="bind">'+v.bind+'</span></div>');
					el.appendTo($('.tanchuang .zhanshi-form'));
				}
				
			})

			$('body').css('overflow','hidden');
			$('.tanchuang').css('display','block').delay().queue(function(){
				$(this).addClass('show').dequeue();
			})
		});

		$('#application-serverCertificate_form').on('click','.tanchuang.show .button-box .no',function(){
			if(window.navigator.userAgent.indexOf("MSIE")>=1){
				$('.tanchuang').removeClass('show').css('display','none');
			}else{
				$('.tanchuang').removeClass('show')
				.delay(500).queue(function(){
					$(this).css('display','none').dequeue();
				})
				
			}
			$('body').css('overflow','auto');

		})

		//弹窗点击确定后购买成功
		$('#application-serverCertificate_form').on('click','.tanchuang.show .button-box .sure',function(){
			if(window.navigator.userAgent.indexOf("MSIE")>=1){
				$('.tanchuang').removeClass('show').css('display','none');
			}else{
				$('.tanchuang').removeClass('show')
				.delay(500).queue(function(){
					$(this).css('display','none').dequeue();
				})
			}
			$('body').css('overflow','auto');
			$('#application-serverCertificate_form .top .icon').removeClass('tx').addClass('wc');
			$('#application-serverCertificate_form').find('.form').removeClass('now').end().find('.success').addClass('now');
			$('body,html').scrollTop(0)

		})
	}
	if($('#application-serverCertificate_form').length>0){
		application_serverCertificate_form();
	}