test('fix', function() {
	expect(2);
	var $el = $('<div></div>').appendTo(document.body).fix({
		left: 10,
		top: 10
	});
	$('<div style="height:2000px;"></div>').appendTo(document.body);
	window.scrollTo(0, 1000);
	equal($el.offset(true).top, 10, 'top is right');
	equal($el.offset(true).left, 10, 'left is right');
	window.scrollTo(0, 0);
});