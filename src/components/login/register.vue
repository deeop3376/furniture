<template>

<div class='main'>
    <div class="content">
        <div class="reg_body">
            
            <div class="item">
                <input @blur="checkUserName" type="text" v-model="username" placeholder="用户名" />
            <i v-if="isShow===true&& isUsername===true&&username!=''" class="el-icon-check checkRed"></i>
            <i v-if="isShow&&isUsername===false&&username!=''" class="el-icon-close checkRed"></i>
            <span v-if="checking" class="loading"></span>
            </div>
            
            <input type="password" v-model="password" placeholder="密码"><br />
            <input @blur="checkEmail" type="mail" v-model="email" placeholder="邮箱"><br/>
            
            <input  type="text" v-model="verify" placeholder="验证码"><br/>
            <div v-if="verifySecond!=0">
                <span class="notice">{{verifySecond}}秒后可重新获取验证码</span>
            </div>
            <input :class="{'btnCom':true, 'active':verifySend===true}" type="button" @click="getVerify" value="获取验证码">
            <input class="btnCom" type="button" @click="toRegister" value="注册">
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
    verify:'',
    verifySend:false,
    verifySecond:0,
    isEmail:false,
    isUsername:false,
    checking:false,
    isShow:false
}
},

methods: {
    checkUserName(){
        // this.checking=true
        // this.isUsername=false
        // this.isShow=false
        // setTimeout(()=>{
        //     this.checking=false
        //     this.isUsername=true
        //     this.isShow=true
        // },3000)
    },
    checkEmail(){
        
        let reg=/^\w+@[a-zA-Z0-9]{2,10}(\.[a-z]{2,4}){1,3}$/
        this.isEmail=reg.test(this.email)
    },
    getVerify(){
        if(this.isEmail===true){
            if(this.verifySend===false){
            this.verifySend=true
            this.axios.get('/api2/user/verify?email='+this.email).then((res)=>{
            var status=res.data.status
            if(status===0){
                alert('发送验证码成功')
                this.verifySecond=60
                this.verifySend=true
                let timer=setInterval(()=>{
                    this.verifySecond--
                    if(this.verifySecond===0){
                        clearInterval(timer)
                        this.verifySend=false
                    }
                },1000)
            }else{
                alert(res.data.msg)
                this.verifySend=false
            }
        })
        }
        }else{
            alert('请填写合法的邮箱地址')
        }

    },
    toRegister(){
        if(this.email!='' && this.username!='' && this.verify!=''){
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
                alert(res.data.msg)
            }
        })
        }else{
            alert('请完整填写信息')
        }
    },
  
},
}
</script>
<style scoped>
.content{width: 100%;}
.reg_body{width: 300px;margin:0 auto;}
input{width: 300px;height: 40px;margin-top:10px;}

.btnCom{background-color: #FF6700;border:0;}
.active{cursor:not-allowed;background-color: gray;}
.checkRed{color:red;}
.loading{width:25px;height: 25px;border-radius:50%;border:1px solid grey;
border-top: transparent;border-left: transparent;display: inline-block;animation: loading 1s linear infinite;}
@keyframes loading {
    0%{
        transform: rotate(0deg)
    }
    100%{
        transform: rotate(360deg)
    }
}
.notice{color:grey;}
</style>