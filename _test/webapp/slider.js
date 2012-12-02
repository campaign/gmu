
/**
 * auth: jiangshuguang
 */
module("webapp/slider",{

    setup:function(){
        content=[
            {
                href: "#",
                pic: "../../webapp/css/slider/image1.png",
                title: "让Coron的太阳把自己晒黑—小天..."
            },

            {
                href: "#",
                pic: "../../webapp/css/slider/image2.png",
                title: "让Coron的太阳把自己晒黑—小天..."
            },
            {
                href: "#",
                pic: "../../webapp/css/slider/image3.png",
                title: "让Coron的太阳把自己晒黑—小天..."
            },
            {
                href: "#",
                pic: "../../webapp/css/slider/image4.png",
                title: "让Coron的太阳把自己晒黑—小天..."
            }
        ];

        content3=[
            {
                href: "#",
                pic: "../../webapp/css/slider/image1.png",
                title: "图片1"
            },

            {
                href: "http://www.baidu.com",
                pic: "../../webapp/css/slider/image2.png",
                title: "图片2"
            },
            {
                href: "#",
                pic: "../../webapp/css/slider/image3.png",
                title: "图片3"
            }
        ];

        content2=[
            {
                href: "http://www.baidu.com",
                pic: "../../webapp/css/slider/image1.png",
                title: "图片1"
            },

            {
                href: "#",
                pic: "../../webapp/css/slider/image2.png",
                title: "图片2"
            }
        ];
        content1=[
            {
                href: "http://www.baidu.com",
                pic: "../../webapp/css/slider/image1.png",
                title: "让Coron的太阳把自己晒黑—小天..."
            }
        ];
        content4=[
            {
                href: "http://www.baidu.com",
                pic: "../../webapp/css/slider/image1.png",
                title: "图片1"
            },

            {
                pic: "../../webapp/css/slider/image2.png"
            }
        ];

        $("body").append("<div id='ui-slider-test'></div>");
        $("#ui-slider-test").css("height","148px").css("overflow","hidden");
    }
});

(function(){
    isAndroid4= !!/Android 4/.test(navigator.userAgent);
    slider_time = isAndroid4?300:100;
    isIos5 =($.os.ios && ($.os.version.match(/^\d+/))[0]==5)?true:false;
})();

function setMod(){
    $("body").append(
        '<div id="slider-container-2" >'+
            '<div class="ui-slider-wheel" >' +
            '<div class="ui-slider-group">' +
            '<div class="ui-slider-item"><a href="#"><img lazyload="../../webapp/css/slider/image1.png"></a><p>图片1</p></div>'+
            '<div class="ui-slider-item"><a href="#"><img lazyload="../../webapp/css/slider/image2.png"></a><p>图片2</p></div>'+
            '<div class="ui-slider-item"><a href="#"><img lazyload="../../webapp/css/slider/image3.png"></a><p>图片3</p></div>'+
            '</div></div>'+
            '<p class="ui-slider-items-dots"><b class="ui-slider-dot-select"></b><b></b><b></b></p> '+
            '<span class="ui-slider-pre"></span><span class="ui-slider-next"></span>'+
            '</div>'
    );
}

test("el(selector)&默认参数",function(){
    expect(21);
    stop();
    ua.loadcss(["reset.css", "webapp/slider/slider.css"], function(){
        var slider = $.ui.slider("#ui-slider-test", {
            content: content3
        });

        equals(slider._data.setup,false,"The default setup is right");
        equals(slider._data.container,false,"The default container is right");
        equals(slider._data.index,0,"The default index is right");
        equals(slider._data.imgInit,2,"The default imgInit is right");
        equals(slider._data.imgZoom,false,"The default imgZoom is right");
        equals(slider._data.boundSpring,false,"The default boundSpring is right");
        equals(slider._data.springBack,true,"The default springBack is right");
        equals(slider._data.springBackDis,15,"The default springBackDis is right");
        equals(slider._data.autoPlay,true,"The default autoPlay is right");
        equals(slider._data.animationTime,400,"The default animationTime is right");
        equals(slider._data.showArr,true,"The default showArr is right");
        equals(slider._data.showDot,true,"The default showDot is right");
        equals(slider._data.onclick,"","The default onclick is right");
        equals(slider._data.onslide,"","The default onslide is right");
        equals(slider._data.onslideend,"","The default onslideEnd is right");

        equals(slider._el.attr("class"),"ui-slider","The root class is right");
        setTimeout(function(){
            ok(ua.isShown($(".ui-slider-wheel")[0]), "The slider shows");
            equals($(slider._el).children().attr("class"),"ui-slider-wheel","The child class is right");
            equals($($(".ui-slider-item")[0]).offset().left,$('.ui-slider').offset().left,"The left right");
            equals($($(".ui-slider-item")[0]).offset().top,$(".ui-slider").offset().top,"The top right");
            equals($('.ui-slider-group').offset().height,148,"The height is right");
            slider.destroy();
            start();
        },50);
    });
});


test("container", function() {
    expect(7);
    $("#ui-slider-test")&&$("#ui-slider-test").remove();
    $("body").append("<div id='slider-container'></div>");
    $("#slider-container").css("height","148px").css("overflow","hidden");

    var slider = $.ui.slider({
        container: "#slider-container",
        content: content3
    });
    equals(slider._data.container, "#slider-container", "The _data is right");
    ok(ua.isShown(slider._el[0]), "The carousel shows");
    equals(slider._el.offset().left, $("#slider-container").offset().left, "The left is right");
    equals(slider._el.offset().top, $("#slider-container").offset().top, "The top is right");
    equals(slider._el.offset().width, $("#slider-container").offset().width, "The width is right");
    equals(slider._el.offset().height, 148, "The height is right");
    equals(slider._el.attr("class"), "ui-slider", "The el is right");
    slider.destroy();
    $("#slider-container").remove();
});

test("el(zepto) & index为设定值",function(){
    expect(5);
    $("#ui-slider-test")&&$("#ui-slider-test").remove();
    stop();
    var i=0;
    var slider = $.ui.slider("<div id='slider_1'></div>", {
        content: content3,
        animationTime:1,
        index:1,
        onslideend:function(){
//            i++;
//            if(i==2){
//                equals($($('.ui-slider-item')[2]).offset().left,$('#slider_1').offset().left,"显示第三张图片");
//            }
//            equals($($('.ui-slider-item')[2]).offset().left,$('#slider_1').offset().left,"显示第三张图片");
//            setTimeout(function(){
//                slider.destroy();
//                start();
//            },10);
//            slider.destroy();
//            start();
        }
    });
    var width = $('#slider_1').width();
    var height = $('#slider_1').height();
    equals(slider._data.index,1,"The index is true");
    setTimeout(function(){
        equals($('.ui-slider-item').eq(1).offset().left,$('#slider_1').offset().left,"初始显示第二张图片");
        equals($('.ui-slider-item')[1].offsetWidth,width,"The width is right");
        equals($('.ui-slider-item')[1].offsetHeight,height,"The height is right");
        slider.next();
        setTimeout(function(){
            equals($($('.ui-slider-item')[2]).offset().left,$('#slider_1').offset().left,"显示第三张图片");
            slider.destroy();
            start();
        },slider_time);
    },slider_time);

});

test("content", function() {
    expect(11);
    var slider = $.ui.slider("#ui-slider-test", {
        content: content4,
        autoPlay: false
    });
    var bottom = $("#ui-slider-test .ui-slider-wheel .ui-slider-group .ui-slider-item .ui-slider-items-bottom");
    equals(bottom[0].childNodes[0].tagName.toLowerCase(), "a", "The smallpic is right");
    equals(bottom[0].childNodes[0].href, "http://www.baidu.com/", "The smallpic is right");
    equals(bottom[0].childNodes[0].childNodes[0].tagName.toLowerCase(), "img", "The smallpic is right");
    equals(bottom[0].childNodes[0].childNodes[0].getAttribute("src"), "../../webapp/css/slider/smallpic1.jpg", "The smallpic is right");
    equals(bottom[0].childNodes[1].tagName.toLowerCase(), "a", "The title is right");
    equals(bottom[0].childNodes[1].href, "http://www.baidu.com/", "The title is right");
    equals(bottom[0].childNodes[1].childNodes[0].tagName.toLowerCase(), "span", "The title is right");
    equals(bottom[0].childNodes[1].childNodes[0].textContent, "图片1", "The title is right");
    equals(bottom[0].childNodes[3].tagName.toLowerCase(), "span", "The subTitle is right");
    equals(bottom[0].childNodes[3].childNodes[0].textContent, "小图片1", "The title is right");

    equals(bottom[1].childNodes.length, 0, "No title, subTitle, smallPic");
    slider.destroy();
});

test("imgInit=0 (加载全部的图片) & 检查是否影响播放", function() {
    stop();
    expect(11);
    var i=0;
    var slider = $.ui.slider("#ui-slider-test", {
        content: content3,
        imgInit:0,
        animationTime:1,
        autoPlayTime:10000,
        autoPlay:false,
        onslideend:function(){
            i++;
            if(i==1){
                equals($('.ui-slider-item').eq(1).offset().left,$('#ui-slider-test').offset().left,"显示第二张图片");
                slider.next();
            }else if(i==2){
                equals($($('.ui-slider-item')[2]).offset().left,$('#ui-slider-test').offset().left,"显示第三张图片");
                slider.next();
            }else if(i==3){
                equals($($('.ui-slider-item')[3]).offset().left,$('#ui-slider-test').offset().left,"显示第一张图片");
                slider.next();
            }else{
                equals($($('.ui-slider-item')[4]).offset().left,$('#ui-slider-test').offset().left,"显示第二张图片");
                setTimeout(function(){
                    slider.destroy();
                    start();
                },10);
            }
        }
    });
    equals($($('.ui-slider-item')[0]).offset().left,$('#ui-slider-test').offset().left,"初始显示第一张图片");
    equals($($(".ui-slider-lazyload")[0]).attr("lazyload"), "../../webapp/css/slider/image1.png", "The lazyload is right");
    equals($($(".ui-slider-lazyload")[0]).attr("src"), "../../webapp/css/slider/image1.png", "The src is right");
    equals($($(".ui-slider-lazyload")[1]).attr("lazyload"), "../../webapp/css/slider/image2.png", "The lazyload is right");
    equals($($(".ui-slider-lazyload")[1]).attr("src"), "../../webapp/css/slider/image2.png", "The src is right");
    equals($($(".ui-slider-lazyload")[2]).attr("lazyload"), "../../webapp/css/slider/image3.png", "The lazyload is right");
    equals($($(".ui-slider-lazyload")[2]).attr("src"), "../../webapp/css/slider/image3.png", "The src is right");
    slider.next();
});


test("imgInit=1 (加载一张图片)", function() {
    stop();
    expect(28);
    var i=0;
    var slider = $.ui.slider("#ui-slider-test", {
        content: content3,
        imgInit:1,
        animationTime:1,
        onslideend:function(){
            i++;
            if(i==1){
                equals($($('.ui-slider-item')[1]).offset().left,$('#ui-slider-test').offset().left,"显示第二张图片");
                equals($($(".ui-slider-lazyload")[0]).attr("lazyload"), "../../webapp/css/slider/image1.png", "The lazyload is right");
                equals($(".ui-slider-lazyload")[0].getAttribute("src"), "../../webapp/css/slider/image1.png", "The src is right");
                equals($($(".ui-slider-lazyload")[1]).attr("lazyload"), "../../webapp/css/slider/image2.png", "The lazyload is right");
                equals($(".ui-slider-lazyload")[1].getAttribute("src"), "../../webapp/css/slider/image2.png", "The src is right");
                equals($($(".ui-slider-lazyload")[2]).attr("lazyload"), "../../webapp/css/slider/image3.png", "The lazyload is right");
                equals($(".ui-slider-lazyload")[2].getAttribute("src"), null, "The src is right");
                slider.pre();
            }else if(i==2){
                equals($($('.ui-slider-item')[0]).offset().left,$('#ui-slider-test').offset().left,"显示第一张图片");
                equals($($(".ui-slider-lazyload")[0]).attr("lazyload"), "../../webapp/css/slider/image1.png", "The lazyload is right");
                equals($(".ui-slider-lazyload")[0].getAttribute("src"), "../../webapp/css/slider/image1.png", "The src is right");
                equals($($(".ui-slider-lazyload")[1]).attr("lazyload"), "../../webapp/css/slider/image2.png", "The lazyload is right");
                equals($(".ui-slider-lazyload")[1].getAttribute("src"), "../../webapp/css/slider/image2.png", "The src is right");
                equals($($(".ui-slider-lazyload")[2]).attr("lazyload"), "../../webapp/css/slider/image3.png", "The lazyload is right");
                setTimeout(function(){
                    equals($(".ui-slider-lazyload")[2].getAttribute("src"), "../../webapp/css/slider/image3.png", "The src is right");
                    slider.pre();
                },10);
            }else{
                equals($($('.ui-slider-item')[2]).offset().left,$('#ui-slider-test').offset().left,"显示第三张图片");
                equals($($(".ui-slider-lazyload")[0]).attr("lazyload"), "../../webapp/css/slider/image1.png", "The lazyload is right");
                equals($(".ui-slider-lazyload")[0].getAttribute("src"), "../../webapp/css/slider/image1.png", "The src is right");
                equals($($(".ui-slider-lazyload")[1]).attr("lazyload"), "../../webapp/css/slider/image2.png", "The lazyload is right");
                equals($(".ui-slider-lazyload")[1].getAttribute("src"), "../../webapp/css/slider/image2.png", "The src is right");
                equals($($(".ui-slider-lazyload")[2]).attr("lazyload"), "../../webapp/css/slider/image3.png", "The lazyload is right");
                equals($(".ui-slider-lazyload")[2].getAttribute("src"), "../../webapp/css/slider/image3.png", "The src is right");
                setTimeout(function(){
                    slider.destroy();
                    start();
                },10);
            }
        }
    });
    equals($($('.ui-slider-item')[0]).offset().left,$('#ui-slider-test').offset().left,"初始显示第一张图片");
    equals($($(".ui-slider-lazyload")[0]).attr("lazyload"), "../../webapp/css/slider/image1.png", "The lazyload is right");
    equals($(".ui-slider-lazyload")[0].getAttribute("src"), "../../webapp/css/slider/image1.png", "The src is right");
    equals($($(".ui-slider-lazyload")[1]).attr("lazyload"), "../../webapp/css/slider/image2.png", "The lazyload is right");
    equals($(".ui-slider-lazyload")[1].getAttribute("src"), null, "The src is right");
    equals($($(".ui-slider-lazyload")[2]).attr("lazyload"), "../../webapp/css/slider/image3.png", "The lazyload is right");
    equals($(".ui-slider-lazyload")[2].getAttribute("src"), null, "The src is right");
    slider.next();
});

test("imgZoom=false",function(){
    expect(10);
    stop();
    var i = 0;
    var time=(isAndroid4?250:50);
    $("#ui-slider-test").css("height",100).css("width",100);
    var slider = $.ui.slider("#ui-slider-test", {
        content: content,
        imgZoom:false,
        animationTime:1,
        onslideend:function(){
            i++;
            if(i==1){
                equals($($('.ui-slider-item')[1]).offset().left,$('#ui-slider-test').offset().left,"显示第二张图片");
                equals($(".ui-slider-lazyload")[1].offsetWidth,320,"The height is right");
                equals($(".ui-slider-lazyload")[1].offsetHeight,148,"The width is right");
                slider.pre();
            }else if(i==2){
                equals($($('.ui-slider-item')[0]).offset().left,$('#ui-slider-test').offset().left,"显示第一张图片");
                equals($(".ui-slider-lazyload")[0].offsetWidth,320,"The height is right");
                equals($(".ui-slider-lazyload")[0].offsetHeight,148,"The width is right");
                setTimeout(function(){
                    slider.destroy();
                    start();
                },20);
            }
        }
    });
    equals(slider._data.imgZoom,false,"The imgClip is right");
    setTimeout(function(){
        equals($($('.ui-slider-item')[0]).offset().left,$('#ui-slider-test').offset().left,"显示第一张图片");
        equals($(".ui-slider-lazyload")[0].offsetWidth,320,"The height is right");
        equals($(".ui-slider-lazyload")[0].offsetHeight,148,"The width is right");
        slider.next();
    },500);
});

test("imgZoom=true 等比例缩放(高度随宽度的比例缩放)",function(){
    expect(10);
    stop();
    var i = 0;
    $("#ui-slider-test").css("height",100).css("width",100);
    var slider = $.ui.slider("#ui-slider-test", {
        content: content,
        imgZoom:true,
        animationTime:1,
        onslideend:function(){
            i++;
            if(i==1){
                equals($($('.ui-slider-item')[1]).offset().left,$('#ui-slider-test').offset().left,"显示第二张图片");
                equals($(".ui-slider-lazyload")[1].offsetWidth,100,"The height is right");
                equals($(".ui-slider-lazyload")[1].offsetHeight,parseInt((100/320)*148),"The width is right");
                slider.pre();
            }else{
                equals($($('.ui-slider-item')[0]).offset().left,$('#ui-slider-test').offset().left,"显示第一张图片");
                equals($(".ui-slider-lazyload")[0].offsetWidth,100,"The height is right");
                equals($(".ui-slider-lazyload")[0].offsetHeight,parseInt((100/320)*148),"The width is right");
                setTimeout(function(){
                    slider.destroy();
                    start();
                },20);
            }
        }
    }) ;
    equals(slider._data.imgZoom,true,"The imgClip is right");
    setTimeout(function(){
        equals($($('.ui-slider-item')[0]).offset().left,$('#ui-slider-test').offset().left,"显示第一张图片");
        equals($(".ui-slider-lazyload")[0].offsetWidth,100,"The height is right");
        equals($(".ui-slider-lazyload")[0].offsetHeight,parseInt((100/320)*148),"The width is right");
        slider.next();
    },600);
});


test("imgZoom=true 等比例缩放(宽度随高度的比例缩放)",function(){
    expect(10);
    stop();
    var i=0;
    $("#ui-slider-test").css("height",100).css("width",300);
    var slider = $.ui.slider("#ui-slider-test", {
        content: content,
        imgZoom:true,
        animationTime:1,
        onslideend:function(){
            i++;
            if(i==1){
                equals($($('.ui-slider-item')[1]).offset().left,$('#ui-slider-test').offset().left,"显示第二张图片");
                equals($(".ui-slider-lazyload")[1].offsetWidth,parseInt((100/148)*320),"The height is right");
                equals($(".ui-slider-lazyload")[1].offsetHeight,100,"The width is right");
                slider.pre();
            }else if(i==2){
                equals($($('.ui-slider-item')[0]).offset().left,$('#ui-slider-test').offset().left,"显示第一张图片");
                equals($(".ui-slider-lazyload")[0].offsetWidth,parseInt((100/148)*320),"The height is right");
                equals($(".ui-slider-lazyload")[0].offsetHeight,100,"The width is right");
                setTimeout(function(){
                    slider.destroy();
                    start();
                },20);
            }
        }
    }) ;
    equals(slider._data.imgZoom,true,"The imgClip is right");
    setTimeout(function(){
        equals($($('.ui-slider-item')[0]).offset().left,$('#ui-slider-test').offset().left,"显示第一张图片");
        equals($(".ui-slider-lazyload")[0].offsetWidth,parseInt((100/148)*320),"The height is right");
        equals($(".ui-slider-lazyload")[0].offsetHeight,100,"The width is right");
        slider.next();
    },600);
});

test("boundSpring=true & autoPlay=true",function(){
    expect(7);
    stop();
    var i = 0;
    var slider = $.ui.slider("#ui-slider-test", {
        content: content3,
        boundSpring:true,
        animationTime:1,
        autoPlay:true,
        autoPlayTime:50,
        onslideend:function(){
            i++;
            if(i==1){
                equals($($('.ui-slider-item')[1]).offset().left,$('#ui-slider-test').offset().left,"显示第二张图片");
            }else if(i==2){
                equals($($('.ui-slider-item')[2]).offset().left,$('#ui-slider-test').offset().left,"显示第三张图片");
            }else if(i==3){
                equals($($('.ui-slider-item')[1]).offset().left,$('#ui-slider-test').offset().left,"显示第二张图片");
            }else{
                equals($($('.ui-slider-item')[0]).offset().left,$('#ui-slider-test').offset().left,"显示第一张图片");
                setTimeout(function(){
                    slider.destroy();
                    start();
                },10);
            }
        }
    }) ;
    equals(slider._data.boundSpring,true,"The boundSpring is right");
    equals(slider._data.autoPlay,true,"The autoPlay is right");
    equals($($('.ui-slider-item')[0]).offset().left,$('#ui-slider-test').offset().left,"显示第一张图片");
});


test("springBack=true & springBackDis & autoPlay=true(判断自动播放是否影响滑动)", function() {
    stop();
    expect(7);
    var time = isAndroid4?300:150;
    var slider = $.ui.slider("#ui-slider-test", {
        content: content,
        autoPlayTime:isAndroid4?400:200,
        autoPlay:true,
        animationTime: 1,
        springBack:true,
        springBackDis:11
    });

    equals(slider._data.springBack,true,"The springBack is right");
    equals(slider._data.springBackDis,11,"The springBackDis is right");
    equals(slider._data.autoPlay,true,"The autoPlay is right");
    equals($($('.ui-slider-item')[0]).offset().left,$(".ui-slider").offset().left,"The left is right");

    ta.touchstart($(".ui-slider-wheel")[0], {
        touches: [{
            clientX: 0,
            clientY: 0
        }]
    });
    ta.touchmove($(".ui-slider-wheel")[0], {
        touches:[{
            clientX: -12,      //   滑动的距离小于springBackDis
            clientY: 0
        }]
    });
    ta.touchend($(".ui-slider-wheel")[0]);

    setTimeout(function(){
        equals($($('.ui-slider-item')[1]).offset().left,$("#ui-slider-test").offset().left,"The picture slide");

        ta.touchstart($(".ui-slider-wheel")[0], {
            touches: [{
                clientX: 0,
                clientY: 0
            }]
        });
        ta.touchmove($(".ui-slider-wheel")[0], {
            touches:[{
                clientX: 10,          //   滑动的距离小于springBackDis
                clientY: 0
            }]
        });
        ta.touchend($(".ui-slider-wheel")[0]);

        setTimeout(function(){
            equals($($('.ui-slider-item')[1]).offset().left,$("#ui-slider-test").offset().left,"The picture not slide");
            ta.touchstart($(".ui-slider-wheel")[0], {
                touches: [{
                    clientX: 0,
                    clientY: 0
                }]
            });
            ta.touchmove($(".ui-slider-wheel")[0], {
                touches:[{
                    clientX: 12,          //   滑动的距离小于springBackDis
                    clientY: 0
                }]
            });
            ta.touchend($(".ui-slider-wheel")[0]);
            setTimeout(function(){
                equals($($('.ui-slider-item')[0]).offset().left,$("#ui-slider-test").offset().left,"The picture not slide");
                slider.destroy();
                start();
            }, time);
        }, time);
    }, time);
});


test("springBack=false & springBackDis ", function() {
    stop();
    expect(7);
    var slider = $.ui.slider("#ui-slider-test", {
        content: content3,
        autoPlay:true,
        animationTime: 1,
        springBack:false,
        springBackDis:100
    });

    equals(slider._data.springBack,false,"The springBack is right");
    equals(slider._data.springBackDis,100,"The springBackDis is right");
    equals(slider._data.autoPlay,true,"The autoPlay is right");
    equals($($('.ui-slider-item')[0]).offset().left,$("#ui-slider-test").offset().left,"The left is right");

    ta.touchstart($(".ui-slider-wheel")[0], {
        touches: [{
            clientX: 0,
            clientY: 0
        }]
    });
    ta.touchmove($(".ui-slider-wheel")[0], {
        touches:[{
            clientX: -10,
            clientY: 0
        }]
    });
    ta.touchend($(".ui-slider-wheel")[0]);

    setTimeout(function(){
        equals($($('.ui-slider-item')[1]).offset().left,$("#ui-slider-test").offset().left,"The picture slide");
        ta.touchstart($(".ui-slider-wheel")[0], {
            touches: [{
                clientX: 0,
                clientY: 0
            }]
        });
        ta.touchmove($(".ui-slider-wheel")[0], {
            touches:[{
                clientX: -10,
                clientY: 0
            }]
        });
        ta.touchend($(".ui-slider-wheel")[0]);

        setTimeout(function(){
            equals($($('.ui-slider-item')[2]).offset().left,$("#ui-slider-test").offset().left,"The picture not slide");
            ta.touchstart($(".ui-slider-wheel")[0], {
                touches: [{
                    clientX: 0,
                    clientY: 0
                }]
            });
            ta.touchmove($(".ui-slider-wheel")[0], {
                touches:[{
                    clientX: 10,
                    clientY: 0
                }]
            });
            ta.touchend($(".ui-slider-wheel")[0]);
            setTimeout(function(){
                equals($($('.ui-slider-item')[1]).offset().left,$("#ui-slider-test").offset().left,"The picture not slide");
                slider.destroy();
                start();
            }, slider_time);
        }, slider_time);
    }, slider_time);
});

test("showArr=false&showDot=false",function(){
    expect(5);
    stop();
    var slider = $.ui.slider("#ui-slider-test", {
        content: content,
        showArr:false,
        showDot:false
    });
    equals(slider._data.showArr,false,"The showArr is true");
    equals(slider._data.showDot,false,"The showDot is true");

    setTimeout(function(){
        equals($(".ui-slider.pre").length,0,"The pre Arrow is not show");
        equals($(".ui-slider-next").length,0,"The next Arrow is not show");
        equals($(".ui-slider-items-dots").length,0,"The dots is not show");
        slider.destroy();
        start();
    },50);
});

test("showArr=true & showDot=true & pre() & next()",function(){
    expect(33);
    stop();
    var i=0;
    var slider = $.ui.slider("#ui-slider-test", {
        content: content3,
        showArr:true,
        showDot:true,
        animationTime:1,
        onslideend:function(){
            i++;
            if(i==1){
                equals($($('.ui-slider-item')[1]).offset().left,$('#ui-slider-test').offset().left,"The left is right");
                equals($(".ui-slider-pre").length,1,"The pre Arrow is show");
                equals($(".ui-slider-next").length,1,"The next Arrow is show");
                equals($('.ui-slider-items-dots').length,1,"The dots is show");
                equals($('.ui-slider-items-dots').children()[1].className,"ui-slider-dot-select","The dots is right");
                ta.tap($(".ui-slider-pre")[0]);
            }else if(i==2){
                equals($($('.ui-slider-item')[0]).offset().left,$('#ui-slider-test').offset().left,"The left is right");
                equals($(".ui-slider-pre").length,1,"The pre Arrow is show");
                equals($(".ui-slider-next").length,1,"The next Arrow is show");
                equals($('.ui-slider-items-dots').length,1,"The dots is show");
                equals($('.ui-slider-items-dots').children()[0].className,"ui-slider-dot-select","The dots is right");
                slider.next();
            }else if(i==3){
                equals($($('.ui-slider-item')[1]).offset().left,$('#ui-slider-test').offset().left,"The left is right");
                equals($(".ui-slider-pre").length,1,"The pre Arrow is show");
                equals($(".ui-slider-next").length,1,"The next Arrow is show");
                equals($('.ui-slider-items-dots').length,1,"The dots is show");
                equals($('.ui-slider-items-dots').children()[1].className,"ui-slider-dot-select","The dots is right");
                slider.pre();
            }else if(i==4){
                equals($($('.ui-slider-item')[0]).offset().left,$('#ui-slider-test').offset().left,"The left is right");
                equals($(".ui-slider-pre").length,1,"The pre Arrow is show");
                equals($(".ui-slider-next").length,1,"The next Arrow is show");
                equals($('.ui-slider-items-dots').length,1,"The dots is show");
                equals($('.ui-slider-items-dots').children()[0].className,"ui-slider-dot-select","The dots is right");
                slider.pre();
            }else{
                equals($($('.ui-slider-item')[2]).offset().left,$('#ui-slider-test').offset().left,"The left is right");
                equals($(".ui-slider-pre").length,1,"The pre Arrow is show");
                equals($(".ui-slider-next").length,1,"The next Arrow is show");
                equals($('.ui-slider-items-dots').length,1,"The dots is show");
                equals($('.ui-slider-items-dots').children()[2].className,"ui-slider-dot-select","The dots is right");
                setTimeout(function(){
                    slider.destroy();
                    start();
                },20);
            }
        }
    });

    equals(slider._data.showArr,true,"The showArr is true");
    equals(slider._data.showDot,true,"The showDot is true");
    equals($(".ui-slider-pre").length,1,"The pre Arrow is show");
    equals($(".ui-slider-next").length,1,"The next Arrow is show");
    equals($('.ui-slider-items-dots').length,1,"The dots is show");
    equals($(slider._el.children()[2]).attr("class"),"ui-slider-pre","The class is right");
    equals($(slider._el.children()[3]).attr("class"),"ui-slider-next","The class is right");
    equals($('.ui-slider-items-dots').children()[0].className,"ui-slider-dot-select","The dots is right");
    setTimeout(function(){
        ta.tap($(".ui-slider-next")[0]);
    },20);
});

test("autoPlay=true & autoPlayTime & animationTime ", function() {
    stop();
    expect(8);
    var autoPlayTime = isAndroid4?500:300;
    var time =  isAndroid4?550:300;
    var slider = $.ui.slider("#ui-slider-test", {
        content: content3,
        autoPlayTime:autoPlayTime,
        autoPlay:true,
        animationTime:100
    });
    equals(slider._data.autoPlayTime,autoPlayTime,"The autoPlayTime is true");
    equals(slider._data.animationTime,100,"The autoPlayTime is true");
    equals(slider._data.autoPlay,true,"The autoPlay is true");

    equals($($('.ui-slider-item')[0]).offset().left,$("#ui-slider-test").offset().left,"显示第一张图片");
    setTimeout(function(){
        ok($('.ui-slider-item')[1].offsetLeft<$("#ui-slider-test").offset().left+$("#ui-slider-test").offset().width,"The animationTime is right");
        setTimeout(function(){
            equals($($('.ui-slider-item')[1]).offset().left,$("#ui-slider-test").offset().left,"显示第二张图片");
            setTimeout(function(){
                ok($('.ui-slider-item')[0].offsetLeft<$("#ui-slider-test").offset().left+$("#ui-slider-test").offset().width,"The animationTime is right");
                setTimeout(function(){
                    equals($($('.ui-slider-item')[2]).offset().left,$("#ui-slider-test").offset().left,"显示第三张图片");
                    slider.destroy();
                    start();
                },120);
            },time);
        }, 120);
    }, time);
});


test("autoPlay=false&autoPlayTime设任意值",function(){
    stop();
    var autoPlayTime = isAndroid4?300:100;
    var slider = $.ui.slider("#ui-slider-test", {
        content: content3,
        autoPlay:false,
        autoPlayTime:autoPlayTime,
        animationTime: 1
    });
    equals($($(".ui-slider-item")[0]).offset().left,$("#ui-slider-test").offset().left,"显示第一张图片");
    setTimeout(function(){
        equals($($(".ui-slider-item")[0]).offset().left,$("#ui-slider-test").offset().left,"依然显示第一张图片");
        setTimeout(function(){
            equals($($(".ui-slider-item")[0]).offset().left,$("#ui-slider-test").offset().left,"依然显示第一张图片");
            slider.destroy();
            start();
        },autoPlayTime)
    },autoPlayTime)
});


test("stop() & resume()",function(){
    stop();
    expect(4);
    var autoPlayTime = isAndroid4?400:200;
    var time =  isAndroid4?500:240;
    var slider = $.ui.slider("#ui-slider-test", {
        content: content3,
        autoPlayTime:autoPlayTime,
        animationTime:1
    });
    equals($($('.ui-slider-item')[0]).offset().left,$("#ui-slider-test").offset().left,"显示第一张图片");
    setTimeout(function(){
        equals($($('.ui-slider-item')[1]).offset().left,$("#ui-slider-test").offset().left,"显示第二张图片");
        slider.stop();
        setTimeout(function(){
            equals($($('.ui-slider-item')[1]).offset().left,$("#ui-slider-test").offset().left,"还是显示第二张图片");
            slider.resume();
            setTimeout(function(){
                equals($($('.ui-slider-item')[2]).offset().left,$("#ui-slider-test").offset().left,"显示第三张图片");
                slider.destroy();
                start();
            },time)
        },time) ;
    },time);
});


test("多实例",function(){
    stop();
    var slider = $.ui.slider("#ui-slider-test", {
        content: content2,
        animationTime:1,
        onclick:function(){
            equal($(this).attr("id"),"ui-slider-test","The class is right");
        }
    });

    $("body").append("<div id='ui-slider-test1'></div>");
//    $(".ui-slider-test1").css("width","400px").css("height","148px").css("background","#E3E3E3").css("position","relative").css("overflow","hidden");
    $("#ui-slider-test1").css("height","148px").css("overflow","hidden").css("width","400px");
    var slider1 = $.ui.slider("#ui-slider-test1", {
        content: content2,
        animationTime:1,
        onclick:function(){
            equal($(this).attr("id"),"ui-slider-test1","The class is right");
        }
    });

    equals(slider._el.attr("id"),"ui-slider-test","The slider class is right");
    equals(slider1._el.attr("id"),"ui-slider-test1","The slider1 class is right");
    ta.tap(slider._el[0]);
    ta.tap(slider1._el[0]);
    ta.tap($("#ui-slider-test").find(".ui-slider-next")[0]);
    setTimeout(function(){
        equals($($('#ui-slider-test').find('.ui-slider-item')[1]).offset().left,$("#ui-slider-test").offset().left,"slider显示第二张图片");
        equals($($('#ui-slider-test1').find('.ui-slider-item')[0]).offset().left,$("#ui-slider-test1").offset().left,"slider1 显示第一张图片");
        ta.tap($("#ui-slider-test1").find(".ui-slider-next")[0]);
        setTimeout(function(){
            equals($($('#ui-slider-test').find('.ui-slider-item')[1]).offset().left,$("#ui-slider-test").offset().left,"slider显示第二张图片");
            equals($($('#ui-slider-test1').find('.ui-slider-item')[1]).offset().left,$("#ui-slider-test1").offset().left,"slider1 显示第一张图片");
            slider.destroy();
            slider1.destroy();
            start();
        },slider_time);
    },slider_time);
});


test("事件 & 点击图片(点击链接和触发事件) ",function(){
    expect(7);
    var k=0;
    var time = new Date();
    stop();
    var slider_time = isAndroid4?500:180;
    var slider = $.ui.slider("#ui-slider-test", {
        content: content3,
        autoPlayTime:isAndroid4?300:100,
        animationTime:50,
        onclick:function(){
            k==0 && ok(true,"点击包括图片的所有slider区域，触发onclick事件");
            k==1 && ok(true,"点击包括图片触发onclick事件");
            k==2 && ok(false,"错误的click事件");
            k++;
        },
        onslide:function(index){
            ok(new Date()-time>(isAndroid4?300:100),"onslide is right")
            equals(index,1,"The index is right");
        },
        onslideend:function(index){
            ok(new Date()-time>(isAndroid4?350:150),"onslideend is right")
            equals(index,1,"The index is right");
        }
    });
    ua.click($('#ui-slider-test')[0]);
    ua.click($('img')[0]);
    equals($("img").parents().attr("href"),"#","链接有效");
    setTimeout(function(){
        slider.destroy();
        start();
    },slider_time);
});

test("基本操作( 滑动图片，点击前进后退按钮, 文字/小图片/页码相应翻页 )", function() {
    stop();
    expect(30);
    var i =0;
//    var dic = /Windows/.test(navigator.userAgent)?1:(/Android.*2\.3.*UC/.test(navigator.userAgent)?-1:0);
    var dic = /Windows/.test(navigator.userAgent)?1:(isAndroid4?1:(isIos5? 1:0));
    var slider1 = $.ui.slider("#ui-slider-test", {
        content: content3,
        animationTime: 1 ,
        autoPlayTime:2000,
        onslideend:function(){
            i++;
            if(i==1){
                console.log("slider");
                equals($($('.ui-slider-item')[1]).offset().left,$('#ui-slider-test').offset().left,"The left is right");
                equals($($(".ui-slider-item")[1]).find(".ui-slider-smallpic").attr("src"),"../../webapp/css/slider/smallpic2.jpg","The small picture src is right" );
                equals($($(".ui-slider-item")[1]).find(".ui-slider-title").html(),"图片2","The title is right" );
                equals($($(".ui-slider-item")[1]).find(".ui-slider-subTitle").html(),"小图片2","The subtitle is right" );
                equals($(".ui-slider-lazyload")[1].offsetLeft,parseInt(($('#ui-slider-test').offset().width-$(".ui-slider-lazyload")[1].offsetWidth)/2)+dic,"The left is right");
                setTimeout(function(){
                    ta.tap($(".ui-slider-next")[0]);
                },10);

            }else if(i==2){
                equals($($('.ui-slider-item')[2]).offset().left,$("#ui-slider-test").offset().left,"The picture not slide");
                equals($($(".ui-slider-item")[2]).find(".ui-slider-smallpic").attr("src"),"../../webapp/css/slider/smallpic3.jpg","The small picture src is right" );
                equals($($(".ui-slider-item")[2]).find(".ui-slider-title").html(),"图片3","The title is right" );
                equals($($(".ui-slider-item")[2]).find(".ui-slider-subTitle").html(),"小图片3","The subtitle is right" );
                equals($(".ui-slider-lazyload")[2].offsetLeft,parseInt(($('#ui-slider-test').offset().width-$(".ui-slider-lazyload")[2].offsetWidth)/2)+dic,"The left is right");
                setTimeout(function(){
                    ta.tap($(".ui-slider-pre")[0]);
                },10);

            }else if(i==3){
                equals($($('.ui-slider-item')[1]).offset().left,$("#ui-slider-test").offset().left,"The picture not slide");
                equals($($(".ui-slider-item")[1]).find(".ui-slider-smallpic").attr("src"),"../../webapp/css/slider/smallpic2.jpg","The small picture src is right" );
                equals($($(".ui-slider-item")[1]).find(".ui-slider-title").html(),"图片2","The title is right" );
                equals($($(".ui-slider-item")[1]).find(".ui-slider-subTitle").html(),"小图片2","The subtitle is right" );
                equals($(".ui-slider-lazyload")[1].offsetLeft,parseInt(($('#ui-slider-test').offset().width-$(".ui-slider-lazyload")[1].offsetWidth)/2)+dic,"The left is right");
                setTimeout(function(){
                    ta.touchstart($(".ui-slider-wheel")[0], {
                        touches: [{
                            clientX: 0,
                            clientY: 0
                        }]
                    });
                    ta.touchmove($(".ui-slider-wheel")[0], {
                        touches:[{
                            clientX: 20,
                            clientY: 0
                        }]
                    });
                    ta.touchend($(".ui-slider-wheel")[0]);
                },10);
            }else if(i==4){
                equals($($('.ui-slider-item')[0]).offset().left,$('#ui-slider-test').offset().left,"The left is right");
                equals($($(".ui-slider-item")[0]).find(".ui-slider-smallpic").attr("src"),"../../webapp/css/slider/smallpic1.jpg","The small picture src is right" );
                equals($($(".ui-slider-item")[0]).find(".ui-slider-title").html(),"图片1","The title is right" );
                equals($($(".ui-slider-item")[0]).find(".ui-slider-subTitle").html(),"小图片1","The subtitle is right" );
                equals($(".ui-slider-lazyload")[0].offsetLeft,parseInt(($('#ui-slider-test').offset().width-$(".ui-slider-lazyload")[0].offsetWidth)/2)+dic,"The left is right");
                setTimeout(function(){
                    ta.tap($(".ui-slider-pre")[0]);
                },10);
            }else{
                equals($($('.ui-slider-item')[2]).offset().left,$("#ui-slider-test").offset().left,"The picture not slide");
                equals($($(".ui-slider-item")[2]).find(".ui-slider-smallpic").attr("src"),"../../webapp/css/slider/smallpic3.jpg","The small picture src is right" );
                equals($($(".ui-slider-item")[2]).find(".ui-slider-title").html(),"图片3","The title is right" );
                equals($($(".ui-slider-item")[2]).find(".ui-slider-subTitle").html(),"小图片3","The subtitle is right" );
                equals($(".ui-slider-lazyload")[2].offsetLeft,parseInt(($('#ui-slider-test').offset().width-$(".ui-slider-lazyload")[2].offsetWidth)/2)+dic,"The left is right");
                setTimeout(function(){
                    slider1.destroy();
                    start();
                },10);
            }

        }
    });
    equals($($('.ui-slider-item')[0]).offset().left,$('#ui-slider-test').offset().left,"The left is right");
    equals($($(".ui-slider-item")[0]).find(".ui-slider-smallpic").attr("src"),"../../webapp/css/slider/smallpic1.jpg","The small picture src is right" );
    equals($($(".ui-slider-item")[0]).find(".ui-slider-title").html(),"图片1","The title is right" );
    equals($($(".ui-slider-item")[0]).find(".ui-slider-subTitle").html(),"小图片1","The subtitle is right" );
    equals($(".ui-slider-lazyload")[0].offsetLeft,parseInt(($('#ui-slider-test').offset().width-$(".ui-slider-lazyload")[0].offsetWidth)/2)+dic,"The left is right");
    setTimeout(function(){
        ta.touchstart($(".ui-slider-wheel")[0], {
            touches: [{
                clientX: 0,
                clientY: 0
            }]
        });
        ta.touchmove($(".ui-slider-wheel")[0], {
            touches:[{
                clientX: -20,
                clientY: 0
            }]
        });
        ta.touchend($(".ui-slider-wheel")[0]);
    },10);
});

test("window resize", function() {
    expect(12);
    stop();
    var width = $("body").css("width");
    $("body").css("width", "500px");
    var slider = $.ui.slider("#ui-slider-test", {
        content: content4,
        autoPlay: false
    });
    setTimeout(function(){
        equals($(".ui-slider-item").css("width"), "500px", "The item width is right");
        equals($(".ui-slider-item")[0].style["-webkit-transform"], "translate3d(0px, 0px, 0px)", "The item -webkit-transform is right");
        equals($(".ui-slider-item")[1].style["-webkit-transform"], "translate3d(500px, 0px, 0px)", "The item -webkit-transform is right");
        equals($(".ui-slider-item")[2].style["-webkit-transform"], "translate3d(1000px, 0px, 0px)", "The item -webkit-transform is right");
        equals($(".ui-slider-item")[3].style["-webkit-transform"], "translate3d(1500px, 0px, 0px)", "The item -webkit-transform is right");
        equals($(".ui-slider-wheel").css("width"), "2000px", "The wheel width is right");

        $("body").css("width", "400px");
        $(window).trigger("ortchange"); //iframe里的silder在android2.3上有问题（不随iframe大小变化而伸缩），故直接调用ortchange

        setTimeout(function(){
            equals($(".ui-slider-item").css("width"), "400px", "The item width is right");
            equals($(".ui-slider-item")[0].style["-webkit-transform"], "translate3d(0px, 0px, 0px)", "The item -webkit-transform is right");
            equals($(".ui-slider-item")[1].style["-webkit-transform"], "translate3d(400px, 0px, 0px)", "The item -webkit-transform is right");
            equals($(".ui-slider-item")[2].style["-webkit-transform"], "translate3d(800px, 0px, 0px)", "The item -webkit-transform is right");
            equals($(".ui-slider-item")[3].style["-webkit-transform"], "translate3d(1200px, 0px, 0px)", "The item -webkit-transform is right");
            equals($(".ui-slider-wheel").css("width"), "1600px", "The wheel width is right");
            $("body").css("width", width);
            slider.destroy();
            start();
        }, 500);
    }, 50);
});

test("setup", function() {
    setMod();
    $("#ui-slider-test").remove();
    stop();
    expect(28);
    var i=0;
    var slider = $.ui.slider('#slider-container-2',{
        setup: true,
        animationTime:1,
        onslideend:function(){
            i++;
            if(i==1){
                equals($($(".ui-slider-item")[1]).offset().left,$("#slider-container-2").offset().left,"第二张图片显示");
                setTimeout(function(){
                    ta.tap($(".ui-slider-next")[0]);
                },10);
            }else if(i==2){
                equals($($(".ui-slider-item")[2]).offset().left,$("#slider-container-2").offset().left,"第三张图片显示");
                ta.touchstart($(".ui-slider-wheel")[0], {
                    touches: [{
                        clientX: 0,
                        clientY: 0
                    }]
                });
                ta.touchmove($(".ui-slider-wheel")[0], {
                    touches:[{
                        clientX: -15,
                        clientY: 0
                    }]
                });
                ta.touchend($(".ui-slider-wheel")[0]);
            }else{
                equals($($(".ui-slider-item")[3]).offset().left,$("#slider-container-2").offset().left,"第一张图片显示");
                setTimeout(function(){
                    slider.destroy();
                    start();
                },10);
            }
        }
    });
    equals(slider._data.setup,true,"The default setup is right");
    equals(slider._data.index,0,"The default index is right");
    equals(slider._data.imgInit,2,"The default imgInit is right");
    equals(slider._data.imgZoom,false,"The default imgZoom is right");
    equals(slider._data.boundSpring,false,"The default boundSpring is right");
    equals(slider._data.springBack,true,"The default springBack is right");
    equals(slider._data.springBackDis,15,"The default springBackDis is right");
    equals(slider._data.autoPlay,true,"The default autoPlay is right");
    equals(slider._data.animationTime,1,"The default animationTime is right");
    equals(slider._data.showArr,true,"The default showArr is right");
    equals(slider._data.showDot,true,"The default showDot is right");
    equals(slider._data.onclick,"","The default onclick is right");
    equals(slider._data.onslide,"","The default onslide is right");

    //检测加载图片
    equals($($(".ui-slider-lazyload")[0]).attr("src"),"../../webapp/css/slider/image1.png","第一张图片已加载");
    equals($($(".ui-slider-lazyload")[1]).attr("src"),"../../webapp/css/slider/image2.png","第二张图片已加载");
    equals($($(".ui-slider-lazyload")[2]).attr("src"),"","第三张图片未加载");

    ok(ua.isShown(slider._el[0]), "The slider show");
    equals(slider._el.attr("id"),"slider-container-2","The class is right");
    equals(slider._el.offset().left,$("#slider-container-2").offset().left, "The left is right");
    equals(slider._el.offset().top,$("#slider-container-2").offset().top, "The top is right");
    equals(slider._el.offset().width,$("body").width(), "The width is right");
    equals($(".ui-slider-pre").length, 1, "pre Arr shows");
    equals($(".ui-slider-next").length, 1, "next Arr shows");
    equals($(".ui-slider-items-dots b").length, 3, "Dots show");
    equals($($(".ui-slider-item")[0]).offset().left,$("#slider-container-2").offset().left,"第一张图片显示");

    ta.touchstart($(".ui-slider-wheel")[0], {
        touches: [{
            clientX: 0,
            clientY: 0
        }]
    });
    ta.touchmove($(".ui-slider-wheel")[0], {
        touches:[{
            clientX: -15,
            clientY: 0
        }]
    });
    ta.touchend($(".ui-slider-wheel")[0]);
});

test("destroy()", function() {
    expect(3);
    var l1 = ua.eventLength();
    var slider = $.ui.slider("#ui-slider-test",{
        content: content3
    });

    slider.destroy();
    var a=0;
    for(var i in slider)
        a++;
    equals(a, 0, "The obj is cleared");
    equals($(".ui-slider").length, 0, "The dom is removed");
    var l2 = ua.eventLength();
    equals(l2, l1, "The events are cleared");
});
