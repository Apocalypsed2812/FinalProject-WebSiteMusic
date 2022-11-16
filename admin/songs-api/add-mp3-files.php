<?php
$target = basename($_FILES["song_files"]["name"]);
$target_file = '../../assets/audio/' . $target;
// $target_file = './images/' . $target;
if (!is_numeric($_FILES["song_files"]["size"]) || $_FILES["song_files"]["size"] == 0)
  echo  "Please choose the song file.";
else if (file_exists($target_file)) {
  echo "";
} else {
  $imageFileType = strtolower(pathinfo($target_file, PATHINFO_EXTENSION));
  if ($imageFileType != "mp3") {
    echo "Sorry, only mp3 files are allowed.";
  } else if (move_uploaded_file($_FILES["song_files"]["tmp_name"], $target_file)) {
    echo "";
  } else {
    echo "Sorry, there was an error uploading your file.";
  }
}
