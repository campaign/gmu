module("plugin/webapp/gotop", {
	setup: function(){
		h = top.$J(".runningarea").css("height");
		top.$J(".runningarea").css("height", "600"); //不能让document.documentElement.clientHeight大于window.pageYOffset
	},
	teardown: function(){
		$(".ui-gotop").remove();
		$("#thelist").remove();
		top.$J(".runningarea").css("height", h);
	}
});

(function(){
	enSetup = function(){
		var html = '<ul id="thelist"><div id="scroller" /></ul>';
		$(document.body).append(html);
		var count=0;
	    var $el, i;
	    $el = $('#scroller');
	    for (i = 0; i < 200; i++) {
	        $('<li>').html('第' + count + '行(up)').attr('id','li_'+count).css('color','blue').appendTo($el);
	        count++;
	    }
	};
})();

test("no el", function(){
	expect(2);
	stop();
	ua.loadcss(["reset.css", "webapp/gotop/gotop.css"], function(){
		var gotop = $.ui.gotop({});
		equals(gotop._el.attr("class"), "ui-gotop", "The el is right");
		equals(gotop._el.parent()[0].tagName.toLowerCase(), "body", "The container is right");
		gotop.destroy();
		start();
	});
});

test("el(zepto) & container", function(){
	expect(2);
	var html = '<div id="container"></div>';
	$(document.body).append(html);
	var gotop = $.ui.gotop($('<div class="ui-gotop">'), {
		container: "#container"
	});
	equals(gotop._el.attr("class"), "ui-gotop", "The el is right");
	equals(gotop._el.parent().attr("id"), "container", "The container is right");
	gotop.destroy();
	$("#container").remove();
});

test("el(selector)", function(){
	expect(2);
	var div = document.createElement("div");
	$(div).attr("id", "test");
	document.body.appendChild(div);
	div = document.createElement("div");
	$(div).attr("class", "ui-gotop");
	$("#test").append(div);

	var gotop = $.ui.gotop(".ui-gotop", {});
	equals(gotop._el.attr("class"), "ui-gotop", "The el is right");
	equals(gotop._el.parent().attr("id"), "test", "The container is right");
	gotop.destroy();
	$("#test").remove();
});

test("afterScroll", function(){
	expect(3);
	stop();
	enSetup();
	var gotop = $.ui.gotop($('<div class="ui-gotop">'), {
		afterScroll: function(){
			equals(window.pageYOffset, 0, "scroll to top");
			ok(!ua.isShown(gotop._el[0]), "The gotop hides");
			setTimeout(function(){
				gotop.destroy();
				start();
			}, 0);
		},
        position: {right: 8, bottom: 8}
	});
	setTimeout(function(){
		window.scrollTo(0, 1000);
		ta.scrollStop(document);
		setTimeout(function(){
			ok(ua.isShown(gotop._el[0]), "The gotop shows");
			ua.click(gotop._el[0]);
		}, 300);
	});
});

test("no iScrollInstance", function(){
	stop();
	expect(6);
	enSetup();
    var s = new iScroll("thelist");
	var gotop = $.ui.gotop($('<div class="ui-gotop">'), {
	});
	stop();
    setTimeout(function(){
	    window.scrollTo(0, 1000);
	    ta.scrollStop(document);
	    setTimeout(function(){
	        ok(ua.isShown(gotop._el[0]), "The gotop shows");
	        ok(Math.abs(window.pageYOffset - 1000) <= 1, "The pageYOffset is right");
	        equals(gotop._el.offset().left, $("html").offset().width - 50 - 10, "The gotop left is right");
	        equals(gotop._el.offset().top, window.pageYOffset + window.innerHeight - 50 - 10, "The gotop top is right");
	        ua.click(gotop._el[0]); //click gotop
	        setTimeout(function(){
	             equals(window.pageYOffset, 0, "scroll to top");
	             ok(!ua.isShown(gotop._el[0]), "The gotop hides");
	             window.scrollTo(0, 0);
	             gotop.destroy();
	             start();
	        }, 500);
	    }, 300);
    }, 100);
});

test("iScrollInstance", function(){
	stop();
	expect(6);
	enSetup();
	$("#thelist").css("height", window.innerHeight);
    var s = new iScroll("thelist");
	var gotop = $.ui.gotop($('<div class="ui-gotop">'), {
		iScrollInstance: s,
		afterScroll: function(){
			equal($("#scroller").offset().top, $("#thelist").offset().top, "The page scrolled");
            ok(!ua.isShown(gotop._el[0]), "The gotop hides");
            setTimeout(function(){
				gotop.destroy();
				start();
			}, 0);
		}
	});
	stop();
    setTimeout(function(){
    	ua.mousedown($("#scroller")[0], {
    		clientX: 0,
    		clientY: 0
    	});
    	ua.mousemove($("#scroller")[0], {
    		clientX: 0,
    		clientY: -1000
    	});
    	setTimeout(function(){
    		ua.mouseup($("#scroller")[0]);
    		setTimeout(function(){
    			approximateEqual($("#scroller").offset().top, $("#thelist").offset().top - 1000, "The page scrolled");
    	        ok(ua.isShown(gotop._el[0]), "The gotop shows");
    	        equals(gotop._el.offset().left, $("html").offset().width - 50 - 10, "The gotop left is right");
    	        equals(gotop._el.offset().top, window.innerHeight - 50 - 10, "The gotop top is right"); //位置相对于整个页面没有变
    	        ua.click(gotop._el[0]); //click gotop
    	    }, 300);
    	}, 400);
    }, 100);
});

test("show() & hide()", function(){
	expect(8);
	var gotop = $.ui.gotop($('<div class="ui-gotop">'), {});
	gotop.show();
	ok(ua.isShown(gotop._el[0]), "The gotop shows");
	equals(gotop._el.offset().height, 50, "The gotop height is right");
	equals(gotop._el.offset().width, 50, "The gotop width is right");
	equals(gotop._el.offset().left, $("html").offset().width - 50 - 10, "The gotop left is right");
	equals(gotop._el.offset().top, document.documentElement.clientHeight - 50 - 10, "The gotop top is right");
	equals(gotop._el.find('div').css("background-position"), "50% 50%", "The position is right");
	equals(gotop._el.find('div').css("-webkit-background-size"), "18px 15px", "The position is right");
	gotop.hide();
	ok(!ua.isShown(gotop._el[0]), "The gotop hides");
	gotop.destroy();
});

test("basic operations", function(){
	expect(17);
	stop();
	enSetup();
	var gotop = $.ui.gotop($('<div class="ui-gotop">'), {position:{right: 8, bottom: 8}});
	setTimeout(function(){
		ta.touchmove(document); //scroll less than a screen
		window.scrollTo(0, 100);
		ta.scrollStop(document);
		setTimeout(function(){
			ok(!ua.isShown(gotop._el[0]), "The gotop hides");
			ta.touchmove(document);
			window.scrollTo(0, 1000); //scroll more than a screen
			ta.scrollStop(document);
			setTimeout(function(){
				ok(ua.isShown(gotop._el[0]), "The gotop shows");
				ok(Math.abs(window.pageYOffset - 1000) <= 1, "The pageYOffset is right");
				equals(gotop._el.offset().left, $("html").offset().width - 50 - 8, "The gotop left is right");
				equals(gotop._el.offset().top, window.pageYOffset + window.innerHeight - 50 - 8, "The gotop top is right"); //window.innerHeight表示的是加上控制台的页面高度
				ta.touchmove(document); //touchmove and then scroll
                ok(!ua.isShown(gotop._el[0]), "The gotop hides");
                window.scrollTo(0, 1000);
                ta.scrollStop(document);
                setTimeout(function(){
                    ok(ua.isShown(gotop._el[0]), "The gotop shows");
                    ok(Math.abs(window.pageYOffset - 1000) <= 1, "The pageYOffset is right");
                    equals(gotop._el.offset().left, $("html").offset().width - 50 - 8, "The gotop left is right");
                    equals(gotop._el.offset().top, window.pageYOffset + window.innerHeight - 50 - 8, "The gotop top is right");
                    ua.click(gotop._el[0]); //click gotop
                    setTimeout(function(){
                        equals(window.pageYOffset, 0, "scroll to top");
                        ok(!ua.isShown(gotop._el[0]), "The gotop hides");
                        window.scrollTo(0, 1000);
                        ta.scrollStop(document);
                        setTimeout(function(){
                            ok(ua.isShown(gotop._el[0]), "The gotop shows");
                            ta.touchmove(document);
                            ok(!ua.isShown(gotop._el[0]), "The gotop hides");
                            ta.touchend(document);
                            setTimeout(function(){
                                ok(ua.isShown(gotop._el[0]), "The gotop shows");
                                ta.touchmove(document);
                                ok(!ua.isShown(gotop._el[0]), "The gotop hides");
                                ta.touchcancel(document);
                                setTimeout(function(){
                                    ok(ua.isShown(gotop._el[0]), "The gotop shows");
                                    gotop.destroy();
                                    start()
                                }, 500);
                            }, 500);
                        }, 300);
                    }, 500);
                }, 300);
			}, 300);
		}, 100);
	}, 100);
});
test("fix && ortchange 转屏", function(){
    expect(9);
    stop();
    ua.frameExt(function(w, f){
    	var me = this;
        ua.loadcss(["reset.css", "webapp/gotop/gotop.css"], function(){
        	w.$("body").css("height", 150);
        	for (i = 0; i < 200; i++) {
    	        w.$("body").append("<li>" + i + "</li>");
    	    }
            var gotop = w.$.ui.gotop( {position:{bottom:10}});
            w.scrollTo(0, 200);
            ta.scrollStop(w.document);
            setTimeout(function(){
                approximateEqual(w.pageYOffset, 200, "window scrolled");
                ok(ua.isShown(gotop._el[0]), "The gotop shows");
                equals(gotop._el.offset().left, 300 - 10 - 50, "The left is right");
                equals(gotop._el.offset().top, w.pageYOffset + 150 - 10 - 50, "The top is right");
                $(f).css({width:150, height:300});
                w.$("body").css("height", 300);
                ta.trigger("ortchange");
                setTimeout(function(){
                    ok(!ua.isShown(gotop._el[0]), "The gotop hides");
                    w.scrollTo(0, 400);
                    ta.scrollStop(w.document);
                    setTimeout(function(){
                    	approximateEqual(w.pageYOffset, 400, "window scrolled");
                        ok(ua.isShown(gotop._el[0]), "The gotop shows");
                        equals(gotop._el.offset().left, 150 - 10 - 50, "The left is right");
                        equals(gotop._el.offset().top, w.pageYOffset + 300 - 10 - 50, "The top is right");
                        gotop.destroy();
                        me.finish();
                    }, 500);
                }, 500);
            }, 500);
        }, w);
    });
});

test("setup 模式", function(){
    expect(2);
    stop();
    enSetup();
    $('<div id="gotop"></div>').appendTo('body');
    var gotop = $('#gotop').gotop().gotop('this');
    window.scrollTo(0, 1000);
    ta.scrollStop(document);
    setTimeout(function(){
        equals(gotop._el.attr("class"), "ui-gotop", "The el is right");
        ok(ua.isShown(gotop._el[0]), "The gotop shows");
        start();
    }, 200);

});

test("destroy", function(){
	expect(3);
	enSetup();
	var l1 = ua.eventLength();
	var gotop = $.ui.gotop($('<div class="ui-gotop">'), {});
    window.scrollTo(0, 10);
    ta.scrollStop(document);
	gotop.destroy();
	var a=0; 
	for(var i in gotop) 
		a++;
	equals(a, 0, "The obj is cleared");
	equals($(".ui-gotop").length, 0, "The dom is removed");
	var l2 = ua.eventLength();
	equals(l2, l1, "The events are cleared");
});