var data = [{
    text : 'komosaka'
},
    {
        text : '个人资料',
        callback : function(index, el, obj) {
            alert(index);
        }
    }, {
        text : '首页设置',
        callback : function(index, el, obj) {
            alert(index);
        }
    }, {
        text : '搜索设置',
        callback : function(index, el, obj) {
            alert(index);
        }
    }, {
        text : '退出'
    }];


function dropmenu1(){

    if(dropmenu.destroy)dropmenu.destroy();

    dropmenu = $.ui.dropmenu({
        container : $('#box1'),
        hasArrow : $('.hasArrow').get(0).checked,
        mode:$('.mode').get(0).checked&&'selected',
        content : data,
        offset : 0,
        instanceId:'drop1',
        position:$('.position').get(0).checked&&'horizontal',
        isScroll:$('.isScroll').get(0).checked,
        maxHeight:$('.maxHeight').val()
    }).show();
}
var dropmenu = $.ui.dropmenu({
    container : $('#box1'),
    hasArrow : $('.hasArrow').get(0).checked,
    mode:$('.mode').get(0).checked&&'selected',
    content : data,
    offset : 0,
    instanceId:'drop1',
    position:$('.position').get(0).checked&&'horizontal',
    isScroll:$('.isScroll').get(0).checked,
    maxHeight:$('.maxHeight').val()
})

//dropmenu.destroy();