/**
 * Created with JetBrains WebStorm.
 * User: chenkang
 * Date: 12-6-15
 * Time: 下午6:32
 * To change this template use File | Settings | File Templates.
 */

var Loading = {};
Loading.pages = {
    webapp: "theme/webapp.html",
    pad: "theme/pad.html"
}

Loading.forward = function() {
    if (client && client.core instanceof Function) {
        var cp = client.core();
        if (cp.system.android || cp.system.iphone || cp.system.ipod) {
            window.location.href = Loading.pages.webapp;
        } else {
            window.location.href = Loading.pages.pad;
        }
    }
}

setTimeout(Loading.forward, 1000);

