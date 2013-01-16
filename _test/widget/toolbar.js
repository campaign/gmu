module('plugin/widget/toolbar', {
	setup: function() {
		$container = $('<div class="ui-toolbar-container" style="position:absolute;left:0;top:0;right:0;"></div>').appendTo(document.body);
	},
	teardown: function() {
		$container.remove();
	}
});

test("el(zepto)", function() {
	expect(15);
	stop();
	ua.loadcss(["reset.css", "widget/toolbar/toolbar.css","widget/toolbar/toolbar.default.css"], function() {
		setTimeout(function() {
			var toolbar = $.ui.toolbar($('<div class="ui-toolbar"></div>'), {
			 });
			equals(toolbar._el.css("display"), "block", "The toolbar shows");
			equals(toolbar._data.title, "", "The _data titleis right");
			equals(toolbar._data.backButtonText, "返回", "The _data buttonText is right");
            equals(toolbar._data.backButtonHref, "", "The _data buttonText is right");
			equals(toolbar._data.container, undefined, "The _data container is right");
			equals(toolbar._data.btns, "", "The _data tools is right");
			
			equals(toolbar._el.parent().attr("tagName").toLowerCase(), "body", "The container is body");
			equals(toolbar._el.attr("class"), "ui-toolbar", "The el class is right");
			
			equals(toolbar._el.offset().left, $("body").offset().left, "The left is right");
			equals(toolbar._el.offset().top, $(".ui-toolbar").offset().top, "The top is right");
			equals(toolbar._el.offset().width, $("body").offset().width, "The width is right");
			equals(toolbar._el.offset().height, 42, "The height is right");
			
			equals(toolbar._el.find(".ui-toolbar-backbtn").text(), "返回", "The buttonText is right");
			equals(toolbar._el.find(".ui-toolbar-title").text(), null, "The title is right");
			equals(toolbar._el.find(".ui-toolbar-right").children().length, 0 , "The btns are right");
			
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
	expect(1);
	var div = document.createElement("div");
	$(div).attr("class", "container");
	document.body.appendChild(div);
	var toolbar = $.ui.toolbar({
		 container: '.container'
	 });
	equals(toolbar._el.parent().attr("class"), "container", "The container is right");
	toolbar.destroy();
	$(".container").remove();
});

test("full setup", function() {
	expect(14);
	$container.html('<div id="toolbar" class="ui-toolbar" data-mode="true">\
		<div class="ui-toolbar-wrap">\
        	<div class="ui-toolbar-left"><a class="ui-toolbar-backbtn">首页</a></div>\
			<h2 class="ui-toolbar-title">标题</h2>\
			<div class="ui-toolbar-right">\
				<button class="ui-button ui-button-text-only fontsize" style="-webkit-tap-highlight-color: rgba(255, 255, 255, 0);">\
					<span class="ui-button-text">click me</span>\
				</button>\
			</div>\
		</div>\
	</div>');
	var toolbar = $('#toolbar').toolbar({
		backButtonText: "buttonText",
		title: "titleText",
        backButtonClick: function(){
			ok(true, "The button is clicked");
		}
	}).toolbar('this');
	equals(toolbar._el.css("display"), "block", "The toolbar shows");
	equals(toolbar._data.title, "titleText", "The _data titleText is right");
	equals(toolbar._data.backButtonText, "buttonText", "The _data buttonText is right");
	equals(toolbar._data.container, undefined, "The _data container is right");
	equals(toolbar._data.btns, "", "The _data btns is right");

	equals(toolbar._el.parent().attr("class"), "ui-toolbar-container", "The container is body");
	equals(toolbar._el.attr("class"), "ui-toolbar", "The el class is right");

	equals(toolbar._el.offset().left, $("body").offset().left, "The left is right");
	equals(toolbar._el.offset().top, $(".ui-toolbar").offset().top, "The top is right");
	equals(toolbar._el.offset().width, $("body").offset().width, "The width is right");
	equals(toolbar._el.offset().height, 42, "The height is right");

	equals(toolbar._el.find(".ui-toolbar-backbtn").text(), "首页", "The buttonText is right");
	equals(toolbar._el.find(".ui-toolbar-title").text(), "标题", "The titleText is right");
	equals(toolbar._el.find(".ui-toolbar-right").children().length, 1 , "The tools are right");

	ua.click(toolbar._el.find('.ui-toolbar-backbtn')[0]);
	toolbar.destroy();
});

test("simple setup", function() {
	expect(2);
	$container.html('<div id="toolbar">\
			<span>back</span>\
			<h1>测试标题</h1>\
			<a>字体</a>\
			<a>选择</a>\
		</div>');
	var toolbar = $('#toolbar').toolbar('this');
	toolbar.hide();
	ok(!ua.isShown(toolbar._el[0]), "The toolbar hides");
	toolbar.show();
	ok(ua.isShown(toolbar._el[0]), "The toolbar shows");
	toolbar.destroy();
});

test("title", function() {
	expect(2);
	var toolbar = $.ui.toolbar({
		title: '工具栏标题'
	});
	equals(toolbar._data.title, "工具栏标题", "The _data titleText is right");
	equals($(".ui-toolbar-title", toolbar._el).html(), "工具栏标题", "The titleText is right");
	toolbar.destroy();
});

test("buttonText", function() {
	expect(2);
	var toolbar = $.ui.toolbar({
        backButtonText: '取消'
	});
	equals(toolbar._data.backButtonText, "取消", "The _data buttonText is right");
	equals($(".ui-toolbar-backbtn", toolbar._el).html(), "取消", "The buttonText is right");
	toolbar.destroy();
});

test("buttonClick", function() {
	expect(1);
	var toolbar = $.ui.toolbar({
		container: '.ui-toolbar-container',
        backButtonClick: function() {
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
test('window scroll(fix)', function() {
    expect(16);
    stop();
    var w = window.top;
    ua.loadcss(["reset.css", "widget/toolbar/toolbar.css", "widget/toolbar/toolbar.default.css"], function(){
        var s2 = w.document.createElement("script");
        s2.src = "../../../_test/fet/bin/import.php?f=core/zepto.ui,core/zepto.extend,core/zepto.fix,core/zepto.highlight,core/zepto.iscroll,core/zepto.ui,widget/toolbar";
        w.document.head.appendChild(s2);
        s2.onload = function(){
            var html = "";
            for(var i = 0; i < 80; i++){
                html += "<br />";
            }
            w.$("body").append(html);
            w.scrollTo(0, 200);
            setTimeout(function(){
                var toolbar = w.$.ui.toolbar();
                toolbar.root().fix({top:0, left:0});
                equals(toolbar._el.css("display"), "block", "The toolbar is show");
                equals(toolbar._el.width() , document.body.offsetWidth , "the width is ok");
                equals(toolbar._el.height() , 42 , "the height is ok");
                approximateEqual(toolbar._el.offset().left, 0,'the pos is right');
                equals(toolbar._el.offset(true).top, 0, 'the pos is right');
                w.scrollTo(0, 300);
                ta.scrollStop(w.document);
                setTimeout(function(){
                    equals(toolbar._el.css("display"), "block", "The toolbar is show");
                    equals(toolbar._el.width() , document.body.offsetWidth , "the width is ok");
                    equals(toolbar._el.height() , 42 , "the height is ok");
                    ok(Math.abs(w.pageYOffset - 300) <= 1, "The pageYOffset is " + w.pageYOffset);
                    equals(toolbar._el.offset().top-300,0, 'the pos is right');
                    approximateEqual(toolbar._el.offset().left, 0,'the pos is right');
                    w.scrollTo(0,0);
                    ta.scrollStop(w.document);
                    setTimeout(function(){
                        equals(toolbar._el.css("display"), "block", "The toolbar is show");
                        equals(toolbar._el.width() , document.body.offsetWidth , "the width is ok");
                        equals(toolbar._el.height() , 42 , "the height is ok");
                        equals(toolbar._el.offset().top, 0, 'the pos is right');
                        approximateEqual(toolbar._el.offset().left, 0,'the pos is right');
                        w.$("br").remove();
                        toolbar.destroy();
                        $(s2).remove();
                        start();
                    },200);
                },200);
            }, 200);
        };
    }, w);
});
test('useFix', function() {
    expect(11);
    stop();
    var w = window.top;
    ua.loadcss(["reset.css", "widget/toolbar/toolbar.css", "widget/toolbar/toolbar.default.css"], function(){
        var s2 = w.document.createElement("script");
        s2.src = "../../../_test/fet/bin/import.php?f=core/zepto.ui,core/zepto.extend,core/zepto.fix,core/zepto.highlight,core/zepto.iscroll,core/zepto.ui,widget/toolbar";
        w.document.head.appendChild(s2);
        s2.onload = function(){
        	var toolbar = w.$.ui.toolbar({useFix:true});
            var t = toolbar._el.offset(true).top;
            var html = "";
            for(var i = 0; i < 80; i++){
                html += "<br />";
            }
            w.$("body").append(html);
	        setTimeout(function(){
	            w.scrollTo(0, 500);
	            ta.scrollStop(w);
                setTimeout(function(){
                    equals(toolbar._el.css("display"), "block", "The toolbar is show");
                    equals(toolbar._el.width() , document.body.offsetWidth , "the width is ok");
                    equals(toolbar._el.height() , 42 , "the height is ok");
                    ok(Math.abs(w.pageYOffset - 500) <= 1, "The pageYOffset is " + w.pageYOffset);
                    equals(toolbar._el.offset().top, 500, 'the pos is right');
                    equals(toolbar._el.offset().left, 0,'the pos is right');
                    w.scrollTo(0,0);
                    ta.scrollStop(w);
                    setTimeout(function(){
                        equals(toolbar._el.css("display"), "block", "The toolbar is show");
                        equals(toolbar._el.width() , document.body.offsetWidth , "the width is ok");
                        equals(toolbar._el.height() , 42 , "the height is ok");
                        equals(toolbar._el.offset().top, t, 'the pos is right');
                        equals(toolbar._el.offset().left, 0,'the pos is right');
                        w.$("br").remove();
                        toolbar.destroy();
                        $(s2).remove();
                        start();
                    },200);
	            },200);
	        }, 200);
        };
    }, w);
});
test('setup & useFix', function() {
	expect(11);
    stop();
    var w = window.top;
    ua.loadcss(["reset.css", "widget/toolbar/toolbar.css", "widget/toolbar/toolbar.default.css"], function(){
        var s2 = w.document.createElement("script");
        s2.src = "../../../_test/fet/bin/import.php?f=core/zepto.ui,core/zepto.extend,core/zepto.fix,core/zepto.highlight,core/zepto.iscroll,core/zepto.ui,widget/toolbar";
        w.document.head.appendChild(s2);
        s2.onload = function(){
            $container.html('<div id="toolbar">\
        			<span>back</span>\
        			<h1>测试标题</h1>\
        			<a>字体</a>\
        			<a>选择</a>\
        		</div>');
        	var toolbar = $('#toolbar').toolbar({useFix: true}).toolbar('this');
            var t = toolbar._el.offset(true).top;
            var html = "";
            for(var i = 0; i < 80; i++){
                html += "<br />";
            }
            w.$("body").append(html);
	        setTimeout(function(){
	            w.scrollTo(0, 500);
	            ta.scrollStop(w);
                setTimeout(function(){
                    equals(toolbar._el.css("display"), "block", "The toolbar is show");
                    equals(toolbar._el.width() , document.body.offsetWidth , "the width is ok");
                    equals(toolbar._el.height() , 42 , "the height is ok");
                    ok(Math.abs(w.pageYOffset - 500) <= 1, "The pageYOffset is " + w.pageYOffset);
                    equals(toolbar._el.offset().top, 500, 'the pos is right');
                    equals(toolbar._el.offset().left, 0,'the pos is right');
                    w.scrollTo(0,0);
                    ta.scrollStop(w);
                    setTimeout(function(){
                        equals(toolbar._el.css("display"), "block", "The toolbar is show");
                        equals(toolbar._el.width() , document.body.offsetWidth , "the width is ok");
                        equals(toolbar._el.height() , 42 , "the height is ok");
                        equals(toolbar._el.offset().top, t, 'the pos is right');
                        equals(toolbar._el.offset().left, 0,'the pos is right');
                        w.$("br").remove();
                        toolbar.destroy();
                        $(s2).remove();
                        start();
                    },200);
	            },200);
	        }, 200);
        };
    }, w);
});
test("destroy()", function() {
    ua.destroyTest(function(w,f){
        var dl1 = w.dt.domLength(w);
        var el1= w.dt.eventLength();

        var toolbar = w.$.ui.toolbar({
            title: '工具栏标题'
        });
        toolbar.destroy();

        var el2= w.dt.eventLength();
        var ol = w.dt.objLength(toolbar);
        var dl2 =w.dt.domLength(w);

        equal(dl1,dl2,"The dom is ok");   //测试结果不是100%可靠，可忽略
        equal(el1,el2,"The event is ok");
        ok(ol==0,"The toolbar is destroy");
        this.finish();
    })
});
test("useFix & destroy()", function() {
    ua.destroyTest(function(w,f){
        var dl1 = w.dt.domLength(w);
        var el1= w.dt.eventLength();

        var toolbar = w.$.ui.toolbar({
            title: '工具栏标题',
            useFix: true
        });
        toolbar.destroy();

        var el2= w.dt.eventLength();
        var ol = w.dt.objLength(toolbar);
        var dl2 =w.dt.domLength(w);

        equal(dl1,dl2,"The dom is ok");   //测试结果不是100%可靠，可忽略
        equal(el1,el2,"The event is ok");
        ok(ol==0,"The toolbar is destroy");
        this.finish();
    })
});