$(document).ready(function () {
    // Add active cho sidebar
    $(".header__item:nth-child(1)").addClass("header__item--active");
    // Lấy dữ liệu bài hát
    $.get(
        "http://localhost:" + location.port + "/admin/category-api/get-category.php",
        function (data, status) {
            data["data"].forEach((e) => {
                let num = 0;
                $.get(
                    "http://localhost:" + location.port + "/admin/category-api/get-song-num.php", {
                    categoryName: e['name'],
                }, function (data, status) {
                    num = data["data"].length

                    $.post("http://localhost:" + location.port + "/admin/category-api/post-song-num.php",
                        {
                            id: e['id'],
                            num: num
                        });

                },
                    "json"
                );

            });
            getData();
        },
        "json"
    );
    setTimeout(function () { getData() }, 20);
});

function getData() {
    // let Suggestions = "";
    $.get(
        "http://localhost:" + location.port + "/admin/category-api/get-category.php",
        function (data, status) {
            TableBody = [];
            // let EmailValue = '', UsernameValue = '';

            data["data"].forEach((e) => {
                // if (Suggestions.indexOf(e["username"]) == -1) {
                //     Suggestions += e["username"] + ",";
                // }
                TableBody.push(
                    "<tr><td>" + e["id"] +
                    "</td><td>" + e["name"] +
                    "</td><td>" + e["numberOfsong"] +
                    "</td><td>" + e["follow"] +
                    "</td><td>" + e["date"] +
                    "</td><td>" +
                    '<i class="fa-solid fa-eye" onclick="Open_Dialog_View()"></i>' +
                    '<i class="fa-solid fa-trash-can" onclick="Open_Dialog_Delete()"></i>' +
                    '<i class="fa-solid fa-pen-to-square" onclick="Open_Dialog_Edit()"></i>' +
                    "</td></tr>"
                );
                // EmailValue += e["email"] + ",";
                // UsernameValue += e["username"] + ",";
            });
            // let endNum = current_tablePage * 5,
            //     beginNum = endNum - 5,
            //     tableDisplay = "",
            //     pageAmount = Math.ceil(data["data"].length / 5),
            //     Table_NumHtml = "",
            //     active;
            // console.log(endNum)
            // console.log(beginNum)
            // console.log(pageAmount)

            // for (let j = 1; j <= pageAmount; j++) {
            //     active = j == current_tablePage ?
            //         "admin__song-pagination-link--active" : "";
            //     Table_NumHtml +=
            //         '<li class="admin__song-pagination-item" onclick="Pagination_click($(this),`Main`)">' +
            //         '<a class="admin__song-pagination-link ' +
            //         active +
            //         '">' +
            //         j +
            //         "</a></li>";
            //     // onclick="Pagination_click($(this),`Main`)"
            // }
            // $("#UserTable_pagination").html(Table_NumHtml);
            // for (let i = beginNum; i < endNum; i++) {
            //     tableDisplay += TableBody[i];
            // }
            $("#table-body").html(TableBody);
            // $("#Email_value").html(EmailValue);
            // $("#Username_value").html(UsernameValue);
            // $("#UserSearch_value").html(Suggestions);

        },
        "json"
    );
}
