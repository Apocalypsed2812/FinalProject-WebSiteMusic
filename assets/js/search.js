const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)

const playlist = $('.playlist')
let musicPlay = $('.music__play')

let isHasSongs = false
let isPlaying = false
let isRandom = false
let isRepeat = false
let currentIndex = 0
let songsList = []

// Hàm load bài hát
function loadCurrentSongNew(image, name, singer, path){
    console.log("Path là: ", path)
    let currentSongNew = `<div class="music__play-song">
                            <img src="../assets/images/songs/${image}" alt="" class="music__play-song-img">
                            <div class="music__play-song-des">
                                <p class="music__play-song-title">${name}</p>
                                <p class="music__play-song-singer">${singer}</p>
                            </div>
                        </div>
                        <div class="music__play-control">
                            <div class="control">
                                <div class="btn btn-repeat">
                                <i class="fas fa-redo"></i>
                                </div>
                                <div class="btn btn-prev">
                                <i class="fas fa-step-backward"></i>
                                </div>
                                <div class="btn btn-toggle-play">
                                <i class="fas fa-pause icon-pause"></i>
                                <i class="fa-solid fa-circle-play icon-play"></i>
                                </div>
                                <div class="btn btn-next">
                                <i class="fas fa-step-forward"></i>
                                </div>
                                <div class="btn btn-random">
                                <i class="fas fa-random"></i>
                                </div>
                            </div>

                            <input id="progress" class="progress" type="range" value="0" step="1" min="0" max="100" />

                            <audio id="audio" src="${path}"></audio>
                        </div>
                        <div class="music__play-add">
                            <i class="fa-regular fa-circle-dot hide-on-tablet"></i>
                            <i class="fa-solid fa-microscope hide-on-tablet"></i>
                            <i class="fa-brands fa-microsoft"></i>
                            <div>
                                <i class="fa-solid fa-volume-high"></i>
                                <input id="volume" class="volume" type="range" value="0" step="1" min="0" max="100" />
                            </div>
                            <div class="music__play-add--separate hide-on-tablet"></div>
                            <i class="fa-solid fa-music hide-on-tablet"></i>
                        </div>`
    return currentSongNew 
}


function getSongs(){
    const songnew = $$('.container__song-new')
    songnew.forEach(item => {
        let image = item.getAttribute("data-image")
        let name = item.getAttribute("data-name")
        let singer = item.getAttribute("data-singer")
        let file = item.getAttribute("data-file")
        let index = item.getAttribute("data-index")
        let id = item.getAttribute("data-id")

        songsList.push({
            index,
            id,
            name,
            singer,
            file,
            image,
        })
    })
}

function handleEvents(){
    // Khi click vào bài hát
    const songnew = $$('.container__song-new')
    songnew.forEach(item => {
        item.onclick = function(){
            let image = item.getAttribute("data-image")
            let name = item.getAttribute("data-name")
            let singer = item.getAttribute("data-singer")
            let file = item.getAttribute("data-file")

            path = "../assets/audio/" + file

            if(!musicPlay.classList.contains('playing')){
                musicPlay.classList.add('playing')
            }

            let currentSongNew = loadCurrentSongNew(image, name, singer, path)
    
            musicPlay.innerHTML = currentSongNew
            musicPlay.style.display = 'flex'
            $('.header').style.minHeight = 'calc(100% - 90px)'
            const audio = $('#audio')
            // audio.play()

            //Xử lý khi click play
            const playBtn = $('.btn-toggle-play')
            if(playBtn){
                //Khi click vào nút play
                playBtn.onclick = function(){
                    console.log("Click")
                    if(isPlaying){
                        audio.pause()
                    }
                    else{
                        audio.play()
                    }
                }

                //Khi song được play
                audio.onplay = function(){
                    console.log("Onplay")
                    isPlaying = true
                    musicPlay.classList.add('playing')
                }

                //Khi song được play
                audio.onpause = function(){
                    console.log("Onpause")
                    isPlaying = false
                    musicPlay.classList.remove('playing')
                }

                //Khi tiến độ bài hát thay đổi
                const progress = $('#progress')
                audio.ontimeupdate = function(){
                    if(audio.duration){
                        const progressPercent = Math.floor(audio.currentTime / audio.duration * 100)
                        progress.value = progressPercent
                    }
                }

                //Xử lý khi tua song
                progress.onchange = function(e){
                    const seekTime = audio.duration / 100 * e.target.value
                    audio.currentTime = seekTime
                }

                //Khi next song
                const nextBtn = $('.btn-next')
                nextBtn.onclick = function(){
                    // console.log("Da click vao next")
                    if(isRandom){
                        playRandomSong()
                    }
                    else{
                        console.log("Da vao")
                        nextSong()
                    }
                    audio.play()
                    // render()
                    //_this.scrollToActiveSong()
                }

                //Khi prev song
                const prevBtn = $('.btn-prev')
                prevBtn.onclick = function(){
                    // console.log("Da click vao prev")
                    if(isRandom){
                        playRandomSong()
                    }
                    else{
                        prevSong()
                    }
                    audio.play()
                    // render()
                    //_this.scrollToActiveSong()
                }

                //Khi random bài hát
                const randomBtn = $('.btn-random')
                randomBtn.onclick = function(){
                    isRandom = !isRandom
                    randomBtn.classList.toggle('active', isRandom)
                }

                //Xử lý next song khi audio ended
                audio.onended = function(){
                    if(isRepeat){
                        audio.play()
                    }
                    else{
                        nextBtn.click()
                    }
                }

                //Xử lý repeat song
                const repeatBtn = $('.btn-repeat')
                repeatBtn.onclick = function(){
                    isRepeat= !isRepeat
                    repeatBtn.classList.toggle('active', isRepeat)
                }

                //Lắng nghe hành vi click vào playlist 
                playlist.onclick = function(e){
                    const songNode = e.target.closest('.container__song-new')
                    if(songNode){
                        currentIndex = Number(songNode.dataset.index)
                        updateListenSong(songNode.dataset.id)
                        loadCurrentSong()
                        audio.play() 
                    }
                }
            }
        }
    });
}

//Hàm xử lý next song
function nextSong(){
    currentIndex++
    if(currentIndex >= songsList.length){
        currentIndex = 0
    }
    loadCurrentSong()
}

//Hàm xử lý previous song
function prevSong(){
    currentIndex--
    if(currentIndex < 0){
        currentIndex = songsList.length - 1
    }
    loadCurrentSong()
}

//Hàm xử lý chọn nhạc random
function playRandomSong(){
    let newIndex
    do{
        newIndex = Math.floor(Math.random() * songsList.length)
    }while(newIndex === currentIndex)
    currentIndex = newIndex
    loadCurrentSong()
}

//Hàm load ra bài hát hiện tại (khi next hoặc prev)
function loadCurrentSong(){
    let currentSong =  songsList[currentIndex]
    $('.music__play-song-img').src = `../assets/images/songs/${currentSong.image}`
    $('.music__play-song-title').textContent = `${currentSong.name}`
    $('.music__play-song-singer').textContent = `${currentSong.singer}`
    $('#audio').src = `../assets/audio/${currentSong.file}`
}

async function updateListenSong(id){
    await fetch("http://localhost:" + location.port + "/admin/songs-api/update-listen-song.php",{
        method: 'POST',
        headers:{
            'Content-Type':'application/x-www-form-urlencoded'
        },
        body: 'id=' + id,
    })
    .then(res => res.json())
    .then(json => {
        console.log(json)
    })
}

getSongs()
// console.log(songsList)
handleEvents()