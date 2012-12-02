var x = $('.offsetX').val();
var y = $('.offsetY').val();

var tooltips = $.ui.tooltips({
    content:$('textarea'),
    container:'#box',
    arrowShow:$('.arrowShow').get(0).checked,
    hook:'bottom',
    offset:{'x':eval(x),'y':eval(y)},
    width:$('.width').val()+'px',
    height:$('.height').val()+'px',
    arrowOffset:$('.arrowOffset').val(),
    smartPosition:$('.smartPosition').get(0).checked,
    closeButton:$('.closeButton').get(0).checked,
    autoHide:$('.autoHide').get(0).checked,
    instanceId:'class1',
    isFloat:true
});
//tooltips.fix({top:20,left:10});
function refresh(){
    var str = $('textarea').val();
    if(str!="")
        tooltips.refresh(str);
}
function change(){
    var str = $('textarea');
    tooltips.destroy();

    var x = $('.offsetX').val();
    var y = $('.offsetY').val();
    var hook = '';
    var val = '';
    $.each($('.tooltis input'),function(i,index){
        if($(this).attr('checked')) hook= $(this).val();
    })

    $.each($('.target input'),function(i,index){
        if($(this).attr('checked')) val= $(this).val();
    })


    var tar = $("#box");
    tar.attr('style','');
    switch(val){
        case 'left-top':
            tar.css({'left':'10px','top':'10px'})
            break;
        case 'right-top':
            tar.css({'right':'10px','top':'10px'})
            break;
        case 'left-bottom':
            tar.css({'left':'10px','bottom':'10px'})
            break;
        case 'right-bottom':
            tar.css({'right':'10px','bottom':'10px'})
            break;
        case 'left-top-50%':
            tar.css({'left':'50%','top':'50%'})
            break;
    }


    tooltips = $.ui.tooltips({
        content:$('textarea'),
        arrowShow:$('.arrowShow').get(0).checked,
        container:'#box',
        hook:hook,
        offset:{'x':eval(x),'y':eval(y)},
        width:$('.width').val()+'px',
        height:$('.height').val()+'px',
        arrowOffset:$('.arrowOffset').val(),
        smartPosition:$('.smartPosition').get(0).checked,
        closeButton:$('.closeButton').get(0).checked,
        autoHide:$('.autoHide').get(0).checked,
        isFloat:$('.isFloat').get(0).checked
    });
    tooltips._setPosition();
}

$("#box").css({'left':'50%','top':'50%'});

$('.tooltis input').on('touchstart',function(){

})


$('.target input').on("touchend",function(){


})