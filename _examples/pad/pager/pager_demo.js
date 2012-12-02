var url = window.location.toString(),
			pn = url.split('=')[1] || 30,
			url = url.split('?')[0],
			num = (pn / 10) + 1,
			transPage = function(currentPage){ // 产品线提供方法，将当前页数转化为产品线需要的变量
				return 'pn=' + (currentPage - 1) * 10;
			};

		page = $.ui.pager({container: '#pager', actionUrl:url, totalPage: 33, viewPage: 10, currentPage: num, transPage: transPage});

		function refreshPage(){
			var args = {
				container: '#pager',
				actionUrl: url,
				totalPage: 33,
				viewPage: 10,
				currentPage: num,
				transPage: transPage
			};

			$.each($('fieldset input'), function(i, elem){
				args[elem.id] = elem.value;
			});

			page.destroy();
			page = $.ui.pager(args);
		}