<?php
require_once("./Mobile_Detect.php");

$useLite = false;
$detect = new Mobile_Detect;
$isiOs = true;
if(!$detect->isiOS()){
    $useLite = true;
    $isiOs = false;
}
function _link($file){
  global $useLite;
  if($useLite){
    $ext = strrchr($file, ".");
    $path = str_replace($ext, "_lite".$ext, $file);
    if(file_exists($path)){
        return $path;
    }
  }
  return  $file;
}
?>
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=0">
    <title>Demos For Pad</title>
    <link href="assets/css/pad.css" type="text/css" rel="stylesheet">
</head>
<body>
<div id="container">
    <div id="app-header">
        <div id="app-header-tag" class="item-align-left">GMU</div>
    </div>
    <div id="demo">
        <ul id="demo-list">
            <li class="demo-items-line">
                <div class="item-container">
                    <a href="<?php echo _link("../_examples/pad/news.html");?>" class="demo-item  special-item">
                        <img src="assets/images/indexpage.png" alt="icon"/>
                        <div class="special-desc">
                            <h2 >Index Page</h2>
                            <p>首页</p>
                        </div>
                    </a>
                </div>
                <div class="item-container">
                    <a href="<?php echo _link("../_examples/pad/dropmenu/dropmenu.html");?>" class="demo-item">
                        <img src="assets/images/dropmenu.png" alt="icon"/>
                        <div>
                            <h2>Drop Menu</h2>
                            <p>下拉菜单</p>
                        </div>
                    </a>
                </div>
                <div class="item-container">
                    <a href="<?php echo _link("../_examples/pad/button/button.html");?>" class="demo-item">
                        <img src="assets/images/button.png" alt="icon"/>
                        <div>
                            <h2>Button</h2>
                            <p>按钮组件</p>
                        </div>
                    </a>
                </div>
              </li>
            <li class="demo-items-line">
                <div class="item-container">
                    <a href="<?php echo _link("../_examples/pad/login/login.html");?>" class="demo-item">
                        <img src="assets/images/dialog.png" alt="icon"/>
                        <div>
                            <h2>Login</h2>
                            <p>登陆页面</p>
                        </div>
                    </a>
                </div>
                <div class="item-container">
                    <a href="<?php echo _link("../_examples/pad/pager/pager.html");?>" class="demo-item">
                        <img src="assets/images/indexpage.png" alt="icon"/>
                        <div>
                            <h2>Pager</h2>
                            <p>分页控件</p>
                        </div>
                    </a>
                </div>
                <div class="item-container">
                    <a href="<?php echo _link("../_examples/pad/suggestion/suggestion.html");?>" class="demo-item">
                        <img src="assets/images/suggestion.png" alt="icon"/>
                        <div>
                            <h2>Suggestion</h2>
                            <p>建议提示</p>
                        </div>
                    </a>
                </div>
            </li>
            <li class="demo-items-line">
                <div class="item-container">
                    <a href="<?php echo _link("../_examples/pad/tab/tab.html");?>" class="demo-item">
                        <img src="assets/images/toolbar.png" alt="icon"/>
                        <div>
                            <h2>Tab</h2>
                            <p>Tab页切换</p>
                        </div>
                    </a>
                </div>
                <div class="item-container">
                    <a href="<?php echo _link("../_examples/pad/tooltips/tooltips.html");?>" class="demo-item">
                        <img src="assets/images/indexpage.png" alt="icon"/>
                        <div>
                            <h2>Tooltips</h2>
                            <p>提示框</p>
                        </div>
                    </a>
                </div>
                <div class="item-container">
                    <a href="<?php echo _link("../_examples/pad/toscreen/toscreen.html");?>" class="demo-item">
                        <img src="assets/images/indexpage.png" alt="icon"/>
                        <div>
                            <h2>To Screen</h2>
                            <p>添加到桌面</p>
                        </div>
                    </a>
                </div>
            </li>
           </ul>
    </div>
    <div id="footer" class="item-align-left">
        <a href="javascript:;" onclick="alert('尚在维护中!');">
            <img src="assets/images/api.png" alt="Icon">

            <h3 style="display: none">API</h3>
        </a>
    </div>
</div>
<script type="text/javascript" src="assets/js/AppCreate.js"></script>
</body>
</html>