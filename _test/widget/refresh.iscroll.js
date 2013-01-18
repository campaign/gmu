module("widget/refresh.iscroll",{
    setup:function () {
        var html = '<div class="wrapper" style="height: 150px;">' +
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
        $('.ui-refresh-wrapper').remove();
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
    ua.loadcss(["reset.css",  "loading.default.css", "widget/refresh/refresh.default.css", "widget/refresh/refresh.iscroll.default.css"], function(){
        ok(true, '样式加载进来了！');
        start();
    });
});

test('参数options:ready -up', function () {
    createDom('up');
    expect(1);
    stop();

    var $wrapper = $('.wrapper'),
        lis = $wrapper.find('li'),
        refresh = $wrapper.refresh({
            ready: function (dir, type) {
                ok(true, 'ready is triggered');
                this.afterDataLoading();
                setTimeout(function(){
                	refresh.destroy();
                    start();
                }, 100);
            }
        }).refresh('this'),
        target = lis.get(0);

    setTimeout(function(){
        ta.touchstart(target, {
            touches: [{
                target:target,
                pageX: 0,
                pageY: 0
            }]
        });

        ta.touchmove(target, {
            touches: [{
                target:target,
                pageX: 0,
                pageY: 200
            }]
        });

        ta.touchend(target);
        
        //PC
        ua.mousedown(target, {
            clientX: 0,
            clientY: 0
        });

        ua.mousemove(target, {
        	clientX: 0,
            clientY: 200
        });

        ua.mouseup(target);
    }, 1000);
});

test('参数options:ready - down', function () {
    createDom('down');
    expect(1);
    stop();

    var $wrapper = $('.wrapper'),
        lis = $wrapper.find('li'),
        refresh = $wrapper.refresh({
            topOffset: 0,
            ready: function (dir, type) {
                ok(true, 'ready is triggered');
                this.afterDataLoading();
                setTimeout(function(){
                	refresh.destroy();
                    start();
                }, 100);
            }
        }).refresh('this'),
        target = lis.get(7);

    setTimeout(function(){
        var l = $(target).offset().left;
        var t = $(target).offset().top;
        ta.touchstart(target, {
            touches:[{
                pageX: l,
                pageY: t
            }]
        });
        ta.touchmove(target, {
            touches:[{
                pageX: l,
                pageY: t - 200
            }]
        });
        ta.touchend(target);
        //PC
        ua.mousedown(target, {
        	clientX: l,
        	clientY: t
        });

        ua.mousemove(target, {
        	clientX: l,
        	clientY: t - 200
        });

        ua.mouseup(target);
    }, 1000);
});

test("参数options - statechange", function(){
    createDom('both');
    expect(12);
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
                if(count>=12){
                	setTimeout(function(){
                		refresh.destroy();
                        start();
                	}, 100);
                }
            }
        }).refresh('this'),
        target = lis.get(0);

    setTimeout(function(){
        var l = $(target).offset().left;
        var t = $(target).offset().top;
        ta.touchstart(target, {
            touches:[{
                pageX: l,
                pageY: t
            }]
        });
        ta.touchmove(target, {
            touches:[{
                pageX: l,
                pageY: t + 200
            }]
        });

        ta.touchmove(target, {
            touches:[{
                pageX: l,
                pageY: t + 150
            }]
        });
        ta.touchend(target);
        //PC
        ua.mousedown(target, {
        	clientX: l,
        	clientY: t
        });

        ua.mousemove(target, {
        	clientX: l,
        	clientY: t + 200
        });
        
        ua.mousemove(target, {
        	clientX: l,
        	clientY: t + 150
        });

        ua.mouseup(target);
        
        ta.touchstart(target, {
            touches:[{
                pageX: l,
                pageY: t
            }]
        });
        ta.touchmove(target, {
            touches:[{
                pageX: l,
                pageY: t + 200
            }]
        });
        ta.touchend(target);
        //PC
        ua.mousedown(target, {
        	clientX: l,
        	clientY: t
        });

        ua.mousemove(target, {
        	clientX: l,
        	clientY: t + 200
        });

        ua.mouseup(target);

       setTimeout(function(){
           refresh.afterDataLoading();
           ta.touchstart(target, {
               touches:[{
                   pageX: l,
                   pageY: t
               }]
           });
           ta.touchmove(target, {
               touches:[{
                   pageX: l,
                   pageY: t - 200
               }]
           });

           ta.touchmove(target, {
               touches:[{
                   pageX: l,
                   pageY: t - 150
               }]
           });
           ta.touchend(target);
           //PC
           ua.mousedown(target, {
        	   clientX: l,
        	   clientY: t
           });

           ua.mousemove(target, {
        	   clientX: l,
        	   clientY: t - 200
           });
           
           ua.mousemove(target, {
        	   clientX: l,
               pageY: t - 150
           });

           ua.mouseup(target);

           ta.touchstart(target, {
               touches:[{
                   pageX: l,
                   pageY: t
               }]
           });
           ta.touchmove(target, {
               touches:[{
                   pageX: l,
                   pageY: t - 200
               }]
           });
           ta.touchend(target);
           
           //PC
           ua.mousedown(target, {
        	   clientX: l,
        	   clientY: t
           });

           ua.mousemove(target, {
        	   clientX: l,
               clientY: t - 200
           });
           
           ua.mouseup(target);
           
           setTimeout(function(){
               refresh.afterDataLoading();
               setTimeout(function(){
                   refresh.disable();
               }, 200);
           }, 500);
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
        target = lis.get(0);

    setTimeout(function(){
        var l = $(target).offset().left;
        var t = $(target).offset().top;
        ta.touchstart(target, {
            touches:[{
                pageX: l,
                pageY: t
            }]
        });
        ta.touchmove(target, {
            touches:[{
                pageX: l,
                pageY: t + 200
            }]
        });

        ta.touchend(target);//第一次，默认非diabled，所以ready会触发。
        //PC
        ua.mousedown(target, {
     	   clientX: l,
     	   clientY: t
        });

        ua.mousemove(target, {
     	   clientX: l,
            clientY: t + 200
        });
        
        ua.mouseup(target);


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
                    pageY: t + 200
                }]
            });

            ta.touchend(target);//第一次，默认非diabled，所以ready会触发。
            //PC
            ua.mousedown(target, {
         	   clientX: l,
         	   clientY: t
            });

            ua.mousemove(target, {
         	   clientX: l,
                clientY: t + 200
            });
            
            ua.mouseup(target);

            setTimeout(function(){

                refresh.enable();

                ta.touchstart(target, {
                    touches:[{
                        pageX: l,
                        pageY: t
                    }]
                });
                ta.touchmove(target, {
                    touches:[{
                        pageX: l,
                        pageY: t + 200
                    }]
                });

                ta.touchend(target);
                //PC
                ua.mousedown(target, {
             	   clientX: l,
             	   clientY: t
                });

                ua.mousemove(target, {
             	   clientX: l,
                    clientY: t + 200
                });
                
                ua.mouseup(target);

                setTimeout(function(){
                	refresh.destroy();
                    start();
                }, 1000);

            }, 500);
        }, 500);

    }, 1000);
});

test('disablePlugin', function () {
    createDom('up');
    expect(1);
    stop();

    var $wrapper = $('.wrapper'),
        lis = $wrapper.find('li'),
        refresh = $wrapper.refresh({
        	disablePlugin: true,
            ready: function (dir, type) {
                ok(true, 'ready is triggered');
            }
        }).refresh('this'),
        target = lis.get(0);

    setTimeout(function(){
        ta.touchstart(target, {
            touches: [{
                target:target,
                pageX: 0,
                pageY: 0
            }]
        });

        ta.touchmove(target, {
            touches: [{
                target:target,
                pageX: 0,
                pageY: 200
            }]
        });

        ta.touchend(target);
        
        //PC
        ua.mousedown(target, {
            clientX: 0,
            clientY: 0
        });

        ua.mousemove(target, {
        	clientX: 0,
            clientY: 200
        });

        ua.mouseup(target);
        
        setTimeout(function(){
        	equals(refresh._data.useTransition, undefined, "disable plugin");
        	refresh.destroy();
        	start();
        }, 300);
    }, 1000);
});

test("destroy", function(){
	$(".wrapper").remove();
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

        equal(dl1,dl2,"The dom is ok");
        equal(el1,el2,"The event is ok");
        ok(ol==0,"The gotop is destroy");
        this.finish();
    });
});