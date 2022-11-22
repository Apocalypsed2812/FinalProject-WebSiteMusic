<?php
require_once('connection.php');

$id = $_POST['id'];
$name = $_POST['name'];


$sql = 'UPDATE categorys set name = ? where id = ?';

try {
    $stmt = $dbCon->prepare($sql);
    $stmt->execute(array($name, $id));

    $count = $stmt->rowCount();

    if ($count == 1) {
        echo json_encode(array('status' => true, 'data' => 'Cập nhật category thành công'));
    } else {
        die(json_encode(array('status' => false, 'data' => 'Không có category nào được cập nhật')));
    }
} catch (PDOException $ex) {
    die(json_encode(array('status' => false, 'data' => $ex->getMessage())));
}
