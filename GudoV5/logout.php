<?php
//starts the user session
session_start();
// clear out the the users session data
unset($_SESSION['userlogin']);
//destroy session
session_destroy();
//header redirects you back to login home
header("location:index.php");
?>