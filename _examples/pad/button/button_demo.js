(function($){
    $(function(){
        $.ui.button('#link1', {setup: true});
        $.ui.button('#link2', {setup: true, skin:'blue'});
        $.ui.button('#link3', {setup: true, skin:'blue'});
        $.ui.button('#link4', {setup: true, skin:'custom'});
        $.ui.button('#link5', {setup: true, disabled:true});
        $.ui.button('#link6', {setup: true, disabled:true, skin:'blue'});
        $.ui.button('#link7', {setup: true, skin:'blue'});

        $.ui.button({
            text:'js创建',
            container:'body',
            href:'http://www.baidu.com',
            onclick:function(e){
                alert('clicked');
                //e.preventDefault();
            }
        });

        var autolink = $.ui.button('#autolink', {setup: true}), i=0;
        function _tick(){
            if(!i){
                autolink.toggleEnable();
            }
            autolink.root().html((10-i)+'秒后自动切换状态');
            i=++i%10;
            setTimeout(_tick, 1000);
        }
        _tick();
    });
})(Zepto);