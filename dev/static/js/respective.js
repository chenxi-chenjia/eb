//购买页面渲染函数

var rander=new Object;
rander.grid=function(data,obj){
	obj.empty();
	$.each(data,function(i,v){
		var li=$('<div>').text(v);
		var a=$('<i>').addClass('icon').addClass('nick').appendTo(li);
		var b=$('<i>').addClass('icon').addClass('lw').appendTo(li);
		var c=$('<i>').addClass('icon').addClass('song').appendTo(li);
		li.appendTo(obj);
	})
}
rander.base=function(data,obj){
	obj.empty();
	for(var i in data){
		var div=$('<div>');
		var total=$('<span>').addClass('total').text(data[i].total).appendTo(div);
		var bind=$('<span>').addClass('bind').text(data[i].bind).appendTo(div);
		div.appendTo(obj);
	}
}











