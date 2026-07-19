const block=(e,f='')=>{
    return `<div ${f} style="display: inline-block;position:relative;width:${100/StageW}%;height:${100/StageH}%"><img class="game-block" draggable="false" src="${e}"></img></div>`;
}

game_box=document.getElementById('game-box')

var s1=[null,null];
var block_num=StageH*StageW;
/*s1=[1,2];
s2=[3,4];*/
var needstart=true;
var isended=false;
var gametime=0
var clockid=null;
var Type=[];
var Audios=[];

function startgame(){
    clockid=setInterval(()=>{
        if(gametime%10==0){
            document.getElementById('clock').innerHTML=`用时:${gametime/10}.0s`;
        }else{
            document.getElementById('clock').innerHTML=`用时:${gametime/10}s`;
        }
        gametime+=1;
    },100);
}

function stopgame(){
    if(clockid!=null){
        clearInterval(clockid);
    }
    let dom=document.getElementById('tips')
    dom.innerHTML='游戏结束,点击此处再来一局。';
    dom.onclick=()=>{
        location.reload();
    }
    isended=true;
}
const disappear_action_normal=function(e){
    var dom=document.getElementById(e).firstChild;
    dom.style+=";transform: scale(0.5);opacity: 0;transition: all 0.3s ease";
}
const disappear_action_sharp=function(e){
    var dom=document.getElementById(e).firstChild;
    dom.style+=";transform: scale(1.2);transition: transform 0.2s ease";
    setTimeout(()=>{
        dom.style+=";transform: scale(0.5);opacity: 0;transition: all 0.3s ease";
    },250)
}

var disappear_action=disappear_action_sharp;
/*
<img class="game-block" draggable="false" src="./res/0.png" style="transition: transform 3s; border-color: black; display: none;">
*/
function clickfunc(i,j){
    if(Type[i][j]==-1){
        return;//误触已消除动物
    }
    /*if(isended){
        return;
    }*/
    if(needstart){
        startgame();
        needstart=false;
    }
    //第一层if  判断第几次选择
    //第二层if  判断异类选择与双击自己
    if(s1[0]==null){
        s1=[i,j];
        document.getElementById(`block-${i}-${j}`).firstChild.style.borderColor='yellow';
    }else{
        if(s1[0]==i&&s1[1]==j){
            return;
        }
        if(Type[s1[0]][s1[1]]==Type[i][j]){
            if(Audios[Type[i][j]]!=null){
                Audios[Type[i][j]].play();
            }
            /*transform: scale(1.5);
            transition: transform 0.3s ease;*/
            disappear_action(`block-${s1[0]}-${s1[1]}`);
            disappear_action(`block-${i}-${j}`);
            /*document.getElementById(`block-${s1[0]}-${s1[1]}`).firstChild.style.display='none';
            document.getElementById(`block-${i}-${j}`).firstChild.style.display='none';*/
            Type[s1[0]][s1[1]]=-1;
            Type[i][j]=-1;
            s1=[null,null];
            block_num-=2;
            if(block_num==0){
                stopgame()
            }
            return;
        }
        document.getElementById('tips').innerText="请选择相同类型的方块";
        //特效？
    }
}
function LoadAudio(){
    for(var i=0;i<TypeNum;i++){
        try{
            Audios.push(new Audio(`./res/${i}${AudioType}`));
            Audios[i].volume=AudioV;
            Audios[i].playbackRate=AudioS;
        }catch{
            Audios.push(null);
            console.log(`类型${i}的音效加载失败。`);
        }
    }
}
function init(){
    if(block_num%2!=0){
        alert('警告：你所使用的自定义方块个数为奇数，无法被完全消除');
    }
    if(block_num<TypeNum*2){
        alert('警告：按照你的设置进行游戏，动物无法一一配对');
    }
    for(var i=0;i<StageH;i++){
        Type.push([]);
        for(var j=0;j<StageW;j++){
            let index=i*StageW+j;
            Type[i].push(Math.floor(index%(TypeNum*2)/2));
        }
    }//对应生成，确保匹配
    for(var i=0;i<block_num-1;i++){//block_num-1很重要
        let c=RandInt0(i+1,block_num);
        [Type[Math.floor(i/StageW)][i%StageW],Type[Math.floor(c/StageW)][c%StageW]]=[Type[Math.floor(c/StageW)][c%StageW],Type[Math.floor(i/StageW)][i%StageW]];
    }//打乱处理
    LoadAudio();
    const ColorEvent=(i,j,c)=>{
        return `if(!(s1[0]==${i}&&s1[1]==${j})){document.getElementById('block-${i}-${j}').firstChild.style.borderColor='${c}'}`;
    }
    for(var i=0;i<StageH;i++){
        for(var j=0;j<StageW;j++){
            game_box.innerHTML+=block(`./res/${Type[i][j]}.png`,f=`id="block-${i}-${j}" onclick="clickfunc(${i},${j})" onmouseover="${ColorEvent(i,j,'white')}" onmouseout="${ColorEvent(i,j,'black')}"`);
            
        }
        game_box.innerHTML+='<br>';
    }
}


init();
//包装成类？
