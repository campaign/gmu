
module('plugin/webapp/appframe', {
    setup: function() {
        $('body').append('<div id="appframe"><div><p style="height: 400px;">内容部分1</p></div><div><p style="height: 400px;">内容部分2</p></div><div><p style="height: 400px;">内容部分3</p></div></div> ');
    },
    teardown: function() {
        $('#appframe').remove();
    }
});

test("setup", function() {
    expect(2);
    stop();
    ua.loadcss(["reset.css", "webapp/appframe/appframe.css"], function() {
        setTimeout(function() {
            var appframe = $('#appframe').appframe('this');
            equals(appframe._el.find(".ui-appframe-wheel").length, 1, "The wheel is right");
            equals(appframe._el.find(".ui-appframe-item").length, 3 , "The content are right");
            appframe.destroy();
            start();
        }, 100);
    });
});

test("左右滑动", function() {
    expect(3);
    stop();
    var appframe = $('#appframe').appframe('this');
    ta.touchstart($(".ui-appframe-wheel")[0], {
        touches: [{
            clientX: 0,
            clientY: 0
        }]
    });
    ta.touchmove($(".ui-appframe-wheel")[0], {
        touches:[{
            clientX: -20,      //   滑动的距离大于springBackDis
            clientY: 0
        }]
    });
    ta.touchend($(".ui-appframe-wheel")[0]);

    setTimeout(function(){
        equals($('.ui-appframe-wheel').offset().left, $('#appframe').offset().width * -1,"The picture slide");
        ta.touchstart($(".ui-appframe-wheel")[0], {
            touches: [{
                clientX: 0,
                clientY: 0
            }]
        });
        ta.touchmove($(".ui-appframe-wheel")[0], {
            touches:[{
                clientX: -20,          //   滑动的距离小于springBackDis
                clientY: 0
            }]
        });
        ta.touchend($(".ui-appframe-wheel")[0]);
        setTimeout(function(){
            equals($('.ui-appframe-wheel').offset().left,$('#appframe').offset().width * -2,"The picture slide");
            ta.touchstart($(".ui-appframe-wheel")[0], {
                touches: [{
                    clientX: 0,
                    clientY: 0
                }]
            });
            ta.touchmove($(".ui-appframe-wheel")[0], {
                touches:[{
                    clientX: 20,          //   滑动的距离小于springBackDis
                    clientY: 0
                }]
            });
            ta.touchend($(".ui-appframe-wheel")[0]);
            setTimeout(function(){
                equals($('.ui-appframe-wheel').offset().left, $('#appframe').offset().width * -1,"The picture slide");
                appframe.destroy();
                start();
            },550);
        }, 550);
    }, 550);
});

test("slide && slideend 事件", function() {
    stop();
    expect(3);
    var appframe = $('#appframe').appframe({
        slide: function() {
            ok(1,'The slide triggered.');
        },
        slideend:function() {
            ok(1,'The slideend triggered.');
        }
    }).appframe('this');
    appframe.next();
    setTimeout(function () {
        equals($('.ui-appframe-wheel').offset().left, $('#appframe').offset().width * -1, "The picture slide");
        appframe.destroy();
        start();
    }, 500);
});

test("destroy()", function() {
    expect(3);
    var l1 = ua.eventLength();
    var appframe = $('#appframe').appframe('this');
    appframe.destroy();
    var a = 0;
    for(var i in appframe) a++;
    equals(a, 0, "The obj is cleared");
    equals($('#appframe').length, 0, "The dom is removed");
    var l2 = ua.eventLength();
    equals(l2, l1, "The events are cleared");
});