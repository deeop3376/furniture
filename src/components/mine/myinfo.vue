<template>
<div class='main'>
 <div class="name_head">
    <div class="name">sdfasdfadfaadf</div>
    <img src="@/assets/logo.png" />
 </div>
 <div class="email_regDate">1678123878@qq.com</div>
 <div class="updatePwd">update your password</div>
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