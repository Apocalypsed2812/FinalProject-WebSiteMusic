<?php
$target = basename($_FILES["song_image"]["name"]);
$target_file = '../../assets/images/songs/' . $target;
// $target_file = './images/' . $target;
if (!is_numeric($_FILES["song_image"]["size"]) || $_FILES["song_image"]["size"] == 0)
  echo  "Vui lòng chọn file ảnh";
else if (file_exists($target_file)) {
  echo "";
} else {
  $imageFileType = strtolower(pathinfo($target_file, PATHINFO_EXTENSION));
  if ($imageFileType != "jpg" && $imageFileType != "png") {
    echo "Xin lỗi, chỉ cho phép ảnh có đuôi là png hoặc jpg";
  } else if (move_uploaded_file($_FILES["song_image"]["tmp_name"], $target_file)) {
    echo "";
  } else {
    echo "Xin lỗi, vui lòng thử lại sau";
  }
}
