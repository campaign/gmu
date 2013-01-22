/**
 * @file 日历组件
 * @name Datepicker
 * @desc 日历组件
 * @import core/zepto.extend.js, core/zepto.ui.js, core/zepto.highlight.js
 */
(function ($, undefined) {
    var monthNames = ["01月", "02月", "03月", "04月", "05月", "06月",
            "07月", "08月", "09月", "10月", "11月", "12月"],
        dayNames = ["日", "一", "二", "三", "四", "五", "六"],
        tpl = '<div class="ui-datepicker-header">' +
            '<a class="ui-datepicker-prev" href="#"><%=prevText%></a>' +
            '<div class="ui-datepicker-title"><%=year%>年<%=month%></div>' +
            '<a class="ui-datepicker-next" href="#"><%=nextText%></a>' +
            '</div>',
        offsetRE = /^(\+|\-)?(\d+)(M|Y)$/i,
        //获取月份的天数
        _getDaysInMonth = function (year, month) {
            return 32 - new Date(year, month, 32).getDate();
        },
        //获取月份中的第一天是所在星期的第几天
        _getFirstDayOfMonth = function (year, month) {
            return new Date(year, month, 1).getDay();
        };

    //@todo 支持各种格式
    $.datepicker = {
        parseDate:function (obj) {
            if ($.isDate(obj))return obj;
            return new Date(obj);
        },
        formatDate:function (date) {
            var formatNumber = $.datepicker.formatNumber;
            return date.getFullYear() + '-' + formatNumber(date.getMonth() + 1, 2) + '-' + formatNumber(date.getDate(), 2);
        },
        formatNumber:function (val, len) {
            var num = "" + val;
            while (num.length < len) {
                num = "0" + num;
            }
            return num;
        }
    }

    $.ui.define('datepicker', {
        _data:{
            defaultDate:null, //默认日期
            firstDay:1, //星期天用0表示, 星期一用1表示, 以此类推.
            maxDate:null, //可以选择的日期范围
            minDate:null,
            container:null, //如果为非inline模式，且不想再input的下面直接生成结构那就指定container.
            gap:true//是否显示间隙，星期列表与天数列表之间
        },

        _init:function () {
            var data = this._data, el = this.root(), eventHandler = $.proxy(this._eventHandler, this);
            this.date(data.defaultDate || (!data._inline && el.val() ? $.datepicker.parseDate(el.val()) : null) || new Date())
                .minDate(data.minDate)
                .maxDate(data.maxDate)
                .refresh();
            data._container.addClass('ui-datepicker').on('click', eventHandler);
            if (!data._inline) {
                el.on('focus', eventHandler);
                data._container.hide();
            }else data._isShow = true;
            data._inited = true;
        },

        _setup:function () {
            var data = this._data, el = this.root();
            data._inline = !el.is('input');
            data._container = data._inline ? el : $(data.container || ($('<div></div>').insertAfter(el)));
        },

        _create:function () {
            throw new Exception("此组件不支持render模式");
        },

        _eventHandler:function (e) {
            var match, me = this, data = me._data, root = data._container, target,
                cell, isPrev;
            switch (e.type) {
                case 'focus':
                    this.show();
                    break;
                default:
                    target = e.target;
                    if ((match = $(target).closest('.ui-datepicker-calendar tbody a', root.get(0))) && match.length) {
                        e.preventDefault();
                        cell = match.parent();
                        this.date(new Date(cell.attr('data-year'), cell.attr('data-month'), match.text()));
                        this[data._inline?'refresh':'hide']();
                    } else if ((match = $(target).closest('.ui-datepicker-prev, .ui-datepicker-next', root.get(0))) && match.length) {
                        e.preventDefault();
                        isPrev = match.is('.ui-datepicker-prev');
                        $.later(function(){
                            me.goto((isPrev ? '-' : '+') + '1M');
                        });
                    }
            }
        },

        _generateHTML:function () {
            var data = this._data, html = '', thead, tbody, i, j, firstDay, day, leadDays, daysInMonth, rows,
                printDate, drawYear = data._drawYear, drawMonth = data._drawMonth, otherMonth, unselectable,
                tempDate = new Date(), today = new Date(tempDate.getFullYear(), tempDate.getMonth(), tempDate.getDate()),
                minDate = this.minDate(), maxDate = this.maxDate(), selectedDate = this.date();

            firstDay = parseInt(data.firstDay, 10);
            firstDay = (isNaN(firstDay) ? 0 : firstDay);

            html += $.parseTpl(tpl, {
                prevText:'&lt;&lt;',
                nextText:'&gt;&gt;',
                year:data._drawYear,
                month:monthNames[data._drawMonth]
            });

            thead = '<thead><tr>';
            for (i = 0; i < 7; i++) {
                day = (i + firstDay) % 7;
                thead += '<th' + ((i + firstDay + 6) % 7 >= 5 ? ' class="ui-datepicker-week-end"' : '') + '>' +
                    '<span>' + dayNames[day] + '</span></th>';
            }
            thead += '</thead></tr>';

            tbody = '<tbody>';
            tbody += data.gap ? '<tr class="ui-datepicker-gap"><td colspan="7">&#xa0;</td></tr>' : '';
            daysInMonth = _getDaysInMonth(drawYear, drawMonth);
            leadDays = (_getFirstDayOfMonth(drawYear, drawMonth) - firstDay + 7) % 7;
            rows = Math.ceil((leadDays + daysInMonth) / 7);
            printDate = new Date(drawYear, drawMonth, 1 - leadDays);
            for (i = 0; i < rows; i++) {
                tbody += '<tr>';
                for (j = 0; j < 7; j++) {
                    otherMonth = (printDate.getMonth() !== drawMonth);
                    unselectable = otherMonth || (minDate && printDate < minDate) || (maxDate && printDate > maxDate);
                    tbody += "<td class='" +
                        ((j + firstDay + 6) % 7 >= 5 ? " ui-datepicker-week-end" : "") + // highlight weekends
                        (otherMonth ? " ui-datepicker-other-month" : "") + // highlight days from other months
                        (unselectable ? " ui-datepicker-unselectable ui-state-disabled" : "") + // highlight unselectable days
                        (otherMonth || unselectable ? '' :
                            (printDate.getTime() === selectedDate.getTime() ? " ui-datepicker-current-day" : "") + // highlight selected day
                                (printDate.getTime() === today.getTime() ? " ui-datepicker-today" : "")
                            ) + "'" + // highlight today (if different)
                        (unselectable ? "" : " data-month='" + printDate.getMonth() + "' data-year='" + printDate.getFullYear() + "'") + ">" + // actions
                        (otherMonth ? "&#xa0;" : // display for other months
                            (unselectable ? "<span class='ui-state-default'>" + printDate.getDate() + "</span>" : "<a class='ui-state-default" +
                                (printDate.getTime() === today.getTime() ? " ui-state-highlight" : "") +
                                (printDate.getTime() === selectedDate.getTime() ? " ui-state-active" : "") + // highlight selected day
                                "' href='#'>" + printDate.getDate() + "</a>")) + "</td>"; // display selectable date
                    printDate.setDate(printDate.getDate() + 1);
                }
                tbody += '</tr>';
            }
            tbody += '</tbody>';
            html += '<table  class="ui-datepicker-calendar">' + thead + tbody + '</table>';
            return html;
        },

        _isFromSelf:function (target) {
            var ret = false, data = this._data;
            $.each(this._el.add(data._container), function () {
                if (this === target || $.contains(this, target)) {
                    ret = true;
                    return false;
                }
            });
            return ret;
        },

        show:function () {
            var data = this._data, me=this;
            if (data._isShow)return this;
            data._inline || $(document).on('click.'+this.id(), function(e){
                me._isFromSelf(e.target) || me.hide();
            });
            data._isShow = true;
            this.refresh();
            data._container.show();
            return this.trigger('show');
        },

        hide:function () {
            var data = this._data, eventData;
            if (!data._isShow)return this;
            this.trigger(eventData = $.Event('beforehide'));
            if(eventData.defaultPrevented)return this;
            data._inline || $(document).off('click.'+this.id());
            data._isShow = false;
            data._container.hide();
            return this.trigger('hide');
        },

        option:function (key, val) {
            var data = this._data, date, dateStr;
            if (val !== undefined) {
                switch (key) {
                    case 'minDate':
                    case 'maxDate':
                        data[key] = val ? $.datepicker.parseDate(val) : null;
                        break;
                    case 'date':
                        val = $.datepicker.parseDate(val);
                        data._selectedYear = data._drawYear = val.getFullYear();
                        data._selectedMonth = data._drawMonth = val.getMonth();
                        data._selectedDay = val.getDate();
                        dateStr = $.datepicker.formatDate(date = this.date());
                        data._inline && this.root().val(dateStr);
                        data._inited && this.trigger('valuecommit', [date, dateStr, this]);
                        break;
                    case 'gap':
                        data[key] = val;
                        break;
                }
                data._invalid = true;
                return this;
            }
            return key == 'date' ? new Date(data._selectedYear, data._selectedMonth, data._selectedDay) : data[key];
        },

        maxDate:function (val) {
            return this.option('maxDate', val);
        },

        minDate:function (val) {
            return this.option('minDate', val);
        },

        date:function (val) {
            return this.option('date', val);
        },

        goto:function (month, year) {
            var data = this._data, offset, period, tmpDate, minDate = this.minDate(), maxDate = this.maxDate();
            if ($.isString(month) && offsetRE.test(month)) {
                offset = RegExp.$1 == '-' ? -parseInt(RegExp.$2, 10) : parseInt(RegExp.$2, 10);
                period = RegExp.$3.toLowerCase();
                month = data._drawMonth + (period == 'm' ? offset : 0);
                year = data._drawYear + (period == 'y' ? offset : 0);
            } else {
                month = parseInt(month, 10);
                year = parseInt(year, 10);
            }
            tmpDate = new Date(year, month, 1);
            tmpDate = minDate && minDate>tmpDate ? minDate : maxDate && maxDate < tmpDate ? maxDate: tmpDate;//不能跳到不可选的月份
            month = tmpDate.getMonth();
            year = tmpDate.getFullYear();
            if(month!=data._drawMonth || year!=data._drawYear){
                this.trigger('changemonthyear', [data._drawMonth = month, data._drawYear = year]);
                data._invalid = true;
                data._isShow && this.refresh();
            }
            return this;
        },

        refresh:function () {
            var data = this._data, cells;

            if (!data._invalid) {
                return;
            }
            if ((cells = $('.ui-datepicker-calendar td:not(.ui-state-disabled)', data._container)).length) {
                cells.highlight();
            }
            data._container.empty().append(this._generateHTML());
            $('.ui-datepicker-calendar td:not(.ui-state-disabled)', data._container).highlight('ui-state-hover');
            data._invalid = false;
            return this;
        },

        destroy:function () {
            var data = this._data, eventHandler = this._eventHandler;
            if (!data._inline) {
                this.root().off('focus', eventHandler);
                $(document).off('click.'+this.id());
            }
            $('.ui-datepicker-calendar td:not(.ui-state-disabled)', data._container).highlight();
            data._container.remove();
            return this.$super('destroy');
        }
    });
})(Zepto);