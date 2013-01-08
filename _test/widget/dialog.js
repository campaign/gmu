module("webapp - dialog",{

});

test("默认配置项，在什么都不传的情况下是否正确",function(){
    expect(10);
    stop();
    ua.loadcss(["reset.css", "widget/dialog/dialog.css","widget/button/button.css"], function(){
        var dialog = $.ui.dialog();
        strictEqual(dialog.data('autoOpen'), true, '默认配置中autoOpen为true');
        strictEqual(dialog.data('buttons'), null, '默认配置中buttons为null');
        strictEqual(dialog.data('closeBtn'), true, '默认配置中closeBtn为true');
        strictEqual(dialog.data('mask'), true, '默认配置中mask为true');
        strictEqual(dialog.data('width'), 300, '默认配置中width为300');
        strictEqual(dialog.data('height'), 'auto', '默认配置中height为auto');
        strictEqual(dialog.data('title'), null, '默认配置中title为null');
        strictEqual(dialog.data('content'), null, '默认配置中content为null');
        strictEqual(dialog.data('scrollMove'), true, '默认配置中scrollMove为null');
        strictEqual(dialog.data('container'), null, '默认配置中container为null');
        dialog.destroy();
        start();
    });
});

test("no el & no container & 默认配置项 ", function(){
    expect(21);
    stop();
    var dialog = $.ui.dialog({
        title : 'title',
        content : 'text',
        init: function() {
            equals(this._data.width , 300, 'The width is right');
            equals(this._data.height , 'auto', 'The height is right');
            equals(this._data.title , 'title', 'The title is right');
            equals(this._data.content , 'text', 'The content is right');
            equals(this._data.mask , true, 'The mask is right');
            equals(this._data.closeBtn , true, 'The closeBtn is right');
            ok(true, "The oninit is trigger");
        }
    });
    dialog.on("maskClick", function(){
        ok(true, "The maskClick is trigger");
    });
    setTimeout(function(){
        equals(dialog.data('_wrap').parent()[0].tagName.toLowerCase(), "body", "The container is right");
        equals(dialog.data('_mask').parent()[0].tagName.toLowerCase(), "body", "The mask is right");
        ok(dialog.data('_wrap').hasClass("ui-dialog"), "The wrap is right");
        ok(ua.isShown(dialog.data('_wrap')[0]), 'The dialog is show');
        equals(dialog.data('_wrap').width(), 300, "The width is right");
        equals(dialog.data('_wrap').css('height'), 'auto', "The height is right");
        approximateEqual(dialog.data('_wrap').offset().left, ($(window).width() - dialog.data('_wrap').width()) / 2, 0.5, "The left is right");
        approximateEqual(dialog.data('_wrap').offset().top , ($(window).height() - dialog.data('_wrap').height()) / 2, 0.5, "The top is right");
        equals($(".ui-dialog-title h3", dialog.data('_wrap')).text(), "title", "The title is right");
        equals(dialog.content(), "text", "The content is right");
        equals(dialog._data._mask.css("display"), "block", "The mask shows");
        equals(dialog._data._mask.height(), Math.max(document.body.scrollHeight, document.body.clientHeight)-1, "The mask height is right");
        equals(dialog._data._mask.width(), document.body.clientWidth, "The mask width is right");
        ua.click(dialog._data._mask[0]);
        dialog.destroy();
        start();
    }, 300);

});

test("非默认配置项", function () {
    expect(17);
    stop();
    var dialog = $.ui.dialog($('<div class="ui-dialog"></div>'), {
        width : 400,
        height : 500,
        title : '标题',
        content : '内容',
        mask : false,
        closeBtn : false,
        autoOpen: false
    });
    equals(dialog._data.width , 400, 'The width is right');
    equals(dialog._data.height , 500, 'The width is right');
    equals(dialog._data.title , '标题', 'The title is right');
    equals(dialog._data.content , '内容', 'The content is right');
    equals(dialog._data.mask , false, 'The mask is right');
    equals(dialog._data.closeBtn , false, 'The closeBtn is right');
    ok(!ua.isShown(dialog.data('_wrap')[0]), 'The dialog doesn\'t show automatically!');
    dialog.open();

    setTimeout(function(){
        equals(dialog.data('_wrap').parent()[0].tagName.toLowerCase(), "body", "The container is right");
        ok(ua.isShown(dialog.data('_wrap')[0]), 'The dialog is show');
        equals(dialog.data('_wrap').width(), 400, "The width is right");
        equals(dialog.data('_wrap').height(), 500, "The height is right");
        approximateEqual(dialog.data('_wrap').offset().left, ($(window).width() - dialog.data('_wrap').width()) / 2, 0.5, "The left is right");
        approximateEqual(dialog.data('_wrap').offset().top , ($(window).height() - dialog.data('_wrap').height()) / 2, 0.5, "The top is right");
        equals($(".ui-dialog-title h3", dialog.data('_wrap')).text(), "标题", "The title is right");
        equals(dialog.content(), "内容", "The content is right");
        notDeepEqual(dialog._data._wrap.prev().attr("class"),"ui-mask","The mask is null");
        equals(dialog.data('_mask'), null, "The mask is null");
        dialog.destroy();
        start();
    }, 300);
});

test("事件", function () {
    expect(6);
    stop();
    var d = $.ui.dialog($('<div class="ui-dialog"></div>'), {
        init: function(){
            ok(true, 'init触发了');
        },
        destroy: function(){
            ok(true, 'destroy触发了');
        },
        open: function(){
            ok(true, 'open触发了');
        },
        close: function(){
            ok(true, 'close触发了');
        },
        beforeClose:function(){
            ok(true, 'beforeClose触发了');
        },
        maskClick: function(){
            ok(true, 'maskClick触发了');
        }
    });
    ua.click(d.data('_mask')[0]);
    d.close();
    d.destroy();
    d = $.ui.dialog($('<div class="ui-dialog"></div>'), {
        close: function(){
            ok(false, 'close在beforeclose中阻止了，不应该触发！');
        },
        beforeClose:function(e){
            e.preventDefault();
        }
    });
    d.close();
    d.destroy();
    start();
});

test("close() ", function () {
    expect(7);
    stop();
    var d = $.ui.dialog($('<div class="ui-dialog"></div>'), {
        title : '标题',
        content : '内容'
    });
    setTimeout(function(){
        equals(d._data._wrap.find(".ui-dialog-close").attr("class"), "ui-dialog-close white", "The closeBtn is right");
        ua.click(d._data._wrap.find(".ui-dialog-close")[0]);
        ok(!ua.isShown(d._data._wrap[0]),"dialog hidden");
        ok(!ua.isShown(d._data._mask[0]),"mask hidden");
        d.open();
        var me = d;
        setTimeout(function(){
            approximateEqual(d.data('_wrap').offset().left, ($(window).width() - d.data('_wrap').width()) / 2, 0.5, "The left is right");
            approximateEqual(d.data('_wrap').offset().top , ($(window).height() - d.data('_wrap').height()) / 2, 0.5, "The top is right");
            ok(ua.isShown(d._data._wrap[0]),"dialog show");
            ok(ua.isShown(d._data._mask[0]),"mask show");
            me.destroy();
            start();
        }, 500);
    }, 300);
});

test('open()', function(){
    expect(6);
    stop();
    var d = $.ui.dialog({
        title: '标题',
        content: '内容',
        autoOpen:false
    });
    ok(!ua.isShown(d._data._wrap[0]),"dialog hidden");
    ok(!ua.isShown(d._data._mask[0]),"mask hidden");
    d.open();
    setTimeout(function(){

        var top = ($(window).height() - d.data('_wrap').height()) / 2;
        var left = ($(window).width() - d.data('_wrap').width()) / 2;
        approximateEqual(d.data('_wrap').offset().top, top, 0.5, "The top is right");
        approximateEqual(d.data('_wrap').offset().left, left, 0.5, "The left is right");

        var d1 = $.ui.dialog({
            title: '标题',
            content: '内容',
            mask: false
        }).open(100, 100);
        setTimeout(function(){
            equals(d1.data('_wrap').offset().top, 100, "The top is right");
            equals(d1.data('_wrap').offset().left, 100, "The left is right");
            d.destroy();
            d1.destroy();
            start();
        }, 300);
    }, 300);
});


test('title()', function(){
    expect(6);
    stop();
    var d = $.ui.dialog({
        title: '标题',
        content: '内容'
    }).open();
    setTimeout(function(){
        equals(d.title(), "标题", "The title is right");
        d.title('<span style="color:#ff0000">test</span>');
        equals(d.data('_title').children()[0].tagName.toLowerCase(), "h3", "The title is right");
        equals(d.data('_title').children()[0].childNodes[0].tagName.toLowerCase(), "span", "The title is right");
        equals(d.data('_title').children()[0].childNodes[0].innerHTML, "test", "The title is right");
        equals(d.data('_title').children()[1].className, "ui-dialog-close white", "The closeBtn is right");
        d.title("");
        equals(d.title(), '', "The title is right");
        d.destroy();
        start();
    }, 300);
});

test('position()', function(){
    expect(4);
    stop();
    var d = $.ui.dialog({
        title: '标题',
        content: '内容'
    });
    setTimeout(function(){
        approximateEqual(d.data('_wrap').offset().left, ($(window).width() - d.data('_wrap').width()) / 2, 0.5, "The left is right");
        approximateEqual(d.data('_wrap').offset().top , ($(window).height() - d.data('_wrap').height()) / 2, 0.5, "The top is right");
        d.position(100,100);
        setTimeout(function(){
            equals(d.data('_wrap').offset().top, 100, "The top is right");
            equals(d.data('_wrap').offset().left, 100, "The left is right");
            d.destroy();
            start();
        },200);
    }, 300);
});

test('content()', function(){
    expect(4);
    stop();
    var d = $.ui.dialog({
        title: '标题',
        content: '内容'
    });
    setTimeout(function(){
        equals(d.content(), "内容", "The content is right");
        d.content('<span style="color:#ff0000">test</span>');
        equals(d.data('_content').children()[0].tagName.toLowerCase(), "span", "The content is right");
        equals(d.data('_content').children()[0].innerHTML, "test", "The content is right");
        d.content("");
        equals(d.content(), "", "The content is right");
        d.destroy();
        start();
    }, 300);
});

test('window resize', function(){
    expect(30);
    stop();
    ua.frameExt(function(w, f){
        var me = this;
        ua.loadcss(["reset.css", "widget/dialog/dialog.css"], function(){
            w.$("html").css("overflow", "hidden");
            var d = w.$.ui.dialog({
                title: '标题',
                content: '内容',
                width: 200,
                height: 100
            });
            setTimeout(function(){
                equals(d.data('_wrap').css("display"), "block", "The dialog is show");
                equals(d.data('_wrap').width(), 200, "The width is right");
                equals(d.data('_wrap').height(), 100, "The height is right");
                equals(d.data('_wrap').offset().left, parseInt(($(f).width() - d.data('_wrap').width()) / 2), "The left is right");
                equals(d.data('_wrap').offset().top, parseInt(($(f).height() - d.data('_wrap').height()) / 2), "The top is right");
                equals(d.data('_mask').css("display"), "block", "The mask shows");
                equals(d.data('_mask').width(), $(f).width(), "The width is right");
                equals(d.data('_mask').height(), $(f).height()-1, "The height is right");
                equals(d.data('_mask').offset().left, 0, "The left is right");
                equals(d.data('_mask').offset().top, 0, "The top is right");
                $(f).css("position", "absolute").css("left", 0).css("top", 0).css("height", 600).css("width", 300);
                $.support.orientation ? ta.orientationchange(w) : ta.resize(w);
                setTimeout(function(){
                    equals(d.data('_wrap').css("display"), "block", "The dialog is show");
                    equals(d.data('_wrap').width(), 200, "The width is right");
                    equals(d.data('_wrap').height(), 100, "The height is right");
                    equals(d.data('_wrap').offset().left, parseInt(($(f).width() - d.data('_wrap').width()) / 2), "The left is right");
                    equals(d.data('_wrap').offset().top, parseInt(($(f).height() - d.data('_wrap').height()) / 2), "The top is right");
                    equals(d.data('_mask').css("display"), "block", "The mask shows");
                    equals(d.data('_mask').width(), $(f).width(), "The width is right");
                    equals(d.data('_mask').height(), $(f).height()-($.browser.uc?2:1), "The height is right");
                    equals(d.data('_mask').offset().left, 0, "The left is right");
                    equals(d.data('_mask').offset().top, 0, "The top is right");
                    $(f).css("position", "absolute").css("left", 0).css("top", 0).css("height", 300).css("width", 600);
                    $.support.orientation ? ta.orientationchange(w) : ta.resize(w);
                    setTimeout(function(){
                        equals(d.data('_wrap').css("display"), "block", "The dialog is show");
                        equals(d.data('_wrap').width(), 200, "The width is right");
                        equals(d.data('_wrap').height(), 100, "The height is right");
                        equals(d.data('_wrap').offset().left, parseInt(($(f).width() - d.data('_wrap').width()) / 2), "The left is right");
                        ok(d.data('_wrap').offset().top == parseInt((300 - d.data('_wrap').height()) / 2) || d.data('_wrap').offset().top == parseInt((300 - d.data('_wrap').height()) / 2), "The top is right");
                        equals(d.data('_mask').css("display"), "block", "The mask shows");
                        equals(d.data('_mask').width(), $(f).width(), "The width is right");
                        equals(d.data('_mask').height(), 600-($.browser.uc?3:2), "The height is right"); //mask高度取clientHeight和scrollHeight之中的较大值，竖屏转横屏后，mask会把页面下方撑出一段空白区域，这个不修复
                        equals(d.data('_mask').offset().left, 0, "The left is right");
                        equals(d.data('_mask').offset().top, 0, "The top is right");
                        d.destroy();
                        me.finish();
                    }, 500);
                }, 500);
            }, 300)
        }, w);
    });
});

test("destroy",function(){
    ua.destroyTest(function(w,f){
        w.$('body').highlight();//由于highlight在调用的时候会注册全局事件，以便多次其他实例使用，所以这里先让hightlight把全局事件注册以后再来对比。
        var dl1 = w.dt.domLength(w);
        var el1= w.dt.eventLength();

        var dialog =  w.$.ui.dialog();
        dialog.destroy();

        var el2= w.dt.eventLength();
        var ol = w.dt.objLength(dialog);
        var dl2 =w.dt.domLength(w);

        equal(dl1,dl2,"The dom is ok");   //测试结果不是100%可靠，可忽略
        equal(el1,el2,"The event is ok");
        ok(ol==0,"The dialog is destroy");
        this.finish();
    })
}) ;

test('autoOpen', function(){
    expect(2);
    var d = $.ui.dialog({
        title: '标题',
        content: '内容'
    });
    ok(ua.isShown(d.data('_wrap')[0]), '自动Open了');
    d.destroy();
    d = $.ui.dialog({
        title: '标题',
        content: '内容',
        autoOpen: false
    });
    ok(!ua.isShown(d.data('_wrap')[0]), '没有自动Open了');
    d.destroy();
});

test('buttons', function(){
    expect(5);
    var d = $.ui.dialog({
        title: '标题',
        content: '内容',
        buttons: {
            'Ok' : function(){
                ok(true, 'Ok clicked');
            },
            'Cancel': function(){
                ok(true, 'Cancel clicked');
            }
        }
    });
    equals(d.data('_wrap').find('.ui-btn').length, 2, '创建了两个button');
    equals(d.data('_wrap').find('.ui-btn:first-child').text(), 'Ok', '第一个按钮的文字是Ok');
    equals(d.data('_wrap').find('.ui-btn:last-child').text(), 'Cancel', '第二个按钮的文字是Ok');
    ua.click(d.data('_wrap').find('.ui-btn')[0]);
    ua.click(d.data('_wrap').find('.ui-btn')[1]);
    d.destroy();
});

test('Setup模式', function(){
    expect(21);
    stop();
    $('<div id="dialog" title="title">text</div>').appendTo('body');
    var dialog = $('#dialog').dialog({
        init: function() {
            equals(this._data.width , 300, 'The width is right');
            equals(this._data.height , 'auto', 'The height is right');
            equals(this._data.title , 'title', 'The title is right');
            equals(this._data.content.text() , 'text', 'The content is right');
            equals(this._data.mask , true, 'The mask is right');
            equals(this._data.closeBtn , true, 'The closeBtn is right');
            ok(true, "The oninit is trigger");
        }
    }).dialog('this');
    dialog.on("maskClick", function(){
        ok(true, "The maskClick is trigger");
    });
    setTimeout(function(){
        equals(dialog.data('_wrap').parent()[0].tagName.toLowerCase(), "body", "The container is right");
        equals(dialog.data('_mask').parent()[0].tagName.toLowerCase(), "body", "The mask is right");
        ok(dialog.data('_wrap').hasClass("ui-dialog"), "The wrap is right");
        equals(dialog.data('_wrap').css("display"), "block", "The dialog is show");
        equals(dialog.data('_wrap').width(), 300, "The width is right");
        equals(dialog.data('_wrap').css('height'), 'auto', "The height is right");
        approximateEqual(dialog.data('_wrap').offset().left, ($(window).width() - dialog.data('_wrap').width()) / 2, 0.5, "The left is right");
        approximateEqual(dialog.data('_wrap').offset().top , ($(window).height() - dialog.data('_wrap').height()) / 2, 0.5, "The top is right");
        equals($(".ui-dialog-title h3", dialog.data('_wrap')).text(), "title", "The title is right");
        equals(dialog.content().text(), "text", "The content is right");
        equals($(".ui-mask").css("display"), "block", "The mask shows");
        equals($(".ui-mask").height(), document.body.scrollHeight-1, "The mask height is right");
        equals($(".ui-mask").width(), document.body.clientWidth, "The mask width is right");

        ua.click($(".ui-mask")[0]);
        dialog.destroy();
        start();
    }, 300);
});

test('多实例', function(){
    expect(9);
    stop();
    var d = $.ui.dialog({
        title: '标题',
        content: '内容'
    }).open();
    setTimeout(function(){
        var top = ($(window).height() - d.data('_wrap').height()) / 2;
        var left = ($(window).width() - d.data('_wrap').width()) / 2;
        approximateEqual(d.data('_wrap').offset().top, top, 0.5, "The top is right");
        approximateEqual(d.data('_wrap').offset().left, left, 0.5, "The left is right");
        var d1 = $.ui.dialog({
            title: '标题',
            content: '内容',
            className: "custom"
        }).open(100, 100);
        setTimeout(function(){
            equals(d1.data('_wrap').offset().top, 100, "The top is right");
            equals(d1.data('_wrap').offset().left, 100, "The left is right");
            d.close();
            setTimeout(function(){

                ok(!ua.isShown(d.data('_wrap')[0]) , "The dom is hidden");
                ok(!ua.isShown(d.data('_mask')[0]) , "The mask is hidden");
                ok(ua.isShown(d1._data._wrap[0]),"dialog hidden");
                ok(ua.isShown(d1._data._mask[0]),"mask hidden");
                d1.close();
                setTimeout(function(){
                    ok(!ua.isShown(d1.data('_wrap')[0]) , "The mask is hidden");
                    d.destroy();
                    d1.destroy();
                    start();
                }, 500);
            },500);
        }, 300);
    }, 300);
});





