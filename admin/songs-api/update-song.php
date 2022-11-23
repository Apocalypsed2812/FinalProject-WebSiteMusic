<?php
require_once('connection.php');

if (!isset($_POST['id']) || !isset($_POST['name']) || !isset($_POST['singer']) || !isset($_POST['category'])) {
    die(json_encode(array('status' => false, 'data' => 'Parameters not valid')));
}

$id = $_POST['id'];
$name = $_POST['name'];
$singer = $_POST['singer'];
$category = $_POST['category'];
$nation = $_POST['nation'];
$lyric = $_POST['lyric'];

$sql = 'UPDATE songs set name = ?, singer = ?, category = ?, nation = ? , lyric = ? where id = ?';

try {
    $stmt = $dbCon->prepare($sql);
    $stmt->execute(array($name, $singer, $category, $nation, $lyric, $id));

    $count = $stmt->rowCount();

    if ($count == 1) {
        echo json_encode(array('status' => true, 'data' => 'Cập nhật bài hát thành công'));
    } else {
        die(json_encode(array('status' => false, 'data' => 'Không có bài hát nào được cập nhật')));
    }
} catch (PDOException $ex) {
    die(json_encode(array('status' => false, 'data' => $ex->getMessage())));
}
