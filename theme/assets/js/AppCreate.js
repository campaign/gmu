/**
 * Created with JetBrains WebStorm.
 * User: chenkang
 * Date: 12-6-17
 * Time: 下午2:49
 * To change this template use File | Settings | File Templates.
 */

var AppCreate = {
    hPath:"",
    hExt:"",
    iPath:"",
    iExt:"",
    action: function(){},
    addLink:function () {
        var lis = document.getElementsByTagName("li");
        this.action(lis);

    }
}