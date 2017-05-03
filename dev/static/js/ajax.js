//云服务器  JSON.parse




var cloud_ajax={
	begin:function(d){
		var data;
		$.ajax({	
			type:'get',
			url:'http://192.168.1.147/server/buy/getParams.html'+'&query=lines,defense,system_class,price,rams,discount&format=jsonp&jsoncallback=?',
			data:d,
			dataType:'jsonp',
			success:function(e){
				data=e;
				console.log(data)
			},
			error:function(e){
				data='数据没获取到，请重新刷新页面'
			}
		})
		return data;	
	}
}


