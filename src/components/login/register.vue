<template>

<div class='main'>
    <div class="content">
        <div class="reg_body">
            
            <input type="text" v-model="username" placeholder="用户名"><br />
            <input type="password" v-model="password" placeholder="密码"><br />
            <input type="mail" v-model="email" placeholder="邮箱"><br/>
            
            <input type="text" v-model="verify" placeholder="验证码"><br/>
            <input type="button" @click="getVerify" value="获取验证码">
            <input type="button" @click="toRegister" value="注册">
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
    password:'',
    verify:''
}
},

methods: {
    getVerify(){
        this.axios.get('/api2/user/verify?email='+this.email).then((res)=>{
            var status=res.data.status
            if(status===0){
                alert('发送验证码成功')
            }else{
                alert(res.data.msg)
            }
        })
    },
    toRegister(){
        this.axios.post('/api2/user/register',{
            email:this.email,
            username:this.username,
            password:this.password,
            verify:this.verify
        }).then((res)=>{
            var status=res.data.status
            if(status===0){
                
                this.$router.push('/')
            }else{
                console.log(res.data.msg)
            }
        })
    },
  
},
}
</script>
<style scoped>
.content{width: 100%;}
.reg_body{width: 300px;margin:0 auto;}
input{width: 300px;height: 40px;margin-top:10px;}
input[type='button']{background-color: #FF6700;border:0;}
</style>