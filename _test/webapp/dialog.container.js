module("webapp.dialog.plugin",{

});


test("container",function() {
    expect(8);
    stop();
    ua.loadcss(["reset.css", "webapp/dialog/dialog.css"], function(){
        var container = document.createElement('div');
        document.body.appendChild(container);
        $(container).attr('class' , 'container');
        $(container).attr( "id", "container" );
        $(container).css( {height:500,width:300} );
        var dialog = $.ui.dialog({
            content : 'text',
            container : '#container'
        });
        setTimeout(function(){
            ok(dialog._data._container.is('#container') , "container是#container");
            equals(dialog._data._mask.width(),$("#container").width(),"The width is right");
            equals(dialog._data._mask.height(),$("#container").height(),"The height is right");
            equals(dialog.data('_wrap').parent()[0].tagName.toLowerCase(), "div", "The container is right");
            equals(dialog.data('_wrap').parent()[0].tagName.toLowerCase(), "div", "The container is right");
            equals(dialog.data('_wrap').attr("class"), "ui-dialog ", "The el is right");
            approximateEqual(dialog.data('_wrap').offset().top, 250+$("#container").offset().top-dialog.data('_wrap').height()/2, 0.5, "The top is right");
            approximateEqual(dialog.data('_wrap').offset().left, 150+$("#container").offset().left-dialog.data('_wrap').width()/2, 0.5, "The left is right");
            dialog.destroy();
            $(container).remove();
            start();
        }, 300);
    });
});

test('destroy()', function(){
    expect(4);
    stop();
    var l1 = ua.eventLength();
    var d = $.ui.dialog({
        title: '标题',
        content: '内容'
    }).open();
    setTimeout(function(){
        d.destroy();
        setTimeout(function(){
            var a=0;
            for(var i in d)
                a++;
            equals(a, 0, "The obj is cleared");
            equals($(".ui-dialog").length, 0, "The dom is removed");
            equals($(".ui-mask").length, 0, "The dom is removed");
            var l2 = ua.eventLength();
            equals(l2, l1, "The events are cleared");
            start();
        },100);
    }, 300);
});

