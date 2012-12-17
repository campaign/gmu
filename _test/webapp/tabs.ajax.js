module('plugin/webapp/tabs.ajax', {
    setup: function() {
        $("body").append("<div id='container' ></div>");
    },
    teardown : function() {
        $('#container').remove();
    }
});

function setup(type) {
    var html = '<div id="tabs">'
             +   '<ul>'
             +      '<li><a href="#conten1">Tab1</a></li>'
             +      '<li><a href="../../webapp/data/tabs/proxy.php?file=sample.' + type + '">Ajax1</a></li>'
             +      '<li><a href="../../webapp/data/tabs/proxy.php?file=sample1.' + type + '">Ajax2</a></li>'
             +  '</ul>'
             +  '<div id="conten1">content1</div>'
             +'</div>'
    $("#container").append(html)
}

test("加载成功", function(){
    stop()
    setup('html')
    var status = '';
    ua.loadcss(["transitions.css", "webapp/tabs/tabs.css","webapp/tabs/tabs.default.css"], function(){
        $('#tabs').tabs({
            ajax: {
                type: 'POST',
                contentType: 'application/x-www-form-urlencoded'
            },
            swipe: true,
            beforeLoad: function(e, xhr, settings){
                ok(true, 'beforeLoad has triggered')
                status += 'beforeLoad '
                var ui = this;
                settings.data = $.param({
                    index: ui.data('active')
                });
            },
            beforeRender : function(event, response, panel, index, xhr){
                status += 'beforeRender '
                ok(true, 'beforeRender has triggered')
                equal(1, index, '加载页面index正确')

            },
            load : function(event, panel){
                status += 'load'
                ok(true, 'load has triggered')
                equal('beforeLoad beforeRender load', status)
                start()
            }
        });
        $('#tabs li').eq(1).trigger('click')

    })

})

test("取消请求", function(){
    stop()
    setup('html')
    $('#tabs').tabs({
        ajax: {
            type: 'POST',
            contentType: 'application/x-www-form-urlencoded'
        },
        swipe: true,
        beforeLoad: function(e, xhr, settings){
            ok(true, 'beforeLoad has triggered and canel this ajax')
            e.preventDefault()
            start()
        },
        beforeRender : function(event, response, panel, index, xhr){
            ok(false, 'beforeRender has triggered')
        },
        load : function(event, panel){
            ok(false, 'beforeRender has triggered')
        }
    });
    $('#tabs li').eq(1).trigger('click')
})

test("加载失败", function(){
    stop()
    setup('html')
    var status = '';
    ua.loadcss(["transitions.css", "webapp/tabs/tabs.css","webapp/tabs/tabs.default.css"], function(){
        $('#tabs').tabs({
            ajax: {
                type: 'POST',
                contentType: 'application/x-www-form-urlencoded'
            },
            swipe: true,
            beforeLoad: function(e, xhr, settings){
                ok(true, 'beforeLoad has triggered')
                status += 'beforeLoad '
                var ui = this;
                settings.data = $.param({
                    index: ui.data('active')
                });
            },
            beforeRender : function(event, response, panel, index, xhr){
                status += 'beforeRender '
                ok(true, 'beforeRender has triggered')
                equal(2, index, '加载页面index正确')

            },
            load : function(event, panel){
                status += 'load'
                ok(true, 'load has triggered')
                equal('beforeLoad beforeRender load', status)
                ok($('.ui-load-error').length)
                start()
            }
        });
        $('#tabs li').eq(2).trigger('click')
    })
})

test("请求json数据, 阻止response写入panel中", function(){
    stop()
    setup('json')
    var json = '';
    ua.loadcss(["transitions.css", "webapp/tabs/tabs.css","webapp/tabs/tabs.default.css"], function(){
        $('#tabs').tabs({
            ajax: {
                dataType: 'json'
            },
            swipe: true,
            beforeRender: function(e, response, panel, index){
                equal('object', typeof response);
                equal(1, index);
                var html = '';
                $.each(response, function(){
                    html += '<p>'+this.text+'</p>';
                });
                panel.html(html);
                json = html
                e.preventDefault();
            },
            load : function(event, panel){
                equal(json, panel.innerHTML)
                start()
            }
        });
        $('#tabs li').eq(1).trigger('click')
    })
})
