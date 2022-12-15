<?php
require_once('connection.php');

$id = $_POST['id'];
$name = $_POST['name'];
$topic = $_POST['topic'];
$description = $_POST['description'];
$singers = $_POST['singers'];
$songs = $_POST['songs'];


$sql = 'UPDATE categories set name = ?, topic = ?, description = ?, singers = ?, songs = ? where id = ?';

try {
    $stmt = $dbCon->prepare($sql);
    $stmt->execute(array($name, $topic, $description, $singers, $songs, $id));

    $count = $stmt->rowCount();

    if ($count == 1) {
        echo json_encode(array('status' => true, 'data' => 'Cập nhật categories thành công'));
    } else {
        die(json_encode(array('status' => false, 'data' => 'Không có categories nào được cập nhật')));
    }
} catch (PDOException $ex) {
    die(json_encode(array('status' => false, 'data' => $ex->getMessage())));
}
