var songs = ["Ăn năn","Xin má rước dâu","Tấm lòng son", "Gõ cửa", "Bằng lăng tím mong chờ", "Cậu ba", "Buồn làm chi em ơi", "Phận tơ tằm", "Nỗi buồn gác trọ", "Mèo hoang", "Đò sang ngang",
"Mẹ ơi con đã già","Phận đời con gái","Mười năm đợi chờ", "Tình nhân", "Khổ lắm Anh ơi", "Tâm sự tuổi 30", "Mặt mộc", "Bước qua đời nhau", "Em Iu", "Tìm em", "Pass Off", "Em ơi đừng khóc"];

let wraper = document.getElementsByClassName("container__header-with-search");
let inputBox = document.getElementById("search");
let resultBox = document.getElementById("autoBox");
let suggBox = document.getElementById("items");
inputBox.onkeyup = (e) =>{
    let userData = e.target.value;
    let emptyArr = [];
    if(userData){
        emptyArr = songs.filter((data) =>{
            return data.toLocaleLowerCase().startsWith(userData.toLocaleLowerCase());
        });
        emptyArr = emptyArr.map((data) =>{
            return data = '<li><i class="fa-solid fa-magnifying-glass"></i>'+ data +'</li>';
        });
        console.log(emptyArr);
        showSugesstion(emptyArr);
        resultBox.style.display = "block";
        let allList = suggBox.querySelectorAll("li");
        for(let i = 0; i < allList.length; i++){
            allList[i].setAttribute("onclick","select(this)");
        }
    }else{
        resultBox.style.display = "none";
    } 
}

function showSugesstion(list){
    let listData;
    if(!list.length){
        userValue = inputBox.value;
        listData = '<li><i class="fa-solid fa-magnifying-glass"></i>' + userValue + "</li>";
    }else{
        listData = list.join('');
    }
    suggBox.innerHTML = listData;
}

function select(elmt){
    let selectData = elmt.innerText;
    inputBox.value = selectData;
}