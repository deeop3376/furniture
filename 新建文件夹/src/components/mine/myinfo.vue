<template>
<div class='main'>
   <div class="username">
      <span>用户名：</span><span>aa</span>
   </div>
   <div class="email">
      <span>邮箱：</span>
   </div>
   <div class="regData">
      <p>您于2005-2-12注册本网站，如今已经有2000天了</p>
      <p>您共消费了20笔，总金额是5000元</p>
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
   userhead:''
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
         console.log(this.userhead)
      }
   })
},
watch: {},
methods: {

},
}
</script>
<style scoped>

</style>