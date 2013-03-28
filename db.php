<?php
require 'dbConfig.php';
$dbh = new PDO("mysql:host=$dbHost;port=$dbPort;dbname=$dbName", $dbUsername, $dbPass, array(PDO::ATTR_PERSISTENT => true));
?>