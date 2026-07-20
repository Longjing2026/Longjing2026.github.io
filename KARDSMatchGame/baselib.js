const isweb=(typeof process == 'undefined' || process.versions == null || process.versions.node == null);

if(!isweb){
    const fs=require('fs');
}

const readFileSync=isweb?function(url){
    var request = new XMLHttpRequest();
    request.open('GET', url, false);
    request.send(null);
    if (request.status === 200) {
        return request.responseText;
    }else{
        return null;
    }
}:function(url){
    return fs.readFileSync(url,'utf-8');
}

const RandInt=(min,max)=>{
    return Math.floor(Math.random()*(max-min+1))+min;
}

const RandInt0=(min,max)=>{
    return Math.floor(Math.random()*(max-min))+min;
}



//来自网络
const isMobile=(/Mobi|Android|iPhone/i.test(navigator.userAgent));

function addLink(url) {
  var link = document.createElement("link");
  link.rel = "stylesheet";
  link.type = "text/css";
  link.href = url;
  document.getElementsByTagName("head")[0].appendChild(link);
}
function addScript(url) {
  var newscript = document.createElement('script');
  newscript.setAttribute('type','text/javascript');
  newscript.setAttribute('src',url);
  var head = document.getElementsByTagName('head')[0];
  head.appendChild(newscript);
}