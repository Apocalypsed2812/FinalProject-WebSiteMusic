<?php
    require_once('./db.php');
    $send = send_reset_email("phamhuynhanhtien.12a20.2019@gmail.com", "123456");
    print_r($send);
?>