module("webapp - dropmenu",{
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
    ua.loadcss(["reset.css",  "webapp/button/button.css", upath + "webapp/dropmenu/dropmenu.css"], function(){
        start();
    });
});

test("开发阶段随便写的", function(){
    stop();
    var btn = $.ui.button({container: '#container', label: 'Dropmenu居中'});
    var dropmenu = $.ui.dropmenu({
        container: '#container',
        align: 'center',
        width: btn.root().width()-2,
        items: [
            {
                text: 'item1',
                href: 'http://www.baidu.com'
            },
            {
                text: '主页',
                icon: 'home',
                click: function(e){
                    ok('click触发了');
                }
            },
            {
                text: '删除',
                icon: 'delete',
                click: function(e){
                    ok('click触发了');
                }
            },
            {
                text: '设置',
                icon: 'gear',
                click: function(e){
                    ok('click触发了');
                }
            }
        ]
    }).bindButton(btn.root());
    dropmenu.on('itemClick', function(e){
        ok('itemClick触发了');
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
                    ok('click触发了');
                }
            },
            {
                text: '删除',
                icon: 'delete',
                click: function(e){
                    ok('click触发了');
                }
            },
            {
                text: '设置',
                icon: 'gear',
                click: function(e){
                    ok('click触发了');
                }
            }
        ]
    }).bindButton(btn2.root());
    dropmenu2.on('itemClick', function(e){
        ok('itemClick触发了');
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
                icon: 'home',
                click: function(e){
                    ok('click触发了');
                }
            },
            {
                text: '删除',
                icon: 'delete',
                click: function(e){
                    ok('click触发了');
                }
            },
            {
                text: '设置',
                icon: 'gear',
                click: function(e){
                    ok('click触发了');
                }
            }
        ]
    }).bindButton(btn3.root());
    dropmenu3.on('itemClick', function(e){
        ok('itemClick触发了');
        return false;
    });


    var btn4 = $.ui.button({container: '#container', label: '水平dropmenu'});
    var dropmenu4 = $.ui.dropmenu({
        align: 'left',
        direction: 'horizontal',
        items: [
            {
                icon: 'home',
                click: function(e){
                    ok('click触发了');
                }
            },
            {
                icon: 'gear',
                click: function(e){
                    ok('click触发了');
                }
            },
            {
                icon: 'delete',
                click: function(e){
                    ok('click触发了');
                }
            },
            {
                icon: 'grid',
                click: function(e){
                    ok('click触发了');
                }
            }
        ]
    }).bindButton(btn4.root());
    dropmenu4.on('itemClick', function(e){
        ok('itemClick触发了');
        return false;
    });



});