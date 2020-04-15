<template>
<div class='main'>
    <div class="login_body">
        <input type="text" v-model="username" placeholder="用户名"><br />
        <input type="password" v-model="password" placeholder="密码"><br />
        <input type="text" v-model="imgVerify" placeholder="验证码"><br />
        <input type="button" class="login_btn" @click="toLogin" value="登录"/>

    </div>
    <a href="#" @click="refreshImg">
        <img src="/api2/user/getVerifyImg" ref="imgCode">
    </a>
</div>
</template>

<script>

export default {
name:'',
components: {},
data() {
return {
    username:'',
    password:'',
    imgVerify:''
}
},
computed: {},
watch: {},
methods: {
    refreshImg(){
        this.$refs.imgCode.src='/api2/user/getVerifyImg?d='+Math.random()
    },
   toLogin(){
       this.axios.post('/api2/user/login',{
           username:this.username,
           password:this.password,
           imgVerify:this.imgVerify
       }).then((res)=>{
           var status=res.data.status
           if(status===0){
               this.$router.push('/')
           }else{
               alert(res.data.msg)
           }
       })
   }
},

}
</script>
<style scoped>
.main{width: 100%;}
.login_body{width: 300px;margin:0 auto;}
input{width: 300px;height: 40px;margin-top: 10px;}
.login_btn{margin-top:30px;width: 300px;height: 40px;background-color: #FF6700;border:0;}
</style>