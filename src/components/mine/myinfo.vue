<template>
<div class='main'>
   <div class="username">
      <span>用户名：</span><span>{{username}}</span>
   </div>
   <div class="email">
      <span>邮箱：{{email}}</span>
   </div>
   <div class="regData">
      <p>您于{{createDate}}注册本网站，如今已经有{{howDays}}天了</p>
      
   </div>
</div>
</template>

<script>

export default {
name:'myinfo',
components: {},
data() {
return {
   username:'',
   userhead:'',
   email:'',
   createDate:'',
   howDays:0
}
},
created() {
   
},
mounted(){
this.axios.get('/api2/user/getUser').then((res)=>{
      let status=res.data.status
      if(status===0){
         this.username=res.data.data.username
         this.userhead=res.data.data.userhead
         this.email=res.data.data.email
         this.createDate=res.data.data.createDate

         var dateee = new Date(this.createDate ).toJSON();
   var date = new Date(+new Date(dateee)+ 8 * 3600 * 1000).toISOString().replace(/T/g,' ').replace(/\.[\d]{3}Z/,'')
   date=date.replace(new RegExp('-','gm'),'/')
  
   this.howDays= Math.round((new Date().getTime()-new Date(date).getTime())/86400000)
   this.createDate=date
   
      }
   })
   
},
watch: {},
methods: {

},
}
</script>
<style scoped>
.username{font-size: 20px;font-weight: 700}
</style>