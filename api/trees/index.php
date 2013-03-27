<?php
$trees = array(
    array('id' => 0, 'latlong' => '42.375646, -71.117429', 'name' => 'Northern Red Oak'),
    array('id' => 1, 'latlong' => '42.375620, -71.117150', 'name' => 'English Elm')
    );
header('Content-Type: application/json; charset=utf8');
echo json_encode($trees);
?>