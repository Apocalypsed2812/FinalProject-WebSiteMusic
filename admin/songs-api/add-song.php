<?php
require_once('connection.php');

if (!isset($_POST['name']) || !isset($_POST['singer']) || !isset($_POST['date']) || !isset($_POST['category']) || !isset($_POST['listens']) || !isset($_POST['comments']) || !isset($_POST['file'])) {
    die(json_encode(array('status' => false, 'data' => 'Parameters not valid')));
}

$name = $_POST['name'];
$singer = $_POST['singer'];
$date = $_POST['date'];
$category = $_POST['category'];
$nation = $_POST['nation'];
$lyric = $_POST['lyric'];
$listens = $_POST['listens'];
$comments = $_POST['comments'];
$downloads = $_POST['downloads'];
$file = $_POST['file'];
$sql = 'INSERT INTO songs(name,singer,date,category,nation,lyric,listens,comments,downloads,file) VALUES(?,?,?,?,?,?,?,?,?,?)';

try {
    $stmt = $dbCon->prepare($sql);
    $stmt->execute(array($name, $singer, $date, $category, $nation, $lyric, $listens, $comments, $downloads, $file));
    echo json_encode(array('status' => true, 'data' => 'Thêm songs thành công'));
} catch (PDOException $ex) {
    die(json_encode(array('status' => false, 'data' => $ex->getMessage())));
}
