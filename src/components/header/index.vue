<template>
  <div class="main">
    <div class="content">
      <div class="info" @click="toHome">
          <h1>My Furniture</h1>
      </div>
      <div class="login">

        <router-link v-if="!isLogin" to='/logOrreg' tag="a">登录/注册</router-link>
        
        <router-link v-else to='/my' tag="a">我的</router-link>
        
        <span style="font-size:13px;margin-right:3px;cursor:pointer;" v-if="isLogin" @click="logout">退出</span>
        <router-link to='/cart' tag="a">购物车</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: "tou",
  components: {},
  data() {
    return {
      isLogin:false
    };
  },
  computed: {},
  watch: {},
  methods: {
    toHome(){
      this.$router.push('/')
    },
    logout(){
      var self=this
      this.axios.get('api2/user/logout').then((res)=>{
        var status=res.data.status
        if(status===0){
          this.isLogin=false
          window.sessionStorage.removeItem('username')
        window.sessionStorage.removeItem('userId')
        window.localStorage.removeItem('ttoken')
        alert('logout success')
        
        }else{
          console.log('logout failed')
          
        }
      })
    },
 
  },
  activated() {
   
    this.axios.get('/api2/user/getUser').then((res)=>{
      
      var status = res.data.status
      if(status===0){
        this.isLogin=true
        window.sessionStorage.setItem('username',res.data.data.username)
        window.sessionStorage.setItem('userId',res.data.data.userId)
        window.sessionStorage.setItem('email',res.data.data.email)
        
      }else{
        // console.log('getuser failed')
        window.localStorage.removeItem('ttoken')
        window.sessionStorage.removeItem('username')
        window.sessionStorage.removeItem('userId')
        window.sessionStorage.removeItem('email')
      }
    })
  },
  created(){
    
  }
};
</script>
<style scoped>
.content {
  height: 42px;
  background-color:#272E43;
  display: flex;
  justify-content: space-between;
  color: #ababab;
  font-family: 'Microsoft YaHei'
}
.main .content .info{position: relative;left: 100px;cursor: pointer;}
.main .content .login{position: relative;right: 100px;top: 8px;}
.main .content .login a{font-size: 10px;margin-right:10px;margin-top:15px;}
.main .content .login a:link{color: #ababab}
.main .content .login a:visited{color: #ababab}
.main .content .login a:hover{color: white}
.main .content .login a:active{color: white}

</style>