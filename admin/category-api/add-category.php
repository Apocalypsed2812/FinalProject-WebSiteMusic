<?php
require_once('../connection.php');

$name = $_POST['name'];
$numberOfsong = $_POST['numberOfsong'];
$follow = $_POST['follow'];
$date = $_POST['date'];

$sql = 'INSERT INTO categorys(name,numberOfsong,follow,date) VALUES(?,?,?,?)';

try {
    $stmt = $dbCon->prepare($sql);
    $stmt->execute(array($name, $numberOfsong, $follow, $date));
    echo json_encode(array('status' => true, 'data' => 'Thêm category thành công'));
} catch (PDOException $ex) {
    die(json_encode(array('status' => false, 'data' => $ex->getMessage())));
}
