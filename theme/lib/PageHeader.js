/**
 * Created with JetBrains WebStorm.
 * User: 陈康
 * Date: 12-7-27
 * Time: 下午2:09
 * To change this template use File | Settings | File Templates.
 */

/**
 *
 * 页头部
 * @param isTouched 是否可交互
 * @param title 标题
 * @param algin {1|2|3} 对齐方式 1：左对齐，2：中间对其，3：右对齐
 * @param container 包裹容器
 * @param mTheme 总体样式类
 * @param tTheme 标题字的样式类
 */
(function($, undefined){
    $.ui.create("PageHeader",{
            _data:{
                title:"",
                align:"",//1:left, 2:center, 3:right
                isTouched:false
            },
            _create:function(){
                var me = this;
                var ph = ($("<div></div>").addClass(me.data('mTheme'))),
                    ti = ($("<div></div>").addClass(me.data("tTheme")));
                me.data('align') == 1 ? ti.addClass("item-align-left") : me.data("align") == 2 ? ti.addClass("item-align-center") : ti.addClass("item-align-right");
                ti.append(me.data("title"));
                ph.append(ti)
                if(me.data("container")){
                    $(me.data("container")).append(ph)
                }
                me.widget(ph);
                me.trigger("create");
            },
            _init:function(){
                var me  = this;
                if(!me.data("isTouched")){
                    me.widget().on("touchstart touchmove touchend click", function(e){
                        e.preventDefault();
                    });
                }
            }
        }
    );
})(Zepto);