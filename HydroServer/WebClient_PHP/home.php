<?php
//check for required fields
if ((!$_POST['username']) || (!$_POST['password'])) {
	header("Location: incorrectlogin.php");
	exit;
}

//connect to server and select database
require_once 'database_connection.php';

//build and issue the query
$sql ="SELECT * FROM moss_users WHERE username='$_POST[username]' AND password= password('$_POST[password]')";

$result = @mysql_query($sql,$connection) or die(mysql_error());

//get the number of rows in the result set
$num = mysql_num_rows($result);
	if ($num != 0) {
		//get the person's first name
		while ($row = mysql_fetch_assoc($result)) {
		$firstname = $row['firstname'];
		}
		$msg ="<h1>Welcome, $firstname!</h1>";
	} else {
		header("Location: incorrectlogin.php");
		exit;
	}

//Set the navigation menu and a cookie of the user's authority
// or redirect the user elsewhere if unauthorized
$auth = mysql_result($result,0,"authority");

if ($auth == "admin"){
	$nav ="<script src=A_navbar.js></SCRIPT>";
	$cookie_name ="auth";
	$cookie_value ="$auth";
	$cookie_expire ="0";
	$cookie_domain ="adventurelearningat.com";
	setcookie($cookie_name,$cookie_value,$cookie_expire,"/", $cookie_domain,0);
	}
elseif ($auth == "teacher"){
	$nav ="<SCRIPT src=T_navbar.js></SCRIPT>";
	$cookie_name ="auth";
	$cookie_value ="$auth";
	$cookie_expire ="0";
	$cookie_domain ="adventurelearningat.com";
	setcookie($cookie_name,$cookie_value,$cookie_expire,"/", $cookie_domain,0);
	}
elseif ($auth == "student"){
	$nav ="<SCRIPT src=S_navbar.js></SCRIPT>";
	$cookie_name ="auth";
	$cookie_value ="$auth";
	$cookie_expire ="0";
	$cookie_domain ="adventurelearningat.com";
	setcookie($cookie_name,$cookie_value,$cookie_expire,"/", $cookie_domain,0);
	}
else {
	header("Location: unauthorized.php");
	exit;	
	}

?>

<html>
<head>
<title>HydroServer Lite Web Client</title>
<link href="styles/main_css.css" rel="stylesheet" type="text/css" media="screen" />
</head>

<body background="images/bkgrdimage.jpg">
<table width="960" border="0" align="center" cellpadding="0" cellspacing="0">
  <tr>
    <td colspan="2"><img src="images/WebClientBanner.png" width="960" height="200" alt="Adventure Learning banner" /></td>
  </tr>
  <tr>
    <td colspan="2" bgcolor="#3c3c3c">&nbsp;</td>
  </tr>
  <tr>
    <td width="240" valign="top" bgcolor="#f2e6d6"><?php echo "$nav"; ?></td>
    <td width="720" valign="top" bgcolor="#FFFFFF"><blockquote><br />
      <?php echo "$msg"; ?>
      <p>Please select a function from the left-hand menu....</p>
      <p>&nbsp;</p>
      <p>&nbsp;</p>
      <p>&nbsp;</p>
      <p>&nbsp;</p>
      <p>&nbsp;</p>
      <p>&nbsp;</p>
      <p>&nbsp;</p>
      <p>&nbsp;</p>
      <p>&nbsp;</p>
      <p>&nbsp;</p>
      <p>&nbsp;</p>
      <p>&nbsp;</p>
    </blockquote>
    <p></p></td>
  </tr>
  <tr>
    <SCRIPT src="footer.js"></SCRIPT>
  </tr>
</table>
</body>
</html>