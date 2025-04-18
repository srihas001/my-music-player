async function getsongs() {
    // step1:
    // we can also create an public API and push our songs into it and follow the below procedure
    // let a= await fetch("http://127.0.0.1:3002/songs/")
    // console.log(a);
    // let response= await a.text()
    // console.log(response)
    // let div=document.createElement("div")
    // div.innerHTML=response
    //  let tds=div.getElementsByTagName("a")
    
    //  for (let index = 0; index < tds.length; index++) {
    //     const element = tds[index];
    //     if(element.href.endsWith(".mp3")){
    //         songs.push(element.href.split("/songs/")[1]) 
    //         }
    //     }

    // step2:
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

let songs;
let sri21;
let currentsong = new Audio();

function formatSeconds(seconds) {
    const totalSeconds = Math.round(seconds);
    const minutes = Math.floor(totalSeconds / 60);
    const remainingSeconds = totalSeconds % 60;
    const formattedSeconds = String(remainingSeconds).padStart(2, '0');
    return `${minutes}:${formattedSeconds}`;
}

async function main() {
    sri21 = document.querySelector("#sri21 img");

    const playback = (track) => {
        currentsong.src = `songs/${track}`;
        currentsong.load();

        document.querySelector(".srihas80").innerHTML = track;
        document.querySelector(".srihas81").innerHTML = "00:00/00:00";

        const playNow = () => {
            currentsong.play();
            sri21.src = "images/pause.png";
            currentsong.removeEventListener("canplaythrough", playNow);
        };

        currentsong.addEventListener("canplaythrough", playNow);
    }

    songs = await getsongs();
    let t = document.querySelector(".sri5").getElementsByTagName("ul")[0];
    for (const song of songs) {
        t.innerHTML += `
            <li>
                <div class="sri10">
                    <img src="images/musical-note.png" alt="">
                    <span class="sri12">${song}</span>
                    <span class="sri11">Play now</span>
                    <img src="images/play.png" alt="">
                </div>
            </li>`;
    }

    Array.from(document.querySelector(".sri5").getElementsByTagName("li")).forEach(e => {
        e.addEventListener("click", () => {
            playback(e.querySelector(".sri12").innerHTML.trim());
        });
    });

    sri21.parentElement.addEventListener("click", () => {
        if (currentsong.paused) {
            currentsong.play();
            sri21.src = "images/pause.png";
        } else {
            currentsong.pause();
            sri21.src = "images/play-button.png";
        }
    });

    currentsong.addEventListener("timeupdate", () => {
        let p = currentsong.currentTime;
        let q = currentsong.duration;
        document.querySelector(".srihas81").innerHTML = `${formatSeconds(p)}/${formatSeconds(q)}`;
        document.querySelector(".srihas56").style.left = (p / q) * 100 + "%";
    });

    document.querySelector(".sri6").addEventListener("click", e => {
        let pr = (e.offsetX / e.target.getBoundingClientRect().width) * 100;
        document.querySelector(".srihas56").style.left = pr + "%";
        currentsong.currentTime = (currentsong.duration * pr) / 100;
    });

    let sri22 = document.querySelector("#sri22 img");
    sri22.parentElement.addEventListener("click", () => {
        let index = songs.indexOf(currentsong.src.split("/").pop());
        if ((index + 1) < songs.length) playback(songs[index + 1]);
    });

    let sri20 = document.querySelector("#sri20 img");
    sri20.parentElement.addEventListener("click", () => {
        let index = songs.indexOf(currentsong.src.split("/").pop());
        if ((index - 1) >= 0) playback(songs[index - 1]);
    });

    document.querySelector(".humburger").addEventListener("click", () => {
        document.querySelector(".left").style.left = 0;
    });

    document.querySelector(".close").addEventListener("click", () => {
        document.querySelector(".left").style.left = "-100%";
    });

    document.querySelector(".range").addEventListener("change", (e) => {
        currentsong.volume = parseInt(e.target.value) / 100;
    });

    let y = document.getElementsByClassName("sri2");
    for (let index = 0; index < y.length; index++) {
        y[index].addEventListener("click", () => {
            playback(songs[index]);
        });
    }
}

main();
