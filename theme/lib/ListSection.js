/**
 * Created with JetBrains WebStorm.
 * User: 陈康
 * Date: 12-7-28
 * Time: 下午5:12
 * To change this template use File | Settings | File Templates.
 */

/**
 * content:[{head :"", items:[{pic : '', title : '', desc : ''},...]}...]
 * 列表页
 * @param barTheme 分割栏的样式类
 * @param itemTheme 列表的样式类
 * @param content  列表内容
 * @param hasScroll 是否具有滑动
 * @param align {1|2|3} 内容对其方式 1：左对齐，2：中间对其，3：右对齐
 *
 */
(function ($, undefined) {
    $.ui.create("ListSection", {
        _data:{
            barTheme:'',
            itemTheme:'',
            type:''
        },
        _create:function () {
            var me = this;
            var content = me.data("content");
            var head, item_s, pic, title, desc, href, container = $("<div class='iscroll'></div>");
            var items_container = $("<ul></ul>").addClass("item-line"), li_item;
            container.append(items_container);
            container.css("position", "relative").css('width', '100%').css("height", "100%");
            me.widget(container);
            for (var i in content) {
                head = content[i].head;
                li_item = $("<li></li>").addClass(me.data("barTheme")).append(head);
                me.data("align") == 1 ? li_item.addClass("item-align-left") : me.data("align") == 2 ? li_item.addClass("item-align-center") : li_item.addClass("item-align-right");
                items_container.append(li_item);
                item_s = content[i].items;
                for (var j in item_s) {
                    pic = item_s[j].pic;
                    title = item_s[j].title;
                    desc = item_s[j].desc;
                    href = item_s[j].href;
                    pic = $("<img />").attr("src", pic);
                    title = $("<h3></h3>").append(title);
                    desc = $("<p></p>").append(desc);
                    li_item = $("<li></li>").addClass(me.data("itemTheme"));
                    var as = $("<a></a>").attr("href", href).addClass(me.data("contentTheme"));
                    as.on("touchstart mousedown", function(e){
                        $(this).addClass("item-selected");
                    },false);
                   as.on("touchend touchmove mouseup", function(){
                        $(this).removeClass("item-selected");
                    });
                    as.append(pic).append($("<div style='display:-webkit-box;-webkit-box-orient:vertical;margin-left: 10px'></div>").append(title).append(desc));
                    li_item.append(as);
                    items_container.append(li_item);
                }
            }

            items_container.css('width', '100%');

            $(document).ready(function(){
                var isc = new iScroll(container[0], {
                    bounce:true,
                    vScrollbar:true,
                    momentum:true,
                    onScrollStart:function(){
                        console.log(this.vScrollbar)
                        $(this.vScrollbarIndicator).css("visibility", "visible")
                    },
                    onScrollEnd:function(){
                        $(this.vScrollbarIndicator).css("visibility", "hidden")
                    }
                });
                $(isc.vScrollbarIndicator).css("visibility", "hidden");
                isc._resize();
                var isOrientSupported = "onorientationchange" in window,
                    orientationEvent = isOrientSupported ? "orientationchange" : "resize";
                window.addEventListener(orientationEvent, function(e){
                    setTimeout(function(){
                        isc._resize();
                     }, 400)
                })
                me.data("isc", isc);
            })
        },
        _init:function () {
            this.widget().on("touchmove", function(e){
                e.preventDefault();
            })
        },
        reset:function(){
         }
    })
})(Zepto);