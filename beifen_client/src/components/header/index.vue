<template>
  <div class="main">
    <div class="content">
      <div class="info">
          <h1>welcome to my store</h1>
      </div>
      <div class="login">

        <router-link v-if="!isLogin" to='/logOrreg' tag="a">登录</router-link>
        
        <router-link  to='/mine' tag="a">我的</router-link>
        
        <button v-if="isLogin" @click="logout">退出</button>
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
    logout(){
      var self=this
      this.axios.get('api2/user/logout').then((res)=>{
        var status=res.data.status
        if(status===0){
          this.isLogin=false
          window.sessionStorage.removeItem('username')
        window.sessionStorage.removeItem('userId')
        }else{
          console.log(status)
          
        }
      })
    },
 
  },
  activated() {
   
    this.axios.get('/api2/user/getUser').then((res)=>{
      console.log('aaaa')
      var status = res.data.status
      if(status===0){
        this.isLogin=true
        window.sessionStorage.setItem('username',res.data.data.username)
        window.sessionStorage.setItem('userId',res.data.data.userId)
        
      }else{
        console.log('getuser failed')
        window.sessionStorage.removeItem('username')
        window.sessionStorage.removeItem('userId')
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
  background-color:darkslategrey;
  display: flex;
  justify-content: space-between;
  color: #ababab;
  font-family: 'Microsoft YaHei'
}
.main .content .info{position: relative;left: 100px;}
.main .content .login{position: relative;right: 100px;top: 8px;}
.main .content .login a{font-size: 10px;margin-right:10px;margin-top:15px;}
.main .content .login a:link{color: #ababab}
.main .content .login a:visited{color: #ababab}
.main .content .login a:hover{color: white}
.main .content .login a:active{color: white}

</style>