<template>
  <div class="main">
    <tou/>
   <div class="tou">
      
    <sort /> 
    <div class="breadcrumb">
      <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item><span style="cursor:pointer" @click="gopre">商品列表</span></el-breadcrumb-item>
      <el-breadcrumb-item>商品详情</el-breadcrumb-item>
     
</el-breadcrumb>
    </div>
   </div>
    <div class="content" ref="content">
      
      <div class="imgContainer">
        <div class="bigimg" ref="bigImg" @mousemove="maskMove" @mouseout="hideMask">
         <div class="mask" ref="mask"></div>
          <ul class="item_big_img_list">
          
            <li :class="item_big_good" v-for="(item,i) in goodImgs" :key="i">
              
              <img class="item_big_img" :src="item" alt="商品展示图片"/>
            </li>
          </ul>
         <div class="maskImg" ref="maskBigImg">
           <img :src="maskImgUrl" alt="" ref="maskImg" class="maskBigImg" @load="imgloaded">
         </div>
        </div>
        
      <div class="simg">
        <ul class="item_small_img_list">
            <li class="item_small_good"  v-for="(item,index) in goodImgs" :key="item._id" @click="choiceImg(index,item)">
              <img class="item_small_img" :src="item" alt="商品展示图片"/>
            </li>
        </ul>
      </div>
      <!-- <button class="leftimg">></button>
      <button class="rightimg">></button> -->
      </div>
    <div class="ginfo">

      <div class="gname">
        {{goodInfo.name}}
      </div>
      <div class="gguige">
        {{goodInfo.guige}}
      </div>
      <div class="desc">{{goodInfo.desc}}</div>
      <div class="gprice">
        仅售：<span style="font-size:19px; color:red;">{{goodInfo.price}}</span>
        
      </div>
      <div class="saleCount">
        销量：<span>{{goodInfo.saleCount}}件</span>
      </div>
      <div class="buy">

        数量：<el-input-number v-model="basecount" :min="1" :max="100" label="描述文字"></el-input-number>
        <div class="buyOrCart">
          
          <div class="buynow" @click="buyNow">立即购买</div>
          <div class="addCart" @click="addCart">加入购物车</div>
        </div>
        
      </div>
    </div>
    
    </div>
    <mayLike :goodId="goodId"/>
    <footer1 />
  </div>
</template>

<script>
import sort from '@/components/sort'
import tou from '@/components/header'
import breadcrumb from '@/components/breadcrumb'
import mayLike from '@/components/mayLike'
import footer1 from '@/components/footer1'
export default {
  name: "goodsinfo",
  components: {sort,tou,breadcrumb,mayLike,footer1},
  data() {
    return {
      basecount: 1, //选择的商品数量
     item_big_good:'item_big_good',
      
      goodInfo:'', //通过goodId从后端获取到的sp信息
      goodId:'',      //上个页面通过url传过来的goodId
      goodImgs:[],
      maskImgUrl:'',
      maskTop:0,
      pX:0,
      pY:0,
      imgLoad:false
    }
  },
  created(){
     this.goodId=this.$route.query.goodsId
  },
  // updated(){
    
  //    var item=document.querySelector('.item_big_good')
   
  //   this.goodId=this.$route.query.goodsId  //获取上个页面通过url传过来的goodId
    
  //    this.axios.get('api2/goods/getGood?goodId='+this.goodId).then((res)=>{ //通过goodId获取该商品信息
  //     var status=res.data.status
  //     if(status===0){
  //       this.goodInfo=res.data.data
  //       this.goodImgs=res.data.data.img
  //       this.bigImg=this.goodImgs[0]
  //       this.maskImgUrl=this.goodImgs[0]
  //       // console.log(this.goodInfo)
  //       this.$nextTick(function(){ //数据更新后再更新视图
        
  //          this.item_big_good='item_big_good'
  //          var item=document.querySelectorAll('.item_big_good')[0].className='item_big_good active'
  //           // console.log(item)
  //       })
  //     }
  //   })
    
  // },
  watch: {
    $route(){
      this.goodInfo={}
        this.goodImgs=[]
        this.bigImg=''
        this.maskImgUrl=''
      window.pageYOffset=0
      document.documentElement.scrollTop=0
       var item=document.querySelector('.item_big_good')
   
    this.goodId=this.$route.query.goodsId  //获取上个页面通过url传过来的goodId
  
     this.axios.get('api2/goods/getGood?goodId='+this.goodId).then((res)=>{ //通过goodId获取该商品信息
      var status=res.data.status
      if(status===0){
        this.goodInfo=res.data.data
        this.goodImgs=res.data.data.img
        this.bigImg=this.goodImgs[0]
        this.maskImgUrl=this.goodImgs[0]
        // console.log(this.goodInfo)
        this.$nextTick(function(){ //数据更新后再更新视图
        
           this.item_big_good='item_big_good'
           var item=document.querySelectorAll('.item_big_good')[0].className='item_big_good active'
            // console.log(item)
        })
      }
    })
    } 
     
  },
  activated() {
    var item=document.querySelector('.item_big_good')
    
    this.goodId=this.$route.query.goodsId  //获取上个页面通过url传过来的goodId
   
     this.axios.get('api2/goods/getGood?goodId='+this.goodId).then((res)=>{ //通过goodId获取该商品信息
      var status=res.data.status
      if(status===0){
        this.goodInfo=res.data.data
        this.goodImgs=res.data.data.img
        this.bigImg=this.goodImgs[0]
        this.maskImgUrl=this.goodImgs[0]
        // console.log(this.goodInfo)
        this.$nextTick(function(){ //数据更新后再更新视图
        
           this.item_big_good='item_big_good'
           var item=document.querySelectorAll('.item_big_good')[0].className='item_big_good active'
            // console.log(item)
        })
      }
    })
    document.documentElement.scrollTop=0
    window.pageYOffset =0
  },
  deactivated() {

  },
  methods: {
    imgloaded(){
      console.log('img is load')
      this.imgLoad=true
    },
    hideMask(){
      this.$refs['mask'].style.display='none'
       this.$refs['maskBigImg'].style.display='none'
    },
    maskMove(e){
      if(this.imgLoad){
        this.$refs['mask'].style.display='block'
       this.$refs['maskBigImg'].style.display='block'
      var clientX=e.clientX
      var clientY=e.clientY
      var leftImgleft = this.$refs['bigImg'].getBoundingClientRect().left
      var leftImgright = this.$refs['bigImg'].getBoundingClientRect().right
      var leftImgtop = this.$refs['bigImg'].getBoundingClientRect().top
      var leftImgbottom = this.$refs['bigImg'].getBoundingClientRect().bottom
      var maskWidth=this.$refs['mask'].getBoundingClientRect().width/2

      if(clientX>leftImgleft&&clientX<leftImgright&&clientY>leftImgtop&&clientY<leftImgbottom){
         if(clientX>leftImgleft+maskWidth&&clientX<leftImgright-maskWidth&&clientY>leftImgtop+maskWidth&&clientY<leftImgbottom-maskWidth){
           this.$refs['mask'].style.left=clientX-leftImgleft-maskWidth+'px'
          this.$refs['mask'].style.top=clientY-leftImgtop-maskWidth+'px'
          this.$refs['maskImg'].style.left=-(clientX-leftImgleft-maskWidth)*2+'px'
          this.$refs['maskImg'].style.top=-(clientY-leftImgtop-maskWidth)*2+'px'
         }
     
      }else{
         this.$refs['mask'].style.display='none'
         this.$refs['maskBigImg'].style.display='none'
      }
      }

    },
  
    gopre(){
      this.$router.go(-1)
    },
    // countadd() {  //商品数量加1
    //   this.basecount++;
    // },
    // countsub() {//如果商品数量大于1了，再减1.否则不进行操作
    //   if (this.basecount > 1) {
    //     this.basecount--;
    //   }
    // },
    choiceImg(index,item){  //当点击缩略图的时候，会传进来一个index索引，因为大图和小图用的同一个数组，所以大小图的
                        //index是相同的，再通过index，改变对应的的大图样式，达到隐藏其它图片，显示该图片的目的
      
    var bigLists=document.querySelectorAll('.item_big_good')
    for(let i=0;i<bigLists.length;i++){
      bigLists[i].className='item_big_good'
    }
    bigLists[index].className='item_big_good active'
    this.maskImgUrl=item

    }, 
    addCart(){   //添加到购物车，向后端传userId,goodId,goodCount

      var userId=window.sessionStorage.getItem('userId')
      var goodId=this.goodInfo._id
      
      if(userId){
        this.axios.post('/api2/cart/addCart',{
        userId:userId,
        goodId:goodId,
        goodCount:this.basecount
      }).then((res)=>{
          var status=res.data.status
          if(status===0){
            alert('success')
          }
      })
      }else{
        alert('please login before addCart')
      }
    },
    buyNow(){ //购买功能
      var userId=window.sessionStorage.getItem('userId') //从sessionStorage获取userId
      
      
      if(userId){ //如果sessionStorage中有userId，说明用户已登录
        // window.sessionStorage.setItem('goodId',this.goodInfo._id)//将要买的goodId存入sessionStorage中，以便传入订单页
        // window.sessionStorage.setItem('goodCount',this.basecount)
        
        var arr=[]                //为了配合cart中的向order页面传送goodId，goodCount的形式，
                                  //将goodId，goodCount先放入对象中，再讲对象放入数组，再放入sessionStorage
        var obj={}
        obj.goodId=this.goodInfo._id
        obj.goodCount=this.basecount
        arr.push(obj)
       
         window.sessionStorage.setItem('goods',JSON.stringify(arr))//由于sessionStorage只支持字符串形式的数据，所以数组先转字符串，取得时候再转回来
        this.$router.push('/order')
        // this.axios.post('/api2/order/addOrder',{
        //   userId,
        //   goods
        // }).then((res)=>{})
      }else{
        alert('please login before buy')
      }
    },
  },
};
</script>
<style scoped>
.main{width: 100%;}
.tou{width:1100px;margin:0 auto;}
.content{width: 1000px;margin:0 auto;display: flex;margin-top: 20px;}
.imgContainer{width: 500px;height: 600px;position: relative;top:0;left: 0;}
.ginfo{width: 500px;height: 400px;margin-left:30px;background-color: white;padding-left: 10px;}
.gname{font-size: 24px;margin-top:20px;}
.gguige{font-size:15px;margin-top:20px;}
.desc{font-size:15px;height:50px;margin-top:40px;}
.saleCount{margin-top: 20px;}
.gprice{color:#D44D44;margin-top:20px;}
.buyOrCart{display: flex;}
.el-input-number{margin-top:20px;}
.buynow{width:100px;height:50px;background-color: #C7E7DB;border-radius:3px;color:#3B83B3;text-align: center;
line-height: 50px;margin-top:87px;position: relative;left:225px;cursor: pointer;}
.addCart{width:140px;height:50px;background-color: #EA301C;border-radius:3px;margin-left:230px;margin-top:87px;
line-height: 50px;text-align: center;cursor:pointer;}
.bigimg{width: 500px;height: 500px;position: relative;top:0;}
.item_big_img_list{position: relative;top:0;left: 0;}
.item_big_good{position: absolute;visibility: hidden;opacity: 0;transition: all 1s ease-out;}
.active{visibility: visible;opacity: 1;z-index: 5;}
.item_big_img{width: 500px;height: 500px;}
/* .mask{position: absolute;top:0;left: 0;display: none;width: 200px;height: 200px;background-color: blue;z-index: 9;
}
.maskImg{width:500px;height: 500px;display: block;position: relative;left: 0;top:0;overflow: hidden;z-index: 99;}
.maskBigImg{position: absolute;top:0;left:0;height: 1250px;width:1250px;z-index: 99;} */
.mask{width: 250px;height: 250px;background-color: gray;position: absolute;top:0; z-index: 99;
display: none;opacity:0.4}
.maskImg{width: 500px;height: 500px;position: relative;top:0;left:530px;z-index: 9999;
overflow: hidden;display: none;}
.simg{width: 500px;height: 100px;display: flex;align-items: center;}
.item_small_img_list{width: 500px;display: flex;}
.item_small_good{flex:1;max-width: 80px;}
.item_small_img{width: 100%;}
.maskBigImg{position: absolute;top:0;left: 0;width: 1000px;height: 1000px;}
</style>