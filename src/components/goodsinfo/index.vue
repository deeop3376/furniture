<template>
  <div class="main">
    <tou/>
   <div class="tou">
      
    <sort />
   </div>
    <div class="content">
      <div class="imgContainer">
        <div class="bigimg">
          <ul class="item_big_img_list">
            <li class="item_big_good"  v-for="item in goodImgs" :key="item._id">
              <img class="item_big_img" :src="item.imgUrl" alt="商品展示图片"/>
            </li>
          </ul>
        </div>
      <div class="simg">
        <ul class="item_small_img_list">
            <li class="item_small_good"  v-for="(item,index) in goodImgs" :key="item._id" @click="choiceImg(index)">
              <img class="item_small_img" :src="item.imgUrl" alt="商品展示图片"/>
              <!-- <img class="item_small_img" src="@/assets/sofa1/b.jpg" alt="商品展示图片"/> -->
              <!-- <img class="item_small_img" src="@/assets/sofa1/b.jpg" alt="商品展示图片"/> -->
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
      <div class="desc">{{goodInfo.desc}}</div>
      <div class="gprice">
        仅售：<span style="font-size:19px; color:red;">{{goodInfo.price}}</span>
      </div>
      
      <div class="gcolor">
        颜色
        <select>
        <option v-for="item in colorArr" :key="item.id">{{item.color}}</option>
        
      </select>
      
      </div>
      <div class="buy">
        <input class="csub" type="button" value="-" @click="countsub" />
        <input class="count" type="text" readonly="readonly" :value="basecount" />
        <input class="cadd" type="button" value="+" @click="countadd" />
        <div class="buyOrCart">
          <button class="buynow" @click="buyNow">立即购买</button>
          <button class="buynow" @click="addCart">加入购物车</button>
        </div>
        
      </div>
    </div>
    </div>
  </div>
</template>

<script>
import sort from '@/components/sort'
import tou from '@/components/header'
export default {
  name: "goodsinfo",
  components: {sort,tou},
  data() {
    return {
      basecount: 1, //选择的商品数量
      colorArr:[{color:'宏',id:1},{color:'慌',id:2},{color:'懒',id:3}],
      
      goodInfo:'', //通过goodId从后端获取到的sp信息
      goodId:'',      //上个页面通过url传过来的goodId
      goodImgs:[]
    };
  },
  created(){
     
  },
  mounted() {
    
    // document.querySelector('.item_big_good').className="item_big_good active"
    
  },
  activated() {
    this.goodId=this.$route.query.goodsId  //获取上个页面通过url传过来的goodId
     this.axios.get('api2/goods/getGood?goodId='+this.goodId).then((res)=>{ //通过goodId获取该商品信息
      var status=res.data.status
      if(status===0){
        this.goodInfo=res.data.data
        this.goodImgs=res.data.data.img
        console.log(this.goodInfo)
        this.$nextTick(function(){ //数据更新后再更新视图
          document.querySelector('.item_big_good').className="item_big_good active"
        })
      }
    })
    
  },
  deactivated() {

  },
  methods: {
    countadd() {  //商品数量加1
      this.basecount++;
    },
    countsub() {//如果商品数量大于1了，再减1.否则不进行操作
      if (this.basecount > 1) {
        this.basecount--;
      }
    },
    choiceImg(index){  //当点击缩略图的时候，会传进来一个index索引，因为大图和小图用的同一个数组，所以大小图的
                        //index是相同的，再通过index，改变对应的的大图样式，达到隐藏其它图片，显示该图片的目的
      console.log(index)
    var bigLists=document.querySelectorAll('.item_big_good')
    for(let i=0;i<bigLists.length;i++){
      bigLists[i].className='item_big_good'
    }
    bigLists[index].className='item_big_good active'
    },
    addCart(){   //添加到购物车，向后端传userId,goodId,goodCount

      var userId=window.sessionStorage.getItem('userId')
      var goodId=this.goodInfo._id
      // console.log(goodId)
      if(userId){
        this.axios.post('/api2/cart/addCart',{
        userId,
        goodId,
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
  }
};
</script>
<style scoped>
.main{width: 100%;}
.tou{width:90%;margin:0 auto;}
.content{width: 90%;margin:0 auto;display: flex;}
.imgContainer{width: 500px;height: 600px;border:1px solid grey;}
.ginfo{width: 500px;height: 400px;border:1px solid grey;margin-left:30px;}
.gname{font-size: 20px;}
.desc{font-size:12px;color:#999999;height:50px;margin-top:20px;}
.gprice{color:#D44D44;}
select{width:70px;}
.bigimg{width: 500px;height: 500px;}
.item_big_img_list{position: relative;}
.item_big_good{position: absolute;visibility: hidden;opacity: 0;transition: all 1s ease-out;}
.active{visibility: visible;opacity: 1;z-index: 5;}
.item_big_img{width: 500px;height: 500px;}
.simg{width: 500px;height: 100px;display: flex;align-items: center;}
.item_small_img_list{width: 500px;display: flex;}
.item_small_good{flex:1;max-width: 80px;}
.item_small_img{width: 100%;}
</style>