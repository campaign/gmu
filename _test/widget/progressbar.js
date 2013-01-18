module('webapp.progressbar', {
    setup: function() {
        $('body').append('<div id="progressbar"></div>')
    },
    teardown: function() {
        $('#progressbar').remove();
    }
});

test("setup", function() {
    expect(3);
    stop();
    ua.loadcss(["reset.css", "widget/progressbar/progressbar.css"], function() {
        setTimeout(function() {
            var progressbar = $('#progressbar').progressbar('this');
            ok(progressbar._el.is(".ui-progressbar-h"), "The bar is right");
            equals(progressbar._el.find(".ui-progressbar-bg").length, 1 , "The background is right");
            equals(progressbar._el.find(".ui-progressbar-button").length, 1 , "The button is right");
            progressbar.destroy();
            start();
        }, 100);
    });
});

test("render", function() {
    expect(3);
    stop();
    var progressbar = $.ui.progressbar();
    ok(progressbar._el.is(".ui-progressbar-h"), "The bar is right");
    equals(progressbar._el.find(".ui-progressbar-bg").length, 1 , "The background is right");
    equals(progressbar._el.find(".ui-progressbar-button").length, 1 , "The button is right");
    progressbar.destroy();
    start();
});

test("左右滑动 - 横向", function() {
    expect(2);
    stop();
    var progressbar = $('#progressbar').progressbar('this');
    ta.touchstart($(".ui-progressbar-button")[0], {
        touches: [{
            clientX: 0,
            clientY: 0
        }]
    });
    ta.touchmove($(".ui-progressbar-button")[0], {
        touches:[{
            clientX: 200,
            clientY: 0
        }]
    });
    ta.touchend($(".ui-progressbar-button")[0]);

    setTimeout(function(){
        equals(progressbar.value(), 200 / progressbar._el.offset().width * 100,"The value is right");
        ta.touchstart($(".ui-progressbar-button")[0], {
            touches: [{
                clientX: 0,
                clientY: 0
            }]
        });
        ta.touchmove($(".ui-progressbar-button")[0], {
            touches:[{
                clientX: -50,
                clientY: 0
            }]
        });
        ta.touchend($(".ui-progressbar-button")[0]);
        setTimeout(function(){
            equals(progressbar.value(), 150 / progressbar._el.offset().width * 100,"The value is right");
            progressbar.destroy();
            start();
        }, 550);
    }, 550);
});

test("点击进度条 - 横向", function() {
    stop();
    expect(2);
    var progressbar = $('#progressbar').progressbar('this');
    ta.touchstart($(".ui-progressbar-bg")[0], {
        touches: [{
            clientX: 300,
            clientY: 0
        }]
    });
    ta.touchend($(".ui-progressbar-bg")[0]);
    setTimeout(function(){
        equals(progressbar.value(), 300 / progressbar._el.offset().width * 100,"The value is right");
        ta.touchstart($(".ui-progressbar-bg")[0], {
            touches: [{
                clientX: 100,
                clientY: 0
            }]
        });
        ta.touchend($(".ui-progressbar-bg")[0]);
        setTimeout(function(){
            equals(progressbar.value(), 100 / progressbar._el.offset().width * 100,"The value is right");
            progressbar.destroy();
            start();
        }, 550);
    }, 550);
});

test("上下滑动 - 竖向", function() {
    expect(2);
    stop();
    var progressbar = $('#progressbar').height(400).progressbar({horizontal:false}).progressbar('this');
    ta.touchstart($(".ui-progressbar-button")[0], {
        touches: [{
            clientX: 0,
            clientY: 0
        }]
    });
    ta.touchmove($(".ui-progressbar-button")[0], {
        touches:[{
            clientX: 0,
            clientY: -200
        }]
    });
    ta.touchend($(".ui-progressbar-button")[0]);

    setTimeout(function(){
        equals(progressbar.value(), 200 / progressbar._el.offset().height * 100,"The value is right");
        ta.touchstart($(".ui-progressbar-button")[0], {
            touches: [{
                clientX: 0,
                clientY: 0
            }]
        });
        ta.touchmove($(".ui-progressbar-button")[0], {
            touches:[{
                clientX: 0,
                clientY: 50
            }]
        });
        ta.touchend($(".ui-progressbar-button")[0]);
        setTimeout(function(){
            equals(progressbar.value(), 150 / progressbar._el.offset().height * 100,"The value is right");
            progressbar.destroy();
            start();
        }, 550);
    }, 550);
});

test("点击进度条 - 竖向", function() {
    stop();
    expect(2);
    var progressbar = $('#progressbar').height(400).progressbar({horizontal:false}).progressbar('this');
    ta.touchstart($(".ui-progressbar-bg")[0], {
        touches: [{
            clientX: 0,
            clientY: progressbar._el.offset().top + 300
        }]
    });
    ta.touchend($(".ui-progressbar-bg")[0]);
    setTimeout(function(){
        equals(progressbar.value(), (progressbar._el.offset().height - 300) / progressbar._el.offset().height * 100,"The value is right");
        ta.touchstart($(".ui-progressbar-bg")[0], {
            touches: [{
                clientX: 0,
                clientY: progressbar._el.offset().top + 100
            }]
        });
        ta.touchend($(".ui-progressbar-bg")[0]);
        setTimeout(function(){
            equals(progressbar.value(), (progressbar._el.offset().height - 100) / progressbar._el.offset().height * 100,"The value is right");
            progressbar.destroy();
            start();
        }, 550);
    }, 550);
});

test("initValue, value(), value(value)", function() {
    stop();
    expect(5);
    var progressbar = $('#progressbar').progressbar({initValue:40}).progressbar('this');
    equal(progressbar.value(), 40, 'the value is right');
    var value = 65;
    progressbar.value(value);
    equal(progressbar.value(), value, 'the value is right');
    progressbar.value('some value');
    equal(progressbar.value(), value, 'the value is right');
    progressbar.value(250);
    equal(progressbar.value(), 100, 'the value is right');
    progressbar.value(-30);
    equal(progressbar.value(), 0, 'the value is right');
    progressbar.destroy();
    start();
});

test("show(), hide()", function() {
    stop();
    expect(3);
    var progressbar = $('#progressbar').progressbar('this');
    ok(ua.isShown(progressbar._el[0]), "The progressbar shows");
    progressbar.hide();
    setTimeout(function () {
        ok(!ua.isShown(progressbar._el[0]), "The progressbar hides");
        progressbar.show();
        ok(ua.isShown(progressbar._el[0]), "The progressbar shows");
        progressbar.destroy();
        start();
    }, 100);
});


test("destroy()", function() {

    ua.destroyTest(function(w,f){
        var dl1 = w.dt.domLength(w);
        var el1= w.dt.eventLength();

        var progressbar = w.$('<div></div>').progressbar('this');
        progressbar.destroy();

        var el2= w.dt.eventLength();
        var ol = w.dt.objLength(progressbar);
        var dl2 =w.dt.domLength(w);

        equal(dl1,dl2,"The dom is ok");   //测试结果不是100%可靠，可忽略
        equal(el1,el2,"The event is ok");
        ok(ol==0,"The dialog is destroy");
        this.finish();
    })
});