<?php
require '../../db.php';

function getPostedModel() {
    return json_decode($_POST['model'], true); // decode to associative arrays.
}

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    // Only creating new trees is supported for now.
    $newTree = getPostedModel();
    $stmt = $dbh->prepare("INSERT INTO trees (name, latlong) VALUES (?, ?)");
    $success = $stmt->execute(array($newTree['name'], $newTree['latlong']));
    if ($success) {
        echo 'ok';
    } else {
        echo "Error adding the tree\n\n";
        var_dump($newTree);
        http_response_code('500');
    }
} else {
    $trees = array();
    foreach ($dbh->query("SELECT * FROM trees") as $row) {
        $trees[] = array('id' => $row['id'], 'latlong' => $row['latlong'], 'name' => $row['name']);
    }
    header('Content-Type: application/json; charset=utf8');
    echo json_encode($trees);
}

?>