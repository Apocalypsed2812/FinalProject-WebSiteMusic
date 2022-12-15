<?php
require_once('connection.php');

if (!isset($_POST['id']) || !isset($_POST['username']) || !isset($_POST['email']) || !isset($_POST['role']) || !isset($_POST['gender']) || !isset($_POST['age'])) {
    die(json_encode(array('status' => false, 'data' => 'Parameters not valid')));
}

$id = $_POST['id'];
$username = $_POST['username'];
$email = $_POST['email'];
$role = $_POST['role'];
$gender = $_POST['gender'];
$age = $_POST['age'];


$sql = 'UPDATE account set username = ?, email = ?, role = ? , gender = ?, age = ? where id = ?';

try {
    $stmt = $dbCon->prepare($sql);
    $stmt->execute(array($username, $email, $role, $gender, $age, $id));

    $count = $stmt->rowCount();

    if ($count == 1) {
        echo json_encode(array('status' => true, 'data' => 'Cập nhật user thành công'));
    } else {
        die(json_encode(array('status' => false, 'data' => 'Không có user nào được cập nhật')));
    }
} catch (PDOException $ex) {
    die(json_encode(array('status' => false, 'data' => $ex->getMessage())));
}
