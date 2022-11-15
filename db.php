<?php
    define('HOST', '127.0.0.1');
    define('USER', 'root');
    define('PASSWORD', '');
    define('DB', 'final');

    use PHPMailer\PHPMailer\PHPMailer;
    use PHPMailer\PHPMailer\SMTP;
    use PHPMailer\PHPMailer\Exception;

    //Load Composer's autoloader
    require 'vendor/autoload.php';
	
	//connect to database
    function open_database() {
        $conn = new mysqli(HOST, USER, PASSWORD, DB);
        if ($conn->connect_error){
            die('Không thể kết nối đến cơ sở dữ liệu');
        }
        return $conn;
    }
	
	//login employee
    function login($username, $password){
		$sql = "SELECT * FROM account WHERE username=?";
        $conn = open_database();

        $stm = $conn->prepare($sql);
        $stm->bind_param('s', $username);
        if (!$stm->execute()){
            return array('code' => 1, 'message' => 'Không thể thực thi câu lệnh sql'); // return array(code, message)
        }

        $result = $stm->get_result();
		$data = $result->fetch_assoc();
        if ($result->num_rows==0){
            return array('code' => 2, 'message' => 'Không tồn tại tài khoản'); // return array(code, message)
        }
		$hashed_password = $data['password'];
        if (!password_verify($password, $hashed_password)){
            return array('code' => 3, 'message' => 'Sai mật khẩu'); // return array(code, message)
        }
        return array('code'=>0, 'message' =>'success', 'data' => $data);
    }
	
	//check email exists
	function is_email_exists($email){
        $sql = "SELECT * FROM account WHERE email=?";
        $conn = open_database();

        $stm = $conn->prepare($sql);
        $stm->bind_param('s', $email);
        if (!$stm->execute()){
            die($stm->error);
        } 

        $result = $stm->get_result();
        if ($result->num_rows==0){
            return false; 
        } else return true; 
    }
	
	
	//check username exists
	function is_username_exists($user){
        $sql = "SELECT * FROM account WHERE username=?";
        $conn = open_database();

        $stm = $conn->prepare($sql);
        $stm->bind_param('s', $user);
        if (!$stm->execute()){
            die($stm->error);
        } 

        $result = $stm->get_result();
        if ($result->num_rows==0){
            return false; 
        } else return true; 
    }
	
	//register
	function register($username, $password, $role, $email){
        $hash = password_hash($password, PASSWORD_BCRYPT);
        
        if (is_email_exists($email)){
            return array('code' => 2, 'message' => 'Email đã tồn tại'); // return array(code, message)
        }
		
		if (is_username_exists($username)){
            return array('code' => 3, 'message' => 'Username đã tồn tại'); // return array(code, message)
        }

        $sql = 'INSERT INTO account(username, password, role, email)
        value(?,?,?,?)';
        
        $conn = open_database();
        $stm = $conn->prepare($sql);
        $stm->bind_param('ssss',$username, $hash, $role, $email);
        if (!$stm->execute()){
            return array('code' => 1, 'message' => 'không thể thực thi câu lệnh sql');; // return array(code, message)
        }
        // send verification email
        send_email_register($email, $username, $password);
        return array('code' => 0, 'message' => 'thành công');
    }
	
	//display role
	function get_role(){
        $sql = "SELECT * FROM role";
        $conn = open_database();

        $result = $conn->query($sql);

        $data = array();
        while (($row = $result->fetch_assoc())){
            $data[] = $row;
        }
        return array('code'=>0, 'data'=>$data);
    }
	
	//change password when login first
	function change_password($username, $pass){
        // kiểm tra email token
        /*$sql = 'SELECT * FROM reset_token WHERE email=? and token=? and expire_on>?';
        $conn = open_database();
        $stm = $conn->prepare($sql);
        $exp = time();
        $stm->bind_param('ssi', $email, $token, $exp);
        if (!$stm->execute()){
            return array('code'=> 5, 'message'=>'không thể thực thi câu lệnh sql');
        }
        $result = $stm->get_result();
        if ($result->num_rows == 0){
            return array('code'=>8, 'message'=>'Email không hợp lệ hoặc token đã hết hạn');
        }*/
        // đổi mật khẩu
        $hash = password_hash($pass, PASSWORD_BCRYPT);
		$conn = open_database();
        $sql = "UPDATE employee SET password=?, role = 'employee' WHERE username = ?";
        $stm = $conn->prepare($sql);
        $stm->bind_param('ss',$hash,$username);
        if (!$stm->execute()){
            return array('code'=> 1, 'message'=>'không thể thực thi câu lệnh sql');
        }
        //xóa token 
        /*$sql = 'DELETE FROM reset_token WHERE email=?';
        $stm = $conn->prepare($sql);
        $exp = time();
        $stm->bind_param('s', $email);
        if (!$stm->execute()){
            return array('code'=> 9, 'message'=>'không thể xóa token');
        }*/

        return array('code' => 0 , 'message' => 'success');
    }
	
	//check old password
	function check_old_pass($pass, $user){
        $sql = "SELECT password FROM employee WHERE username=?";
        $conn = open_database();

        $stm = $conn->prepare($sql);
        $stm->bind_param('s', $user);
        if (!$stm->execute()){
            die($stm->error);
        } 

        $result = $stm->get_result();
		$row = $result->fetch_assoc();
		
		$hashed_password = $row['password'];
        if (!password_verify($pass, $hashed_password)){
            return false;
        }
        return true;
    }
	
	//change password for employee
	function change_password_employee($user, $pass){
        $hash = password_hash($pass, PASSWORD_BCRYPT);
		$conn = open_database();
        $sql = "UPDATE employee SET password=? WHERE username = ?";
        $stm = $conn->prepare($sql);
        $stm->bind_param('ss',$hash,$user);
        if (!$stm->execute()){
            return array('code'=> 1, 'message'=>'không thể thực thi câu lệnh sql');
        }
        return array('code' => 0 , 'message' => 'success');
    }

    //check username exists in table request_reset
	function is_username_forgot($user){
        $sql = "SELECT * FROM request_reset WHERE username=? and token = 1";
        $conn = open_database();

        $stm = $conn->prepare($sql);
        $stm->bind_param('s', $user);
        if (!$stm->execute()){
            die($stm->error);
        } 

        $result = $stm->get_result();
        if ($result->num_rows==0){
            return false; 
        } else return true; 
    }
	
	//forgot password
	function forgot_password($email){
        if (!is_email_exists($email)){
            return array('code'=>2, 'message' =>'Email không tồn tại');
        }
        $token = md5($email.'+'.random_int(1000,2000));
        $sql = "UPDATE reset_token SET token=? where email=?";
        $conn = open_database();
        $stm = $conn->prepare($sql);
        $stm->bind_param('ss', $token, $email);
        if (!$stm->execute()){
            return array('code' =>5, 'message' =>'không thể thực thi câu lệnh sql');
        }

        if ($stm->affected_rows == 0){
            $exp = time() + 3600*24;
            $sql = "INSERT INTO reset_token values(?,?,?)";
            $conn = open_database();
            $stm = $conn->prepare($sql);
            $stm->bind_param('ssi', $email, $token, $exp);
            if (!$stm->execute()){
                return array('code' =>5, 'message' =>'không thể thực thi câu lệnh sql');
            }
            // thành công
        }
        send_email_forgot_password($email, $token);
        return array('code' =>0, 'message' =>'thành công');
    }

    //send email register
    function send_email_register($email, $username, $password){

        //Create an instance; passing `true` enables exceptions
        $mail = new PHPMailer(true);
        
        try {
            //Server settings
            //$mail->SMTPDebug = SMTP::DEBUG_SERVER;                      //Enable verbose debug output
            $mail->isSMTP();                                            //Send using SMTP
            $mail->Host       = 'smtp.gmail.com';                     //Set the SMTP server to send through
            $mail->SMTPAuth   = true;                                   //Enable SMTP authentication
            $mail->Username   = 'phamhuynhanhtien123@gmail.com';                     //SMTP username
            $mail->Password   = 'yhulmtfqxbkkugzy';                               //SMTP password
            $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;            //Enable implicit TLS encryption
            $mail->Port       = 587;                                    //TCP port to connect to; use 587 if you have set `SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS`

            //Recipients
            $mail->setFrom('phamhuynhanhtien123@gmail.com', 'Admin WebSite Music');
            $mail->addAddress($email, 'Người nhận');     //Add a recipient
            //$mail->addAddress('ellen@example.com');               //Name is optional
            //$mail->addReplyTo('info@example.com', 'Information');
            //$mail->addCC('cc@example.com');
            //$mail->addBCC('bcc@example.com');

            //Attachments
            //$mail->addAttachment('/var/tmp/file.tar.gz');         //Add attachments
            //$mail->addAttachment('/tmp/image.jpg', 'new.jpg');    //Optional name

            //Content
            $mail->isHTML(true);                                  //Set email format to HTML
            $mail->Subject = 'Register Account';
            $mail->Body    = "
            Bạn đã đăng kí tài khoản thành công\n
            Username của bạn là $username\n
            Password của bạn là $password\n
            Click <a href='http://localhost:8080/FinalProject/login.php'>vào đây</a> để tiến hành đăng nhập
            ";
            $mail->AltBody = 'This is the body in plain text for non-HTML mail clients';

            $mail->send();
            return true;
        } catch (Exception $e) {
            return false;
        }
    }

    //send email reset password
    function send_email_forgot_password($email, $token){

        //Create an instance; passing `true` enables exceptions
        $mail = new PHPMailer(true);
        
        try {
            //Server settings
            //$mail->SMTPDebug = SMTP::DEBUG_SERVER;                      //Enable verbose debug output
            $mail->isSMTP();                                            //Send using SMTP
            $mail->Host       = 'smtp.gmail.com';                     //Set the SMTP server to send through
            $mail->SMTPAuth   = true;                                   //Enable SMTP authentication
            $mail->Username   = 'phamhuynhanhtien123@gmail.com';                     //SMTP username
            $mail->Password   = 'yhulmtfqxbkkugzy';                               //SMTP password
            $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;            //Enable implicit TLS encryption
            $mail->Port       = 587;                                    //TCP port to connect to; use 587 if you have set `SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS`

            //Recipients
            $mail->setFrom('phamhuynhanhtien123@gmail.com', 'Admin WebSite Music');
            $mail->addAddress($email, 'Người nhận');     //Add a recipient
            //$mail->addAddress('ellen@example.com');               //Name is optional
            //$mail->addReplyTo('info@example.com', 'Information');
            //$mail->addCC('cc@example.com');
            //$mail->addBCC('bcc@example.com');

            //Attachments
            //$mail->addAttachment('/var/tmp/file.tar.gz');         //Add attachments
            //$mail->addAttachment('/tmp/image.jpg', 'new.jpg');    //Optional name

            //Content
            $mail->isHTML(true);                                  //Set email format to HTML
            $mail->Subject = 'Reset Password';
            $mail->Body    = "Click <a href='http://localhost:8080/FinalProject/reset_password.php?email=$email&token=$token''>vào đây</a> để đổi mật khẩu";
            $mail->AltBody = 'This is the body in plain text for non-HTML mail clients';

            $mail->send();
            return true;
        } catch (Exception $e) {
            return false;
        }
    }
	
	//reset password
	function reset_password($email, $token, $password){
        // kiểm tra email token
        $sql = 'SELECT * FROM reset_token WHERE email=? and token=? and expire_on>?';
        $conn = open_database();
        $stm = $conn->prepare($sql);
        $exp = time();
        $stm->bind_param('ssi', $email, $token, $exp);
        if (!$stm->execute()){
            return array('code'=> 5, 'message'=>'không thể thực thi câu lệnh sql');
        }
        $result = $stm->get_result();
        if ($result->num_rows == 0){
            return array('code'=>8, 'message'=>'Email không hợp lệ hoặc token đã hết hạn');
        }
        // đổi mật khẩu
        $hash = password_hash($password, PASSWORD_DEFAULT);
        $sql = "UPDATE account SET password=? WHERE email = ?";
        $stm = $conn->prepare($sql);
        $stm->bind_param('ss',$hash,$email);
        if (!$stm->execute()){
            return array('code'=> 5, 'message'=>'không thể thực thi câu lệnh sql');
        }
        //xóa token 
        $sql = 'DELETE FROM reset_token WHERE email=?';
        $stm = $conn->prepare($sql);
        $exp = time();
        $stm->bind_param('s', $email);
        if (!$stm->execute()){
            return array('code'=> 9, 'message'=>'không thể xóa token');
        }

        return array('code' => 0 , 'message' => 'success');
    }
?>