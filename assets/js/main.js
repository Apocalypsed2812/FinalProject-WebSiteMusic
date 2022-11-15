const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)

// Toast message
const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
        toast.addEventListener("mouseenter", Swal.stopTimer);
        toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
});

function formatNumber(number){
    let num = format_number(number)
    num = num + '.000'
    return num
}

function format_number(num) {
    let dollarUSLocale = Intl.NumberFormat("en-US");
    let number = dollarUSLocale.format(parseInt(num));
    return number;
}

function showSuccessToast(message){
    Swal.fire({
        icon: "success",
        title: "Oops...",
        text: message,
    });
}

function showErrorToast(message){
    Swal.fire({
        icon: "error",
        title: "Oops...",
        text: message,
    });
}

const playlist = $('.playlist')

const app = {
    currentIndex: 0,
    isPlaying: false,
    isRandom: false,
    isRepeat: false,
    songs: [
        {
        name: "Nevada",
        singer: "Vicetone x Cozi Zuehlsdorff",
        path: "../assets/audio/Nevada.mp3",
        image: "https://photo-resize-zmp3.zmdcdn.me/w240_r1x1_webp/cover/2/3/1/1/2311971204a1e383f86c97706a8ecda9.jpeg"
        },
        {
        name: "Spectre",
        singer: "Alan Walker",
        path: "../assets/audio/Spectre.mp3",
        image: "https://photo-resize-zmp3.zmdcdn.me/w240_r1x1_webp/avatars/c/0/c0158a5d0afdbb8b3d177162b9328a7c_1452770729.jpg"
        },
        {
        name: "Tấm Lòng Son",
        singer: "H-Kray",
        path: "../assets/audio/tamlongson.mp3",
        image: "https://photo-resize-zmp3.zmdcdn.me/w240_r1x1_webp/avatars/4/4/a/3/44a3c842f37a65ef4c5f14d0eb36da70.jpg"
        },
        {
        name: "Có Trăng Quên Đèn",
        singer: "H-Kray",
        path: "../assets/audio/cotrangquenden.mp3",
        image: "https://photo-resize-zmp3.zmdcdn.me/w240_r1x1_webp/cover/e/0/b/d/e0bd1a1045fb7d3f516a2db8a4ff6dd6.jpg"
        },
        {
        name: "Thuyền Quyên",
        singer: "Diệu Kiên",
        path: "../assets/audio/thuyenquyen.mp3",
        image: "https://photo-resize-zmp3.zmdcdn.me/w240_r1x1_webp/cover/2/e/c/5/2ec51983dbff681cc3cb7af20b4c7ad2.jpg"
        },
        {
        name: "Ánh Sao Và Bầu Trời",
        singer: "T.R.I x Cá",
        path: "../assets/audio/anhsaovabautroi.mp3",
        image:
            "https://photo-resize-zmp3.zmdcdn.me/w240_r1x1_webp/cover/e/2/5/b/e25b4db6440e1b062562836b9d687418.jpg"
        },
        {
        name: "Xin Má Rước Dâu (EDM)",
        singer: "Diệu Kiên",
        path: "../assets/audio/xinmaruocdauedm.mp3",
        image:
            "https://photo-resize-zmp3.zmdcdn.me/w240_r1x1_webp/cover/c/4/4/c/c44c3822217d8775780358df759f126d.jpg"
        },
        {
        name: "Bạn Tình Ơi",
        singer: "Yuniboo x Goctoi Mixer",
        path:
            "../assets/audio/bantinhoi.mp3",
        image:
            "https://photo-resize-zmp3.zmdcdn.me/w240_r1x1_webp/cover/c/0/c/b/c0cbcf26e675d698dc2446ed6d48a2b6.jpg"
        },
        {
        name: "Bạn Tình Ơi 2",
        singer: "Yuniboo x Goctoi Mixer",
        path:
            "../assets/audio/bantinhoi2.mp3",
        image:
            "https://photo-resize-zmp3.zmdcdn.me/w240_r1x1_webp/cover/c/0/c/b/c0cbcf26e675d698dc2446ed6d48a2b6.jpg"
        },
        {
        name: "Một Bước Yêu Vạn Dặm Đau (Piano Version)",
        singer: "Raftaar x Harjas",
        path: "../assets/audio/motbuocyeuvandamdaupiano.mp3",
        image:
            "https://photo-resize-zmp3.zmdcdn.me/w240_r1x1_webp/cover/4/d/6/2/4d62b014dddf2702af85e1d14d5c0a0b.jpg"
        }
    ],

    render: function(){
        const htmls = this.songs.map((song, index) => {
            return `<div class="col l-4 m-6 c-12">
                        <div class="container__song-new" data-image="${song.image}" data-name="${song.name}" data-singer="${song.singer}" data-path="${song.path}">
                            <img src="${song.image}" alt="" class="container__song-new-img">
                            <div class="container__song-info">
                                <p class="container__song-new-title">${song.name}</p>
                                <p class="container__song-new-description">${song.singer}</p>
                                <P class="container__song-new-ago">1 ngày trước</P>
                            </div>
                            <div class="container__song-new-click">
                                <i class="fa-solid fa-circle-play"></i>
                            </div>
                            <div class="container__song-new-dot">
                                <i class="fa-solid fa-ellipsis"></i>
                            </div>
                        </div>
                    </div>`
        })
        
        playlist.innerHTML = htmls.join('')
    },

    defineProperties: function(){
        Object.defineProperty(this, 'currentSong', {
            get: function(){
                return this.songs[this.currentIndex]
            }
        })
    },

    handleEvents: function(){
        const _this = this

        // Khi click vào bài hát
        const songnew = $$('.container__song-new')
        songnew.forEach(item => {
            item.onclick = function(){
                let image = item.getAttribute("data-image")
                let name = item.getAttribute("data-name")
                let singer = item.getAttribute("data-singer")
                let path = item.getAttribute("data-path")

                let musicPlay = $('.music__play')
                if(!musicPlay.classList.contains('playing')){
                    musicPlay.classList.add('playing')
                }

                let currentSongNew = `<div class="music__play-song">
                        <img src="${image}" alt="" class="music__play-song-img">
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
        
                musicPlay.innerHTML = currentSongNew
                musicPlay.style.display = 'flex'
                $('.header').style.minHeight = 'calc(100% - 90px)'
                const audio = $('#audio')
                audio.play()

                //Xử lý khi click play
                const playBtn = $('.btn-toggle-play')
                if(playBtn){
                    //Khi click vào nút play
                    playBtn.onclick = function(){
                        console.log("Click")
                        if(_this.isPlaying){
                            audio.pause()
                        }
                        else{
                            audio.play()
                        }
                    }

                    //Khi song được play
                    audio.onplay = function(){
                        _this.isPlaying = true
                        musicPlay.classList.add('playing')
                        // cdThumAnimate.play()
                    }

                    //Khi song được play
                    audio.onpause = function(){
                        _this.isPlaying = false
                        musicPlay.classList.remove('playing')
                        // cdThumAnimate.pause()
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
                        console.log("Da click vao next")
                        if(_this.isRandom){
                            _this.playRandomSong()
                        }
                        else{
                            console.log("Da vao")
                            _this.nextSong()
                        }
                        audio.play()
                        _this.render()
                        //_this.scrollToActiveSong()
                    }

                    //Khi prev song
                    const prevBtn = $('.btn-prev')
                    prevBtn.onclick = function(){
                        console.log("Da click vao prev")
                        if(_this.isRandom){
                            _this.playRandomSong()
                        }
                        else{
                            _this.prevSong()
                        }
                        audio.play()
                        _this.render()
                        //_this.scrollToActiveSong()
                    }

                    //Khi random bài hát
                    const randomBtn = $('.btn-random')
                    randomBtn.onclick = function(){
                        _this.isRandom = !_this.isRandom
                        randomBtn.classList.toggle('active', _this.isRandom)
                    }

                    //Xử lý next song khi audio ended
                    audio.onended = function(){
                        if(_this.isRepeat){
                            audio.play()
                        }
                        else{
                            nextBtn.click()
                        }
                    }

                    //Xử lý repeat song
                    const repeatBtn = $('.btn-repeat')
                    repeatBtn.onclick = function(){
                        _this.isRepeat= !_this.isRepeat
                        repeatBtn.classList.toggle('active', _this.isRepeat)
                    }
                }
            }

        });
    },

    //Hàm xử lý next song
    nextSong: function(){
        this.currentIndex++
        if(this.currentIndex >= this.songs.length){
            this.currentIndex = 0
        }
        this.loadCurrentSong()
    },

    //Hàm xử lý previous song
    prevSong: function(){
        this.currentIndex--
        if(this.currentIndex < 0){
            this.currentIndex = this.songs.length - 1
        }
        this.loadCurrentSong()
    },

    //Hàm xử lý chọn nhạc random
    playRandomSong: function(){
        let newIndex
        do{
            newIndex = Math.floor(Math.random() * this.songs.length)
        }while(newIndex === this.currentIndex)
        this.currentIndex = newIndex
        this.loadCurrentSong()
    },

    //Hàm load ra bài hát hiện tại (khi next hoặc prev)
    loadCurrentSong: function(){
        $('.music__play-song-img').src = `${this.currentSong.image}`
        $('.music__play-song-title').textContent = this.currentSong.name
        $('.music__play-song-singer').textContent = this.currentSong.singer
        $('#audio').src = this.currentSong.path
    },

    start: function(){
        // //Định nghĩa thuộc tính cho object
        this.defineProperties()

        //Lắng nghe / xử lý sự kiên (DOM events)
        
        //Render playlist
        this.render()
        this.handleEvents()

    }
}

app.start()


