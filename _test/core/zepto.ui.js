$.ui.define('klass', {
    _create: function() {
        ok(1, '_create被执行');
    },
    _setup: function() {
        ok(1, '_setup被执行');
    },
    _init: function() {
        ok(1, '_init被执行');
    }
});

$.ui.klass.register({
    test: function() {
        var tmp = this.data('a');
        equal(tmp, 1);
        return this;
    }
});

test("defined", function() {
    $.ui.klass($('<div></div>')).destroy();
});

test("id", function() {
    var ins = $.ui.klass($('<div></div>'));
    equal(/^klass-[0-9]*$/.test(ins.id()), true, 'id is right');
    ins.destroy();
});

test("setup", function() {
    $('<div id="setup"></div>').appendTo(document.body);
    $('#setup').klass('this').destroy();
});

test('plugin', function() {
    $.ui.klass($('<div></div>'), {a: 1}).test().destroy();
});

test('component', function() {
    var ins = $.ui.klass($("<div></div>")).component(function() {
        return $.ui.klass($("<div></div>"));
    });
    equal(ins.data('components').length, 1, 'one component is add');
    ins.destroy();
});

test('on trigger', function() {
    stop();
    var ins = $.ui.klass($('<div id="test"></div>').appendTo(document.body)).on('click', function() {
        ok(1, 'click!');
        start();
    });
    $('#test').trigger('click');
    ins.destroy();
});

test('destroy', function() {
    expect(5);

    var l1 = ua.eventLength(),
        el = document.createElement('div');
    el.id = 'dd';
    document.body.appendChild(el);
    var obj = $.ui.klass(el).destroy(),
        a = 0;
    for(var i in obj) a++;
    equals(a, 0, "The obj is clear");
    equals($('#destroy').length, 0, "The dom is removed");
    var l2 = ua.eventLength();
    equals(l2, l1, "The events are cleared");
});