module("webapp/gotop", {
    setup: function(){
        h = top.$J(".runningarea").css("height");
        top.$J(".runningarea").css("height", "600"); //不能让document.documentElement.clientHeight大于window.pageYOffset
    },
    teardown: function(){
        $(".ui-gotop").remove();
        $("#thelist").remove();
        top.$J(".runningarea").css("height", h);
    }
});

(function(){
    enSetup = function(){
        var html = '<ul id="thelist"><div id="scroller" /></ul>';
        $(document.body).append(html);
        var count=0;
        var $el, i;
        $el = $('#scroller');
        for (i = 0; i < 200; i++) {
            $('<li>').html('第' + count + '行(up)').attr('id','li_'+count).css('color','blue').appendTo($el);
            count++;
        }
    };
})();

test("iScrollInstance", function(){
    stop();
    expect(6);
    enSetup();
    ua.loadcss(["reset.css", "webapp/gotop/gotop.css"], function(){
        $("#thelist").css("height", window.innerHeight);
        var s = new iScroll("thelist");
        var gotop = $.ui.gotop($('<div class="ui-gotop">'), {
            iScrollInstance: s,
            afterScroll: function(){
                equal($("#scroller").offset().top, $("#thelist").offset().top, "The page scrolled");
                ok(!ua.isShown(gotop._el[0]), "The gotop hides");
            }
        });
        setTimeout(function(){
            ta.touchstart($("#scroller")[0], {
                touches: [{
                    clientX: 0,
                    clientY: 0
                }]
            });
            ta.touchmove($("#scroller")[0], {
                touches: [{
                    clientX: 0,
                    clientY: -1000
                }]
            });
            setTimeout(function(){
                ta.touchend($("#scroller")[0]);
                setTimeout(function(){
                    approximateEqual(s.y, -1000, "The page scrolled");
                    ok(ua.isShown(gotop._el[0]), "The gotop shows");
                    equals(gotop._el.offset().left, $("html").offset().width - 50 - 10, "The gotop left is right");
                    equals(gotop._el.offset().top, window.innerHeight - 50 - 10, "The gotop top is right"); //位置相对于整个页面没有变
                    ua.click(gotop._el[0]); //click gotop
                    start();
                }, 300);
            }, 400);
        }, 100);
    });
});
test("iScrollInstance", function(){
    stop();
});