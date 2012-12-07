//     Zepto.js
//     (c) 2010-2012 Thomas Fuchs
//     Zepto.js may be freely distributed under the MIT license.

;(function($){
  var touch = {}, touchTimeout,
	  /**
	   *  added by chenluyang
	   *  @reason 兼容IE10下面Pointer事件
	   */
	   transEvent = {
			touchstart: 'mousedown',// 'MSPointerDown',
			touchend: 'mouseup',//'MSPointerUp',
			touchmove: 'mousemove'//'MSPointerMove'
		}
		
  function compatEvent(evt) {
    return window.navigator.msPointerEnabled ? transEvent[evt] : evt;
    //return 'ontouchstart' in window ? evt : transEvent[evt]
  }
  
  function parentIfText(node){
    return 'tagName' in node ? node : node.parentNode
  }

  function swipeDirection(x1, x2, y1, y2){
    var xDelta = Math.abs(x1 - x2), yDelta = Math.abs(y1 - y2)
    return xDelta >= yDelta ? (x1 - x2 > 0 ? 'Left' : 'Right') : (y1 - y2 > 0 ? 'Up' : 'Down')
  }

  var longTapDelay = 750, longTapTimeout

  function longTap(){
    longTapTimeout = null
    if (touch.last) {
      touch.el.trigger('longTap')
      touch = {}
    }
  }

  function cancelLongTap(){
    if (longTapTimeout) clearTimeout(longTapTimeout)
    longTapTimeout = null
  }

  $(document).ready(function(){
    var now, delta
      var log = $('#test').get(0)

    $(document.body).bind(compatEvent('touchstart'), function(e){
        log.innerHTML += 'touchstart' + '<br/>'
      now = Date.now()
      delta = now - (touch.last || now)
	  /**
	   *  modified by chenluyang
	   *  @reason 兼容IE10下面Event对象
	   *  @oringal 
	   */
      touch.el = $(parentIfText(e.touches ? e.touches[0].target : e.target))
      touchTimeout && clearTimeout(touchTimeout)
	  /**
	   *  modified by chenluyang
	   *  @reason 兼容IE10下面Event对象
	   *  @oringal 
	   *   touch.x1 = e.touches[0].pageX
       *   touch.y1 = e.touches[0].pageY
	   */
      touch.x1 = e.touches ? e.touches[0].pageX : e.pageX
      touch.y1 = e.touches ? e.touches[0].pageY : e.pageY
      if (delta > 0 && delta <= 250) touch.isDoubleTap = true
      touch.last = now
      longTapTimeout = setTimeout(longTap, longTapDelay)

    }).bind(compatEvent('touchmove'), function(e){
            log.innerHTML += 'touchmove' + '<br/>'
            //e.preventDefault()
      cancelLongTap()
	  /**
	   *  modified by chenluyang
	   *  @reason 兼容IE10下面Event对象
	   *  @oringal 
	   *   touch.x2 = e.touches[0].pageX
       *   touch.y2 = e.touches[0].pageY
	   */
      touch.x2 = e.touches ? e.touches[0].pageX : e.pageX
      touch.y2 = e.touches ? e.touches[0].pageY : e.pageY
      //delete touch.last
            //touch.isMove = true
    }).bind(compatEvent('touchend'), function(e){
            log.innerHTML += 'touchend' + '<br/>'
       cancelLongTap()
      // double tap (tapped twice within 250ms)
      if (touch.isDoubleTap) {
        touch.el.trigger('doubleTap')
        touch = {}

      // swipe
      } else if ((touch.x2 && Math.abs(touch.x1 - touch.x2) > 30) ||
                 (touch.y2 && Math.abs(touch.y1 - touch.y2) > 30)) {
          touch.el.trigger('swipe') &&
            touch.el.trigger('swipe' + (swipeDirection(touch.x1, touch.x2, touch.y1, touch.y2)))
        touch = {}
      //precise tap
      /**
       *  added by chenluyang
       *  @reason 触发touchmove的就不属于preciseTap
       */
      } else if(!touch.x2){
        touch.el.trigger('preciseTap')
        touch = {}
      // normal tap
      } else if ('last' in touch) {
        touch.el.trigger('tap')
        touchTimeout = setTimeout(function(){
          touchTimeout = null
          touch.el.trigger('singleTap')
          touch = {}
        }, 250)
      }
    }).bind('touchcancel', function(){
            log.innerHTML += 'touchend' + '<br/>'
      if (touchTimeout) clearTimeout(touchTimeout)
      if (longTapTimeout) clearTimeout(longTapTimeout)
      longTapTimeout = touchTimeout = null
      touch = {}
    })
  })


  ;['swipe', 'swipeLeft', 'swipeRight', 'swipeUp', 'swipeDown', 'doubleTap', 'tap', 'singleTap', 'longTap', 'preciseTap'].forEach(function(m){
    $.fn[m] = function(callback){ return this.bind(m, callback) }
  })



})(Zepto)
