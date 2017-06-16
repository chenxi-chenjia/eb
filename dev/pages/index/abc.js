	
(function(obj){
	$(function(){
		obj.find('li').css('width','auto')
		var wharr=new Array()
		var all_width=0;
		var ml_arr=new Array()
		obj.find('li').each(function(i,v){
			var w =$(v).width()+20
			wharr.push(w);
			$(v).css({'width':w,'text-align':'center'})
			if(i>0){
				$(v).css({'marginLeft':150})
			}
			all_width+=w
		})
		all_width+=(obj.find('li').length-1)*150;
		obj.find('ul').css({'width':all_width,marginLeft:'auto',marginRight:'auto'})
		obj.find('.line').width(all_width).css({margin:'0 auto'})
		
		var c_l=obj.offset().left
		obj.find('li').each(function(i,v){
			ml_arr.push($(v).offset().left-c_l)
		})
		obj.find('.show-line').width(wharr[0]).css('left',ml_arr[0])
		obj.on('click','li',function(){
			var index=$(this).index()
			obj.find('.show-line').width(wharr[index])
			obj.find('.show-line').animate({left:ml_arr[index]},250)
		})
	})
})($('#service2').find('.service-lis'))