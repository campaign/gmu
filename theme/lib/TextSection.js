/**
 * Created with JetBrains WebStorm.
 * User: 陈康
 * Date: 12-7-28
 * Time: 下午5:12
 * To change this template use File | Settings | File Templates.
 */

/**
 * 页面未完善
 * content: [{type:"text", title:"API文档", text:"尚在维护中！"}...];
 *
 */
(function ($, undefined) {
    $.ui.create("TextSection", {
        _data:{
        },
        _create:function () {
            var content = this.data("content");
            var title = content[0].title, text = content[0].text, container = $('<div></div>');
            title = $("<h1></h1>").html(title);
            text = $("<p></p>").html(text);
            title.css("text-align", "center").css("font-family", "微软雅黑").css("font-weight", "bold").css("line-height", "50px").css("color", "#1e83c8");
            text.css("text-align", "center").css("font-family", "微软雅黑").css("font-weight", "bold").css("line-height", "20px").css("font-size", "14px").css("color", "#1e83c8");
            container.append(title);
            container.append(text);
            this.widget(container);
        },
        _init:function () {
            this.widget().on("touchmove", function(e){
                e.preventDefault();
            },false)
        },
        reset:function(){

        }
    })
})(Zepto);