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