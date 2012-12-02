module('plugin/webapp/toolbar', {
	setup: function() {
		$container = $('<div class="ui-toolbar-container" style="position:absolute;left:0;top:0;right:0;"></div>').appendTo(document.body);
	},
	teardown: function() {
		$container.remove();
	}
});

test("el(zepto)", function() {
	expect(14);
	stop();
	ua.loadcss(["reset.css", "webapp/toolbar/toolbar.css"], function() {
		setTimeout(function() {
			var toolbar = $.ui.toolbar($('<div class="ui-toolbar"></div>'), {
			 });
			equals(toolbar._el.css("display"), "block", "The toolbar shows");
			equals(toolbar._data.titleText, "标题", "The _data titleText is right");
			equals(toolbar._data.buttonText, "返回", "The _data buttonText is right");
			equals(toolbar._data.container, undefined, "The _data container is right");
			equals(toolbar._data.tools, undefined, "The _data tools is right");
			
			equals(toolbar._el.parent().attr("tagName").toLowerCase(), "body", "The container is body");
			equals(toolbar._el.attr("class"), "ui-toolbar-container", "The el class is right");
			
			equals(toolbar._el.offset().left, $("body").offset().left, "The left is right");
			equals(toolbar._el.offset().top, $(".ui-toolbar").offset().top, "The top is right");
			equals(toolbar._el.offset().width, $("body").offset().width, "The width is right");
			equals(toolbar._el.offset().height, 45, "The width is right");
			
			equals(toolbar._el.find(".ui-toolbar-backbtn").text(), "返回", "The buttonText is right");
			equals(toolbar._el.find(".ui-toolbar-title").text(), "标题", "The titleText is right");
			equals(toolbar._el.find(".ui-toolbar-toolscon").children().length, 0 , "The tools are right");
			
			toolbar.destroy();
			start();
		}, 100);
	});
});

test("el(selector)", function(){
	expect(2);
	var div = document.createElement("div");
	$(div).attr("id", "test");
	document.body.appendChild(div);
	div = document.createElement("div");
	$(div).attr("class", "ui-toolbar");
	$("#test").append(div);
	var toolbar = $.ui.toolbar('.ui-toolbar', {
	 });
	equals(toolbar._el.attr("class"), "ui-toolbar", "The el class is right");
	equals(toolbar._el.parent().attr("id"), "test", "The container is right");
	toolbar.destroy();
	$("#test").remove();
});

test("container & cls", function(){
	expect(2);
	var div = document.createElement("div");
	$(div).attr("class", "container");
	document.body.appendChild(div);
	var toolbar = $.ui.toolbar({
		 container: '.container',
		 cls: 'myclass'
	 });
	equals(toolbar._el.parent().attr("class"), "container", "The container is right");
	equals(toolbar._el.attr("class"), "ui-toolbar myclass", "The el class is right");
	toolbar.destroy();
	$(".container").remove();
});

test("full setup", function() {
	expect(15);
	$container.html('<div id="toolbar" class="ui-toolbar" data-mode="true">\
		<div class="ui-toolbar-view">\
        	<a class="ui-toolbar-backbtn"></a>\
			<span class="ui-toolbar-title"></span>\
			<div class="ui-toolbar-toolscon">\
				<button class="ui-button ui-button-text-only fontsize" style="-webkit-tap-highlight-color: rgba(255, 255, 255, 0);">\
					<span class="ui-button-text">click me</span>\
				</button>\
			</div>\
		</div>\
	</div>');
	var toolbar = $('#toolbar').toolbar({
		cls: "cls",
		buttonText: "buttonText",
		titleText: "titleText",
		buttonClick: function(){
			ok(true, "The buttonClick is clicked");
		}
	}).toolbar('this');
	equals(toolbar._el.css("display"), "block", "The toolbar shows");
	equals(toolbar._data.titleText, "titleText", "The _data titleText is right");
	equals(toolbar._data.buttonText, "buttonText", "The _data buttonText is right");
	equals(toolbar._data.container, undefined, "The _data container is right");
	equals(toolbar._data.tools, undefined, "The _data tools is right");
	
	equals(toolbar._el.parent().attr("class"), "ui-toolbar-container", "The container is body");
	equals(toolbar._el.attr("class"), "ui-toolbar cls", "The el class is right");
	
	equals(toolbar._el.offset().left, $("body").offset().left, "The left is right");
	equals(toolbar._el.offset().top, $(".ui-toolbar").offset().top, "The top is right");
	equals(toolbar._el.offset().width, $("body").offset().width, "The width is right");
	equals(toolbar._el.offset().height, 45, "The width is right");
	
	equals(toolbar._el.find(".ui-toolbar-backbtn").text(), "buttonText", "The buttonText is right");
	equals(toolbar._el.find(".ui-toolbar-title").text(), "titleText", "The titleText is right");
	equals(toolbar._el.find(".ui-toolbar-toolscon").children().length, 1 , "The tools are right");
	
	ua.click(toolbar._el.find('.ui-toolbar-backbtn')[0]);
	toolbar.destroy();
});

test("simple setup", function() {
	expect(2);
	$container.html('<div class="ui-toolbar-container">\
		<div id="toolbar">\
			<span>back</span>\
			<h1>测试标题</h1>\
			<a class="recommend">字体</a>\
			<a class="fontsize">选择</a>\
		</div>\
	</div>');
	var toolbar = $('#toolbar').toolbar().toolbar('this');
	
	toolbar.hide();
	ok(!ua.isShown(toolbar._el[0]), "The toolbar hides");
	toolbar.show();
	ok(ua.isShown(toolbar._el[0]), "The toolbar shows");
	toolbar.destroy();
});

test("titleText", function() {
	expect(2);
	var toolbar = $.ui.toolbar({
		titleText: '工具栏标题'
	});
	equals(toolbar._data.titleText, "工具栏标题", "The _data titleText is right");
	equals($(".ui-toolbar-title", toolbar._el).html(), "工具栏标题", "The titleText is right");
	toolbar.destroy();
});

test("buttonText", function() {
	expect(2);
	var toolbar = $.ui.toolbar({
		buttonText: '取消'
	});
	equals(toolbar._data.buttonText, "取消", "The _data buttonText is right");
	equals($(".ui-toolbar-backbtn", toolbar._el).html(), "取消", "The buttonText is right");
	toolbar.destroy();
});

test("buttonClick", function() {
	expect(1);
	var toolbar = $.ui.toolbar({
		container: '.ui-toolbar-container',
		buttonClick: function() {
			ok(true, "The buttonClick is called");
		}
	});
	ua.click($('.ui-toolbar-backbtn', toolbar._el)[0]);
	toolbar.destroy();
});

test("show(), hide(), toggle()", function() {
	expect(4);
	var toolbar = $.ui.toolbar({
		container: '.ui-toolbar-container'
	});
	toolbar.hide();
	equals(toolbar._el.css("display"), "none", "The toolbar hides");
	toolbar.toggle();
	equals(toolbar._el.css("display"), "block", "The toolbar shows");
	toolbar.toggle();
	equals(toolbar._el.css("display"), "none", "The toolbar hides");
	toolbar.show();
	equals(toolbar._el.css("display"), "block", "The toolbar shows");
	toolbar.destroy();
});

test("destroy()", function() {
	expect(3);
	var l1 = ua.eventLength();
	var toolbar = $.ui.toolbar({
		container: '.ui-toolbar-container',
		titleText: '工具栏标题'
	});
	toolbar.destroy();
	var a = 0;
	for(var i in toolbar) a++;
	equals(a, 0, "The obj is cleared");
	equals($container.children().length, 0, "The dom is removed");
	var l2 = ua.eventLength();
	equals(l2, l1, "The events are cleared");
});