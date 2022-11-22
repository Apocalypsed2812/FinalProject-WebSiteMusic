<?php 
    define('HOST', '127.0.0.1');
    define('USER', 'root');
    define('PASSWORD', '');
    define('DB', 'final');
    $test = "";
    $conn = new mysqli(HOST, USER, PASSWORD, DB);
    if ($conn->connect_error){
        die('Không thể kết nối đến cơ sở dữ liệu');
    }
