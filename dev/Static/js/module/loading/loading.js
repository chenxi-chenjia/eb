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


	//找回密码
	function load_zhmm1(){
		
	}

	if($('#load-zhmm1').length>0){
		load_zhmm1()
	}

	//找回密码2
	function load_zhmm2 (){

		//下一步
		$('#load-zhmm2 .button-box').on('click','.button',function(){
			$('#load-zhmm2').find('.show').removeClass('show').end().find('.success').addClass('show');
		})


	}
	if($('#load-zhmm2').length>0){
		load_zhmm2();
	}

	//找回密码3
	function load_zhmm3(){
		
		
	}


	if($('#load-zhmm3').length>0){
		load_zhmm3();
	}