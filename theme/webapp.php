<?php
require_once("./Mobile_Detect.php");

$useLite = false;
$detect = new Mobile_Detect;
if(!$detect->isiOS()){
    $useLite = true;
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
    <meta name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=0">
    <meta name="apple-mobile-web-app-capable" content="yes" />
    <meta name="apple-touch-fullscreen" content="yes" />
    <meta name="apple-mobile-web-app-status-bar-style" content="black" />
    <title>Demos For Webapp!</title>
    <link type="text/css" href="assets/css/webapptemp.css" rel="stylesheet"/>
    <link type="text/css" href="assets/css/header.css" rel="stylesheet"/>
    <link type="text/css" href="assets/css/pagefooter.css" rel="stylesheet"/>
    <link rel="stylesheet" href="../src/css/webapp/button.css">
    <script type="text/javascript" src="api.js"></script>
    <script type="text/javascript" src="lib/PageHeader.js"></script>
    <script type="text/javascript" src="lib/PageSectionTemp.js"></script>
    <script type="text/javascript" src="lib/PageFooter.js"></script>
    <script type="text/javascript" src="lib/ListSection.js"></script>
    <script type="text/javascript" src="lib/TextSection.js"></script>
    <script type="text/javascript" src="../third-party/iscroll/iscroll.js"></script>
</head>
<body style="height:500px">

<div id="container">
    <div id="up-zone">
        <div id="header"></div>
        <div id="main-zone">
        </div>
    </div>
    <div id="footer"></div>
</div>

<script>
    (function ($, undefined) {

        var pg = $.ui.PageHeader("pageHeader", {title:"#GMU#",
            mTheme:"app-header",
            tTheme:"app-header-tag",
            container:"#header",
            align:2
        });
        var image_path = {pre:'assets/images/', ext:'.png'}
        var sections0 = [
            {head:"Applications", type:"list", items:[
                {title:"Widget", pic:"", desc:'整合应用', href:"<?php echo _link("../_examples/webapp/widget.html");?>"}
            ]},
            {head:"Components", type:"list", items:[
                {title:"Add2Desktop", pic:"", desc:"", href:"<?php echo _link("../_examples/webapp/add2desktop/add2desktop.html");?>"},
                {title:"Carousel", pic:"", desc:"旋转木马", href:"<?php echo _link("../_examples/webapp/carousel/carousel.html");?>"},
                {title:"Dialog", pic:"", desc:"对话框", href:"<?php echo _link("../_examples/webapp/dialog/dialog.html");?>"},
                {title:"Drop Menu", pic:"", desc:"", href:"<?php echo _link("../_examples/webapp/dropmenu/dropmenu.html");?>"},
                {title:"Go Top", pic:"", desc:"返回到页面顶部", href:"<?php echo _link("../_examples/webapp/gotop/gotop.html");?>"},
                {title:"Image Editor", pic:"", desc:"图像编辑器", href:"<?php echo _link("../_examples/webapp/imageeditor/imageeditor.html");?>"},
                {title:"More", pic:"", desc:"", href:"<?php echo _link("../_examples/webapp/more/more.html");?>"},
                {title:"Navigator", pic:"", desc:"", href:"<?php echo _link("../_examples/webapp/navigator/navigator.html");?>"},
                {title:"Refresh", pic:"", desc:"", href:"<?php echo _link("../_examples/webapp/refresh/refresh.html");?>"},
                {title:"Suggestion", pic:"", desc:"", href:"<?php echo _link("../_examples/webapp/suggestion/suggestion.html");?>"},
                {title:"Button", pic:"", desc:"", href:"<?php echo _link("../_examples/webapp/button/button.html");?>"},
                {title:"Toolbar", pic:"", desc:"", href:"<?php echo _link("../_examples/webapp/toolbar/toolbar.html");?>"},
                {title:"Toolbar_1", pic:"", desc:"", href:"<?php echo _link("../_examples/webapp/toolbar/toolbar1.html");?>"},
                {title:"Single row", pic:"单行文字行", desc:"", href:"<?php echo _link("../_examples/webapp/list/single_row_list.html");?>"},
                {title:"Double row", pic:"双行文字行", desc:"", href:"<?php echo _link("../_examples/webapp/list/double_row_list.html");?>"},
                {title:"Multi row", pic:"多行文字行", desc:"", href:"<?php echo _link("../_examples/webapp/list/multi_row_list.html");?>"}
            ]}
        ];
        var sections1 = [
            {type:"text", title:"API文档", text:"尚在维护中！"}
        ];

        function initSections(sections) {
            sections.map(function (idx) {
                idx.items.map(function (idx) {
                    idx.pic = image_path.pre + idx.title.toLowerCase().replace(/\s+|\d+|_/g, '') + image_path.ext;
                });
            })
        }

        initSections(sections0);

        var ss = [
            $.ui.ListSection("lpage", {
                content:sections0,
                barTheme:"app-header-title",
                itemTheme:"app-item",
                contentTheme:"app-item-body",
                align:1,
                hasScroll:true
            }),
            $.ui.TextSection("tpage", {
                content:sections1
            })
        ];

        var ps = $.ui.PageSection("sections", {
            content:ss,
            container:"#main-zone"
        });

        var footers = [
            {classN:"demos", desc:'DEMOS', callback:function () {
                ps._setCSSX(ps.widget(), "0%");
            }},
            {classN:"doc", desc:'DOC', callback:function () {
                ps._setCSSX(ps.widget(), "-50%");
            }}
        ];

        var pf = $.ui.PageFooter("pageFooter", {
            content:footers,
            container:"#footer",
            align:1
        });

        /** page common */
        function autoHeight(offset) { // 处理高度变化
            offset = offset||0;
            return $.later(function() {
                var $page = $('#container'),
                        pos = $page.offset(true).top,
                        height = $(window).height();
                $page.css('height', height - pos + offset);
            }, 0);
        };

        function myScrollTo(pos, nofreshheight) {
            $.later(function() {
                document.body.scrollTop = pos;
                //用他可以解决position:fixed不可点的问题
                $(document.body).css('height', window.innerHeight);
                windowHeight = $(window).height();
                nofreshheight || ($.os.ios ? autoHeight() : $(document).one('scrollStop', autoHeight));
            }, 0);
        }
        $(window).on('onorientationchange' in window ? 'orientationchange' : 'resize', function() {
                    myScrollTo(0);
        }).on('load', function(){ // 收起地址栏
                    myScrollTo(0);
         });

    })(Zepto);
</script>
</body>
</html>
