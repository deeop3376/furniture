<template>
<div class='main'>
    <div class="reg_body">
        <div>
            <input type="mail" placeholder="邮箱" v-model="email">
            
            <span class="verify"></span>
        </div>
        <div>
            <input type="text" placeholder="昵称" v-model="username">
        </div>
        <div>
            <input type="password" placeholder="密码" v-model="pwd">
        </div>
        <div>
            <input type="button" value="发送验证码" @click="sendVerify">
           
        </div>
        <div>
            <input type="text" placeholder="验证码" v-model="verifyCode">
        </div>
        <div>
            <input type="button" value="注册" @click="toRegister">
            <span class="register"></span>
        </div>
    </div>
</div>
</template>

<script>

export default {
name:'',
components: {},
data() {
return {
    email:'',
    username:'',
    pwd:'',
    verifyCode:'',
    isSendVerify:false
}
},
computed: {},
watch: {},
methods: {
    sendVerify(){
        var self= this
        this.axios.get('/api2/user/verify?email='+this.email).then((res)=>{
            var status = res.data.status
            if(status===0){
                
                document.querySelector('.verify').innerText='验证码发送成功'
            }else if(status===-2){
                document.querySelector('.verify').innerText='该邮箱已被注册'
                
            }else{
                document.querySelector('.verify').innerText='验证码发送失败'
                
            }
        })
    },
    toRegister(){
        
        this.axios.post('/api2/user/register',{
            username:this.username,
            email:this.email,
            password:this.pwd,
            verify:this.verifyCode
        }).then((res)=>{
            var status = res.data.status
            if(status===0){
                document.querySelector('.register').innerText='注册成功'
                this.$router.push('/')
            }else if(status===-1){
                document.querySelector('.register').innerText='验证码或邮箱错误'
            }else if(status===-3){
                document.querySelector('.register').innerText='昵称已被占用'
            }
        })
    }
},
beforeRouteEnter(to,from,next){
    next(from.path)
}
}
</script>
<style scoped>

</style>