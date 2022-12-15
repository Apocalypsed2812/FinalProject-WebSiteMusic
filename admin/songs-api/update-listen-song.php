<?php
require_once('connection.php');

if (!isset($_POST['id'])) {
    die(json_encode(array('status' => false, 'data' => 'Parameters not valid')));
}

$id = $_POST['id'];

$sql = 'UPDATE songs set listens = listens + 1 where id = ?';

try {
    $stmt = $dbCon->prepare($sql);
    $stmt->execute(array($id));

    $count = $stmt->rowCount();

    if ($count == 1) {
        echo json_encode(array('status' => true, 'data' => 'Cập nhật lượt nghe bài hát thành công'));
    } else {
        die(json_encode(array('status' => false, 'data' => 'Không có bài hát nào được cập nhật')));
    }
} catch (PDOException $ex) {
    die(json_encode(array('status' => false, 'data' => $ex->getMessage())));
}
