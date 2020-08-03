<template>

<div class='main'>
    <div class="mar"></div>
    <div class="content">
        <div class="poster"><img src="@/assets/sofa2.jpg"/></div>
        <div class="main_body">
            <div class="body_head">
                <router-link class="log fs" @click.native="test" to="/logOrreg/login" tag="span">登录</router-link>
                <router-link class="reg fs" @click.native="test1"  to="/logOrreg/register" tag="span">注册</router-link>
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
    
},
data() {
return {
    email:'',
    username:'',
    password:'',
    verify:''
}
},

methods: {
   
    test(){
        document.querySelector('.log').className='log fs active'
        document.querySelector('.reg').className='reg fs'       
    },
    test1(){
        document.querySelector('.reg').className='reg fs active'
        document.querySelector('.log').className='log fs'
    }
},
mounted(){
    
},

}
</script>
<style scoped>
/* .main{width: 100%;height: 100%;display: flex;justify-content: center;align-items: center;} */
.mar{height: 150px;}
.content{display: flex;width: 80%;}
.poster{flex: 2;height: 500px;}
.poster>img{height: 500px;width: 100%;}
.main_body{width: 400px;height: 500px;border:1px solid black;background-color: white;flex:1;}
.body_head{height: 50px;display: flex;justify-content: center;}
.logOrreg{width: 100%;}
.fs{font-size: 40px;}
.active{color:#FF6700}
</style>