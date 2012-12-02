/**
 * Created with JetBrains PhpStorm.
 * User: liaoxuezhi
 * Date: 12-8-17
 * Time: 下午2:43
 * To change this template use File | Settings | File Templates.
 */
(function($){

    var sug = $.ui.suggestion({
        container: "#test1",
        source: "../../data/suggestion.php",
        offset: {x: -1},
        posAdapt: true,
        width: $(".search").width(),
        onshow: function(){
            $('.ui-suggestion-content li', this).behavior('ui-suggestion-result-hover');
        }
    });

    function refreshSug(){
        var args = {
            container: "#test1",
            source: "../data/suggestion.php",
            offset: {x: -1},
            posAdapt: true,
            width: $(".search").width()
        };

        $.each($('fieldset input'), function(i, elem){
            args[elem.id] = elem.value;
        });

        sug.destroy();
        sug = $.ui.suggestion(args);
    }

    window.refreshSug = refreshSug;

})(Zepto);