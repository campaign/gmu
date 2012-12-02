var d = $.ui.dialog({
			title: '用户登录',
			width: 300
		});

		d.content('<div class="login-content"><p>账号：<input type="text"></p><p>密码：<input type="text"></p><p><input type="button" value="登录"> <a >忘记密码</a></p></div>');

		function show(){
			d.show();
		}