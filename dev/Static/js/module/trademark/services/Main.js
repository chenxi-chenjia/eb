/*main scripts for trademark*/

///文件上传回调
function UploadCallBack(file) {
    if (file.error) {
        ShowSimpleDialog(file.msg);
    } else {
        var frmname = "tmfrm";
        if (file["for"].indexOf("gtFileZt") == 0) frmname = "gtform";
        document.forms[frmname][file["for"]].value = file.name;
        $("#btn" + file["for"]).val("已上传文件").addClass("ok");
        F("#uploaddialog").dialog("close");
    }
}

///打开文件上传对话框
function OpenFileUploadDialog(title, field, orderid, _this) {
    if ($(_this).hasClass("ok")) {
        var frmname = "tmfrm";
        if (field.indexOf("gtFileZt") == 0) frmname = "gtform";
        F("#uploaddialog").attr("title", "查看文件").html('<div style="padding:15px;">您已上传相关文件，请继续操作。</div>').dialog({
            height: 300,
            width: 400,
            buttons: {
                "查看文件": function () {
                    window.open("/user/upload/show/" + document.forms[frmname][field].value);
                    return false;
                },
                "删除，重新上传": function () {
                    document.forms[frmname][field].value = "";
                    $("#btn" + field).val("上传资料");
                    $("#btn" + field).removeClass("ok");
                    F("#uploaddialog").dialog("close");
                }
            }
        });
        return;
    }
    $(_this).parent().parent().removeClass("error");
    F("#uploaddialog").attr("title", title).html('<div style="padding:5px 0 20px 0"><div style="color:red;padding:10px 0;">*文件支持pdf,jpg,png,bmp格式，大小不超过1M；</div>'
	+ '<form name="upload" target="hideframe" method="post" action="/user/upload?forfile=' + field + '&orderid=' + orderid + '" enctype="multipart/form-data" style="margin:0px;padding:0px;">'
	+ '选择文件：<input type="file" name="file1" style="width:150px" /></form></div>').dialog({
	    height: 184, width: 450,
	    buttons: {
	        "上传": function () {
	            document.forms['upload'].submit();
	            return false;
	        },
	        "关闭": function () { }
	    }
	});
}

///获取选中的radio的值
function getCheckedValue(selector) {
    var p = "";
    $(selector).each(function () {
        if (this.checked) {
            p = this.value;
        }
    });
    return p;
}
function setCheckedValue(selector, value) {
    $(selector).each(function () {
        if (this.value == value) this.checked = true;
    });
}
///回调
function callback(dataValue) {
    if (dataValue == undefined) {
        return;
    }
    var index = dataValue.indexOf(":");
    if (index > 0) {
        document.forms["tmfrm"][dataValue.substr(0, index)].value = dataValue.substr(index + 1);
    }
}

///显示页面3
function loadpage3() {
    $("#page3 .jiti").hide();
    $("#page7 .audio").hide();
    var p = getCheckedValue("#page3 input[name='tmzcr.tmType']"),
		l = getCheckedValue("#page3 input[name='placeZc']"),
		a = getCheckedValue("#page3 input[name='tmzcr.tmFormType']");
    if (p == "J" || p == "Z") {
        $("#page3 .jiti").show();
        if (p == "Z") {
            $("#page3 .jiti1").hide();
            $("#page3 .zhengming").show();
			
        } else {
            $("#page3 .jiti1").show();
            $("#page3 .zhengming").hide();
        }
        if (l == "yes") $("#page3 .zhengming").show();
    } else {
        $("#page3 .jiti").hide();
    }
    if (a == "0100") $("#page7 .audio").show();
    else $("#page7 .audio").hide();
}

///显示页面4
function loadpage4() {
    //if(!CheckDataVal("#page3")){
    //	ShowSimpleDialog("请填写完整内容。");
    //	return false;
    //}
    $("#page4 .gongtong").hide();
    if (getCheckedValue("#page4 input[name='tmzcr.ifShareTm']") == "1") {
        $("#page4 .gongtong").show();
    } else {
        $("#page4 .gongtong").hide();
    }
}


///更新地区信息到表单
function UpdateappRegionalismId() {
    var p = $("#areaProv").val(), c = $("#areaCity").val(), a = $("#areaCountry").val();
    if (p && c && a) {
        document.forms['tmfrm']['tmzcr.appRegionalismId'].value = a.replace(/^(\s+)/i, "").replace(/(\s+)$/ig, "");
    } else {
        document.forms['tmfrm']['tmzcr.appRegionalismId'].value = "";
    }
}


///校验页面数据
function CheckDataVal(page) {
    return CheckDataVal2(page + " div.table-row:visible");
}


///根据条件，校验数据
function CheckDataVal2(selector) {
    var findError = false;
    function CheckData() {
        if (!this.name) return;
        var _this = $(this), tagname = this.tagName.toLowerCase(), type = this.type;
        if ((tagname == "input" && (type == "hidden" || type == "text")) || tagname == "textarea" || tagname == "select") {
            if (_this.attr("must") !== "false") {
                if (this.value == "") {
                    _this.parent().parent().addClass("error");
                    findError = true;
                } else {
                    _this.parent().parent().removeClass("error");
                }
            }
        }
    };
    $(selector + " div.table-row-content input").each(CheckData);
    $(selector + " div.table-row-content textarea").each(CheckData);
    $(selector + " div.table-row-content select").each(CheckData);
    return !findError;
}

///显示页面2
function before2(index) {
    var frm = document.forms["tmfrm"],
		appTypeId = frm["tmzcr.appTypeId"].value,
		appGjdq = frm["tmzcr.appGjdq"].value,
		area = $(frm["tmzcr.appGjdq"]).find("option:selected").text();
    $("#apptype").html((appTypeId == "100012000000000001" ? "企业单位" : "自然人") + " - " + area);
    $("#page2 .table-row").show();
    if (appGjdq == "100011000000000002" || appGjdq == "100011000000000003" || appGjdq == "100011000000000004" || appGjdq == "100011000000000005") {
        $("#page2 .homeland").hide();
        if (appGjdq == "100011000000000002") {
            $("#page2 .foreigngat .table-row-title span.pex").html("国内");
        } else {
            $("#page2 .foreigngat .table-row-title span.pex").html("大陆");
            $("#page2 .personal.foreigngat").hide();
        }
    } else {
        $("#page2 .foreigngat").hide();
    }
    if (appGjdq != "100011000000000002") $("#page2 .foreign").hide();
    if (appGjdq == "100011000000000001" || appGjdq == "100011000000000002") $("#page2 .gat").hide();
    if (appTypeId == "100012000000000001") {
        $("#page2 .personal").hide();
    } else {
        $("#page2 .expir").hide();
    }
    var p = getCheckedValue("#page2 input[name='fileIsEn']");
    if (p == "0") {
        $("#page2 #fileZtEnName").parent().show();
    } else {
        $("#page2 #fileZtEnName").parent().hide();
    }
}

///显示页面3，同时校验页面2
function before3() {
    UpdateappRegionalismId();
    //if(!CheckDataVal("#page2")){
    //	ShowSimpleDialog("请填写完整内容。");
    //	return false;
    //}
    loadpage3();
}

///显示页面5
function before5() {
    var p = getCheckedValue("#page5 input[name='yx.priorityType']");
    if (p == "0") {
        $("#page5 .table-row.yx").hide();
    } else {
        $("#page5 .table-row.yx").show();
    }
}

///显示页面7
function before10() {
    var p = getCheckedValue("#page4 input[name='isPersonPhoto']");
    if (p == "yes") {
        $("#page7 .table-row.xiaoxiang").show();
    } else {
        $("#page7 .table-row.xiaoxiang").hide();
    }
}
///显示页面3
function before7() {
    var p = getCheckedValue("#page3 input[name='isPersonPhoto']");
    if (p == "yes") {
        $("#page7 .table-row.xiaoxiang").show();
    } else {
        $("#page7 .table-row.xiaoxiang").hide();
    }
}


///省市县三级联动
function getAreaCitys(id, sel) {
    if (id == "") return;
    var items = certSealArea[id]["items"];

    var ele = document.getElementById("areaCountry");
    $(ele).css({ "visibility": "visible" });
    while (ele.lastChild) {
        ele.removeChild(ele.lastChild);
    }

    $(ele).append("<option value=\"\">请选择县、区</option>");
    ele = document.getElementById("areaCity");
    $(ele).css({ "visibility": "visible" });
    while (ele.lastChild) {
        ele.removeChild(ele.lastChild);
    }
    $(ele).append("<option value=\"\">请选择城市</option>");
    for (var i in items) {
        if (!items.hasOwnProperty(i)) continue;
        var name = items[i].name;
        if (Areas[1] == name || Areas[1] == i) {
            $(ele).append("<option value=\"" + i + "\" selected=\"selected\">" + name + "</option>");
        }
        else {
            $(ele).append("<option value=\"" + i + "\">" + name + "</option>");
        }
    }
}
function getAreaCountrys(id, sel) {
    if (id == "") return;
    var items = certSealArea[id.substr(0, 2) + "0000"]["items"][id.substr(0, 4) + "00"]["items"];
    var ele = document.getElementById("areaCountry");
    $(ele).css({ "visibility": "visible" });
    while (ele.lastChild) {
        ele.removeChild(ele.lastChild);
    }
    $(ele).append("<option value=\"\">请选择县、区</option>");
    for (var i in items) {
        if (!items.hasOwnProperty(i)) continue;
        var name = items[i];
        if (Areas[2] == name || Areas[2] == i) {
            $(ele).append("<option value=\"" + i + "\" selected=\"selected\">" + name + "</option>");
        }
        else {
            $(ele).append("<option value=\"" + i + "\">" + name + "</option>");
        }
    }
}

///显示帮助对话框
function ShowHelp(id) {
    var html = $(".tm-help div[data-value='" + id + "']").html();
    ShowSimpleDialog(html, "表单填写帮助说明", 800, 600);
    $("#tmdialog h4").css({ "font-weight": "bold", "font-size": "16px" });
}

///提交表单
function SubmitForm(frm) {

    var frm = frm;
    if (!frm['isgk'] || frm['isgk'].value != 'y') {
        var applyerid = frm["applyerid"].value;
        if (applyerid == "" || applyerid == "0") {
            ShowSimpleDialog("请先选择申请人。");
            $("#page1 .table-row").removeClass("check-tmps-cls");
            return false;
        }

        //if (frm['fileWtName'].value == "") {
        //    ShowSimpleDialog("请上传委托书。");
        //    return false;
        //}
    } else if (frm["isgk"].value == "y") {
        if (frm['tmzcr.appCnName'].value == "") {
            ShowSimpleDialog("请填写联系人名称。");
            return false;
        }
        //if (frm['tmzcr.appCnAddr'].value == "") {
        //    ShowSimpleDialog("请填写联系人电话。");
        //    return false;
        //}
        if (frm['tmzcr.appContactTel'].value == "") {
            ShowSimpleDialog("请填写联系电话。");
            return false;
        }
        if (!/^\d{3}-\d{8}|\d{4}-\{7,8}|1[3,5,7,8]\d{9}$/.test(frm['tmzcr.appContactTel'].value)) {
            ShowSimpleDialog("联系电话格式不正确。");
            return false;
        }
        //if (frm['tmzcr.appContactZip'].value == "") {
        //    ShowSimpleDialog("请填写邮政编码。");
        //    return false;
        //}
        //if (!/^\d{6}$/.test(frm['tmzcr.appContactZip'].value)) {
        //    ShowSimpleDialog("邮政编码格式不正确。");
        //    return false;
        //}
    }
    var trademarkname = frm["tmzcr.name"].value;
    if (trademarkname == "") {
        ShowSimpleDialog("请选填写商标名称。");
        return false;
    }
    
    $("#page2 .table-row").removeClass("check-tmps-cls");


    //校验page3
    $("#page3 .table-row").addClass("check-tmps-cls");
    $("#page3 .jiti").removeClass("check-tmps-cls");
    $("#page3 .audio").removeClass("check-tmps-cls");
    var p = getCheckedValue("#page3 input[name='tmzcr.tmType']"),
		l = getCheckedValue("#page3 input[name='placeZc']"),
		a = getCheckedValue("#page3 input[name='tmzcr.tmFormType']");
    if (p == "J" || p == "Z") {
        $("#page3 .jiti").addClass("check-tmps-cls");
        if (p == "Z") {
            $("#page3 .jiti1").removeClass("check-tmps-cls");
            $("#page3 .zhengming").addClass("check-tmps-cls");
        } else {
            $("#page3 .jiti1").addClass("check-tmps-cls");
            $("#page3 .zhengming").removeClass("check-tmps-cls");
        }
        if (l == "yes") $("#page3 .zhengming").addClass("check-tmps-cls");
    }
    if (a == "0100") {
        if (frm["fileSyName"].value == "") {
            ShowSimpleDialog("请上传声音文件。");
            return false;
        }
    }

    if (!CheckDataVal2("#page3 .table-row.check-tmps-cls")) {
        ShowSimpleDialog("请填写完整的商标声明信息。");
        $("#page3 .table-row").removeClass("check-tmps-cls");
        return false;
    }
    $("#page3 .table-row").removeClass("check-tmps-cls");


    if (document.getElementById("page4")) {
        if (getCheckedValue("#page4 input[name='tmzcr.ifShareTm']") == "1") {
            if (frm['shareapplyerid'].value == "") {
                ShowSimpleDialog("请选择共同申请人。");
                return false;
            }
        }

        if (getCheckedValue("#page5 input[name='yx.priorityType']") != "0") {
            if (frm['yx.priorityBaseCrty'].value == "") {
                ShowSimpleDialog("请填写申请的展出国家/地区。");
                return false;
            }
            if (frm['yx.priorityAppDate'].value == "" || !/^(\d{4})\-(\d{2})\-(\d{2})$/.test(frm['yx.priorityAppDate'].value)) {
                ShowSimpleDialog("请填写正确的申请展出日期。");
                return false;
            }
            if (frm['yx.priorityNum'].value == "") {
                ShowSimpleDialog("请填写优先权声明的申请号。");
                return false;
            }
        }
    }
    if (frm['goodNamearray'].value == "") {
        ShowSimpleDialog("请选择要注册的商品。");
        return false;
    }
    if (getCheckedValue("input[name='isPersonPhoto']") == "yes" && frm['fileTpName'].value == "") {
        ShowSimpleDialog("请上传肖像证明文件。");
        return false;
    }
    if (frm['imageShow1'].value == "") {
        ShowSimpleDialog("请上传图样1。");
        return false;
    }
    if (getCheckedValue("input[name='tmzcr.colourSign']") == "2") {
        if (frm['imageShow2'].value == "") {
            ShowSimpleDialog("请上传图样2。注意：图样1为着色图样，图样2为黑白稿。");
            return false;
        }
    }
    Ajax({
        form: frm,
        dataType: "JSON",
        succeed: function (result) {
            if (result) {
                if (result.error) {
                    ShowSimpleDialog(result.msg);
                } else {
                    window.location = "/user/showorder/" + result.orderid;
                }
            } else {
                ShowSimpleDialog("系统错误，请联系客服处理，<br />非常抱歉由此给您带来的不便。");
            }
        },
        error: function (state) {
            ShowSimpleDialog("系统错误（" + state + "），请联系客服处理，<br />非常抱歉由此给您带来的不便。");
        }
    });
    return false;
}
function SubmitOrderCallBack(result) {
    var orderid = this.orderid;
    if (result) {
        if (result.error) {
            ShowSimpleDialog(result.msg);
        } else {
            F("#tmdialog").attr("title", "订单提交成功").html('<div style="padding:15px;">恭喜，您的订单提交成功！</div>').dialog({
                height: 300, width: 400, buttons: {
                    "查看订单": function () {
                        window.location = "/user/my/" + orderid;
                    },
                    "继续注册商标": function () {
                        window.location = "/form.html";
                    }
                }
            });
        }
    } else {
        ShowSimpleDialog("系统错误，请联系客服处理，<br />非常抱歉由此给您带来的不便。");
    }
}
function SubmitOrder2(orderid) {
    Ajax({
        url: "/user/ordersubmit2/" + orderid,
        dataType: "JSON",
        orderid: orderid,
        succeed: SubmitOrderCallBack,
        error: function (state) {
            ShowSimpleDialog("系统错误（" + state + "），请联系客服处理，<br />非常抱歉由此给您带来的不便。");
        }
    });
}
function SubmitOrder(orderid, cardcode, isfp, isbg) {
    Ajax({
        url: "/user/ordersubmit/" + orderid,
        method: "POST",
        data: "cardcode=" + cardcode + "&isfp=" + (isfp ? "y" : "n") + "&isbg=" + (isbg ? "y" : "n"),
        dataType: "JSON",
        orderid: orderid,
        succeed: SubmitOrderCallBack,
        error: function (state) {
            ShowSimpleDialog("系统错误（" + state + "），请联系客服处理，<br />非常抱歉由此给您带来的不便。");
        }
    });
}
function SaveOrderBeforePay(orderid, isfp, isbg) {
    Ajax({
        url: "/user/ordersubmit/" + orderid,
        method: "POST",
        data: "onlysave=yes&isfp=" + (isfp ? "y" : "n") + "&isbg=" + (isbg ? "y" : "n"),
        dataType: "JSON",
        orderid: orderid,
        succeed: function () { window.location = '/user/my/'; },
        error: function (state) {
            ShowSimpleDialog("系统错误（" + state + "），请联系客服处理，<br />非常抱歉由此给您带来的不便。");
        }
    });
}
///-------------
///共同申请人
///------------
var GTLx = { "000001": "中国大陆", "000002": "中国台湾", "000003": "中国香港", "000004": "中国澳门", "000005": "国外" };
var DwLx = { "000001": "企业单位", "000002": "自然人" };
var SfLx = { "000001": "身份证", "000002": "护照", "000003": "中国香港", "港澳同胞证": "其他" };
function UpdateGTSQR() {
    var str = "", count = 0;
    $("#gtlist li").each(function () {
        var val = $(this).attr("data-value");
        if (val) {
            str += val + "&nbsp;";
            count++;
        }
    });
    if (str != "") str = str.substr(0, str.length - 6);
    $("#gthtml").val(str);
    document.forms['tmfrm']['gtNum'].value = count;
    document.forms['tmfrm']['isgtapp'].value = (count > 0 ? "yes" : "no");
}
function OpenGongtongDialog(obj) {
    var buttons = {};
    var dataValue = $(obj).attr("data-value");
    if (dataValue) {
        var dataValues = dataValue.split("%wsdf;"), format = "({3})<br />申请人证件：{4}({5})";
        if (dataValues[0] != "000005") format = "<br />申请人证件：{4}({5})";
        if (dataValues[1] == "000001") format = "";
        F("#uploaddialog").attr("title", "查看共同申请人").html('<div style="padding:15px;">' +
		F.format('申请人类型：{0}<br />申请人地区：{1}<br />申请人名称：{2}' + format + '<br />证明文件：<a href="/upload/show/{6}" target="_blank">查看</a>', DwLx[dataValues[1]], GTLx[dataValues[0]], dataValues[2], dataValues[3], SfLx[dataValues[4]], dataValues[5], dataValues[6])
		+ '</div>').dialog({
		    height: 400,
		    width: 500,
		    buttons: {
		        "删除": function () {
		            if (window.confirm("确定要删除本共同申请人?")) {
		                $(obj).remove();
		                UpdateGTSQR();
		            } else {
		                return false;
		            }
		        },
		        "关闭": function () { }
		    }
		});
        return;
    }
    lastgtindex++;
    $("#gtFileZtContent").html('<input type="hidden" name="gtFileZt' + lastgtindex + '" id="gtFileZtfile" value=""  />\r\n' +
		'<input class="upload" type="button" value="上传资料" id="btngtFileZt' + lastgtindex + '" onclick="OpenFileUploadDialog(\'主体资格证明文件\',\'gtFileZt' + lastgtindex + '\',orderid, this);" /> ');
    loadgt();
    F("#page8").attr("title", "添加/修改共同申请人信息").dialog({
        height: 460, width: 660, buttons: {
            "添加": function () {
                var frm = document.forms['gtform'];
                if (frm['nameCn'].value == "") {
                    ShowSimpleDialog("请填写主体名称");
                    return false;
                }
                if (frm['gtFileZt' + lastgtindex].value == "") {
                    ShowSimpleDialog("请上传证明文件");
                    return false;
                }
                var li = document.createElement("li");
                $(li).addClass("added")
                    .html(frm['nameCn'].value)
                    .attr("data-value",
                        F.format(
                            "{0}%wsdf;{1}%wsdf;{2}%wsdf;{3}%wsdf;{4}%wsdf;{5}%wsdf;{6}%wsdf;",
                            frm['appGjdq'].value,
                            frm['appTypeId'].value,
                            frm['nameCn'].value,
                            frm['nameEn'].value,
                            frm['cardName'].value,
                            frm['cardId'].value,
                            frm['gtFileZt' + lastgtindex].value
                        ))
                    .click(function () {
                        OpenGongtongDialog(this);
                    });
                frm.reset();
                frm['appGjdq'].selectedIndex = 0;
                frm['appTypeId'].selectedIndex = 0;
                $("#btngtFileZt").val("上传资料").removeClass("ok");
                $("#gtlist").prepend(li);
                UpdateGTSQR();
            }
        }
    });
}
function loadgt() {
    var p = $("select[name='appGjdq']").val(),
		o = $("select[name='appTypeId']").val();
    if (p == "000005") {
        $("#page8 .table-row.foreign").show();
    } else {
        $("#page8 .table-row.foreign").hide();
    }
    if (o == "000001") {
        $("#page8 .table-row.persoanl").hide();
    } else {
        $("#page8 .table-row.persoanl").show();
    }
}

///-------------
///商标产品
///------------

function OpenProductDialog() {
    if (items == null) {
        ShowSimpleDialog("数据加载失败。");
        return;
    }
    LoadTop();
    F("#page9").attr("title", "添加商品").dialog({
        height: 600, width: 950, top: 80,
        buttons: null
    });
}
function LoadTop() {
    var html = "<div class=\"level-3\"><a href=\"javascript:LoadTop();\">[进入] 所有分类</a></div>";
    html += "<div class=\"level-0\">*进入相关分类可查看详细子类；点击已选择的商品可删除商品；</div>";
    $("#p9-classes").html(html);
    var html = "", html2 = "", i = 0;
    for (var i in items) {
        if (!items.hasOwnProperty(i)) continue;
        var item = items[i];
        if (i >= 10) {
            html += ("<li onclick=\"LoadSecondLayer('" + i + "');\"><label>" + i + "</label><a href=\"javascript:void(0);\">" + item.name + "</a></li>");
        } else {
            html2 += ("<li onclick=\"LoadSecondLayer('" + i + "');\"><label>" + i + "</label><a href=\"javascript:void(0);\">" + item.name + "</a></li>");
        }
        i++;
    }
    $("#p9-container").html("<ul class=\"clearfix\">" + html2 + html + "</ul>");
}
function LoadSecondLayer(id) {
    var html = "<div class=\"level-3\"><a href=\"javascript:LoadTop();\">[进入] 所有分类</a></div>";
    html += "<div class=\"direction\"></div><div class=\"level-1\">" + id + "、" + items[id].name + "</div>";
    html += "<div class=\"level-0\">*进入相关分类可查看详细子类；点击已选择的商品可删除商品；</div>";
    $("#p9-classes").html(html);
    html = "<ul class=\"sec clearfix\">";
    var _items = items[id].item;
    for (var i in _items) {
        if (!_items.hasOwnProperty(i)) continue;
        var item = _items[i];
        html += ("<li onclick=\"LoadSecondLayer2('" + id + "','" + i + "');\"><label>" + i + "</label><a href=\"javascript:void(0)\">" + item.name + "</a></li>");
    }
    $("#p9-container").html(html + "</ul>");
}
function LoadSecondLayer2(id, id2) {
    var html = "<div class=\"level-3\"><a href=\"javascript:LoadTop();\">[进入] 所有分类</a></div>";
    html += "<div class=\"direction\"></div><div class=\"level-1\"><a href=\"javascript:LoadSecondLayer('" + id + "');\">[进入] " + id + "、" + items[id].name + "</a></div>";
    html += "<div class=\"direction\"></div><div class=\"level-2\">" + id2 + "、" + items[id].item[id2].name + "</div>";
    html += "<div class=\"level-0\">*进入相关分类可查看详细子类；点击已选择的商品可删除商品；</div>";
    $("#p9-classes").html(html);
    html = "<ul class=\"sec2 clearfix\">";
    var _items = items[id].item[id2].item;
    for (var i = 0; i < _items.length; i++) {
        var item = _items[i];
        html += ("<li onclick=\"SetSelect('" + item[0] + "','" + item[1] + "', '" + item[2] + "','" + id + "','" + id2 + "');\"><label>" + item[1] + "</label>" + item[2] + "</li>");
    }
    $("#p9-container").html(html + "</ul>");
}
function SetSelect(clsid, id, text, p1, p2) {
    var canAdd = true;
    $("#p9-selected span[data-value]").each(function () {
        if ($(this).attr("data-value").substr(0, p1.length) != p1) {
            canAdd = false;
            return false;
        }
    });
    if (!canAdd) {
        alert("对不起，不能添加不同大类的产品，请重新选择。");
        return;
    }
    var tag = p1 + "`" + p2 + "`" + id + "`" + text;
    if ($("#p9-selected span[data-value='" + tag + "']").length == 0) {
        document.forms['tmfrm']['goodNamearray'].value += tag + "&nbsp;"
        //$("#p9-selected").append("<span data-value=\"" + tag + "\" onclick=\"RemoveProduct(this);\">" + id + " " + text + "</span>");
        $("<span data-value=\"" + tag + "\" onclick=\"RemoveProduct(this);\">" + id + " " + text + "</span>").insertBefore($("#p9-selected span:last"));
        $('<tr class="l" data-value="' + tag + '"><td>' + p1 + '</td><td>' + p2 + '</td><td>' + id + '</td><td>' + text + '</td><td><a href="javascript:void(0)" onclick="RemoveProduct(this.parentNode.parentNode)">删除</a></td></tr>').insertAfter($("#pdlist tbody tr.h"));
        $("div.pdcount span").html($("#p9-selected span[data-value]").length);
    }
}
function RemoveProduct(ele) {
    if (window.confirm('确定要删除本商品吗？')) {
        var tags = document.forms['tmfrm']['goodNamearray'], tag = $(ele).attr("data-value");
        $("#pdlist tbody tr[data-value='" + tag + "']").remove();
        $("#p9-selected span[data-value='" + tag + "']").remove();
        $("div.pdcount span").html($("#p9-selected span[data-value]").length);
        tags.value = tags.value.replace(tag + "&nbsp;", "")
    }
}

//列表切换

 $(document).ready(function(){
			$(".chge-nav ul li").click(function(){
			$li=$(".chge-nav ul li");
			$(this).addClass("chose").siblings().removeClass("chose");
			var index=$li.index(this);
			$("div.tab-dd>div").eq(index).show().siblings().hide();
		})
									   
})
 function UploadFile(file, options, callback, beforupload) {
     options = options || { url: '' };
     var new_file = $(file).clone()[0];
     file.parentNode.replaceChild(new_file, file);
     if(options.filter){
	     var filename = file.value;
	     if(filename.indexOf('.')<0){
	         callback({ error: true, msg: '文件格式错误，支持' + options.filter.replace(/\*/g, '').replace(/;/g, '/') + '格式的文件' });
	         return new_file;
	     }
	     options.filter = options.filter.toLowerCase();
	     if(options.filter.substr(options.filter.length-1) != ';') options.filter += ';';
	     var ext = '*'+filename.substr(filename.indexOf('.')).toLowerCase();
	     if(options.filter.indexOf(ext)<0){
	         callback({ error: true, msg: '文件格式错误，支持' + options.filter.replace(/\*/g, '').replace(/;/g, '/') + '格式的文件' });
	         return new_file;
	     }
     }
     var ID = 'Uploader_' + Math.random().toString().substr(2),
         uploader = document.createElement('div');
     uploader.id = ID + '_container';
     uploader.style.display = 'none';
     uploader.innerHTML = '<form action="' + (options.url || '') + '" target="' + ID + '_frame" method="post" enctype="multipart/form-data" id="' + ID + '_form"><iframe name="' + ID + '_frame" id="' + ID + '" width="0" height="0" frameborder="0"></iframe></form>';
     document.body.appendChild(uploader);
     var frm = document.getElementById(ID + '_form');
     frm.appendChild(file);
     if (options.fields) {
         for (var name in options.fields) {
             if (!options.fields.hasOwnProperty(name)) continue;
             var input = document.createElement('input');
             input.type = 'hidden';
             input.name = name;
             input.value = options.fields[name];
             frm.appendChild(input);
         }
     }
     var ifm = document.getElementById(ID),onload = function () {
         var ifrm = document.getElementById(ID);
         var body = (ifrm.contentWindow ? ifrm.contentWindow : ifrm.contentDocument).document.body;
         var json = (body.innerText) ? body.innerText : ((body.textContent) ? body.textContent : null);
         document.body.removeChild(document.getElementById(ID + '_container'));
         if (callback) callback((typeof JSON.parse !== "undefined") ? JSON.parse(json) : eval("(" + json + ")"));
         return false;
     };
     if(ifm.attachEvent){
	     ifm.attachEvent("onload",onload);
     }else{
	     ifm.onload = onload;
     }
     if (beforupload) beforupload(file, options);
     frm.submit();
     return new_file;
 }

 ///打开文件上传对话框
 function OpenFileUploadDialog(title, field, orderid, _this) {
     var frm = _this.form, img = _this.previousSibling;
     var file = UploadFile(_this, {
         url: '/user/upload?forfile=' + field + '&orderid=' + orderid,
         filter : '*.bmp;*.jpg;*.png;'
     }, function (data) {
         img.src = '/Content/images/marquee-upload.png';
         img.nextSibling.title = '请上传文件';
         if (!data) {
             alert('上传失败！');
             return;
         }
         if (data.error) {
             alert(data.msg);
             return;
         }
         frm[field].value = data.name;
         img.src = '/user/upload/show/' + data.name + '?t=' + (+new Date());
         img.nextSibling.title = '已上传文件';
     }, function (file, options) {
         img.src = '/Content/images/loading.gif';
         img.nextSibling.title = '正在上传文件...';
     });
     $(file).hover(function () {
         var last = this.previousSibling;
         if (last.src.indexOf('marquee-upload.png') > 0) last.src = '/Content/Images/marquee-upload-hover.png';
     }, function () {
         var last = this.previousSibling;
         if (last.src.indexOf('marquee-upload-hover.png') > 0) last.src = '/Content/Images/marquee-upload.png';
     });
 }

 function HookUploader(){
    $('div.uploader input.file-input').hover(function () {
	    var last = this.previousSibling;
        if (last.src.indexOf('marquee-upload.png') > 0) last.src = '/Content/Images/marquee-upload-hover.png';
    }, function () {
	    var last = this.previousSibling;
        if (last.src.indexOf('marquee-upload-hover.png') > 0) last.src = '/Content/Images/marquee-upload.png';
    });
    $('div.uploader input.file-input').each(function () {
        var last = this.previousSibling;
        if (last.src.indexOf('Images/marquee-upload') > 0) {
            this.title = '请上传文件';
        } else {
            this.title = '文件已上传';
        }
    });
 }