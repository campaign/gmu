module("widget/dropmenu",{
    setup:function(){
        var container = $("<div id='container'></div>");
        $("body").append(container.css({
            padding: '2em',
            position: 'relative'
        }));
    },
    teardown: function(){
        $('#container').remove();
    }
});

//test
test("只为加载css用",function(){
    expect(1);
    stop();
    //lili button.css和button.default.css各自的作用
    ua.loadcss(["reset.css", "icons.default.css", "widget/button/button.css","widget/button/button.default.css", "widget/dropmenu/dropmenu.css", "widget/dropmenu/dropmenu.default.css"], function(){
        ok(true, '样式加载进来了！');
        start();
    });
});

test("竖向", function(){
    expect(4);
    stop();
    $('#container').html('<a id="btn1" data-icon="arrow-d" data-iconpos="right">下拉菜单</a><div id="dropmenu1"><ul>' +
        '<li><a>item1</a></li><li><a><span class="ui-icon ui-icon-home"></span>主页</a></li>' +
        '<li><a><span class="ui-icon ui-icon-grid"></span>设置</a></li>' +
        '<li><a><span class="ui-icon ui-icon-delete"></span>删除</a></li>' +
        '<li><a><span class="ui-icon ui-icon-check"></span>检查</a></li>' +
        '<li><a><span class="ui-icon ui-icon-refresh"></span>刷新</a></li>' +
        '<li><a><span class="ui-icon ui-icon-forward"></span>前进</a></li>' +
        '<li><a><span class="ui-icon ui-icon-back"></span>后退</a></li>' +
        '<li><a><span class="ui-icon ui-icon-info"></span>信息</a></li>' +
        '</ul></div>');
    ua.importsrc('widget/button', function(){
        var btn = $('#btn1').button();
        var dropmenu = $('#dropmenu1').dropmenu({
            align:'left',
            btn:  $('#btn1'),
            width: $('#btn1').width(),
            height: 137,
            iScroll: true
        }).dropmenu('this');
        ok(dropmenu.data('_btn').is('#btn1'), 'btn设置正确');
        ua.click(btn[0]);
        ok(ua.isShown(dropmenu._el[0]), "点击btn，dropmenu显示");
        var s = dropmenu.data('_iScroll');
        setTimeout(function(){
            ta.touchstart($("#dropmenu1 ul")[0], {
                touches: [{
                    clientX: 0,
                    clientY: 0
                }]
            });
            ta.touchmove($("#dropmenu1 ul")[0], {
                touches: [{
                    clientX: 0,
                    clientY: -100
                }]
            });
            setTimeout(function(){
                ta.touchend($("#dropmenu1 ul")[0]);
                setTimeout(function(){
                    approximateEqual(s.y, -100, "The dropmenu scrolled");
                    ua.click(btn[0]);
                    ok(ua.isShown(dropmenu._el[0]), "再次点击btn，dropmenu隐藏");
                    dropmenu.destroy();
                    start();
                }, 400);
            }, 400);
        }, 100);
    }, '$.ui.button', 'widget/dropmenu');
});

test("横向", function(){
    expect(4);
    stop();
    $('#container').html('<a id="btn1" data-icon="arrow-d" data-iconpos="right">下拉菜单</a><div id="dropmenu1"><ul>' +
        '<li><a><span class="ui-icon ui-icon-home"></span></a></li>' +
        '<li><a><span class="ui-icon ui-icon-grid"></span></a></li>' +
        '<li><a><span class="ui-icon ui-icon-delete"></span></a></li>' +
        '<li><a><span class="ui-icon ui-icon-check"></span></a></li>' +
        '<li><a><span class="ui-icon ui-icon-refresh"></span></a></li>' +
        '<li><a><span class="ui-icon ui-icon-forward"></span></a></li>' +
        '<li><a><span class="ui-icon ui-icon-back"></span></a></li>' +
        '<li><a><span class="ui-icon ui-icon-info"></span></a></li>' +
        '<li><a><span class="ui-icon ui-icon-delete"></span></a></li>' +
        '<li><a><span class="ui-icon ui-icon-gear"></span></a></li>' +
    '</ul></div>');
    ua.importsrc('widget/button', function(){
        var btn = $('#btn1').button();
        var dropmenu = $('#dropmenu1').dropmenu({
            direction:'horizontal',
            btn: $('#btn1'),
            width: 144,
            iScroll: true
        }).dropmenu('this');
        ok(dropmenu.data('_btn').is('#btn1'), 'btn设置正确');
        ua.click(btn[0]);
        ok(ua.isShown(dropmenu._el[0]), "点击btn，dropmenu显示");
        var s = dropmenu.data('_iScroll');
        setTimeout(function(){
            ta.touchstart($("#dropmenu1 ul")[0], {
                touches: [{
                    clientX: 0,
                    clientY: 0
                }]
            });
            ta.touchmove($("#dropmenu1 ul")[0], {
                touches: [{
                    clientX: -150,
                    clientY: 0
                }]
            });
            setTimeout(function(){
                ta.touchend($("#dropmenu1 ul")[0]);
                setTimeout(function(){
                    approximateEqual(s.x, -150, "The dropmenu scrolled");
                    ua.click(btn[0]);
                    ok(ua.isShown(dropmenu._el[0]), "再次点击btn，dropmenu隐藏");
                    dropmenu.destroy();
                    start();
                }, 400);
            }, 400);
        }, 100);
    }, '$.ui.button', 'widget/dropmenu');
});