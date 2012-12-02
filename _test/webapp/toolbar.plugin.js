module('plugin/webapp/toolbar', {
	setup: function() {
		$container = $('<div class="ui-toolbar-container" style="position:absolute;left:0;top:0;right:0;"></div>').appendTo(document.body)
	},
	teardown: function() {
		$container.remove();
	}
});

test("buttons", function() {
	expect(7);
	stop();
	ua.loadcss(["reset.css", "webapp/toolbar/toolbar.css"], function() {
		var toolbar = $.ui.toolbar({
			container: '.ui-toolbar-container',
			btns: [{
				label: 'recommend',
				className: 'recommend',
				click: function() {
					ok(true, 'recommend');
				}
			}, {
				label: 'fontsize',
				className: 'fontsize',
				click: function() {
					ok(true, 'fontsize');
				}
			}]
		});
		var btns = $(".ui-toolbar-toolscon", toolbar._el).children()
		equals(btns.length, 2, "2 btns");
		equals(btns[0].className, "ui-button ui-button-text-only recommend", "The class is right");
		equals(btns[0].textContent, "recommend", "The text is right");
		equals(btns[1].className, "ui-button ui-button-text-only fontsize", "The class is right");
		equals(btns[1].textContent, "fontsize", "The text is right");
		
		ua.click(btns[0]);
		ua.click(btns[1]);
		toolbar.destroy();
		start();
	});
});

test("tools", function() {
	expect(19);
	var toolbar = $.ui.toolbar({
		container: '.ui-toolbar-container',
		buttonText: "1",
		titleText: "2",
		buttonClick: function(){
			ok(true, "buttonClick");
		},
		btns: [{
			label: 'recommend',
			className: 'recommend',
			click: function() {
				ok(true, 'recommend');
			}
		}],
		tools: [$.ui.toolbar({
					buttonText: "3",
					titleText: "4",
					buttonClick: function(){
						ok(true, "buttonClick");
					},
					btns: [{
						label: 'fontsize',
						className: 'fontsize',
						click: function() {
							ok(true, 'fontsize');
						}
					}]
			}), $.ui.toolbar({
					buttonText: "5",
					titleText: "6",
					buttonClick: function(){
						ok(true, "buttonClick");
					},
					btns: [{
						label: 'background',
						className: 'background',
						click: function() {
							ok(true, 'background');
						}
					}],
			})]
	});
	equals(toolbar._el.children().length, 3, "3 rows");
	equals(toolbar._el.children()[0].childNodes[0].textContent, "1", "The 1st toolbar is right");
	equals(toolbar._el.children()[0].childNodes[1].textContent, "2", "The 1st toolbar is right");
	equals(toolbar._el.children()[0].childNodes[2].childNodes[0].className, "ui-button ui-button-text-only recommend", "The 1st toolbar is right");
	equals(toolbar._el.children()[0].childNodes[2].childNodes[0].textContent, "recommend", "The 1st toolbar is right");
	equals(toolbar._el.children()[1].childNodes[0].childNodes[0].textContent, "3", "The 1st toolbar is right");
	equals(toolbar._el.children()[1].childNodes[0].childNodes[1].textContent, "4", "The 1st toolbar is right");
	equals(toolbar._el.children()[1].childNodes[0].childNodes[2].childNodes[0].className, "ui-button ui-button-text-only fontsize", "The 1st toolbar is right");
	equals(toolbar._el.children()[1].childNodes[0].childNodes[2].childNodes[0].textContent, "fontsize", "The 1st toolbar is right");
	equals(toolbar._el.children()[2].childNodes[0].childNodes[0].textContent, "5", "The 1st toolbar is right");
	equals(toolbar._el.children()[2].childNodes[0].childNodes[1].textContent, "6", "The 1st toolbar is right");
	equals(toolbar._el.children()[2].childNodes[0].childNodes[2].childNodes[0].className, "ui-button ui-button-text-only background", "The 1st toolbar is right");
	equals(toolbar._el.children()[2].childNodes[0].childNodes[2].childNodes[0].textContent, "background", "The 1st toolbar is right");
	for(var i = 0; i < 3; i ++)
		ua.click(toolbar._el.find(".ui-toolbar-backbtn")[i]);
	for(var i = 0; i < 3; i ++)
		ua.click(toolbar._el.find(".ui-toolbar-toolscon")[i].childNodes[0]);
	toolbar.destroy();
});

test("destroy()", function() {
	expect(3);
	var l1 = ua.eventLength();
	var toolbar = $.ui.toolbar({
		container: '.ui-toolbar-container',
		titleText: '工具栏标题',
		btns: [{
			label: 'recommend',
			className: 'recommend',
			click: function() {
				alert('recommend');
			}
		}, {
			label: 'fontsize',
			className: 'fontsize',
			click: function() {
				alert('fontsize');
			}
		}],
		tools: [$.ui.toolbar({
			isShow: true
		}), $.ui.toolbar({
			isShow: true
		})]
	});
	toolbar.destroy();
	var a = 0;
	for(var i in toolbar) a++;
	equals(a, 0, "The obj is cleared");
	equals($container.children().length, 0, "The dom is removed");
	var l2 = ua.eventLength();
	equals(l2, l1, "The events are cleared");
});