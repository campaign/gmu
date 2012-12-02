///import ui.mobile.mobile;
///import ui.mobile.ex;
///import ui.mobile.widget;
///import ui.mobile.control;

/**
 * @fileOverview
 * @description button组件
 */

(function ($, undefined) {
    /**
     * @description button组件
     * @class
     * @name $.ui.button
     * @grammar $.ui.button(el[,options])
     * @param {selector} el (可选)根元素
     * @param {Object} options 参数
     * @param {String} options.skin (可选)风格
     * @param {String} options.text (可选)内容
     * @param {String} options.title (可选)标题
     * @param {String} options.href (可选)链接
     * @param {selector} options.container (可选)渲染到哪个元素
     * @param {Boolean} options.disabled (可选)禁用与否
     * @param {Event} options.onclick (可选)组件dom点击时触发
     * @param {Event} options.oncreate (可选)组件创建节点后执行
     * @param {Event} options.oninit (可选)组件初始化后执行
     * @param {Event} options.onstatechange (可选)当状态可用与不可用发生变化时触发
     */
    $.widget('button', {
        _data:{
            selector:'',
            skin:'',
            container:'',
            disabled:false
        },

        mixin:'GMU.common.fix',

        _create:function () {
            this.root($('<a></a>'));
            this.trigger('create');
        },

        _init:function () {
            var me = this,
                $el = me.root(),
                val,
                skin = me.data('skin'),
                eventHandler = $.bind(me._eventHandler, me);

            $.each(['text', 'href', 'title', 'container'], function (i, key) {
                if ((val = me.data(key) ) !== undefined) {
                    switch (key) {
                        case 'container':
                            val && $el.appendTo(val);
                            break;
                        case 'text':
                            $el.html(val);
                            break;
                        default:
                            $el.attr(key, val);
                            break;
                    }
                }
            });

            $el.addClass('ui-button' + (skin ? ' ui-button-' + skin + '' : ''))
                .on('touchstart touchend tap touchcancel', eventHandler);
            $(document).on('touchstart', eventHandler);
            me._setState(!this.data('disabled'), true, true);
            me.on('destroy', function () {
                $el.off('touchstart touchend tap touchcancel', eventHandler);
                $(document).off('touchstart', eventHandler);
                eventHandler = null;
            });
            me.trigger('init');
        },

        /**
         * 事件管理器
         * @private
         */
        _eventHandler:function (e) {
            var me = this,
                type = e.type,
                currentTarget = e.currentTarget,
                $el = me.root(),
                skin = me.data('skin'),
                handler;

            switch (type) {
                case 'touchstart':
                case 'mousedown':
                    if (currentTarget == document) {
                        (e._target ? $el.not(e._target) : $el)
                            .filter('.ui-button-hover').
                            removeClass('ui-button-hover' + (skin ? ' ui-button-' + skin + '-hover' : ''));
                        return;
                    }
                    if (me.data('disabled')) {
                        e.preventDefault();
                        return false;
                    }
                    $(currentTarget).addClass('ui-button-hover' + (skin ? ' ui-button-' + skin + '-hover' : ''));
                    e._target = currentTarget;
                    break;
                case 'touchend':
                case 'mouseup':
                case 'touchcancel':
                    $(currentTarget).removeClass('ui-button-hover' + (skin ? ' ui-button-' + skin + '-hover' : ''));
                    break;
                case 'tap':
                case 'click':
                    if (me.data('disabled')) {
                        e.preventDefault();
                        return false;
                    }
                    handler = this.data('on' + type);
                    handler && handler.call(me.root().get(0), e, {instance: me});
                    break;
            }
        },

        /**
         * 设置按钮状态，传入true，设置成可用，传入false设置成不可用
         * @param enable
         * @private
         */
        _setState:function (enable, force, notrigger) {
            var me = this,
                preState = !me.data('disabled'),
                $el = me.root(),
                skin = me.data('skin');

            if (force || enable != preState) {
                $el[enable ? 'removeClass' : 'addClass']('ui-button-disabled' + (skin ? ' ui-button-' + skin + '-disabled' : ''));
                this.data('disabled', !enable);
                notrigger || me.trigger('stateChange', enable);
            }
            return me;
        },

        /**
         * @description 设置成可用状态
         * @function
         * @name $.ui.button.enable
         * @param {Boolean} force 如果force设成了true，不管当前是否为已开启状态，都会触发stateChange事件
         * @return {Object} this
         */
        enable:function (force) {
            return this._setState(true, force);
        },

        /**
         * @description 设置成不可用状态
         * @function
         * @name $.ui.button.disable
         * @param {Boolean} force 设置成不可用状态
         * @return {Object} this
         */
        disable:function (force) {
            return this._setState(false, force);
        },

        /**
         * @description 切换可用与不可用状态
         * @function
         * @name $.ui.button.toggleEnable
         * @return {Object} this
         */
        toggleEnable:function () {
            return this._setState(this.data('disabled'));
        }

    });
})(Zepto);