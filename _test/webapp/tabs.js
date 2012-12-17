module('plugin/webapp/tabs', {
    setup: function() {
        $("body").append("<div id='container' ></div>");
    },
    teardown : function() {
        $('#container').remove();
    }
});

function setup() {
    $("#container").append('<div id="tabs"><ul><li><a href="#conten1">Tab1</a></li><li><a href="#conten2">Tab2</a></li><li><a href="#conten3">Tab3</a></li></ul><div id="conten1">content1</div><div id="conten2"><input type="checkbox" id="input1" /><label for="input1">选中我后tabs不可切换</label></div><div id="conten3">content3</div></div>')
}

test("默认配置项，在什么都不传的情况下是否正确", function(){
    var tabs = $.ui.tabs({
        container: '#container',
        items: [{}]
    })
    equals(tabs._data.active,0,"The default active is right");
    equals(tabs._data.items.length, 1,"The default items is right");
    equals(tabs._data.swipe, false,"The default swipe is right");
    equals(tabs._data.transition, 'slide', "The default transition is right");
    equals(tabs._data.activate, null,"The default activate is right");
    equals(tabs._data.beforeActivate, null,"The default beforeActivate is right");
    equals(tabs._data.beforeRender, null,"The default beforeRender is right");
    equals(tabs._data.animateComplete, null,"The default animateComplete is right");
})

test("配置项测试结果",function(){
    var tabs = $.ui.tabs({
        container: '#container',
        active : 1,
        items: [
            {
                title: 'tab1',
                content: 'content1'
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
        ],
        swipe : true,
        transition : 'slide',
        activate : function(){},
        beforeActivate : function(){},
        beforeRender : function(){},
        animateComplete : function(){}
    })

    equals($('.ui-panel').get(tabs._data.active).className, 'ui-panel ui-tabs-panel ' + tabs._data.transition + ' ui-state-active', "The active is right");
    equals($('.ui-tabs-nav li').length, 3,"The items is right");
    equals($('.ui-tabs-content div').length, 3,"The items is right");

    equals($('.ui-tabs-nav li').get(0).innerText, tabs._data.items[0].title,"test items title");
    equals($('.ui-tabs-content div').get(2).innerText, tabs._data.items[2].content,"test tiems content");

    equals(tabs._data.swipe, true,"The swipe is right");
    equals(tabs._data.transition, 'slide', "The default transition is right");
    equals(typeof tabs._data.activate, 'function',"The activate is right");
    equals(typeof tabs._data.beforeActivate, 'function',"The beforeActivate is right");
    equals(typeof tabs._data.beforeRender, 'function',"The beforeRender is right");
    equals(typeof tabs._data.animateComplete, 'function',"The animateComplete is right");
})

test("事件测试",function(){
    stop()
    var status = '',
        tabs = $.ui.tabs({
            container: '#container',
            swipe: true,
            items: [
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
            ],
            transition: 'slide',
            activate : function(){
                ok(true, 'activate has triggered')
                status += ' activate';
            },
            beforeActivate : function(){
                ok(true, 'beforeActivate has triggered')
                status += ' beforeActivate';
            },
            animateComplete : function(){
                ok(true, 'animateComplete has triggered')
                status += ' animateComplete';
            }
    })
    ua.loadcss(["transitions.css", "webapp/tabs/tabs.css","webapp/tabs/tabs.default.css"], function(){
        var index = 2
        tabs.switchTo(index)
        setTimeout(function(){
            equals(index, tabs._data.active)
            equals(status, ' beforeActivate activate animateComplete',"event triggered");
            start();
        },400)

    })
})

test("destroy()",function(){
    stop();
    expect(3);
    var l1 = ua.eventLength();
    var tabs = $.ui.tabs({
        container: '#container',
        items: [{}]
    });
    tabs.destroy();
    var a=0;
    for(var i in tabs)
        a++;
    equals(a, 0, "The obj is cleared");
    equals($(".ui-tabs").length, 0, "The dom is removed");
    var l2 = ua.eventLength();
    equals(l2, l1, "The events are cleared");
    start();
})