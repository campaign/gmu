module('plugin/webapp/pageswipe', {
    setup: function() {
        $('body').append('<div id="toolbar"><div><span class="switch">切换</span></div></div><div id="pageswipe"><div><p style="height: 400px;">内容部分</p></div><div style="height: 400px;">索引</div></div> ')
        //切换按钮事件
        $('.switch').tap(function() {
            $('#pageswipe').pageswipe('toggle');
        });
    },
    teardown: function() {
        $('#pageswipe').remove();
    }
});

test("setup", function() {
    expect(3);
    stop();
    ua.loadcss(["reset.css", "webapp/pageswipe/pageswipe.css","../_test/webapp/css/pageswipe/pageswipe_demo.css"], function() {
        setTimeout(function() {
            var pageswipe = $('#pageswipe').pageswipe('this',{
                toolbar:'#toolbar'
            });
            equals(pageswipe._el.find(".ui-pageswipe-wheel").length, 1, "The wheel is right");
            equals(pageswipe._el.find(".ui-pageswipe-content").length, 1 , "The content are right");
            equals(pageswipe._el.find(".ui-pageswipe-index").length, 1 , "The index are right");
            pageswipe.destroy();
            start();
        }, 100);
    });
});

test("左右滑动", function() {
    expect(3);
    stop();
    var pageswipe = $('#pageswipe').pageswipe({
        toolbar:'#toolbar'
    }).pageswipe('this');
    ta.touchstart($(".ui-pageswipe-wheel")[0], {
        touches: [{
            clientX: 0,
            clientY: 0
        }]
    });
    ta.touchmove($(".ui-pageswipe-wheel")[0], {
        touches:[{
            clientX: -20,      //   滑动的距离大于springBackDis
            clientY: 0
        }]
    });
    ta.touchend($(".ui-pageswipe-wheel")[0]);

    setTimeout(function(){
        equals($('.ui-pageswipe-wheel').offset().left, $('#pageswipe').offset().width * -1 + pageswipe.data('iconWidth'),"The picture slide");
        equals($('#toolbar div').offset().left, $('#pageswipe').offset().width * -1 + pageswipe.data('iconWidth'),"The toolbar slide");
        ta.touchstart($(".ui-pageswipe-wheel")[0], {
            touches: [{
                clientX: 0,
                clientY: 0
            }]
        });
        ta.touchmove($(".ui-pageswipe-wheel")[0], {
            touches:[{
                clientX: 20,          //   滑动的距离小于springBackDis
                clientY: 0
            }]
        });
        ta.touchend($(".ui-pageswipe-wheel")[0]);
        setTimeout(function(){
            equals($('.ui-pageswipe-wheel').offset().left, 0,"The picture slide");
            pageswipe.destroy();
            start();
        }, 550);
    }, 550);
});
test("点击切换按钮", function() {
    stop();
    expect(2);
    var pageswipe = $('#pageswipe').pageswipe('this',{
        toolbar:'#toolbar'
    });
    ta.tap($('.switch')[0]);
    setTimeout(function(){
        equals($('.ui-pageswipe-wheel').offset().left, $('#pageswipe').offset().width * -1 + pageswipe.data('iconWidth'),"The picture slide");
        ta.tap($('.switch')[0]);
        setTimeout(function(){
            equals($('.ui-pageswipe-wheel').offset().left, 0,"The picture slide");
            pageswipe.destroy();
            start();
        }, 550);
    }, 550);
});

test("show(), hide(), toggle()", function() {
    stop();
    expect(4);
    var pageswipe = $('#pageswipe').pageswipe('this',{
        toolbar:'#toolbar'
    });
    pageswipe.show();
    setTimeout(function () {
        equals($('.ui-pageswipe-wheel').offset().left, $('#pageswipe').offset().width * -1 + pageswipe.data('iconWidth'), "The picture slide");
            pageswipe.toggle();
            setTimeout(function () {
                equals($('.ui-pageswipe-wheel').offset().left, 0, "The picture slide");
                pageswipe.toggle();
                setTimeout(function () {
                    equals($('.ui-pageswipe-wheel').offset().left, $('#pageswipe').offset().width * -1 + pageswipe.data('iconWidth'), "The picture slide");
                    pageswipe.hide();
                    setTimeout(function () {
                        equals($('.ui-pageswipe-wheel').offset().left, 0, "The picture slide");
                        pageswipe.destroy();
                        start();
                }, 500);
            }, 500);
        }, 500);
    }, 500);
});

test("destroy()", function() {
    expect(3);
    var l1 = ua.eventLength();
    var pageswipe = $('#pageswipe').pageswipe('this');
    pageswipe.destroy();
    var a = 0;
    for(var i in pageswipe) a++;
    equals(a, 0, "The obj is cleared");
    equals($('#pageswipe').length, 0, "The dom is removed");
    var l2 = ua.eventLength();
    equals(l2, l1, "The events are cleared");
});