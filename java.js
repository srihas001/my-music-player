async function getsongs() {
    // List all your songs here
    let songs = [
        "A-Thousand-Years.mp3",
        "Baitikochi-Chuste.mp3",
        "Blue-Yung-Kai.mp3",
        "Chitti.mp3",
        "Hoyna-Hoyna.mp3",
        "Kola-Kalle-Ila.mp3",
        "My-Heart-Will-Go-On.mp3",
        "Perfect-(Mr-Jat.in).mp3",
        "Praanam.mp3",
        "Rao-Gari-Abbayi.mp3"
    ];
    return songs;
}

let currentsong = new Audio();

function formatSeconds(seconds) {
    const totalSeconds = Math.round(seconds);
    const minutes = Math.floor(totalSeconds / 60);
    const remainingSeconds = totalSeconds % 60;
    const formattedSeconds = String(remainingSeconds).padStart(2, '0');
    return ${minutes}:${formattedSeconds};
}

async function main() {
    const playback = (track) => {
        currentsong.src = ./songs/${track};
        currentsong.play();
        sri21.src = "images/pause.png";
        document.querySelector(".srihas80").innerHTML = track;
        document.querySelector(".srihas81").innerHTML = "00:00 / 00:00";
    };

    let songs = await getsongs();
    let playlist = document.querySelector(".sri5 ul");

    for (const song of songs) {
        playlist.innerHTML += `<li>
            <div class="sri10">
                <img src="images/musical-note.png" alt="">
                <span class="sri12">${song}</span>
                <span class="sri11">Play now</span>
                <img src="images/play.png" alt="">
            </div>
        </li>`;
    }

    Array.from(document.querySelector(".sri5").getElementsByTagName("li")).forEach((e) => {
        e.addEventListener("click", () => {
            playback(e.querySelector(".sri12").innerHTML.trim());
        });
    });

    let sri21 = document.querySelector("#sri21");
    sri21.addEventListener("click", () => {
        if (currentsong.paused) {
            currentsong.play();
            sri21.src = "images/pause.png";
        } else {
            currentsong.pause();
            sri21.src = "images/play-button.png";
        }
    });

    currentsong.addEventListener("timeupdate", () => {
        let currentTime = currentsong.currentTime;
        let duration = currentsong.duration;
        document.querySelector(".srihas81").innerHTML = ${formatSeconds(currentTime)} / ${formatSeconds(duration)};
        document.querySelector(".srihas56").style.width = (currentTime / duration) * 100 + "%";
    });

    document.querySelector(".range").addEventListener("input", (e) => {
        currentsong.volume = parseInt(e.target.value) / 100;
    });

    let sri22 = document.querySelector("#sri22");
    sri22.addEventListener("click", () => {
        let index = songs.indexOf(currentsong.src.split("/").slice(-1)[0]);
        if (index + 1 < songs.length) playback(songs[index + 1]);
    });

    let sri20 = document.querySelector("#sri20");
    sri20.addEventListener("click", () => {
        let index = songs.indexOf(currentsong.src.split("/").slice(-1)[0]);
        if (index - 1 >= 0) playback(songs[index - 1]);
    });

    document.querySelector(".humburger").addEventListener("click", () => {
        document.querySelector(".left").style.left = "0";
    });

    document.querySelector(".close").addEventListener("click", () => {
        document.querySelector(".left").style.left = "-100%";
    });
}

main();
