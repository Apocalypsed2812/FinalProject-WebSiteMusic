<?php
require_once('../connection.php');

if (!isset($_POST['id'])) {
    die(json_encode(array('status' => false, 'data' => 'Parameters not valid')));
}

$id = $_POST['id'];

$sql = 'DELETE FROM account where id = ?';

echo "id: " . $id;

try {
    $stmt = $dbCon->prepare($sql);
    $stmt->execute(array($id));

    $count = $stmt->rowCount();

    if ($count == 1) {
        echo json_encode(array('status' => true, 'data' => 'Xóa bài hát thành công'));
    } else {
        die(json_encode(array('status' => false, 'data' => 'Mã bài hát không hợp lệ')));
    }
} catch (PDOException $ex) {
    die(json_encode(array('status' => false, 'data' => $ex->getMessage())));
}
