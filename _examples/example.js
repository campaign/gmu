(function(undefined){
    var script = document.getElementById('bootstrap'),
        use = script.getAttribute('data-use'),
        page = script.getAttribute('data-page').split(','),
        theme = script.getAttribute('data-theme'),
        path = script.getAttribute('data-path') || '../../load.php',
        requires = ['webapp/button.js', 'webapp/dropmenu.js', 'webapp/toolbar.js'],
        i, jsRE;

    for(i=requires.length; i--;) {
        jsRE = new RegExp('(\b|,)'+requires[i].replace(/[\-\[\]{}()*+?.,\/\\\^$|#\s]/g, "\\$&")+'(\b|,)');
        jsRE.test(use) || (use = requires[i]+','+use);
    }
    loadAssets(path + '?mode=1&theme='+theme+'&js=' + use, function(xml){
        var i, length, js, node,
            jses = xml.getElementsByTagName('js'),
            csses = xml.getElementsByTagName('css'),
            head = document.getElementsByTagName('head')[0],
            toolbar, btn, pages, item;

        //插入css
        for(i = csses.length; i--; ){
            js = csses[i];
            node =  document.createElement('style');
            node.setAttribute("name", js.getAttribute("name"));
            node.innerHTML = "/*"+js.getAttribute("name")+"*/\n"+js.textContent;
            head.insertBefore(node, head.firstChild);
        }
        //插入script
        for(i= 0, length = jses.length; i<length; i++){
            js = jses[i];
            node = document.createElement('script');
            node.setAttribute("type", "text/javascript");
            node.setAttribute("name", js.getAttribute("name"));
            node.innerHTML = js.textContent;
            document.body.appendChild(node);
        }

        //事件兼容pc，做测试用的。
        var $onFn = $.fn.on,
            $offFn = $.fn.off,
            transEvent = {
                touchstart: 'mousedown',
                touchend: 'mouseup',
                touchmove: 'mousemove',
                tap: 'click'
            },
            transFn = function(e) {
                var events, org, event;
                if($.isObject(e)){
                    org = e;
                    $.each(e, function(key){
                        event = parse(key);
                        !$.support.touch && transEvent[event.e] && (org[transEvent[event.e]+event.ns] = this);
                    });
                    return org;
                }else {
                    events = [];
                    $.each((e || '').split(' '), function(i, type) {
                        event = parse(type);
                        events.push(!$.support.touch && transEvent[event.e] ? transEvent[event.e]+event.ns : type);
                    });
                    return events.join(' ');
                }
            },
            parse = function(event) {
                var idx = event.indexOf('.'), e, ns;
                if(idx>-1) {
                    e = event.substr(0, idx);
                    ns = event.substr(idx);
                } else {
                    e = event;
                    ns = '';
                }
                return {e:e, ns:ns};
            };

        $.extend($.fn, {
            on: function(event, selector, callback) {
                return $onFn.call(this, transFn(event), selector, callback);
            },
            off: function(event, selector, callback) {
                return $offFn.call(this, transFn(event), selector, callback);
            }
        });

        //初始化通用头部。
        node = document.createElement('header');
        document.body.insertBefore(node, document.body.firstElementChild);

        btn = page.length ? $.ui.button({
            label: '切换'
        }).root() : '';
        toolbar = $.ui.toolbar({
            title: document.title,
            container: node,
            useFix:true,
            btns: btn,
            backButtonClick: function(){
                location.href = '../';
            }
        });
        if(btn && btn.length){
            pages = [];
            for(i = page.length; i--;){
                item = page[i].split('|');
                pages.unshift({
                    text: item[0],
                    href: item[1]
                });
            }
            $.ui.dropmenu({
                align: 'right',
                items: pages,
                container: $(node).find('.ui-toolbar').first(),
                cacheParentOffset: false
            }).bindButton(btn);
        }
        //现在开始执行script里面的内容
        eval(script.textContent);
    });

    function loadAssets(url, cb){
        var xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);
        xhr.onreadystatechange = function() {
            if(xhr.status >= 200 && xhr.status < 300 || xhr.status === 304) {
                if(xhr.readyState === 4) {
                    cb && cb.apply(xhr, [xhr.responseXML]);
                }
            }
        };
        xhr.send(null);
        return this;
    }
})();