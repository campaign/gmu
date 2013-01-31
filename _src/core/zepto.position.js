/**
 *  @file 基于Zepto的位置设置获取组件
 *  @name position
 *  @desc 定位组件
 *  @import core/zepto.extend.js
 */
//offset
(function($, undefined){
    var _offset = $.fn.offset, offset ={};
    $.fn.offset = function(options){
        //如果传入的不是object，则直接调用老的offset.
        if(!$.isPlainObject(options))return _offset.apply(this, arguments);
        //遍历调用offsets.setOffset。
        return this.each(function(i){
            offset.setOffset( this, options, i );
        });
    }

    //设置offset值
    offset.setOffset = function ( elem, options, i ) {
        var $el = $(elem),
            position = $el.css( "position"),
            curOffset = $el.offset(),
            curCSSTop = $el.css( "top" ),
            curCSSLeft = $el.css( "left" ),
            calculatePosition = ( position === "absolute" || position === "fixed" ) && ~$.inArray("auto", [curCSSTop, curCSSLeft]),
            props = {}, curPosition = {}, curTop, curLeft;

        //如果是static定位，则需要把定位设置成relative，否则top，left值无效。
        position === "static" && $el.css("position", "relative");

        //如果定位是absolute或者fixed，同时top或者left中存在auto定位。
        curPosition = calculatePosition?$el.position():curPosition;
        curTop = curPosition.top || parseFloat( curCSSTop ) || 0;
        curLeft = curPosition.left || parseFloat( curCSSLeft ) || 0;

        //如果options是一个方法，则调用此方法来获取options，同时传入当前offset
        options = $.isFunction( options )?options.call( elem, i, curOffset ):options;

        options.top != null && (props.top = options.top - curOffset.top + curTop);
        options.left != null && (props.left = options.left - curOffset.left + curLeft);

        "using" in options ? options.using.call( elem, props ): $el.css( props );
    }
})(Zepto);

//position
(function ($, undefined) {
    var _position = $.fn.position || function(){
            if (!this.length) return null;
            var offsetParent = this.offsetParent(),
                offset       = this.offset(),
                parentOffset = /^(?:body|html)$/i.test(offsetParent[0].nodeName) ? { top: 0, left: 0 } : offsetParent.offset()

            parentOffset.top  += parseFloat( offsetParent.css('border-top-width') ) || 0
            parentOffset.left += parseFloat( offsetParent.css('border-left-width') ) || 0

            return {
                top:  offset.top  - parentOffset.top,
                left: offset.left - parentOffset.left
            }
        },
        rhorizontal = /left|center|right/,
        rvertical = /top|center|bottom/,
        roffset = /([\+\-]\d+%?)/,
        rposition = /^\w+/,
        rpercent = /%$/;

    function getOffsets( offsets, width, height ) {
        return [
            parseInt( offsets[ 0 ], 10 ) * ( rpercent.test( offsets[ 0 ] ) ? width / 100 : 1 ),
            parseInt( offsets[ 1 ], 10 ) * ( rpercent.test( offsets[ 1 ] ) ? height / 100 : 1 )
        ];
    }

    function parseCss( element, property ) {
        return parseInt( element.css( property ), 10 ) || 0;
    }

    function getDimensions( elem ) {
        var raw = elem[0];
        return raw.nodeType === 9?{//如果是document
            width: elem.width(),
            height: elem.height(),
            top: 0,
            left: 0
        }: raw == window ? {//如果是window
            width: elem.width(),
            height: elem.height(),
            top: raw.pageYOffset,
            left: raw.pageXOffset
        }: raw.preventDefault && (raw = raw.touches?raw.touches[0]:raw) ? {//如果是event对象
            width: 0,
            height: 0,
            offset: { top: raw.pageY, left: raw.pageX }
        }: elem.offset();
    }

    function getWithinInfo(element){
        var withinElement = $( element = (element || window) ),
            _isWindow = element == window,
            offset = _isWindow? { left: 0, top: 0 } : withinElement.offset();
        return {
            element: withinElement,
            isWindow: _isWindow,
            offset: offset,
            width: offset.width || withinElement.width(),
            height: offset.height || withinElement.height(),
            scrollLeft: _isWindow?element.pageXOffset:element.scrollLeft,
            scrollTop: _isWindow?element.pageYOffset:element.scrollTop
        };
    }

    $.fn.position = function (opts) {
        if (!opts || !opts.of) {
            return _position.call(this);
        }
        opts = $.extend({}, opts);//弄个副本

        var atOffset, targetWidth, targetHeight, basePosition, dimensions,
            target = $( opts.of ), tmp, collision,
            within = getWithinInfo( opts.within ),
            offsets = {};

        dimensions = getDimensions( target );
        target[0].preventDefault && (opts.at = "left top");
        targetWidth = dimensions.width;
        targetHeight = dimensions.height;
        basePosition = {
            left: dimensions.left,
            top: dimensions.top
        };

        $.each( [ "my", "at" ], function() {
            var pos = ( opts[ this ] || "" ).split( " " );

            pos.length ===1 && pos[rhorizontal.test( pos[ 0 ] )?"push":"unshift"]("center");
            pos[ 0 ] = rhorizontal.test( pos[ 0 ] ) ? pos[ 0 ] : "center";
            pos[ 1 ] = rvertical.test( pos[ 1 ] ) ? pos[ 1 ] : "center";

            offsets[ this ] = [
                roffset.test(pos[ 0 ]) ? RegExp.$1 : 0,
                roffset.test(pos[ 1 ]) ? RegExp.$1 : 0
            ];
            opts[ this ] = [
                rposition.exec( pos[ 0 ] )[ 0 ],
                rposition.exec( pos[ 1 ] )[ 0 ]
            ];
        });

        basePosition.left += (tmp = opts.at[ 0 ]) === "right"?targetWidth:tmp == "center"?targetWidth / 2:0;
        basePosition.top += (tmp = opts.at[ 1 ]) === "bottom"?targetHeight:tmp == "center"?targetHeight / 2:0;

        atOffset = getOffsets( offsets.at, targetWidth, targetHeight );
        basePosition.left += atOffset[ 0 ];
        basePosition.top += atOffset[ 1 ];

        return this.each(function() {
            var collisionPosition,
                elem = $( this ),
                offset = elem.offset(),
                tmp,
                elemWidth = offset.width,
                elemHeight = offset.height,
                marginLeft = parseCss( elem, "marginLeft" ),
                marginTop = parseCss( elem, "marginTop" ),
                collisionWidth = elemWidth + marginLeft + parseCss( elem, "marginRight" ),
                collisionHeight = elemHeight + marginTop + parseCss( elem, "marginBottom" ),
                position = $.extend( {}, basePosition ),
                myOffset = getOffsets( offsets.my, elemWidth, elemHeight );

            position.left -= (tmp = opts.my[ 0 ]) === "right"?elemWidth:tmp==="center"?elemWidth/2:0;
            position.top -= (tmp = opts.my[ 1 ]) === "bottom"?elemHeight:tmp==="center"?elemHeight/2:0;
            position.left += myOffset[ 0 ];
            position.top += myOffset[ 1 ];
            collisionPosition = {
                marginLeft: marginLeft,
                marginTop: marginTop
            };

            $.isFunction(collision = opts.collision) && collision.call(this, position, {
                targetWidth: targetWidth,
                targetHeight: targetHeight,
                elemWidth: elemWidth,
                elemHeight: elemHeight,
                collisionPosition: collisionPosition,
                collisionWidth: collisionWidth,
                collisionHeight: collisionHeight,
                offset: [ atOffset[ 0 ] + myOffset[ 0 ], atOffset [ 1 ] + myOffset[ 1 ] ],
                my: opts.my,
                at: opts.at,
                within: within,
                elem : elem
            });
            elem.offset( $.extend( position, { using: opts.using } ) );
        });
    }
})(Zepto);