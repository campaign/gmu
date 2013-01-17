module('webapp.pageswipe', {
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
    ua.loadcss(["reset.css", "widget/pageswipe/pageswipe.css","../_test/widget/css/pageswipe/pageswipe_demo.css"], function() {
        setTimeout(function() {
            var pageswipe = $('#pageswipe').pageswipe({
                toolbar:'#toolbar'
            }).pageswipe('this');
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
    var pageswipe = $('#pageswipe').pageswipe({
        toolbar:'#toolbar'
    }).pageswipe('this');
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
    var pageswipe = $('#pageswipe').pageswipe({
        toolbar:'#toolbar'
    }).pageswipe('this');
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

    ua.destroyTest(function(w,f){
       var el1= w.dt.eventLength();
        
        $('#pageswipe').remove();
        w.$('body').append('<div id="toolbar"><div><span class="switch">切换</span></div></div><div id="pageswipe"><div><p style="height: 400px;">内容部分</p></div><div style="height: 400px;">索引</div></div> ')
        
        var pageswipe = w.$('#pageswipe').pageswipe().pageswipe('this');
        pageswipe.destroy();

        var el2= w.dt.eventLength();
        var ol = w.dt.objLength(pageswipe);
       
        equal(el1,el2,"The event is ok"); //fix影响
        equals(w.$("#toolbar").length, 1, "The toolbar exists");
        equals(w.$('#pageswipe').length, 0, "The dom is ok");
        ok(ol==0,"The dialog is destroy");
        this.finish();
    })
});