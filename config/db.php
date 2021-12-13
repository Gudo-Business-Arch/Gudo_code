<?php
//DB credentials
define("DB_HOST","localhost");
define("DB_USER","root");
define("DB_PASS","");
define("DB_NAME","login");

try
{
    // Establishes connection
    //Concatination: 
    $dbh=new PDO("mysql:host=".DB_HOST.";dbname=".DB_NAME,DB_USER,DB_PASS);
    // echo "connection is good";
}
catch(PDOException $e)
{
    exit("Error: ".$e->getMessage());
}

?>