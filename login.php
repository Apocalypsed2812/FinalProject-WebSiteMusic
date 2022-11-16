<?php
	session_start();
	require_once('./db.php');
	// if (isset($_SESSION['user']) && $_SESSION['role'] == 'user') {
	// 	header('Location: change_password.php');
	// 	exit();
	// }
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
    <title>Login Page</title>
</head>
<body style = "font-family: 'Poppins', sans-serif; font-size: 16px;">
    <div id="toast">
    </div>
    <div class="login">
        <div class="login-form">
            <form action="" method="post" id="loginForm">
                <h1><strong>Login</strong></h1>
                <div class="form-group form-group1">
                    <input type="text" placeholder=" " name="username" id="username" value="">
                    <label for="username">Username</label>
                </div>
                <div class="form-group form-group1">
                    <input type="password" placeholder=" " name="password" id="password" value="">
                    <label for="password">Password</label>
                </div>
                <a href="./forgot.php" class="forgot-password" style="width: 100%; display: flex; justify-content: flex-end; margin-top: -16px;">Forgot Password ?</a>
				<div class="form-group custom-control custom-checkbox form-group1">
                    <input name = "remember" type="checkbox" class="custom-control-input" id="remember">
                    <label class="custom-control-label" for="remember">Remember login</label>
                </div>
                <div class="form-group form-group1">
                    <button>Đăng Nhập</button>
                </div>
            </form>
            <div class="form-group form-group1">
                <p>Bạn chưa có tài khoản. <a href="./register.php" style="color: blue">Đăng kí ngay</a></p>
            </div>
        </div>
    </div>
    <script src="./assets/js/main.js"></script>
    <?php	
    $error = '';
	
	if(isset($_COOKIE['username']) && isset($_COOKIE['password']))
	{
		$username = $_COOKIE['username'];
		$password = $_COOKIE['password'];
	}
	else
	{
		$username = '';
		$password = '';
	}
	
    if (isset($_POST['username']) && isset($_POST['password'])) {
        $username = $_POST['username'];
        $password = $_POST['password'];

        if (empty($username)) {
            echo "<script>showErrorToast('Vui lòng nhập Username')</script>";
        }
        else if (empty($password)) {
            echo "<script>showErrorToast('Vui lòng nhập Password')</script>";
        }
        else if (strlen($password) < 6) {
            echo "<script>showErrorToast('Mật khẩu phải có từ 6 ký tự')</script>";
        } else {
            $result = login($username, $password);
            if ($result['code']==0){
                $data = $result['data'];
				
				if(isset($_POST['remember']))
				{
					setcookie('username', $username, time() + 3600 *24);
					setcookie('password', $password, time() + 3600 *24);
				}
				
				$_SESSION['username'] = $username;
                $role = $data['role'];
                if($role == 'admin'){
                    $_SESSION['role'] = 'user';
                    header('Location: ./admin/home.php');
                    exit();
                }
                else{
                    $_SESSION['role'] = 'user';
                    header('Location: ./user/home.php');
                    exit();
                }               
            } 
			else {
                $error = 'Invalid username or password';
            }
        }
    }
?>
</body>
</html>