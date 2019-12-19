let departuretime = 1
let rapnumber = 1
let nowstation = 0
let section=["","",""]
let target=[60*1000,0,0,0,0,0,0,0]
let par=[0,0,0,0,0,0,0,0]
let name=["あなた","さぶろう","とりすけ","もりもり","ことわざ","誰かさん","名前募集中","よろしく"]
let player=[
    {id:"1",name:"<span class='red'>あなた</span>",target:0,par:0},
    {id:"2",name:"ジロー",target:0,par:0},
    {id:"3",name:"とりすけ",target:0,par:0},
    {id:"4",name:"たんこぶ",target:0,par:0},
    {id:"5",name:"ぶんた",target:0,par:0},
    {id:"6",name:"こんにちのすけ",target:0,par:0},
    {id:"7",name:"誰か",target:0,par:0},
    {id:"8",name:"名前募集中",target:0,par:0}
]
function timer(){
    if(document.getElementById("time").value<1){
        alert("時間が不正です")
        return
    }
    start = new Date();
    alert("出発します。")
    nowstation = 0
    document.getElementById("form1").style.display = "none";
    document.getElementById("todoname").innerHTML = document.getElementById("todo").value
    rapnumber = document.getElementById("rap").value
    departuretime = parseInt(document.getElementById("time").value * 60) + parseInt(document.getElementById("sec").value)
    section = [document.getElementById("section1").value,document.getElementById("section2").value,document.getElementById("section3").value] 
    target[0] = parseInt(departuretime) * 60 * 1000
    document.getElementById("next").innerHTML=section[nowstation]
    for( let i=1 ; i<8 ; i++){
        player[i].target = ((parseInt(departuretime))+ Math.floor( Math.random() * 60 ) - 35) * 1000
    }
    
    stationtimer = setInterval(timermain, 100);
}
function checkpoint(){
    if(document.getElementById("form1").style.display == "none"){
        nowstation++
        document.getElementById("next").innerHTML=section[nowstation]
        player[0].par=Math.floor(nowstation/rapnumber*100)
    }
}
function timermain(){
    let now = new Date();
    let diftime = (now.getTime() - start.getTime());
    let point = Math.floor(diftime / 100);
    let point2 = Math.floor(point % 10);
    let sec = Math.floor(diftime / 1000);
    let secsec = Math.floor(sec % 60);
    let min = Math.floor(sec / 60);
    let minmin = Math.floor(min % 60);
    let hour = Math.floor(min / 60);
    secsec = addZero(secsec);
    min2 = addZero(minmin);
    hour = addZero(hour);
    document.getElementById("nowtime").innerHTML=""+hour+":"+min2+":"+secsec+"."+point2;
    for( let i=1 ; i<8 ; i++){ 
        player[i].target += (Math.floor( Math.random() * 1000 ) - 450);
        player[i].par = (Math.floor(diftime / player[i].target * 100))
        if (player[i].par > 100){
        }
    }
    let playersort = player.slice().sort(function(a,b){
        if(a.par > b.par) return -1;
        if(a.par < b.par) return 1;
        return 0;
    });
    for (let l=1 ; l<9 ; l++){
        document.getElementById("name"+l).innerHTML=playersort[l-1].name
        document.getElementById("parsent"+l).innerHTML=playersort[l-1].par
        if(document.getElementById("parsent"+l).innerHTML > 100){
            document.getElementById("parsent"+l).innerHTML = 100
        }
    }
    if(nowstation >= rapnumber){
        clearInterval(stationtimer);
        alert("終了です。")
    }
}
function addZero(value) {
    if (value < 10 && value > -1) {
        value = '0' + value;
    }
    return value;
}
new Vue({
    el: '#todoname',
    data: {
        message: 'TaskRacing',
    },
});