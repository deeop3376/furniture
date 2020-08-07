<template>

<div class='loginReg'>
    <tou/>

    <div class="content">

        <div class="main_body">
            <div class="body_head">
                <router-link :class="{ 'active':isLogin===true,'log fs':true}" @click.native="test" to="/logOrreg/login" tag="span">登录</router-link>
                <router-link :class="{ 'reg fs':true,'active':isLogin===false}" @click.native="test1"  to="/logOrreg/register" tag="span">注册</router-link>
            </div>
            <div class="logOrreg">
                <router-view />
            </div>
        </div>
    </div>
</div>

</template>
<script>
import tou from '@/components/header'
import sort from '@/components/sort'
export default {
name:'lorOrreg',
components: {
    tou
},
data() {
return {
    email:'',
    username:'',
    password:'',
    verify:'',
    isLogin:true
}
},

methods: {
   
    test(){
        // document.querySelector('.log').className='log fs active'
        // document.querySelector('.reg').className='reg fs' 
        this.isLogin=true      
    },
    test1(){
        // document.querySelector('.reg').className='reg fs active'
        // document.querySelector('.log').className='log fs'
        this.isLogin=false
    }
},
mounted(){
    
},

}
</script>
<style scoped>
/* .main{width: 100%;height: 100%;display: flex;justify-content: center;align-items: center;} */
.loginReg{width: 100%;height:100%;}
.content{width: 100%;height:100%;background: linear-gradient(to right bottom ,#272E43, #FF6700)}

.main_body{width: 400px;height: 400px;background-color: white;
position: relative;top:50%;left:50%;transform: translate(-50%,-50%)}
.body_head{height: 50px;background-color: #FF6700;text-align: center;}

.logOrreg{width: 100%;}
.fs{font-size: 40px;cursor:pointer;border-radius:5px;color:white}
.active{background-color: white;color: #FF6700;}
</style>