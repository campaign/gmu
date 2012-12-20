/**
 *  @file 实现了通用highlight方法。
 *  @name Highlight
 *  @desc 点击高亮效果
 *  @import core/zepto.js, core/zepto.extend.js
 */
(function($) {
    var actElem;
    $.extend($.fn, {
        /**
         * @name highlight
         * @desc 禁用掉系统的高亮，当手指移动到元素上时添加指定class，手指移开时，移除该class
         * @grammar  highlight(className)   ⇒ self
         * @example var div = $('div');
         * div.highlight('div-hover');
         *
         * $('a').highlight();// 把所有a的自带的高亮效果去掉。
         */
        highlight: function(className) {
            return this.each(function() {
                var $el = $(this),
                    events = 'touchstart.highlight touchend.highlight touchmove.highlight touchcancel.highlight',
                    timer;
                timer && clearTimeout(timer);
                $el.css('-webkit-tap-highlight-color', 'rgba(255,255,255,0)').off(events);
                className && $el.on(events, function(e) {
                    switch (e.type) {
                        case 'mousedown':
                        case 'touchstart':
                            actElem && actElem.removeClass(className);
                            timer = $.later(function() {
                                actElem = $el.addClass(className);
                            }, 100);
                            break;
                        default:
                            clearTimeout(timer);
                            $el.removeClass(className);
                            actElem = null;
                    }
                });
            })
        }
    });
})(Zepto);
