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