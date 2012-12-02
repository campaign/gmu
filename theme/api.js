/**
 * 加载所有js
 */
 
(function() {
	var paths = ['core/zepto.js', 'mobile/mobile.js', 'mobile/ex.js', 'mobile/widget.js', 'mobile/control.js', 'plugin/webapp/button.js', 'plugin/webapp/more.js', 'plugin/webapp/suggestion.js', 'plugin/webapp/quickdelete.js', 'plugin/webapp/navigator.js', 'plugin/webapp/dropmenu.js', 'plugin/webapp/toolbar.js', 'plugin/webapp/refresh.js', 'plugin/webapp/dialog.js', 'plugin/webapp/gotop.js', 'plugin/webapp/carousel.js', 'plugin/webapp/add2desktop.js', 'plugin/webapp/dialog.js', 'plugin/webapp/imageuploader.js', 'plugin/webapp/imageeditor.js'],
		base = document.getElementsByTagName('base')[0],
		rscript = /(suggestion|refresh)/gi,
		baseURL = '../src/',
		lite;

	if (base) {
		baseURL = base.getAttribute('path') || '../../src/';
		lite = base.getAttribute('lite') || false;
	}

	for (var i = 0, pi; pi = paths[i++];) {
		if (lite && rscript.test(pi)) pi = pi.replace(rscript, '$1_lite');
		document.write('<script type="text/javascript" src="' + baseURL + pi + '"></script>');
	}
})();
