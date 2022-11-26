
console.log(li);
function openPage(page, elm){
    let ul = document.getElementById("tag");
    let li = ul.getElementsByTagName("li");
    for(j = 0; j < li.length; j++){
        li[j].style.borderBottom = "none";
    }
    let tags = document.getElementsByClassName("tag");
    for (i = 0; i < tags.length; i++) {
        tags[i].style.display = "none";
    }

    elm.style.borderBottom = "1px solid red";
    document.getElementById(page).style.display = 'flex';
}

function openAll(elm){
    let ul = document.getElementById("tag");
    let li = ul.getElementsByTagName("li");
    for(j = 0; j < li.length; j++){
        li[j].style.borderBottom = "none";
    }
    let tags = document.getElementsByClassName("tag");
    for (i = 0; i < tags.length; i++) {
        tags[i].style.display = "flex";
    }

    elm.style.borderBottom = "1px solid red";
}
