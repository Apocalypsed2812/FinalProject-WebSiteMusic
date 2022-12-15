<?php
require_once('../connection.php');


$id = $_POST['id'];
$num = $_POST['num'];


$sql = 'UPDATE categorys set numberOfsong = ? where id = ?';

try {
    $stmt = $dbCon->prepare($sql);
    $stmt->execute(array($num, $id));

    $count = $stmt->rowCount();

    if ($count == 1) {
        echo json_encode(array('status' => true, 'data' => 'Cập nhật user thành công'));
    } else {
        die(json_encode(array('status' => false, 'data' => 'Không có user nào được cập nhật')));
    }
} catch (PDOException $ex) {
    die(json_encode(array('status' => false, 'data' => $ex->getMessage())));
}
