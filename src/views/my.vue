<template>
  <div class="main">
    <!-- <input type="file" value="上传图片" @change="upload" /> -->
    <tou />
     
    <div class="main_body">
     
      <div class="left_body">
          <ul>
              <li class="users">
                <div class="user_info">
                  <img class="user_head" src="@/assets/logo.png"/>
                  <p>this is your name</p>
                  <p>234234223@qq.com</p>  
                </div>  
              </li>   
              <br/>
              <hr/>         
              <router-link to="/my/myOrder" tag="li" class="left_li">订单中心</router-link>
              <router-link to="/my/myLike" tag="li" class="left_li">我的喜欢</router-link>
              <router-link to="/my/myAddress" tag="li" class="left_li">收货地址</router-link>
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
      
    };
  },
  computed: {},
  watch: {},
  methods: {
  
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
.left_body{width: 200px;background-color: white}
.right_body{width: 900px;background-color:white;margin-left: 30px;}
.left_li{height: 50px;cursor: pointer;line-height: 50px;text-align: center;width:200px;color:black;}
.left_li:hover{color:red;}

.user_info{width:100%;margin:0 auto;text-align: center;color:grey;margin-top:20px;}

.user_head{width: 100px;border:2px solid grey;border-radius: 50px;}
</style>