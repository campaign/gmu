module("widget/refresh",{
    setup:function () {
        var html = '<div class="wrapper">' +
            '<ul class="data-list">' +
            '<li>测试数据1</li>' +
            '<li>测试数据2</li>' +
            '<li>测试数据3</li>' +
            '<li>测试数据4</li>' +
            '<li>测试数据5</li>' +
            '<li>测试数据6</li>' +
            '<li>测试数据7</li>' +
            '<li>测试数据8</li>' +
            '<li>测试数据9</li>' +
            '<li>测试数据10</li>' +
            '</ul> ' +
            '</div> '

        $('body').append(html);
    },
    teardown: function () {
        $('.wrapper').remove();
    }
});


function createDom (dir, $wrapper) {
    var $wrapper = $wrapper || $('.wrapper'),
        upBtn = '<div class="ui-refresh-up"></div> ',
        downBtn = '<div class="ui-refresh-down"></div> ';
    switch (dir) {
        case 'up':
            $wrapper.prepend(upBtn);
            break;
        case 'down':
            $wrapper.append(downBtn);
            break;
        case 'both':
            $wrapper.prepend(upBtn);
            $wrapper.append(downBtn);
            break;
    }
};

function ready (dir, type, $elem) {
    var me = this;
    $.getJSON('../../widget/data/refresh.php', function (data) {
        render(data, dir, type, $elem);
        me.afterDataLoading();    //数据加载完成后改变状态
    });
};

function render(data, dir, type, $elem) {
    var $list = $elem || $('.data-list'),
        html = (function (data) {      //数据渲染
            var liArr = [];
            $.each(data, function () {
                liArr.push(this.html);
            });
            return liArr.join('');
        })(data);

    $list[dir == 'up' ? 'prepend' : 'append'](html);
}

test('默认配置项是否正确(只有setup模式)', function () {
    createDom('down');
    stop();
    ua.loadcss(["reset.css", "widget/refresh/refresh.default.css"], function () {
        var $wrapper = $('.wrapper'),
            refresh = $wrapper.refresh({
                ready: ready
            }).refresh('this');
        equals(refresh._el.hasClass('wrapper'), true, 'refresh[down]实例成功创建');
        equals($wrapper.hasClass('ui-refresh'), true, 'refresh[down] wrapper元素加上了ui-refresh的class');
        strictEqual($wrapper.find('.ui-refresh-down').length, 1, 'refresh[down]');
        strictEqual($wrapper.find('.ui-refresh-down').find('.ui-refresh-icon').length, 1, 'refresh[down] icon元素存在');
        strictEqual($wrapper.find('.ui-refresh-down').find('.ui-refresh-label').length, 1, 'refresh[down] label元素存在');
        refresh.destroy();
        start();
    })
});

test('参数options:ready', function () {
    createDom('up');
    expect(10);
    stop();

    var $wrapper = $('.wrapper'),
        liNum = $wrapper.find('li').length,
        refresh = $wrapper.refresh({
            ready: function (dir, type) {
                ok(true, 'ready is triggered');

                var me = this;
                $.getJSON('../../widget/data/refresh.php', function (data) {
                    render(data, dir, type);
                    me.afterDataLoading();    //数据加载完成后改变状态

                    equals(dir, 'up', 'ready参数dir正确');
                    equals(type, 'click', 'ready参数click正确');
                    equals($('.data-list').find('li').length, 20, 'refresh加载完成后列表数量正确');
                    refresh.destroy();
                    start();
                });
            }
        }).refresh('this')
    equals(refresh._el.hasClass('wrapper'), true, 'refresh[up]实例成功创建');
    equals($wrapper.hasClass('ui-refresh'), true, 'refresh[up] wrapper元素加上了ui-refresh的class');
    strictEqual($wrapper.find('.ui-refresh-up').length, 1, 'refresh[up]');
    strictEqual($wrapper.find('.ui-refresh-up').find('.ui-refresh-icon').length, 1, 'refresh[up] icon元素存在');
    strictEqual($wrapper.find('.ui-refresh-up').find('.ui-refresh-label').length, 1, 'refresh[up] label元素存在');
    equals(liNum, 10, '开始的数据列表数量正确');
    ua.click($('.ui-refresh-up')[0]);
});

test('参数options:statechange', function () {
    createDom('both');
    expect(33);
    stop();

    var count = 0,
        refreshCount = 0,
        refreshDir = 'up',
        $wrapper = $('.wrapper'),
        liNum = $wrapper.find('li').length,
        refresh = $wrapper.refresh({
            statechange: function (e, elem, state, dir) {
                ok(true, state + ' state is triggered');
                if (count > 1) {
                    e.preventDefault();   //自定义下载
                    switch (state) {
                        case 'loaded':
                            $(elem).html('加载完成测试');
                            break;
                        case 'loading':
                            $(elem).html('加载中测试');
                            break;
                    }
                }
                if (count === 0 || count === 2) {
                    equals($(elem).hasClass('ui-refresh-' + dir), true, 'statechange参数中elem正确');
                    equals(state, 'loading', 'statechange参数中state正确');
                    equals(dir, refreshDir, 'statechange参数中dir正确');
                    count === 2 && equals($(elem).html(), '加载中测试', '自定义loading样式生效');
                } else if (count === 1 || count === 3) {
                    equals($(elem).hasClass('ui-refresh-' + dir), true, 'statechange参数中elem正确');
                    equals(state, 'loaded', 'statechange参数中state正确');
                    equals(dir, refreshDir, 'statechange参数中dir正确');
                    count === 3 && equals($(elem).html(), '加载完成测试', '自定义loaded样式生效');
                }
                count++;
            },
            ready: function (dir, type) {
                ok(true, 'ready is triggered');

                var me = this;
                $.getJSON('../../widget/data/refresh.php', function (data) {
                    render(data, dir, type);
                    me.afterDataLoading(dir);    //数据加载完成后改变状态
                    refreshCount++;

                    equals(dir, refreshDir, 'ready参数dir正确');
                    equals(type, 'click', 'ready参数click正确');
                    if (refreshCount > 1) {
                        refresh.destroy();
                        start();
                    }
                });
            }
        }).refresh('this');
    equals(refresh._el.hasClass('wrapper'), true, 'refresh[both]实例成功创建');
    equals($wrapper.hasClass('ui-refresh'), true, 'refresh[both] wrapper元素加上了ui-refresh的class');
    strictEqual($wrapper.find('.ui-refresh-up').length, 1, 'refresh[both] refresh up按钮存在');
    strictEqual($wrapper.find('.ui-refresh-down').length, 1, 'refresh[both] refresh down按钮存在');
    strictEqual($wrapper.find('.ui-refresh-icon').length, 2, 'refresh[both] icon元素存在');
    strictEqual($wrapper.find('.ui-refresh-label').length, 2, 'refresh[both] label元素存在');
    equals(liNum, 10, '开始的数据列表数量正确');
    ok(true, '默认加载开始触发statechange');
    ua.click($('.ui-refresh-' + refreshDir)[0]);
    setTimeout(function () {
        ok(true, '自定样式加载开始触发statechange');
        refreshDir = 'down';
        ua.click($('.ui-refresh-' + refreshDir)[0]);
    }, 1000);
});

test('多实例', function () {
    expect(12);
    stop();
    createDom('up');
    var html2 = '<div class="wrapper2">' +
        '<ul class="data-list2">' +
        '<li>测试数据21</li>' +
        '<li>测试数据22</li>' +
        '<li>测试数据23</li>' +
        '<li>测试数据14</li>' +
        '<li>测试数据15</li>' +
        '<li>测试数据16</li>' +
        '<li>测试数据17</li>' +
        '<li>测试数据18</li>' +
        '<li>测试数据19</li>' +
        '<li>测试数据110</li>' +
        '</ul> ' +
        '</div> '
    $('body').append(html2);
    createDom('down', $('.wrapper2'));

    var html3 = '<div class="wrapper3">' +
        '<ul class="data-list3">' +
        '<li>测试数据31</li>' +
        '<li>测试数据32</li>' +
        '<li>测试数据33</li>' +
        '<li>测试数据34</li>' +
        '<li>测试数据35</li>' +
        '<li>测试数据36</li>' +
        '<li>测试数据37</li>' +
        '<li>测试数据38</li>' +
        '<li>测试数据39</li>' +
        '<li>测试数据310</li>' +
        '</ul> ' +
        '</div> '
    $('body').append(html3);
    createDom('both', $('.wrapper3'));

    var refresh1 = $('.wrapper').refresh({
        ready: function (dir, type) {
            ok(true, 'up实例ready is triggered');

            var me = this;
            $.getJSON('../../widget/data/refresh.php', function (data) {
                render(data, dir, type);
                me.afterDataLoading();    //数据加载完成后改变状态

                equals($('.data-list').find('li').length, 20, 'up实例加载完成后列表数量正确');
                ua.click($('.wrapper2').find('.ui-refresh-down')[0]);
            });
        }
    }).refresh('this');
    var refresh2 = $('.wrapper2').refresh({
        ready: function (dir, type) {
            ok(true, 'down实例ready is triggered');

            var me = this;
            $.getJSON('../../widget/data/refresh.php', function (data) {
                render(data, dir, type, $('.data-list2'));
                me.afterDataLoading();    //数据加载完成后改变状态

                equals($('.data-list2').find('li').length, 20, 'down实例加载完成后列表数量正确');
                ua.click($('.wrapper3').find('.ui-refresh-down')[0]);
            });
        }
    }).refresh('this');
    var refresh3 = $('.wrapper3').refresh({
        ready: function (dir, type) {
            ok(true, 'both实例ready is triggered');

            var me = this;
            $.getJSON('../../widget/data/refresh.php', function (data) {
                render(data, dir, type, $('.data-list3'));
                me.afterDataLoading();    //数据加载完成后改变状态

                equals($('.data-list3').find('li').length, 20, 'both实例加载完成后列表数量正确');
                refresh1.destroy();
                refresh2.destroy();
                refresh3.destroy();
                $('.wrapper2').remove();
                $('.wrapper3').remove();
                start();
            });
        }
    }).refresh('this');

    equals($('.ui-refresh-icon').length, 4, '多实例下icon创建正确');
    equals($('.ui-refresh-label').length, 4, '多实例下label创建正确');
    equals(refresh1._el.hasClass('wrapper'), true, 'up实例成功创建');
    equals(refresh2._el.hasClass('wrapper2'), true, 'down实例成功创建');
    equals(refresh3._el.hasClass('wrapper3'), true, 'both实例成功创建');
    equals($('.ui-refresh li').length, 30, '开始的数据列表数量正确');
    ua.click($('.wrapper').find('.ui-refresh-up')[0]);
});

test('方法：enable,disable,destory测试', function () {
    createDom('both');
    expect(17)
    stop();
    var count = 0,
        $wrapper = $('.wrapper'),
        refresh = $wrapper.refresh({
            statechange: function (e, elem, state, dir) {
                ok(true, state + ' is triggered');
            },
            ready: function (dir, type) {
                ok(true, 'ready is triggered');

                var me = this;
                $.getJSON('../../widget/data/refresh.php', function (data) {
                    render(data, dir, type);
                    me.afterDataLoading();    //数据加载完成后改变状态

                    count === 0 && equals($('.data-list').find('li').length, 20, '第一次refresh正确加载');
                    count++;
                    if (count == 1) {
                        refresh.disable(dir);
                        equals(dir, 'up', 'disable方向正确');
                        equals($('.ui-refresh-up .ui-refresh-label').html(), '没有更多内容了', 'disable后的文案正确');
                        ua.click($('.ui-refresh-up')[0]);
                        equals($('.data-list').find('li').length, 20, 'disable后refresh没有加载');
                        refresh.enable();
                        ua.click($('.ui-refresh-up')[0]);
                    } else if (count == 2) {
                        equals($('.data-list').find('li').length, 30, 'enable后refresh正确加载');
                        ua.click($('.ui-refresh-down')[0]);
                    } else if (count == 3) {
                        equals($('.data-list').find('li').length, 40, 'refresh正确加载');
                        refresh.disable(dir, true);
                        equals($('.ui-refresh-down').css('display'), 'none', 'disable选择hide能正确隐藏');
                        refresh.destroy();
                        start();
                    }
                });
            }
        }).refresh('this');
    ua.click($('.ui-refresh-up')[0]);
});










