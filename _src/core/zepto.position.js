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

        if ( calculatePosition ) {//如果定位是absolute或者fixed，同时top或者left中存在auto定位。
            curPosition = $el.position();
            curTop = curPosition.top;
            curLeft = curPosition.left;
        } else {
            curTop = parseFloat( curCSSTop ) || 0;
            curLeft = parseFloat( curCSSLeft ) || 0;
        }

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
        position = $.position = {},
        max = Math.max,
        abs = Math.abs,
        rhorizontal = /left|center|right/,
        rvertical = /top|center|bottom/,
        roffset = /[\+\-]\d+%?/,
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
        return raw.nodeType === 9?{
            width: elem.width(),
            height: elem.height(),
            top: 0,
            left: 0
        }: raw == window ? {
            width: elem.width(),
            height: elem.height(),
            top: raw.pageYOffset,
            left: raw.pageXOffset
        }: elem.offset();
    }

    function getWithinInfo(element){
        var withinElement = $( element = (element || window) ),
            _isWindow = element == window;
        return {
            element: withinElement,
            isWindow: _isWindow,
            offset: _isWindow? { left: 0, top: 0 } : withinElement.offset(),
            scrollLeft: _isWindow?element.pageXOffset:element.scrollLeft,
            scrollTop: _isWindow?element.pageYOffset:element.scrollTop,
            width: withinElement.width(),
            height: withinElement.height()
        };
    }

    //
    $.extend(position, {
        fit: {
            left: function( position, data ) {
                var within = data.within,
                    withinOffset = within.isWindow ? within.scrollLeft : within.offset.left,
                    outerWidth = within.width,
                    collisionPosLeft = position.left - data.collisionPosition.marginLeft,
                    overLeft = withinOffset - collisionPosLeft,
                    overRight = collisionPosLeft + data.collisionWidth - outerWidth - withinOffset,
                    newOverRight;

                // element is wider than within
                if ( data.collisionWidth > outerWidth ) {
                    // element is initially over the left side of within
                    if ( overLeft > 0 && overRight <= 0 ) {
                        newOverRight = position.left + overLeft + data.collisionWidth - outerWidth - withinOffset;
                        position.left += overLeft - newOverRight;
                        // element is initially over right side of within
                    } else if ( overRight > 0 && overLeft <= 0 ) {
                        position.left = withinOffset;
                        // element is initially over both left and right sides of within
                    } else {
                        if ( overLeft > overRight ) {
                            position.left = withinOffset + outerWidth - data.collisionWidth;
                        } else {
                            position.left = withinOffset;
                        }
                    }
                    // too far left -> align with left edge
                } else if ( overLeft > 0 ) {
                    position.left += overLeft;
                    // too far right -> align with right edge
                } else if ( overRight > 0 ) {
                    position.left -= overRight;
                    // adjust based on position and margin
                } else {
                    position.left = max( position.left - collisionPosLeft, position.left );
                }
            },
            top: function( position, data ) {
                var within = data.within,
                    withinOffset = within.isWindow ? within.scrollTop : within.offset.top,
                    outerHeight = data.within.height,
                    collisionPosTop = position.top - data.collisionPosition.marginTop,
                    overTop = withinOffset - collisionPosTop,
                    overBottom = collisionPosTop + data.collisionHeight - outerHeight - withinOffset,
                    newOverBottom;

                // element is taller than within
                if ( data.collisionHeight > outerHeight ) {
                    // element is initially over the top of within
                    if ( overTop > 0 && overBottom <= 0 ) {
                        newOverBottom = position.top + overTop + data.collisionHeight - outerHeight - withinOffset;
                        position.top += overTop - newOverBottom;
                        // element is initially over bottom of within
                    } else if ( overBottom > 0 && overTop <= 0 ) {
                        position.top = withinOffset;
                        // element is initially over both top and bottom of within
                    } else {
                        if ( overTop > overBottom ) {
                            position.top = withinOffset + outerHeight - data.collisionHeight;
                        } else {
                            position.top = withinOffset;
                        }
                    }
                    // too far up -> align with top
                } else if ( overTop > 0 ) {
                    position.top += overTop;
                    // too far down -> align with bottom edge
                } else if ( overBottom > 0 ) {
                    position.top -= overBottom;
                    // adjust based on position and margin
                } else {
                    position.top = max( position.top - collisionPosTop, position.top );
                }
            }
        },
        flip: {
            left: function( position, data ) {
                var within = data.within,
                    withinOffset = within.offset.left + within.scrollLeft,
                    outerWidth = within.width,
                    offsetLeft = within.isWindow ? within.scrollLeft : within.offset.left,
                    collisionPosLeft = position.left - data.collisionPosition.marginLeft,
                    overLeft = collisionPosLeft - offsetLeft,
                    overRight = collisionPosLeft + data.collisionWidth - outerWidth - offsetLeft,
                    myOffset = data.my[ 0 ] === "left" ?
                        -data.elemWidth :
                        data.my[ 0 ] === "right" ?
                            data.elemWidth :
                            0,
                    atOffset = data.at[ 0 ] === "left" ?
                        data.targetWidth :
                        data.at[ 0 ] === "right" ?
                            -data.targetWidth :
                            0,
                    offset = -2 * data.offset[ 0 ],
                    newOverRight,
                    newOverLeft;

                if ( overLeft < 0 ) {
                    newOverRight = position.left + myOffset + atOffset + offset + data.collisionWidth - outerWidth - withinOffset;
                    if ( newOverRight < 0 || newOverRight < abs( overLeft ) ) {
                        position.left += myOffset + atOffset + offset;
                    }
                }
                else if ( overRight > 0 ) {
                    newOverLeft = position.left - data.collisionPosition.marginLeft + myOffset + atOffset + offset - offsetLeft;
                    if ( newOverLeft > 0 || abs( newOverLeft ) < overRight ) {
                        position.left += myOffset + atOffset + offset;
                    }
                }
            },
            top: function( position, data ) {
                var within = data.within,
                    withinOffset = within.offset.top + within.scrollTop,
                    outerHeight = within.height,
                    offsetTop = within.isWindow ? within.scrollTop : within.offset.top,
                    collisionPosTop = position.top - data.collisionPosition.marginTop,
                    overTop = collisionPosTop - offsetTop,
                    overBottom = collisionPosTop + data.collisionHeight - outerHeight - offsetTop,
                    top = data.my[ 1 ] === "top",
                    myOffset = top ?
                        -data.elemHeight :
                        data.my[ 1 ] === "bottom" ?
                            data.elemHeight :
                            0,
                    atOffset = data.at[ 1 ] === "top" ?
                        data.targetHeight :
                        data.at[ 1 ] === "bottom" ?
                            -data.targetHeight :
                            0,
                    offset = -2 * data.offset[ 1 ],
                    newOverTop,
                    newOverBottom;
                if ( overTop < 0 ) {
                    newOverBottom = position.top + myOffset + atOffset + offset + data.collisionHeight - outerHeight - withinOffset;
                    if ( ( position.top + myOffset + atOffset + offset) > overTop && ( newOverBottom < 0 || newOverBottom < abs( overTop ) ) ) {
                        position.top += myOffset + atOffset + offset;
                    }
                }
                else if ( overBottom > 0 ) {
                    newOverTop = position.top -  data.collisionPosition.marginTop + myOffset + atOffset + offset - offsetTop;
                    if ( ( position.top + myOffset + atOffset + offset) > overBottom && ( newOverTop > 0 || abs( newOverTop ) < overBottom ) ) {
                        position.top += myOffset + atOffset + offset;
                    }
                }
            }
        },
        flipfit: {
            left: function() {
                $.ui.position.flip.left.apply( this, arguments );
                $.ui.position.fit.left.apply( this, arguments );
            },
            top: function() {
                $.ui.position.flip.top.apply( this, arguments );
                $.ui.position.fit.top.apply( this, arguments );
            }
        }
    });


    $.fn.position = function (opts) {
        if (!opts || !opts.of) {
            return _position.call(this);
        }
        opts = $.extend({}, opts);//弄个副本

        var atOffset, targetWidth, targetHeight, basePosition, dimensions,
            target = $( opts.of ), tmp,
            within = getWithinInfo( opts.within ),
            collision = ( opts.collision || "flip" ).split( " " ),
            offsets = {};

        dimensions = getDimensions( target );
        targetWidth = dimensions.width;
        targetHeight = dimensions.height;
        basePosition = {
            left: dimensions.left,
            top: dimensions.top
        };

        $.each( [ "my", "at" ], function() {
            var pos = ( opts[ this ] || "" ).split( " " ),
                horizontalOffset,
                verticalOffset;

            if ( pos.length === 1) {
                pos = rhorizontal.test( pos[ 0 ] ) ?
                    pos.concat( [ "center" ] ) :
                    rvertical.test( pos[ 0 ] ) ?
                        [ "center" ].concat( pos ) :
                        [ "center", "center" ];
            } else {
                pos[ 0 ] = rhorizontal.test( pos[ 0 ] ) ? pos[ 0 ] : "center";
                pos[ 1 ] = rvertical.test( pos[ 1 ] ) ? pos[ 1 ] : "center";
            }

            horizontalOffset = roffset.exec( pos[ 0 ] );
            verticalOffset = roffset.exec( pos[ 1 ] );
            offsets[ this ] = [
                horizontalOffset ? horizontalOffset[ 0 ] : 0,
                verticalOffset ? verticalOffset[ 0 ] : 0
            ];

            opts[ this ] = [
                rposition.exec( pos[ 0 ] )[ 0 ],
                rposition.exec( pos[ 1 ] )[ 0 ]
            ];
        });

        collision.length === 1 && collision.push(collision[ 0 ]);
        basePosition.left += (tmp = opts.at[ 0 ]) === "right"?targetWidth:tmp == "center"?targetWidth / 2:0;
        basePosition.top += (tmp = opts.at[ 1 ]) === "bottom"?targetHeight:tmp == "center"?targetHeight / 2:0;

        atOffset = getOffsets( offsets.at, targetWidth, targetHeight );
        basePosition.left += atOffset[ 0 ];
        basePosition.top += atOffset[ 1 ];

        return this.each(function() {
            var collisionPosition, using,
                elem = $( this ),
                tmp,
                elemWidth = elem.width(),
                elemHeight = elem.height(),
                marginLeft = parseCss( elem, "marginLeft" ),
                marginTop = parseCss( elem, "marginTop" ),
                collisionWidth = elemWidth + marginLeft + parseCss( elem, "marginRight" ),
                collisionHeight = elemHeight + marginTop + parseCss( elem, "marginBottom" ),
                position = $.extend( {}, basePosition ),
                myOffset = getOffsets( offsets.my, elem.width(), elem.height() );

            position.left -= (tmp = opts.my[ 0 ]) === "right"?elemWidth:tmp==="center"?elemWidth/2:0;
            position.top -= (tmp = opts.my[ 1 ]) === "bottom"?elemHeight:tmp==="center"?elemHeight/2:0;
            position.left += myOffset[ 0 ];
            position.top += myOffset[ 1 ];

            collisionPosition = {
                marginLeft: marginLeft,
                marginTop: marginTop
            };

            $.each( [ "left", "top" ], function( i, dir ) {
                var obj = $.position[ collision[ i ] ];
                obj && obj[dir](position, {
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
            });

            using = opts.using && function( props ) {
                // adds feedback as second argument to using callback, if present
                var left = dimensions.left - position.left,
                    right = left + targetWidth - elemWidth,
                    top = dimensions.top - position.top,
                    bottom = top + targetHeight - elemHeight,
                    feedback = {
                        target: {
                            element: target,
                            left: dimensions.left,
                            top: dimensions.top,
                            width: targetWidth,
                            height: targetHeight
                        },
                        element: {
                            element: elem,
                            left: position.left,
                            top: position.top,
                            width: elemWidth,
                            height: elemHeight
                        },
                        horizontal: right < 0 ? "left" : left > 0 ? "right" : "center",
                        vertical: bottom < 0 ? "top" : top > 0 ? "bottom" : "middle"
                    };
                targetWidth < elemWidth && abs( left + right ) < targetWidth && (feedback.horizontal = "center");
                targetHeight < elemHeight && abs( top + bottom ) < targetHeight && (feedback.vertical = "middle");
                feedback.important = max( abs( left ), abs( right ) ) > max( abs( top ), abs( bottom ) )? "horizontal": "vertical";
                opts.using.call( this, props, feedback );
            }
            elem.offset( $.extend( position, { using: using } ) );
        });
    }
})(Zepto);