
/**
 * @file
 * @name Navigator
 * @desc <qrcode align="right" title="Live Demo">../gmu/_examples/webapp/navigator/tab.html</qrcode>
 * @desc 导航栏组件
 * @import core/zepto.ui.js
 */

(function ($, undefined) {
    /**
     * @name navigator
     * @grammar navigator(options)  ⇒ self
     * @grammar $.ui.navigator([el [,options]])  ⇒ self
     * @desc
     * **Options**
     * - ''container''       {Selector|Zepto}:    (可选)父容器，渲染的元素，默认值：document.body
     * - ''content''         {Array}:             (必选)导航tab项的内容，支持fix的元素(设置pos)及自定义属性(设置attr){text:\'\',url:\'\',pos:\'\',attr:{a:\'\',b:\'\'}}
     * - ''defTab''          {Number}:            (可选, 默认:0)默认选中的导航tab项的索引，若为默认选中固定tab，则索引值在原来tabs.length上加1，默认值：0
     * - ''beforetabselect'' {Function}:          (可选)tab选中前的事件，可阻止tab选中
     * - ''tabselect''       {Function}:          (可选)tab选中时的事件
     *
     * **setup方式html规则**
     * <code type="html">
     * <div>
     *     <ul>
     *         <li><a href="#test1">首页</a></li>
     *         <li><a href="javascript:;">电影</a></li>
     *         <li><a class="cur" href="javascript:;">电视剧</a></li>
     *     </ul>
     * </div>
     * </code>
     * **full setup方式html规则**
     * <code type="html">
     * <div class="ui-navigator">     <!--需将所有的class都写全，在网速较慢时先展示-->
     *     <ul class="ui-navigator-list">
     *         <li><a href="#test1">首页</a></li>
     *         <li><a href="javascript:;">电影</a></li>
     *         <li><a class="cur" href="javascript:;">电视剧</a></li>
     *     </ul>
     * </div>
     * </code>
     * **Demo**
     * <codepreview href="../gmu/_examples/webapp/navigator/tab.html">
     * ../gmu/_examples/webapp/navigator/tab.html
     * </codepreview>
     */
    var tmpl = '<% for (var i=0, len=left.length; i<len; i++) { %>'
            + '<a href="<%=left[i].url%>" class="ui-navigator-fix ui-navigator-fixleft"><%=left[i].text%></a>'
            + '<% } %>'
            + '<ul class="ui-navigator-list">'
            + '<% for (var i=0, len=mid.length; i<len; i++) { %>'
            + '<li><a href="<%=mid[i].url%>"><%=mid[i].text%></a></li>'
            + '<% } %></ul>'
            + '<% for (var i=0, len=right.length; i<len; i++) { %>'
            + '<a href="<%=right[i].url%>" class="ui-navigator-fix ui-navigator-fixright"><%=right[i].text%></a>'
            + '<% } %>';

    $.ui.define("navigator", {
        _data: {
            container: "",
            content: [],
            defTab: 0,
            beforetabselect: null,
            tabselect: null
        },
        _create: function () {
            var me = this,
                data = me._data,
                $el = me.root(),
                container = $(data.container || document.body).get(0),
                tabObj = {left: [],mid: [],right: []},html;

            $.each(data.content, function () {      //组合数据
                tabObj[this.pos ? this.pos : 'mid'].push(this);
            });

            html = $.parseTpl(tmpl, tabObj)       //解析数据模板
            if ($el) {
                $el.append(html);
                (!$el.parent().length || container !== document.body) && $el.appendTo(container);
            } else {
                me.root($("<div></div>").append(html)).appendTo(container);
            }
        },
        _setup: function (fullMode) {
            var me = this,
                data = me._data,
                defTab = data.defTab,
                $el = me.root();
            if (!fullMode) {
                $el.children('a').addClass('ui-navigator-fix');     //smart模式针对内容添加样式
                $el.children('ul').addClass('ui-navigator-list');
            }
            $el.find('a').each(function (i) {
                $(this).hasClass('cur') && defTab === 0 && (data.defTab = i);
            });
        },
        _init: function () {
            var me = this,
                data = me._data,
                $el = me.root(),
                content = data.content,
                $tabList = $el.find('a');    //包括fix的tab和可滑动的tab

            $tabList.each(function (i) {
                this.index = i;
                content.length && content[i].attr && $(this).attr(content[i].attr);     //添加自己定义属性
            });
            data._$tabList = $tabList;
            data._lastIndex = -1;

            $el.addClass('ui-navigator').on('click', $.proxy(me._switchTabHandler, me));
            me.switchTo(data.defTab, true);    //设置默认选中的tab
        },
        _switchTabHandler: function (e) {
            var me = this,
                target = e.target;

            while (target.nodeType != 1) {    //ios4中，e.target会取到text节点
                target = target.parentNode;
            }

            var beforeSelectEvent = $.Event('beforetabselect');
            me.trigger(beforeSelectEvent, target);
            if (beforeSelectEvent.defaultPrevented) {     //阻止默认事件
                e.preventDefault();
                return me;
            };

            target.tagName.toLowerCase() == 'a' && me.switchTo(target.index);
            return me;
        },
        /**
         * @name switchTo
         * @desc 切换到某个tab
         * @grammar switchTo()  ⇒ self
         * @example
         * $('#nav').navigator('switchTo', 1);      //setup模式
         * var nav = $.ui.navigator(opts);      //render模式
         * nav.switchTo(1);
         */
        switchTo: function (index, isDef) {
            var me = this,
                data = me._data,
                lastIndex = data._lastIndex,
                $tabList = data._$tabList;

            if (lastIndex == index) return me;            //当选中的是同一个tab时，直接返回
            lastIndex >= 0 && $tabList.eq(lastIndex).removeClass("cur");      //修改样式放在跳转后边
            $tabList.eq(index).addClass("cur");
            data._lastIndex = index;

            return me.trigger('tabselect', $tabList.get(index), lastIndex);
        },
        /**
         * @name getCurTab
         * @desc 切换到某个tab
         * @grammar getCurTab()  ⇒ tab obj
         * @example
         * $('#nav').navigator('getCurTab');      //setup模式
         * var nav = $.ui.navigator(opts);      //render模式
         * nav.getCurTab();     //返回当前tab信息，包括index和当前tab elem
         */
        getCurTab: function () {
            var me = this,
                data = me._data,
                lastIndex = data._lastIndex;

            return {
                index: lastIndex,
                info: data._$tabList[lastIndex]
            }
        }
    });
    
})(Zepto);
