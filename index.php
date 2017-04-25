<?php
$debugmode = true;

require("classes/level.php");
$levelObj = new level;

if(!isset($_COOKIE['lives']))
{
    setcookie("lives","5",time()+60*60*24*365);
    $lives = 5;
}
else
{
    $lives = $_COOKIE['lives'];
}

if(!isset($_COOKIE['level']))
{
    setcookie("level","1",time()+60*60*24*365);
    $level = 1;
}
else
{
    $level = $_COOKIE['level'];
}

if(!isset($_COOKIE['coins']))
{
    setcookie("coins","0",time()+60*60*24*365);
    $coins = 0;
}
else
{
    $coins = $_COOKIE['coins'];
}
?>
<!DOCTYPE HTML>
<!--

 __     __   __     ______     __  __     __  __     ______
/\ \   /\ "-.\ \   /\  ___\   /\ \_\ \   /\ \_\ \   /\__  _\
\ \ \  \ \ \-.  \  \ \___  \  \ \____ \  \ \  __ \  \/_/\ \/
 \ \_\  \ \_\\"\_\  \/\_____\  \/\_____\  \ \_\ \_\    \ \_\
  \/_/   \/_/ \/_/   \/_____/   \/_____/   \/_/\/_/     \/_/


 __     __     ______     ______
/\ \  _ \ \   /\  ___\   /\  == \
\ \ \/ ".\ \  \ \  __\   \ \  __<
 \ \__/".~\_\  \ \_____\  \ \_____\
  \/_/   \/_/   \/_____/   \/_____/


 ______     ______     __         __  __     ______   __     ______     __   __     ______
/\  ___\   /\  __ \   /\ \       /\ \/\ \   /\__  _\ /\ \   /\  __ \   /\ "-.\ \   /\  ___\
\ \___  \  \ \ \/\ \  \ \ \____  \ \ \_\ \  \/_/\ \/ \ \ \  \ \ \/\ \  \ \ \-.  \  \ \___  \
 \/\_____\  \ \_____\  \ \_____\  \ \_____\    \ \_\  \ \_\  \ \_____\  \ \_\\"\_\  \/\_____\
  \/_____/   \/_____/   \/_____/   \/_____/     \/_/   \/_/   \/_____/   \/_/ \/_/   \/_____/


!-->
<html>
<head>
	<title>Online Platform Game</title>
	<meta http-equiv="pragma" content="no-cache">
    <meta http-equiv="expires" content="-1">
    <meta http-equiv="content-type" 	content="text/html; charset=iso-8859-1">
	<meta http-equiv="content-language" content="nl">
	<meta http-equiv="X-UA-Compatible" 	content="IE=edge,chrome=1">
	<meta name="generator" 				content="Sublime Text">
	<meta name="description" 			content="">
	<meta name="keywords" 				content="">
	<meta name="author" 				content="Insyht Web Solutions">
	<meta name="robots" 				content="index, follow">
	<!-- facebook like-button -->
	<meta property="og:title" 			content="">
	<meta property="og:description" 	content="">
	<meta property="og:image" 			content="">
	<meta property="fb:admins" 			content="1747136511">
  	<!-- end of facebook like-button -->
  	<link rel="shortcut icon" 			href="favicon.ico">
	<link rel="stylesheet" 				href="style.css">
    <script type="text/javascript">var debugmode = <?=$debugmode;?>;</script>
    <script type="text/javascript" 		src="http://code.jquery.com/jquery-1.10.2.min.js"></script>
	<script type="text/javascript"		src="http://ajax.googleapis.com/ajax/libs/jqueryui/1.10.3/jquery-ui.min.js"></script>
	<script type="text/javascript" 		src="levels/1/design.opg"></script>
	<script type="text/javascript" 		src="levels/1/definitions.js"></script>
	<script type="text/javascript" 		src="js/vars.js"></script>
	<script type="text/javascript" 		src="js/hooks.js"></script>
	<script type="text/javascript" 		src="js/main.js"></script>
	<script type="text/javascript" 		src="js/movement.js"></script>
</head>

<body onload="main()">
<audio id="sfx" 		src=""></audio>
<audio id="soundtrack" 	src="" autoplay="autoplay" loop="loop" <?=$muted;?>></audio>

<div id="scorebar">
	<img id="livesIcon" src="sprites/player/right.png">		<span id="lives"><?=$lives;?></span>
	<img id="coinsIcon" src="sprites/environment/awardsCoin.png">	<span id="coins"><?=$coins;?></span>
	<img id="timeIcon" src="sprites/environment/time.png">	<span id="time"></span>
	<img id="muteIcon" src="sprites/environment/mute.png" onclick="muteMusic()">
</div>

<div name="main" id="main">
	<img id="player" src="sprites/player/right.png" style="border: 1px solid limegreen">
    <div id="temp" style="position: absolute; border: 1px solid limegreen; background-color: limegreen; z-index: 999"></div>

    <div name="level" id="level" style="/*background-image: url('levels/1/background.jpg');*/">
        <?php $levelObj->build('1');?>
 	</div>
</div>
<?php if($debugmode):?>
<div id="debug">
    <table>
        <tr><td>Mouse position left:</td>   <td id="mouseposleft"></td></tr>
        <tr><td>Mouse position top:</td>    <td id="mousepostop"></td></tr>
    </table>

    <hr>

    <table>
        <tr><td>Collisionbox abs position left:</td>    <td id="colboxposleft"></td></tr>
        <tr><td>Collisionbox abs position right:</td>   <td id="colboxposright"></td></tr>
        <tr><td>Collisionbox abs position top:</td>     <td id="colboxpostop"></td></tr>
        <tr><td>Collisionbox abs position bottom:</td>  <td id="colboxposbottom"></td></tr>
        <tr><td>Collisionbox offset left:</td>      <td id="colboxoffsetleft"></td></tr>
        <tr><td>Collisionbox offset right:</td>      <td id="colboxoffsetright"></td></tr>
        <tr><td>Collisionbox offset top:</td>    <td id="colboxoffsettop"></td></tr>
        <tr><td>Collisionbox offset bottom:</td>    <td id="colboxoffsetbottom"></td></tr>
        <tr><td>Collisionbox width:</td>            <td id="colboxwidth"></td></tr>
        <tr><td>Collisionbox height:</td>           <td id="colboxheight"></td></tr>
    </table>

    <hr>

    <table>
        <tr><td>Player abs position left:</td>      <td id="playerposleft"></td></tr>
        <tr><td>Player abs position right:</td>      <td id="playerposright"></td></tr>
        <tr><td>Player abs position top:</td>       <td id="playerpostop"></td></tr>
        <tr><td>Player abs position bottom:</td>    <td id="playerposbottom"></td></tr>
        <tr><td>Player offset left:</td>        <td id="playeroffsetleft"></td></tr>
        <tr><td>Player offset right:</td>      <td id="playeroffsetright"></td></tr>
        <tr><td>Player offset top:</td>        <td id="playeroffsettop"></td></tr>
        <tr><td>Player offset bottom:</td>      <td id="playeroffsetbottom"></td></tr>
        <tr><td>Player width:</td>              <td id="playerwidth"></td></tr>
        <tr><td>Player height:</td>             <td id="playerheight"></td></tr>
    </table>

    <hr>

    <table>
        <tr><td>Object in Collisionbox:</td>    <td id="collisionobj"></td></tr>
        <tr><td>Last button pressed:</td>       <td id="buttonpressed"></td></tr>
        <tr><td>Last move was permitted:</td>   <td id="allowedmove"></td></tr>
    </table>
</div>
<?php endif;?>
</body>
</html>
