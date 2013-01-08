module("webapp.dialog.plugin",{

});


test("container",function() {
    expect(8);
    stop();
    ua.loadcss(["reset.css", "widget/dialog/dialog.css"], function(){
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
            ok(dialog.data('_wrap').hasClass("ui-dialog"), "The el is right");
            approximateEqual(dialog.data('_wrap').offset().top, 250+$("#container").offset().top-dialog.data('_wrap').height()/2, 0.5, "The top is right");
            approximateEqual(dialog.data('_wrap').offset().left, 150+$("#container").offset().left-dialog.data('_wrap').width()/2, 0.5, "The left is right");
            dialog.destroy();
            $(container).remove();
            start();
        }, 300);
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