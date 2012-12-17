module("webapp/dropmenu",{
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
    stop();
    ua.loadcss(["reset.css", "webapp/button/button.css","webapp/button/button.default.css", "webapp/dropmenu/dropmenu.css", "webapp/dropmenu/dropmenu.default.css"], function(){
        start();
    });
});

test("item Click", function(){
    stop();
    expect(8);
    var btn = $.ui.button({container: '#container', label: 'Dropmenu居中'});
    var dropmenu = $.ui.dropmenu({
        container: '#container',
        align: 'center',
        width: btn.root().width()-2,
        items: [
            {
                text: 'item1',
                click: function(e){
                    ok(1, 'click触发了');
                }
            },
            {
                text: '主页',
                icon: 'home'
            },
            {
                text: '删除',
                icon: 'delete'
            },
            {
                text: '设置',
                icon: 'gear'
            }
        ]
    }).bindButton(btn.root());
    dropmenu.on('itemClick', function(e){
        ok(1, 'itemClick触发了');
        return false;
    });

    var btn2 = $.ui.button({container: '#container', label: 'Dropmenu居右'});
    var dropmenu2 = $.ui.dropmenu({
        align: 'right',
        items: [
            {
                text: 'item1',
                href: 'http://www.baidu.com'
            },
            {
                text: '主页',
                icon: 'home',
                click: function(e){
                    ok(1, 'click触发了');
                }
            },
            {
                text: '删除',
                icon: 'delete'
            },
            {
                text: '设置',
                icon: 'gear'
            }
        ]
    }).bindButton(btn2.root());
    dropmenu2.on('itemClick', function(e){
        ok(1, 'itemClick触发了');
        return false;
    });

    var btn3 = $.ui.button({container: '#container', label: 'Dropmenu居左'});
    var dropmenu3 = $.ui.dropmenu({
        align: 'left',
        items: [
            {
                text: 'item1',
                href: 'http://www.baidu.com'
            },
            {
                text: '主页',
                icon: 'home'
            },
            {
                text: '删除',
                icon: 'delete',
                click: function(e){
                    ok(1, 'click触发了');
                }
            },
            {
                text: '设置',
                icon: 'gear'
            }
        ]
    }).bindButton(btn3.root());
    dropmenu3.on('itemClick', function(e){
        ok(1, 'itemClick触发了');
        return false;
    });


    var btn4 = $.ui.button({container: '#container', label: '水平dropmenu'});
    var dropmenu4 = $.ui.dropmenu({
        align: 'left',
        direction: 'horizontal',
        items: [
            {
                icon: 'home'
            },
            {
                icon: 'gear'
            },
            {
                icon: 'delete'
            },
            {
                icon: 'grid',
                click: function(e){
                    ok(1, 'click触发了');
                }
            }
        ]
    }).bindButton(btn4.root());
    dropmenu4.on('itemClick', function(e){
        ok(1, 'itemClick触发了');
        return false;
    });
    ua.click(dropmenu.root().find('li').get(0));
    ua.click(dropmenu2.root().find('li').get(1));
    ua.click(dropmenu3.root().find('li').get(2));
    ua.click(dropmenu4.root().find('li').get(3));
    dropmenu.destroy();
    dropmenu2.destroy();
    dropmenu3.destroy();
    dropmenu4.destroy();
    start();
});

test("show() & hide()", function(){
    expect(2);
    var btn = $.ui.button({container: '#container', label: 'dropmenu'});
    var dropmenu = $.ui.dropmenu({
        items:[
            { text:'text1' },
            { text:'text2' },
            { text:'text3' },
            { text:'text4' }
        ]
    }).bindButton(btn.root());
    dropmenu.show();
    ok(ua.isShown($(".ui-dropmenu")[0]), "The dropmenu is show");
    dropmenu.hide();
    equal($(".ui-dropmenu").css('top'),'-99999px', "The dropmenu is hide");
    dropmenu.destroy();
});

test("destroy()", function(){
    expect(3);
    var count = 0;
    var l1 = ua.eventLength();
    var dropmenu = $.ui.dropmenu({
        items:[
            { text:'text1' },
            { text:'text2' },
            { text:'text3' },
            { text:'text4' }
        ]
    });
    dropmenu.destroy();
    var a=0;
    for(var i in dropmenu)
        a++;
    equals(a, 0, "The obj is cleared");
    equals($(".ui-dropmenu").length, 0, "The dom is removed");
    var l2 = ua.eventLength();
    equals(l2, l1, "The events are cleared");
    start();
});