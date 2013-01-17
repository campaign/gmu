module('plugin/widget/tabs.ajax', {
    setup: function() {
        $("body").append("<div id='container' ></div>");
    },
    teardown : function() {
        $('#container').remove();
    }
});

function setup(type) {
    var html = '<div id="tabs">'
             +   '<ul>'
             +      '<li><a href="#conten1">Tab1</a></li>'
             +      '<li><a href="../../widget/data/tabs/proxy.php?file=sample.' + type + '">Ajax1</a></li>'
             +      '<li><a href="../../widget/data/tabs/proxy.php?file=sample.' + type + '">Ajax2</a></li>'
             +  '</ul>'
             +  '<div id="conten1">content1</div>'
             +'</div>'
    $('body').append(html)
}

test("只为加载css用",function(){
    expect(1);
    stop();
    ua.loadcss(["reset.css","transitions.css", "widget/tabs/tabs.css","widget/tabs/tabs.default.css"], function(){
        ok(true, '样式加载进来了！');
        start();
    });
});

test("加载成功&事件测试:beforeLoad,load,beforeRender", function(){
    stop()
    setup('html')
    var count = 0,
        status = '';
    $('#tabs').tabs({
        ajax: {
            type: 'POST',
            contentType: 'application/x-www-form-urlencoded'
        },
        beforeLoad: function(e, xhr, settings){
            if (count == 1) {
                e.preventDefault();
                ok(true, 'beforeLoad is prevented');
            }
            ok(true, 'beforeLoad has triggered')
            status += 'beforeLoad '
            var ui = this;
            settings.data = $.param({
                index: ui.data('active')
            });
        },
        beforeRender : function(event, response, panel, index, xhr){
            status += 'beforeRender '
            ok(true, 'beforeRender has triggered')
            equal(1, index, '加载页面index正确')
        },
        load : function(event, panel){
            count++;
            status += 'load';
            ok(true, 'load has triggered');
            equal('beforeLoad beforeRender load', status);
            equals($(panel).find('h3').length, 1, 'content h3 loaded');
            equals($(panel).find('p').length, 1, 'content p loaded');
            if (count == 1) {
                ok(true, '第二次点击开始');
                ta.tap($('#tabs .ui-tabs-nav li').get(2));
                setTimeout(function () {
                    $('#tabs').tabs('destroy');
                    start();
                }, 300);
            }
        }
    });
    ta.tap($('#tabs .ui-tabs-nav li').get(1));
    ok(true, '第一次点击开始');
})

test("第一次加载还未完成，第二次加载开始，则第一次取消请求", function(){
    stop()
    setup('html');
    expect(7);
    $('#tabs').tabs({
        transition: '',
        ajax: {
            type: 'GET',
            contentType: 'application/x-www-form-urlencoded'
        },
        beforeLoad: function(e, xhr, settings){
            ok(true, 'beforeLoad has triggered');
        },
        beforeRender : function(event, response, panel, index, xhr){
            ok(true, 'beforeRender has triggered');
        },
        load : function(event, panel){
            ok(true, 'load has triggered');
            setTimeout(function () {
                $('#tabs').tabs('destroy');
                start();
            }, 300);
        },
        loadError: function () {
            ok(true, 'load error triggered');
        }
    });
    ok(true, '第一次点击开始');
    ta.tap($('#tabs .ui-tabs-nav li').get(1));

    ok(true, '第二次点击开始');
    ta.tap($('#tabs .ui-tabs-nav li').get(2));
});

test("事件&rend后内容高度能自适应", function(){
    stop()
    setup('html')
    $('#tabs').tabs({
        ajax: {
            type: 'POST',
            contentType: 'application/x-www-form-urlencoded'
        },
        beforeLoad: function(e, xhr, settings){
            ok(true, 'beforeLoad has triggered')
        },
        beforeRender : function(event, response, panel, index, xhr){
            ok(true, 'beforeRender has triggered')
        },
        load : function(event, panel){
            ok(true, 'load has triggered');
            setTimeout(function () {
                equals($(panel).height(), $('#tabs .ui-tabs-content').height()-1, 'rend后内容高度能自适应了');
                $('#tabs').tabs('destroy');
                start();
            },300)
        }
    });
    ta.tap($('#tabs .ui-tabs-nav li').get(1));
});

test("destroy",function(){
    ua.destroyTest(function(w,f){
        w.$('body').highlight();//由于highlight在调用的时候会注册全局事件，以便多次其他实例使用，所以这里先让hightlight把全局事件注册以后再来对比。
        var dl1 = w.dt.domLength(w);
        var el1= w.dt.eventLength();

        var tabs =  w.$.ui.tabs({
        	items: [
                    {title:'tab1'},
                    {title:'tab2'},
                    {title:'tab3'},
                    {title:'tab4'}
                ],
        	ajax: {
                type: 'POST',
                contentType: 'application/x-www-form-urlencoded'
            }
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