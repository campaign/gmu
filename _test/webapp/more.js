module("plugin/webapp/more");

(function(){
	enSetup = function(id){
		var html = '<a class="more tab" href="javascript:void(0)">'
			+ '更多'
	        + '<span></span>'
	        + '</a>';
		$("body").append(html);
		var div = document.createElement("div");
		$(div).attr("id", "morecontainer");
		document.body.appendChild(div);
		te.dom.push($(".more")[0]);
		te.dom.push($("#morecontainer")[0]);
	};
	links = [
		{	
		    "text":"贴吧",
		    "url":"http://tieba.baidu.com"
		},
		{
		    "text":"百科",
		    "url":"http://baike.baidu.com"
		},
		{	
		    "text":"贴吧",
		    "url":"http://tieba.baidu.com"
		},
		{
		    "text":"百科",
		    "url":"http://baike.baidu.com"
		},
		{	
		    "text":"贴吧",
		    "url":"http://tieba.baidu.com"
		},
		{
		    "text":"百科",
		    "url":"http://baike.baidu.com"
		},
		{	
		    "text":"贴吧",
		    "url":"http://tieba.baidu.com"
		},
		{
		    "text":"百科",
		    "url":"http://baike.baidu.com"
		}
	];
})();

test("el(selector & zepto) & 多实例 ", function(){
	expect(21);
	enSetup();
	stop();
	ua.loadcss(["reset.css", "webapp/more/more.css"], function(){
		var more1 = $.ui.more($('<div class="ui-more"></div>'),{
		    content : links
		});
		more1.show();
		equals(more1._data.container, undefined, "The _data container is right");
		equals(more1._data.content, links, "The _data content is right");
		equals(more1._data.columnNum, 5, "The _data count is right");
		equals(more1._el.attr("class"), "ui-more", "The _el is right");
		ok(ua.isShown(more1._el[0]), "The more1 is shown");
		
		equals(more1._el.parent()[0].tagName.toLowerCase(), "body", "The container is right");
		equals(more1._el.attr("class"), "ui-more", "The el is right");
		
		equals(more1._el.find(".ui-more-links a").length, 8, "8 links");
		equals(more1._el.find(".ui-more-links").length, 2, "2 rows");
		equals($("a", $(".ui-more-links", more1._el)[0]).length, 5, "5 columns");
		
		var div = document.createElement("div");
		$(div).attr("id", "test");
		document.body.appendChild(div);
		var div = document.createElement("div");
		$(div).attr("id", "moreel");
		$(div).attr("class", "ui-more-custom");
		$("#test").append(div);
		var more2 = $.ui.more('#moreel',{
		    content : links
		});
		more2.show();
		equals(more2._data.container, undefined, "The _data container is right");
		equals(more2._data.content, links, "The _data content is right");
		equals(more2._data.columnNum, 5, "The _data count is right");
		equals(more2._el.attr("class"), "ui-more-custom ui-more", "The _el is right");
		ok(ua.isShown(more2._el[0]), "The more2 is shown");
		
		equals(more2._el.parent().attr("id"), "test", "The container is right");
		equals(more2._el.find(".ui-more-links a").length, 8, "8 links");
		equals(more2._el.find(".ui-more-links").length, 2, "2 rows");
		equals($("a", $(".ui-more-links", more2._el)[0]).length, 5, "5 columns");
		more1.hide();
		ok(!ua.isShown(more1._el[0]), "The more1 is hide");
		more2.hide();
		ok(!ua.isShown(more2._el[0]), "The more2 is hide");
		more1.destroy();
		more2.destroy();
		$("#test").remove();
		start();
	});
});

test("container", function(){
	expect(3);
	enSetup();
	var more1 = $.ui.more({
		container : $('#morecontainer'),
	    content : links
	});
	more1.show();
	equals(more1._data.container.attr("id"), "morecontainer", "The _data container is right");
	equals(more1._el.parent().attr("id"), "morecontainer", "The container is right");
	equals(more1._el.attr("class"), "ui-more", "The el is right");
	more1.destroy();
});

test("columnNum", function(){
	expect(4);
	enSetup();
	var more1 = $.ui.more($('<div class="ui-more"></div>'),{
		container : $('#morecontainer'),
	    content : links,
	    columnNum: 3
	});
	more1.show();
	equals(more1._data.columnNum, 3, "The _data count is right");
	equals($("a", more1._el).length, 8, "8 links");
	equals($(".ui-more-links", more1._el).length, 3, "3 rows");
	equals($("a", $(".ui-more-links", more1._el)[0]).length, 3, "3 columns");
	more1.destroy();
});


test("hide()", function(){
	expect(2);
	enSetup();
	var more1 = $.ui.more($('<div class="ui-more"></div>'),{
		container : $('#morecontainer'),
	    content : links
	});
	more1.show();
	ok(ua.isShown(more1._el[0]), "The more1 is show");
	more1.hide();
	ok(!ua.isShown(more1._el[0]), "The more1 is hide");
	more1.destroy();
});

test("screen resize", function(){
	expect(4);
	enSetup();
	var more1 = $.ui.more($('<div class="ui-more"></div>'),{
		container : $('#morecontainer'),
	    content : links
	});
	more1.show();
	var w = $("body").css("width");
	$("body").css("width", 500);
	equals(more1._el.offset().width, 500, "The morearea is resized to 500");
	equals($("a",more1._el).offset().width, 100, "The link is resized to 100");
	$("body").css("width", w);
	equals(more1._el.offset().width, $("body").offset().width, "The morearea is resized to before");
	approximateEqual($("a", more1._el).offset().width, $("body").offset().width / 5, "The link is resized to before");
	more1.destroy();
});

test("setup 模式 && toggle", function(){
    expect(11);
    $('<div id="wrap"><a href="#">1</a><a href="#">2</a><a href="#">3</a><a href="#">4</a><a href="#">5</a><a href="#">6</a><a href="#">7</a></div>').appendTo('body');
    var more1 = $('#wrap').more({columnNum:5}).more('this');

    equals(more1._data.columnNum, 5, "The _data count is right");
    equals(more1._data.container, undefined, "The _data container is right");
	equals(more1._data.content.length, 0, "The _data content is right");
	equals(more1._el.attr("class"), "ui-more", "The _el is right");
    equals($("a", more1._el).length, 7, "7 links");
    equals($(".ui-more-links", more1._el).length, 2, "2 rows");
    equals($("a", $(".ui-more-links", more1._el)[0]).length, 5, "5 columns");
    more1.show();
    ok(ua.isShown(more1._el[0]), "The more1 is show");
    more1.hide();
    ok(!ua.isShown(more1._el[0]), "The more1 is hide");
    more1.toggle();
    ok(ua.isShown(more1._el[0]), "The more1 is show");
    more1.toggle();
    ok(!ua.isShown(more1._el[0]), "The more1 is hide");
    more1.destroy();
});

test("setup 模式 data-mode=true", function(){
    expect(9);
    $('<div id="wrap" data-mode="true"><div class="ui-more-links"><a href="#">1</a><a href="#">2</a><a href="#">3</a><a href="#">4</a><a href="#">5</a></div><div class="ui-more-links"><a href="#">6</a><a href="#">7</a></div></div>').appendTo('body');
    var more1 = $('#wrap').more().more('this');
    equals(more1._data.columnNum, 5, "The _data count is right");
    equals(more1._data.container, undefined, "The _data container is right");
	equals(more1._data.content.length, 0, "The _data content is right");
	equals(more1._el.attr("class"), "ui-more", "The _el is right");
    equals($("a", more1._el).length, 7, "7 links");
    equals($(".ui-more-links", more1._el).length, 2, "2 rows");
    equals($("a", $(".ui-more-links", more1._el)[0]).length, 5, "5 columns");
    more1.show();
    ok(ua.isShown(more1._el[0]), "The more1 is show");
    more1.hide();
    ok(!ua.isShown(more1._el[0]), "The more1 is hide");
    more1.destroy();
});

test("destroy()", function(){
    ua.destroyTest(function(w,f){
        var dl1 = w.dt.domLength(w);
        var el1= w.dt.eventLength();

        var more1 = $.ui.more($('<div class="ui-more"></div>'),{
            container : $('#morecontainer'),
            content : links
        });
        more1.destroy();

        var el2= w.dt.eventLength();
        var ol = w.dt.objLength(more1);
        var dl2 =w.dt.domLength(w);

        equal(dl1,dl2,"The dom is ok");   //测试结果不是100%可靠，可忽略
        equal(el1,el2,"The event is ok");
        ok(ol==0,"The toolbar is destroy");
        this.finish();
    })
});