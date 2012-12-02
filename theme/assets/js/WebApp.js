/**
 * Created with JetBrains WebStorm.
 * User: chenkang
 * Date: 12-6-17
 * Time: 下午12:58
 * To change this template use File | Settings | File Templates.
 */

AppCreate.hPath = "../demo/webapp/";
AppCreate.hExt = ".html";
AppCreate.iPath = "assets/images/";
AppCreate.iExt = ".png";

AppCreate.action = function () {
    lis = document.getElementsByTagName("li");
    for (var i = 0; i < lis.length; i++) {
        try {
            var a = lis[i].getElementsByTagName("a")[0];
            var img = lis[i].getElementsByTagName("img")[0];
            if (a) {
                var itemH = a.getElementsByTagName("h3")[0];
                //a.href = this.hPath + itemH.innerHTML.toLowerCase().replace(/[_|\s]/g, "") + this.hExt;
                img.src = this.iPath + itemH.innerHTML.toLowerCase().replace(/[_|\d|\s]/g, "") + this.iExt;
            }
        } catch (e) {

        }
    }
}

AppCreate.addLink();