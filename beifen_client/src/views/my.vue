<template>
  <div class="main">
    <input type="file" value="上传图片" @change="upload" />
    <div class="main_body">
      <div class="left_body">
          <ul>
              <router-link to="/my/myinfo" tag="li">个人信息</router-link>
              
              <li>订单中心</li>
              <li>我的喜欢</li>
              <li>收货地址</li>
          </ul>
         name: <input type="text" v-model="name"><br/>
         id: <input type="text" v-model="id"><br/>
         desc: <input type="text" v-model="desc"><br/>
         count: <input type="text" v-model="count"><br/>
         price: <input type="text" v-model="price"><br/>
         bigSort: <input type="text" v-model="bigSort"><br/>
         color: <input type="text" v-model="color"><br/>
         image: <input type="text" v-model="image"><br/>
         smallSort: <input type="text" v-model="smallSort"><br/>
         img:<input type="text" v-model="imgUrl"><br/>
         col:<input type="text" v-model="imgColor"><br/>
         <input type="button" value="submit" @click="toSubmit">
         <input type='button' value="getBigSort" @click="getBigSort">
      </div>
      <div class="right_body">
          <router-view />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "my",
  components: {},
  data() {
    return {
        name:'',
        id:'',
        desc:'',
        count:'',
        price:'',
        bigSort:'',
        color:'',
        image:'',
        smallSort:'',
        imgUrl:'',
        imgColor:'',
        img:[]
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
    },
    toSubmit(){
      var obj={}
      obj.imgUrl=this.imgUrl
      obj.imgColor=this.imgColor
      this.img.push(obj)
      this.axios.post('/api2/goods/addGoods',{
         name:this.name,
        id:this.id,
        desc:this.desc,
        count:this.count,
        price:this.price,
        bigSort:this.bigSort,
        color:this.color,
        image:this.image,
        smallSort:this.smallSort,
        img:this.img
      }).then((res)=>{
          var status=res.data.status
          if(status==0){
            console.log('success')
          }else{
            console.log('error')
          }
      })
    },
    getBigSort(){
      this.axios.get('/api2/goods/bigSort').then((res)=>{
        let status=res.data.status
        if(status==0){
          console.log(res.data.data)
        }else{
          console.log('error')
        }
      })
    }
  }
};
</script>
<style scoped>
.main{width: 100%;}
.main_body{width: 1000px;display: flex;margin: 0 auto;}
.left_body{width: 200px;background-color: wheat}
.right_body{width: 100%;height: 600px;background-color:teal;}
li{height: 50px;cursor: pointer}
</style>