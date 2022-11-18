<?php
$target = basename($_FILES["song_files"]["name"]);
$target_file = '../../assets/audio/' . $target;
// $target_file = './images/' . $target;
if (!is_numeric($_FILES["song_files"]["size"]) || $_FILES["song_files"]["size"] == 0)
  echo  "Vui lòng chọn file nhạc";
else if (file_exists($target_file)) {
  echo "";
} else {
  $imageFileType = strtolower(pathinfo($target_file, PATHINFO_EXTENSION));
  if ($imageFileType != "mp3") {
    echo "Vui lòng chọn file mp3";
  } else if (move_uploaded_file($_FILES["song_files"]["tmp_name"], $target_file)) {
    echo "";
  } else {
    echo "Xin lỗi, vui lòng thử lại sau";
  }
}
