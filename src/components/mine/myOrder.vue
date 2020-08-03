<template>
<div class='main'>
    
    <div class="top_body">
        <!-- <router-link tag="span" to="/my/myOrdere/allPay">全部订单</router-link>
        <router-link tag="span" to="/my/myOrdere/noPay">未支付</router-link>
        <router-link tag="span" to="/my/myOrdere/Paid">已支付</router-link>
        <router-link tag="span" to="/my/myOrdere/finished">已完成</router-link> -->
    <div style="color:chocolate" @click="getAll">全部订单</div><br/>
    <div @click="getNoPay">未支付</div><br/>
    <div @click="getPaid">已支付</div>
    
   
    </div>
    <div class="orderinfo">
        <div class="goodName">商品信息</div>
        <div class="goodCount">购买数量</div>
        <div class="goodPrice">商品单价</div>
    </div>
    <div class="display_body">
        <ul>
            <li v-for="item in goodsinfo" :key="item._id">
                <div style="color:grey;font-size:15px;" class="orderHead">
                    2020-05-20&nbsp;订单编号：{{item._id}}
                </div>
                <div class="order_item">
                   
                    <ul >                    
                        <li v-for="good in item.goods" :key="good._id" class="good_item">
                            <div class="good_img">
                                <img :src="good.indexImg" />
                            </div>

                            <div class="good_info">
                                {{good.name}}
                                
                            </div>
                            <div class="good_count">
                                {{good.goodCount}}
                            </div>
                            <div class="good_price">
                                {{good.price}}
                                
                            </div>
                        </li>
                        
                        
                    </ul>
                    <div class="op_order">
                        <div class="sum_price">总价格：{{item.totalPrice}}</div>
                        <div style="background-color:#41B883" @click="goPay" v-if="item.isPay" class="goPay">再次购买</div>
                        <div @click="goPay" v-else class="goPay">去付款</div>
                    </div>
                </div>       

            </li>
            
        </ul>
    </div>
</div>
</template>

<script>
import breadcrumb from '@/components/breadcrumb'
export default {
name:'myOrder',
components: {breadcrumb},
data() {
    return {
    orderList:[],
    goodsinfo:[],
    img:{}
    }
},
created() {
    var userId=window.sessionStorage.getItem('userId')
    this.axios.get('/api2/order/getOrder?userId='+userId).then((res)=>{
        if(res.data.status===0){
            // console.log(res.data.data)
            this.orderList=res.data.data 
            // this.orderList=JSON.parse( JSON.stringify(res.data.data))
            // console.log(this.orderList)
            
           this.goodsinfo=JSON.parse( JSON.stringify(this.orderList))

        }
    })
},
watch: {},
methods: {
    goPay(orderId){},
    deleteOrder(orderId){},
    getAll(){
        this.goodsinfo=[]
        this.goodsinfo=this.orderList
    },
    getNoPay(){ 
// orderList形如：[{isPay:false,goods:[goodId:'ff23sf',goodId:'']}] 数组里面有多个订单，每个订单又有多个商品id
// 要向获取未付款的，就要循环orderList的isPay属性，当其为false时，将遍历该订单的goods中的goodId，并将其push进goodsinfo
//所以此时goodsinfo中存放的是未付款的
        this.goodsinfo=[]
        for(let i=0;i<this.orderList.length;i++){
            if(!this.orderList[i].isPay){
                this.goodsinfo.push(this.orderList[i])
            }
        }
       
    },
    getPaid(){
         this.goodsinfo=[]
    for(let i=0;i<this.orderList.length;i++){
                if(this.orderList[i].isPay){
                this.goodsinfo.push(this.orderList[i])
            }
        }       
    }
},
}
</script>
<style scoped>
.main{width:100%;}
.top_body{display: flex;width: 90%;margin:0 auto;}
.top_body>div{width:200px;} 
.orderinfo{width:90%;display: flex;margin:0 auto;position: relative;top:20px;color:grey;font-size: 15px;border-bottom:1px solid grey;}
.goodName{position:relative;left:50px;}
.goodCount{position:relative;left:200px;}
.goodPrice{position:relative;left:270px;}
.display_body{width:90%;margin:0 auto;}
.display_body>ul>li{margin-top:30px;}
.orderHead{width:100%;height: 30px;background-color: #F1F1F1;}
.order_item{border:1px solid #F1F1F1;display: flex;justify-content: space-between;}
.order_item>ul{border-right: 1px solid #F1F1F1;}
.good_item{display:flex;align-items: center;border-bottom: 1px solid #F1F1F1;}
/* .good_item>div{width:200px;} */
.good_img{width:100px;}
.good_img>img{width:50px;}
.good_info{width:200px;}
.good_count{width:100px;}
.good_price{width:100px;}

.op_order{width:300px;display: flex;align-items: center;}
.sum_price{position: relative;width:100px;}
.goPay{width:70px;height:40px;background-color: chocolate;line-height: 40px;text-align: center;border-radius:4px;}
</style>