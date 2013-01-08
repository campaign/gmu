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
    ua.loadcss(["reset.css", "icons.default.css", "widget/button/button.css","widget/button/button.default.css", "widget/dropmenu/dropmenu.css", "widget/dropmenu/dropmenu.default.css"], function(){
        ok(true, '样式加载进来了！');
        start();
    });
});

test("参数 － btn", function(){
    expect(3);
    stop();
    ua.importsrc('widget/button', function(){
        var contaier = $('#container');
        var btn = $('<a class="btn">Click Me</a>').appendTo(contaier);
        var dropmenu = $.ui.dropmenu({
            btn: '.btn'
        });
        ok(dropmenu.data('_btn').is('.btn'), 'btn设置正确');
        dropmenu.destroy();
        btn.remove();

        btn = $('<a class="btn">Click Me</a>').appendTo(contaier);
        dropmenu = $.ui.dropmenu({
            btn: btn
        });
        ok(dropmenu.data('_btn').is('.btn'), 'btn设置正确');
        dropmenu.destroy();
        btn.remove();

        btn = $.ui.button({
            container: '#container'
        });
        dropmenu = $.ui.dropmenu({
            btn: btn
        });
        ok(dropmenu.data('_btn').is('.ui-button'), 'btn设置正确');
        dropmenu.destroy();
        btn.destroy();

        start();
    }, '$.ui.button', 'widget/dropmenu');
});

test("参数 － align", function(){
    expect(7);
    stop();
    $('<a id="btn">btn</a>').appendTo('#container');
    var obj = $.ui.dropmenu({
        items: [
            {
                text: 'test'
            }
        ],
        container: '#container',
        btn: '#btn'
    }).show();
    ok(obj.root().hasClass('ui-aligncenter'), 'dropmenu默认为align center');
    obj.destroy();

    obj = $.ui.dropmenu({
        items: [
            {
                text: 'test'
            }
        ],
        container: '#container',
        btn: '#btn',
        align: 'left'
    }).show();
    ok(obj.root().hasClass('ui-alignleft'), 'dropmenu被设置成左对齐');
    obj.destroy();

    obj = $.ui.dropmenu({
        items: [
            {
                text: 'test'
            }
        ],
        container: '#container',
        btn: '#btn',
        align: 'center'
    }).show();
    ok(obj.root().hasClass('ui-aligncenter'), 'dropmenu被设置成居中对齐');
    obj.destroy();

    obj = $.ui.dropmenu({
        items: [
            {
                text: 'test'
            }
        ],
        container: '#container',
        btn: '#btn',
        align: 'right'
    }).show();
    ok(obj.root().hasClass('ui-alignright'), 'dropmenu被设置成居右对齐');
    obj.destroy();

    $('#container').css({
        position:'relative'
    });
    $('#btn').css({
        position: 'absolute',
        left: '50%'
    });
    obj = $.ui.dropmenu({
        items: [
            {
                text: 'test'
            }
        ],
        container: '#container',
        btn: '#btn',
        align: 'auto'
    }).show();
    ok(obj.root().hasClass('ui-aligncenter'), 'dropmenu被当前为居中对齐');
    $('#btn').css({
        left: 0
    });
    obj.hide().show();
    ok(obj.root().hasClass('ui-alignleft'), 'dropmenu被当前为居左对齐');

    $('#btn').css({
        left: 'auto',
        right: 0
    });
    obj.hide().show();
    ok(obj.root().hasClass('ui-alignright'), 'dropmenu被当前为居右对齐');


    start();
});

test("参数 － width & height", function(){
    expect(2);
    stop();
    $('<a id="btn">btn</a>').appendTo('#container');
    var obj = $.ui.dropmenu({
        items: [
            {
                text: 'test'
            }
        ],
        container: '#container',
        btn: '#btn',
        width: 250,
        height: 399
    }).show();
    equals(obj.root().width(), 250, 'dropmenud的宽度是250');
    equals(obj.root().height(), 399, 'dropmenu的高度为399');
    start();
});

test("参数 － offset", function(){
    expect(2);
    stop();
    $('<a id="btn">btn</a>').appendTo('#container');
    var obj = $.ui.dropmenu({
        items: [
            {
                text: 'test'
            }
        ],
        container: '#container',
        offset: {
            x: 0,
            y: 0
        },
        btn: '#btn'
    }).show();

    var defaultPosition = {
        top: parseFloat(obj.root().css('top')),
        left: parseFloat(obj.root().css('left'))
    };

    obj.destroy();

    obj = $.ui.dropmenu({
        items: [
            {
                text: 'test'
            }
        ],
        container: '#container',
        btn: '#btn',
        offset: {
            x: 3,
            y: 5
        }
    }).show();

    var nowPosition = {
        top: parseFloat(obj.root().css('top')),
        left: parseFloat(obj.root().css('left'))
    };

    approximateEqual(nowPosition.left - defaultPosition.left, 3, 0.5, 'x方向偏差3px');
    approximateEqual(nowPosition.top - defaultPosition.top, 5, 0.5, 'y方向偏差5px');

    start();
});

test("参数 － pos", function(){
    expect(6);
    stop();
    $('<a id="btn">btn</a>').appendTo('#container');
    var obj = $.ui.dropmenu({
        items: [
            {
                text: 'test'
            }
        ],
        container: '#container',
        btn: '#btn'
    }).show();
    ok($('#btn').offset().top < obj.root().offset().top, "dropmenu的位置默认在button位置下方.");

    obj.destroy();

    obj = $.ui.dropmenu({
        items: [
            {
                text: 'test'
            }
        ],
        container: '#container',
        btn: '#btn',
        pos: 'down'
    }).show();
    ok($('#btn').offset().top < obj.root().offset().top, "dropmenu的位置被设置在button位置下方.");
    obj.destroy();

    obj = $.ui.dropmenu({
        items: [
            {
                text: 'test'
            }
        ],
        container: '#container',
        btn: '#btn',
        pos: 'up'
    }).show();
    ok($('#btn').offset().top > obj.root().offset().top, "dropmenu的位置被设置在button位置上方.");
    obj.destroy();

    $('#container').css({
        position:'absolute',
        left: 0,
        top: 0,
        width: window.innerWidth,
        height: window.innerHeight,
        padding: '0'
    });
    $('#btn').css({
        position: 'absolute',
        top: 0,
        left: 100
    });
    obj = $.ui.dropmenu({
        items: [
            {
                text: 'test'
            }
        ],
        container: '#container',
        btn: '#btn',
        pos: 'auto'
    }).show();
    ok($('#btn').offset().top < obj.root().offset().top, "dropmenu的位置当前在button位置下方.");
    $('#btn').css({
        top: 'auto',
        bottom: 0
    });
    obj.hide();//.show();
    ok($('#btn').offset().top > obj.root().offset().top, "dropmenu的位置当前在button位置上方.");

    $('#btn').css({
        top: '50%',
        bottom: 'auto'
    });
    obj.hide().show();
    ok($('#btn').offset().top < obj.root().offset().top, "dropmenu的位置当前在button位置下方.");

    start();
});



test("参数 － direction", function(){
    expect(2);
    stop();
    $('<a id="btn">btn</a>').appendTo('#container');
    var obj = $.ui.dropmenu({
        items: [
            {
                text: 'test'
            },
            {
                text: 'test2'
            }
        ],
        container: '#container',
        btn: '#btn'
    }).show();

    var items = $('ul.ui-dropmenu-items li', obj.root()),
        pos1 = items.first().offset(),
        pos2 = items.eq(1).offset();

    ok(pos1.left == pos2.left && pos1.top != pos2.top, "item1, item2默认是垂直排列的");

    obj.destroy();

    obj = $.ui.dropmenu({
        items: [
            {
                text: 'test'
            },
            {
                text: 'test2'
            }
        ],
        container: '#container',
        btn: '#btn',
        direction: 'horizontal'
    }).show();

    items = $('ul.ui-dropmenu-items li', obj.root());
    pos1 = items.first().offset();
    pos2 = items.eq(1).offset();

    ok(pos1.left != pos2.left && pos1.top == pos2.top, "item1, item2被设置成是水平排列的");
    obj.destroy();

    start();
});

test("参数 － arrow", function(){
    expect(2);
    stop();
    $('<a id="btn">btn</a>').appendTo('#container');
    var obj = $.ui.dropmenu({
        items: [
            {
                text: 'test'
            }
        ],
        container: '#container',
        btn: '#btn'
    }).show();

    ok(obj.root().find('.ui-dropmenu-arrow').length, "此dropmenu默认有arrow");
    obj.destroy();

    obj = $.ui.dropmenu({
        items: [
            {
                text: 'test'
            }
        ],
        container: '#container',
        btn: '#btn',
        arrow: false
    }).show();

    ok(!obj.root().find('.ui-dropmenu-arrow').length, "此dropmenu被设置成没有arrow");
    obj.destroy();
    start();
});

test("参数 － arrowpos", function(){
    expect(1);
    stop();
    $('<a id="btn">btn</a>').appendTo('#container');
    var obj = $.ui.dropmenu({
        items: [
            {
                text: 'test'
            }
        ],
        container: '#container',
        align: 'left',
        btn: '#btn',
        arrowPos: {
            left:'auto',
            right: 0
        }
    }).show();

    var $arrow = obj.root().find('.ui-dropmenu-arrow'),
        pos1 = obj.root().offset(),
        pos2 = $arrow.offset();

    approximateEqual(pos1.right, pos2.right, 1, "arrow被设置到了dropmenu的最右边。");

    obj.destroy();
    start();
});

test("参数 － autoClose", function(){
    expect(3);
    stop();
    $('<a id="btn">btn</a>').appendTo('#container');
    var obj = $.ui.dropmenu({
        items: [
            {
                text: 'test'
            }
        ],
        container: '#container',
        btn: '#btn',
        autoClose: true
    }).show();

    ok(obj.data('_isShow'), '当前是显示的');

    ua.click(obj.root().find('ul.ui-dropmenu-items li').get(0));
    ok(obj.data('_isShow'), '点击本身，还应该是显示的');

    ua.click(document.body);
    ok(!obj.data('_isShow'), '点击其他地方，现在是关闭的');

    obj.destroy();
    start();
});

test("参数 － items", function(){
    expect(7);
    stop();
    $('<a id="btn">btn</a>').appendTo('#container');
    var obj = $.ui.dropmenu({
        items: [
            {
                text: 'test1',
                click: function(e){
                    ok(true, 'item1的click触发了')
                }
            },
            {
                icon: 'home'
            },
            {
                text: 'test3',
                icon: 'delete'
            },
            {
                text: 'test4',
                href: 'http://www.baidu.com'
            }
        ],
        container: '#container',
        btn: '#btn'
    }).show();

    var items = obj.root().find('ul.ui-dropmenu-items li');
    equals(items.length, 4, '当前是4个items');
    equals(items.eq(0).find('a').text(), 'test1', 'item1: 文字正确');
    equals(items.eq(1).find('.ui-icon').length, 1, 'item2: 有icon');
    equals(items.eq(2).find('.ui-icon').length, 1, 'item3: 有icon');
    equals(items.eq(2).find('a').text(), "test3", 'item3: 且文字正确n');

    ua.click(items.eq(0).find('a').get(0));

    $('#container').delegate('a', 'click', function(e){
        equals(this.href, "http://www.baidu.com/", "href设置正确");
        e.preventDefault();
    });

    ua.click(items.eq(3).find('a').get(0));

    obj.destroy();
    start();
});

test("参数 － cacheParentOffset", function(){
    expect(2);
    stop();
    $('<div id="dropmenuWrap" style="position:relative;"></div>').appendTo('#container');
    $('<a id="btn">btn</a>').appendTo('#container');
    var obj = $.ui.dropmenu({
        items: [
            {
                text: 'test'
            }
        ],
        container: '#dropmenuWrap',
        btn: '#btn',
        autoClose: true
    }).show();

    var pos1 = obj.root().offset();

    obj.hide();

    $('#dropmenuWrap').css({
        top: 100
    });

    var pos2 = obj.show().root().offset();

    ok(pos1.top != pos2.top, "父级的位置被缓存了, 所以位置不对");

    obj.destroy();

    obj = $.ui.dropmenu({
        items: [
            {
                text: 'test'
            }
        ],
        container: '#dropmenuWrap',
        btn: '#btn',
        cacheParentOffset: false
    }).show();

    pos1 = obj.root().offset();

    obj.hide();

    $('#dropmenuWrap').css({
        top: 0
    });

    pos2 = obj.show().root().offset();

    ok(pos1.top == pos2.top, "父级的位置没有被缓存了，位置应该是一致的");

    obj.destroy();

    start();
});

test("参数 － container", function(){
    expect(2);
    stop();
    $('<div id="dropmenuWrap" style="position:relative;"></div>').appendTo('#container');
    $('<a id="btn">btn</a>').appendTo('#container');
    var obj = $.ui.dropmenu({
        items: [
            {
                text: 'test'
            }
        ],
        btn: '#btn',
        autoClose: true
    }).show();

    ok(obj.root().parent().is('body'), '如果不设置container父级为body');
    obj.destroy();

    obj = $.ui.dropmenu({
        items: [
            {
                text: 'test'
            }
        ],
        btn: '#btn',
        autoClose: true,
        container: '#container'
    }).show();

    ok(obj.root().parent().is('#container'), 'container设置正确');
    obj.destroy();
    start();
});

test("多实例", function(){
    expect(3);
    stop();
    $('<a id="btn">btn</a>').appendTo('#container');
    $('<a id="btn2">btn</a>').appendTo('#container');
    var obj = $.ui.dropmenu({
        items: [
            {
                text: 'test'
            }
        ],
        btn: '#btn',
        autoClose: false,
        container: '#container'
    }), obj2 = $.ui.dropmenu({
        items: [
            {
                text: 'test2'
            }
        ],
        btn: '#btn2',
        autoClose: false,
        container: '#container'
    });
    $('#btn').trigger('click');
    ok(obj.data('_isShow') && !obj2.data('_isShow'), '点击btn，把第一个dropmenu显示出来了');

    $('#btn2').trigger('click');
    ok(obj.data('_isShow') && obj2.data('_isShow'), '点击btn2，把第二个dropmenu也显示出来了');

    $('#btn').trigger('click');
    ok(!obj.data('_isShow') && obj2.data('_isShow'), '点击btn，把第一个dropmenu隐藏了，但第二个dropmenu还是显示的');

    obj.destroy();
    obj2.destroy();

    start();
});

test("显示", function(){
 ok(true, "已在 参数 － pos 涉及了！");
});

test("基本操作", function(){
    expect(7);
    stop();
    $('<div id="dropmenuWrap" style="position:relative;"></div>').appendTo('#container');
    $('<a id="btn">btn</a>').appendTo('#container');
    $('<a id="btn2">btn</a>').appendTo('#container');
    var obj = $.ui.dropmenu({
        items: [
            {
                text: 'test'
            }
        ],
        btn: '#btn'
    });

    var obj2 = $.ui.dropmenu({
        items: [
            {
                text: 'test'
            }
        ],
        btn: '#btn2'
    });

    ok(obj.root().offset().top<0, "dropmenu默认不可见");
    $('#btn').trigger('click');
    ok(obj.root().offset().top>0, "点击按钮变成可见");
    $('#btn').trigger('click');
    ok(obj.root().offset().top<0, "再次点击按钮变成不可见");

    obj.show();
    ok(obj.root().offset().top>0, "通过show（）方法让dropmenu可见");
    $(document.body).trigger('click');
    ok(obj.root().offset().top<0, "点击空白区，dropmenu不可见");

    obj.show();
    ok(obj.root().offset().top>0, "通过show（）方法让dropmenu可见");
    $('#btn2').trigger('click');
    ok(obj.root().offset().top<0, "点击其他按钮，dropmenu不可见");

    obj.destroy();
    obj2.destroy();
    start();
});

test("方法 － show&hide&toggle", function(){
    expect(7);
    stop();
    $('<a id="btn">btn</a>').appendTo('#container');
    var obj = $.ui.dropmenu({
        items: [
            {
                text: 'test'
            }
        ],
        btn: '#btn',
        autoClose: true,
        container: '#container'
    });

    ok(obj.root().offset().top<0, "dropmenu不可见");
    obj.show();
    ok(obj.root().offset().top>0, "dropmenu可见");
    obj.hide();
    ok(obj.root().offset().top<0, "dropmenu再次不可见");
    obj.toggle();
    ok(obj.root().offset().top>0, "dropmenu再次可见");
    obj.destroy();

    obj = $.ui.dropmenu({
        items: [
            {
                text: 'test'
            }
        ],
        autoClose: true,
        container: '#container'
    });
    ok(obj.root().offset().top<0, "dropmenu不可见");
    obj.show($('#btn'));
    ok(obj.root().offset().top>0, "dropmenu可见");
    ok(obj.data('_btn').filter('#btn').length, '在show的时候传入的btn，被添加到关联里面去了');

    obj.destroy();

    start();
});

test("方法 － bindButton", function(){
    expect(4);
    stop();
    $('<a id="btn">btn</a>').appendTo('#container');
    var obj = $.ui.dropmenu({
        items: [
            {
                text: 'test'
            }
        ],
        autoClose: true,
        container: '#container'
    });

    obj.bindButton($('#btn'));
    ok(obj.data('_btn').filter('#btn').length, "#btn存在于关联中");


    ok(obj.root().offset().top<0, "dropmenu不可见");
    ua.click($('#btn').get(0));
    ok(obj.root().offset().top>0, "dropmenu可见");
    ua.click($('#btn').get(0));
    ok(obj.root().offset().top<0, "dropmenu再次不可见");

    obj.destroy();
    start();
});

test("方法 － destroy",function(){
    ua.destroyTest(function(w,f){
        w.$('body').highlight();//由于highlight在调用的时候会注册全局事件，以便多次其他实例使用，所以这里先让hightlight把全局事件注册以后再来对比。
        var dl1 = w.dt.domLength(w);
        var el1= w.dt.eventLength();

        var obj =  w.$.ui.dropmenu({
            items: [
                {
                    text: 'test'
                }
            ]
        });
        obj.destroy();

        var el2= w.dt.eventLength();
        var ol = w.dt.objLength(obj);
        var dl2 =w.dt.domLength(w);

        equal(dl1,dl2,"The dom is ok");   //测试结果不是100%可靠，可忽略
        equal(el1,el2,"The event is ok");
        ok(ol==0,"The instance is destroy");
        this.finish();
    })
}) ;

test("事件", function(){
    expect(5);
    stop();
    $('<a id="btn">btn</a>').appendTo('#container');
    var obj = $.ui.dropmenu({
        items: [
            {
                text: 'test1',
                click: function(e){
                    ok(true, 'item1的click触发了');
                }
            },
            {
                text: 'test2',
                click: function(e){
                    ok(true, 'item2的click触发了');
                    e.preventDefault();
                }
            }
        ],
        itemClick: function(e, data){
            switch(data.text){
                case 'test1':
                    ok(true, 'item1的itemClick触发了');
                    break;
                case 'test2':
                    ok(false, 'item2的itemClick不应该被触发，因为在item的click里面已经e.preventDefault了');
                    break;
            }
        },
        init: function(){
            ok(true, 'init触发了');
        },
        destroy: function(){
            ok(true, 'destroy触发了');
        },
        btn: '#btn',
        container: '#container'
    });

    var items = obj.root().find('ul.ui-dropmenu-items li');

    ua.click(items.eq(0).find('a').get(0));
    ua.click(items.eq(1).find('a').get(0));

    obj.destroy();
    start();
});