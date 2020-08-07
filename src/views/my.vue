<template>
  <div class="main">
    <!-- <input type="file" value="上传图片" @change="upload" /> -->
    <tou />
     
    <div class="main_body">
     
      <div class="left_body">
          <ul>
              <li class="users">
                <div class="user_info">
                  <img class="user_head" src="@/assets/userHead.jpg"/>
                  <p>{{userInfo.username}}</p>
                  <p>{{userInfo.email}}</p>  
                </div>  
              </li>   
              <br/>
              <hr/>         
              <router-link to="/my/myOrder" tag="li"
               :class="{'left_li':true,'active':isOrder===true}"
               >
               我的订单
               </router-link>
              <router-link to="/my/myinfo" tag="li"
                :class="{'left_li':true,'active':user===true}"
                >个人信息
                </router-link>
              <router-link to="/my/myAddress" tag="li" 
               :class="{'left_li':true,'active':shipping===true}"
               >收货地址</router-link>
          </ul>
         
      </div>
      <div class="right_body">
          <router-view />
      </div>
    </div>
  </div>
</template>

<script>
import tou from '@/components/header'
import sort from '@/components/sort'
export default {
  name: "my",
  components: {
    tou,
    sort
  },
  data() {
    return {
      userInfo:{
        username:'',
        email:'',
      },
      isOrder:false,
      user:false,
      shipping:false
    };
  },
  created(){
    this.userInfo.username=window.sessionStorage.getItem('username')
    this.userInfo.email=window.sessionStorage.getItem('email')
    this.isOrder=true
  },
  computed: {},
  watch: {
    $route(){
      if(this.$route.name==='myOrder'){
        this.isOrder=true
        this.user=false
        this.shipping=false
      }else if(this.$route.name==='myInfo'){
        this.isOrder=false
        this.user=true
        this.shipping=false
      }else if(this.$route.name==='myAddress'){
        this.isOrder=false
        this.user=false
        this.shipping=true
      }
    }
  },
  methods: {
    orderClick(){
      this.isOrder=true
      this.user=false
      this.shipping=false
    },
    userClick(){
      this.isOrder=false
      this.user=true
      this.shipping=false
    },
    shippingClick(){
      this.isOrder=false
      this.user=false
      this.shipping=true
    },
    upload(ev){
       var file=ev.target.files[0]
        var param=new window.FormData()
         param.append('file',file,file.name)
      var options={
        headers:{
          'Content-Type':'multipart/form-data'
        }
      }
      this.axios.post('/api2/goods/uploadTest',param,options).then((res)=>{

      })
    }
    
  }
};
</script>
<style scoped>
.main{width: 100%;}
.sort{width:1130px;margin:0 auto;}
.main_body{width: 1130px;min-width:900px;display: flex;margin: 0 auto;margin-top:30px;}
.left_body{width: 200px;background-color: white;height:500px;}
.right_body{width: 900px;background-color:white;margin-left: 30px;min-height: 800px;padding-bottom: 50px;}
.left_li{height: 50px;cursor: pointer;line-height: 50px;text-align: center;width:200px;color:black;}
.left_li:hover{color:red;}

.user_info{width:100%;margin:0 auto;text-align: center;color:grey;margin-top:20px;}
.active{background-color: chocolate;color: white}
.user_head{width: 100px;border:2px solid grey;border-radius: 50px;}
</style>