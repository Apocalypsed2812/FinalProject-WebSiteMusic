<?php

require_once('connection.php');

if (!isset($_POST['category'])) {
    die(json_encode(array('status' => false, 'data' => 'Category not valid')));
}

$category = $_POST['category'];

$sql = 'SELECT * FROM songs where category = ?';

try {
    $stmt = $dbCon->prepare($sql);
    $stmt->execute(array($category));
} catch (PDOException $ex) {
    die(json_encode(array('status' => false, 'data' => $ex->getMessage())));
}

$data = array();
while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
    $data[] = $row;
}

echo json_encode(array('status' => true, 'data' => $data));
