<?php
require 'dbConfig.php';
$dbh = new PDO("mysql:host=$dbHost;dbname=$dbName", $dbUsername, $dbPass, array(PDO::ATTR_PERSISTENT => true));
?>