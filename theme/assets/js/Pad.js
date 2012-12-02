/**
 * Created with JetBrains WebStorm.
 * User: chenkang
 * Date: 12-6-17
 * Time: 下午2:49
 * To change this template use File | Settings | File Templates.
 */

var pad = {
    filter:{}
}

filter = {"indexpage":"../demo/index-page/"}

AppCreate.hPath = "../demo/pad/";
AppCreate.hExt = ".html";
AppCreate.iPath = "assets/images/";
AppCreate.iExt = ".png";

AppCreate.action = function (lis) {
    var me = this;

    try {
        var as = document.getElementsByTagName("a");
        for (var j = 0; j < as.length; j++) {
            var a = as[j];
            var img = as[j].getElementsByTagName("img")[0];
            var h = as[j].getElementsByTagName("h2")[0];
            var p = h.innerHTML.toLowerCase().replace(/[_|\s]/g, "");
            img.src = me.iPath + p + me.iExt;
            if (filter[p]) {
                a.href =filter[p]  + p + me.hExt;
            } else {
                a.href = me.hPath + p + me.hExt;
            }
        }
    } catch (e) {
    }
    finally {
    }
}


AppCreate.addLink();