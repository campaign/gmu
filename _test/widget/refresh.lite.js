module("widget/refresh.lite",{
    setup:function () {
        var html = '<div class="wrapper">' +
            '<ul class="data-list">' +
            '<li>测试数据1</li>' +
            '<li>测试数据2</li>' +
            '<li>测试数据3</li>' +
            '<li>测试数据4</li>' +
            '<li>测试数据5</li>' +
            '<li>测试数据6</li>' +
            '<li>测试数据7</li>' +
            '<li>测试数据8</li>' +
            '<li>测试数据9</li>' +
            '<li>测试数据10</li>' +
            '</ul> ' +
            '</div> ';

        $('body').append(html);
    },
    teardown: function () {
        $('.wrapper').remove();
    }
});

function createDom (dir, $wrapper, w) {
    var w = w || window,
    	$wrapper = $wrapper || w.$('.wrapper'),
        upBtn = '<div class="ui-refresh-up"></div> ',
        downBtn = '<div class="ui-refresh-down"></div> ';
    switch (dir) {
        case 'up':
            $wrapper.prepend(upBtn);
            break;
        case 'down':
            $wrapper.append(downBtn);
            break;
        case 'both':
            $wrapper.prepend(upBtn);
            $wrapper.append(downBtn);
            break;
    }
};

//test
test("只为加载css用",function(){
    expect(1);
    stop();
    ua.loadcss(["reset.css",  "loading.default.css", "widget/refresh/refresh.default.css"], function(){
        ok(true, '样式加载进来了！');
        start();
    });
});

test('参数options:ready', function () {
    createDom('both');
    expect(1);
    stop();

    var $wrapper = $('.wrapper'),
        refresh = $wrapper.refresh({
            ready: function (dir, type) {
                ok(true, 'ready is triggered');
                start();
            }
        }).refresh('this'),
        target = $wrapper.get(0);

    refresh.data('threshold',-5);
    setTimeout(function(){
        var l = $(target).offset().left+10;
        var t = $(target).offset().top-10;

        ta.touchstart(target, {
            touches:[{
                pageX: l,
                pageY: t
            }]
        });
        ta.touchmove(target, {
            touches:[{
                pageX: l,
                pageY: t-100
            }]
        });
        ta.touchend(target);
    }, 500);
});

test("参数options - statechange", function(){
    createDom('both');
    expect(5);
    stop();

    var $wrapper = $('.wrapper'),
        lis = $wrapper.find('li'),
        count = 0,
        refresh = $wrapper.refresh({
            statechange: function(e, $btn, state, dir){
                count++;
                switch(state){
                    case 'beforeload':
                        ok(true, "refresh即将加载！方向:"+dir);
                        break;
                    case 'loaded':
                        ok(true, "refresh取消加载！方向:"+dir);
                        break;
                    case 'loading':
                        ok(true, "refresh正在加载！方向:"+dir);
                        break;
                    case 'disable':
                        ok(true, "refresh被禁用了！方向:"+dir);
                        break;
                    default:
                        break;
                }
                if(count>=5){
                    start();
                }
            }
        }).refresh('this'),
        target = $wrapper.get(0);
    refresh.data('threshold',-5);

    target.scrollTop = 0;

    setTimeout(function(){
        var l = $(target).offset().left + 10;
        var t = $(target).offset().top -10;
        ta.touchstart(target, {
            touches:[{
                pageX: l,
                pageY: t
            }]
        });
        ta.touchmove(target, {
            touches:[{
                pageX: l,
                pageY: t-200
            }]
        });

        ta.touchend(target);

        setTimeout(function(){
            refresh.afterDataLoading();
            refresh.disable();
        }, 500);
    }, 1000);
});

test("公共方法 － enable&disable", function(){
    createDom('both');
    expect(2);
    stop();

    var $wrapper = $('.wrapper'),
        lis = $wrapper.find('li'),
        count = 0,
        refresh = $wrapper.refresh({
            ready: function(){
                ok(true, '开始加载。。');
            }
        }).refresh('this'),
        target = $wrapper.get(0);

    refresh.data('threshold',-5);

    setTimeout(function(){
        var l = $(target).offset().left+10;
        var t = $(target).offset().top-10;
        target.scrollTop = 0;
        ta.touchstart(target, {
            touches:[{
                pageX: l,
                pageY: t
            }]
        });
        ta.touchmove(target, {
            touches:[{
                pageX: l,
                pageY: t -200
            }]
        });

        ta.touchend(target);//第一次，默认非diabled，所以ready会触发。


        setTimeout(function(){
            refresh.afterDataLoading();
            refresh.disable();

            ta.touchstart(target, {
                touches:[{
                    pageX: l,
                    pageY: t
                }]
            });
            ta.touchmove(target, {
                touches:[{
                    pageX: l,
                    pageY: t -200
                }]
            });

            ta.touchend(target);//第一次，默认非diabled，所以ready会触发。

            setTimeout(function(){

                refresh.enable();
                target.scrollTop = 0;

                ta.touchstart(target, {
                    touches:[{
                        pageX: l,
                        pageY: t
                    }]
                });
                ta.touchmove(target, {
                    touches:[{
                        pageX: l,
                        pageY: t -200
                    }]
                });

                ta.touchend(target);

                setTimeout(function(){
                    start();
                }, 1000);

            }, 500);
        }, 500);

    }, 1000);
});

test('参数disablePlugin:true', function () {
    createDom('both');
    expect(1);
    stop();

    var $wrapper = $('.wrapper'),
        refresh = $wrapper.refresh({
        	disablePlugin: true,
            ready: function (dir, type) {
                ok(true, 'ready is triggered');
            }
        }).refresh('this'),
        target = $wrapper.get(0);

   refresh.data('threshold',-5);
   setTimeout(function(){
        var l = $(target).offset().left+10;
        var t = $(target).offset().top-10;

        ta.touchstart(target, {
            touches:[{
                pageX: l,
                pageY: t
            }]
        });
        ta.touchmove(target, {
            touches:[{
                pageX: l,
                pageY: t-100
            }]
        });
        ta.touchend(target);
        
        setTimeout(function(){
        	ok(true);
        	start();
        }, 300);
    }, 500);
});

test("destroy", function(){
    ua.destroyTest(function(w,f){
    	var dl1 = w.dt.domLength(w);
        var el1= w.dt.eventLength();

    	var html = '<div class="wrapper"><ul class="data-list"><li>测试数据1</li></ul></div>';
    	w.$('body').append(html);
    	createDom('up', null, w);
    	
        var refresh = w.$(".wrapper").refresh("this");
        refresh.destroy();

        var el2= w.dt.eventLength();
        var ol = w.dt.objLength(refresh);
        var dl2 =w.dt.domLength(w);

        equal(dl1,dl2 - 1,"The dom is ok");
        equal(el1,el2,"The event is ok");
        ok(ol==0,"The gotop is destroy");
        this.finish();
    });
});
