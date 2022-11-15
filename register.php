<?php
    session_start();
    // if (!isset($_SESSION['user']) || !isset($_SESSION['role']) || $_SESSION['role'] != 'admin') {
    //     header('Location: ../taikhoan/login.php');
    //     exit();
    // } 
    require_once('./db.php');
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
    <title>Register Page</title>
</head>
<body style = "font-family: 'Poppins', sans-serif; font-size: 16px;">
    <div id="toast">
    </div>
    <div class="login">
        <div class="login-form">
            <form action="" method="post" id="loginForm">
                <h2><strong>Register</strong></h2>
                <div class="form-group form-group1">
                    <input type="text" placeholder=" " name="username" id="username" value="">
                    <label for="username">Username</label>
                </div>
                <div class="form-group form-group1">
                    <input type="password" placeholder=" " name="password" id="password" value="">
                    <label for="password">Password</label>
                </div>
                <div class="form-group form-group1">
                    <input type="password" placeholder=" " name="re_password" id="re_password" value="">
                    <label for="password">RePassword</label>
                </div>
                <div class="form-group form-group1">
                    <input type="text" placeholder=" " name="email" id="email" value="">
                    <label for="email">Email</label>
                </div>
                <div class="form-group form-group1">
                    <!-- {{#if error}}
                    <div class='alert alert-danger'>{{error}}</div>
                    {{/if}} -->
                    <button>Đăng Kí</button>
                </div>
            </form>
            <div class="form-group form-group1">
                <p>Bạn đã có tài khoản. <a href="./login.php" style="color: blue">Đăng nhập</a></p>
            </div>
        </div>
    </div>
<script src="./assets/js/main.js"></script>
<?php
    $error = '';
    $username = '';
    $password = '';
    $re_password = '';
	$role = '';
    $email = '';

    if (isset($_POST['username']) && isset($_POST['password']) && isset($_POST['re_password']) && isset($_POST['email']))
    {
        $username= $_POST['username'];
        $password = $_POST['password'];
        $re_password = $_POST['re_password'];
		$role = 'user';
        $email = $_POST['email'];

        if (empty($username)) {
            echo "<script>showErrorToast('Vui lòng nhập Username')</script>";
        }
        else if (empty($password)) {
            echo "<script>showErrorToast('Vui lòng nhập Password')</script>";
        }
		else if (empty($re_password)) {
            echo "<script>showErrorToast('Vui lòng nhập lại Password')</script>";
        }
        else if (empty($email)) {
            echo "<script>showErrorToast('Vui lòng nhập lại email')</script>";
        }
        else if ($re_password != $password) {
            echo "<script>showErrorToast('Mật khẩu không khớp')</script>";
        }
        else {
            // register a new account
            $result = register($username, $password, $role, $email);
            if ($result['code'] == 0)
			{
                //thanh cong
				//die("Register successfully");
				header('Location: ./login.php');
				exit();
            } 
			else 
			{
                $error = $result['message'];
                echo "<script>showErrorToast('Username hoặc email đã tồn tại')</script>";
            }
        }
    }
?>
</body>
</html>