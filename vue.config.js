module.exports={
    //服务器会将请求路径为/api2的替换为http://localhost:3000
    devServer : {
        proxy:{
            '/api2':{
                target:'http://localhost:3000',
                changeOrigin:true
            }
        }
    },
	//publicPath:'/myApp/'
}