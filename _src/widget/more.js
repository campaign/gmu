
/**
 * @file 显示更多组件
 * @name More
 * @desc 在顶部工具栏显示更多的连接
 * @import core/zepto.extend.js, core/zepto.ui.js
 */

(function($, undefined) {
    /**
     * @name     $.ui.more
     * @grammar  $(el).more(options) ⇒ self
     * @grammar  $.ui.more([el [,options]]) =>instance
     * @desc **el**
     * css选择器, 或者zepto对象
     * **Options**
     * - ''content'' {Array}: (必选) 内容
     * - ''container'' {selector}: (可选，默认：body) 组件容器
     * - ''columnNum'' {Number}: (可选，默认：5) 列数
     * **Demo**
     * <codepreview href="../gmu/_examples/widget/more/more.html">
     * ../gmu/_examples/widget/more/more.html
     * ../gmu/_examples/widget/more/more_demo.css
     * </codepreview>
     */
    $.ui.define('more', {
        _data:{
            content:    [],
            columnNum:  5,
            _isShow:    false
        },
        _create: function() {
            var me = this,
                $elem = (me.root() || me.root($('<div></div>'))).addClass('ui-more'),
                content = me.data('content').concat();  //make a copy for splice
            if(!content.length) return me;
            var html = (function() {
                var html = ['<div class="ui-more-arrow"></div>'],
                    temp, len, i, j,
                    num = me.data('columnNum'),
                    percent = 100 / num;
                while(true) {
                    temp = content.splice(0, num);
                    len = temp.length;
                    if(len) {
                        html.push('<div class="ui-more-links">');
                        for(i = 0; j = temp[i]; i++) html.push('<a href="' + j.url + '"data-key="' + (j.key || 'word') + '" style="width:' + percent + '%;">' + j.text + '</a>');
                        html.push('</div>');
                    } else break;
                }
                return html.join('');
            }());
            $elem.html(html).appendTo(me.data('container') || ($elem.parent().length ? '' : document.body));
            return me;
        },

        _setup: function(mode) {
            var me = this,
                $elem = me.root().addClass('ui-more');
            if(!mode) {
                var items = $elem.children().toArray(),
                    num = me.data('columnNum'),
                    percent = 100 / num, group;
                $('<div class="ui-more-arrow"></div>').appendTo($elem.empty());
                while(true) {
                    group = items.splice(0, num);
                    if(group.length) {
                        $elem.append($('<div class="ui-more-links"></div>').append($(group).css('width', percent + '%')));
                    } else break;
                }
            }
            $elem.appendTo(me.data('container'));
        },
        _init: function() {
            return this;
        },

        /**
         * @desc 显示more
         * @name show
         * @grammar show() => self
         * @example
         * //setup mode
         * $('#more').more('show');
         *
         * //render mode
         * var demo = $.ui.more();
         * demo.show();
         */
        show: function() {
            var me = this;
            if(!me.data('_isShow')) {
                me.root().css('display', 'block');
                me.data('_isShow', true);
                me.trigger('show');
            }
            return me;
        },

        /**
         * @desc 隐藏more
         * @name hide
         * @grammar hide() => self
         * @example
         * //setup mode
         * $('#more').more('hide');
         *
         * //render mode
         * var demo = $.ui.more();
         * demo.hide();
         */
        hide: function() {
            var me = this;
            if(me.data('_isShow')) {
                me.root().css('display', 'none');
                me.data('_isShow', false);
                me.trigger('hide');
            }
            return me;
        },

        /**
         * @desc 切换more的显隐状态
         * @name toggle
         * @grammar toggle() => self
         * @example
         * //setup mode
         * $('#more').more('toggle');
         *
         * //render mode
         * var demo = $.ui.more();
         * demo.toggle();
         */
        toggle: function() {
            var me = this;
            me.data('_isShow') ? me.hide() : me.show();
            return me;
        }
        /**
         * @name Trigger Events
         * @theme event
         * @desc 组件内部触发的事件
         * ^ 名称 ^ 处理函数参数 ^ 描述 ^
         * | init | event | 组件初始化的时候触发，不管是render模式还是setup模式都会触发 |
         * | show | event | 显示时触发的事件 |
         * | hide | event | 隐藏时触发的事件 |
         * | destory | event | 组件在销毁的时候触发 |
         */
    });

})(Zepto);

