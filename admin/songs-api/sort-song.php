<?php

require_once('connection.php');

$sql = $_GET['sql'];



try {
    $stmt = $dbCon->prepare($sql);
    $stmt->execute();
} catch (PDOException $ex) {
    die(json_encode(array('status' => false, 'data' => $ex->getMessage())));
}

$data = array();
while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
    $data[] = $row;
}

echo json_encode(array('status' => true, 'data' => $data));
