<template>
  <div class="main">
    <div class="content">
      <div class="display_title"><p>新品上架</p><hr/></div>
      <div class="goods">
        <ul>
            <router-link  :to="{path:'/goodsinfo',query:{goodsId:item._id}}" tag="li" v-for="item in goodsList" :key="item.id">
                <div class="img">
                    <a href="#">
                <img :src="item.img[0].imgUrl">
                </a>                
                <p v-text="item.name"></p>
                <p v-text="item.price"></p>
                </div>
            </router-link>
           
           
        </ul>
       
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "indisplay",
  components: {},
  data() {
    return {
      goodsList:[]
    };
  },
  computed: {},
  activated() {
   
    this.axios.get('/api2/goods/test').then((res)=>{
      var status=res.data.status
      if(status===0){
        
        this.goodsList=res.data.data
        
        // console.log
      }else{
        console.log('test failed')
      }
    })
  },
  methods: {
    
  }
};
</script>
<style scoped>
.display_title{height: 100px;}
.display_title > p{font-size: 50px;color:dimgray}
.goods {
  width: 100%;
  position: relative;
  
}
ul {
  display: flex;
  flex-wrap: wrap;
  
}
li {
  /* margin-left: 15px; */
  /* margin-top: 15px; */
  background-color: white;
  border-width: 0px;
  /* box-sizing: border-box; */
  border-style: solid;
  border-color: transparent;
  box-shadow: none;
  width: 19%;
  position:relative;
  transition: all .5s ease-in;
  
}
li:hover{border-color:grey;box-shadow: 2px 2px 6px #090909;top:-1px;}
li .img{width: 90%;margin:0 auto;margin-top:5px;}
li img{width: 100%;}
</style>