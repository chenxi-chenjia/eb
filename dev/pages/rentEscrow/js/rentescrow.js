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