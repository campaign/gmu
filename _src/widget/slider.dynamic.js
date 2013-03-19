(function($, undefined){
    var itemRender = function(item){
        return '<div class="ui-slider-item">' +
            '<a href="' + item.href + '"><img lazyload="' + item.pic + '"/></a>' +
            (item.title ? '<p>' + item.title + '</p>': '') + '</div>';
    }

    $.ui.slider.register(function(){
        return {
            pluginName: 'dynamic',

            _setup: function(){
                throw new Error("This plugin does not support setup mode");
            },

            _create: function(){
                var data = this._data,
                    i = 0, item,
                    render, group,
                    content = data.content;
                this._initConfig();

                render = data.itemRender || itemRender;//allow customize render
                group = $('<div class="ui-slider-group"></div>');

                for(; i<3 && (item = content[i]); i++)
                    group.append(
                        $(render(item))
                            .addClass('ui-slider-item')
                            .attr('data-index', i)
                    );

                (this.root() || this.root($('<div></div>')))
                    .addClass('ui-slider')
                    .appendTo(data.container || (this.root().parent().length ? '' : document.body))
                    .html(
                        $('<div class="ui-slider-wheel"></div>')
                            .append(group)
                    );

                this._addDots();
                this._delta = 0;
            },

            _transitionEnd: function(){
                this._transitionEndOrg();
                this._updateList();
            },

            _updateList: function(){
                var data = this._data,
                    root = this.root(),
                    content = data.content,
                    length = content.length,
                    index = this._index || 0,
                    activeEl = root.find('[data-index="'+index+'"]'),
                    pos = activeEl.index(),
                    delta = pos - 1,
                    next = index + delta,
                    item, elem, width = data.width,
                    group = root.find('.ui-slider-group'),
                    render = data.itemRender || itemRender;

                if(!~pos)return ;

                if(delta && next < length && next >= 0 ){
                    //need to move
                    item = content[next];
                    elem = $(render(item))
                        .addClass('ui-slider-item')
                        .attr('data-index', next);

                    elem.find('img[lazyload]').each(function(){
                        this.src = this.getAttribute('lazyload');
                    });

                    group.children().eq(1-delta)
                        .remove();

                    group[delta<0?'prepend':'append'](elem);

                    data.index -= delta;
                    this._delta += delta;

                    group.children().each(function(i){
                        this.style.cssText += 'width:'+ width + 'px;position:absolute;-webkit-transform:translate3d(' + i * width + 'px,0,0);z-index:' + (900 - i);
                    });

                    data.wheel.style.cssText += '-webkit-transition:0ms;-webkit-transform:translate3d(-' + data.index * data.width + 'px,0,0);';

                }
            },

            /**
             * 添加底部圆点及两侧箭头
             */
            _addDots:function() {
                var me = this,
                    root = me.root(),
                    length = me.data('content').length,
                    html = [];
                if(me.data('showDot')) {
                    html.push('<p class="ui-slider-dots">');
                    while(length--) html.push('<b></b>');
                    html.push('</p>');
                }
                me.data('showArr') && (html.push('<span class="ui-slider-pre"><b></b></span><span class="ui-slider-next"><b></b></span>'));
                root.append(html.join(''));
            },

            /**
             * 轮播位置判断
             */
            _move:function(index) {
                var data = this._data,
                    dots = data.dots;

                this._index = index + this._delta;

                this.trigger('slide', this._index);
                if(data.showDot) {
                    data.dot.className = '';
                    data.dot = dots[this._index];
                    data.dot.className = 'ui-slider-dot-select';
                }
                data.index = index;
                data.wheel.style.cssText += '-webkit-transition:' + data.animationTime + 'ms;-webkit-transform:translate3d(-' + index * data.width + 'px,0,0);';
            },

            /**
             * @desc 获取当前位置
             * @name index
             * @grammar index() => value
             * @example
             * var demo = $.ui.slider();
             * demo.index();
             */
            index: function(){
                return this._index || 0;
            },

            /**
             * @desc 获取总数量
             * @name length
             * @grammar length() => value
             * @example
             * var demo = $.ui.slider();
             * demo.length();
             */
            length: function(){
                return this.data('content').length;
            },

            /**
             * @desc 修改内容。
             * @name update
             * @grammar update(content) => undefined
             * @grammar update(content, true) => undefined
             * @example
             * var demo = $.ui.slider();
             * demo.update();
             */
            update: function(content, end){
                var data = this._data,
                    root = this.root(),
                    group = root.find('.ui-slider-group'),
                    arr, index, i, len,
                    width = data.width,
                    dots, html, start,
                    render = data.itemRender || itemRender;

                data.content = content = content.concat();
                arr = end? content.slice(-3) : content.slice(0, 3);
                index = end? content.length-1 : 0;
                data.index = end?2: 0;
                this._delta = index - data.index;
                start = end? content.length-3 : 0;

                group.empty();
                for(i =0, len = arr.length; i<len; i++){
                    group.append(
                        $(render(arr[i]))
                            .addClass('ui-slider-item')
                            .attr('data-index', start + i)
                            .css({
                                width: width + 'px',
                                position: 'absolute',
                                '-webkit-transform': 'translate3d(' + i * width + 'px,0,0)',
                                zIndex: 900-i
                            })
                    );
                }
                data.wheel.style.cssText += '-webkit-transition:0ms;-webkit-transform:translate3d(-' + data.index * width + 'px,0,0);';
                group.find('img[lazyload]').each(function(){
                    this.src = this.getAttribute('lazyload');
                });

                if(data.showDot) {
                    dots = root.find('.ui-slider-dots');
                    html = '';
                    i = content.length;
                    while(i--)html+='<b></b>';
                    dots.html(html);
                    dots = dots.children().toArray();
                    console.log(dots);
                    data.dots = dots;
                    data.dot = dots[index];
                    data.dot.className = 'ui-slider-dot-select';
                }
            }
        }
    });
})(Zepto);