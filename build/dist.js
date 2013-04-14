(function() {
	"use strict";

	var Q = require('q'),
		file = require("./util/file"),
		config = {
			zepto: {
				path: '_src/core/zepto/',
				files: 'polyfill zepto detect event ajax form fx',
				dest: 'dist/zepto.js',
				banner: '/* Zepto v1.0-1-ga3cab6c - polyfill zepto detect event ajax form fx - zeptojs.com/license */'
			},
			gmu: {
				path: '_src',
				src: ['core/*.js', 'widget/**.js'],
				dest: 'dist/gmu.js'
			}
		};

	function concatZepto() {
		var opt = config.zepto,
			dest = opt.dest,
			files = opt.files;

		files = files
			.split(" ")
			.map(function(file) {
				return opt.path + file + '.js';
			});

		file.concat(files, dest, opt.banner);

		console.log('生成' + dest + '成功。 大小：'+ file.caculateSize(dest));
	}

	function minifyZepto() {
		var opt = config.zepto,
			minDest = opt.dest.replace(/\.js$/, '.min.js');

		file.write(minDest, opt.banner + '\n' + file.minify(opt.dest));
		console.log('生成' + minDest + '成功。 大小：' + file.caculateSize(minDest));
	}

	//提供直接调用
	var run = exports.run = function() {
		return Q
			.try(concatZepto)
			.then(minifyZepto);
	};

	//标记是一个task
	exports.task = true;


	exports.init = function(cli) {
		cli.command('dist')
			.description('合并代码并采用uglify压缩代码')
			.action(run.bind(cli));
	};

})();