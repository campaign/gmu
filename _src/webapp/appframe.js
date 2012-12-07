
/**
 * @file
 * @name Appframe
 * @desc webapp框架
 * @import core/zepto.extend.js, core/zepto.ui.js
 */

(function($, undefined) {
    /**
     * @name     $.ui.appframe
     * @grammar  $(el).appframe(options) ⇒ self
     * @desc **el**
     * css选择器, 或者zepto对象
     * **Options**
     * - ''slide'' {Function}: (可选) 横向滚动前触发的事件
     * - ''slideend'' {Function}: (可选) 横向滚动后触发的事件
     * **Demo**
     * <codepreview href="../gmu/_examples/webapp/appframe/appframe.html">
     * ../gmu/_examples/webapp/appframe/appframe.html
     * ../gmu/_examples/webapp/appframe/appframe_demo.css
     * </codepreview>
     */
    $.ui.define('appframe', {
        _data:{
            index:              0,
            slide:              null,
            slideend:           null
        },

        _create:function() {
            throw('Sorry,:(');
        },

        _setup: function(mode) {
            var me = this,
                root = me.root().addClass('ui-appframe');
            if(!mode) {
                var items = root.children().addClass('ui-appframe-item');
                root.empty().append($('<div class="ui-appframe-wheel"></div>').append(items)).append('<div class="ui-appframe-scrollbar"></div>');
            }
            me._setWidth();
        },

        _init:function() {
            var me = this,
                wheel = me.data('wheel'),
                _eventHandler = $.proxy(me._eventHandler, me);
            wheel.addEventListener('touchstart', function(e) {
                var o = me._data,
                    index = o.index,
                    node = o.items[index];
                if(o.rolling) {
                    var stopY = +getComputedStyle(node, null)['-webkit-transform'].replace(/[^0-9-.,]/g, '').split(',')[5];
                    if(stopY > o.data[index].bottom && stopY < 0) {
                        node.style.webkitTransform = 'translate3d(0,' + stopY + 'px,0)';
                        o.data[index].y = stopY;
                        o.rolling = false;
                    }
                }
                o.sliding || me._showBar();
                me.data({
                    stamp:      +new Date,
                    startX:     e.touches[0].pageX,
                    startY:     e.touches[0].pageY,
                    S:          false,              //isScrolling
                    T:          false,              //isTested
                    X:          0,                  //horizontal moved
                    Y:          0,                  //vertical moved
                    baseY:      o.data[index].y     //speed calculate base
                });
            });

            wheel.addEventListener('touchmove', function(e) {
                e.preventDefault();
                var o = me._data;
                if(!o.T) {
                    o.S = Math.abs(e.touches[0].pageX - o.startX) < Math.abs(e.touches[0].pageY - o.startY);
                    if(o.S) {
                        o.items[o.index].style.webkitTransition = '0ms';
                        o.bar.style.cssText += 'opacity:0.7;-webkit-transition:200ms;';
                    } else o.wheel.style.webkitTransition = '0ms';
                    o.rolling = false;
                    o.T = true;
                }
                if(!o.S) {
                    o.X = e.touches[0].pageX - o.startX;
                    o.wheel.style.webkitTransform = 'translate3d(' + (o.X - o.index * o.width) + 'px,0,0)';
                    o.bar.style.opacity = 0;
                } else {
                    var data = o.data[o.index],
                        deltaY = o.Y = e.touches[0].pageY - o.startY,
                        nowY = deltaY + data.y;
                    nowY = nowY > 0 ? 0.4 * nowY : nowY < data.bottom ? data.bottom - 0.4 * (data.bottom - nowY) : nowY;
                    if(e.timeStamp - o.stamp > 300) {
                        o.stamp = e.timeStamp;
                        o.baseY = nowY;
                    }
                    o.items[o.index].style.webkitTransform = 'translate3d(0,' + nowY + 'px,0)';
                    o.bar.style.top = -nowY * data.percent + 'px';
                }
            });
            wheel.addEventListener('touchend', _touchEnd);
            wheel.addEventListener('touchcancel', _touchEnd);
            function _touchEnd() {
                var o = me._data;
                if(o.T) if(o.S) {
                    var data = o.data[o.index];
                    data.y += o.Y;
                    me._scroll(data.y - o.baseY, +new Date - o.stamp);
                } else me._slide(o.index + (o.X <= -15 ? 1 : (o.X > 15) ? -1 : 0));
                else me._hideBar();
            }
            $(wheel).on('webkitTransitionEnd', _eventHandler);
            $(window).on('ortchange', _eventHandler);
            me.on('destroy',function() { $(window).off('ortchange', _eventHandler) });
        },

        /**
         * 设置轮播条及元素宽度
         */
        _setWidth:function(){
            var me = this,
                o = me._data,
                width = window.innerWidth,
                root = me.root().height(window.innerHeight),
                items = o.items = $('.ui-appframe-item', root).toArray(),
                length = items.length,
                data = o.data = [], i = 0;
            for(; i < length; i ++){
                items[i].style.cssText += 'left:' + i * width + 'px;width:' + width + 'px';
                data[i] = { y: 0 };
                me._refreshHeight(i);
            }
            me.data({
                wheel:          $('.ui-appframe-wheel', root).width(width * length)[0],
                bar:            $('.ui-appframe-scrollbar', root).height(o.data[o.index].bH)[0],
                length:         length,
                width:          width,
                math:           Math
            });
            return me;
        },

        /**
         * 事件管理函数
         */
        _eventHandler:function(e) {
            var me = this;
            switch (e.type) {
                case 'webkitTransitionEnd':
                    var target = $(e.target);
                    target.hasClass('ui-appframe-item') ? me._scrollEnd() :
                    target.hasClass('ui-appframe-wheel') ? me._slideEnd() : '';
                    break;
                case 'ortchange':
                    me._resize.call(me);
                    break;
            }
        },

        /**
         * 竖向滑动位置判断
         */
        _scroll: function(deltaY, time) {
            var me = this,
                o = me._data,
                data = o.data[o.index],
                y = data.y,
                bottom = data.bottom;
            if(y < bottom) me._roll({time: 300, to: bottom});
            else if(y > 0) me._roll({time: 300, to: 0});
            else{
                var D = 0.0006,
                    M = o.math,
                    H = o.wH,
                    T = -y,
                    B = y - bottom,
                    S = M.abs(deltaY) / time,
                    dist = S * S / 2 / D;
                if (deltaY > 0 && dist > T) {
                    T += H / (6 / (dist / S * D));
                    S = S * T / dist;
                    dist = T;
                } else if (deltaY < 0 && dist > B) {
                    B += H / (6 / (dist / S * D));
                    S = S * B / dist;
                    dist = B;
                }
                me._roll({ time:M.max(M.round(S / D), 10), to: dist * (deltaY < 0 ? -1 : 1) + y });
            }
        },

        /**
         * 竖向滑动方法
         */
        _roll: function(target) {
            var me = this,
                o = me._data,
                index = o.index,
                data = o.data[index];
            o.rolling = true;
            data.y = target.to;
            o.items[index].style.cssText += '-webkit-transition:' + target.time + 'ms;-webkit-transform:translate3d(0,' + target.to + 'px,0)';
            o.bar.style.cssText +='height:' + data.bH + 'px;-webkit-transition:' + target.time + 'ms;opacity:0.7;top:'+ (-target.to * data.percent) + 'px';
        },

        /**
         * 竖向滑动结束
         */
        _scrollEnd: function() {
            var me = this,
                o = me._data,
                data = o.data[o.index],
                y = data.y;
            if(y > 0) me._roll({time:200, to: 0});
            else if(y < data.bottom) me._roll({time:300, to: data.bottom});
            else {
                o.rolling = false;
                me._hideBar();
            }
        },

        /**
         * 横向滑动位置判断
         */
        _slide:function(index) {
            var me = this,
                length = me.data('length');
            me.trigger('slide', index);
            return me._slip(index < 0 ? 0 : index > length - 1 ? length - 1 : index);
        },

        /**
         * 横向滑动方法
         */
        _slip:function(index) {
            var me = this,
                o = me._data;
            o.sliding = true;
            o.index = index;
            o.wheel.style.cssText += '-webkit-transition:400ms;-webkit-transform:translate3d(-' + index * o.width + 'px,0,0)';
            return me;
        },

        /**
         * 横向滑动结束
         */
        _slideEnd: function() {
            var me = this,
                o = me._data;
            o.sliding = false;
            me.trigger('slideend', o.index);
            return me._showBar()._hideBar();
        },

        /**
         * 显示滚动条
         */
        _showBar: function() {
            var me = this,
                o = me._data,
                data = o.data[o.index];
            clearTimeout(o.barID);
            o.bar.style.cssText +='height:' + data.bH + 'px;-webkit-transition:300ms;opacity:0.7;top:'+ (-data.y * data.percent) + 'px';
            return me;
        },

        /**
         * 隐藏滚动条
         */
        _hideBar: function() {
            var me = this,
                o = me._data;
            clearTimeout(o.barID);
            o.barID = $.later(function() {
                o.bar.style.cssText += '-webkit-transition:600ms;opacity:0;';
            }, 2500);
            return me;
        },

        /**
         * 重设容器及子元素宽度
         */
        _resize:function() {
            var me = this,
                o = me._data,
                width = o.width = window.innerWidth,
                length = o.length,
                items = o.items;
            me.root().height(window.innerHeight);
            for(var i = 0; i < length; i++){
                items[i].style.cssText +='-webkit-transition:0ms;width:' + width + 'px;left:' + i * width + 'px;';
                me._refreshHeight(i);
            }
            o.wheel.style.removeProperty('-webkit-transition');
            o.wheel.style.cssText += 'width:' + width * length + 'px;-webkit-transform:translate3d(-' + o.index * width + 'px,0,0);';
            return me;
        },

        /**
         * 刷新容器及子元素高度
         */
        _refreshHeight: function(index) {
            var me = this,
                o = me._data,
                item = o.items[index],
                data = o.data[index],
                iH = item.offsetHeight,
                wH = o.wH = window.innerHeight,
                bottom = wH - iH,
                bH = wH * wH / iH;   //滚动条高度
            data.bottom = Math.min(0, bottom);
            data.bH = Math.min(wH, bH);
            data.percent = wH /iH;
            return me;
        },

        /**
         * @desc 滚动到上一张
         * @name pre
         * @grammar pre() => self
         * @example
         * //setup mode
         * $('#appframe').appframe('pre');
         *
         */
        pre:function() {
            return this._slide(this.data('index') - 1);
        },

        /**
         * @desc 滚动到下一张
         * @name next
         * @grammar next() => self
         * @example
         * //setup mode
         * $('#appframe').appframe('next');
         *
         */
        next:function() {
            return this._slide(this.data('index') + 1);
        },

        /**
         * @desc 刷新内容及高度
         * @name refresh
         * @grammar refresh() => self
         * @example
         * //setup mode
         * var demo = $('#appframe').appframe('this');//获得组件实例
         * demo.refresh('<p>some content</p>')  //设置当前页的内容
         * demo.refresh('#id')  //设置当前页的内容为#id元素
         * demo.refresh(function(){     //传入function
         *    this -->当前组件实例
         *    item -->当前页的dom节点
         * } [,1]);    //第2个参数为页面索引，第一页为0，不传的话默认为当前页
         */
        refresh: function(content, index) {
            var me = this,
                o = me._data,
                index = index !== undefined ? index : o.index,
                item = o.items[index];
            if(content) {
                if(typeof content === 'function') content.call(me, item);
                else if(typeof content === 'object') $(item).empty().append($(content));
                else if(typeof content === 'string') item.innerHTML = content;
                item.style.webkitTransform = 'translate3d(0,0,0)';
                o.data[index].y = 0;
            }
            me._refreshHeight(index);
            content && !o.isSliding && me._showBar();
            return me;
        }
        /**
         * @name Trigger Events
         * @theme event
         * @desc 组件内部触发的事件
         * ^ 名称 ^ 处理函数参数 ^ 描述 ^
         * | init | event | 组件初始化的时候触发，不管是render模式还是setup模式都会触发 |
         * | slide | event | 横向滚动前触发的事件 |
         * | slideend | event | 横向滚动后触发的事件 |
         * | destory | event | 组件在销毁的时候触发 |
         */
    });
})(Zepto);