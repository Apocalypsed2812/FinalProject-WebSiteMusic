<?php
    require_once('./db.php');
    session_start();
?>
<?php
    $error = '';
    $email = '';
    $message = '';
    if (isset($_POST['email'])) {
        $email = $_POST['email'];

        if (empty($email)) {
            $error = 'Please enter your email';
        }
        else if (filter_var($email, FILTER_VALIDATE_EMAIL) == false) {
            $error = 'This is not a valid email address';
        }
        else {
            // reset password
            $result = forgot_password($email);
            if($result['code'] == 0)
            {
                // echo "<script>showSuccessToast('Vui lòng kiểm tra email để reset password')</script>";
                $message = 'Vui lòng kiểm tra email để reset password';

            }
            else{
                $error = $result['message'];
            }
        }
    }
?>
<DOCTYPE html>
<html lang="en">
<head>
    <title>Reset user password</title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.16.0/umd/popper.min.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>
</head>
<body>
<div class="container">
    <div class="row justify-content-center">
        <div class="col-md-6 col-lg-5">
            <h3 class="text-center text-secondary mt-5 mb-3">Forgot Password</h3>
            <form method="post" action="" class="border rounded w-100 mb-5 mx-auto px-3 pt-3 bg-light">
                <div class="form-group">
                    <label for="email">Email</label>
                    <input name="email" id="email" type="text" class="form-control" placeholder="Email address">
                </div>
				<!-- <div class="form-group">
                    <label for="user">Username</label>
                    <input name="user" id="user" type="text" class="form-control" placeholder="Username">
                </div> -->
                <div class="form-group">
				<?php
                    if (!empty($message)) {
                        echo "<div class='alert alert-primary'>$message</div>";
                    }
                    else{
                        echo "<div class='alert alert-primary'>Nhập email để tiếp tục hoặc tiếp tục <a href='./login.php'>đăng nhập</a></div>";
                    }
				?>
                </div>
                <div class="form-group">
                    <?php
                        if (!empty($error)) {
                            echo "<div class='alert alert-danger'>$error</div>";
                        }
                    ?>
                    <button class="btn btn-success px-5">Reset password</button>
                </div>
            </form>

        </div>
    </div>
</div>
<script src="./assets/js/main.js"></script>
</body>
</html>
