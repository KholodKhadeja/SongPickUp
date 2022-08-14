let randomSong=document.querySelector("#rndBtn");
let addSong=document.querySelector("#addBtn");
let songsListDiv=document.querySelector(".songList");
let iframeContainer=document.querySelector(".rightContainer");
let dataSource='https://docs.google.com/spreadsheets/d/1VZdbHiWNYwnCXTTxoUhcAtToloUDa8H8E66fQSmLO6U/gviz/tq?';

let counter=0;
fetch(dataSource).then(response => response.text())
.then(jsonData => {
  let htmlCode=' ';
    let songsData = JSON.parse(jsonData.substr(47).slice(0,-2));
    songsData.table.rows.forEach(element => {
      htmlCode+=`<div  onclick="playSong(${element.c[2].v})" class="listItem">
      <img src="./img/yt.svg" class="songImg">
       <p class="songName">${element.c[1].v}</p>
      </div>`;
      songsListDiv.innerHTML=htmlCode;
    });
    });

function playSong(vidUrl){
  let htmlCodeIntial='';
  let firstPartofUrl='https://www.youtube.com/embed/';
  let urlArr=vidUrl.split("/"); let vidId=urlArr[urlArr.length-1];let fullURL=firstPartofUrl+vidId;
  htmlCodeIntial+=`<iframe width="550" height="350" src="${fullURL}" id="songDisplayIframe"
  title="" frameborder="0"  allowfullscreen></iframe>`;
iframeContainer.innerHTML=htmlCodeIntial;
};

randomSong.addEventListener('click', ()=>{
  fetch(dataSource).then(response => response.text())
  .then(jsonData => {
      let songsData = JSON.parse(jsonData.substr(47).slice(0,-2));
      let theRandom=randomIntFromInterval(0,songsData.table.rows.length);
      playSong(songsData.table.rows[theRandom].c[2].v);
    });
});
function randomIntFromInterval(min, max) { 
  return Math.floor(Math.random() * (max - min + 1) + min)
}



