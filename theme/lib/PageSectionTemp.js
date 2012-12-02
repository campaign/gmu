/**
 * Created with JetBrains WebStorm.
 * User: 陈康
 * Date: 12-7-27
 * Time: 下午2:09
 * To change this template use File | Settings | File Templates.
 */

/**
 * 核心页面控制
 * content:[{instanceof $.ui.widget}, ...]
 * @param container 容器
 * @param content 内容
 */
(function ($, undefined) {
    $.ui.create("PageSection", {
        _data:{
            _currentIdx:1,
            sliders:[$("<div></div>"), $("<div></div>")],
            tranReg:/translate3d\((.*)\)/gi,
            _x:0,
            _curIdx:0,
            _clientW:[],
            isSliding:false
        },
        _create:function () {
            var me = this;
            var content = me.data("content") || $("<div></div>"),
                skeleton = $("<div></div>"),
                container = $(me.data("container"));
            me.widget(skeleton);
            skeleton.addClass("section-skeleton");
            skeleton.css("position", 'relative').css("width", '200%').css('height', '100%');
            var sliders = me.data("sliders");
            for (var i in sliders) {
                sliders[i].on("touchmove", function(e){
                    e.preventDefault();
                })
                $(me.data("sliders")[i]).append(content[i].widget());
                sliders[i].css("width", "50%").css("height", "100%");
                skeleton.append(sliders[i]);
            }

            container.append(skeleton);
            skeleton.css("display", "-webkit-box").css('-webkit-box-orient', 'horizontal');
        },
        _init:function () {
            this._eventHandler();
        },
        /**
        * 临时方法
        */
        tempFunctionOnPage:function(idx){
            var me = this;
            var sliders = me.data("sliders");
            sliders[0].append(me.data("content")[0].widget());
            sliders[1].append(me.data("content")[1].widget());
            if(idx == me.data("_curIdx")) return;
            if(idx > me.data("_curIdx")){
                me.onX(me.widget(), -me.data("_scrollWidth"), 0.3, 1, idx, "bac");
            }else{
                me.onX(me.widget(), 0, 0.3, 1, idx, "pre");
            }
            me.data("_curIdx", idx);
        },
        onPage:function (idx) {
            this.data("isSliding", true);
            var me = this,
                contents = me.data("content"),
                content = contents[idx],
                sliders = me.data("sliders");
            if (me.data("_curIdx") == idx) return;
            if (me.data("_curIdx") > idx) {
                sliders[0].append(content.widget());
                me.onX(me.widget(), me.data("_scrollWidth"), 0.3, 1, idx, "pre");
            } else if (me.data("_curIdx") < idx) {
                sliders[2].append(content.widget());
                me.onX(me.widget(), -me.data("_scrollWidth"), 0.3, 1, idx, "bac");
            }
            me.data("_x", me._getCSSX(me.widget()));
            me.data("_curIdx", idx);
        },
        onX:function (obj, tar, eas, dur, idx, flag) {
            var me = this;
            me.data("_x", me._getCSSX(me.widget()));
            var xIn = setInterval(me._translate, dur, obj, tar, eas, idx, flag, me);
            me.data("xIn", xIn);
        },
        _translate:function (obj, tar, eas, idx, flag, me) {
            var x = me.data("_x"), sliders = me.data("sliders"), skeleton = me.widget();
            if (me._near(x, tar)) {
                clearInterval(me.data("xIn"));

                if (flag == "pre") {
//                    sliders.unshift(sliders.pop());
//                    sliders[1].html(sliders[0].html());
//                    sliders[1].append(me.data("content")[idx].widget())
                } else if (flag == "bac") {
//                    sliders.push(sliders.shift());
//                    sliders[1].html(sliders[0].html());
//                    sliders[1].append(me.data("content")[idx])
//                    sliders[1].append("<div>1</div>")
//                    sliders[1].append(me.data("content")[idx].widget())
                }
//                skeleton.html("");
//                for (var j in sliders) {
//                    skeleton.append(sliders[j])
//                }
//                me.widget().css("left", "-100%");
//                me._setCSSX(me.widget(), 0);
//                setTimeout(function(){
//                    sliders[1].html("");
//                }, 400);
                me.data("isSliding", false);
                return;
            }
            x = x + (tar - x) * eas;
            me.data("_x", x);
            me._setCSSX(obj, x);
        },
        _near:function (src, tar) {
            if (Math.abs(src - tar) < 1) {
                return true;
            }
            return false;
        },
        _getCSSX:function (obj) {
            var pro = obj.css("-webkit-transform");
            if (this.data("tranReg").test(pro)) {
                var x = parseInt(RegExp.$1.split("px,")[0])
                return x;
            }
            return null;
        },
        _setCSSX:function (obj, value) {
            obj.css("-webkit-transform", "translate3d(" + value + " , 0, 0)");
        },
        _eventHandler:function () {
            var me = this,
                isOrientSupported = "onorientationchange" in window,
                orientationEvent = isOrientSupported ? "orientationchange" : "resize";
            var sliders = this.data("sliders");

            window.addEventListener(orientationEvent, function () {
                setTimeout(function(){
                    me.data("_scrollWidth", document.documentElement.clientWidth);
//                    me._setCSSX(me.widget(), me._getCSSX(me.widget()) - me.data("_scrollWidth") * me.data("_curIdx"))
//                    me._setCSSX(me.widget(), me.data("_scrollWidth"))
                }, 400);
                for (var i in sliders) {
                    sliders[i].css("width", "50%")
                }
            }, false);

            $(document).ready(function () {
                me.data("_scrollWidth", document.documentElement.clientWidth);
                me.data("_x", me._getCSSX(me.widget()));
            })
        },
        reset:function(){
            var content = this.data("content");
            for(var i in content){
                content[i].reset();
            }
        }
    });
})(Zepto);