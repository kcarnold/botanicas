<?php
require '../../db.php';

$trees = array();
foreach ($dbh->query("SELECT * FROM trees") as $row) {
    $trees[] = array('id' => $row['id'], 'latlong' => $row['latlong'], 'name' => $row['name']);
}
header('Content-Type: application/json; charset=utf8');
echo json_encode($trees);
?>