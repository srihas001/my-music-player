async function getsongs() {
let a= await fetch("http://127.0.0.1:3000/learn3/learn4/website/learn6/srihas/spotify/songs/")
console.log(a);

let response= await a.text()
console.log(response)
let div=document.createElement("div")
div.innerHTML=response

 let tds=div.getElementsByTagName("a")
 let songs=[]
 for (let index = 0; index < tds.length; index++) {
    const element = tds[index];
    if(element.href.endsWith(".mp3")){
        songs.push(element.href.split("/songs/")[1])
        
            
        }

    }
    return songs
 }



async function main(){
let songslist= await getsongs()
console.log(songslist);
let t=document.getElementById("sri5")
console.log(t)
let count=0
        for (const  song of songslist) {
            
            console.log(`<li>${song.replace(" %20 ", " ")}<li/>`);
            
            t.innerHTML=t.innerHTML+`<li>${song.replace(" %20 ", " ")}<li/>`;
            count++;


        }
        console.log(count)
var audio = new Audio(songslist[1]);
audio.play(); 
    
    audio.addEventListener("dataloaded",() => {
        
    }
    )
   

}

main()

