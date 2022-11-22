<?php
require_once('connection.php');

$name = $_POST['name'];
$topic = $_POST['topic'];
$follow = $_POST['follow'];
$image = $_POST['image'];
$date = $_POST['date'];
$description = $_POST['description'];
$singers = $_POST['singers'];
$songs = $_POST['songs'];


$sql = 'INSERT INTO categories(name,topic,follow,image,date,description,singers,songs) VALUES(?,?,?,?,?,?,?,?)';

try {
    $stmt = $dbCon->prepare($sql);
    $stmt->execute(array($name, $topic, $follow, $image, $date, $description, $singers, $songs));
    echo json_encode(array('status' => true, 'data' => 'Thêm categories thành công'));
} catch (PDOException $ex) {
    die(json_encode(array('status' => false, 'data' => $ex->getMessage())));
}
