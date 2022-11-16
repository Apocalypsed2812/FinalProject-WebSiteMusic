<?php
require_once('connection.php');

if (!isset($_POST['name']) || !isset($_POST['singer']) || !isset($_POST['listens']) || !isset($_POST['comments'])) {
    die(json_encode(array('status' => false, 'data' => 'Parameters not valid')));
}

$name = $_POST['name'];
$singer = $_POST['singer'];
$listens = $_POST['listens'];
$comments = $_POST['comments'];

$sql = 'INSERT INTO songs(name,singer,listens,comments) VALUES(?,?,?,?)';

try {
    $stmt = $dbCon->prepare($sql);
    $stmt->execute(array($name, $singer, $listens, $comments));

    echo json_encode(array('status' => true, 'data' => 'Thêm songs thành công'));
} catch (PDOException $ex) {
    die(json_encode(array('status' => false, 'data' => $ex->getMessage())));
}
