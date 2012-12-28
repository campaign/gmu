module('webapp - tabs - plugin', {
    setup: function() {
        $("body").append("<div id='container' ></div>");
    },
    teardown : function() {
        $('#container').remove();
    }
});

function getItems() {
    return [
        {
            title: 'tab1',
            content: 'content1 content1 content1 content1 content1 content1 content1 content1 content1 content1 content1 content1'
        },
        {
            title: 'tab2',
            content: 'content2 content2 content2 content2 content2 content2 content2 content2 content2 ' +
                'content2 content2 content2 content2 content2 content2 content2 content2 content2 ' +
                'content2 content2 content2 content2 content2 content2 content2 content2 content2 ' +
                'content2 content2 content2 content2 content2 content2 content2 content2 content2 ' +
                'content2 content2 content2 content2 content2 content2 content2 content2 content2 '
        },
        {
            title: 'tab3',
            content: 'content3 content3 content3 content3 content3 content3 content3 content3 content3'
        }
    ]
}

test("左右滑动无动画", function(){
    stop()
    var tabs = $.ui.tabs({
            container: '#container',
            swipe: true,
            items: getItems(),
            transition:''
    })
    ua.loadcss(["reset.css","transitions.css", "webapp/tabs/tabs.css","webapp/tabs/tabs.default.css"], function(){
        ta.touchstart($(".ui-panel")[0], {
            touches: [{
                clientX: 0,
                clientY: 0
            }]
        });
        ta.touchmove($(".ui-panel")[0], {
            touches:[{
                clientX: -50,
                clientY: 0
            }]
        });
        ta.touchend($(".ui-panel")[0]);
        equals(1, tabs._data.active, '向右滑动')

        equals(1, tabs._data.active)
        ta.touchstart($(".ui-panel")[1], {
            touches: [{
                clientX: 0,
                clientY: 0
            }]
        });
        ta.touchmove($(".ui-panel")[1], {
            touches:[{
                clientX: 50,      //   滑动的距离大于springBackDis
                clientY: 0
            }]
        });
        ta.touchend($(".ui-panel")[1]);
        equals(0, tabs._data.active, '向左滑动')

        ta.touchstart($(".ui-panel")[0], {
            touches: [{
                clientX: 0,
                clientY: 0
            }]
        });
        ta.touchmove($(".ui-panel")[0], {
            touches:[{
                clientX: -29,      //   滑动的距离大于springBackDis
                clientY: 0
            }]
        });
        ta.touchend($(".ui-panel")[0]);
        equals(0, tabs._data.active, '滑动距离偏小，停留在原tab')

        start();
    })
})

test("左右滑动有动画", function(){
    stop()
    var tabs = $.ui.tabs({
        container: '#container',
        swipe: true,
        items: getItems()
    })
    ua.loadcss(["transitions.css", "webapp/tabs/tabs.css","webapp/tabs/tabs.default.css"], function(){
        ta.touchstart($(".ui-panel")[0], {
            touches: [{
                clientX: 0,
                clientY: 0
            }]
        });
        ta.touchmove($(".ui-panel")[0], {
            touches:[{
                clientX: -50,
                clientY: 0
            }]
        });
        ta.touchend($(".ui-panel")[0]);
        ok($(".ui-panel").eq(0).hasClass('out'), '向右滑动（滑出）')
        ok($(".ui-panel").eq(1).hasClass('in'), '向右滑动（滑入）')
        setTimeout(function(){
            ok(!$(".ui-panel").eq(0).hasClass('out'), '滑动结束')

            ta.touchstart($(".ui-panel")[1], {
                touches: [{
                    clientX: 0,
                    clientY: 0
                }]
            });
            ta.touchmove($(".ui-panel")[1], {
                touches:[{
                    clientX: 50,
                    clientY: 0
                }]
            });
            ta.touchend($(".ui-panel")[1]);
            ok($(".ui-panel").eq(1).hasClass('out'), '向左滑动（滑出）')
            ok($(".ui-panel").eq(0).hasClass('in'), '向左滑动（滑入）')

            setTimeout(function(){
                ok(!$(".ui-panel").eq(0).hasClass('in'), '滑动结束')
                start()
            }, 400)
        }, 400)
    })
})


