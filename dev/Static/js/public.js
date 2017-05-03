//首页导航栏跟随效果
$(function(){
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
})
	