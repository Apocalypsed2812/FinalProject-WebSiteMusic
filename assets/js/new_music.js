// click vào ellipsis trong bài hát => mở menu
function ellipsisClick(id, lyric) {
    document.querySelectorAll(".Song_dialog").forEach(e => {
        e.style.display = "none"
    });
    document.querySelector("#Song_dialog" + id).style.display = "inline-block";
}
// đóng menu khi click ra ngoài
document.addEventListener('click', function handleClickOutsideBox(event) {
    console.log(event.target.className)
    if (event.target.className != 'fa-solid fa-ellipsis') {
        document.querySelectorAll(".Song_dialog").forEach(e => {
            e.style.display = "none"
        });
    }
});
// mở modal song lyric view
function SongLyricView(lyric) {
    document.getElementById("song_lyric_textarea").innerHTML = lyric
    document.getElementById("myModal_SongLyric").style.display = "block";
}
// đóng modal song lyric view
function closeModel(){
    document.getElementById("myModal_SongLyric").style.display = "none";
}
// tải file
function SongDownload(file){
    console.log(file)
}

