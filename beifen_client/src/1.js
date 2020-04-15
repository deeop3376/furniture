
// window.onload=function(){ 
//   document.body.hidden='true'  
// }

// document.onreadystatechange=function(){
    // if(document.readyState==='interactive'){
    //     document.body.hidden='true'
    // }   
//     document.body.hidden='true'
// }


var request=require('request')
var fs=require('fs')
var url='www.adeeplove.me/photo_show.aspx?id=1918'
var url1='http://www.522pcat.com'
request(url, function(error, response, body) {
    if(!error && response.statusCode == 200) {
        // fs.open("1.txt","a",0644,function(e,fd){
        //     if(e) throw e;
        //     fs.write(fd,body,function(e){
        //         if(e) throw e;
        //         fs.closeSync(fd);
        //     })
        // });
        console.log(body)
    }else{
        console.log(error)
        console.log(response.statusCode)
    }
});
