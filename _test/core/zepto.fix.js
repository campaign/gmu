test('fix', function() {
	expect(3);
	var $el = $('<div></div>').appendTo(document.body).fix({
		left: 10,
		top: 10
	});
	$('<div style="height:2000px;"></div>').appendTo(document.body);
	window.scrollTo(0, 1000);
	approximateEqual(window.pageYOffset, 1000, "The pageYOffset is " + window.pageYOffset);
	equal($el.offset().top, 10 + window.pageYOffset, 'top is right');
	equal($el.offset().left, 10, 'left is right');
	window.scrollTo(0, 0);
});