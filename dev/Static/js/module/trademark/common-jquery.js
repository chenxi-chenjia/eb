function with_me(a, b){
	var isin = false;
    $(a).mouseover(function () {
        $(b).show();
    });
    $(a).mouseleave(function () {
        window.setTimeout(function () {
            if (!isin) {
                $(b).hide();
            }
        }, 300);
    });
    $(b).mouseleave(function () {
        $(b).hide();
        isin = false;
    });
    $(b).mouseover(function () {
        isin = true;
    });
}
function load_json(url, callback){
    Ajax({
        url: url,
        dataType: "json",
        succeed: function (result) {
            if (!result) return;
            if (result.error) return;
            callback(result);
        }
    });
}
function fix_image(img, w, h){
    var b = img.height / img.width;
    if(w>0){
	    if(img.width>w){
		    img.width = w;
		    img.height = parseInt(w * b);
	    }
    }
    if(h>0){
	    if(img.height>h){
		    img.height = h;
		    img.width = parseInt(h / b);
	    }
    }
}
function encode(src){
	if(typeof src != 'string') src = Object.prototype.toString.call(src);
	return encodeURIComponent(src).replace(/\+/g,'%2b');
}
function decode(src){
	if(!src) return "";
	return decodeURIComponent(src);
}
function wait(timeout, func){
	if(func === undefined) func = function(){window.location.reload();};
	else if(typeof func == 'string') func = (function(url){ return function(){window.location = url;}})(func);
	else if(typeof func != 'function') return;
	return window.setTimeout(func, timeout);
}
function HideTips(){
	var close = true;
	if(typeof this == "function") close = this() !== false;
	if(close) $("#mae-tips").hide("fast");
}
function ShowError(msg, fn){
	ShowTips(msg, "error", fn);
}
function ShowSuccess(msg, fn){
	ShowTips(msg, "success", fn);
}
function ShowWarning(msg, fn){
	ShowTips(msg, "warning", fn);
}
function ShowInformation(msg, fn){
	ShowTips(msg, "information", fn);
}
function ShowTips(msg, type, fn){
	$("#mae-tips").html("<div>"+msg+"</div>").removeClass("warning information error success").addClass(type).show();
	window.setTimeout(bind(HideTips, fn), 2000)
}
function error_callback(title, msg, data){
	title = title || "错误";
	ShowTips("<b>"+title + "</b> " + msg, "error");
}
function success_callback(title, msg){
	title = title || "操作结果";
	ShowTips("<b>"+title + "</b> " + msg, "success");
}
function ajax_finished(msg, a){
	if(!msg){
		error_callback("错误", "数据错误", a.responseText)
	}else{
		if(msg.error){
			error_callback("错误", msg.message)
		}else{
			var fn = this.callback;
			if(fn && typeof fn == "function"){
				fn.call(this, msg);
			}else{
				success_callback(null,msg.message);
			}
		}
	}
}
function ajax_error(code, b){
	error_callback("服务器错误", "服务器错误：" + code + "-" + b.responseText);
}
function ajax_timeout(){
	error_callback("请求超时", "本次请求超时");
}
function SaveForm(frm, callback){
	try{
		Ajax({
			form:frm,
			dataType:"json",
			callback:callback,
			succeed:ajax_finished,
			error:ajax_error,
			ontimeout : ajax_timeout
		});
	}catch(ex){
		error_callback("异常", ex.description);
	}
	return false;
}
function AJAXRequest(url, data, callback){
	if(typeof data == "function"){
		callback = data;
		data = null;
	}
	try{
		var opt = {
			url:url,
			dataType:"json",
			callback:callback,
			succeed:ajax_finished,
			error:ajax_error,
			ontimeout : ajax_timeout
		};
		if(typeof data == "string"){
			opt["data"] = data;
			opt["method"] = "POST";
		}
		Ajax(opt);
	}catch(ex){
		error_callback("异常", ex.description);
	}
	return false;
}

function SelectBox(box){
	$(box.form).find("input[type='checkbox']").each(function(){
		if(this.value){
			this.checked = box.checked;
		}
	});
}

function FetchCheckboxs(frm){
	var values="";
	$(frm).find("input[type='checkbox']").each(function(){
		if(this.value && this.checked){
			values += this.value + ",";
		}
	});	
	if(values!="") values = values.substr(0,values.length-1);
	return values;
}
function ABS(a){
	var b = { x: a.offsetLeft, y: a.offsetTop};
	a = a.offsetParent;
	while (a) {
		b.x += a.offsetLeft;
		b.y += a.offsetTop;
		a = a.offsetParent;
	}
	return b;
} 
function bind(fn , data){
	return function(){
		fn.apply(data, arguments);
	};
}
(function(){
	var Crc32Table=[], map_hex2 = ["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];
	function MakeTable()
	{
	    var i,j,crc;
	    for (i = 0; i < 256; i++)
	    {
	        crc = i;
	        for (j = 0; j < 8; j++)
	        {
	            if (crc & 1)
	                crc = (crc >>> 1) ^ 0xEDB88320;
	            else
	                crc >>>= 1;
	        }
	        Crc32Table[i] = crc;
	    }
	}
	function GetCrc(csData)
	{
		if(typeof csData == 'string') csData = Utf8.getByteArray(csData);
	    var crc  = 0xffffffff, len = csData.length, i=0;
	    
	    for(var i=0;i<len;i++)
	    {
	       crc = (crc >>> 8) ^ Crc32Table[(crc^ csData[i]) & 0xff ];
	    }
	    return word2hex(crc ^ 0xffffffff);
	}
	function word2hex(word){
		return map_hex2[word>>>24] + 
		map_hex2[(word>>16) & 0xff] + 
		map_hex2[(word>>8) & 0xff] + 
		map_hex2[word & 0xff];
	}
	MakeTable();
	window.Crc32 = GetCrc;
	window.Utf8 = (function(){
		var utoutf8=function(u){
			var a,b,c,d;
			if(u<=0x7f) return u;
			else if(u<=0x07FF){
				a = 0xc0 | (u >> 6);
				b = 0x80 | (u & 0x3f);
				return (a<<8) | b;
			}
			else if(u<=0xFFFF){
				a = 0xe0 | (u >> 12);
				b = 0x80 | ((u >> 6) & 0x3f);
				c = 0x80 | (u & 0x3f);
				return (a<<16) | (b<<8) | c;
			}
			else if(u<=0x10FFFF){
				a = 0xf0 | (u >> 18);
				b = 0x80 | ((u >> 12) & 0x3f);
				c = 0x80 | ((u >> 6) & 0x3f);
				d = 0x80 | (u & 0x3f);
				var ret = (a<<24) | (b<<16) | (c<<8) | d;
				if(ret<0)ret+=0x100000000;
				return ret;
			}else return 0;
		};
		var utf8tou=function(u){
			var a,b,c,d;
			if(u<=0x7f) return u;
			else if(u<=0xdfbf) {
				a = (u >> 8) & 0x1f;
				b = u & 0x3f;
				return (a << 6) | b;
			}
			else if(u<=0xefbfbf) {
				a = (u >> 16) & 0xf;
				b = (u >> 8) & 0x3f;
				c = u & 0x3f;
				return (a << 12) | (b << 6) | c;
			}
			else if(u<=0xf48fbfbf) {
				a = (u >>> 24) & 0x7;
				b = (u >> 16) & 0x3f;
				c = (u >> 8) & 0x3f;
				d = u & 0x3f;
				return (a << 18) | (b << 12) | (c << 6) | d;
			}
			else return 0;
		};
		var bytestoword = function(u,i){
			var c = u[i],ret=[1,c];
			if(c<=0x7f)ret[1]=c;
			else if(c<=0xDF){
				ret[1]=(c << 8) | u[i+1];
				ret[0]=2;
			}else if(c<=0xEF){
				ret[1]=(c << 16) | (u[i+1] << 8) | u[i+2];
				ret[0]=3;
			}else if(c<=0xF7){
				ret[1]=(c << 24) | (u[i+1] << 16) | (u[i+2] << 8) | u[i+3];
				ret[0]=4;
			}
			return ret;	
		};
		var $utf8={};
		$utf8.getWordArray = function(u){
			if(u.length<=0)return [];
			var i=0,c,ret=[];
			while(i<u.length){
				c = u.charCodeAt(i);
				if(c<0x7f) ret.push(c);
				else{
					ret.push(utoutf8(c));
				}
				i++;
			}
			return ret;
		};
		$utf8.bytesToWords = function(u){
			if(u.length<=0)return [];
			var i=0,c,ret=[];
			while(i<u.length){
				var word = bytestoword(u,i);
				ret.push(word[1]);
				i+=word[0];
			}
			return ret;
		};
		$utf8.getByteArray = function(u){
			var _len = u.length;
			if(_len<=0)return [];
			var i=0,c,ret=[];
			while(i<_len){
				c = u.charCodeAt(i);
				if(c<0x7f) ret.push(c);
				else{
					var word = utoutf8(c);
					if(word>0xffffff) {
						ret.push(u >>> 24,(u >> 16) & 0xff,(u >> 8) & 0xff,u & 0xff);
					}else if(word>0xffff){
						ret.push(word >> 16,(word >> 8) & 0xff,word & 0xff);
					}else if(word>0xff){
						ret.push(word >> 8,word & 0xff);
					}
				}
				i++;
			}
			return ret;
		};
		$utf8.getBinary = function(u){
			return String.fromCharCode.apply(null,$utf8.getByteArray(u));
		};
		$utf8.toString = function(u){
			var _len = u.length;
			if(_len<=0)return "";
			var i=0,c,ret="";
			while(i<_len){
				if(u[i]<0x7f) ret+=String.fromCharCode(u[i]);
				else{
					ret+=String.fromCharCode(utf8tou(u[i]));
				}
				i++;
			}
			return ret;			
		};
		$utf8.getString = function(u){
			var _len = u.length;
			if(_len<=0)return [];
			var i=0,c,ret="";
			while(i<_len){
				var word = bytestoword(u,i);
				ret+=String.fromCharCode(utf8tou(word[1]));
				i+=word[0];
			}
			return ret;
		};
		return $utf8;
	})();
	window.FormatDate = function(dt, fs) {
		dt = dt || (new Date());
		function _right2(src){
			if(src>=10) return src;
			src = "0" + src;
			return src.substr(src.length-2);
		}

		fs = fs.replace(/(yyyy|mmmm|mmm|mm|dd|hh|ss|tttt|m|d|h|s)/ig,function(diff){
			switch(diff){
				case "yyyy" : return dt.getFullYear();
				case "M" : return dt.getMonth() + 1;
				case "MM" : return _right2(dt.getMonth() + 1);
				case "d" : return dt.getDate();
				case "dd" : return _right2(dt.getDate());
				case "H" : return dt.getHours() % 12;
				case "HH" : return _right2(dt.getHours());
				case "h" : return dt.getHours();
				case "hh" : return _right2(dt.getHours() % 12);
				case "m" : return dt.getMinutes();
				case "mm" : return _right2(dt.getMinutes());
				case "s" : return dt.getSeconds();
				case "ss" : return _right2(dt.getSeconds());
				case "tttt" : return dt.getMilliseconds();
				default : return diff;
			}
		});

		return fs;
	};
	window.format_friendly_time = function(dt, format){
		if(!dt) return "";
		var ticks = new Date() - dt * 1000;
		ticks = (ticks - ticks % 1000) / 1000;
		if(ticks>86400 * 2) return FormatDate(new Date(dt * 1000), format || 'yyyy-MM-dd HH:mm:ss')
		if(ticks>86400) return "1天前 ";
		if(ticks>3600) return Math.floor(ticks/3600) + "小时前";
		if(ticks>1800) return "半小时前";
		if(ticks>60) return Math.floor(ticks/60) + "分钟前";
		if(ticks>30) return "30秒前";
		return "刚刚";
	};
})();
var move = function($obj, x, y){
	x = parseInt(x);
	y = parseInt(y);
	$obj.attr("lastX",x).attr("lastY",y);
    x = x+"px";
	y = y+"px";		
	$obj.css("left", x).css("top", y);
}

var dragging = function(e, $obj){
	e = e ? e : window.event;
    var newx = parseInt($obj.css("left")) + (e.clientX - lastMouseX);
    var newy = parseInt($obj.css("top")) + (e.clientY - lastMouseY);
    lastMouseX = e.clientX;
    lastMouseY = e.clientY;
  
    move($obj,newx,newy);
};
var DRAG = function(src, target){
	$(src).on("mousedown", function(e){
		$obj = target ? $(target) : $(e.target).parent();

		e = e ? e : window.event;
		lastMouseX = e.clientX;
		lastMouseY = e.clientY;

		$(document).bind('mousemove', function(e){
		    dragging(e, $obj);
		});


		$(document).bind('mouseup', function(e){
			$(document).unbind('mousemove');
			$(document).unbind('mouseup');
		});
	});
};
var Cookie= function(name, value, days){
	if(value===undefined){
		var re = new RegExp("(\;|^)[^;]*(" + name + ")\=([^;]*)(;|$)");
		var res = re.exec(document.cookie);
		return res != null ? res[3] : null;
	}
	var expires = "";
	if (days) {
		var d = new Date();
		d.setTime(d.getTime() + days * 24 * 60 * 60 * 1000);
		expires = "; expires=" + d.toGMTString();
	}
	document.cookie = name + "=" + value + expires + "; path=/";
};

function fix_event(e){
	if(!e) return document;
	var target = e.target;
	if(!target) target = e.srcElement;
	if(target.nodeType === 3) target = target.parentNode;
	return target || document;
}
function HTML(src, val){
	if(val === true) return parseInt(src.innerHTML);
	if(val!==undefined) src.innerHTML = typeof val == 'object' ? val.innerHTML : val;
	return src.innerHTML;
}
function get_center(src, offset){return src.offsetLeft + Math.floor(src.offsetWidth/2) + offset;}
function show(src, value){src.style.display = value || "block";}
function hide(src){src.style.display = "none";}
function visiable(src) { return src.style.display != 'none';}
function next(src){ return src.nextSibling;}
function last(src){ return src.previousSibling;}
function find_height(){
	if (document.documentElement  && document.documentElement.clientHeight) return document.documentElement.clientHeight;
	if (window.innerWidth) return window.innerHeight;
	if (document.body && document.body.clientWidth) return document.body.clientHeight;
	return 0;
}
function find_top(){
	if (document.documentElement  && document.documentElement.scrollTop) return document.documentElement.scrollTop;
	return (window.pageYOffset || document.body.scrollTop) || 0;
}
function cancel_bubble(e){
	if(e && e.stopPropagation){
		e.stopPropagation();
	}else{
		window.event.cancelBubble = true;
	}
}
function on(ele, ev, handler, cap){
	if(ele.addEventListener){
		ele.addEventListener(ev, handler, cap!==true);
	}else if(ele.attachEvent){
		ele.attachEvent("on" + ev, handler);
	}else{
		ele["on" + ev] = handler;
	}
}
function off(ele, ev, handler, cap){
	if(ele.removeEventListener){
		ele.removeEventListener(ev, handler, cap!==true);
	}else if(ele.detachEvent){
		ele.detachEvent("on" + ev, handler);
	}else{
		ele["on" + ev] = null;
	}
}
function child_of(a, b){
	while(a = a.parentNode){
		if(a == b) return true;
	}
	return false;
}
function create_exp(e){if(e && typeof e == 'object') return e;return new RegExp('\\b(' + e.replace(/\-/g, '\\-').replace(/\s+/g, '|') + ')\\b','g');}
function add_class(src, cls_name, str){
	src.className = ((src.className || "").replace(create_exp(cls_name), '') + " " + (str || cls_name)).replace(/\s+/g, ' ').replace(/(^\s+|\s+$)/g,"");
}
function remove_class(src, cls_name){
	src.className = (src.className || "").replace(create_exp(cls_name), '').replace(/\s+/g, ' ').replace(/(^\s+|\s+$)/g,"");
}
function has_class(src, cls_name){
	return create_exp(cls_name).test(src.className || "");
}
function toggle_class(src, cls_name){
	var exp = create_exp(cls_name), has = has_class(src, exp);
	if(has) remove_class(src, exp)
	else add_class(src, exp, cls_name);
	return has;
}

function format(template) {
    var args = Array.prototype.slice.call(arguments, 1);
    if (args.length <= 0) return template;
    return template.replace(/\{(\d+?)\}/g, function ($0, $1) {
        var val = args[parseInt($1)];
        if (val === undefined) return "";
        return val;
    });
}

function ShowSimpleDialog(content, title, width, height) {
    F("#tmdialog").attr("title", title || "提示").html('<div style="padding:15px;">' + content + '</div>').dialog({ showClose: false, height: height || 300, width: width || 400, buttons: { "确定": function () { } } });
}
function ShowSimpleDialog2(content, title, width, height) {
    F("#tmdialog").attr("title", title || "提示").html('<div style="padding:15px;">' + content + '</div>').dialog({ showClose: true, height: height || 300, width: width || 400, buttons: null });
}

function ShowTipsDialog(content, title, width, height) {
    F("#tmdialog").attr("title", title || "提示").html('<div style="padding:15px;">' + content + '</div>').dialog({ showClose: false, height: height || 300, width: width || 400, buttons: null });
}
function ShowTipsAutoClose(content, timeout) {
    F("#tmdialog").html('<div style="padding:15px;">' + content + '</div>').dialog({ showClose: false, showTitle:false, height: 300, width: 400, buttons: null });
    if(timeout>0){
	    window.setTimeout(function(){
			F("#tmdialog").dialog("close");
		}, timeout);
    }
}


function ShowAskDialog(content, fn, buttontext, title, width, height) {
    var options = {};
    for (var i = 0; i < arguments.length; i++) {
        if (typeof arguments[i] == 'object') {
            options = arguments[i];
        }
    }
    var buttons = options.buttons || {};
    buttons[buttontext || "确定.f-btn-ok"] = fn;
    buttons["取消.f-btn-cancel"] = function () { };
    F("#tmdialog").attr("title", title || "提示").html('<div style="padding:15px;">' + content + '</div>').dialog({ showClose: false, height: height || 300, width: width || 400, buttons: buttons });
}
var Pager = function(ele, callback){
	var _ele = ele;
	on(_ele, 'click', function(e){
		var target = fix_event(e);
		if(target.nodeName && target.nodeName.toLowerCase() == 'a'){
		    callback(target.getAttribute("data-page"));
		}
	});
	return function(page, total) {
	    var _recordcount = total, _pagecount = Math.ceil(_recordcount / 10), _start = page - 10, _end = page + 10;
	    if (_recordcount <= 0) return _ele.innerHTML = '没有任何记录';
	    if (_start <= 0) {
	        _end += -_start + 1;
	        if (_end > _pagecount) _end = _pagecount;
	        _start = 1;
	    }
	    if (_end > _pagecount) {
	        _start -= _end - _pagecount;
	        if (_start <= 0) _start = 1;
	        _end = _pagecount;
	    }
	    if (_start > _end) {
	        _start = _start ^ _end;
	        _end = _start ^ _end;
	        _start = _start ^ _end;
	    }
	    var html = '<a data-page="1">首页</a> ';
	    for (var i = _start; i <= _end; i++) {
	        if (page == i) {
	            html += i + ' ';
	        } else {
	            html += '<a data-page="' + i + '">' + i + '</a> ';
	        }
	    }
	    html += '<a data-page="' + _pagecount + '">尾页</a>';
	    _ele.innerHTML = "共" + total + "条记录，" + html;
	};
};
function Lambda(expression) {
    var matches = /^(.+?)\=\>(.+)$/.exec(expression);
    if (!matches) {
        return null;
    }
    return new Function(matches[1].replace(/(\(|\)|\s)/g, '').split(','), 'return '+matches[2]);
}
function IQuery(src) {
    var src_ = null;
    if (typeof jQuery != 'undefined' && src.constructor == jQuery) {
        src_ = [];
        src.each(function () {
            src_.push(this);
        });
    }else{
        src_ = src.slice(0);
    }
    var len = src_.length, position = 0;
	var ins_ = {};
	function select(fn){
		if(typeof fn == 'string'){
			fn = Lambda(fn);
		}
		for(var i=0;i<len;i++){
			src_[i] = fn.call(src_, src_[i],i);
		}
		return ins_;
	}
	function where(fn){
		if(typeof fn == 'string'){
			fn = Lambda(fn);
		}
		for(var i=len-1;i>=0;i--){
			if(fn.call(src_, src_[i],i)===false){
				src_.splice(i,1);
			}
		}
		len = src_.length;
		return ins_;
	}
	function count(){
		return len;
	}
	function take(c){
		return IQuery(src_.slice(position, position+c));
	}
	function skip(c){
		position = c;
		return ins_;
	}
	function contains(v){
		return index(v)>=0;
	}
	function index(v){
		for(var i=0;i<len;i++){
			if(src_[i]==v) return i;
		}
		return -1;
	}
	function value(){
		return src_;
	}

	ins_.select = select;
	ins_.where = where;
	ins_.count = count;
	ins_.take = take;
	ins_.skip = skip;
	ins_.toArray = ins_.value = value;
	ins_.index = index;
	ins_.contains = contains;
	return ins_;
};
/*!
 * jQuery JavaScript Library v1.9.0
 * http://jquery.com/
 *
 * Includes Sizzle.js
 * http://sizzlejs.com/
 *
 * Copyright 2005, 2012 jQuery Foundation, Inc. and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2013-1-14
 */
(function(a2,aF){var w,ai,l=a2.document,aL=a2.location,bi=a2.jQuery,H=a2.$,aa={},a6=[],s="1.9.0",aH=a6.concat,ao=a6.push,a4=a6.slice,aM=a6.indexOf,z=aa.toString,V=aa.hasOwnProperty,aQ=s.trim,bI=function(e,b1){return new bI.fn.init(e,b1,w)},bz=/[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,ac=/\S+/g,C=/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,bp=/^(?:(<[\w\W]+>)[^>]*|#([\w-]*))$/,a=/^<(\w+)\s*\/?>(?:<\/\1>|)$/,bh=/^[\],:{}\s]*$/,bk=/(?:^|:|,)(?:\s*\[)+/g,bF=/\\(?:["\\\/bfnrt]|u[\da-fA-F]{4})/g,aZ=/"[^"\\\r\n]*"|true|false|null|-?(?:\d+\.|)\d+(?:[eE][+-]?\d+|)/g,bR=/^-ms-/,aV=/-([\da-z])/gi,M=function(e,b1){return b1.toUpperCase()},aI=function(){if(l.addEventListener){l.removeEventListener("DOMContentLoaded",aI,false);bI.ready()}else{if(l.readyState==="complete"){l.detachEvent("onreadystatechange",aI);bI.ready()}}};bI.fn=bI.prototype={jquery:s,constructor:bI,init:function(e,b3,b2){var b1,b4;if(!e){return this}if(typeof e==="string"){if(e.charAt(0)==="<"&&e.charAt(e.length-1)===">"&&e.length>=3){b1=[null,e,null]}else{b1=bp.exec(e)}if(b1&&(b1[1]||!b3)){if(b1[1]){b3=b3 instanceof bI?b3[0]:b3;bI.merge(this,bI.parseHTML(b1[1],b3&&b3.nodeType?b3.ownerDocument||b3:l,true));if(a.test(b1[1])&&bI.isPlainObject(b3)){for(b1 in b3){if(bI.isFunction(this[b1])){this[b1](b3[b1])}else{this.attr(b1,b3[b1])}}}return this}else{b4=l.getElementById(b1[2]);if(b4&&b4.parentNode){if(b4.id!==b1[2]){return b2.find(e)}this.length=1;this[0]=b4}this.context=l;this.selector=e;return this}}else{if(!b3||b3.jquery){return(b3||b2).find(e)}else{return this.constructor(b3).find(e)}}}else{if(e.nodeType){this.context=this[0]=e;this.length=1;return this}else{if(bI.isFunction(e)){return b2.ready(e)}}}if(e.selector!==aF){this.selector=e.selector;this.context=e.context}return bI.makeArray(e,this)},selector:"",length:0,size:function(){return this.length},toArray:function(){return a4.call(this)},get:function(e){return e==null?this.toArray():(e<0?this[this.length+e]:this[e])},pushStack:function(e){var b1=bI.merge(this.constructor(),e);b1.prevObject=this;b1.context=this.context;return b1},each:function(b1,e){return bI.each(this,b1,e)},ready:function(e){bI.ready.promise().done(e);return this},slice:function(){return this.pushStack(a4.apply(this,arguments))},first:function(){return this.eq(0)},last:function(){return this.eq(-1)},eq:function(b2){var e=this.length,b1=+b2+(b2<0?e:0);return this.pushStack(b1>=0&&b1<e?[this[b1]]:[])},map:function(e){return this.pushStack(bI.map(this,function(b2,b1){return e.call(b2,b1,b2)}))},end:function(){return this.prevObject||this.constructor(null)},push:ao,sort:[].sort,splice:[].splice};bI.fn.init.prototype=bI.fn;bI.extend=bI.fn.extend=function(){var b9,b2,e,b1,b6,b7,b5=arguments[0]||{},b4=1,b3=arguments.length,b8=false;if(typeof b5==="boolean"){b8=b5;b5=arguments[1]||{};b4=2}if(typeof b5!=="object"&&!bI.isFunction(b5)){b5={}}if(b3===b4){b5=this;--b4}for(;b4<b3;b4++){if((b9=arguments[b4])!=null){for(b2 in b9){e=b5[b2];b1=b9[b2];if(b5===b1){continue}if(b8&&b1&&(bI.isPlainObject(b1)||(b6=bI.isArray(b1)))){if(b6){b6=false;b7=e&&bI.isArray(e)?e:[]}else{b7=e&&bI.isPlainObject(e)?e:{}}b5[b2]=bI.extend(b8,b7,b1)}else{if(b1!==aF){b5[b2]=b1}}}}}return b5};bI.extend({noConflict:function(e){if(a2.$===bI){a2.$=H}if(e&&a2.jQuery===bI){a2.jQuery=bi}return bI},isReady:false,readyWait:1,holdReady:function(e){if(e){bI.readyWait++}else{bI.ready(true)}},ready:function(e){if(e===true?--bI.readyWait:bI.isReady){return}if(!l.body){return setTimeout(bI.ready)}bI.isReady=true;if(e!==true&&--bI.readyWait>0){return}ai.resolveWith(l,[bI]);if(bI.fn.trigger){bI(l).trigger("ready").off("ready")}},isFunction:function(e){return bI.type(e)==="function"},isArray:Array.isArray||function(e){return bI.type(e)==="array"},isWindow:function(e){return e!=null&&e==e.window},isNumeric:function(e){return !isNaN(parseFloat(e))&&isFinite(e)},type:function(e){if(e==null){return String(e)}return typeof e==="object"||typeof e==="function"?aa[z.call(e)]||"object":typeof e},isPlainObject:function(b3){if(!b3||bI.type(b3)!=="object"||b3.nodeType||bI.isWindow(b3)){return false}try{if(b3.constructor&&!V.call(b3,"constructor")&&!V.call(b3.constructor.prototype,"isPrototypeOf")){return false}}catch(b2){return false}var b1;for(b1 in b3){}return b1===aF||V.call(b3,b1)},isEmptyObject:function(b1){var e;for(e in b1){return false}return true},error:function(e){throw new Error(e)},parseHTML:function(b4,b2,b3){if(!b4||typeof b4!=="string"){return null}if(typeof b2==="boolean"){b3=b2;b2=false}b2=b2||l;var b1=a.exec(b4),e=!b3&&[];if(b1){return[b2.createElement(b1[1])]}b1=bI.buildFragment([b4],b2,e);if(e){bI(e).remove()}return bI.merge([],b1.childNodes)},parseJSON:function(e){if(a2.JSON&&a2.JSON.parse){return a2.JSON.parse(e)}if(e===null){return e}if(typeof e==="string"){e=bI.trim(e);if(e){if(bh.test(e.replace(bF,"@").replace(aZ,"]").replace(bk,""))){return(new Function("return "+e))()}}}bI.error("Invalid JSON: "+e)},parseXML:function(b3){var b1,b2;if(!b3||typeof b3!=="string"){return null}try{if(a2.DOMParser){b2=new DOMParser();b1=b2.parseFromString(b3,"text/xml")}else{b1=new ActiveXObject("Microsoft.XMLDOM");b1.async="false";b1.loadXML(b3)}}catch(b4){b1=aF}if(!b1||!b1.documentElement||b1.getElementsByTagName("parsererror").length){bI.error("Invalid XML: "+b3)}return b1},noop:function(){},globalEval:function(e){if(e&&bI.trim(e)){(a2.execScript||function(b1){a2["eval"].call(a2,b1)})(e)}},camelCase:function(e){return e.replace(bR,"ms-").replace(aV,M)},nodeName:function(b1,e){return b1.nodeName&&b1.nodeName.toLowerCase()===e.toLowerCase()},each:function(b5,b6,b1){var b4,b2=0,b3=b5.length,e=ab(b5);if(b1){if(e){for(;b2<b3;b2++){b4=b6.apply(b5[b2],b1);if(b4===false){break}}}else{for(b2 in b5){b4=b6.apply(b5[b2],b1);if(b4===false){break}}}}else{if(e){for(;b2<b3;b2++){b4=b6.call(b5[b2],b2,b5[b2]);if(b4===false){break}}}else{for(b2 in b5){b4=b6.call(b5[b2],b2,b5[b2]);if(b4===false){break}}}}return b5},trim:aQ&&!aQ.call("\uFEFF\xA0")?function(e){return e==null?"":aQ.call(e)}:function(e){return e==null?"":(e+"").replace(C,"")},makeArray:function(e,b2){var b1=b2||[];if(e!=null){if(ab(Object(e))){bI.merge(b1,typeof e==="string"?[e]:e)}else{ao.call(b1,e)}}return b1},inArray:function(b3,b1,b2){var e;if(b1){if(aM){return aM.call(b1,b3,b2)}e=b1.length;b2=b2?b2<0?Math.max(0,e+b2):b2:0;for(;b2<e;b2++){if(b2 in b1&&b1[b2]===b3){return b2}}}return -1},merge:function(b4,b2){var e=b2.length,b3=b4.length,b1=0;if(typeof e==="number"){for(;b1<e;b1++){b4[b3++]=b2[b1]}}else{while(b2[b1]!==aF){b4[b3++]=b2[b1++]}}b4.length=b3;return b4},grep:function(b1,b6,e){var b5,b2=[],b3=0,b4=b1.length;e=!!e;for(;b3<b4;b3++){b5=!!b6(b1[b3],b3);if(e!==b5){b2.push(b1[b3])}}return b2},map:function(b2,b7,e){var b6,b4=0,b5=b2.length,b1=ab(b2),b3=[];if(b1){for(;b4<b5;b4++){b6=b7(b2[b4],b4,e);if(b6!=null){b3[b3.length]=b6}}}else{for(b4 in b2){b6=b7(b2[b4],b4,e);if(b6!=null){b3[b3.length]=b6}}}return aH.apply([],b3)},guid:1,proxy:function(b4,b3){var b2,e,b1;if(typeof b3==="string"){b2=b4[b3];b3=b4;b4=b2}if(!bI.isFunction(b4)){return aF}e=a4.call(arguments,2);b1=function(){return b4.apply(b3||this,e.concat(a4.call(arguments)))};b1.guid=b4.guid=b4.guid||bI.guid++;return b1},access:function(e,b5,b7,b6,b3,b9,b8){var b2=0,b1=e.length,b4=b7==null;if(bI.type(b7)==="object"){b3=true;for(b2 in b7){bI.access(e,b5,b2,b7[b2],true,b9,b8)}}else{if(b6!==aF){b3=true;if(!bI.isFunction(b6)){b8=true}if(b4){if(b8){b5.call(e,b6);b5=null}else{b4=b5;b5=function(cb,ca,cc){return b4.call(bI(cb),cc)}}}if(b5){for(;b2<b1;b2++){b5(e[b2],b7,b8?b6:b6.call(e[b2],b2,b5(e[b2],b7)))}}}}return b3?e:b4?b5.call(e):b1?b5(e[0],b7):b9},now:function(){return(new Date()).getTime()}});bI.ready.promise=function(b4){if(!ai){ai=bI.Deferred();if(l.readyState==="complete"){setTimeout(bI.ready)}else{if(l.addEventListener){l.addEventListener("DOMContentLoaded",aI,false);a2.addEventListener("load",bI.ready,false)}else{l.attachEvent("onreadystatechange",aI);a2.attachEvent("onload",bI.ready);var b3=false;try{b3=a2.frameElement==null&&l.documentElement}catch(b2){}if(b3&&b3.doScroll){(function b1(){if(!bI.isReady){try{b3.doScroll("left")}catch(b5){return setTimeout(b1,50)}bI.ready()}})()}}}}return ai.promise(b4)};bI.each("Boolean Number String Function Array Date RegExp Object Error".split(" "),function(b1,e){aa["[object "+e+"]"]=e.toLowerCase()});function ab(b2){var b1=b2.length,e=bI.type(b2);if(bI.isWindow(b2)){return false}if(b2.nodeType===1&&b1){return true}return e==="array"||e!=="function"&&(b1===0||typeof b1==="number"&&b1>0&&(b1-1) in b2)}w=bI(l);var bW={};function ae(b1){var e=bW[b1]={};bI.each(b1.match(ac)||[],function(b3,b2){e[b2]=true});return e}bI.Callbacks=function(ca){ca=typeof ca==="string"?(bW[ca]||ae(ca)):bI.extend({},ca);var b3,e,b4,b2,b5,b6,b7=[],b8=!ca.once&&[],b1=function(cb){b3=ca.memory&&cb;e=true;b6=b2||0;b2=0;b5=b7.length;b4=true;for(;b7&&b6<b5;b6++){if(b7[b6].apply(cb[0],cb[1])===false&&ca.stopOnFalse){b3=false;break}}b4=false;if(b7){if(b8){if(b8.length){b1(b8.shift())}}else{if(b3){b7=[]}else{b9.disable()}}}},b9={add:function(){if(b7){var cc=b7.length;(function cb(cd){bI.each(cd,function(cf,ce){var cg=bI.type(ce);if(cg==="function"){if(!ca.unique||!b9.has(ce)){b7.push(ce)}}else{if(ce&&ce.length&&cg!=="string"){cb(ce)}}})})(arguments);if(b4){b5=b7.length}else{if(b3){b2=cc;b1(b3)}}}return this},remove:function(){if(b7){bI.each(arguments,function(cd,cb){var cc;while((cc=bI.inArray(cb,b7,cc))>-1){b7.splice(cc,1);if(b4){if(cc<=b5){b5--}if(cc<=b6){b6--}}}})}return this},has:function(cb){return bI.inArray(cb,b7)>-1},empty:function(){b7=[];return this},disable:function(){b7=b8=b3=aF;return this},disabled:function(){return !b7},lock:function(){b8=aF;if(!b3){b9.disable()}return this},locked:function(){return !b8},fireWith:function(cc,cb){cb=cb||[];cb=[cc,cb.slice?cb.slice():cb];if(b7&&(!e||b8)){if(b4){b8.push(cb)}else{b1(cb)}}return this},fire:function(){b9.fireWith(this,arguments);return this},fired:function(){return !!e}};return b9};bI.extend({Deferred:function(b2){var b1=[["resolve","done",bI.Callbacks("once memory"),"resolved"],["reject","fail",bI.Callbacks("once memory"),"rejected"],["notify","progress",bI.Callbacks("memory")]],b3="pending",b4={state:function(){return b3},always:function(){e.done(arguments).fail(arguments);return this},then:function(){var b5=arguments;return bI.Deferred(function(b6){bI.each(b1,function(b8,b7){var ca=b7[0],b9=bI.isFunction(b5[b8])&&b5[b8];e[b7[1]](function(){var cb=b9&&b9.apply(this,arguments);if(cb&&bI.isFunction(cb.promise)){cb.promise().done(b6.resolve).fail(b6.reject).progress(b6.notify)}else{b6[ca+"With"](this===b4?b6.promise():this,b9?[cb]:arguments)}})});b5=null}).promise()},promise:function(b5){return b5!=null?bI.extend(b5,b4):b4}},e={};b4.pipe=b4.then;bI.each(b1,function(b6,b5){var b8=b5[2],b7=b5[3];b4[b5[1]]=b8.add;if(b7){b8.add(function(){b3=b7},b1[b6^1][2].disable,b1[2][2].lock)}e[b5[0]]=function(){e[b5[0]+"With"](this===e?b4:this,arguments);return this};e[b5[0]+"With"]=b8.fireWith});b4.promise(e);if(b2){b2.call(e,e)}return e},when:function(b4){var b2=0,b6=a4.call(arguments),e=b6.length,b1=e!==1||(b4&&bI.isFunction(b4.promise))?e:0,b9=b1===1?b4:bI.Deferred(),b3=function(cb,cc,ca){return function(cd){cc[cb]=this;ca[cb]=arguments.length>1?a4.call(arguments):cd;if(ca===b8){b9.notifyWith(cc,ca)}else{if(!(--b1)){b9.resolveWith(cc,ca)}}}},b8,b5,b7;if(e>1){b8=new Array(e);b5=new Array(e);b7=new Array(e);for(;b2<e;b2++){if(b6[b2]&&bI.isFunction(b6[b2].promise)){b6[b2].promise().done(b3(b2,b7,b6)).fail(b9.reject).progress(b3(b2,b5,b8))}else{--b1}}}if(!b1){b9.resolveWith(b7,b6)}return b9.promise()}});bI.support=(function(){var cc,cb,b9,ca,b3,b8,b7,b5,b2,b4,b1=l.createElement("div");b1.setAttribute("className","t");b1.innerHTML="  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";cb=b1.getElementsByTagName("*");b9=b1.getElementsByTagName("a")[0];if(!cb||!b9||!cb.length){return{}}ca=l.createElement("select");b3=ca.appendChild(l.createElement("option"));b8=b1.getElementsByTagName("input")[0];b9.style.cssText="top:1px;float:left;opacity:.5";cc={getSetAttribute:b1.className!=="t",leadingWhitespace:b1.firstChild.nodeType===3,tbody:!b1.getElementsByTagName("tbody").length,htmlSerialize:!!b1.getElementsByTagName("link").length,style:/top/.test(b9.getAttribute("style")),hrefNormalized:b9.getAttribute("href")==="/a",opacity:/^0.5/.test(b9.style.opacity),cssFloat:!!b9.style.cssFloat,checkOn:!!b8.value,optSelected:b3.selected,enctype:!!l.createElement("form").enctype,html5Clone:l.createElement("nav").cloneNode(true).outerHTML!=="<:nav></:nav>",boxModel:l.compatMode==="CSS1Compat",deleteExpando:true,noCloneEvent:true,inlineBlockNeedsLayout:false,shrinkWrapBlocks:false,reliableMarginRight:true,boxSizingReliable:true,pixelPosition:false};b8.checked=true;cc.noCloneChecked=b8.cloneNode(true).checked;ca.disabled=true;cc.optDisabled=!b3.disabled;try{delete b1.test}catch(b6){cc.deleteExpando=false}b8=l.createElement("input");b8.setAttribute("value","");cc.input=b8.getAttribute("value")==="";b8.value="t";b8.setAttribute("type","radio");cc.radioValue=b8.value==="t";b8.setAttribute("checked","t");b8.setAttribute("name","t");b7=l.createDocumentFragment();b7.appendChild(b8);cc.appendChecked=b8.checked;cc.checkClone=b7.cloneNode(true).cloneNode(true).lastChild.checked;if(b1.attachEvent){b1.attachEvent("onclick",function(){cc.noCloneEvent=false});b1.cloneNode(true).click()}for(b4 in {submit:true,change:true,focusin:true}){b1.setAttribute(b5="on"+b4,"t");cc[b4+"Bubbles"]=b5 in a2||b1.attributes[b5].expando===false}b1.style.backgroundClip="content-box";b1.cloneNode(true).style.backgroundClip="";cc.clearCloneStyle=b1.style.backgroundClip==="content-box";bI(function(){var cd,cg,cf,ce="padding:0;margin:0;border:0;display:block;box-sizing:content-box;-moz-box-sizing:content-box;-webkit-box-sizing:content-box;",e=l.getElementsByTagName("body")[0];if(!e){return}cd=l.createElement("div");cd.style.cssText="border:0;width:0;height:0;position:absolute;top:0;left:-9999px;margin-top:1px";e.appendChild(cd).appendChild(b1);b1.innerHTML="<table><tr><td></td><td>t</td></tr></table>";cf=b1.getElementsByTagName("td");cf[0].style.cssText="padding:0;margin:0;border:0;display:none";b2=(cf[0].offsetHeight===0);cf[0].style.display="";cf[1].style.display="none";cc.reliableHiddenOffsets=b2&&(cf[0].offsetHeight===0);b1.innerHTML="";b1.style.cssText="box-sizing:border-box;-moz-box-sizing:border-box;-webkit-box-sizing:border-box;padding:1px;border:1px;display:block;width:4px;margin-top:1%;position:absolute;top:1%;";cc.boxSizing=(b1.offsetWidth===4);cc.doesNotIncludeMarginInBodyOffset=(e.offsetTop!==1);if(a2.getComputedStyle){cc.pixelPosition=(a2.getComputedStyle(b1,null)||{}).top!=="1%";cc.boxSizingReliable=(a2.getComputedStyle(b1,null)||{width:"4px"}).width==="4px";cg=b1.appendChild(l.createElement("div"));cg.style.cssText=b1.style.cssText=ce;cg.style.marginRight=cg.style.width="0";b1.style.width="1px";cc.reliableMarginRight=!parseFloat((a2.getComputedStyle(cg,null)||{}).marginRight)}if(typeof b1.style.zoom!=="undefined"){b1.innerHTML="";b1.style.cssText=ce+"width:1px;padding:1px;display:inline;zoom:1";cc.inlineBlockNeedsLayout=(b1.offsetWidth===3);b1.style.display="block";b1.innerHTML="<div></div>";b1.firstChild.style.width="5px";cc.shrinkWrapBlocks=(b1.offsetWidth!==3);e.style.zoom=1}e.removeChild(cd);cd=b1=cf=cg=null});cb=ca=b7=b3=b9=b8=null;return cc})();var bv=/(?:\{[\s\S]*\}|\[[\s\S]*\])$/,aN=/([A-Z])/g;function ba(b3,b1,b5,b4){if(!bI.acceptData(b3)){return}var b6,b8,b9=bI.expando,b7=typeof b1==="string",ca=b3.nodeType,e=ca?bI.cache:b3,b2=ca?b3[b9]:b3[b9]&&b9;if((!b2||!e[b2]||(!b4&&!e[b2].data))&&b7&&b5===aF){return}if(!b2){if(ca){b3[b9]=b2=a6.pop()||bI.guid++}else{b2=b9}}if(!e[b2]){e[b2]={};if(!ca){e[b2].toJSON=bI.noop}}if(typeof b1==="object"||typeof b1==="function"){if(b4){e[b2]=bI.extend(e[b2],b1)}else{e[b2].data=bI.extend(e[b2].data,b1)}}b6=e[b2];if(!b4){if(!b6.data){b6.data={}}b6=b6.data}if(b5!==aF){b6[bI.camelCase(b1)]=b5}if(b7){b8=b6[b1];if(b8==null){b8=b6[bI.camelCase(b1)]}}else{b8=b6}return b8}function Z(b3,b1,b4){if(!bI.acceptData(b3)){return}var b7,b6,b5,b8=b3.nodeType,e=b8?bI.cache:b3,b2=b8?b3[bI.expando]:bI.expando;if(!e[b2]){return}if(b1){b7=b4?e[b2]:e[b2].data;if(b7){if(!bI.isArray(b1)){if(b1 in b7){b1=[b1]}else{b1=bI.camelCase(b1);if(b1 in b7){b1=[b1]}else{b1=b1.split(" ")}}}else{b1=b1.concat(bI.map(b1,bI.camelCase))}for(b6=0,b5=b1.length;b6<b5;b6++){delete b7[b1[b6]]}if(!(b4?N:bI.isEmptyObject)(b7)){return}}}if(!b4){delete e[b2].data;if(!N(e[b2])){return}}if(b8){bI.cleanData([b3],true)}else{if(bI.support.deleteExpando||e!=e.window){delete e[b2]}else{e[b2]=null}}}bI.extend({cache:{},expando:"jQuery"+(s+Math.random()).replace(/\D/g,""),noData:{embed:true,object:"clsid:D27CDB6E-AE6D-11cf-96B8-444553540000",applet:true},hasData:function(e){e=e.nodeType?bI.cache[e[bI.expando]]:e[bI.expando];return !!e&&!N(e)},data:function(b1,e,b2){return ba(b1,e,b2,false)},removeData:function(b1,e){return Z(b1,e,false)},_data:function(b1,e,b2){return ba(b1,e,b2,true)},_removeData:function(b1,e){return Z(b1,e,true)},acceptData:function(b1){var e=b1.nodeName&&bI.noData[b1.nodeName.toLowerCase()];return !e||e!==true&&b1.getAttribute("classid")===e}});bI.fn.extend({data:function(b3,b6){var b1,e,b4=this[0],b2=0,b5=null;if(b3===aF){if(this.length){b5=bI.data(b4);if(b4.nodeType===1&&!bI._data(b4,"parsedAttrs")){b1=b4.attributes;for(;b2<b1.length;b2++){e=b1[b2].name;if(!e.indexOf("data-")){e=bI.camelCase(e.substring(5));bx(b4,e,b5[e])}}bI._data(b4,"parsedAttrs",true)}}return b5}if(typeof b3==="object"){return this.each(function(){bI.data(this,b3)})}return bI.access(this,function(b7){if(b7===aF){return b4?bx(b4,b3,bI.data(b4,b3)):null}this.each(function(){bI.data(this,b3,b7)})},null,b6,arguments.length>1,null,true)},removeData:function(e){return this.each(function(){bI.removeData(this,e)})}});function bx(b3,b2,b4){if(b4===aF&&b3.nodeType===1){var b1="data-"+b2.replace(aN,"-$1").toLowerCase();b4=b3.getAttribute(b1);if(typeof b4==="string"){try{b4=b4==="true"?true:b4==="false"?false:b4==="null"?null:+b4+""===b4?+b4:bv.test(b4)?bI.parseJSON(b4):b4}catch(b5){}bI.data(b3,b2,b4)}else{b4=aF}}return b4}function N(b1){var e;for(e in b1){if(e==="data"&&bI.isEmptyObject(b1[e])){continue}if(e!=="toJSON"){return false}}return true}bI.extend({queue:function(b2,b1,b3){var e;if(b2){b1=(b1||"fx")+"queue";e=bI._data(b2,b1);if(b3){if(!e||bI.isArray(b3)){e=bI._data(b2,b1,bI.makeArray(b3))}else{e.push(b3)}}return e||[]}},dequeue:function(b5,b4){b4=b4||"fx";var b1=bI.queue(b5,b4),b6=b1.length,b3=b1.shift(),e=bI._queueHooks(b5,b4),b2=function(){bI.dequeue(b5,b4)};if(b3==="inprogress"){b3=b1.shift();b6--}e.cur=b3;if(b3){if(b4==="fx"){b1.unshift("inprogress")}delete e.stop;b3.call(b5,b2,e)}if(!b6&&e){e.empty.fire()}},_queueHooks:function(b2,b1){var e=b1+"queueHooks";return bI._data(b2,e)||bI._data(b2,e,{empty:bI.Callbacks("once memory").add(function(){bI._removeData(b2,b1+"queue");bI._removeData(b2,e)})})}});bI.fn.extend({queue:function(e,b1){var b2=2;if(typeof e!=="string"){b1=e;e="fx";b2--}if(arguments.length<b2){return bI.queue(this[0],e)}return b1===aF?this:this.each(function(){var b3=bI.queue(this,e,b1);bI._queueHooks(this,e);if(e==="fx"&&b3[0]!=="inprogress"){bI.dequeue(this,e)}})},dequeue:function(e){return this.each(function(){bI.dequeue(this,e)})},delay:function(b1,e){b1=bI.fx?bI.fx.speeds[b1]||b1:b1;e=e||"fx";return this.queue(e,function(b3,b2){var b4=setTimeout(b3,b1);b2.stop=function(){clearTimeout(b4)}})},clearQueue:function(e){return this.queue(e||"fx",[])},promise:function(b2,b6){var b1,b3=1,b7=bI.Deferred(),b5=this,e=this.length,b4=function(){if(!(--b3)){b7.resolveWith(b5,[b5])}};if(typeof b2!=="string"){b6=b2;b2=aF}b2=b2||"fx";while(e--){b1=bI._data(b5[e],b2+"queueHooks");if(b1&&b1.empty){b3++;b1.empty.add(b4)}}b4();return b7.promise(b6)}});var a8,bX,bL=/[\t\r\n]/g,ak=/\r/g,aE=/^(?:input|select|textarea|button|object)$/i,D=/^(?:a|area)$/i,L=/^(?:checked|selected|autofocus|autoplay|async|controls|defer|disabled|hidden|loop|multiple|open|readonly|required|scoped)$/i,aq=/^(?:checked|selected)$/i,bO=bI.support.getSetAttribute,bE=bI.support.input;bI.fn.extend({attr:function(e,b1){return bI.access(this,bI.attr,e,b1,arguments.length>1)},removeAttr:function(e){return this.each(function(){bI.removeAttr(this,e)})},prop:function(e,b1){return bI.access(this,bI.prop,e,b1,arguments.length>1)},removeProp:function(e){e=bI.propFix[e]||e;return this.each(function(){try{this[e]=aF;delete this[e]}catch(b1){}})},addClass:function(b7){var b1,e,b8,b4,b2,b3=0,b5=this.length,b6=typeof b7==="string"&&b7;if(bI.isFunction(b7)){return this.each(function(b9){bI(this).addClass(b7.call(this,b9,this.className))})}if(b6){b1=(b7||"").match(ac)||[];for(;b3<b5;b3++){e=this[b3];b8=e.nodeType===1&&(e.className?(" "+e.className+" ").replace(bL," "):" ");if(b8){b2=0;while((b4=b1[b2++])){if(b8.indexOf(" "+b4+" ")<0){b8+=b4+" "}}e.className=bI.trim(b8)}}}return this},removeClass:function(b7){var b1,e,b8,b4,b2,b3=0,b5=this.length,b6=arguments.length===0||typeof b7==="string"&&b7;if(bI.isFunction(b7)){return this.each(function(b9){bI(this).removeClass(b7.call(this,b9,this.className))})}if(b6){b1=(b7||"").match(ac)||[];for(;b3<b5;b3++){e=this[b3];b8=e.nodeType===1&&(e.className?(" "+e.className+" ").replace(bL," "):"");if(b8){b2=0;while((b4=b1[b2++])){while(b8.indexOf(" "+b4+" ")>=0){b8=b8.replace(" "+b4+" "," ")}}e.className=b7?bI.trim(b8):""}}}return this},toggleClass:function(b3,b1){var b2=typeof b3,e=typeof b1==="boolean";if(bI.isFunction(b3)){return this.each(function(b4){bI(this).toggleClass(b3.call(this,b4,this.className,b1),b1)})}return this.each(function(){if(b2==="string"){var b6,b5=0,b4=bI(this),b7=b1,b8=b3.match(ac)||[];while((b6=b8[b5++])){b7=e?b7:!b4.hasClass(b6);b4[b7?"addClass":"removeClass"](b6)}}else{if(b2==="undefined"||b2==="boolean"){if(this.className){bI._data(this,"__className__",this.className)}this.className=this.className||b3===false?"":bI._data(this,"__className__")||""}}})},hasClass:function(e){var b3=" "+e+" ",b2=0,b1=this.length;for(;b2<b1;b2++){if(this[b2].nodeType===1&&(" "+this[b2].className+" ").replace(bL," ").indexOf(b3)>=0){return true}}return false},val:function(b3){var e,b1,b4,b2=this[0];if(!arguments.length){if(b2){e=bI.valHooks[b2.type]||bI.valHooks[b2.nodeName.toLowerCase()];if(e&&"get" in e&&(b1=e.get(b2,"value"))!==aF){return b1}b1=b2.value;return typeof b1==="string"?b1.replace(ak,""):b1==null?"":b1}return}b4=bI.isFunction(b3);return this.each(function(b6){var b7,b5=bI(this);if(this.nodeType!==1){return}if(b4){b7=b3.call(this,b6,b5.val())}else{b7=b3}if(b7==null){b7=""}else{if(typeof b7==="number"){b7+=""}else{if(bI.isArray(b7)){b7=bI.map(b7,function(b8){return b8==null?"":b8+""})}}}e=bI.valHooks[this.type]||bI.valHooks[this.nodeName.toLowerCase()];if(!e||!("set" in e)||e.set(this,b7,"value")===aF){this.value=b7}})}});bI.extend({valHooks:{option:{get:function(e){var b1=e.attributes.value;return !b1||b1.specified?e.value:e.text}},select:{get:function(e){var b6,b2,b8=e.options,b4=e.selectedIndex,b3=e.type==="select-one"||b4<0,b7=b3?null:[],b5=b3?b4+1:b8.length,b1=b4<0?b5:b3?b4:0;for(;b1<b5;b1++){b2=b8[b1];if((b2.selected||b1===b4)&&(bI.support.optDisabled?!b2.disabled:b2.getAttribute("disabled")===null)&&(!b2.parentNode.disabled||!bI.nodeName(b2.parentNode,"optgroup"))){b6=bI(b2).val();if(b3){return b6}b7.push(b6)}}return b7},set:function(b1,b2){var e=bI.makeArray(b2);bI(b1).find("option").each(function(){this.selected=bI.inArray(bI(this).val(),e)>=0});if(!e.length){b1.selectedIndex=-1}return e}}},attr:function(b5,b3,b6){var b2,e,b4,b1=b5.nodeType;if(!b5||b1===3||b1===8||b1===2){return}if(typeof b5.getAttribute==="undefined"){return bI.prop(b5,b3,b6)}b4=b1!==1||!bI.isXMLDoc(b5);if(b4){b3=b3.toLowerCase();e=bI.attrHooks[b3]||(L.test(b3)?bX:a8)}if(b6!==aF){if(b6===null){bI.removeAttr(b5,b3)}else{if(e&&b4&&"set" in e&&(b2=e.set(b5,b6,b3))!==aF){return b2}else{b5.setAttribute(b3,b6+"");return b6}}}else{if(e&&b4&&"get" in e&&(b2=e.get(b5,b3))!==null){return b2}else{if(typeof b5.getAttribute!=="undefined"){b2=b5.getAttribute(b3)}return b2==null?aF:b2}}},removeAttr:function(b2,b4){var e,b3,b1=0,b5=b4&&b4.match(ac);if(b5&&b2.nodeType===1){while((e=b5[b1++])){b3=bI.propFix[e]||e;if(L.test(e)){if(!bO&&aq.test(e)){b2[bI.camelCase("default-"+e)]=b2[b3]=false}else{b2[b3]=false}}else{bI.attr(b2,e,"")}b2.removeAttribute(bO?e:b3)}}},attrHooks:{type:{set:function(e,b1){if(!bI.support.radioValue&&b1==="radio"&&bI.nodeName(e,"input")){var b2=e.value;e.setAttribute("type",b1);if(b2){e.value=b2}return b1}}}},propFix:{tabindex:"tabIndex",readonly:"readOnly","for":"htmlFor","class":"className",maxlength:"maxLength",cellspacing:"cellSpacing",cellpadding:"cellPadding",rowspan:"rowSpan",colspan:"colSpan",usemap:"useMap",frameborder:"frameBorder",contenteditable:"contentEditable"},prop:function(b5,b3,b6){var b2,e,b4,b1=b5.nodeType;if(!b5||b1===3||b1===8||b1===2){return}b4=b1!==1||!bI.isXMLDoc(b5);if(b4){b3=bI.propFix[b3]||b3;e=bI.propHooks[b3]}if(b6!==aF){if(e&&"set" in e&&(b2=e.set(b5,b6,b3))!==aF){return b2}else{return(b5[b3]=b6)}}else{if(e&&"get" in e&&(b2=e.get(b5,b3))!==null){return b2}else{return b5[b3]}}},propHooks:{tabIndex:{get:function(b1){var e=b1.getAttributeNode("tabindex");return e&&e.specified?parseInt(e.value,10):aE.test(b1.nodeName)||D.test(b1.nodeName)&&b1.href?0:aF}}}});bX={get:function(b3,b1){var b4=bI.prop(b3,b1),e=typeof b4==="boolean"&&b3.getAttribute(b1),b2=typeof b4==="boolean"?bE&&bO?e!=null:aq.test(b1)?b3[bI.camelCase("default-"+b1)]:!!e:b3.getAttributeNode(b1);return b2&&b2.value!==false?b1.toLowerCase():aF},set:function(b1,b2,e){if(b2===false){bI.removeAttr(b1,e)}else{if(bE&&bO||!aq.test(e)){b1.setAttribute(!bO&&bI.propFix[e]||e,e)}else{b1[bI.camelCase("default-"+e)]=b1[e]=true}}return e}};if(!bE||!bO){bI.attrHooks.value={get:function(b2,b1){var e=b2.getAttributeNode(b1);return bI.nodeName(b2,"input")?b2.defaultValue:e&&e.specified?e.value:aF},set:function(b1,b2,e){if(bI.nodeName(b1,"input")){b1.defaultValue=b2}else{return a8&&a8.set(b1,b2,e)}}}}if(!bO){a8=bI.valHooks.button={get:function(b2,b1){var e=b2.getAttributeNode(b1);return e&&(b1==="id"||b1==="name"||b1==="coords"?e.value!=="":e.specified)?e.value:aF},set:function(b2,b3,b1){var e=b2.getAttributeNode(b1);if(!e){b2.setAttributeNode((e=b2.ownerDocument.createAttribute(b1)))}e.value=b3+="";return b1==="value"||b3===b2.getAttribute(b1)?b3:aF}};bI.attrHooks.contenteditable={get:a8.get,set:function(b1,b2,e){a8.set(b1,b2===""?false:b2,e)}};bI.each(["width","height"],function(b1,e){bI.attrHooks[e]=bI.extend(bI.attrHooks[e],{set:function(b2,b3){if(b3===""){b2.setAttribute(e,"auto");return b3}}})})}if(!bI.support.hrefNormalized){bI.each(["href","src","width","height"],function(b1,e){bI.attrHooks[e]=bI.extend(bI.attrHooks[e],{get:function(b3){var b2=b3.getAttribute(e,2);return b2==null?aF:b2}})});bI.each(["href","src"],function(b1,e){bI.propHooks[e]={get:function(b2){return b2.getAttribute(e,4)}}})}if(!bI.support.style){bI.attrHooks.style={get:function(e){return e.style.cssText||aF},set:function(e,b1){return(e.style.cssText=b1+"")}}}if(!bI.support.optSelected){bI.propHooks.selected=bI.extend(bI.propHooks.selected,{get:function(b1){var e=b1.parentNode;if(e){e.selectedIndex;if(e.parentNode){e.parentNode.selectedIndex}}return null}})}if(!bI.support.enctype){bI.propFix.enctype="encoding"}if(!bI.support.checkOn){bI.each(["radio","checkbox"],function(){bI.valHooks[this]={get:function(e){return e.getAttribute("value")===null?"on":e.value}}})}bI.each(["radio","checkbox"],function(){bI.valHooks[this]=bI.extend(bI.valHooks[this],{set:function(e,b1){if(bI.isArray(b1)){return(e.checked=bI.inArray(bI(e).val(),b1)>=0)}}})});var bG=/^(?:input|select|textarea)$/i,a3=/^key/,bM=/^(?:mouse|contextmenu)|click/,bA=/^(?:focusinfocus|focusoutblur)$/,bt=/^([^.]*)(?:\.(.+)|)$/;function R(){return true}function X(){return false}bI.event={global:{},add:function(b4,b9,cg,b6,b5){var b2,b8,b7,cf,ce,cd,cb,b3,cc,e,b1,ca=b4.nodeType!==3&&b4.nodeType!==8&&bI._data(b4);if(!ca){return}if(cg.handler){b2=cg;cg=b2.handler;b5=b2.selector}if(!cg.guid){cg.guid=bI.guid++}if(!(cf=ca.events)){cf=ca.events={}}if(!(b8=ca.handle)){b8=ca.handle=function(ch){return typeof bI!=="undefined"&&(!ch||bI.event.triggered!==ch.type)?bI.event.dispatch.apply(b8.elem,arguments):aF};b8.elem=b4}b9=(b9||"").match(ac)||[""];ce=b9.length;while(ce--){b7=bt.exec(b9[ce])||[];cc=b1=b7[1];e=(b7[2]||"").split(".").sort();cb=bI.event.special[cc]||{};cc=(b5?cb.delegateType:cb.bindType)||cc;cb=bI.event.special[cc]||{};cd=bI.extend({type:cc,origType:b1,data:b6,handler:cg,guid:cg.guid,selector:b5,needsContext:b5&&bI.expr.match.needsContext.test(b5),namespace:e.join(".")},b2);if(!(b3=cf[cc])){b3=cf[cc]=[];b3.delegateCount=0;if(!cb.setup||cb.setup.call(b4,b6,e,b8)===false){if(b4.addEventListener){b4.addEventListener(cc,b8,false)}else{if(b4.attachEvent){b4.attachEvent("on"+cc,b8)}}}}if(cb.add){cb.add.call(b4,cd);if(!cd.handler.guid){cd.handler.guid=cg.guid}}if(b5){b3.splice(b3.delegateCount++,0,cd)}else{b3.push(cd)}bI.event.global[cc]=true}b4=null},remove:function(b3,b9,cg,b4,b8){var b6,b5,b7,cf,ce,cd,cb,b2,cc,e,b1,ca=bI.hasData(b3)&&bI._data(b3);if(!ca||!(cf=ca.events)){return}b9=(b9||"").match(ac)||[""];ce=b9.length;while(ce--){b7=bt.exec(b9[ce])||[];cc=b1=b7[1];e=(b7[2]||"").split(".").sort();if(!cc){for(cc in cf){bI.event.remove(b3,cc+b9[ce],cg,b4,true)}continue}cb=bI.event.special[cc]||{};cc=(b4?cb.delegateType:cb.bindType)||cc;b2=cf[cc]||[];b7=b7[2]&&new RegExp("(^|\\.)"+e.join("\\.(?:.*\\.|)")+"(\\.|$)");b5=b6=b2.length;while(b6--){cd=b2[b6];if((b8||b1===cd.origType)&&(!cg||cg.guid===cd.guid)&&(!b7||b7.test(cd.namespace))&&(!b4||b4===cd.selector||b4==="**"&&cd.selector)){b2.splice(b6,1);if(cd.selector){b2.delegateCount--}if(cb.remove){cb.remove.call(b3,cd)}}}if(b5&&!b2.length){if(!cb.teardown||cb.teardown.call(b3,e,ca.handle)===false){bI.removeEvent(b3,cc,ca.handle)}delete cf[cc]}}if(bI.isEmptyObject(cf)){delete ca.handle;bI._removeData(b3,"events")}},trigger:function(b1,b6,b4,cf){var b7,cd,b8,ce,b3,b9,cb,b5=[b4||l],cc=b1.type||b1,b2=b1.namespace?b1.namespace.split("."):[];cd=b8=b4=b4||l;if(b4.nodeType===3||b4.nodeType===8){return}if(bA.test(cc+bI.event.triggered)){return}if(cc.indexOf(".")>=0){b2=cc.split(".");cc=b2.shift();b2.sort()}b3=cc.indexOf(":")<0&&"on"+cc;b1=b1[bI.expando]?b1:new bI.Event(cc,typeof b1==="object"&&b1);b1.isTrigger=true;b1.namespace=b2.join(".");b1.namespace_re=b1.namespace?new RegExp("(^|\\.)"+b2.join("\\.(?:.*\\.|)")+"(\\.|$)"):null;b1.result=aF;if(!b1.target){b1.target=b4}b6=b6==null?[b1]:bI.makeArray(b6,[b1]);cb=bI.event.special[cc]||{};if(!cf&&cb.trigger&&cb.trigger.apply(b4,b6)===false){return}if(!cf&&!cb.noBubble&&!bI.isWindow(b4)){ce=cb.delegateType||cc;if(!bA.test(ce+cc)){cd=cd.parentNode}for(;cd;cd=cd.parentNode){b5.push(cd);b8=cd}if(b8===(b4.ownerDocument||l)){b5.push(b8.defaultView||b8.parentWindow||a2)}}b7=0;while((cd=b5[b7++])&&!b1.isPropagationStopped()){b1.type=b7>1?ce:cb.bindType||cc;b9=(bI._data(cd,"events")||{})[b1.type]&&bI._data(cd,"handle");if(b9){b9.apply(cd,b6)}b9=b3&&cd[b3];if(b9&&bI.acceptData(cd)&&b9.apply&&b9.apply(cd,b6)===false){b1.preventDefault()}}b1.type=cc;if(!cf&&!b1.isDefaultPrevented()){if((!cb._default||cb._default.apply(b4.ownerDocument,b6)===false)&&!(cc==="click"&&bI.nodeName(b4,"a"))&&bI.acceptData(b4)){if(b3&&b4[cc]&&!bI.isWindow(b4)){b8=b4[b3];if(b8){b4[b3]=null}bI.event.triggered=cc;try{b4[cc]()}catch(ca){}bI.event.triggered=aF;if(b8){b4[b3]=b8}}}}return b1.result},dispatch:function(e){e=bI.event.fix(e);var b4,b3,b5,b1,b9,b8=[],b7=a4.call(arguments),b2=(bI._data(this,"events")||{})[e.type]||[],b6=bI.event.special[e.type]||{};b7[0]=e;e.delegateTarget=this;if(b6.preDispatch&&b6.preDispatch.call(this,e)===false){return}b8=bI.event.handlers.call(this,e,b2);b4=0;while((b1=b8[b4++])&&!e.isPropagationStopped()){e.currentTarget=b1.elem;b3=0;while((b9=b1.handlers[b3++])&&!e.isImmediatePropagationStopped()){if(!e.namespace_re||e.namespace_re.test(b9.namespace)){e.handleObj=b9;e.data=b9.data;b5=((bI.event.special[b9.origType]||{}).handle||b9.handler).apply(b1.elem,b7);if(b5!==aF){if((e.result=b5)===false){e.preventDefault();e.stopPropagation()}}}}}if(b6.postDispatch){b6.postDispatch.call(this,e)}return e.result},handlers:function(e,b2){var b4,b5,b1,b7,b6=[],b3=b2.delegateCount,b8=e.target;if(b3&&b8.nodeType&&(!e.button||e.type!=="click")){for(;b8!=this;b8=b8.parentNode||this){if(b8.disabled!==true||e.type!=="click"){b5=[];for(b4=0;b4<b3;b4++){b7=b2[b4];b1=b7.selector+" ";if(b5[b1]===aF){b5[b1]=b7.needsContext?bI(b1,this).index(b8)>=0:bI.find(b1,this,null,[b8]).length}if(b5[b1]){b5.push(b7)}}if(b5.length){b6.push({elem:b8,handlers:b5})}}}}if(b3<b2.length){b6.push({elem:this,handlers:b2.slice(b3)})}return b6},fix:function(b2){if(b2[bI.expando]){return b2}var b1,b5,e=b2,b3=bI.event.fixHooks[b2.type]||{},b4=b3.props?this.props.concat(b3.props):this.props;b2=new bI.Event(e);b1=b4.length;while(b1--){b5=b4[b1];b2[b5]=e[b5]}if(!b2.target){b2.target=e.srcElement||l}if(b2.target.nodeType===3){b2.target=b2.target.parentNode}b2.metaKey=!!b2.metaKey;return b3.filter?b3.filter(b2,e):b2},props:"altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),fixHooks:{},keyHooks:{props:"char charCode key keyCode".split(" "),filter:function(b1,e){if(b1.which==null){b1.which=e.charCode!=null?e.charCode:e.keyCode}return b1}},mouseHooks:{props:"button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),filter:function(b3,b2){var b4,b5,e,b1=b2.button,b6=b2.fromElement;if(b3.pageX==null&&b2.clientX!=null){b4=b3.target.ownerDocument||l;b5=b4.documentElement;e=b4.body;b3.pageX=b2.clientX+(b5&&b5.scrollLeft||e&&e.scrollLeft||0)-(b5&&b5.clientLeft||e&&e.clientLeft||0);b3.pageY=b2.clientY+(b5&&b5.scrollTop||e&&e.scrollTop||0)-(b5&&b5.clientTop||e&&e.clientTop||0)}if(!b3.relatedTarget&&b6){b3.relatedTarget=b6===b3.target?b2.toElement:b6}if(!b3.which&&b1!==aF){b3.which=(b1&1?1:(b1&2?3:(b1&4?2:0)))}return b3}},special:{load:{noBubble:true},click:{trigger:function(){if(bI.nodeName(this,"input")&&this.type==="checkbox"&&this.click){this.click();return false}}},focus:{trigger:function(){if(this!==l.activeElement&&this.focus){try{this.focus();return false}catch(b1){}}},delegateType:"focusin"},blur:{trigger:function(){if(this===l.activeElement&&this.blur){this.blur();return false}},delegateType:"focusout"},beforeunload:{postDispatch:function(e){if(e.result!==aF){e.originalEvent.returnValue=e.result}}}},simulate:function(b2,b4,b3,b1){var b5=bI.extend(new bI.Event(),b3,{type:b2,isSimulated:true,originalEvent:{}});if(b1){bI.event.trigger(b5,null,b4)}else{bI.event.dispatch.call(b4,b5)}if(b5.isDefaultPrevented()){b3.preventDefault()}}};bI.removeEvent=l.removeEventListener?function(b1,e,b2){if(b1.removeEventListener){b1.removeEventListener(e,b2,false)}}:function(b2,b1,b3){var e="on"+b1;if(b2.detachEvent){if(typeof b2[e]==="undefined"){b2[e]=null}b2.detachEvent(e,b3)}};bI.Event=function(b1,e){if(!(this instanceof bI.Event)){return new bI.Event(b1,e)}if(b1&&b1.type){this.originalEvent=b1;this.type=b1.type;this.isDefaultPrevented=(b1.defaultPrevented||b1.returnValue===false||b1.getPreventDefault&&b1.getPreventDefault())?R:X}else{this.type=b1}if(e){bI.extend(this,e)}this.timeStamp=b1&&b1.timeStamp||bI.now();this[bI.expando]=true};bI.Event.prototype={isDefaultPrevented:X,isPropagationStopped:X,isImmediatePropagationStopped:X,preventDefault:function(){var b1=this.originalEvent;this.isDefaultPrevented=R;if(!b1){return}if(b1.preventDefault){b1.preventDefault()}else{b1.returnValue=false}},stopPropagation:function(){var b1=this.originalEvent;this.isPropagationStopped=R;if(!b1){return}if(b1.stopPropagation){b1.stopPropagation()}b1.cancelBubble=true},stopImmediatePropagation:function(){this.isImmediatePropagationStopped=R;this.stopPropagation()}};bI.each({mouseenter:"mouseover",mouseleave:"mouseout"},function(b1,e){bI.event.special[b1]={delegateType:e,bindType:e,handle:function(b4){var b2,b6=this,b5=b4.relatedTarget,b3=b4.handleObj;if(!b5||(b5!==b6&&!bI.contains(b6,b5))){b4.type=b3.origType;b2=b3.handler.apply(this,arguments);b4.type=e}return b2}}});if(!bI.support.submitBubbles){bI.event.special.submit={setup:function(){if(bI.nodeName(this,"form")){return false}bI.event.add(this,"click._submit keypress._submit",function(b3){var b2=b3.target,b1=bI.nodeName(b2,"input")||bI.nodeName(b2,"button")?b2.form:aF;if(b1&&!bI._data(b1,"submitBubbles")){bI.event.add(b1,"submit._submit",function(e){e._submit_bubble=true});bI._data(b1,"submitBubbles",true)}})},postDispatch:function(e){if(e._submit_bubble){delete e._submit_bubble;if(this.parentNode&&!e.isTrigger){bI.event.simulate("submit",this.parentNode,e,true)}}},teardown:function(){if(bI.nodeName(this,"form")){return false}bI.event.remove(this,"._submit")}}}if(!bI.support.changeBubbles){bI.event.special.change={setup:function(){if(bG.test(this.nodeName)){if(this.type==="checkbox"||this.type==="radio"){bI.event.add(this,"propertychange._change",function(e){if(e.originalEvent.propertyName==="checked"){this._just_changed=true}});bI.event.add(this,"click._change",function(e){if(this._just_changed&&!e.isTrigger){this._just_changed=false}bI.event.simulate("change",this,e,true)})}return false}bI.event.add(this,"beforeactivate._change",function(b2){var b1=b2.target;if(bG.test(b1.nodeName)&&!bI._data(b1,"changeBubbles")){bI.event.add(b1,"change._change",function(e){if(this.parentNode&&!e.isSimulated&&!e.isTrigger){bI.event.simulate("change",this.parentNode,e,true)}});bI._data(b1,"changeBubbles",true)}})},handle:function(b1){var e=b1.target;if(this!==e||b1.isSimulated||b1.isTrigger||(e.type!=="radio"&&e.type!=="checkbox")){return b1.handleObj.handler.apply(this,arguments)}},teardown:function(){bI.event.remove(this,"._change");return !bG.test(this.nodeName)}}}if(!bI.support.focusinBubbles){bI.each({focus:"focusin",blur:"focusout"},function(b3,e){var b1=0,b2=function(b4){bI.event.simulate(e,b4.target,bI.event.fix(b4),true)};bI.event.special[e]={setup:function(){if(b1++===0){l.addEventListener(b3,b2,true)}},teardown:function(){if(--b1===0){l.removeEventListener(b3,b2,true)}}}})}bI.fn.extend({on:function(b2,e,b5,b4,b1){var b6,b3;if(typeof b2==="object"){if(typeof e!=="string"){b5=b5||e;e=aF}for(b3 in b2){this.on(b3,e,b5,b2[b3],b1)}return this}if(b5==null&&b4==null){b4=e;b5=e=aF}else{if(b4==null){if(typeof e==="string"){b4=b5;b5=aF}else{b4=b5;b5=e;e=aF}}}if(b4===false){b4=X}else{if(!b4){return this}}if(b1===1){b6=b4;b4=function(b7){bI().off(b7);return b6.apply(this,arguments)};b4.guid=b6.guid||(b6.guid=bI.guid++)}return this.each(function(){bI.event.add(this,b2,b4,b5,e)})},one:function(b1,e,b3,b2){return this.on(b1,e,b3,b2,1)},off:function(b2,e,b4){var b1,b3;if(b2&&b2.preventDefault&&b2.handleObj){b1=b2.handleObj;bI(b2.delegateTarget).off(b1.namespace?b1.origType+"."+b1.namespace:b1.origType,b1.selector,b1.handler);return this}if(typeof b2==="object"){for(b3 in b2){this.off(b3,e,b2[b3])}return this}if(e===false||typeof e==="function"){b4=e;e=aF}if(b4===false){b4=X}return this.each(function(){bI.event.remove(this,b2,b4,e)})},bind:function(e,b2,b1){return this.on(e,null,b2,b1)},unbind:function(e,b1){return this.off(e,null,b1)},delegate:function(e,b1,b3,b2){return this.on(b1,e,b3,b2)},undelegate:function(e,b1,b2){return arguments.length===1?this.off(e,"**"):this.off(b1,e||"**",b2)},trigger:function(e,b1){return this.each(function(){bI.event.trigger(e,b1,this)})},triggerHandler:function(e,b2){var b1=this[0];if(b1){return bI.event.trigger(e,b2,b1,true)}},hover:function(e,b1){return this.mouseenter(e).mouseleave(b1||e)}});bI.each(("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu").split(" "),function(b1,e){bI.fn[e]=function(b3,b2){return arguments.length>0?this.on(e,null,b3,b2):this.trigger(e)};if(a3.test(e)){bI.event.fixHooks[e]=bI.event.keyHooks}if(bM.test(e)){bI.event.fixHooks[e]=bI.event.mouseHooks}});
/*!
 * Sizzle CSS Selector Engine
 * Copyright 2012 jQuery Foundation and other contributors
 * Released under the MIT license
 * http://sizzlejs.com/
 */
(function(c8,cf){var cv,b9,cl,cF,cH,cQ,cR,de,cT,cz,cm,cb,cX,c9,b8,cD,cB,c3="sizzle"+-(new Date()),cG=c8.document,db={},dc=0,cY=0,b3=cx(),c2=cx(),cE=cx(),c7=typeof cf,cL=1<<31,c5=[],c6=c5.pop,b2=c5.push,ck=c5.slice,b7=c5.indexOf||function(dg){var df=0,e=this.length;for(;df<e;df++){if(this[df]===dg){return df}}return -1},cn="[\\x20\\t\\r\\n\\f]",b1="(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",cI=b1.replace("w","w#"),cg="([*^$|!~]?=)",c0="\\["+cn+"*("+b1+")"+cn+"*(?:"+cg+cn+"*(?:(['\"])((?:\\\\.|[^\\\\])*?)\\3|("+cI+")|)|)"+cn+"*\\]",ci=":("+b1+")(?:\\(((['\"])((?:\\\\.|[^\\\\])*?)\\3|((?:\\\\.|[^\\\\()[\\]]|"+c0.replace(3,8)+")*)|.*)\\)|)",cp=new RegExp("^"+cn+"+|((?:^|[^\\\\])(?:\\\\.)*)"+cn+"+$","g"),cs=new RegExp("^"+cn+"*,"+cn+"*"),cy=new RegExp("^"+cn+"*([\\x20\\t\\r\\n\\f>+~])"+cn+"*"),cN=new RegExp(ci),cO=new RegExp("^"+cI+"$"),cW={ID:new RegExp("^#("+b1+")"),CLASS:new RegExp("^\\.("+b1+")"),NAME:new RegExp("^\\[name=['\"]?("+b1+")['\"]?\\]"),TAG:new RegExp("^("+b1.replace("w","w*")+")"),ATTR:new RegExp("^"+c0),PSEUDO:new RegExp("^"+ci),CHILD:new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\("+cn+"*(even|odd|(([+-]|)(\\d*)n|)"+cn+"*(?:([+-]|)"+cn+"*(\\d+)|))"+cn+"*\\)|)","i"),needsContext:new RegExp("^"+cn+"*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\("+cn+"*((?:-\\d)?\\d*)"+cn+"*\\)|)(?=[^-]|$)","i")},cU=/[\x20\t\r\n\f]*[+~]/,cK=/\{\s*\[native code\]\s*\}/,cM=/^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,b6=/^(?:input|select|textarea|button)$/i,cj=/^h\d$/i,cJ=/'|\\/g,cr=/\=[\x20\t\r\n\f]*([^'"\]]*)[\x20\t\r\n\f]*\]/g,cq=/\\([\da-fA-F]{1,6}[\x20\t\r\n\f]?|.)/g,cZ=function(e,dg){var df="0x"+dg-65536;return df!==df?dg:df<0?String.fromCharCode(df+65536):String.fromCharCode(df>>10|55296,df&1023|56320)};try{ck.call(cm.childNodes,0)[0].nodeType}catch(cA){ck=function(df){var dg,e=[];for(;(dg=this[df]);df++){e.push(dg)}return e}}function cC(e){return cK.test(e+"")}function cx(){var e,df=[];return(e=function(dg,dh){if(df.push(dg+=" ")>cl.cacheLength){delete e[df.shift()]}return(e[dg]=dh)})}function ch(e){e[c3]=true;return e}function ca(df){var dh=cz.createElement("div");try{return df(dh)}catch(dg){return false}finally{dh=null}}function ct(dm,df,dr,dt){var ds,dj,dk,dp,dq,di,dh,e,dg,dn;if((df?df.ownerDocument||df:cG)!==cz){cT(df)}df=df||cz;dr=dr||[];if(!dm||typeof dm!=="string"){return dr}if((dp=df.nodeType)!==1&&dp!==9){return[]}if(!cb&&!dt){if((ds=cM.exec(dm))){if((dk=ds[1])){if(dp===9){dj=df.getElementById(dk);if(dj&&dj.parentNode){if(dj.id===dk){dr.push(dj);return dr}}else{return dr}}else{if(df.ownerDocument&&(dj=df.ownerDocument.getElementById(dk))&&cD(df,dj)&&dj.id===dk){dr.push(dj);return dr}}}else{if(ds[2]){b2.apply(dr,ck.call(df.getElementsByTagName(dm),0));return dr}else{if((dk=ds[3])&&db.getByClassName&&df.getElementsByClassName){b2.apply(dr,ck.call(df.getElementsByClassName(dk),0));return dr}}}}if(db.qsa&&!cX.test(dm)){dh=true;e=c3;dg=df;dn=dp===9&&dm;if(dp===1&&df.nodeName.toLowerCase()!=="object"){di=cd(dm);if((dh=df.getAttribute("id"))){e=dh.replace(cJ,"\\$&")}else{df.setAttribute("id",e)}e="[id='"+e+"'] ";dq=di.length;while(dq--){di[dq]=e+ce(di[dq])}dg=cU.test(dm)&&df.parentNode||df;dn=di.join(",")}if(dn){try{b2.apply(dr,ck.call(dg.querySelectorAll(dn),0));return dr}catch(dl){}finally{if(!dh){df.removeAttribute("id")}}}}}return da(dm.replace(cp,"$1"),df,dr,dt)}cH=ct.isXML=function(e){var df=e&&(e.ownerDocument||e).documentElement;return df?df.nodeName!=="HTML":false};cT=ct.setDocument=function(e){var df=e?e.ownerDocument||e:cG;if(df===cz||df.nodeType!==9||!df.documentElement){return cz}cz=df;cm=df.documentElement;cb=cH(df);db.tagNameNoComments=ca(function(dg){dg.appendChild(df.createComment(""));return !dg.getElementsByTagName("*").length});db.attributes=ca(function(dh){dh.innerHTML="<select></select>";var dg=typeof dh.lastChild.getAttribute("multiple");return dg!=="boolean"&&dg!=="string"});db.getByClassName=ca(function(dg){dg.innerHTML="<div class='hidden e'></div><div class='hidden'></div>";if(!dg.getElementsByClassName||!dg.getElementsByClassName("e").length){return false}dg.lastChild.className="e";return dg.getElementsByClassName("e").length===2});db.getByName=ca(function(dh){dh.id=c3+0;dh.innerHTML="<a name='"+c3+"'></a><div name='"+c3+"'></div>";cm.insertBefore(dh,cm.firstChild);var dg=df.getElementsByName&&df.getElementsByName(c3).length===2+df.getElementsByName(c3+0).length;db.getIdNotName=!df.getElementById(c3);cm.removeChild(dh);return dg});cl.attrHandle=ca(function(dg){dg.innerHTML="<a href='#'></a>";return dg.firstChild&&typeof dg.firstChild.getAttribute!==c7&&dg.firstChild.getAttribute("href")==="#"})?{}:{href:function(dg){return dg.getAttribute("href",2)},type:function(dg){return dg.getAttribute("type")}};if(db.getIdNotName){cl.find.ID=function(di,dh){if(typeof dh.getElementById!==c7&&!cb){var dg=dh.getElementById(di);return dg&&dg.parentNode?[dg]:[]}};cl.filter.ID=function(dh){var dg=dh.replace(cq,cZ);return function(di){return di.getAttribute("id")===dg}}}else{cl.find.ID=function(di,dh){if(typeof dh.getElementById!==c7&&!cb){var dg=dh.getElementById(di);return dg?dg.id===di||typeof dg.getAttributeNode!==c7&&dg.getAttributeNode("id").value===di?[dg]:cf:[]}};cl.filter.ID=function(dh){var dg=dh.replace(cq,cZ);return function(dj){var di=typeof dj.getAttributeNode!==c7&&dj.getAttributeNode("id");return di&&di.value===dg}}}cl.find.TAG=db.tagNameNoComments?function(dg,dh){if(typeof dh.getElementsByTagName!==c7){return dh.getElementsByTagName(dg)}}:function(dg,dk){var dl,dj=[],di=0,dh=dk.getElementsByTagName(dg);if(dg==="*"){for(;(dl=dh[di]);di++){if(dl.nodeType===1){dj.push(dl)}}return dj}return dh};cl.find.NAME=db.getByName&&function(dg,dh){if(typeof dh.getElementsByName!==c7){return dh.getElementsByName(name)}};cl.find.CLASS=db.getByClassName&&function(dh,dg){if(typeof dg.getElementsByClassName!==c7&&!cb){return dg.getElementsByClassName(dh)}};c9=[];cX=[":focus"];if((db.qsa=cC(df.querySelectorAll))){ca(function(dg){dg.innerHTML="<select><option selected=''></option></select>";if(!dg.querySelectorAll("[selected]").length){cX.push("\\["+cn+"*(?:checked|disabled|ismap|multiple|readonly|selected|value)")}if(!dg.querySelectorAll(":checked").length){cX.push(":checked")}});ca(function(dg){dg.innerHTML="<input type='hidden' i=''/>";if(dg.querySelectorAll("[i^='']").length){cX.push("[*^$]="+cn+"*(?:\"\"|'')")}if(!dg.querySelectorAll(":enabled").length){cX.push(":enabled",":disabled")}dg.querySelectorAll("*,:x");cX.push(",.*:")})}if((db.matchesSelector=cC((b8=cm.matchesSelector||cm.mozMatchesSelector||cm.webkitMatchesSelector||cm.oMatchesSelector||cm.msMatchesSelector)))){ca(function(dg){db.disconnectedMatch=b8.call(dg,"div");b8.call(dg,"[s!='']:x");c9.push("!=",ci)})}cX=new RegExp(cX.join("|"));c9=new RegExp(c9.join("|"));cD=cC(cm.contains)||cm.compareDocumentPosition?function(dh,dg){var dj=dh.nodeType===9?dh.documentElement:dh,di=dg&&dg.parentNode;return dh===di||!!(di&&di.nodeType===1&&(dj.contains?dj.contains(di):dh.compareDocumentPosition&&dh.compareDocumentPosition(di)&16))}:function(dh,dg){if(dg){while((dg=dg.parentNode)){if(dg===dh){return true}}}return false};cB=cm.compareDocumentPosition?function(dh,dg){var di;if(dh===dg){cR=true;return 0}if((di=dg.compareDocumentPosition&&dh.compareDocumentPosition&&dh.compareDocumentPosition(dg))){if(di&1||dh.parentNode&&dh.parentNode.nodeType===11){if(dh===df||cD(cG,dh)){return -1}if(dg===df||cD(cG,dg)){return 1}return 0}return di&4?-1:1}return dh.compareDocumentPosition?-1:1}:function(dh,dg){var dn,dk=0,dm=dh.parentNode,dj=dg.parentNode,di=[dh],dl=[dg];if(dh===dg){cR=true;return 0}else{if(dh.sourceIndex&&dg.sourceIndex){return(~dg.sourceIndex||cL)-(cD(cG,dh)&&~dh.sourceIndex||cL)}else{if(!dm||!dj){return dh===df?-1:dg===df?1:dm?-1:dj?1:0}else{if(dm===dj){return b4(dh,dg)}}}}dn=dh;while((dn=dn.parentNode)){di.unshift(dn)}dn=dg;while((dn=dn.parentNode)){dl.unshift(dn)}while(di[dk]===dl[dk]){dk++}return dk?b4(di[dk],dl[dk]):di[dk]===cG?-1:dl[dk]===cG?1:0};cR=false;[0,0].sort(cB);db.detectDuplicates=cR;return cz};ct.matches=function(df,e){return ct(df,null,null,e)};ct.matchesSelector=function(dg,di){if((dg.ownerDocument||dg)!==cz){cT(dg)}di=di.replace(cr,"='$1']");if(db.matchesSelector&&!cb&&(!c9||!c9.test(di))&&!cX.test(di)){try{var df=b8.call(dg,di);if(df||db.disconnectedMatch||dg.document&&dg.document.nodeType!==11){return df}}catch(dh){}}return ct(di,cz,null,[dg]).length>0};ct.contains=function(e,df){if((e.ownerDocument||e)!==cz){cT(e)}return cD(e,df)};ct.attr=function(df,e){var dg;if((df.ownerDocument||df)!==cz){cT(df)}if(!cb){e=e.toLowerCase()}if((dg=cl.attrHandle[e])){return dg(df)}if(cb||db.attributes){return df.getAttribute(e)}return((dg=df.getAttributeNode(e))||df.getAttribute(e))&&df[e]===true?e:dg&&dg.specified?dg.value:null};ct.error=function(e){throw new Error("Syntax error, unrecognized expression: "+e)};ct.uniqueSort=function(dg){var dh,di=[],df=1,e=0;cR=!db.detectDuplicates;dg.sort(cB);if(cR){for(;(dh=dg[df]);df++){if(dh===dg[df-1]){e=di.push(df)}}while(e--){dg.splice(di[e],1)}}return dg};function b4(df,e){var dg=df&&e&&df.nextSibling;for(;dg;dg=dg.nextSibling){if(dg===e){return -1}}return df?1:-1}function cu(e){return function(dg){var df=dg.nodeName.toLowerCase();return df==="input"&&dg.type===e}}function b5(e){return function(dg){var df=dg.nodeName.toLowerCase();return(df==="input"||df==="button")&&dg.type===e}}function c1(e){return ch(function(df){df=+df;return ch(function(dg,dk){var di,dh=e([],dg.length,df),dj=dh.length;while(dj--){if(dg[(di=dh[dj])]){dg[di]=!(dk[di]=dg[di])}}})})}cF=ct.getText=function(di){var dh,df="",dg=0,e=di.nodeType;if(!e){for(;(dh=di[dg]);dg++){df+=cF(dh)}}else{if(e===1||e===9||e===11){if(typeof di.textContent==="string"){return di.textContent}else{for(di=di.firstChild;di;di=di.nextSibling){df+=cF(di)}}}else{if(e===3||e===4){return di.nodeValue}}}return df};cl=ct.selectors={cacheLength:50,createPseudo:ch,match:cW,find:{},relative:{">":{dir:"parentNode",first:true}," ":{dir:"parentNode"},"+":{dir:"previousSibling",first:true},"~":{dir:"previousSibling"}},preFilter:{ATTR:function(e){e[1]=e[1].replace(cq,cZ);e[3]=(e[4]||e[5]||"").replace(cq,cZ);if(e[2]==="~="){e[3]=" "+e[3]+" "}return e.slice(0,4)},CHILD:function(e){e[1]=e[1].toLowerCase();if(e[1].slice(0,3)==="nth"){if(!e[3]){ct.error(e[0])}e[4]=+(e[4]?e[5]+(e[6]||1):2*(e[3]==="even"||e[3]==="odd"));e[5]=+((e[7]+e[8])||e[3]==="odd")}else{if(e[3]){ct.error(e[0])}}return e},PSEUDO:function(df){var e,dg=!df[5]&&df[2];if(cW.CHILD.test(df[0])){return null}if(df[4]){df[2]=df[4]}else{if(dg&&cN.test(dg)&&(e=cd(dg,true))&&(e=dg.indexOf(")",dg.length-e)-dg.length)){df[0]=df[0].slice(0,e);df[2]=dg.slice(0,e)}}return df.slice(0,3)}},filter:{TAG:function(e){if(e==="*"){return function(){return true}}e=e.replace(cq,cZ).toLowerCase();return function(df){return df.nodeName&&df.nodeName.toLowerCase()===e}},CLASS:function(e){var df=b3[e+" "];return df||(df=new RegExp("(^|"+cn+")"+e+"("+cn+"|$)"))&&b3(e,function(dg){return df.test(dg.className||(typeof dg.getAttribute!==c7&&dg.getAttribute("class"))||"")})},ATTR:function(dg,df,e){return function(di){var dh=ct.attr(di,dg);if(dh==null){return df==="!="}if(!df){return true}dh+="";return df==="="?dh===e:df==="!="?dh!==e:df==="^="?e&&dh.indexOf(e)===0:df==="*="?e&&dh.indexOf(e)>-1:df==="$="?e&&dh.substr(dh.length-e.length)===e:df==="~="?(" "+dh+" ").indexOf(e)>-1:df==="|="?dh===e||dh.substr(0,e.length+1)===e+"-":false}},CHILD:function(df,di,dh,dj,dg){var dl=df.slice(0,3)!=="nth",e=df.slice(-4)!=="last",dk=di==="of-type";return dj===1&&dg===0?function(dm){return !!dm.parentNode}:function(dt,dr,dw){var dm,dz,du,dy,dv,dq,ds=dl!==e?"nextSibling":"previousSibling",dx=dt.parentNode,dp=dk&&dt.nodeName.toLowerCase(),dn=!dw&&!dk;if(dx){if(dl){while(ds){du=dt;while((du=du[ds])){if(dk?du.nodeName.toLowerCase()===dp:du.nodeType===1){return false}}dq=ds=df==="only"&&!dq&&"nextSibling"}return true}dq=[e?dx.firstChild:dx.lastChild];if(e&&dn){dz=dx[c3]||(dx[c3]={});dm=dz[df]||[];dv=dm[0]===dc&&dm[1];dy=dm[0]===dc&&dm[2];du=dv&&dx.childNodes[dv];while((du=++dv&&du&&du[ds]||(dy=dv=0)||dq.pop())){if(du.nodeType===1&&++dy&&du===dt){dz[df]=[dc,dv,dy];break}}}else{if(dn&&(dm=(dt[c3]||(dt[c3]={}))[df])&&dm[0]===dc){dy=dm[1]}else{while((du=++dv&&du&&du[ds]||(dy=dv=0)||dq.pop())){if((dk?du.nodeName.toLowerCase()===dp:du.nodeType===1)&&++dy){if(dn){(du[c3]||(du[c3]={}))[df]=[dc,dy]}if(du===dt){break}}}}}dy-=dg;return dy===dj||(dy%dj===0&&dy/dj>=0)}}},PSEUDO:function(dh,dg){var e,df=cl.pseudos[dh]||cl.setFilters[dh.toLowerCase()]||ct.error("unsupported pseudo: "+dh);if(df[c3]){return df(dg)}if(df.length>1){e=[dh,dh,"",dg];return cl.setFilters.hasOwnProperty(dh.toLowerCase())?ch(function(dk,dm){var dj,di=df(dk,dg),dl=di.length;while(dl--){dj=b7.call(dk,di[dl]);dk[dj]=!(dm[dj]=di[dl])}}):function(di){return df(di,0,e)}}return df}},pseudos:{not:ch(function(e){var df=[],dg=[],dh=cQ(e.replace(cp,"$1"));return dh[c3]?ch(function(dj,dp,dm,dk){var dn,di=dh(dj,null,dk,[]),dl=dj.length;while(dl--){if((dn=di[dl])){dj[dl]=!(dp[dl]=dn)}}}):function(dk,dj,di){df[0]=dk;dh(df,null,di,dg);return !dg.pop()}}),has:ch(function(e){return function(df){return ct(e,df).length>0}}),contains:ch(function(e){return function(df){return(df.textContent||df.innerText||cF(df)).indexOf(e)>-1}}),lang:ch(function(e){if(!cO.test(e||"")){ct.error("unsupported lang: "+e)}e=e.replace(cq,cZ).toLowerCase();return function(dg){var df;do{if((df=cb?dg.getAttribute("xml:lang")||dg.getAttribute("lang"):dg.lang)){df=df.toLowerCase();return df===e||df.indexOf(e+"-")===0}}while((dg=dg.parentNode)&&dg.nodeType===1);return false}}),target:function(e){var df=c8.location&&c8.location.hash;return df&&df.slice(1)===e.id},root:function(e){return e===cm},focus:function(e){return e===cz.activeElement&&(!cz.hasFocus||cz.hasFocus())&&!!(e.type||e.href||~e.tabIndex)},enabled:function(e){return e.disabled===false},disabled:function(e){return e.disabled===true},checked:function(e){var df=e.nodeName.toLowerCase();return(df==="input"&&!!e.checked)||(df==="option"&&!!e.selected)},selected:function(e){if(e.parentNode){e.parentNode.selectedIndex}return e.selected===true},empty:function(e){for(e=e.firstChild;e;e=e.nextSibling){if(e.nodeName>"@"||e.nodeType===3||e.nodeType===4){return false}}return true},parent:function(e){return !cl.pseudos.empty(e)},header:function(e){return cj.test(e.nodeName)},input:function(e){return b6.test(e.nodeName)},button:function(df){var e=df.nodeName.toLowerCase();return e==="input"&&df.type==="button"||e==="button"},text:function(df){var e;return df.nodeName.toLowerCase()==="input"&&df.type==="text"&&((e=df.getAttribute("type"))==null||e.toLowerCase()===df.type)},first:c1(function(){return[0]}),last:c1(function(e,df){return[df-1]}),eq:c1(function(e,dg,df){return[df<0?df+dg:df]}),even:c1(function(e,dg){var df=0;for(;df<dg;df+=2){e.push(df)}return e}),odd:c1(function(e,dg){var df=1;for(;df<dg;df+=2){e.push(df)}return e}),lt:c1(function(e,dh,dg){var df=dg<0?dg+dh:dg;for(;--df>=0;){e.push(df)}return e}),gt:c1(function(e,dh,dg){var df=dg<0?dg+dh:dg;for(;++df<dh;){e.push(df)}return e})}};for(cv in {radio:true,checkbox:true,file:true,password:true,image:true}){cl.pseudos[cv]=cu(cv)}for(cv in {submit:true,reset:true}){cl.pseudos[cv]=b5(cv)}function cd(di,dn){var df,dj,dl,dm,dk,dg,e,dh=c2[di+" "];if(dh){return dn?0:dh.slice(0)}dk=di;dg=[];e=cl.preFilter;while(dk){if(!df||(dj=cs.exec(dk))){if(dj){dk=dk.slice(dj[0].length)||dk}dg.push(dl=[])}df=false;if((dj=cy.exec(dk))){df=dj.shift();dl.push({value:df,type:dj[0].replace(cp," ")});dk=dk.slice(df.length)}for(dm in cl.filter){if((dj=cW[dm].exec(dk))&&(!e[dm]||(dj=e[dm](dj)))){df=dj.shift();dl.push({value:df,type:dm,matches:dj});dk=dk.slice(df.length)}}if(!df){break}}return dn?dk.length:dk?ct.error(di):c2(di,dg).slice(0)}function ce(dh){var dg=0,df=dh.length,e="";for(;dg<df;dg++){e+=dh[dg].value}return e}function co(di,dg,dh){var e=dg.dir,dj=dh&&dg.dir==="parentNode",df=cY++;return dg.first?function(dm,dl,dk){while((dm=dm[e])){if(dm.nodeType===1||dj){return di(dm,dl,dk)}}}:function(dp,dm,dl){var dr,dk,dn,dq=dc+" "+df;if(dl){while((dp=dp[e])){if(dp.nodeType===1||dj){if(di(dp,dm,dl)){return true}}}}else{while((dp=dp[e])){if(dp.nodeType===1||dj){dn=dp[c3]||(dp[c3]={});if((dk=dn[e])&&dk[0]===dq){if((dr=dk[1])===true||dr===b9){return dr===true}}else{dk=dn[e]=[dq];dk[1]=di(dp,dm,dl)||b9;if(dk[1]===true){return true}}}}}}}function dd(e){return e.length>1?function(di,dh,df){var dg=e.length;while(dg--){if(!e[dg](di,dh,df)){return false}}return true}:e[0]}function cV(e,df,dg,dh,dk){var di,dn=[],dj=0,dl=e.length,dm=df!=null;for(;dj<dl;dj++){if((di=e[dj])){if(!dg||dg(di,dh,dk)){dn.push(di);if(dm){df.push(dj)}}}}return dn}function cc(dg,df,di,dh,dj,e){if(dh&&!dh[c3]){dh=cc(dh)}if(dj&&!dj[c3]){dj=cc(dj,e)}return ch(function(dv,ds,dm,du){var dx,dt,dp,dn=[],dw=[],dl=ds.length,dk=dv||cw(df||"*",dm.nodeType?[dm]:dm,[]),dq=dg&&(dv||!df)?cV(dk,dn,dg,dm,du):dk,dr=di?dj||(dv?dg:dl||dh)?[]:ds:dq;if(di){di(dq,dr,dm,du)}if(dh){dx=cV(dr,dw);dh(dx,[],dm,du);dt=dx.length;while(dt--){if((dp=dx[dt])){dr[dw[dt]]=!(dq[dw[dt]]=dp)}}}if(dv){if(dj||dg){if(dj){dx=[];dt=dr.length;while(dt--){if((dp=dr[dt])){dx.push((dq[dt]=dp))}}dj(null,(dr=[]),dx,du)}dt=dr.length;while(dt--){if((dp=dr[dt])&&(dx=dj?b7.call(dv,dp):dn[dt])>-1){dv[dx]=!(ds[dx]=dp)}}}}else{dr=cV(dr===ds?dr.splice(dl,dr.length):dr);if(dj){dj(null,ds,dr,du)}else{b2.apply(ds,dr)}}})}function c4(dk){var df,di,dg,dj=dk.length,dn=cl.relative[dk[0].type],dp=dn||cl.relative[" "],dh=dn?1:0,dl=co(function(dq){return dq===df},dp,true),dm=co(function(dq){return b7.call(df,dq)>-1},dp,true),e=[function(ds,dr,dq){return(!dn&&(dq||dr!==de))||((df=dr).nodeType?dl(ds,dr,dq):dm(ds,dr,dq))}];for(;dh<dj;dh++){if((di=cl.relative[dk[dh].type])){e=[co(dd(e),di)]}else{di=cl.filter[dk[dh].type].apply(null,dk[dh].matches);if(di[c3]){dg=++dh;for(;dg<dj;dg++){if(cl.relative[dk[dg].type]){break}}return cc(dh>1&&dd(e),dh>1&&ce(dk.slice(0,dh-1)).replace(cp,"$1"),di,dh<dg&&c4(dk.slice(dh,dg)),dg<dj&&c4((dk=dk.slice(dg))),dg<dj&&ce(dk))}e.push(di)}}return dd(e)}function cS(dh,dg){var dj=0,e=dg.length>0,di=dh.length>0,df=function(du,dn,dt,ds,dA){var dp,dq,dv,dz=[],dy=0,dr="0",dk=du&&[],dw=dA!=null,dx=de,dm=du||di&&cl.find.TAG("*",dA&&dn.parentNode||dn),dl=(dc+=dx==null?1:Math.E);if(dw){de=dn!==cz&&dn;b9=dj}for(;(dp=dm[dr])!=null;dr++){if(di&&dp){for(dq=0;(dv=dh[dq]);dq++){if(dv(dp,dn,dt)){ds.push(dp);break}}if(dw){dc=dl;b9=++dj}}if(e){if((dp=!dv&&dp)){dy--}if(du){dk.push(dp)}}}dy+=dr;if(e&&dr!==dy){for(dq=0;(dv=dg[dq]);dq++){dv(dk,dz,dn,dt)}if(du){if(dy>0){while(dr--){if(!(dk[dr]||dz[dr])){dz[dr]=c6.call(ds)}}}dz=cV(dz)}b2.apply(ds,dz);if(dw&&!du&&dz.length>0&&(dy+dg.length)>1){ct.uniqueSort(ds)}}if(dw){dc=dl;de=dx}return dk};return e?ch(df):df}cQ=ct.compile=function(e,dj){var dg,df=[],di=[],dh=cE[e+" "];if(!dh){if(!dj){dj=cd(e)}dg=dj.length;while(dg--){dh=c4(dj[dg]);if(dh[c3]){df.push(dh)}else{di.push(dh)}}dh=cE(e,cS(di,df))}return dh};function cw(df,di,dh){var dg=0,e=di.length;for(;dg<e;dg++){ct(df,di[dg],dh)}return dh}function da(dg,e,dh,dk){var di,dm,df,dn,dl,dj=cd(dg);if(!dk){if(dj.length===1){dm=dj[0]=dj[0].slice(0);if(dm.length>2&&(df=dm[0]).type==="ID"&&e.nodeType===9&&!cb&&cl.relative[dm[1].type]){e=cl.find.ID(df.matches[0].replace(cq,cZ),e)[0];if(!e){return dh}dg=dg.slice(dm.shift().value.length)}for(di=cW.needsContext.test(dg)?-1:dm.length-1;di>=0;di--){df=dm[di];if(cl.relative[(dn=df.type)]){break}if((dl=cl.find[dn])){if((dk=dl(df.matches[0].replace(cq,cZ),cU.test(dm[0].type)&&e.parentNode||e))){dm.splice(di,1);dg=dk.length&&ce(dm);if(!dg){b2.apply(dh,ck.call(dk,0));return dh}break}}}}}cQ(dg,dj)(dk,e,cb,dh,cU.test(dg));return dh}cl.pseudos.nth=cl.pseudos.eq;function cP(){}cl.filters=cP.prototype=cl.pseudos;cl.setFilters=new cP();cT();ct.attr=bI.attr;bI.find=ct;bI.expr=ct.selectors;bI.expr[":"]=bI.expr.pseudos;bI.unique=ct.uniqueSort;bI.text=ct.getText;bI.isXMLDoc=ct.isXML;bI.contains=ct.contains})(a2);var aj=/Until$/,bs=/^(?:parents|prev(?:Until|All))/,an=/^.[^:#\[\.,]*$/,y=bI.expr.match.needsContext,bw={children:true,contents:true,next:true,prev:true};bI.fn.extend({find:function(e){var b3,b2,b1;if(typeof e!=="string"){b1=this;return this.pushStack(bI(e).filter(function(){for(b3=0;b3<b1.length;b3++){if(bI.contains(b1[b3],this)){return true}}}))}b2=[];for(b3=0;b3<this.length;b3++){bI.find(e,this[b3],b2)}b2=this.pushStack(bI.unique(b2));b2.selector=(this.selector?this.selector+" ":"")+e;return b2},has:function(b3){var b2,b1=bI(b3,this),e=b1.length;return this.filter(function(){for(b2=0;b2<e;b2++){if(bI.contains(this,b1[b2])){return true}}})},not:function(e){return this.pushStack(aO(this,e,false))},filter:function(e){return this.pushStack(aO(this,e,true))},is:function(e){return !!e&&(typeof e==="string"?y.test(e)?bI(e,this.context).index(this[0])>=0:bI.filter(e,this).length>0:this.filter(e).length>0)},closest:function(b4,b3){var b5,b2=0,e=this.length,b1=[],b6=y.test(b4)||typeof b4!=="string"?bI(b4,b3||this.context):0;for(;b2<e;b2++){b5=this[b2];while(b5&&b5.ownerDocument&&b5!==b3&&b5.nodeType!==11){if(b6?b6.index(b5)>-1:bI.find.matchesSelector(b5,b4)){b1.push(b5);break}b5=b5.parentNode}}return this.pushStack(b1.length>1?bI.unique(b1):b1)},index:function(e){if(!e){return(this[0]&&this[0].parentNode)?this.first().prevAll().length:-1}if(typeof e==="string"){return bI.inArray(this[0],bI(e))}return bI.inArray(e.jquery?e[0]:e,this)},add:function(e,b1){var b3=typeof e==="string"?bI(e,b1):bI.makeArray(e&&e.nodeType?[e]:e),b2=bI.merge(this.get(),b3);return this.pushStack(bI.unique(b2))},addBack:function(e){return this.add(e==null?this.prevObject:this.prevObject.filter(e))}});bI.fn.andSelf=bI.fn.addBack;function aX(b1,e){do{b1=b1[e]}while(b1&&b1.nodeType!==1);return b1}bI.each({parent:function(b1){var e=b1.parentNode;return e&&e.nodeType!==11?e:null},parents:function(e){return bI.dir(e,"parentNode")},parentsUntil:function(b1,e,b2){return bI.dir(b1,"parentNode",b2)},next:function(e){return aX(e,"nextSibling")},prev:function(e){return aX(e,"previousSibling")},nextAll:function(e){return bI.dir(e,"nextSibling")},prevAll:function(e){return bI.dir(e,"previousSibling")},nextUntil:function(b1,e,b2){return bI.dir(b1,"nextSibling",b2)},prevUntil:function(b1,e,b2){return bI.dir(b1,"previousSibling",b2)},siblings:function(e){return bI.sibling((e.parentNode||{}).firstChild,e)},children:function(e){return bI.sibling(e.firstChild)},contents:function(e){return bI.nodeName(e,"iframe")?e.contentDocument||e.contentWindow.document:bI.merge([],e.childNodes)}},function(e,b1){bI.fn[e]=function(b4,b2){var b3=bI.map(this,b1,b4);if(!aj.test(e)){b2=b4}if(b2&&typeof b2==="string"){b3=bI.filter(b2,b3)}b3=this.length>1&&!bw[e]?bI.unique(b3):b3;if(this.length>1&&bs.test(e)){b3=b3.reverse()}return this.pushStack(b3)}});bI.extend({filter:function(b2,e,b1){if(b1){b2=":not("+b2+")"}return e.length===1?bI.find.matchesSelector(e[0],b2)?[e[0]]:[]:bI.find.matches(b2,e)},dir:function(b2,b1,b4){var e=[],b3=b2[b1];while(b3&&b3.nodeType!==9&&(b4===aF||b3.nodeType!==1||!bI(b3).is(b4))){if(b3.nodeType===1){e.push(b3)}b3=b3[b1]}return e},sibling:function(b2,b1){var e=[];for(;b2;b2=b2.nextSibling){if(b2.nodeType===1&&b2!==b1){e.push(b2)}}return e}});function aO(b3,b2,e){b2=b2||0;if(bI.isFunction(b2)){return bI.grep(b3,function(b5,b4){var b6=!!b2.call(b5,b4,b5);return b6===e})}else{if(b2.nodeType){return bI.grep(b3,function(b4){return(b4===b2)===e})}else{if(typeof b2==="string"){var b1=bI.grep(b3,function(b4){return b4.nodeType===1});if(an.test(b2)){return bI.filter(b2,b1,!e)}else{b2=bI.filter(b2,b1)}}}}return bI.grep(b3,function(b4){return(bI.inArray(b4,b2)>=0)===e})}function A(e){var b2=d.split("|"),b1=e.createDocumentFragment();if(b1.createElement){while(b2.length){b1.createElement(b2.pop())}}return b1}var d="abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",aA=/ jQuery\d+="(?:null|\d+)"/g,J=new RegExp("<(?:"+d+")[\\s/>]","i"),b0=/^\s+/,aC=/<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,m=/<([\w:]+)/,bV=/<tbody/i,I=/<|&#?\w+;/,al=/<(?:script|style|link)/i,q=/^(?:checkbox|radio)$/i,bT=/checked\s*(?:[^=]|=\s*.checked.)/i,by=/^$|\/(?:java|ecma)script/i,ar=/^true\/(.*)/,aK=/^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,T={option:[1,"<select multiple='multiple'>","</select>"],legend:[1,"<fieldset>","</fieldset>"],area:[1,"<map>","</map>"],param:[1,"<object>","</object>"],thead:[1,"<table>","</table>"],tr:[2,"<table><tbody>","</tbody></table>"],col:[2,"<table><tbody></tbody><colgroup>","</colgroup></table>"],td:[3,"<table><tbody><tr>","</tr></tbody></table>"],_default:bI.support.htmlSerialize?[0,"",""]:[1,"X<div>","</div>"]},aS=A(l),j=aS.appendChild(l.createElement("div"));T.optgroup=T.option;T.tbody=T.tfoot=T.colgroup=T.caption=T.thead;T.th=T.td;bI.fn.extend({text:function(e){return bI.access(this,function(b1){return b1===aF?bI.text(this):this.empty().append((this[0]&&this[0].ownerDocument||l).createTextNode(b1))},null,e,arguments.length)},wrapAll:function(e){if(bI.isFunction(e)){return this.each(function(b2){bI(this).wrapAll(e.call(this,b2))})}if(this[0]){var b1=bI(e,this[0].ownerDocument).eq(0).clone(true);if(this[0].parentNode){b1.insertBefore(this[0])}b1.map(function(){var b2=this;while(b2.firstChild&&b2.firstChild.nodeType===1){b2=b2.firstChild}return b2}).append(this)}return this},wrapInner:function(e){if(bI.isFunction(e)){return this.each(function(b1){bI(this).wrapInner(e.call(this,b1))})}return this.each(function(){var b1=bI(this),b2=b1.contents();if(b2.length){b2.wrapAll(e)}else{b1.append(e)}})},wrap:function(e){var b1=bI.isFunction(e);return this.each(function(b2){bI(this).wrapAll(b1?e.call(this,b2):e)})},unwrap:function(){return this.parent().each(function(){if(!bI.nodeName(this,"body")){bI(this).replaceWith(this.childNodes)}}).end()},append:function(){return this.domManip(arguments,true,function(e){if(this.nodeType===1||this.nodeType===11||this.nodeType===9){this.appendChild(e)}})},prepend:function(){return this.domManip(arguments,true,function(e){if(this.nodeType===1||this.nodeType===11||this.nodeType===9){this.insertBefore(e,this.firstChild)}})},before:function(){return this.domManip(arguments,false,function(e){if(this.parentNode){this.parentNode.insertBefore(e,this)}})},after:function(){return this.domManip(arguments,false,function(e){if(this.parentNode){this.parentNode.insertBefore(e,this.nextSibling)}})},remove:function(e,b3){var b2,b1=0;for(;(b2=this[b1])!=null;b1++){if(!e||bI.filter(e,[b2]).length>0){if(!b3&&b2.nodeType===1){bI.cleanData(k(b2))}if(b2.parentNode){if(b3&&bI.contains(b2.ownerDocument,b2)){br(k(b2,"script"))}b2.parentNode.removeChild(b2)}}}return this},empty:function(){var b1,e=0;for(;(b1=this[e])!=null;e++){if(b1.nodeType===1){bI.cleanData(k(b1,false))}while(b1.firstChild){b1.removeChild(b1.firstChild)}if(b1.options&&bI.nodeName(b1,"select")){b1.options.length=0}}return this},clone:function(b1,e){b1=b1==null?false:b1;e=e==null?b1:e;return this.map(function(){return bI.clone(this,b1,e)})},html:function(e){return bI.access(this,function(b4){var b3=this[0]||{},b2=0,b1=this.length;if(b4===aF){return b3.nodeType===1?b3.innerHTML.replace(aA,""):aF}if(typeof b4==="string"&&!al.test(b4)&&(bI.support.htmlSerialize||!J.test(b4))&&(bI.support.leadingWhitespace||!b0.test(b4))&&!T[(m.exec(b4)||["",""])[1].toLowerCase()]){b4=b4.replace(aC,"<$1></$2>");try{for(;b2<b1;b2++){b3=this[b2]||{};if(b3.nodeType===1){bI.cleanData(k(b3,false));b3.innerHTML=b4}}b3=0}catch(b5){}}if(b3){this.empty().append(b4)}},null,e,arguments.length)},replaceWith:function(b1){var e=bI.isFunction(b1);if(!e&&typeof b1!=="string"){b1=bI(b1).not(this).detach()}return this.domManip([b1],true,function(b4){var b3=this.nextSibling,b2=this.parentNode;if(b2&&this.nodeType===1||this.nodeType===11){bI(this).remove();if(b3){b3.parentNode.insertBefore(b4,b3)}else{b2.appendChild(b4)}}})},detach:function(e){return this.remove(e,true)},domManip:function(b8,ce,cd){b8=aH.apply([],b8);var b7,b6,b4,e,b2,cb,b5=0,b3=this.length,ca=this,cc=b3-1,b9=b8[0],b1=bI.isFunction(b9);if(b1||!(b3<=1||typeof b9!=="string"||bI.support.checkClone||!bT.test(b9))){return this.each(function(cg){var cf=ca.eq(cg);if(b1){b8[0]=b9.call(this,cg,ce?cf.html():aF)}cf.domManip(b8,ce,cd)})}if(b3){b7=bI.buildFragment(b8,this[0].ownerDocument,false,this);b6=b7.firstChild;if(b7.childNodes.length===1){b7=b6}if(b6){ce=ce&&bI.nodeName(b6,"tr");b4=bI.map(k(b7,"script"),t);e=b4.length;for(;b5<b3;b5++){b2=b7;if(b5!==cc){b2=bI.clone(b2,true,true);if(e){bI.merge(b4,k(b2,"script"))}}cd.call(ce&&bI.nodeName(this[b5],"table")?x(this[b5],"tbody"):this[b5],b2,b5)}if(e){cb=b4[b4.length-1].ownerDocument;bI.map(b4,bc);for(b5=0;b5<e;b5++){b2=b4[b5];if(by.test(b2.type||"")&&!bI._data(b2,"globalEval")&&bI.contains(cb,b2)){if(b2.src){bI.ajax({url:b2.src,type:"GET",dataType:"script",async:false,global:false,"throws":true})}else{bI.globalEval((b2.text||b2.textContent||b2.innerHTML||"").replace(aK,""))}}}}b7=b6=null}}return this}});function x(b1,e){return b1.getElementsByTagName(e)[0]||b1.appendChild(b1.ownerDocument.createElement(e))}function t(b1){var e=b1.getAttributeNode("type");b1.type=(e&&e.specified)+"/"+b1.type;return b1}function bc(b1){var e=ar.exec(b1.type);if(e){b1.type=e[1]}else{b1.removeAttribute("type")}return b1}function br(e,b2){var b3,b1=0;for(;(b3=e[b1])!=null;b1++){bI._data(b3,"globalEval",!b2||bI._data(b2[b1],"globalEval"))}}function at(b7,b1){if(b1.nodeType!==1||!bI.hasData(b7)){return}var b4,b3,e,b6=bI._data(b7),b5=bI._data(b1,b6),b2=b6.events;if(b2){delete b5.handle;b5.events={};for(b4 in b2){for(b3=0,e=b2[b4].length;b3<e;b3++){bI.event.add(b1,b4,b2[b4][b3])}}}if(b5.data){b5.data=bI.extend({},b5.data)}}function Q(b4,b1){var b5,b2,b3;if(b1.nodeType!==1){return}b5=b1.nodeName.toLowerCase();if(!bI.support.noCloneEvent&&b1[bI.expando]){b2=bI._data(b1);for(b3 in b2.events){bI.removeEvent(b1,b3,b2.handle)}b1.removeAttribute(bI.expando)}if(b5==="script"&&b1.text!==b4.text){t(b1).text=b4.text;bc(b1)}else{if(b5==="object"){if(b1.parentNode){b1.outerHTML=b4.outerHTML}if(bI.support.html5Clone&&(b4.innerHTML&&!bI.trim(b1.innerHTML))){b1.innerHTML=b4.innerHTML}}else{if(b5==="input"&&q.test(b4.type)){b1.defaultChecked=b1.checked=b4.checked;if(b1.value!==b4.value){b1.value=b4.value}}else{if(b5==="option"){b1.defaultSelected=b1.selected=b4.defaultSelected}else{if(b5==="input"||b5==="textarea"){b1.defaultValue=b4.defaultValue}}}}}}bI.each({appendTo:"append",prependTo:"prepend",insertBefore:"before",insertAfter:"after",replaceAll:"replaceWith"},function(e,b1){bI.fn[e]=function(b2){var b3,b5=0,b4=[],b7=bI(b2),b6=b7.length-1;for(;b5<=b6;b5++){b3=b5===b6?this:this.clone(true);bI(b7[b5])[b1](b3);ao.apply(b4,b3.get())}return this.pushStack(b4)}});function k(b3,e){var b1,b4,b2=0,b5=typeof b3.getElementsByTagName!=="undefined"?b3.getElementsByTagName(e||"*"):typeof b3.querySelectorAll!=="undefined"?b3.querySelectorAll(e||"*"):aF;if(!b5){for(b5=[],b1=b3.childNodes||b3;(b4=b1[b2])!=null;b2++){if(!e||bI.nodeName(b4,e)){b5.push(b4)}else{bI.merge(b5,k(b4,e))}}}return e===aF||e&&bI.nodeName(b3,e)?bI.merge([b3],b5):b5}function bU(e){if(q.test(e.type)){e.defaultChecked=e.checked}}bI.extend({clone:function(b1,b3,e){var b5,b6,b2,b4,b8,b7=bI.contains(b1.ownerDocument,b1);if(bI.support.html5Clone||bI.isXMLDoc(b1)||!J.test("<"+b1.nodeName+">")){b8=b1.cloneNode(true)}else{j.innerHTML=b1.outerHTML;j.removeChild(b8=j.firstChild)}if((!bI.support.noCloneEvent||!bI.support.noCloneChecked)&&(b1.nodeType===1||b1.nodeType===11)&&!bI.isXMLDoc(b1)){b5=k(b8);b6=k(b1);for(b4=0;(b2=b6[b4])!=null;++b4){if(b5[b4]){Q(b2,b5[b4])}}}if(b3){if(e){b6=b6||k(b1);b5=b5||k(b8);for(b4=0;(b2=b6[b4])!=null;b4++){at(b2,b5[b4])}}else{at(b1,b8)}}b5=k(b8,"script");if(b5.length>0){br(b5,!b7&&k(b1,"script"))}b5=b6=b2=null;return b8},buildFragment:function(b1,b3,b8,cd){var b7,b5,ce,cc,b2,cb,b9,b6=b1.length,b4=A(b3),e=[],ca=0;for(;ca<b6;ca++){b5=b1[ca];if(b5||b5===0){if(bI.type(b5)==="object"){bI.merge(e,b5.nodeType?[b5]:b5)}else{if(!I.test(b5)){e.push(b3.createTextNode(b5))}else{cc=cc||b4.appendChild(b3.createElement("div"));ce=(m.exec(b5)||["",""])[1].toLowerCase();b2=T[ce]||T._default;cc.innerHTML=b2[1]+b5.replace(aC,"<$1></$2>")+b2[2];b9=b2[0];while(b9--){cc=cc.lastChild}if(!bI.support.leadingWhitespace&&b0.test(b5)){e.push(b3.createTextNode(b0.exec(b5)[0]))}if(!bI.support.tbody){b5=ce==="table"&&!bV.test(b5)?cc.firstChild:b2[1]==="<table>"&&!bV.test(b5)?cc:0;b9=b5&&b5.childNodes.length;while(b9--){if(bI.nodeName((cb=b5.childNodes[b9]),"tbody")&&!cb.childNodes.length){b5.removeChild(cb)}}}bI.merge(e,cc.childNodes);cc.textContent="";while(cc.firstChild){cc.removeChild(cc.firstChild)}cc=b4.lastChild}}}}if(cc){b4.removeChild(cc)}if(!bI.support.appendChecked){bI.grep(k(e,"input"),bU)}ca=0;while((b5=e[ca++])){if(cd&&bI.inArray(b5,cd)!==-1){continue}b7=bI.contains(b5.ownerDocument,b5);cc=k(b4.appendChild(b5),"script");if(b7){br(cc)}if(b8){b9=0;while((b5=cc[b9++])){if(by.test(b5.type||"")){b8.push(b5)}}}}cc=null;return b4},cleanData:function(b1,b9){var b4,b2,b3,b8,b5=0,ca=bI.expando,e=bI.cache,b6=bI.support.deleteExpando,b7=bI.event.special;for(;(b3=b1[b5])!=null;b5++){if(b9||bI.acceptData(b3)){b2=b3[ca];b4=b2&&e[b2];if(b4){if(b4.events){for(b8 in b4.events){if(b7[b8]){bI.event.remove(b3,b8)}else{bI.removeEvent(b3,b8,b4.handle)}}}if(e[b2]){delete e[b2];if(b6){delete b3[ca]}else{if(typeof b3.removeAttribute!=="undefined"){b3.removeAttribute(ca)}else{b3[ca]=null}}a6.push(b2)}}}}}});var E,bn,aD,bg=/alpha\([^)]*\)/i,aT=/opacity\s*=\s*([^)]*)/,bm=/^(top|right|bottom|left)$/,F=/^(none|table(?!-c[ea]).+)/,aY=/^margin/,a9=new RegExp("^("+bz+")(.*)$","i"),W=new RegExp("^("+bz+")(?!px)[a-z%]+$","i"),S=new RegExp("^([+-])=("+bz+")","i"),bj={BODY:"block"},bb={position:"absolute",visibility:"hidden",display:"block"},bB={letterSpacing:0,fontWeight:400},bS=["Top","Right","Bottom","Left"],av=["Webkit","O","Moz","ms"];function b(b3,b1){if(b1 in b3){return b1}var b4=b1.charAt(0).toUpperCase()+b1.slice(1),e=b1,b2=av.length;while(b2--){b1=av[b2]+b4;if(b1 in b3){return b1}}return e}function P(b1,e){b1=e||b1;return bI.css(b1,"display")==="none"||!bI.contains(b1.ownerDocument,b1)}function p(b5,e){var b4,b1=[],b2=0,b3=b5.length;for(;b2<b3;b2++){b4=b5[b2];if(!b4.style){continue}b1[b2]=bI._data(b4,"olddisplay");if(e){if(!b1[b2]&&b4.style.display==="none"){b4.style.display=""}if(b4.style.display===""&&P(b4)){b1[b2]=bI._data(b4,"olddisplay",bD(b4.nodeName))}}else{if(!b1[b2]&&!P(b4)){bI._data(b4,"olddisplay",bI.css(b4,"display"))}}}for(b2=0;b2<b3;b2++){b4=b5[b2];if(!b4.style){continue}if(!e||b4.style.display==="none"||b4.style.display===""){b4.style.display=e?b1[b2]||"":"none"}}return b5}bI.fn.extend({css:function(e,b1){return bI.access(this,function(b6,b3,b7){var b5,b2,b8={},b4=0;if(bI.isArray(b3)){b5=bn(b6);b2=b3.length;for(;b4<b2;b4++){b8[b3[b4]]=bI.css(b6,b3[b4],false,b5)}return b8}return b7!==aF?bI.style(b6,b3,b7):bI.css(b6,b3)},e,b1,arguments.length>1)},show:function(){return p(this,true)},hide:function(){return p(this)},toggle:function(b1){var e=typeof b1==="boolean";return this.each(function(){if(e?b1:P(this)){bI(this).show()}else{bI(this).hide()}})}});bI.extend({cssHooks:{opacity:{get:function(b2,b1){if(b1){var e=E(b2,"opacity");return e===""?"1":e}}}},cssNumber:{columnCount:true,fillOpacity:true,fontWeight:true,lineHeight:true,opacity:true,orphans:true,widows:true,zIndex:true,zoom:true},cssProps:{"float":bI.support.cssFloat?"cssFloat":"styleFloat"},style:function(b3,b2,b9,b4){if(!b3||b3.nodeType===3||b3.nodeType===8||!b3.style){return}var b7,b8,ca,b5=bI.camelCase(b2),b1=b3.style;b2=bI.cssProps[b5]||(bI.cssProps[b5]=b(b1,b5));ca=bI.cssHooks[b2]||bI.cssHooks[b5];if(b9!==aF){b8=typeof b9;if(b8==="string"&&(b7=S.exec(b9))){b9=(b7[1]+1)*b7[2]+parseFloat(bI.css(b3,b2));b8="number"}if(b9==null||b8==="number"&&isNaN(b9)){return}if(b8==="number"&&!bI.cssNumber[b5]){b9+="px"}if(!bI.support.clearCloneStyle&&b9===""&&b2.indexOf("background")===0){b1[b2]="inherit"}if(!ca||!("set" in ca)||(b9=ca.set(b3,b9,b4))!==aF){try{b1[b2]=b9}catch(b6){}}}else{if(ca&&"get" in ca&&(b7=ca.get(b3,false,b4))!==aF){return b7}return b1[b2]}},css:function(b6,b4,b1,b5){var b7,b3,e,b2=bI.camelCase(b4);b4=bI.cssProps[b2]||(bI.cssProps[b2]=b(b6.style,b2));e=bI.cssHooks[b4]||bI.cssHooks[b2];if(e&&"get" in e){b7=e.get(b6,true,b1)}if(b7===aF){b7=E(b6,b4,b5)}if(b7==="normal"&&b4 in bB){b7=bB[b4]}if(b1){b3=parseFloat(b7);return b1===true||bI.isNumeric(b3)?b3||0:b7}return b7},swap:function(b5,b4,b6,b3){var b2,b1,e={};for(b1 in b4){e[b1]=b5.style[b1];b5.style[b1]=b4[b1]}b2=b6.apply(b5,b3||[]);for(b1 in b4){b5.style[b1]=e[b1]}return b2}});if(a2.getComputedStyle){bn=function(e){return a2.getComputedStyle(e,null)};E=function(b4,b2,b6){var b3,b1,b8,b5=b6||bn(b4),b7=b5?b5.getPropertyValue(b2)||b5[b2]:aF,e=b4.style;if(b5){if(b7===""&&!bI.contains(b4.ownerDocument,b4)){b7=bI.style(b4,b2)}if(W.test(b7)&&aY.test(b2)){b3=e.width;b1=e.minWidth;b8=e.maxWidth;e.minWidth=e.maxWidth=e.width=b7;b7=b5.width;e.width=b3;e.minWidth=b1;e.maxWidth=b8}}return b7}}else{if(l.documentElement.currentStyle){bn=function(e){return e.currentStyle};E=function(b3,b1,b6){var b2,b5,b7,b4=b6||bn(b3),b8=b4?b4[b1]:aF,e=b3.style;if(b8==null&&e&&e[b1]){b8=e[b1]}if(W.test(b8)&&!bm.test(b1)){b2=e.left;b5=b3.runtimeStyle;b7=b5&&b5.left;if(b7){b5.left=b3.currentStyle.left}e.left=b1==="fontSize"?"1em":b8;b8=e.pixelLeft+"px";e.left=b2;if(b7){b5.left=b7}}return b8===""?"auto":b8}}}function aJ(e,b2,b3){var b1=a9.exec(b2);return b1?Math.max(0,b1[1]-(b3||0))+(b1[2]||"px"):b2}function aw(b4,b1,e,b6,b3){var b2=e===(b6?"border":"content")?4:b1==="width"?1:0,b5=0;for(;b2<4;b2+=2){if(e==="margin"){b5+=bI.css(b4,e+bS[b2],true,b3)}if(b6){if(e==="content"){b5-=bI.css(b4,"padding"+bS[b2],true,b3)}if(e!=="margin"){b5-=bI.css(b4,"border"+bS[b2]+"Width",true,b3)}}else{b5+=bI.css(b4,"padding"+bS[b2],true,b3);if(e!=="padding"){b5+=bI.css(b4,"border"+bS[b2]+"Width",true,b3)}}}return b5}function u(b4,b1,e){var b3=true,b5=b1==="width"?b4.offsetWidth:b4.offsetHeight,b2=bn(b4),b6=bI.support.boxSizing&&bI.css(b4,"boxSizing",false,b2)==="border-box";if(b5<=0||b5==null){b5=E(b4,b1,b2);if(b5<0||b5==null){b5=b4.style[b1]}if(W.test(b5)){return b5}b3=b6&&(bI.support.boxSizingReliable||b5===b4.style[b1]);b5=parseFloat(b5)||0}return(b5+aw(b4,b1,e||(b6?"border":"content"),b3,b2))+"px"}function bD(b2){var b1=l,e=bj[b2];if(!e){e=a1(b2,b1);if(e==="none"||!e){aD=(aD||bI("<iframe frameborder='0' width='0' height='0'/>").css("cssText","display:block !important")).appendTo(b1.documentElement);b1=(aD[0].contentWindow||aD[0].contentDocument).document;b1.write("<!doctype html><html><body>");b1.close();e=a1(b2,b1);aD.detach()}bj[b2]=e}return e}function a1(e,b3){var b1=bI(b3.createElement(e)).appendTo(b3.body),b2=bI.css(b1[0],"display");b1.remove();return b2}bI.each(["height","width"],function(b1,e){bI.cssHooks[e]={get:function(b4,b3,b2){if(b3){return b4.offsetWidth===0&&F.test(bI.css(b4,"display"))?bI.swap(b4,bb,function(){return u(b4,e,b2)}):u(b4,e,b2)}},set:function(b4,b5,b2){var b3=b2&&bn(b4);return aJ(b4,b5,b2?aw(b4,e,b2,bI.support.boxSizing&&bI.css(b4,"boxSizing",false,b3)==="border-box",b3):0)}}});if(!bI.support.opacity){bI.cssHooks.opacity={get:function(b1,e){return aT.test((e&&b1.currentStyle?b1.currentStyle.filter:b1.style.filter)||"")?(0.01*parseFloat(RegExp.$1))+"":e?"1":""},set:function(b4,b5){var b3=b4.style,b1=b4.currentStyle,e=bI.isNumeric(b5)?"alpha(opacity="+b5*100+")":"",b2=b1&&b1.filter||b3.filter||"";b3.zoom=1;if((b5>=1||b5==="")&&bI.trim(b2.replace(bg,""))===""&&b3.removeAttribute){b3.removeAttribute("filter");if(b5===""||b1&&!b1.filter){return}}b3.filter=bg.test(b2)?b2.replace(bg,e):b2+" "+e}}}bI(function(){if(!bI.support.reliableMarginRight){bI.cssHooks.marginRight={get:function(b1,e){if(e){return bI.swap(b1,{display:"inline-block"},E,[b1,"marginRight"])}}}}if(!bI.support.pixelPosition&&bI.fn.position){bI.each(["top","left"],function(e,b1){bI.cssHooks[b1]={get:function(b3,b2){if(b2){b2=E(b3,b1);return W.test(b2)?bI(b3).position()[b1]+"px":b2}}}})}});if(bI.expr&&bI.expr.filters){bI.expr.filters.hidden=function(e){return(e.offsetWidth===0&&e.offsetHeight===0)||(!bI.support.reliableHiddenOffsets&&((e.style&&e.style.display)||bI.css(e,"display"))==="none")};bI.expr.filters.visible=function(e){return !bI.expr.filters.hidden(e)}}bI.each({margin:"",padding:"",border:"Width"},function(e,b1){bI.cssHooks[e+b1]={expand:function(b4){var b3=0,b2={},b5=typeof b4==="string"?b4.split(" "):[b4];for(;b3<4;b3++){b2[e+bS[b3]+b1]=b5[b3]||b5[b3-2]||b5[0]}return b2}};if(!aY.test(e)){bI.cssHooks[e+b1].set=aJ}});var bu=/%20/g,aR=/\[\]$/,U=/\r?\n/g,c=/^(?:submit|button|image|reset)$/i,au=/^(?:input|select|textarea|keygen)/i;bI.fn.extend({serialize:function(){return bI.param(this.serializeArray())},serializeArray:function(){return this.map(function(){var e=bI.prop(this,"elements");return e?bI.makeArray(e):this}).filter(function(){var e=this.type;return this.name&&!bI(this).is(":disabled")&&au.test(this.nodeName)&&!c.test(e)&&(this.checked||!q.test(e))}).map(function(e,b1){var b2=bI(this).val();return b2==null?null:bI.isArray(b2)?bI.map(b2,function(b3){return{name:b1.name,value:b3.replace(U,"\r\n")}}):{name:b1.name,value:b2.replace(U,"\r\n")}}).get()}});bI.param=function(e,b2){var b3,b1=[],b4=function(b5,b6){b6=bI.isFunction(b6)?b6():(b6==null?"":b6);b1[b1.length]=encodeURIComponent(b5)+"="+encodeURIComponent(b6)};if(b2===aF){b2=bI.ajaxSettings&&bI.ajaxSettings.traditional}if(bI.isArray(e)||(e.jquery&&!bI.isPlainObject(e))){bI.each(e,function(){b4(this.name,this.value)})}else{for(b3 in e){i(b3,e[b3],b2,b4)}}return b1.join("&").replace(bu,"+")};function i(b2,b4,b1,b3){var e;if(bI.isArray(b4)){bI.each(b4,function(b6,b5){if(b1||aR.test(b2)){b3(b2,b5)}else{i(b2+"["+(typeof b5==="object"?b6:"")+"]",b5,b1,b3)}})}else{if(!b1&&bI.type(b4)==="object"){for(e in b4){i(b2+"["+e+"]",b4[e],b1,b3)}}else{b3(b2,b4)}}}var bZ,Y,bN=bI.now(),az=/\?/,ap=/#.*$/,O=/([?&])_=[^&]*/,af=/^(.*?):[ \t]*([^\r\n]*)\r?$/mg,B=/^(?:about|app|app-storage|.+-extension|file|res|widget):$/,o=/^(?:GET|HEAD)$/,aG=/^\/\//,aU=/^([\w.+-]+:)(?:\/\/([^\/?#:]*)(?::(\d+)|)|)/,bY=bI.fn.load,v={},a7={},aW="*/".concat("*");try{Y=aL.href}catch(bf){Y=l.createElement("a");Y.href="";Y=Y.href}bZ=aU.exec(Y.toLowerCase())||[];function bK(e){return function(b4,b5){if(typeof b4!=="string"){b5=b4;b4="*"}var b1,b2=0,b3=b4.toLowerCase().match(ac)||[];if(bI.isFunction(b5)){while((b1=b3[b2++])){if(b1[0]==="+"){b1=b1.slice(1)||"*";(e[b1]=e[b1]||[]).unshift(b5)}else{(e[b1]=e[b1]||[]).push(b5)}}}}}function n(e,b2,b6,b3){var b1={},b4=(e===a7);function b5(b7){var b8;b1[b7]=true;bI.each(e[b7]||[],function(ca,b9){var cb=b9(b2,b6,b3);if(typeof cb==="string"&&!b4&&!b1[cb]){b2.dataTypes.unshift(cb);b5(cb);return false}else{if(b4){return !(b8=cb)}}});return b8}return b5(b2.dataTypes[0])||!b1["*"]&&b5("*")}function r(b2,b3){var b1,e,b4=bI.ajaxSettings.flatOptions||{};for(b1 in b3){if(b3[b1]!==aF){(b4[b1]?b2:(e||(e={})))[b1]=b3[b1]}}if(e){bI.extend(true,b2,e)}return b2}bI.fn.load=function(b3,b6,b7){if(typeof b3!=="string"&&bY){return bY.apply(this,arguments)}var e,b4,b2,b1=this,b5=b3.indexOf(" ");if(b5>=0){e=b3.slice(b5,b3.length);b3=b3.slice(0,b5)}if(bI.isFunction(b6)){b7=b6;b6=aF}else{if(b6&&typeof b6==="object"){b4="POST"}}if(b1.length>0){bI.ajax({url:b3,type:b4,dataType:"html",data:b6}).done(function(b8){b2=arguments;b1.html(e?bI("<div>").append(bI.parseHTML(b8)).find(e):b8)}).complete(b7&&function(b9,b8){b1.each(b7,b2||[b9.responseText,b8,b9])})}return this};bI.each(["ajaxStart","ajaxStop","ajaxComplete","ajaxError","ajaxSuccess","ajaxSend"],function(e,b1){bI.fn[b1]=function(b2){return this.on(b1,b2)}});bI.each(["get","post"],function(e,b1){bI[b1]=function(b2,b4,b5,b3){if(bI.isFunction(b4)){b3=b3||b5;b5=b4;b4=aF}return bI.ajax({url:b2,type:b1,dataType:b3,data:b4,success:b5})}});bI.extend({active:0,lastModified:{},etag:{},ajaxSettings:{url:Y,type:"GET",isLocal:B.test(bZ[1]),global:true,processData:true,async:true,contentType:"application/x-www-form-urlencoded; charset=UTF-8",accepts:{"*":aW,text:"text/plain",html:"text/html",xml:"application/xml, text/xml",json:"application/json, text/javascript"},contents:{xml:/xml/,html:/html/,json:/json/},responseFields:{xml:"responseXML",text:"responseText"},converters:{"* text":a2.String,"text html":true,"text json":bI.parseJSON,"text xml":bI.parseXML},flatOptions:{url:true,context:true}},ajaxSetup:function(b1,e){return e?r(r(b1,bI.ajaxSettings),e):r(bI.ajaxSettings,b1)},ajaxPrefilter:bK(v),ajaxTransport:bK(a7),ajax:function(b5,b2){if(typeof b5==="object"){b2=b5;b5=aF}b2=b2||{};var ch,b6,cl,b3,ca,ce,b1,cg,b9=bI.ajaxSetup({},b2),cn=b9.context||b9,cc=b9.context&&(cn.nodeType||cn.jquery)?bI(cn):bI.event,cm=bI.Deferred(),cj=bI.Callbacks("once memory"),b7=b9.statusCode||{},cd={},ck={},b4=0,b8="canceled",cf={readyState:0,getResponseHeader:function(co){var e;if(b4===2){if(!b3){b3={};while((e=af.exec(cl))){b3[e[1].toLowerCase()]=e[2]}}e=b3[co.toLowerCase()]}return e==null?null:e},getAllResponseHeaders:function(){return b4===2?cl:null},setRequestHeader:function(co,cp){var e=co.toLowerCase();if(!b4){co=ck[e]=ck[e]||co;cd[co]=cp}return this},overrideMimeType:function(e){if(!b4){b9.mimeType=e}return this},statusCode:function(co){var e;if(co){if(b4<2){for(e in co){b7[e]=[b7[e],co[e]]}}else{cf.always(co[cf.status])}}return this},abort:function(co){var e=co||b8;if(ch){ch.abort(e)}cb(0,e);return this}};cm.promise(cf).complete=cj.add;cf.success=cf.done;cf.error=cf.fail;b9.url=((b5||b9.url||Y)+"").replace(ap,"").replace(aG,bZ[1]+"//");b9.type=b2.method||b2.type||b9.method||b9.type;b9.dataTypes=bI.trim(b9.dataType||"*").toLowerCase().match(ac)||[""];if(b9.crossDomain==null){ce=aU.exec(b9.url.toLowerCase());b9.crossDomain=!!(ce&&(ce[1]!==bZ[1]||ce[2]!==bZ[2]||(ce[3]||(ce[1]==="http:"?80:443))!=(bZ[3]||(bZ[1]==="http:"?80:443))))}if(b9.data&&b9.processData&&typeof b9.data!=="string"){b9.data=bI.param(b9.data,b9.traditional)}n(v,b9,b2,cf);if(b4===2){return cf}b1=b9.global;if(b1&&bI.active++===0){bI.event.trigger("ajaxStart")}b9.type=b9.type.toUpperCase();b9.hasContent=!o.test(b9.type);b6=b9.url;if(!b9.hasContent){if(b9.data){b6=(b9.url+=(az.test(b6)?"&":"?")+b9.data);delete b9.data}if(b9.cache===false){b9.url=O.test(b6)?b6.replace(O,"$1_="+bN++):b6+(az.test(b6)?"&":"?")+"_="+bN++}}if(b9.ifModified){if(bI.lastModified[b6]){cf.setRequestHeader("If-Modified-Since",bI.lastModified[b6])}if(bI.etag[b6]){cf.setRequestHeader("If-None-Match",bI.etag[b6])}}if(b9.data&&b9.hasContent&&b9.contentType!==false||b2.contentType){cf.setRequestHeader("Content-Type",b9.contentType)}cf.setRequestHeader("Accept",b9.dataTypes[0]&&b9.accepts[b9.dataTypes[0]]?b9.accepts[b9.dataTypes[0]]+(b9.dataTypes[0]!=="*"?", "+aW+"; q=0.01":""):b9.accepts["*"]);for(cg in b9.headers){cf.setRequestHeader(cg,b9.headers[cg])}if(b9.beforeSend&&(b9.beforeSend.call(cn,cf,b9)===false||b4===2)){return cf.abort()}b8="abort";for(cg in {success:1,error:1,complete:1}){cf[cg](b9[cg])}ch=n(a7,b9,b2,cf);if(!ch){cb(-1,"No Transport")}else{cf.readyState=1;if(b1){cc.trigger("ajaxSend",[cf,b9])}if(b9.async&&b9.timeout>0){ca=setTimeout(function(){cf.abort("timeout")},b9.timeout)}try{b4=1;ch.send(cd,cb)}catch(ci){if(b4<2){cb(-1,ci)}else{throw ci}}}function cb(cs,co,ct,cq){var e,cw,cu,cr,cv,cp=co;if(b4===2){return}b4=2;if(ca){clearTimeout(ca)}ch=aF;cl=cq||"";cf.readyState=cs>0?4:0;if(ct){cr=g(b9,cf,ct)}if(cs>=200&&cs<300||cs===304){if(b9.ifModified){cv=cf.getResponseHeader("Last-Modified");if(cv){bI.lastModified[b6]=cv}cv=cf.getResponseHeader("etag");if(cv){bI.etag[b6]=cv}}if(cs===304){e=true;cp="notmodified"}else{e=ag(b9,cr);cp=e.state;cw=e.data;cu=e.error;e=!cu}}else{cu=cp;if(cs||!cp){cp="error";if(cs<0){cs=0}}}cf.status=cs;cf.statusText=(co||cp)+"";if(e){cm.resolveWith(cn,[cw,cp,cf])}else{cm.rejectWith(cn,[cf,cp,cu])}cf.statusCode(b7);b7=aF;if(b1){cc.trigger(e?"ajaxSuccess":"ajaxError",[cf,b9,e?cw:cu])}cj.fireWith(cn,[cf,cp]);if(b1){cc.trigger("ajaxComplete",[cf,b9]);if(!(--bI.active)){bI.event.trigger("ajaxStop")}}}return cf},getScript:function(e,b1){return bI.get(e,aF,b1,"script")},getJSON:function(e,b1,b2){return bI.get(e,b1,b2,"json")}});function g(b9,b8,b5){var b4,b6,b3,e,b1=b9.contents,b7=b9.dataTypes,b2=b9.responseFields;for(b6 in b2){if(b6 in b5){b8[b2[b6]]=b5[b6]}}while(b7[0]==="*"){b7.shift();if(b4===aF){b4=b9.mimeType||b8.getResponseHeader("Content-Type")}}if(b4){for(b6 in b1){if(b1[b6]&&b1[b6].test(b4)){b7.unshift(b6);break}}}if(b7[0] in b5){b3=b7[0]}else{for(b6 in b5){if(!b7[0]||b9.converters[b6+" "+b7[0]]){b3=b6;break}if(!e){e=b6}}b3=b3||e}if(b3){if(b3!==b7[0]){b7.unshift(b3)}return b5[b3]}}function ag(cb,b3){var b9,b1,b7,b4,ca={},b5=0,b8=cb.dataTypes.slice(),b2=b8[0];if(cb.dataFilter){b3=cb.dataFilter(b3,cb.dataType)}if(b8[1]){for(b9 in cb.converters){ca[b9.toLowerCase()]=cb.converters[b9]}}for(;(b7=b8[++b5]);){if(b7!=="*"){if(b2!=="*"&&b2!==b7){b9=ca[b2+" "+b7]||ca["* "+b7];if(!b9){for(b1 in ca){b4=b1.split(" ");if(b4[1]===b7){b9=ca[b2+" "+b4[0]]||ca["* "+b4[0]];if(b9){if(b9===true){b9=ca[b1]}else{if(ca[b1]!==true){b7=b4[0];b8.splice(b5--,0,b7)}}break}}}}if(b9!==true){if(b9&&cb["throws"]){b3=b9(b3)}else{try{b3=b9(b3)}catch(b6){return{state:"parsererror",error:b9?b6:"No conversion from "+b2+" to "+b7}}}}}b2=b7}}return{state:"success",data:b3}}bI.ajaxSetup({accepts:{script:"text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"},contents:{script:/(?:java|ecma)script/},converters:{"text script":function(e){bI.globalEval(e);return e}}});bI.ajaxPrefilter("script",function(e){if(e.cache===aF){e.cache=false}if(e.crossDomain){e.type="GET";e.global=false}});bI.ajaxTransport("script",function(b2){if(b2.crossDomain){var e,b1=l.head||bI("head")[0]||l.documentElement;return{send:function(b3,b4){e=l.createElement("script");e.async=true;if(b2.scriptCharset){e.charset=b2.scriptCharset}e.src=b2.url;e.onload=e.onreadystatechange=function(b6,b5){if(b5||!e.readyState||/loaded|complete/.test(e.readyState)){e.onload=e.onreadystatechange=null;if(e.parentNode){e.parentNode.removeChild(e)}e=null;if(!b5){b4(200,"success")}}};b1.insertBefore(e,b1.firstChild)},abort:function(){if(e){e.onload(aF,true)}}}}});var bq=[],a5=/(=)\?(?=&|$)|\?\?/;bI.ajaxSetup({jsonp:"callback",jsonpCallback:function(){var e=bq.pop()||(bI.expando+"_"+(bN++));this[e]=true;return e}});bI.ajaxPrefilter("json jsonp",function(b3,e,b4){var b6,b1,b2,b5=b3.jsonp!==false&&(a5.test(b3.url)?"url":typeof b3.data==="string"&&!(b3.contentType||"").indexOf("application/x-www-form-urlencoded")&&a5.test(b3.data)&&"data");if(b5||b3.dataTypes[0]==="jsonp"){b6=b3.jsonpCallback=bI.isFunction(b3.jsonpCallback)?b3.jsonpCallback():b3.jsonpCallback;if(b5){b3[b5]=b3[b5].replace(a5,"$1"+b6)}else{if(b3.jsonp!==false){b3.url+=(az.test(b3.url)?"&":"?")+b3.jsonp+"="+b6}}b3.converters["script json"]=function(){if(!b2){bI.error(b6+" was not called")}return b2[0]};b3.dataTypes[0]="json";b1=a2[b6];a2[b6]=function(){b2=arguments};b4.always(function(){a2[b6]=b1;if(b3[b6]){b3.jsonpCallback=e.jsonpCallback;bq.push(b6)}if(b2&&bI.isFunction(b1)){b1(b2[0])}b2=b1=aF});return"script"}});var ah,ax,ay=0,aP=a2.ActiveXObject&&function(){var e;for(e in ah){ah[e](aF,true)}};function bC(){try{return new a2.XMLHttpRequest()}catch(b1){}}function bd(){try{return new a2.ActiveXObject("Microsoft.XMLHTTP")}catch(b1){}}bI.ajaxSettings.xhr=a2.ActiveXObject?function(){return !this.isLocal&&bC()||bd()}:bC;ax=bI.ajaxSettings.xhr();bI.support.cors=!!ax&&("withCredentials" in ax);ax=bI.support.ajax=!!ax;if(ax){bI.ajaxTransport(function(e){if(!e.crossDomain||bI.support.cors){var b1;return{send:function(b7,b2){var b5,b3,b6=e.xhr();if(e.username){b6.open(e.type,e.url,e.async,e.username,e.password)}else{b6.open(e.type,e.url,e.async)}if(e.xhrFields){for(b3 in e.xhrFields){b6[b3]=e.xhrFields[b3]}}if(e.mimeType&&b6.overrideMimeType){b6.overrideMimeType(e.mimeType)}if(!e.crossDomain&&!b7["X-Requested-With"]){b7["X-Requested-With"]="XMLHttpRequest"}try{for(b3 in b7){b6.setRequestHeader(b3,b7[b3])}}catch(b4){}b6.send((e.hasContent&&e.data)||null);b1=function(cg,ca){var cb,b9,b8,ce,cd;try{if(b1&&(ca||b6.readyState===4)){b1=aF;if(b5){b6.onreadystatechange=bI.noop;if(aP){delete ah[b5]}}if(ca){if(b6.readyState!==4){b6.abort()}}else{ce={};cb=b6.status;cd=b6.responseXML;b8=b6.getAllResponseHeaders();if(cd&&cd.documentElement){ce.xml=cd}if(typeof b6.responseText==="string"){ce.text=b6.responseText}try{b9=b6.statusText}catch(cf){b9=""}if(!cb&&e.isLocal&&!e.crossDomain){cb=ce.text?200:404}else{if(cb===1223){cb=204}}}}}catch(cc){if(!ca){b2(-1,cc)}}if(ce){b2(cb,b9,ce,b8)}};if(!e.async){b1()}else{if(b6.readyState===4){setTimeout(b1)}else{b5=++ay;if(aP){if(!ah){ah={};bI(a2).unload(aP)}ah[b5]=b1}b6.onreadystatechange=b1}}},abort:function(){if(b1){b1(aF,true)}}}}})}var K,ad,bQ=/^(?:toggle|show|hide)$/,bJ=new RegExp("^(?:([+-])=|)("+bz+")([a-z%]*)$","i"),bP=/queueHooks$/,aB=[h],a0={"*":[function(e,b7){var b3,b8,b9=this.createTween(e,b7),b4=bJ.exec(b7),b5=b9.cur(),b1=+b5||0,b2=1,b6=20;if(b4){b3=+b4[2];b8=b4[3]||(bI.cssNumber[e]?"":"px");if(b8!=="px"&&b1){b1=bI.css(b9.elem,e,true)||b3||1;do{b2=b2||".5";b1=b1/b2;bI.style(b9.elem,e,b1+b8)}while(b2!==(b2=b9.cur()/b5)&&b2!==1&&--b6)}b9.unit=b8;b9.start=b1;b9.end=b4[1]?b1+(b4[1]+1)*b3:b3}return b9}]};function bl(){setTimeout(function(){K=aF});return(K=bI.now())}function be(b1,e){bI.each(e,function(b6,b4){var b5=(a0[b6]||[]).concat(a0["*"]),b2=0,b3=b5.length;for(;b2<b3;b2++){if(b5[b2].call(b1,b6,b4)){return}}})}function f(b2,b6,b9){var ca,e,b5=0,b1=aB.length,b8=bI.Deferred().always(function(){delete b4.elem}),b4=function(){if(e){return false}var cg=K||bl(),cd=Math.max(0,b3.startTime+b3.duration-cg),cb=cd/b3.duration||0,cf=1-cb,cc=0,ce=b3.tweens.length;for(;cc<ce;cc++){b3.tweens[cc].run(cf)}b8.notifyWith(b2,[b3,cf,cd]);if(cf<1&&ce){return cd}else{b8.resolveWith(b2,[b3]);return false}},b3=b8.promise({elem:b2,props:bI.extend({},b6),opts:bI.extend(true,{specialEasing:{}},b9),originalProperties:b6,originalOptions:b9,startTime:K||bl(),duration:b9.duration,tweens:[],createTween:function(cd,cb){var cc=bI.Tween(b2,b3.opts,cd,cb,b3.opts.specialEasing[cd]||b3.opts.easing);b3.tweens.push(cc);return cc},stop:function(cc){var cb=0,cd=cc?b3.tweens.length:0;if(e){return this}e=true;for(;cb<cd;cb++){b3.tweens[cb].run(1)}if(cc){b8.resolveWith(b2,[b3,cc])}else{b8.rejectWith(b2,[b3,cc])}return this}}),b7=b3.props;am(b7,b3.opts.specialEasing);for(;b5<b1;b5++){ca=aB[b5].call(b3,b2,b7,b3.opts);if(ca){return ca}}be(b3,b7);if(bI.isFunction(b3.opts.start)){b3.opts.start.call(b2,b3)}bI.fx.timer(bI.extend(b4,{elem:b2,anim:b3,queue:b3.opts.queue}));return b3.progress(b3.opts.progress).done(b3.opts.done,b3.opts.complete).fail(b3.opts.fail).always(b3.opts.always)}function am(b3,b5){var b2,b1,b6,b4,e;for(b2 in b3){b1=bI.camelCase(b2);b6=b5[b1];b4=b3[b2];if(bI.isArray(b4)){b6=b4[1];b4=b3[b2]=b4[0]}if(b2!==b1){b3[b1]=b4;delete b3[b2]}e=bI.cssHooks[b1];if(e&&"expand" in e){b4=e.expand(b4);delete b3[b1];for(b2 in b4){if(!(b2 in b3)){b3[b2]=b4[b2];b5[b2]=b6}}}else{b5[b1]=b6}}}bI.Animation=bI.extend(f,{tweener:function(b1,b4){if(bI.isFunction(b1)){b4=b1;b1=["*"]}else{b1=b1.split(" ")}var b3,e=0,b2=b1.length;for(;e<b2;e++){b3=b1[e];a0[b3]=a0[b3]||[];a0[b3].unshift(b4)}},prefilter:function(b1,e){if(e){aB.unshift(b1)}else{aB.push(b1)}}});function h(b4,ca,e){var b9,b2,cc,b3,cg,b6,cf,ce,cd,b5=this,b1=b4.style,cb={},b8=[],b7=b4.nodeType&&P(b4);if(!e.queue){ce=bI._queueHooks(b4,"fx");if(ce.unqueued==null){ce.unqueued=0;cd=ce.empty.fire;ce.empty.fire=function(){if(!ce.unqueued){cd()}}}ce.unqueued++;b5.always(function(){b5.always(function(){ce.unqueued--;if(!bI.queue(b4,"fx").length){ce.empty.fire()}})})}if(b4.nodeType===1&&("height" in ca||"width" in ca)){e.overflow=[b1.overflow,b1.overflowX,b1.overflowY];if(bI.css(b4,"display")==="inline"&&bI.css(b4,"float")==="none"){if(!bI.support.inlineBlockNeedsLayout||bD(b4.nodeName)==="inline"){b1.display="inline-block"}else{b1.zoom=1}}}if(e.overflow){b1.overflow="hidden";if(!bI.support.shrinkWrapBlocks){b5.done(function(){b1.overflow=e.overflow[0];b1.overflowX=e.overflow[1];b1.overflowY=e.overflow[2]})}}for(b9 in ca){cc=ca[b9];if(bQ.exec(cc)){delete ca[b9];b6=b6||cc==="toggle";if(cc===(b7?"hide":"show")){continue}b8.push(b9)}}b3=b8.length;if(b3){cg=bI._data(b4,"fxshow")||bI._data(b4,"fxshow",{});if("hidden" in cg){b7=cg.hidden}if(b6){cg.hidden=!b7}if(b7){bI(b4).show()}else{b5.done(function(){bI(b4).hide()})}b5.done(function(){var ch;bI._removeData(b4,"fxshow");for(ch in cb){bI.style(b4,ch,cb[ch])}});for(b9=0;b9<b3;b9++){b2=b8[b9];cf=b5.createTween(b2,b7?cg[b2]:0);cb[b2]=cg[b2]||bI.style(b4,b2);if(!(b2 in cg)){cg[b2]=cf.start;if(b7){cf.end=cf.start;cf.start=b2==="width"||b2==="height"?1:0}}}}}function G(b2,b1,b4,e,b3){return new G.prototype.init(b2,b1,b4,e,b3)}bI.Tween=G;G.prototype={constructor:G,init:function(b3,b1,b5,e,b4,b2){this.elem=b3;this.prop=b5;this.easing=b4||"swing";this.options=b1;this.start=this.now=this.cur();this.end=e;this.unit=b2||(bI.cssNumber[b5]?"":"px")},cur:function(){var e=G.propHooks[this.prop];return e&&e.get?e.get(this):G.propHooks._default.get(this)},run:function(b2){var b1,e=G.propHooks[this.prop];if(this.options.duration){this.pos=b1=bI.easing[this.easing](b2,this.options.duration*b2,0,1,this.options.duration)}else{this.pos=b1=b2}this.now=(this.end-this.start)*b1+this.start;if(this.options.step){this.options.step.call(this.elem,this.now,this)}if(e&&e.set){e.set(this)}else{G.propHooks._default.set(this)}return this}};G.prototype.init.prototype=G.prototype;G.propHooks={_default:{get:function(b1){var e;if(b1.elem[b1.prop]!=null&&(!b1.elem.style||b1.elem.style[b1.prop]==null)){return b1.elem[b1.prop]}e=bI.css(b1.elem,b1.prop,"auto");return !e||e==="auto"?0:e},set:function(e){if(bI.fx.step[e.prop]){bI.fx.step[e.prop](e)}else{if(e.elem.style&&(e.elem.style[bI.cssProps[e.prop]]!=null||bI.cssHooks[e.prop])){bI.style(e.elem,e.prop,e.now+e.unit)}else{e.elem[e.prop]=e.now}}}}};G.propHooks.scrollTop=G.propHooks.scrollLeft={set:function(e){if(e.elem.nodeType&&e.elem.parentNode){e.elem[e.prop]=e.now}}};bI.each(["toggle","show","hide"],function(b1,e){var b2=bI.fn[e];bI.fn[e]=function(b3,b5,b4){return b3==null||typeof b3==="boolean"?b2.apply(this,arguments):this.animate(bH(e,true),b3,b5,b4)}});bI.fn.extend({fadeTo:function(e,b3,b2,b1){return this.filter(P).css("opacity",0).show().end().animate({opacity:b3},e,b2,b1)},animate:function(b6,b3,b5,b4){var b2=bI.isEmptyObject(b6),e=bI.speed(b3,b5,b4),b1=function(){var b7=f(this,bI.extend({},b6),e);b1.finish=function(){b7.stop(true)};if(b2||bI._data(this,"finish")){b7.stop(true)}};b1.finish=b1;return b2||e.queue===false?this.each(b1):this.queue(e.queue,b1)},stop:function(b2,b1,e){var b3=function(b4){var b5=b4.stop;delete b4.stop;b5(e)};if(typeof b2!=="string"){e=b1;b1=b2;b2=aF}if(b1&&b2!==false){this.queue(b2||"fx",[])}return this.each(function(){var b7=true,b4=b2!=null&&b2+"queueHooks",b6=bI.timers,b5=bI._data(this);if(b4){if(b5[b4]&&b5[b4].stop){b3(b5[b4])}}else{for(b4 in b5){if(b5[b4]&&b5[b4].stop&&bP.test(b4)){b3(b5[b4])}}}for(b4=b6.length;b4--;){if(b6[b4].elem===this&&(b2==null||b6[b4].queue===b2)){b6[b4].anim.stop(e);b7=false;b6.splice(b4,1)}}if(b7||!e){bI.dequeue(this,b2)}})},finish:function(e){if(e!==false){e=e||"fx"}return this.each(function(){var b3,b6=bI._data(this),b2=b6[e+"queue"],b1=b6[e+"queueHooks"],b5=bI.timers,b4=b2?b2.length:0;b6.finish=true;bI.queue(this,e,[]);if(b1&&b1.cur&&b1.cur.finish){b1.cur.finish.call(this)}for(b3=b5.length;b3--;){if(b5[b3].elem===this&&b5[b3].queue===e){b5[b3].anim.stop(true);b5.splice(b3,1)}}for(b3=0;b3<b4;b3++){if(b2[b3]&&b2[b3].finish){b2[b3].finish.call(this)}}delete b6.finish})}});function bH(b2,b4){var b3,e={height:b2},b1=0;b4=b4?1:0;for(;b1<4;b1+=2-b4){b3=bS[b1];e["margin"+b3]=e["padding"+b3]=b2}if(b4){e.opacity=e.width=b2}return e}bI.each({slideDown:bH("show"),slideUp:bH("hide"),slideToggle:bH("toggle"),fadeIn:{opacity:"show"},fadeOut:{opacity:"hide"},fadeToggle:{opacity:"toggle"}},function(e,b1){bI.fn[e]=function(b2,b4,b3){return this.animate(b1,b2,b4,b3)}});bI.speed=function(b2,b3,b1){var e=b2&&typeof b2==="object"?bI.extend({},b2):{complete:b1||!b1&&b3||bI.isFunction(b2)&&b2,duration:b2,easing:b1&&b3||b3&&!bI.isFunction(b3)&&b3};e.duration=bI.fx.off?0:typeof e.duration==="number"?e.duration:e.duration in bI.fx.speeds?bI.fx.speeds[e.duration]:bI.fx.speeds._default;if(e.queue==null||e.queue===true){e.queue="fx"}e.old=e.complete;e.complete=function(){if(bI.isFunction(e.old)){e.old.call(this)}if(e.queue){bI.dequeue(this,e.queue)}};return e};bI.easing={linear:function(e){return e},swing:function(e){return 0.5-Math.cos(e*Math.PI)/2}};bI.timers=[];bI.fx=G.prototype.init;bI.fx.tick=function(){var b2,b1=bI.timers,e=0;K=bI.now();for(;e<b1.length;e++){b2=b1[e];if(!b2()&&b1[e]===b2){b1.splice(e--,1)}}if(!b1.length){bI.fx.stop()}K=aF};bI.fx.timer=function(e){if(e()&&bI.timers.push(e)){bI.fx.start()}};bI.fx.interval=13;bI.fx.start=function(){if(!ad){ad=setInterval(bI.fx.tick,bI.fx.interval)}};bI.fx.stop=function(){clearInterval(ad);ad=null};bI.fx.speeds={slow:600,fast:200,_default:400};bI.fx.step={};if(bI.expr&&bI.expr.filters){bI.expr.filters.animated=function(e){return bI.grep(bI.timers,function(b1){return e===b1.elem}).length}}bI.fn.offset=function(b1){if(arguments.length){return b1===aF?this:this.each(function(b6){bI.offset.setOffset(this,b1,b6)})}var e,b5,b3={top:0,left:0},b2=this[0],b4=b2&&b2.ownerDocument;if(!b4){return}e=b4.documentElement;if(!bI.contains(e,b2)){return b3}if(typeof b2.getBoundingClientRect!=="undefined"){b3=b2.getBoundingClientRect()}b5=bo(b4);return{top:b3.top+(b5.pageYOffset||e.scrollTop)-(e.clientTop||0),left:b3.left+(b5.pageXOffset||e.scrollLeft)-(e.clientLeft||0)}};bI.offset={setOffset:function(b3,cc,b6){var b7=bI.css(b3,"position");if(b7==="static"){b3.style.position="relative"}var b5=bI(b3),b1=b5.offset(),e=bI.css(b3,"top"),ca=bI.css(b3,"left"),cb=(b7==="absolute"||b7==="fixed")&&bI.inArray("auto",[e,ca])>-1,b9={},b8={},b2,b4;if(cb){b8=b5.position();b2=b8.top;b4=b8.left}else{b2=parseFloat(e)||0;b4=parseFloat(ca)||0}if(bI.isFunction(cc)){cc=cc.call(b3,b6,b1)}if(cc.top!=null){b9.top=(cc.top-b1.top)+b2}if(cc.left!=null){b9.left=(cc.left-b1.left)+b4}if("using" in cc){cc.using.call(b3,b9)}else{b5.css(b9)}}};bI.fn.extend({position:function(){if(!this[0]){return}var b2,b3,e={top:0,left:0},b1=this[0];if(bI.css(b1,"position")==="fixed"){b3=b1.getBoundingClientRect()}else{b2=this.offsetParent();b3=this.offset();if(!bI.nodeName(b2[0],"html")){e=b2.offset()}e.top+=bI.css(b2[0],"borderTopWidth",true);e.left+=bI.css(b2[0],"borderLeftWidth",true)}return{top:b3.top-e.top-bI.css(b1,"marginTop",true),left:b3.left-e.left-bI.css(b1,"marginLeft",true)}},offsetParent:function(){return this.map(function(){var e=this.offsetParent||l.documentElement;while(e&&(!bI.nodeName(e,"html")&&bI.css(e,"position")==="static")){e=e.offsetParent}return e||l.documentElement})}});bI.each({scrollLeft:"pageXOffset",scrollTop:"pageYOffset"},function(b2,b1){var e=/Y/.test(b1);bI.fn[b2]=function(b3){return bI.access(this,function(b4,b7,b6){var b5=bo(b4);if(b6===aF){return b5?(b1 in b5)?b5[b1]:b5.document.documentElement[b7]:b4[b7]}if(b5){b5.scrollTo(!e?b6:bI(b5).scrollLeft(),e?b6:bI(b5).scrollTop())}else{b4[b7]=b6}},b2,b3,arguments.length,null)}});function bo(e){return bI.isWindow(e)?e:e.nodeType===9?e.defaultView||e.parentWindow:false}bI.each({Height:"height",Width:"width"},function(e,b1){bI.each({padding:"inner"+e,content:b1,"":"outer"+e},function(b2,b3){bI.fn[b3]=function(b7,b6){var b5=arguments.length&&(b2||typeof b7!=="boolean"),b4=b2||(b7===true||b6===true?"margin":"border");return bI.access(this,function(b9,b8,ca){var cb;if(bI.isWindow(b9)){return b9.document.documentElement["client"+e]}if(b9.nodeType===9){cb=b9.documentElement;return Math.max(b9.body["scroll"+e],cb["scroll"+e],b9.body["offset"+e],cb["offset"+e],cb["client"+e])}return ca===aF?bI.css(b9,b8,b4):bI.style(b9,b8,ca,b4)},b1,b5?b7:aF,b5,null)}})});a2.jQuery=a2.$=bI;if(typeof define==="function"&&define.amd&&define.amd.jQuery){define("jquery",[],function(){return bI})}})(window);;

(function(av,q){var G,k,w,Q,T,ac,aB,af,K,x,m,aj,aw,j,O,M,ad,R,ap="sizzle"+-(new Date()),S=av.document,ay={},az=0,ak=0,c=I(),ao=I(),P=I(),au=typeof q,X=1<<31,ar=[],at=ar.pop,b=ar.push,v=ar.slice,h=ar.indexOf||function(aD){var aC=0,e=this.length;for(;aC<e;aC++){if(this[aC]===aD){return aC}}return -1},y="[\\x20\\t\\r\\n\\f]",a="(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",U=a.replace("w","w#"),r="([*^$|!~]?=)",am="\\["+y+"*("+a+")"+y+"*(?:"+r+y+"*(?:(['\"])((?:\\\\.|[^\\\\])*?)\\3|("+U+")|)|)"+y+"*\\]",t=":("+a+")(?:\\(((['\"])((?:\\\\.|[^\\\\])*?)\\3|((?:\\\\.|[^\\\\()[\\]]|"+am.replace(3,8)+")*)|.*)\\)|)",A=new RegExp("^"+y+"+|((?:^|[^\\\\])(?:\\\\.)*)"+y+"+$","g"),D=new RegExp("^"+y+"*,"+y+"*"),J=new RegExp("^"+y+"*([\\x20\\t\\r\\n\\f>+~])"+y+"*"),Z=new RegExp(t),aa=new RegExp("^"+U+"$"),ai={ID:new RegExp("^#("+a+")"),CLASS:new RegExp("^\\.("+a+")"),NAME:new RegExp("^\\[name=['\"]?("+a+")['\"]?\\]"),TAG:new RegExp("^("+a.replace("w","w*")+")"),ATTR:new RegExp("^"+am),PSEUDO:new RegExp("^"+t),CHILD:new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\("+y+"*(even|odd|(([+-]|)(\\d*)n|)"+y+"*(?:([+-]|)"+y+"*(\\d+)|))"+y+"*\\)|)","i"),needsContext:new RegExp("^"+y+"*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\("+y+"*((?:-\\d)?\\d*)"+y+"*\\)|)(?=[^-]|$)","i")},ag=/[\x20\t\r\n\f]*[+~]/,W=/^[^{]+\{\s*\[native code/,Y=/^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,g=/^(?:input|select|textarea|button)$/i,u=/^h\d$/i,V=/'|\\/g,C=/\=[\x20\t\r\n\f]*([^'"\]]*)[\x20\t\r\n\f]*\]/g,B=/\\([\da-fA-F]{1,6}[\x20\t\r\n\f]?|.)/g,al=function(e,aC){var i="0x"+aC-65536;return i!==i?aC:i<0?String.fromCharCode(i+65536):String.fromCharCode(i>>10|55296,i&1023|56320)};try{v.call(S.documentElement.childNodes,0)[0].nodeType}catch(L){v=function(aC){var aD,e=[];while((aD=this[aC++])){e.push(aD)}return e}}function N(e){return W.test(e+"")}function I(){var e,i=[];return(e=function(aC,aD){if(i.push(aC+=" ")>w.cacheLength){delete e[i.shift()]}return(e[aC]=aD)})}function s(e){e[ap]=true;return e}function l(i){var aD=K.createElement("div");try{return i(aD)}catch(aC){return false}finally{aD=null}}function E(aJ,aC,aN,aP){var aO,aG,aH,aL,aM,aF,aE,e,aD,aK;if((aC?aC.ownerDocument||aC:S)!==K){af(aC)}aC=aC||K;aN=aN||[];if(!aJ||typeof aJ!=="string"){return aN}if((aL=aC.nodeType)!==1&&aL!==9){return[]}if(!m&&!aP){if((aO=Y.exec(aJ))){if((aH=aO[1])){if(aL===9){aG=aC.getElementById(aH);if(aG&&aG.parentNode){if(aG.id===aH){aN.push(aG);return aN}}else{return aN}}else{if(aC.ownerDocument&&(aG=aC.ownerDocument.getElementById(aH))&&O(aC,aG)&&aG.id===aH){aN.push(aG);return aN}}}else{if(aO[2]){b.apply(aN,v.call(aC.getElementsByTagName(aJ),0));return aN}else{if((aH=aO[3])&&ay.getByClassName&&aC.getElementsByClassName){b.apply(aN,v.call(aC.getElementsByClassName(aH),0));return aN}}}}if(ay.qsa&&!aj.test(aJ)){aE=true;e=ap;aD=aC;aK=aL===9&&aJ;if(aL===1&&aC.nodeName.toLowerCase()!=="object"){aF=o(aJ);if((aE=aC.getAttribute("id"))){e=aE.replace(V,"\\$&")}else{aC.setAttribute("id",e)}e="[id='"+e+"'] ";aM=aF.length;while(aM--){aF[aM]=e+p(aF[aM])}aD=ag.test(aJ)&&aC.parentNode||aC;aK=aF.join(",")}if(aK){try{b.apply(aN,v.call(aD.querySelectorAll(aK),0));return aN}catch(aI){}finally{if(!aE){aC.removeAttribute("id")}}}}}return ax(aJ.replace(A,"$1"),aC,aN,aP)}T=E.isXML=function(e){var i=e&&(e.ownerDocument||e).documentElement;return i?i.nodeName!=="HTML":false};af=E.setDocument=function(e){var i=e?e.ownerDocument||e:S;if(i===K||i.nodeType!==9||!i.documentElement){return K}K=i;x=i.documentElement;m=T(i);ay.tagNameNoComments=l(function(aC){aC.appendChild(i.createComment(""));return !aC.getElementsByTagName("*").length});ay.attributes=l(function(aD){aD.innerHTML="<select></select>";var aC=typeof aD.lastChild.getAttribute("multiple");return aC!=="boolean"&&aC!=="string"});ay.getByClassName=l(function(aC){aC.innerHTML="<div class='hidden e'></div><div class='hidden'></div>";if(!aC.getElementsByClassName||!aC.getElementsByClassName("e").length){return false}aC.lastChild.className="e";return aC.getElementsByClassName("e").length===2});ay.getByName=l(function(aD){aD.id=ap+0;aD.innerHTML="<a name='"+ap+"'></a><div name='"+ap+"'></div>";x.insertBefore(aD,x.firstChild);var aC=i.getElementsByName&&i.getElementsByName(ap).length===2+i.getElementsByName(ap+0).length;ay.getIdNotName=!i.getElementById(ap);x.removeChild(aD);return aC});ay.sortDetached=l(function(aC){return l(function(aD){return aC.compareDocumentPosition&&!!(aC.compareDocumentPosition(aD)&1)})});w.attrHandle=l(function(aC){aC.innerHTML="<a href='#'></a>";return aC.firstChild&&typeof aC.firstChild.getAttribute!==au&&aC.firstChild.getAttribute("href")==="#"})?{}:{href:function(aC){return aC.getAttribute("href",2)},type:function(aC){return aC.getAttribute("type")}};if(ay.getIdNotName){w.find.ID=function(aE,aD){if(typeof aD.getElementById!==au&&!m){var aC=aD.getElementById(aE);return aC&&aC.parentNode?[aC]:[]}};w.filter.ID=function(aD){var aC=aD.replace(B,al);return function(aE){return aE.getAttribute("id")===aC}}}else{w.find.ID=function(aE,aD){if(typeof aD.getElementById!==au&&!m){var aC=aD.getElementById(aE);return aC?aC.id===aE||typeof aC.getAttributeNode!==au&&aC.getAttributeNode("id").value===aE?[aC]:q:[]}};w.filter.ID=function(aD){var aC=aD.replace(B,al);return function(aF){var aE=typeof aF.getAttributeNode!==au&&aF.getAttributeNode("id");return aE&&aE.value===aC}}}w.find.TAG=ay.tagNameNoComments?function(aC,aD){if(typeof aD.getElementsByTagName!==au){return aD.getElementsByTagName(aC)}}:function(aC,aG){var aH,aF=[],aE=0,aD=aG.getElementsByTagName(aC);if(aC==="*"){while((aH=aD[aE++])){if(aH.nodeType===1){aF.push(aH)}}return aF}return aD};w.find.NAME=ay.getByName&&function(aC,aD){if(typeof aD.getElementsByName!==au){return aD.getElementsByName(name)}};w.find.CLASS=ay.getByClassName&&function(aD,aC){if(typeof aC.getElementsByClassName!==au&&!m){return aC.getElementsByClassName(aD)}};aw=[];aj=[":focus"];if((ay.qsa=N(i.querySelectorAll))){l(function(aC){aC.innerHTML="<select><option selected=''></option></select>";if(!aC.querySelectorAll("[selected]").length){aj.push("\\["+y+"*(?:checked|disabled|ismap|multiple|readonly|selected|value)")}if(!aC.querySelectorAll(":checked").length){aj.push(":checked")}});l(function(aC){aC.innerHTML="<input type='hidden' i=''/>";if(aC.querySelectorAll("[i^='']").length){aj.push("[*^$]="+y+"*(?:\"\"|'')")}if(!aC.querySelectorAll(":enabled").length){aj.push(":enabled",":disabled")}aC.querySelectorAll("*,:x");aj.push(",.*:")})}if((ay.matchesSelector=N((j=x.matchesSelector||x.mozMatchesSelector||x.webkitMatchesSelector||x.oMatchesSelector||x.msMatchesSelector)))){l(function(aC){ay.disconnectedMatch=j.call(aC,"div");j.call(aC,"[s!='']:x");aw.push("!=",t)})}aj=new RegExp(aj.join("|"));aw=aw.length&&new RegExp(aw.join("|"));O=N(x.contains)||x.compareDocumentPosition?function(aD,aC){var aF=aD.nodeType===9?aD.documentElement:aD,aE=aC&&aC.parentNode;return aD===aE||!!(aE&&aE.nodeType===1&&(aF.contains?aF.contains(aE):aD.compareDocumentPosition&&aD.compareDocumentPosition(aE)&16))}:function(aD,aC){if(aC){while((aC=aC.parentNode)){if(aC===aD){return true}}}return false};M=x.compareDocumentPosition?function(aD,aC){if(aD===aC){ad=true;return 0}var aE=aC.compareDocumentPosition&&aD.compareDocumentPosition&&aD.compareDocumentPosition(aC);if(aE){if(aE&1||aD.parentNode&&aD.parentNode.nodeType===11||(R&&aC.compareDocumentPosition(aD)===aE)){if(aD===i||O(S,aD)){return -1}if(aC===i||O(S,aC)){return 1}return R?(h.call(R,aD)-h.call(R,aC)):0}return aE&4?-1:1}return aD.compareDocumentPosition?-1:1}:function(aD,aC){var aJ,aG=0,aI=aD.parentNode,aF=aC.parentNode,aE=[aD],aH=[aC];if(aD===aC){ad=true;return 0}else{if(!aI||!aF){return aD===i?-1:aC===i?1:aI?-1:aF?1:0}else{if(aI===aF){return d(aD,aC)}}}aJ=aD;while((aJ=aJ.parentNode)){aE.unshift(aJ)}aJ=aC;while((aJ=aJ.parentNode)){aH.unshift(aJ)}while(aE[aG]===aH[aG]){aG++}return aG?d(aE[aG],aH[aG]):aE[aG]===S?-1:aH[aG]===S?1:0};ad=false;[0,0].sort(M);ay.detectDuplicates=ad;return K};E.matches=function(i,e){return E(i,null,null,e)};E.matchesSelector=function(aC,aE){if((aC.ownerDocument||aC)!==K){af(aC)}aE=aE.replace(C,"='$1']");if(ay.matchesSelector&&!m&&(!aw||!aw.test(aE))&&!aj.test(aE)){try{var i=j.call(aC,aE);if(i||ay.disconnectedMatch||aC.document&&aC.document.nodeType!==11){return i}}catch(aD){}}return E(aE,K,null,[aC]).length>0};E.contains=function(e,i){if((e.ownerDocument||e)!==K){af(e)}return O(e,i)};E.attr=function(i,e){var aC;if((i.ownerDocument||i)!==K){af(i)}if(!m){e=e.toLowerCase()}if((aC=w.attrHandle[e])){return aC(i)}if(m||ay.attributes){return i.getAttribute(e)}return((aC=i.getAttributeNode(e))||i.getAttribute(e))&&i[e]===true?e:aC&&aC.specified?aC.value:null};E.error=function(e){throw new Error("Syntax error, unrecognized expression: "+e)};E.uniqueSort=function(aD){var aE,aF=[],aC=1,e=0;ad=!ay.detectDuplicates;R=!ay.sortDetached&&aD.slice(0);aD.sort(M);if(ad){for(;(aE=aD[aC]);aC++){if(aE===aD[aC-1]){e=aF.push(aC)}}while(e--){aD.splice(aF[e],1)}}return aD};function d(i,e){var aD=e&&i,aC=aD&&(~e.sourceIndex||X)-(~i.sourceIndex||X);if(aC){return aC}if(aD){while((aD=aD.nextSibling)){if(aD===e){return -1}}}return i?1:-1}function F(e){return function(aC){var i=aC.nodeName.toLowerCase();return i==="input"&&aC.type===e}}function f(e){return function(aC){var i=aC.nodeName.toLowerCase();return(i==="input"||i==="button")&&aC.type===e}}function an(e){return s(function(i){i=+i;return s(function(aC,aG){var aE,aD=e([],aC.length,i),aF=aD.length;while(aF--){if(aC[(aE=aD[aF])]){aC[aE]=!(aG[aE]=aC[aE])}}})})}Q=E.getText=function(aF){var aE,aC="",aD=0,e=aF.nodeType;if(!e){for(;(aE=aF[aD]);aD++){aC+=Q(aE)}}else{if(e===1||e===9||e===11){if(typeof aF.textContent==="string"){return aF.textContent}else{for(aF=aF.firstChild;aF;aF=aF.nextSibling){aC+=Q(aF)}}}else{if(e===3||e===4){return aF.nodeValue}}}return aC};w=E.selectors={cacheLength:50,createPseudo:s,match:ai,find:{},relative:{">":{dir:"parentNode",first:true}," ":{dir:"parentNode"},"+":{dir:"previousSibling",first:true},"~":{dir:"previousSibling"}},preFilter:{ATTR:function(e){e[1]=e[1].replace(B,al);e[3]=(e[4]||e[5]||"").replace(B,al);if(e[2]==="~="){e[3]=" "+e[3]+" "}return e.slice(0,4)},CHILD:function(e){e[1]=e[1].toLowerCase();if(e[1].slice(0,3)==="nth"){if(!e[3]){E.error(e[0])}e[4]=+(e[4]?e[5]+(e[6]||1):2*(e[3]==="even"||e[3]==="odd"));e[5]=+((e[7]+e[8])||e[3]==="odd")}else{if(e[3]){E.error(e[0])}}return e},PSEUDO:function(i){var e,aC=!i[5]&&i[2];if(ai.CHILD.test(i[0])){return null}if(i[4]){i[2]=i[4]}else{if(aC&&Z.test(aC)&&(e=o(aC,true))&&(e=aC.indexOf(")",aC.length-e)-aC.length)){i[0]=i[0].slice(0,e);i[2]=aC.slice(0,e)}}return i.slice(0,3)}},filter:{TAG:function(e){if(e==="*"){return function(){return true}}e=e.replace(B,al).toLowerCase();return function(i){return i.nodeName&&i.nodeName.toLowerCase()===e}},CLASS:function(e){var i=c[e+" "];return i||(i=new RegExp("(^|"+y+")"+e+"("+y+"|$)"))&&c(e,function(aC){return i.test(aC.className||(typeof aC.getAttribute!==au&&aC.getAttribute("class"))||"")})},ATTR:function(aC,i,e){return function(aE){var aD=E.attr(aE,aC);if(aD==null){return i==="!="}if(!i){return true}aD+="";return i==="="?aD===e:i==="!="?aD!==e:i==="^="?e&&aD.indexOf(e)===0:i==="*="?e&&aD.indexOf(e)>-1:i==="$="?e&&aD.slice(-e.length)===e:i==="~="?(" "+aD+" ").indexOf(e)>-1:i==="|="?aD===e||aD.slice(0,e.length+1)===e+"-":false}},CHILD:function(i,aE,aD,aF,aC){var aH=i.slice(0,3)!=="nth",e=i.slice(-4)!=="last",aG=aE==="of-type";return aF===1&&aC===0?function(aI){return !!aI.parentNode}:function(aO,aM,aR){var aI,aU,aP,aT,aQ,aL,aN=aH!==e?"nextSibling":"previousSibling",aS=aO.parentNode,aK=aG&&aO.nodeName.toLowerCase(),aJ=!aR&&!aG;if(aS){if(aH){while(aN){aP=aO;while((aP=aP[aN])){if(aG?aP.nodeName.toLowerCase()===aK:aP.nodeType===1){return false}}aL=aN=i==="only"&&!aL&&"nextSibling"}return true}aL=[e?aS.firstChild:aS.lastChild];if(e&&aJ){aU=aS[ap]||(aS[ap]={});aI=aU[i]||[];aQ=aI[0]===az&&aI[1];aT=aI[0]===az&&aI[2];aP=aQ&&aS.childNodes[aQ];while((aP=++aQ&&aP&&aP[aN]||(aT=aQ=0)||aL.pop())){if(aP.nodeType===1&&++aT&&aP===aO){aU[i]=[az,aQ,aT];break}}}else{if(aJ&&(aI=(aO[ap]||(aO[ap]={}))[i])&&aI[0]===az){aT=aI[1]}else{while((aP=++aQ&&aP&&aP[aN]||(aT=aQ=0)||aL.pop())){if((aG?aP.nodeName.toLowerCase()===aK:aP.nodeType===1)&&++aT){if(aJ){(aP[ap]||(aP[ap]={}))[i]=[az,aT]}if(aP===aO){break}}}}}aT-=aC;return aT===aF||(aT%aF===0&&aT/aF>=0)}}},PSEUDO:function(aD,aC){var e,i=w.pseudos[aD]||w.setFilters[aD.toLowerCase()]||E.error("unsupported pseudo: "+aD);if(i[ap]){return i(aC)}if(i.length>1){e=[aD,aD,"",aC];return w.setFilters.hasOwnProperty(aD.toLowerCase())?s(function(aG,aI){var aF,aE=i(aG,aC),aH=aE.length;while(aH--){aF=h.call(aG,aE[aH]);aG[aF]=!(aI[aF]=aE[aH])}}):function(aE){return i(aE,0,e)}}return i}},pseudos:{not:s(function(e){var i=[],aC=[],aD=ac(e.replace(A,"$1"));return aD[ap]?s(function(aF,aK,aI,aG){var aJ,aE=aD(aF,null,aG,[]),aH=aF.length;while(aH--){if((aJ=aE[aH])){aF[aH]=!(aK[aH]=aJ)}}}):function(aG,aF,aE){i[0]=aG;aD(i,null,aE,aC);return !aC.pop()}}),has:s(function(e){return function(i){return E(e,i).length>0}}),contains:s(function(e){return function(i){return(i.textContent||i.innerText||Q(i)).indexOf(e)>-1}}),lang:s(function(e){if(!aa.test(e||"")){E.error("unsupported lang: "+e)}e=e.replace(B,al).toLowerCase();return function(aC){var i;do{if((i=m?aC.getAttribute("xml:lang")||aC.getAttribute("lang"):aC.lang)){i=i.toLowerCase();return i===e||i.indexOf(e+"-")===0}}while((aC=aC.parentNode)&&aC.nodeType===1);return false}}),target:function(e){var i=av.location&&av.location.hash;return i&&i.slice(1)===e.id},root:function(e){return e===x},focus:function(e){return e===K.activeElement&&(!K.hasFocus||K.hasFocus())&&!!(e.type||e.href||~e.tabIndex)},enabled:function(e){return e.disabled===false},disabled:function(e){return e.disabled===true},checked:function(e){var i=e.nodeName.toLowerCase();return(i==="input"&&!!e.checked)||(i==="option"&&!!e.selected)},selected:function(e){if(e.parentNode){e.parentNode.selectedIndex}return e.selected===true},empty:function(e){for(e=e.firstChild;e;e=e.nextSibling){if(e.nodeName>"@"||e.nodeType===3||e.nodeType===4){return false}}return true},parent:function(e){return !w.pseudos.empty(e)},header:function(e){return u.test(e.nodeName)},input:function(e){return g.test(e.nodeName)},button:function(i){var e=i.nodeName.toLowerCase();return e==="input"&&i.type==="button"||e==="button"},text:function(i){var e;return i.nodeName.toLowerCase()==="input"&&i.type==="text"&&((e=i.getAttribute("type"))==null||e.toLowerCase()===i.type)},first:an(function(){return[0]}),last:an(function(e,i){return[i-1]}),eq:an(function(e,aC,i){return[i<0?i+aC:i]}),even:an(function(e,aD){var aC=0;for(;aC<aD;aC+=2){e.push(aC)}return e}),odd:an(function(e,aD){var aC=1;for(;aC<aD;aC+=2){e.push(aC)}return e}),lt:an(function(e,aE,aD){var aC=aD<0?aD+aE:aD;for(;--aC>=0;){e.push(aC)}return e}),gt:an(function(e,aE,aD){var aC=aD<0?aD+aE:aD;for(;++aC<aE;){e.push(aC)}return e})}};for(G in {radio:true,checkbox:true,file:true,password:true,image:true}){w.pseudos[G]=F(G)}for(G in {submit:true,reset:true}){w.pseudos[G]=f(G)}function o(aE,aJ){var i,aF,aH,aI,aG,aC,e,aD=ao[aE+" "];if(aD){return aJ?0:aD.slice(0)}aG=aE;aC=[];e=w.preFilter;while(aG){if(!i||(aF=D.exec(aG))){if(aF){aG=aG.slice(aF[0].length)||aG}aC.push(aH=[])}i=false;if((aF=J.exec(aG))){i=aF.shift();aH.push({value:i,type:aF[0].replace(A," ")});aG=aG.slice(i.length)}for(aI in w.filter){if((aF=ai[aI].exec(aG))&&(!e[aI]||(aF=e[aI](aF)))){i=aF.shift();aH.push({value:i,type:aI,matches:aF});aG=aG.slice(i.length)}}if(!i){break}}return aJ?aG.length:aG?E.error(aE):ao(aE,aC).slice(0)}function p(aE){var aD=0,aC=aE.length,e="";for(;aD<aC;aD++){e+=aE[aD].value}return e}function z(aE,aC,aD){var e=aC.dir,aF=aD&&e==="parentNode",i=ak++;return aC.first?function(aI,aH,aG){while((aI=aI[e])){if(aI.nodeType===1||aF){return aE(aI,aH,aG)}}}:function(aK,aI,aH){var aM,aG,aJ,aL=az+" "+i;if(aH){while((aK=aK[e])){if(aK.nodeType===1||aF){if(aE(aK,aI,aH)){return true}}}}else{while((aK=aK[e])){if(aK.nodeType===1||aF){aJ=aK[ap]||(aK[ap]={});if((aG=aJ[e])&&aG[0]===aL){if((aM=aG[1])===true||aM===k){return aM===true}}else{aG=aJ[e]=[aL];aG[1]=aE(aK,aI,aH)||k;if(aG[1]===true){return true}}}}}}}function aA(e){return e.length>1?function(aF,aE,aC){var aD=e.length;while(aD--){if(!e[aD](aF,aE,aC)){return false}}return true}:e[0]}function ah(e,aC,aD,aE,aH){var aF,aK=[],aG=0,aI=e.length,aJ=aC!=null;for(;aG<aI;aG++){if((aF=e[aG])){if(!aD||aD(aF,aE,aH)){aK.push(aF);if(aJ){aC.push(aG)}}}}return aK}function n(aC,i,aE,aD,aF,e){if(aD&&!aD[ap]){aD=n(aD)}if(aF&&!aF[ap]){aF=n(aF,e)}return s(function(aQ,aN,aI,aP){var aS,aO,aK,aJ=[],aR=[],aH=aN.length,aG=aQ||H(i||"*",aI.nodeType?[aI]:aI,[]),aL=aC&&(aQ||!i)?ah(aG,aJ,aC,aI,aP):aG,aM=aE?aF||(aQ?aC:aH||aD)?[]:aN:aL;if(aE){aE(aL,aM,aI,aP)}if(aD){aS=ah(aM,aR);aD(aS,[],aI,aP);aO=aS.length;while(aO--){if((aK=aS[aO])){aM[aR[aO]]=!(aL[aR[aO]]=aK)}}}if(aQ){if(aF||aC){if(aF){aS=[];aO=aM.length;while(aO--){if((aK=aM[aO])){aS.push((aL[aO]=aK))}}aF(null,(aM=[]),aS,aP)}aO=aM.length;while(aO--){if((aK=aM[aO])&&(aS=aF?h.call(aQ,aK):aJ[aO])>-1){aQ[aS]=!(aN[aS]=aK)}}}}else{aM=ah(aM===aN?aM.splice(aH,aM.length):aM);if(aF){aF(null,aN,aM,aP)}else{b.apply(aN,aM)}}})}function aq(aH){var aC,aF,aD,aG=aH.length,aK=w.relative[aH[0].type],aL=aK||w.relative[" "],aE=aK?1:0,aI=z(function(i){return i===aC},aL,true),aJ=z(function(i){return h.call(aC,i)>-1},aL,true),e=[function(aN,aM,i){return(!aK&&(i||aM!==aB))||((aC=aM).nodeType?aI(aN,aM,i):aJ(aN,aM,i))}];for(;aE<aG;aE++){if((aF=w.relative[aH[aE].type])){e=[z(aA(e),aF)]}else{aF=w.filter[aH[aE].type].apply(null,aH[aE].matches);if(aF[ap]){aD=++aE;for(;aD<aG;aD++){if(w.relative[aH[aD].type]){break}}return n(aE>1&&aA(e),aE>1&&p(aH.slice(0,aE-1)).replace(A,"$1"),aF,aE<aD&&aq(aH.slice(aE,aD)),aD<aG&&aq((aH=aH.slice(aD))),aD<aG&&p(aH))}e.push(aF)}}return aA(e)}function ae(aD,aC){var aF=0,e=aC.length>0,aE=aD.length>0,i=function(aP,aJ,aO,aN,aV){var aK,aL,aQ,aU=[],aT=0,aM="0",aG=aP&&[],aR=aV!=null,aS=aB,aI=aP||aE&&w.find.TAG("*",aV&&aJ.parentNode||aJ),aH=(az+=aS==null?1:Math.random()||0.1);if(aR){aB=aJ!==K&&aJ;k=aF}for(;(aK=aI[aM])!=null;aM++){if(aE&&aK){aL=0;while((aQ=aD[aL++])){if(aQ(aK,aJ,aO)){aN.push(aK);break}}if(aR){az=aH;k=++aF}}if(e){if((aK=!aQ&&aK)){aT--}if(aP){aG.push(aK)}}}aT+=aM;if(e&&aM!==aT){aL=0;while((aQ=aC[aL++])){aQ(aG,aU,aJ,aO)}if(aP){if(aT>0){while(aM--){if(!(aG[aM]||aU[aM])){aU[aM]=at.call(aN)}}}aU=ah(aU)}b.apply(aN,aU);if(aR&&!aP&&aU.length>0&&(aT+aC.length)>1){E.uniqueSort(aN)}}if(aR){az=aH;aB=aS}return aG};return e?s(i):i}ac=E.compile=function(e,aG){var aD,aC=[],aF=[],aE=P[e+" "];if(!aE){if(!aG){aG=o(e)}aD=aG.length;while(aD--){aE=aq(aG[aD]);if(aE[ap]){aC.push(aE)}else{aF.push(aE)}}aE=P(e,ae(aF,aC))}return aE};function H(aC,aF,aE){var aD=0,e=aF.length;for(;aD<e;aD++){E(aC,aF[aD],aE)}return aE}function ax(aD,e,aE,aH){var aF,aJ,aC,aK,aI,aG=o(aD);if(!aH){if(aG.length===1){aJ=aG[0]=aG[0].slice(0);if(aJ.length>2&&(aC=aJ[0]).type==="ID"&&e.nodeType===9&&!m&&w.relative[aJ[1].type]){e=w.find.ID(aC.matches[0].replace(B,al),e)[0];if(!e){return aE}aD=aD.slice(aJ.shift().value.length)}aF=ai.needsContext.test(aD)?0:aJ.length;while(aF--){aC=aJ[aF];if(w.relative[(aK=aC.type)]){break}if((aI=w.find[aK])){if((aH=aI(aC.matches[0].replace(B,al),ag.test(aJ[0].type)&&e.parentNode||e))){aJ.splice(aF,1);aD=aH.length&&p(aJ);if(!aD){b.apply(aE,v.call(aH,0));return aE}break}}}}}ac(aD,aG)(aH,e,m,aE,ag.test(aD));return aE}w.pseudos.nth=w.pseudos.eq;function ab(){}w.filters=ab.prototype=w.pseudos;w.setFilters=new ab();af();if(typeof define==="function"&&define.amd){define(function(){return E})}else{av.Sizzle=E}})(window);
(function(){
	Sizzle.selectors.filters.visible = function( elem ) {
		return !(elem.type=="hidden"||elem.style.display=="none"||elem.style.visibility=="hidden");
	};
	Sizzle.selectors.filters.hidden = function( elem ) {
		return !Sizzle.selectors.filters.visible(elem);
	};
	var F = window.F = function(selector,element){
		if(typeof selector =="function"){
			F.load(selector);
			return;
		}
		return new F.fn.F__(selector,element||document);
	}
	F.fn=F.prototype={
		__l__:[],
		$$guid:0,
		returnValue:null,
		F__:function(opt,SOU){
			while(this.__l__.length>0)this.__l__.pop();
			if(opt==window){
				this.__l__.push(opt);return;
			}
			if(opt.nodeType && (opt.nodeType==1 || opt.nodeType==9)){
				this.__l__.push(opt);return;
			}
			if(opt.constructor==Array){
				this.__l__=	opt;return;
			}
			this.__l__ = Sizzle(opt,SOU);
		},
		find:function(selector){
			var ary_=[];
			this.each(function(){
				var tmp=Sizzle(selector,this);
				while(tmp.length>0){
					ary_.push(tmp.pop());	
				}
			});
			return F(ary_);
		},
		filter:function(selector){
			return F(Sizzle.matches(selector,this.__l__));
		},
		html:function(value){
			var val=null;
			this.each(function(){
				if(value==undefined){
					val = this.innerHTML;
					return false;
				}else{
					this.innerHTML=value;
				}
			});
			if(val!=null)return val;
			return this;
		},
		addClass:function(cn){
			this.each(function(){
				F(this).attr("class",F.trim((F.trim(F(this).attr("class").replace(new RegExp('\\b' + cn + '\\b', 'g'), '')) + ' ' + cn)));
			 });
			return this;
		},
		removeClass:function(cn){
			this.each(function(){
				F(this).attr("class",F.trim(F(this).attr("class").replace(new RegExp('\\b' + cn + '\\b', 'g'), '')));
			});
			return this;
		},
		hasClass:function(cn){
			var has=false;
			var b = this.get(0);
			if(!b)return false;
			return (new RegExp('\\b' + cn + '\\b', 'g')).test(F(b).attr("class"));
		},
		Class:function(value){
			var val=null;
			this.each(function(){
				if(value==undefined){
					val = F(this).attr("class");
					return false;
				}else{
					F(this).attr("class",value);
				}
			});
			if(val!=null)return val;
			return this;
		},
		css:function(){
			var val=null;
			var args=arguments;
			this.each(function(){
				var str = this.style.cssText;
				if(str.substr(str.length-1,1)==";"){str = str.substr(0,str.length-1);}
				if(args.length==0){val=this.style.cssText;return false;	}
				if(args.length==1){
					if(typeof(args[0])=="string"){
						if(args[0].indexOf(":")<=0){
							//eval("var _sss = this.style." + args[0] + ";");
							val = this.style[args[0]];
							return false;
						}else{
							this.style.cssText = args[0];
						}
					}else if(typeof(args[0])=="object"){
						var arg = args[0];
						for(var i in arg){
							if(typeof arg[i]=="object")break;
							var regexp=new RegExp("(\\;|^)"+i.replace("-","\\-")+"(\\s*)\\:(.+?)(\\;|$)","igm");
							str = str.replace(regexp,"$1");
							str += ";" + i + ":" + arg[i];
						}
						this.style.cssText = str;
					}
				}
				if(args.length==2){
					name = args[0];
					if(name === "float" || name === "cssFloat"){
						if(F.browser.ie){
							name = "styleFloat";
						}else{
							name = "cssFloat";
						}
					}
					if(name=="opacity" && F.browser.ie && F.browser.version<9){
						var opacity = parseInt(parseFloat(args[1])*100);
						this.style.filter = 'alpha(opacity="' + opacity + '")';
						if(!this.style.zoom){
							this.style.zoom = 1;
						}
						return;
					}
					this.style[name] =args[1];
				}
			});
			if(val!=null)return val;
			return this;			
		},
		val:function(value){
			var val=null;
			this.each(function(){
				if(value==undefined){
					val = this.value;
					return false;
				}else{
					this.value=value;
				}
			});
			if(val!=null)return val;
			return this;
		},
		text:function(txt){
			if(txt==undefined){
				if(this.__l__[0].length<=0)return"";
				return F.text(this.__l__[0].innerHTML) ;
			}else{
				this.each(function(){
					if(this.innerText){
						this.innerText=txt;
					}else{
						this.textContent=txt;
					}
				});
			}
			return this;			
		},
		parent:function(){
			var _ary=[];
			this.each(function(){
				if(this.parentNode)_ary.push(this.parentNode);
			 });
			return F(_ary);
		},
		tag:function(){
			return this.__l__.length>0?this.__l__[0].nodeName.toLowerCase():"";
		},
		first:function(){
			var _ary=[];
			this.each(function(){
				if(!this.firstChild)return;
				var ele = this.firstChild;
				while(ele.nodeType!=1 && ele.nextSibling){
					ele = ele.nextSibling;
				}
				if(ele.nodeType==1)_ary.push(ele);
			 });
			return F(_ary);
		},
		last:function(){
			var _ary=[];
			this.each(function(){
				if(!this.lastChild)return;
				var ele = this.lastChild;
				while(ele.nodeType!=1 && ele.previousSibling){
					ele = ele.previousSibling;
				}
				if(ele.nodeType==1)_ary.push(ele);
			 });
			return F(_ary);
		},
		remove:function(){
			this.each(function(){
				if(this.parentNode)this.parentNode.removeChild(this);
			 });
		},
		append:function(nod){
			if(typeof(nod)=="string"){
				var div = document.createElement("div");
				div.innerHTML=nod;
				this.each(function(){
					var self=this;
					F(div).child().each(function(){if(this.nodeName) self.appendChild(this);});
				});
			}else{
				this.each(function(){
					this.appendChild(nod.cloneNode(true));   
				});
			}
			return this;
		},
		hasAttr:function(name){
			return this.__l__.length>0?
			(this.__l__[0].hasAttribute ? this.__l__[0].hasAttribute(name) : (this.__l__[0].getAttribute(name)!=null)):false;
		},
		attr:function(name,value){
			if(name.toLowerCase()=="class")name = F.classstr;
			if(value===undefined){
				var ret = this.__l__.length>0?this.__l__[0].getAttribute(name):"";
				if(ret==null)return "";
				return ret;
			}else{
				this.each(function(){
					if(value!=null){
						this.setAttribute(name,value);
					}else{
						this.removeAttribute(name);
					}
				});
			}
			return this;
		},
		next:function(){
			var Ary=[];
			this.each(function(){
				var ele = this.nextSibling;
				while(ele !=null && ele.nodeType!=1){
					ele = ele.nextSibling;
				}
				if(ele)Ary.push(ele);
			});
			return F(Ary);
		},
		prev:function(){
			var Ary=[];
			this.each(function(){
				var ele = this.previousSibling;
				while(ele !=null && ele.nodeType!=1){
					ele = ele.previousSibling;
				}
				if(ele)Ary.push(ele);
			});
			return F(Ary);
		},
		child:function(){
			var Ary=[];
			this.each(function(){
				for(var i in this.childNodes){
					if(this.childNodes[i].nodeType==1)Ary.push(this.childNodes[i]);
				}
			});
			return F(Ary);
		},
		hover:function(fn1,fn2){
			this.each(function(){
				F(this).mouseover(fn1);
				F(this).mouseout(fn2);
			});
			return this;					
		},
		toggle:function(){
			this.each(function(){
				this.style.display = this.style.display=="block" ?"none":"block";	   
			});
		},
		position:function(){
			if(this.__l__ ==null || this.__l__.length<=0)return;
			var el = this.__l__[0];
			var box = el.getBoundingClientRect(), 
			doc = el.ownerDocument, 
			body = doc.body, 
			html = doc.documentElement,
			clientTop = html.clientTop || body.clientTop || 0, clientLeft = html.clientLeft || body.clientLeft || 0, 
			top = box.top + (self.pageYOffset || html.scrollTop || body.scrollTop ) - clientTop, 
			left = box.left + (self.pageXOffset || html.scrollLeft || body.scrollLeft) - clientLeft;
			return { "top": top, "left": left,"box":box };	
		},
		unbind:function(evt){
			this.each(function(){
				if(!this.events)return;
				while(this.events[evt].length>0){
					var fn = this.events[evt].pop();
					fn = null;
				}
			});
			return this;
		},
		each:function(fn,args){
			if(this.__l__ ==null || this.__l__.length<=0)return;
			this.returnValue=null;
			F.each.call(this,this.__l__,fn,args);
			return ((this.returnValue==null||this.returnValue==undefined)?this : this.returnValue);
		},length:function(){return this.__l__.length;},get:function(index){if(index<0||index>=this.__l__.length)return null;return this.__l__[index];}
	};
	F.extend=function(){
		if(arguments.length<=0)return;
		if(arguments.length==2){
			var srcObj=arguments[0];
			var newObj=arguments[1];
			if(typeof srcObj!="object")srcObj={};
			if(typeof newObj!="object")newObj={};
			for(var i in newObj)srcObj[i]=newObj[i];
			return srcObj;
		}
		var name = arguments[0];
		var args=[];
		if(typeof name=="function"){
			name.apply(this,args);	
		}else{
			var self=this;
			for(var i in name){
				if(this.__l__ && (typeof name[i]=="function")){
					this[i]=(function(fn){
						return function(){
							var ret=this.each(fn,arguments);
							return ret;
						};		  
					})(name[i]);
				}else{
					this[i]=name[i];
				}
			}
		}
	};
	F.fn.extend=function(){
		F.extend.apply(F.fn,arguments);
	};
	F.fn.F__.prototype=F.fn;
	
	F.each= function(object, callback, args){
		if(object==null || object==undefined)return;
		var name, i = 0,length = object.length,returnValue=null;
		if (args) {
			if (length == undefined) {
				for (name in object) {
					returnValue = callback.apply(object[name], args);
					if (returnValue != undefined) break;
				}
			} else {
				for (; i < length;) {
					returnValue = callback.apply(object[i++], args);
					if (returnValue != undefined) break;
				}
			}
		} else {
			if (length == undefined) {
				for (name in object) {
					returnValue=callback.call(object[name], name, object[name]);
					if (returnValue != undefined) break;
				}
			} else {
				for (var value = object[0]; i < length; value = object[++i]) {
					returnValue = callback.call(value, i, value);
					if (returnValue != undefined) break;
				}
			}
		}
		this.returnValue=returnValue;
		return object;
	};
	/*code from jquery*/
	F.fix=function(e) { 
	    if (e["packaged"] == true) return e;
	    var originalEvent = e;
	    var event = { originalEvent : originalEvent}; 
			for (var i in originalEvent) {
      		event[i] = originalEvent[i]; 
			}
	    event["packaged"] = true; 
	    event.preventDefault = function() {
	      if (originalEvent.preventDefault) 
	       originalEvent.preventDefault(); 
	       originalEvent.returnValue = false; 
	    }; 
	    event.stopPropagation = function() {
	      if (originalEvent.stopPropagation) 
	        originalEvent.stopPropagation(); 
	      originalEvent.cancelBubble = true; 
	    }; 
	    event.timeStamp = event.timeStamp || (new Date()); 
	    if (!event.target)
	      event.target = event.srcElement || document;     
	    if (event.target.nodeType == 3)
	      event.target = event.target.parentNode; 
	    if (!event.relatedTarget && event.fromElement)
	      event.relatedTarget = event.fromElement == event.target 
	         ? event.toElement : event.fromElement; 
	    if (event.pageX == null && event.clientX != null) {
	      var doc = document.documentElement, body = document.body; 
	     event.pageX = event.clientX 
	       + (doc && doc.scrollLeft || body && body.scrollLeft || 0) 
	         - (doc.clientLeft || 0); 
	      event.pageY = event.clientY 
	       + (doc && doc.scrollTop || body && body.scrollTop || 0) 
	         - (doc.clientTop || 0); 
	    }
	   if (!event.which && ((event.charCode || event.charCode === 0)
	            ? event.charCode : event.keyCode)) 
	      {event.which = event.charCode || event.keyCode;}
	    if (!event.metaKey && event.ctrlKey)
	      event.metaKey = event.ctrlKey; 
	    if (!event.which && event.button)
	      event.which = (event.button & 1 ? 1 : (event.button & 2 
	         ? 3 : (event.button & 4 ? 2 : 0))); 
	    return event; 
	};
	F.events = F.fn.events = "blur,focus,load,resize,scroll,unload,click,dblclick,mousedown,mouseup,mousemove,mouseover,mouseout,change,select,submit,keydown,keypress,keyup,error".split(",");
	F.each(F.events,function(){
		F.fn[this] = (function(evt){
			return function(fn){
				var self=this;
				this.each(function(){
					self.$$guid++;
					fn.$$guid=self.$$guid;
					if(!this.events)this.events={};
					if(!this.events[evt]){
						this.events[evt]=[];
						if((typeof this["on"+evt]=="function")){
							this.events[evt].push(this["on"+evt]);
						}
						this["on"+evt] = function(e){
							e = e || window.event;
							if(this.events[evt].length<=0)return;
							for(i=0;i<this.events[evt].length;i++){
								this.events[evt][i].apply(this,[F.fix(e)]);
							}
						}
					}
					this.events[evt].push(fn);
				});
				return this;
				
			};
		})(this);
	});
	F.load = F.fn.load = function(fn){
		var isReady=false;
		if(F.browser.ie){
			while(/loaded|complete/i.test(document.readyState)){
				fn();
				isReady = true;
			}	
			if(!isReady){
				window.attachEvent("onload",fn);	
				isReady = true;
			}
		}else{
			document.addEventListener("DOMContentLoaded",fn,false);
			isReady = true;
		}
		if(!isReady){
			window.addEventListener("load",fn,false);
		}
	};
	F.extend(function(){
		this.classstr="class";
		this.agent = this.fn.agent = window.navigator.userAgent;
		this.trim=function(val){return val.replace(/(^\s*)|(\s*$)/g,"");};
		this.browser = this.fn.browser = {ie:false,ff:false,google:false,sa:false,op:false,wk:false};
		this.browser.ie = /MSIE/i.test(this.agent);
		this.browser.ff = /firefox/i.test(this.agent);
		this.browser.google = /safari/i.test(this.agent) && /chrome/i.test(this.agent);
		this.browser.sa = /safari/i.test(this.agent) && !(/chrome/i.test(this.agent));
		this.browser.op = /Opera/i.test(this.agent);
		this.browser.wk = /webkit/i.test(this.agent);
		this.browser.version="-1";
		if(this.agent.match(/MSIE ([\d\.]+)/i)){
			this.browser.version =this.agent.match(/MSIE ([\d\.]+)/i)[1];
			if(parseInt(this.browser.version)<8)this.classstr="className";
		}
		if(F.agent.match(/Safari\/([\d\.]+)/i)){
			this.browser.version =this.agent.match(/Safari\/([\d\.]+)/)[1];
		}
		if(F.agent.match(/Chrome\/([\d\.]+)/i)){
			this.browser.version =this.agent.match(/Chrome\/([\d\.]+)/)[1];
		}
		if(F.agent.match(/Opera\/([\d\.]+)/i)){
			this.browser.version =this.agent.match(/Opera\/([\d\.]+)/)[1];
		}					  
	});
})();;
(function(F){
	F.extend({
		"format":function(Str){
			var arg = arguments;
			if(arg.length<=1){return Str;}
			return Str.replace(/\{(\d*)\}/igm,function(ma){
					try{
							return arg[parseInt(ma.replace(/\{(\d+)\}/igm,"$1"))+1];        
					}catch(ex){
							return ma;
					}        
			});
		},
		"text":function(html){
			var ret="";
			ret = html.replace(/(<\/(p|h1|h2|h3|h4|h5|h6|div|li|ul|form|ol)>)/igm,"\r\n");
			ret = ret.replace(/<(br)([\s\S]*?)>/igm,"\r\n");
			ret = ret.replace(/<([\s\S]+?)>/igm,"");
			return F.unescape(ret);
		},
		"escape":function(src){
			src=src||"";
			var ret = src.replace(/&/igm,"&amp;");
			ret = ret.replace(/>/igm,"&gt;");
			ret = ret.replace(/</igm,"&lt;");
			ret = ret.replace(/ /igm,"&nbsp;");
			ret = ret.replace(/\"/igm,"&quot;");
			ret = ret.replace(/\u00a9/igm,"&copy;");
			ret = ret.replace(/\u00ae/igm,"&reg;");
			ret = ret.replace(/\u00b1/igm,"&plusmn;");
			ret = ret.replace(/\u00d7/igm,"&times;");
			ret = ret.replace(/\u00a7/igm,"&sect;");
			ret = ret.replace(/\u00a2/igm,"&cent;");
			ret = ret.replace(/\u00a5/igm,"&yen;");
			ret = ret.replace(/\u2022/igm,"&middot;");
			ret = ret.replace(/\u20ac/igm,"&euro;");
			ret = ret.replace(/\u00a3/igm,"&pound;");
			ret = ret.replace(/\u2122/igm,"&trade;");
			return ret
		},
		"unescape":function(html){
			var ret = html.replace(/&amp;/igm,"&");
			ret = ret.replace(/&gt;/igm,">");
			ret = ret.replace(/&lt;/igm,"<");
			ret = ret.replace(/&nbsp;/igm," ");
			ret = ret.replace(/&quot;/igm,"\"");
			ret = ret.replace(/&copy;/igm,"\u00a9");
			ret = ret.replace(/&reg;/igm,"\u00ae");
			ret = ret.replace(/&plusmn;/igm,"\u00b1");
			ret = ret.replace(/&times;/igm,"\u00d7");
			ret = ret.replace(/&sect;/igm,"\u00a7");
			ret = ret.replace(/&cent;/igm,"\u00a2");
			ret = ret.replace(/&yen;/igm,"\u00a5");
			ret = ret.replace(/&middot;/igm,"\u2022");
			ret = ret.replace(/&euro;/igm,"\u20ac");
			ret = ret.replace(/&pound;/igm,"\u00a3");
			ret = ret.replace(/&trade;/igm,"\u2122");
			return ret;
		},
		"copy":function(txt){
			if (window.clipboardData) {
				window.clipboardData.clearData();
				window.clipboardData.setData("Text", txt);
			}
			else if (navigator.userAgent.indexOf("Opera") != -1) {
				window.location = txt;
			}
			else if (window.netscape) {
				try {
					netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect");
				}
				catch (e) {
					alert("您的firefox安全限制限制您进行剪贴板操作，请打开’about:config’将signed.applets.codebase_principal_support’设置为true’之后重试，相对路径为firefox根目录/greprefs/all.js");
					return false;
				}
				var clip = Components.classes['@mozilla.org/widget/clipboard;1'].createInstance(Components.interfaces.nsIClipboard);
				if (!clip) return;
				var trans = Components.classes['@mozilla.org/widget/transferable;1'].createInstance(Components.interfaces.nsITransferable);
				if (!trans) return;
				trans.addDataFlavor('text/unicode');
				var str = new Object();
				var len = new Object();
				var str = Components.classes["@mozilla.org/supports-string;1"].createInstance(Components.interfaces.nsISupportsString);
				var copytext = txt; str.data = copytext;
				trans.setTransferData("text/unicode", str, copytext.length * 2);
				var clipid = Components.interfaces.nsIClipboard;
				if (!clip) return false;
				clip.setData(trans, null, clipid.kGlobalClipboard);
			}	
		},
		"encode":function(val){return encodeURIComponent(val||"").replace(/\+/,"%2B");},
		"decode":function(val){return decodeURIComponent(val||"");},
		"mask":function(color,opacity){
			color=color||"#000";
			opacity = opacity || 0.7;
			var mask=null;
			if(!document.getElementById("F-MASK-DIV-1")){
				mask = document.createElement("div");
				mask.id="F-MASK-DIV-1";
				document.body.appendChild(mask);
			}else{
				mask = document.getElementById("F-MASK-DIV-1");
			}
			if(mask==null)return;
			F(mask).css({"z-index":999,"background-color":color,"position":"absolute","display":"block"});
			F(mask).css("opacity",opacity);
			F(window).scroll(F.showMask).resize(F.showMask);
			return F;
		},
		"showMask":function(){
			var pos = F.rectangle();
			F("#F-MASK-DIV-1").css({"left":"0","top":"0","width":(pos.left+pos.width)+"px","height":(pos.top+pos.height)+"px"});
			return F
		},
		"closeMask":function(){
			F("#F-MASK-DIV-1").css("display","none");
			return F
		},
		"removeMask":function(){
			document.body.removeChild(document.getElementById("F-MASK-DIV-1"));
			return F;
		},
		"join":function(opt1,opt2){
			opt1 = opt1 ||{};
			opt2 = opt2||{};
			for(var i in opt2){
				opt1[i]=opt2[i];	
			}
			return opt1;
		},
		"newMask" : function(id, color,opacity){
			if(!window.maskid)window.maskid=0;
			if(!window.maskindex)window.maskindex=997;
			if(!window.masks)window.masks={};
			window.maskid++;
			window.maskindex += 2;
			var _color=color||"#000";
			var _opacity = opacity || 0.7;
			var _node = null
			var mask={id:"F-MASK-DIV-" + window.maskid, index:window.maskindex};
			window.masks[mask.id] = mask;
			if(!document.getElementById(mask.id)){
				_node = document.createElement("div");
				document.body.appendChild(_node);
			}else{
				_node = document.getElementById(mask.id);
			}
			if(!_node)return;
			F(_node).css({"z-index": mask.index,"background-color":_color,"position":"absolute","display":"block"});
			F(_node).css("opacity",_opacity);
			mask.show = function(){
				var pos = F.rectangle();
				F(_node).css({"left":"0","top":"0","width":(pos.left+pos.width)+"px","height":(pos.top+pos.height)+"px"});
			};
			mask.close = function(){
				F(_node).css("display","none");
				document.body.removeChild(_node);
			};
			F(window).scroll(mask.show).resize(mask.show);
			return mask;
		}
	});
	F.extend({
		"rectangle":function(){
			var body = document.body, 
			html = document.documentElement, 
			clientTop = html.clientTop || body.clientTop || 0, 
			clientLeft = html.clientLeft || body.clientLeft || 0, 
			top = (self.pageYOffset || html.scrollTop || body.scrollTop ) - clientTop, 
			left = (self.pageXOffset || html.scrollLeft || body.scrollLeft) - clientTop;
			return { "top": top, "left": left,"width": window.innerWidth||document.documentElement.clientWidth, "height": window.innerHeight||document.documentElement.clientHeight }; 
		}
	});
	F.fn.extend({
		"check":function(val){
			if(val!==false)val=true;
			this.checked=val;
		},
		"lazyLoad":function(opt){
			opt=opt||{replaceHolder:"",offset:0};
			opt.offset = opt.offset||0;
			opt.replaceHolder = opt.replaceHolder||"";
			var rectangle=F.rectangle();
			if(this.complete)return;
			var self__ = F(this);
			if(self__.position().top-rectangle.top-rectangle.height>(opt.offset||0)){
				self__.attr("src__",self__.attr("src"));
				self__.attr("src",opt.replaceHolder);
				self__.attr("loaded","false");
			}else{
				self__.attr("loaded","true");
			}
			F(window).scroll((function(opt,self){return function(){
				var rectangle=F.rectangle();
				var self_=F(self);
				if(self_.attr("loaded")=="false" && self_.position().top-rectangle.top-rectangle.height<=(opt.offset||0)){
					self_.attr("src",self_.attr("src__"));
					self_.attr("loaded","true");
				}	  
			}})(opt,this));
		},
		"isInView":function(offset){
			var rectangle=F.rectangle();
			return F(this).position().top-rectangle.top-rectangle.height<=(offset||0);
		},
		"copy":function(){
			try{
				F.copy(F(this).text());
			}catch(ex){}
		},
		"dialog":function(opt,ext){
			if(!F.dialogOptionCache)F.dialogOptionCache={};
			if(!F.dialogOptionzIndex)F.dialogOptionzIndex=998;
			if(!F.dialogOptionOpenedCount)F.dialogOptionOpenedCount=0;
			var optC=null;
			if(F(this).hasAttr("modialog") && F(this).attr("modialog")!=""){
				optC = F.dialogOptionCache[F(this).attr("modialog")];
			}
			if(opt!=undefined && typeof opt!="object"){
				if(F(this).attr("modialog")!=""){
					var did = F(this).attr("modialog");
					if(!optC)return F(this);
					if(opt=="close"){
						if(optC.beforeClose && (typeof optC.beforeClose=="function") && optC.beforeClose.apply(this,[])===false)return F(this);
						F("#"+ did).css({"display":"none"});
						if(optC.maskid)window.masks[optC.maskid].close();
					}else if(opt=="open"){
						try{
							F(this).dialog("close");
						}catch(ex){}
						if(optC.mask && optC.mask==true){
							var mask = F.newMask();
							mask.show();
							optC.maskid = mask.id;
							if(F.browser.google)window.scrollBy(0,-1);
							F("#"+ did).css({"z-index": mask.index+1});
						}
						F("#"+ did).css({"display":"block"});
						F("#"+ did).get(0).focus();
						if(optC.afterOpen && (typeof optC.afterOpen=="function"))optC.afterOpen.apply(this,[]);
					}else if(opt=="title" && ext){
						F(this).attr("title",ext);
						F("#"+did+" .mo-dialog-title").html(ext);
					}else if(opt=="content" && ext){
						F(this).html(ext);
					}else if(opt=="destroy"){
						F(this).dialog("close");
						document.body.removeChild(document.getElementById(did));
						var repnode = document.getElementById("mo-dialog-"+did);
						repnode.parentNode.replaceChild(optC.origin,repnode);
						delete(F.dialogOptionCache[did]);
					}
				}
				return F(this);
			}
			var self=this;
			var rangle = F.rectangle(),left,top;
			var optsrc=opt||{};
			opt=F.join(optC||{
				width:450,
				height:100,
				maxHeight:400,
				mask:true
			},optsrc);
			if(opt.height>opt.maxHeight)opt.maxHeight=opt.height+30;
			F.dialogOptionzIndex+=2;
			opt.zindex =F.dialogOptionzIndex;
			if(optsrc.title)F(this).attr("title",optsrc.title);
			if(optsrc.content)F(this).html(optsrc.content);
			if(opt.left){
				left = opt.left+rangle.left;
			}else{
				left = rangle.left+parseInt((rangle.width-opt.width)/2);
			}
			if(opt.top){
				top = opt.top+rangle.top;
			}else{
				top = rangle.top+parseInt((rangle.height-opt.height)/2);
			}
			var id=F(this).attr("modialog");
			if(!id || id==""){
				opt.origin=this.cloneNode(true);
				id="F" + (Math.random()+"").substr(2);
				F(this).attr("modialog",id);
				var dialog = document.createElement("div");
				dialog.id=id;
				dialog.className="mo-dialog-box mo-dialog-box-radius";
				dialog.innerHTML="<div class=\"mo-dialog-title-container mo-dialog-box-radius-top\"><span class=\"mo-dialog-button-close\">&nbsp;</span><span class=\"mo-dialog-title\"></span></div><div class=\"mo-dialog-content-container\"><div class=\"mo-dialog-content\"></div></div><div class=\"mo-dialog-buttons\"><div class=\"mo-dialog-buttonsset\"></div></div>";
				document.body.appendChild(dialog);
				F(dialog).keypress(function(e){if(e.which==27)F("div[modialog='"+this.id+"']").dialog("close");});
				F(dialog).drag("#"+id +" .mo-dialog-title-container");
				F("#"+id+" .mo-dialog-content").append(this.cloneNode(true));
				self = F("#"+id+" .mo-dialog-content>div[modialog='" + id + "']").get(0);
				self.style.display="block";
				var newNode = this.cloneNode(false);
				newNode.id="mo-dialog-" + id;
				this.parentNode.replaceChild(newNode,this)
			}
			F.dialogOptionCache[id] = opt;
			if (opt.showClose === false) F("#" + id + " .mo-dialog-button-close").css({display:"none"});
			else F("#" + id + " .mo-dialog-button-close").css({ display: "block" });

			if (opt.showTitle === false) F("#" + id + " .mo-dialog-title-container").css({ display: "none" });
			else F("#" + id + " .mo-dialog-title-container").css({ display: "block" });

			F("#"+id).css({"z-index":opt.zindex,"width":opt.width + "px","height" :"auto" ,"position" : "absolute","left": left + "px","top" : top + "px","display":"none"});
			F("#"+id+" .mo-dialog-buttons").css("display","block");
			F("#"+id+" .mo-dialog-title").html(F(self).attr("title"));
			F("#"+id+" .mo-dialog-button-close").unbind("click").click((function(id){return function(){F("[modialog='" + id + "']").dialog("close");}})(id));
			if(opt.buttons!==undefined){
				F("#"+id+" .mo-dialog-button-self").remove();
				F("#"+id+" .mo-dialog-button-self-hui").remove();
				if(opt.buttons && typeof opt.buttons=="object"){
					F("#"+id+" .mo-dialog-buttons").css({"display":"block"});
					var j = 0, _fn;
					for (var i in opt.buttons) {
					    _fn = opt.buttons[i];
					    if (typeof _fn == "function") {
							var txt = i, clsname = '', idx = i.lastIndexOf('.');
							if(idx>0 && i.substr(idx-1, 1) != "\\") {
								clsname = i.substr(idx + 1);
								i = i.substr(0, idx);
							}
							j++;
							if(i=='关闭'||i.indexOf('删除')>-1){
								F("#"+id+" .mo-dialog-buttonsset").append("<button class=\"mo-dialog-button-self-hui mo-dialog-box-radius-5 mo-dialog-button-self-" + j + "" + (clsname ? ' ' + clsname : '') + "\">" + i +"</button>");
							}else{
								F("#"+id+" .mo-dialog-buttonsset").append("<button class=\"mo-dialog-button-self mo-dialog-box-radius-5 mo-dialog-button-self-" + j + "" + (clsname ? ' ' + clsname : '') + "\">" + i +"</button>");	
							}
							F("#" + id + " .mo-dialog-button-self-" + j).click((function (opt, self, fn) { return function () { var result = fn.apply(self, [opt]); if (result !== false) F(self).dialog("close"); } })(opt, self, _fn));
						}
					}
				}else if(opt.buttons===null){
					F("#"+id+" .mo-dialog-buttons").css({"display":"none"});
				}
			}
			F(self).dialog("open");
			return F(self);
		},
		"drag":function(source, offSetX, offSetY){
			if(!source)return;
			source = F(source);
			var target = this;
			var x0 = 0, y0 = 0, x1 = 0, y1 = 0, moveable = false, NS = (navigator.appName == 'Netscape');
			offSetX = typeof offSetX == "undefined" ? 0 : offSetX;
			offSetY = typeof offSetY == "undefined" ? 0 : offSetY;
			source.mousedown(function(e){
				if(e.which == 1)  {
					if(!NS){
						this.setCapture()
					}
					x0 = e.pageX ;  
					y0 = e.pageY ; 
					var ps = F(target).position();
					x1 = parseInt(ps.left);  
					y1 = parseInt(ps.top);    
					moveable = true;
				}  
			});   
			source.mousemove(function(e){
				if(e.which == 1 && moveable){  
					if(Math.abs(e.pageX - x0)>3 || Math.abs(e.pageY - y0)>3){
						target.style.left = (x1 + e.pageX - x0 - offSetX) + "px";  
						target.style.top  = (y1 + e.pageY - y0 - offSetY) + "px";  
					}
					this.style.cursor="move";
				}  
			});  
			source.mouseup(function (e){
				if(e.which == 1 && moveable)  {
					if(!NS){
						this.releaseCapture();
					}
					moveable = false;  
					this.style.cursor="default";
				}  
			});
		}
	});
})(F);;
(function(F) {
	var Ajax = F.ajax = window.Ajax = function(opt) {
			opt = Ajax.Extend(Ajax.Setting, opt ? opt : {});
			if (opt.form && (opt.form.nodeName.toLowerCase() == "form")) {
				Ajax.postf(opt)
			} else {
				Ajax.Do(opt)
			}
		};
	Ajax.Setting = {
		asc: true,
		url: "",
		dataType: "text",
		method: "GET",
		data: "",
		form: null,
		timeout: 10000,
		isTimeout: false,
		charset: "utf-8",
		username: "",
		userpwd: "",
		headers:{},
		nocache:true,
		succeed: function(a, b, c) {
			return true
		},
		error: function(a, b, c) {
			return true
		},
		ontimeout: function(a) {
			return true
		},
		beforesend: function(a) {
			return true
		},
		complete : function(){
			return true;
		}
	};
	Ajax.response = function(a, s) {
		if (a.readyState == 4) {
			s.complete.call(s, this);
			if (a.status == 200) {
				var t = s.dataType.toLowerCase();
				if (t == "text") {
					s.succeed.apply(this, [a.responseText, a])
				}
				if (t == "textp") {
					s.succeed.apply(this, [a.responseText, a]);
					var __regexp = /<script(.*?)>([\s\S]*?)<\/script>/igm;
					var __jotemp = __regexp.exec(a.responseText);
					while (__jotemp) {
						eval(__jotemp[2]);
						__jotemp = __regexp.exec(a.responseText)
					}
				}
				if (t == "xml") {
					try {
						try {
							var Dom = new ActiveXObject("MSXML2.DomDocument")
						} catch (ex) {
							var Dom = document.implementation.createDocument("", "", null)
						}
						Dom.loadXML(a.responseText);
						s.succeed.apply(this, [Dom, a])
					} catch (ex) {
						s.succeed.apply(this, [null, a])
					}
				}
				if (t == "json") {
					var j = null;
					try {
						j = (new Function("return " + a.responseText + ";"))();
					} catch (ex) {}
					s.succeed.apply(this, [j, a])
				}
				if (t == "jsonp") {
					(new Function(s.jsonp + "(" + a.responseText + ");"))();
				}
				a = null
			} else {
				s.error.apply(this, [a.status, a]);
				a = null
			}
		}
	};
	Ajax.Do = function(options) {
		var settings = options;
		var isTimeout = false;
		var s = settings;
		s.method = s.method.toUpperCase();
		s.charset = s.charset.toLowerCase();
		try {
			var a = Ajax.GetObj();
			var u = s.url;
			var b = u.indexOf("?") == -1;
			var d = null,_d = "";
			if (typeof s.data == "object") {
				_d = Ajax.SerializJson(s.data,s.charset)
			} else {
				_d = s.data
			}
			if (s.method == "GET" && _d!="") {
				u = u+(b ? "?" : "&") + _d
			}
			if (s.method == "POST" && _d!="") {
				d = _d
			}
			s.beforesend.apply(s, [a]);
			if (s.username && s.username != "") {
				a.open(s.method, u, s.asc, s.username, s.userpwd)
			} else {
				a.open(s.method, u, s.asc)
			}
			if (s.method == "POST") {
				if(!s.headers.hasOwnProperty("Content-Type"))s.headers["Content-Type"]="application/x-www-form-urlencoded";
			}
			if (s.method == "GET" && s.nocache) {
				s.headers["If-Modified-Since"] = 0;
				s.headers["Cache-Control"] = "no-cache";
			}
			for(var h in s.headers){
				if(!s.headers.hasOwnProperty(h))continue;
				a.setRequestHeader(h, s.headers[h]);
			}
			if (s.asc) {
				a.onreadystatechange = function() {
					if (s.isTimeout && s.readyState <= 3) {
						s.ontimeout.apply(s, [a]);
						a.abort();
						a = null;
						return
					}
					Ajax.response.apply(s, [a, s])
				}
			}
			a.send(d);
			if (s.asc) {
				window.setTimeout(function() {
					s.isTimeout = true
				}, s.timeout);
				return
			}
			Ajax.response.apply(s, [a, s])
		} catch (ex) {
			s.complete.call(s, a);
			s.error.apply(s, [ex.description, null, s])
		}
	};
	Ajax.GetObj = function() {
		var b = null;
		if (window.XMLHttpRequest) {
			b = new XMLHttpRequest();
			Ajax.GetObj = function() {
				return new XMLHttpRequest()
			}
		} else {
			if (window.ActiveXObject) {
				var httplist = ["MSXML2.XMLHttp.3.0", "MSXML2.XMLHttp", "Microsoft.XMLHttp", "MSXML2.XMLHttp.5.0", "MSXML2.XMLHttp.4.0"];
				for (var i = httplist.length - 1; i >= 0; i--) {
					try {
						Ajax.GetObj = (function(obj) {
							return function() {
								return new ActiveXObject(obj)
							}
						})(httplist[i]);
						b = Ajax.GetObj()
					} catch (ex) {}
				}
			}
		}
		return b
	};
	Ajax.Rnd = function() {
		return Math.random().toString().substr(2)
	};
	Ajax.Extend = function(a, b) {
		var c = {};
		for (var m in a) {
			c[m] = a[m]
		}
		for (var m in b) {
			c[m] = b[m]
		}
		return c
	};
	Ajax.get = function(url, data, fn) {
		var setting = {};
		setting.url = url;
		setting.data = data;
		setting.succeed = fn;
		Ajax(setting)
	};
	Ajax.post = function(url, data, fn) {
		var setting = {};
		setting.url = url;
		setting.data = data;
		setting.succeed = fn;
		setting.method = "post";
		Ajax(setting)
	};
	Ajax.SerializeJson = Ajax.SerializJson = function (json, charset) {
		if (typeof json != "object") {
			return ""
		}
		Ajax.encode.fn = Ajax.encode.gb;
		if (charset == "utf-8") Ajax.encode.fn = Ajax.encode.utf8;
		var _temp = [];
		for (var i in json) {
		    if (!json.hasOwnProperty(i)) continue;
			_temp.push(Ajax.encode.fn("" + i + "") + "=" + Ajax.encode.fn("" + json[i] + ""));
		}
		return _temp.join('&');
	};
	Ajax.Serialize2Object = function (nodes) {
	    var data = {};
	    for (var i = 0; i < nodes.length; i++) {
	        if (!nodes[i].name || (Ajax.encode.trim(nodes[i].name) == "")) {
	            continue
	        }
	        var node_name = Ajax.encode.trim(nodes[i].name);
	        var node_value = nodes[i].value;
	        var isBox = (nodes[i].type.toLowerCase() == "checkbox") || (nodes[i].type.toLowerCase() == "radio");
	        if (isBox) {
	            if (nodes[i].checked !== true) node_value = null;
	        } else if (nodes[i].nodeName.toLowerCase() == "select") {
	            var l = "";
	            for (var j = 0; j < nodes[i].length; j++) {
	                if (nodes[i].options[j].selected) {
	                    l += nodes[i].options[j].value + ",";
	                }
	            }
	            if (l != "") l = l.substr(0, l.length - 1);
	            node_value = l;
	        }
	        if (node_value !== null) {
	            if (data.hasOwnProperty(node_name)) {
	                if (typeof data[node_name] == 'string') data[node_name] = [data[node_name]];
	                else data[node_name].push(node_value);
	            } else {
	                data[node_name] = node_value;
	            }
	        }
	    }
	    return data;
	};
	Ajax.Serialize = Ajax.Serializ = function (nodes, charset) {
		charset = charset.toLowerCase();
		return Ajax.SerializJson(Ajax.Serialize2Object(nodes), charset);
	};
	Ajax.postf = function(setting) {
		setting = Ajax.Extend(Ajax.Setting, setting);
		frm = setting.form;
		if (frm.nodeName.toLowerCase() != "form" || frm.action == "") {
			return false
		}
		setting.method = "POST";
		if (frm.method.toLowerCase() != "post") {
			setting.method = "GET"
		}
		setting.url = frm.action;
		var data = "";
		data = Ajax.Serializ(frm, setting.charset);		
		setting.data = data;
		Ajax.Do(setting);
		return false
	};
	Ajax.encode = {
		gb: function(str) {
			return escape(str || "")
		},
		utf8: function(str) {
			return encodeURIComponent(str || "").replace(/\+/igm, "%2B").replace(/\%([0-9a-zA-Z]{2})/igm, function(s) {
				return s.toLowerCase()
			})
		},
		unUtf8: function(str) {
			return decodeURIComponent(str || "")
		},
		trim: function(str) {
			return (str || "").replace(/^(\s+)|(\s+)$/igm, "")
		},
		fn:null
	}
})(F || {});;
function iframe_create_hidden(id, name) {
    var frm = document.createElement('iframe');
    id && (frm.id = id);
    name && (frm.name = name);
    frm.frameBorder = 0;
    frm.frameSpacing = 0;
    frm.width = 0;
    frm.height = 0;
    frm.src = 'about:blank';
    document.body.appendChild(frm);
    return frm;
}
function iframe_bind(frm, callback) {
    if (frm.addEventListener) {
        frm.addEventListener("load", callback, false);
    } else if (frm.attachEvent) {
        frm.attachEvent("onload", callback);
    } else {
        frm.onload = callback;
    }
}
function iframe_bind_json(frm, callback, context) {
    function on_load() {
        var body = (frm.contentWindow ? frm.contentWindow : frm.contentDocument).document.body;
        var json = (body.innerText) ? body.innerText : ((body.textContent) ? body.textContent : null);
        try {
            callback.call(context, (typeof JSON.parse !== 'undefined') ? JSON.parse(json) : (new Function('return ' + json + ';'))());
        } catch (ex) {
            console.log(ex);
        }
    }
    iframe_bind(frm, on_load);
}
function SSOLogin(callback, fn) {
    var frm = iframe_create_hidden();
    iframe_bind_json(frm, fn || function (res) {
        if (!res.error && !res.message) {
            window.location.reload();
        }
    });
    frm.src = 'https://www.eb.com.cn/www2/?m=Sync&a=Login&callback=' + encodeURIComponent(callback);
}
function SSOLogout(callback, fn) {
    var frm = iframe_create_hidden();
    iframe_bind_json(frm, fn || function (res) {
        if (!res.error && !res.message) {
            window.location = '/';
        }
    });
    frm.src = 'https://www.eb.com.cn/www2/?m=Sync&a=Logout&callback=' + encodeURIComponent(callback);
};
