/**
 * Created with JetBrains WebStorm.
 * User: 陈康
 * Date: 12-7-27
 * Time: 下午2:09
 * To change this template use File | Settings | File Templates.
 */

/**
 *content：[{classN:'', desc:'',callback:''}...]
 * 页脚
 * @param isTouched 是否可点击带动屏幕拖动
 * @param container 被放置到的容器
 * @param content 放置的按钮数组
 */
(function($, undefined){
    $.ui.create("PageFooter", {
        _data:{
            theme:"",
            isTouched:false,
            _eles:[],
            _idx:0
        },
        _create: function(){
            var me = this;
            var content = me.data("content");
            var item, pic, desc, con =  $("<div></div>"), callback, a;
            for(var i in content){
                item = content[i];
                pic = item.pic;
                desc = item.desc;
                callback = item.callback;
                con = con.addClass("footer");
                me.data("align") == 1 ? con.addClass("item-align-left") : me.data("align") == 2 ? con.addClass("item-align-center") : con.addClass("item-align-right");
                a =  $("<a></a>");
                a.attr("href", "javascript:;")
                a.on("click", callback);
                var ic = $("<div></div>");
                ic.addClass(item.classN);
                a.append(ic);
                a.append($("<h3></h3>").append(desc));
                me.data("_eles").push(a);
                con.append(a);
            }
            me.data("_eles")[me.data("_idx")].addClass("footer-selected")
            me.widget(con)
            $(this.data("container")).append(con);
        },
        _init: function(){
            var me = this;
            if(!me.data("isTouched")){
                me.widget().on("touchmove", function(e){
                    e.preventDefault();
                });
            }
            me._eventHandler();
        },
        _eventHandler: function(){
            var eles = this.data("_eles"), me = this;
            for(var i in eles){
                $(eles[i]).on("click", (function(idx){
                    return function(){
                        $.each(eles, function(idx, ele){
                            $(ele).removeClass("footer-selected")
                        })
                        eles[idx].addClass("footer-selected");
                        me.data("_idx", idx);
                    }
                })(i))
            }
        }
    })
})(Zepto);