var http = require('http');
var fs = require('fs');
var server = http.createServer();
server.listen(9001, function(){     
    console.log('服务器正在端口号：9001上运行......');
})
server.on('request',function(request,response){
    var url = request.url;
    if(url ==='/'){
        response.writeHead(200,{'Content-Type':'text/html'})
        fs.readFile('./practice/login.html','utf-8',function(err,data){
            if(err){
                throw err ;
            }
            response.end(data);
        });
    }
})