<?php header("Content-type: text/html; charset=utf-8");
?>
<html>
<head>
<style type="text/css">
* {
	margin: 0;
	padding: 0;
}
</style>
<?php
$release = preg_match('/release=true/i', $_SERVER['QUERY_STRING']);
if($release == 0 && array_key_exists('f', $_GET)){
	print "<script type='text/javascript' src='../bin/import.php?f={$_GET['f']}'></script>"."\n";
}
else{
	 print "<script type='text/javascript' src='../bin/zepto.js'></script>\n";
     print "<script type='text/javascript' src='../bin/iscroll.js'></script>\n";
     print "<script type='text/javascript' src='../bin/gmu.js'></script>\n";
}
?>
<script type="text/javascript">
	parent && parent.ua.onload && parent.ua.onload(window);
</script>
</head>
<body>
</body>
</html>
