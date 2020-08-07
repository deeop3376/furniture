<template>
<div class='main'>
    <tou />
    <div class="top_head">
        
        <h1 style="color:chocolate">我的购物车</h1>
        <div class="searchbox">
            <!-- <input type="text" v-model="searchContent" class="searchContent">
            <div class="searchBtn"></div> -->
        </div>
    </div>
    <div class='content'>
        
        <div class="cart_head">
            <div class="chooseAll">
                全选<input class="check_all" @change="checkAll" v-model="isCheckAll" type="checkbox" />
            </div>
            
            <div class="goods_info">商品信息</div>
            <div class="goods_price">价格</div>
            <div class="goods_count">数量</div>
            <div class="goods_operate">操作</div>
        </div>
        <ul>
            <li class="order_item" v-for="item in cart.goods" :key="item._id">
                <input type="checkbox" v-model="item.isChecked"  @change="allMoney(item)">
                <div class="gimg">
                    <img class="good_img" :src='item.indexImg'>
                </div>
                <div class="item_name">{{item.name}}</div>
                
                <div>{{item.price}}</div>
                <div>
                   <button @click="subCount(item)">-</button> <input type="text" v-model="item.goodCount">
                   <button @click="addCount(item)">+</button>
                </div>
                <div @click="deleteGood(item)">删除</div>
            </li>
            
        </ul>
        <div class="how_much">
            <div class="sum_operate">
                <!-- <input id="checkall"  type="checkbox"  @change="checkAll"/><label for="checkall">全选</label> <span>删除选中商品</span> -->
            </div>
            <div class="sum_price">
                <div class="price_text">已选商品<span style="font-size:18px">{{checkCount}}</span>件：<span style="color:red">{{checkPrice}}元</span></div>
                <div class="pay" @click="goPay"><span>去结算</span></div>
            </div>

        </div>
    </div>
</div>
</template>

<script>
import axios from 'axios'
import sort from '@/components/sort'
import tou from '@/components/header'
export default {
name:'',
components: {
    sort,
    tou
},
data() {
return {
    checkCount:0,
    checkPrice:0,
    
    isCheckAll:false,
    payLists:[],
    payGood:{},
    cart:{}
}
},
computed: {},
// beforeRouteEnter(to,from,next){
//     if(window.localStorage.getItem('ttoken')){
//         next()
//     }else{
//         alert('please login')
//         next({path:'/logOrreg'})
//     }
// },
activated() { 
    var userId=window.sessionStorage.getItem('userId')
   
    this.axios.get('/api2/cart/getCart?userId='+userId).then((res)=>{
        var status=res.data.status
        if(status===0){
            this.cart=res.data.data
          
        }else if(status===401){
            localStorage.removeItem('ttoken')
            this.$router.push('/logOrreg')
        }else{
           
            this.$router.push('/logOrreg')
        }
    })
},
methods: {
    checkAll(e){
       
        let clist=this.cart.goods
        var ischeckAll=e.target.checked
        
        if(ischeckAll===true){
                  
            // this.checkCount=clist.length
            this.checkPrice=0
            this.checkCount=0
            for(var i=0;i<clist.length;i++){
                clist[i].isChecked=true
                this.checkPrice=this.checkPrice+clist[i].price*clist[i].goodCount
                this.checkCount=this.checkCount+clist[i].goodCount
            }
        }else{
            this.checkCount=0
            this.checkPrice=0
            for(var j=0;j<clist.length;j++){
                clist[j].isChecked=false
            }
        }
        
    },
    allMoney(item){
        
        
        //  var price=e.target.parentNode.childNodes[3].innerHTML
        var checked=item.isChecked
        var price=item.price
        var count = item.goodCount
        if(checked===true){
            this.checkCount=this.checkCount+count          
            this.checkPrice=this.checkPrice+price*count
            let clists=this.cart.goods
            let isck=true
            for(let i=0;i<clists.length;i++){
               isck=isck&&clists[i].isChecked
            }
            if(isck===true){
                this.isCheckAll=true
            }
            
        }else if(checked===false){
            this.checkCount=this.checkCount-count
             this.isCheckAll=false
            this.checkPrice=this.checkPrice-price*count
           
        }
    },
    subCount(item){
        let isck=item.isChecked
        if(item.goodCount===1){

        }else{
            item.goodCount--  
            if(isck===true){
                this.checkCount--
                this.checkPrice=this.checkPrice-item.price
             
            }         
        }
    },
    addCount(item){ //商品数量增加的按钮。如果商品被选中，则结算时的数量和价钱会随之增加，如未被选中则只增加该商品的数量，结算时数量不会增加
        let isck=item.isChecked  //获取商品的选中状态 
        item.goodCount++    //无论商品是否被选中，该商品数量先加1
        if(isck===true){ //如果商品被选中
                this.checkCount++ //结算时商品选中的总商品数量 加1
                this.checkPrice=this.checkPrice+item.price //价钱随之增加
               
            }   
    },
    goPay(){
        this.payGood={}
        this.payLists=[]
        let cls=this.cart.goods  //goods是购物车的表（goodId,goodCount）和商品的表合并到一起的
       
        for(let i=0;i<cls.length;i++){
            if(cls[i].isChecked){
                this.payGood={} 
                this.payGood.goodId=cls[i].goodId
                this.payGood.goodCount=cls[i].goodCount
                this.payLists.push(this.payGood)
            }
        }
        window.sessionStorage.setItem('goods',JSON.stringify(this.payLists))
        this.$router.push('/order')
       
    },
    deleteGood(item,e){ //根据商品id删除该商品
        var goodId=item.goodId
        this.axios.post('/api2/cart/deleteGood',{
            userId:window.sessionStorage.getItem('userId'),
            goodId:goodId
        }).then((res)=>{
            var status=res.data.status
            if(status===0){
                

            }
        })
    }
},
// beforeRouteEnter(to,from,next){
//     axios.get('api2/user/getUser').then((res)=>{
//         var status = res.data.status
//         if(status===0){
//             next()
//         }else{
//             next('/logOrreg')
//         }
//     })
// }
}
</script>
<style scoped>
.main .content{width: 100%;}
.top_head{width:80%;margin:0 auto;display: flex;justify-content:space-between;}
.cart_head{width: 80%;height: 50px;background-color: cadetblue; margin:0 auto;display: flex;align-items: center;justify-content: space-around;}
.cart_head>input{position: relative;left: -30px;}
.goods_price{position: relative;left:30px;}
.goods_operate{position: relative;left: 25px;}
.main .content ul{margin:0 auto;width:80%;}
.main .content ul li{display: flex;height: 80px;margin-top:15px;background-color: white;
padding: 5px;align-items: center;justify-content: space-around}
.main .content ul li img{width: 60px;height: 60px;}
.how_much{width:80%;height: 100px;margin:0 auto;display: flex;justify-content: space-between;align-items: center;}
.sum_price{display: flex;}
.price_text{height: 50px;display: flex;align-items: center;margin-right: 10px;}
.pay{height: 50px;width: 100px;background-color: chocolate;text-align: center;cursor:pointer;border-radius:6px;}
.pay>span{line-height: 50px;}
.item_name{width: 150px;height: 65px;display: -webkit-box;-webkit-box-orient: vertical;
-webkit-line-clamp: 3;overflow: hidden;line-height: 65px; }
.chooseAll{position: relative;left:-50px}
.searchbox{display: flex;justify-content: space-around;}
.searchContent{width:150px;height: 50px;}
.searchBtn{width:50px;height: 50px;background-color: chocolate;}
</style>