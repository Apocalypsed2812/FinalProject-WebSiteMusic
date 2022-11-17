<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Zing MP3</title>
    <link rel="stylesheet" href="../assets/css/style.css">
    <link rel="stylesheet" href="../assets/css/admin.css">
    <link rel="stylesheet" href="../assets/fonts/fontawesome-free-6.1.1-web/css/all.min.css">

    <!-- <script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.7.0/jquery.min.js"></script> -->

</head>

<body class="AdminPage">
    <div class="app">
        <?php
        require_once('../includes/Sidebar/SidebarAdmin.php')
        ?>
        <div class="container">
            <?php
            require_once('../includes/Header/HeaderAdmin.php')
            ?>
            <div class="grid wide container-tablet container-mobile">
                <div class="row mt-110">
                    <div class="col l-12" id="title_home">
                        <span class="new__music-title">
                            Thông tin bài hát
                        </span>
                        <span id="Add_alert">ADD Successful</span>
                    </div>
                </div>
                <div class="row mt-32">
                    <div class="col l-12 m-12 c-12 admin__song">
                        <table border="1" class="admin__song-table">
                            <thead class="admin__song-table-head">
                                <tr>
                                    <td>ID</td>
                                    <td>Tên</td>
                                    <td>Ca sĩ</td>
                                    <td>Lượt nghe</td>
                                    <td>Bình luận</td>
                                    <td>Action</td>
                                </tr>
                            </thead>
                            <tbody class="admin__song-table-body" id="table-body">
                                <tr>
                                    <td>1</td>
                                    <td>Ân tình trong em</td>
                                    <td>Châu khải phong</td>
                                    <td>1235</td>
                                    <td>233</td>
                                    <td>
                                        <i class="fa-solid fa-eye"></i>
                                        <i class="fa-solid fa-trash-can"></i>
                                        <i class="fa-solid fa-pen-to-square"></i>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div class="row mt-32">
                    <div class="col l-12 m-12 c-12">
                        <ul class="admin__song-pagination-list">
                            <li class="admin__song-pagination-item">
                                <a href="" class="admin__song-pagination-link admin__song-pagination-link--active">1</a>
                            </li>
                            <li class="admin__song-pagination-item">
                                <a href="" class="admin__song-pagination-link">2</a>
                            </li>
                            <li class="admin__song-pagination-item">
                                <a href="" class="admin__song-pagination-link">3</a>
                            </li>
                        </ul>
                    </div>
                </div>

                <div class="row mt-32">
                    <div class="col l-12 m-12 c-12">
                        <div class="admin__song-btn">
                            <button>thêm bài hát</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Modal Delete-->
    <div class="modal modal-add-song" id="myModal_DeleteSong">
        <div class="modal__overlay modal__overlay-register"></div>
        <div class="modal__body modal__container">
            <div class="auth-form auth-form-register">
                <div class="auth-form__container">
                    <div class="auth-form__header">
                        <h2>Xóa bài hát</h2>
                        <i class="fa-solid fa-xmark"></i>
                    </div>
                    <p>Bạn muốn xóa bài hát <b id="deleteSong_Name"></b> ?</p>

                    <div class="auth-form__controls auth-form__controls-add">
                        <button type="button" id="btn-close-delete-song" class="btn auth-form__controls-back btn--normal btn-close-add-staff">Hủy</button>
                        <button type="submit" id="btn-submit-delete-song" onclick="delete_song()" class="btn btn--primary btn-add-staff">Xóa</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- Modal add song -->
    <div class="modal modal-add-song" id="myModal_AddSong">
        <div class="modal__overlay modal__overlay-register"></div>
        <div class="modal__body modal__container">
            <div class="auth-form auth-form-register">
                <div class="auth-form__container">
                    <div class="auth-form__header">
                        <h2>Thêm bài hát</h2>
                        <i class="fa-solid fa-xmark"></i>
                    </div>
                    <form id="myForm" action="./songs-api/add-mp3-files.php" method="post" enctype="multipart/form-data">
                        <div class="auth-form__form">
                            <div class="auth-form__group">
                                <label class="add-form_label" for="song_name_add_song">Tên bài hát</label>
                                <input type="text" class="add-form_input" placeholder="Vui lòng nhập tên bài hát" name="song_name" id="song_name_add_song">
                            </div>
                            <div class="auth-form__group">
                                <label class="add-form_label" for="song_singer_add_song">Tên Ca sĩ</label>
                                <input type="text" class="add-form_input" placeholder="Vui lòng nhập tên ca sĩ" name="song_singer" id="song_singer_add_song">
                            </div>
                            <div class="auth-form__group">
                                <label class="add-form_label" for="song_category_add_song">Thể loại nhạc</label>
                                <input type="text" class="add-form_input" placeholder="Vui lòng nhập thể loại" name="song_category" id="song_category_add_song">
                            </div>
                            <div class="auth-form__group">
                                <label class="add-form_label" for="song_Lyric_add_song">Lyric</label>
                                <textarea id="song_Lyric_add_song" placeholder="Lyric" name="song_Lyric" rows="10" cols="57"></textarea>
                                <!-- <input type="text" class="add-form__input" placeholder="Lyric" name="song_Lyric"
                                    id="song_Lyric_add_song"> -->
                            </div>
                            <div class="auth-form__group">
                                <label class="add-form_label" for="song_files_add_song">File nhạc</label>
                                <input type="file" class="add-form_input" name="song_files" id="song_files_add_song">
                            </div>
                            <span id="Add_Error_Mess">Error messageas</span>

                        </div>

                        <div class="auth-form__controls auth-form__controls-add">

                            <button type="button" id="btn-close-add-song" class="btn auth-form__controls-back btn--normal btn-close-add-staff">Hủy</button>
                            <button type="submit" id="btn-submit-add-song" onclick="add_song()" class="btn btn--primary btn-add-staff">Thêm</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>

    <!-- Modal edit song -->
    <div class="modal modal-add-song" id="myModal_EditSong">
        <div class="modal__overlay modal__overlay-register"></div>
        <div class="modal__body modal__container">
            <div class="auth-form auth-form-register">
                <div class="auth-form__container">
                    <div class="auth-form__header">
                        <h2>Sửa thông tin bài hát</h2>
                        <i class="fa-solid fa-xmark"></i>
                    </div>
                    <form id="myEditForm" action="#">
                        <div class="auth-form__form">
                            <div class="auth-form__group">
                                <label class="add-form_label" for="song_id_edit_song">ID bài hát</label>
                                <input readonly type="text" class="add-form_input" name="song_id" id="song_id_edit_song">
                            </div>
                            <div class="auth-form__group">
                                <label class="add-form_label" for="song_name_edit_song">Tên bài hát</label>
                                <input type="text" class="add-form_input" placeholder="Vui lòng nhập tên bài hát" name="song_name" id="song_name_edit_song">
                            </div>
                            <div class="auth-form__group">
                                <label class="add-form_label" for="song_singer_edit_song">Tên Ca sĩ</label>
                                <input type="text" class="add-form_input" placeholder="Vui lòng nhập tên ca sĩ" name="song_singer" id="song_singer_edit_song">
                            </div>
                            <div class="auth-form__group">
                                <label class="add-form_label" for="song_category_edit_song">Thể loại nhạc</label>
                                <input type="text" class="add-form_input" placeholder="Vui lòng nhập thể loại" name="song_category" id="song_category_edit_song">
                            </div>
                            <div class="auth-form__group">
                                <label class="add-form_label" for="song_lyric_edit_song">Lyric</label>
                                <textarea id="song_lyric_edit_song" placeholder="Lyric" name="song_Lyric" rows="10" cols="57"></textarea>
                                <!-- <input type="text" class="edit-form__input" placeholder="Lyric" name="song_Lyric"
                                    id="song_Lyric_edit_song"> -->
                            </div>
                            <span id="edit_Error_Mess">Error messageas</span>

                        </div>
                        <div class="auth-form__controls auth-form__controls-edit">

                            <button type="button" id="btn-close-edit-song" class="btn auth-form__controls-back btn--normal btn-close-edit-staff">Hủy</button>
                            <button type="button" id="btn-submit-edit-song" onclick="edit_song()" class="btn btn--primary btn-edit-staff">Sửa</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</body>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>

<script src="https://malsup.github.io/jquery.form.js"></script>

<!-- <script src="../assets/js/main.js"></script> -->
<!-- <script src="../assets/js/admin.js"></script> -->

<script>
    let addBtn = $(".admin__song-btn button"),
        XIcon = $(".auth-form__header i.fa-xmark"),
        cancelSongForm = $(".auth-form__controls-back"),
        Add_form = $("#myModal_AddSong"),
        Delete_form = $("#myModal_DeleteSong"),
        Edit_form = $("#myModal_EditSong"),
        FormAdd_InputBtn = $("#myModal_AddSong input[type='text']"),
        FormEdit_InputBtn = $("#myModal_EditSong input[type='text']"),
        DeleteSong_name = $("#deleteSong_Name");

    // sau khi trang tải xong 
    $(document).ready(function() {
        // Add active cho sidebar
        $(".header__item:nth-child(2)").addClass("header__item--active");
        // Lấy dữ liệu bài hát
        getData();
    });

    // đổi màu border và ẩn thông báo lỗi
    //form Add
    FormAdd_InputBtn.click(function() {
        FormAdd_InputBtn.css({
            "border": "1px solid #dbdbdb"
        })
        $("#Add_Error_Mess").css("visibility", "hidden");
    })
    //form Edit
    FormEdit_InputBtn.click(function() {
        FormEdit_InputBtn.css({
            "border": "1px solid #dbdbdb"
        })
        $("#edit_Error_Mess").css("visibility", "hidden");
    })


    // nút 'Thêm bài hát' => hiện form
    addBtn.click(function() {
        Add_form.css("display", "flex");
    });

    // nút 'X' và 'hủy' => đóng form
    XIcon.click(function() {
        $(".modal").css("display", "none");

    });
    cancelSongForm.click(function() {
        $(".modal").css("display", "none");
    });


    // hàm lấy dữ liệu db chèn vào table
    function getData() {
        $.get("http://localhost:" + location.port + "/admin/songs-api/get-song.php", function(data, status) {
            let TableBody = ''
            data['data'].forEach(e => {
                TableBody += '<tr><td>' + e['id'] +
                    '</td><td>' + e['name'] +
                    '</td><td>' + e['singer'] +
                    '</td><td>' + e['listens'] +
                    '</td><td>' + e['comments'] +
                    '</td><td> ' +
                    '<i class="fa-solid fa-eye"></i>' +
                    '<i class="fa-solid fa-trash-can" onclick="Open_Dialog_Delete(' + e['id'] + ', \'' + e['name'] + '\')"></i>' +
                    '<i class="fa-solid fa-pen-to-square" onclick="Open_Dialog_Edit(' + e['id'] + ', \'' + e['name'] + '\'' + ', \'' + e['singer'] + '\'' + ', \'' + e['category'] + '\'' + ', \'' + e['lyric'] + '\')"></i>' +
                    '</td><td style="display: none">' + e['category'] +
                    '</td><td style="display: none">' + e['lyric'] +
                    '</td></tr>'
            });
            $("#table-body").html(TableBody)
        }, "json");
    }

    //hàm thêm bài hát
    function add_song() {
        let error = 0,
            nameBox = $("#song_name_add_song").val(),
            singer = $("#song_singer_add_song").val(),
            current_time = new Date(),
            category = $("#song_category_add_song").val(),
            lyric = $("#song_Lyric_add_song").val(),
            target_id,
            target_name;
        try {
            song = $("#song_files_add_song").get(0).files[0].name;
        } catch (error) {
            song = '';
        }
        current_time = current_time.getFullYear() + "-" + current_time.getMonth() + "-" + current_time.getDate() + " " + current_time.getHours() + ":" + current_time.getMinutes() + ":" + current_time.getSeconds();

        $("#myForm").ajaxForm({
            complete: function(xhr) {
                if (nameBox == "" || singer == "" || category == "") {
                    error = 1
                    if (nameBox == "") {
                        $("#Add_Error_Mess").html("Vui lòng nhập tên bài hát");
                        $("#song_name_add_song").css({
                            "border": "1px solid red"
                        })
                        $("#song_name_add_song").focus();
                    } else if (singer == "") {
                        $("#Add_Error_Mess").html("Vui lòng nhập tên ca sỹ");
                        $("#song_singer_add_song").css({
                            "border": "1px solid red"
                        })
                        $("#song_singer_add_song").focus();
                    } else if (category == "") {
                        $("#Add_Error_Mess").html("Vui lòng nhập thể loại nhạc");
                        $("#song_category_add_song").css({
                            "border": "1px solid red"
                        })
                        $("#song_category_add_song").focus();
                    }
                    $("#Add_Error_Mess").css("visibility", "visible");
                } else {
                    if (xhr.responseText) {
                        $i = xhr.responseText.split("\n");
                        $("#Add_Error_Mess").html($i[$i.length - 1]);
                        $("#Add_Error_Mess").css("visibility", "visible");
                        error = 1;
                    } else {
                        $.post("http://localhost:" + location.port + "/admin/songs-api/add-song.php", {
                            name: nameBox,
                            singer: singer,
                            date: current_time,
                            category: category,
                            lyric: lyric,
                            listens: 0,
                            comments: 0,
                            file: song
                        });
                        getData()
                        $('#myModal_AddSong').css("display", "none");
                        // // getData();

                        // // xóa thông tin các ô vừa nhập
                        $("#song_name_add_song").val("");
                        $("#song_singer_add_song").val("");
                        $("#song_category_add_song").val("");
                        $("#song_Lyric_add_song").val("");
                        $("#song_files_add_song").val("");

                        // // hiện thông báo thành công
                        $("#Add_alert").html("Đã thêm thành công")
                        $("#Add_alert").show();
                        $("#Add_alert").delay(2000).slideUp(200, function() {
                            $("#Add_alert").hide(); // ẩn sau 3s
                        });

                    }
                    getData()
                }
                getData()
            },
        });
    }

    // Mở dialog conform xóa bài hát
    function Open_Dialog_Delete(id, name) {
        Delete_form.css("display", "flex");
        target_id = id;
        DeleteSong_name.html(name)
    }

    // Mở dialog edit bài hát
    function Open_Dialog_Edit(id, name, singer, category, lyric) {
        $("#song_id_edit_song").val(id);
        $("#song_name_edit_song").val(name);
        $("#song_singer_edit_song").val(singer);
        $("#song_category_edit_song").val(category);
        $("#song_lyric_edit_song").val(lyric);
        Edit_form.css("display", "flex");

    }
    //Hàm xóa bài hát
    function delete_song() {
        $.post("http://localhost:" + location.port + "/admin/songs-api/delete-song.php", {
            id: target_id
        });
        Delete_form.css("display", "none");
        // $('#myModal_DeleteSong').css("display", "none");
        $("#Add_alert").html("Đã xóa thành công")
        $("#Add_alert").show();
        $("#Add_alert").delay(2000).slideUp(200, function() {
            $("#Add_alert").hide(); // ẩn sau 3s
        });
        getData();
    }
    // hàm sửa thông tin bài hát
    function edit_song() {
        target_id = $("#song_id_edit_song").val();
        nameBox = $("#song_name_edit_song").val();
        singer = $("#song_singer_edit_song").val();
        category = $("#song_category_edit_song").val();
        lyric = $("#song_lyric_edit_song").val();
        console.log(target_id)
        console.log(nameBox)
        console.log(singer)
        console.log(category)
        console.log(lyric)

        if (nameBox == "" || singer == "" || category == "") {
            if (nameBox == "") {
                $("#edit_Error_Mess").html("Vui lòng nhập tên bài hát");
                $("#song_name_edit_song").css({
                    "border": "1px solid red"
                })
                $("#song_name_edit_song").focus();
            } else if (singer == "") {
                $("#edit_Error_Mess").html("Vui lòng nhập tên ca sỹ");
                $("#song_singer_edit_song").css({
                    "border": "1px solid red"
                })
                $("#song_singer_edit_song").focus();
            } else if (category == "") {
                $("#edit_Error_Mess").html("Vui lòng nhập thể loại nhạc");
                $("#song_category_edit_song").css({
                    "border": "1px solid red"
                })
                $("#song_category_edit_song").focus();
            }
            $("#edit_Error_Mess").css("visibility", "visible");
        } else {
            $.post("http://localhost:" + location.port + "/admin/songs-api/update-song.php", {
                id: target_id,
                name: nameBox,
                singer: singer,
                category: category,
                lyric: lyric
            });
            getData();
            $('#myModal_EditSong').css("display", "none");
            // // getData();

            // // xóa thông tin các ô vừa nhập
            $("#song_name_edit_song").val("");
            $("#song_singer_edit_song").val("");
            $("#song_category_edit_song").val("");
            $("#song_lyric_edit_song").val("");

            // // hiện thông báo thành công
            $("#Add_alert").html("Thay đổi thành công")
            $("#Add_alert").show();
            $("#Add_alert").delay(2000).slideUp(200, function() {
                $("#Add_alert").hide(); // ẩn sau 3s
            });
        }
        getData();
    }
</script>


</html>