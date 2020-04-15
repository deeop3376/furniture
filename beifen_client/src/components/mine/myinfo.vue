<template>
<div class='main'>
   头像：<img :src="userhead">
   用户名：<p>{{username}}</p>
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