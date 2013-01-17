module('plugin/widget/tabs', {
    setup: function() {
        $("body").append("<div id='container' ></div>");
    },
    teardown : function() {
        $('#container').remove();
    }
});

function setup() {
    $("body").append('<div id="setup"><ul>' +
        '<li><a href="#conten1">Tab1</a></li>' +
        '<li><a href="#conten2">Tab2</a></li>' +
        '<li><a href="#conten3">Tab3</a></li>' +
        '</ul>' +
        '<div id="conten1">content1</div>' +
        '<div id="conten2"><input type="checkbox" id="input1" /><label for="input1">选中我后tabs不可切换</label></div>' +
        '<div id="conten3">content3</div>' +
        '</div>');
};

function fullsetup() {
    $('body').append('<div id="fullsetup" class="ui-tabs">'
        + '<ul class="ui-tabs-nav">'
        + '<li><a href="#content1">Tab1</a></li>'
        + '<li><a href="#content2">Tab2</a></li>'
        + '<li class="ui-state-active"><a href="#content3">Tab3</a></li>'
        + '</ul>'
        + '<div class="ui-viewport ui-tabs-content">'
        + '<div id="content1" class="ui-panel ui-tabs-panel slide">content1</div>'
        + '<div id="content2" class="ui-panel ui-tabs-panel slide">content2</div>'
        + '<div id="content3" class="ui-panel ui-tabs-panel slide ui-state-active">content3</div>'
        + '</div></div>');
};

test("默认配置项，在什么都不传的情况下是否正确(render模式)", function(){
    var tabs = $.ui.tabs({
        container: '#container',
        items: [
            {title:'tab1', content:'content1'},
            {title:'tab2', content:'content2'},
            {title:'tab3', content:'content3'},
            {title:'tab4', content:'content4'}
        ]
    })
    equals(tabs._data.active,0,"The default active is right");
    equals(tabs._el.hasClass('ui-tabs'), true, 'The tabs has class ui-tabs');
    equals($('.ui-tabs-nav li', tabs._el).length, 4, 'The tabs nav number is right');
    equals($('.ui-tabs-content .ui-tabs-panel', tabs._el).length, 4, 'The tabs pannel number is right');
    strictEqual($('.ui-tabs-nav li', tabs._el).eq(tabs._data.active).hasClass('ui-state-active'),true,"The active tab has ui-state-active");
    equals(tabs._data.transition, 'slide', "The default transition is right");
    equals(tabs._data.activate, null,"The default activate is right");
    equals(tabs._data.beforeActivate, null,"The default beforeActivate is right");
    equals(tabs._data.animateComplete, null,"The default animateComplete is right");
    tabs.destroy();
});

test("多实例，render/setup/fullsetup，配置项参数测试",function(){
    stop();
    ua.loadcss(["transitions.css", "widget/tabs/tabs.css","widget/tabs/tabs.default.css"], function(){
        var tabs1 = $.ui.tabs({
            items: [
                {title:'tab1', content:'content1', href:'http://www.baidu.com'},
                {title:'tab2', content:'content2'},
                {title:'tab3', content:'content3', href:'http://gmu.baidu.com'},
                {title:'tab4', content:'content3', href:'http://gmu.baidu.com'}
            ],
            active: 1
        });
        setup();
        var tabs2 = $('#setup').tabs({
            active: 4,
            transition: false
        }).tabs('this');
        fullsetup();
        var tabs3 = $('#fullsetup').tabs({
            active: 1
        }).tabs('this');

        equals($('.ui-tabs').length, 3, '三个实例已创建');
        equals($('.ui-tabs-nav li', tabs1._el).length, 4, 'render实例tab nav数量正确');
        equals($('.ui-tabs-content .ui-tabs-panel', tabs1._el).length, 4, 'render实例tab pannel数量正确');
        strictEqual($('.ui-tabs-nav li', tabs1._el).eq(1).hasClass('ui-state-active'), true, 'render实例tab nav active tab正确');
        strictEqual($('.ui-tabs-content .ui-tabs-panel', tabs1._el).eq(1).hasClass('ui-state-active'), true, 'render实例tab content active tab正确');
        equals($('.ui-tabs-content .ui-tabs-panel', tabs1._el).eq(1).html(), 'content2', 'render实例tab pannel内容正确');
        strictEqual($('.ui-tabs-content .slide', tabs1._el).length, 4, 'transition参数正确应用');

        equals($('.ui-tabs-nav li', tabs2._el).length, 3, 'setup实例tab nav数量正确');
        equals($('.ui-tabs-content .ui-tabs-panel', tabs2._el).length, 3, 'setup实例tab pannel数量正确');
        strictEqual($('.ui-tabs-nav li', tabs2._el).eq(2).hasClass('ui-state-active'), true, 'setup实例tab nav active tab正确');
        strictEqual($('.ui-tabs-content .ui-tabs-panel', tabs2._el).eq(2).hasClass('ui-state-active'), true, 'setup实例tab content active tab正确');
        equals($('.ui-tabs-content .ui-tabs-panel', tabs2._el).eq(2).html(), 'content3', 'setup实例tab pannel内容正确');
        strictEqual($('.ui-tabs-content .slide', tabs2._el).length, 0, 'transition参数正确应用');

        equals($('.ui-tabs-nav li', tabs3._el).length, 3, 'fullsetup实例tab nav数量正确');
        equals($('.ui-tabs-content .ui-tabs-panel', tabs3._el).length, 3, 'fullsetup实例tab pannel数量正确');
        strictEqual($('.ui-tabs-nav li', tabs3._el).eq(1).hasClass('ui-state-active'), true, 'fullsetup实例tab nav active tab正确');
        strictEqual($('.ui-tabs-content .ui-tabs-panel', tabs3._el).eq(1).hasClass('ui-state-active'), true, 'fullsetup实例tab content active tab正确');
        equals($('.ui-tabs-content .ui-tabs-panel', tabs3._el).eq(1).html(), 'content2', 'fullsetup实例tab pannel内容正确');
        setTimeout(function () {
            tabs1.destroy();
            tabs2.destroy();
            tabs3.destroy();
            $('#setup').remove();
            $('#fullsetup').remove();
            start();
        }, 300)
    });
})

test("事件测试&接口测试:switchTo,beforeActivate,activate,animateComplete",function(){
    expect(22);
    stop();
    setup();
    var tabs = $('#setup').tabs({
        activate : function(e, to, from){
            ok(true, 'activate has triggered');
            equals(to.index, 1, 'to参数正确');
            equals(from.index, 0, 'from参数正确');
        },
        beforeActivate : function(e, to, from){
            ok(true, 'beforeActivate has triggered');
            equals(to.index, 1, 'to参数正确');
            equals(from.index, 0, 'from参数正确');
        },
        animateComplete : function(e, to, from){
            ok(true, 'animateComplete has triggered');
            equals(to.index, 1, 'to参数正确');
            equals(from.index, 0, 'from参数正确');
            strictEqual(tabs._el.find('.ui-tabs-nav li').eq(0).hasClass('ui-state-active'), false, '切换后active tab index不是0');
            strictEqual(tabs._el.find('.ui-tabs-nav li').eq(1).hasClass('ui-state-active'), true, '切换后active tab index是1');
            strictEqual(tabs._el.find('.ui-tabs-content .ui-tabs-panel').eq(0).hasClass('ui-state-active'), false, '切换后active tab content index不是0');
            strictEqual(tabs._el.find('.ui-tabs-content .ui-tabs-panel').eq(1).hasClass('ui-state-active'), true, '切换后active tab content index是1');
            ta.tap(tabs2._el.find('.ui-tabs-nav li').get(2));
        }
    }).tabs('this');

    var count = 0,
        tabs2 = $.ui.tabs({
        items: [
            {title:'tab1', content:'content1', href:'http://www.baidu.com'},
            {title:'tab2', content:'content2'},
            {title:'tab3', content:'content3', href:'http://gmu.baidu.com'},
            {title:'tab4', content:'content3', href:'http://gmu.baidu.com'}
        ],
        active: 1,
        transition: false,
        activate : function(){
            ok(true, 'activate has triggered');
            strictEqual(tabs2._el.find('.ui-tabs-nav li').eq(1).hasClass('ui-state-active'), false, '切换后active tab不是1');
            strictEqual(tabs2._el.find('.ui-tabs-nav li').eq(2).hasClass('ui-state-active'), true, '切换后active tab是2');
            strictEqual(tabs2._el.find('.ui-tabs-content .ui-tabs-panel').eq(1).hasClass('ui-state-active'), false, '切换后active tab content 不是1');
            strictEqual(tabs2._el.find('.ui-tabs-content .ui-tabs-panel').eq(2).hasClass('ui-state-active'), true, '切换后active tab content 是2');
            ta.tap(tabs2._el.find('.ui-tabs-nav li').get(1));
            setTimeout(function () {
                tabs.destroy();
                tabs2.destroy();
                start();
            }, 300)
        },
        beforeActivate : function(e,to,from){
            ok(true, 'beforeActivate has triggered');
            count > 0 && e.preventDefault();
            count++
        },
        animateComplete : function(){
            ok(true, 'animateComplete has not triggered');
        }
    });

    equals(tabs._el.find('.ui-tabs-nav li').eq(0).hasClass('ui-state-active'), true, '未切换前active tab index是0');
    equals(tabs._el.find('.ui-tabs-content .ui-tabs-panel').eq(0).hasClass('ui-state-active'), true, '未切换前active tab content index是0');
    tabs.switchTo(1);
});

test("destroy",function(){
    ua.destroyTest(function(w,f){
        w.$('body').highlight();//由于highlight在调用的时候会注册全局事件，以便多次其他实例使用，所以这里先让hightlight把全局事件注册以后再来对比。
        var dl1 = w.dt.domLength(w);
        var el1= w.dt.eventLength();

        var tabs =  w.$.ui.tabs({
            items: [
                {title:'tab1', content:'content1', href:'http://www.baidu.com'},
                {title:'tab2', content:'content2'},
                {title:'tab3', content:'content3', href:'http://gmu.baidu.com'},
                {title:'tab4', content:'content3', href:'http://gmu.baidu.com'}
            ]
        });
        tabs.destroy();
        var el2= w.dt.eventLength();
        var ol = w.dt.objLength(tabs);
        var dl2 =w.dt.domLength(w);
        equal(dl1,dl2,"The dom is ok");   //测试结果不是100%可靠，可忽略
        equal(el1,el2,"The event is ok");
        ok(ol==0,"The tabs is destroy");
        this.finish();
    })
}) ;
