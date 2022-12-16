<?php
	require_once('./db.php');
	session_start();
    if (!$_SESSION['isLogin']) {
        header('Location: ../login.php');
    }
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
	<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.1/css/all.min.css" />
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.16.0/umd/popper.min.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>
	<link rel="stylesheet" href="./assets/css/style.css">
    <script src="//cdn.jsdelivr.net/npm/sweetalert2@11"></script>
    <title>Change Password Page</title>
</head>
<body style = "font-family: 'Poppins', sans-serif; font-size: 16px;">
    <div id="toast">
    </div>
    <div class="login">
        <div class="login-form">
            <form action="" method="post" id="loginForm">
                <h3><strong>Đổi Mật Khẩu</strong></h3>
                <div class="form-group form-group1">
                    <input type="password" placeholder=" " name="password" id="password" value="">
                    <label for="password">Nhập Mật Khẩu Cũ</label>
                </div>
                <div class="form-group form-group1">
                    <input type="password" placeholder=" " name="new_password" id="new_password" value="">
                    <label for="password">Nhập Mật Khẩu Mới</label>
                </div>
                <div class="form-group form-group1">
                    <input type="password" placeholder=" " name="re_password" id="re_password" value="">
                    <label for="password">Nhập Lại Mật Khẩu Mới</label>
                </div>
                <div class="form-group form-group1">
                    <button>Đổi Mật Khẩu</button>
                </div>
            </form>
        </div>
    </div>
    <script src="./assets/js/main.js"></script>
    <?php	
    $error = '';
    $new_password = '';
    $re_password = '';
    $password = '';
    $username = $_SESSION['username'];
	
    if (isset($_POST['new_password']) && isset($_POST['password']) && isset($_POST['re_password'])) {
        $new_password = $_POST['new_password'];
        $re_password = $_POST['re_password'];
        $password = $_POST['password'];

        if (empty($new_password)) {
            echo "<script>showErrorToast('Vui lòng nhập mật khẩu mới')</script>";
        }
        if (empty($re_password)) {
            echo "<script>showErrorToast('Vui lòng nhập lại mật khẩu mới')</script>";
        }
        else if (empty($password)) {
            echo "<script>showErrorToast('Vui lòng nhập mật khẩu')</script>";
        }
        else if (strlen($password) < 6) {
            echo "<script>showErrorToast('Mật khẩu phải có từ 6 ký tự')</script>";
        } 
        else if ($re_password != $new_password) {
            echo "<script>showErrorToast('Mật khẩu mới không khớp')</script>";
        }
        else {
            $result = change_password($username, $password, $new_password);
            if ($result['code']==0){
                echo "<script>showSuccessToast('Đổi Mật Khẩu Thành Công')</script>";
                header('Location: ./user/home.php');
            } 
            else if($result['code']==1){
                echo "<script>showErrorToast('Mật khẩu cũ không đúng')</script>";
            }
			else {
                echo "<script>showErrorToast('Có lỗi xảy ra, vui lòng thử lại sau')</script>";
            }
        }
    }
?>
</body>
</html>