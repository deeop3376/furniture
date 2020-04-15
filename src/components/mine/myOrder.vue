<template>
<div class='main'>
    <div class="top_body">
        <!-- <router-link tag="span" to="/my/myOrdere/allPay">全部订单</router-link>
        <router-link tag="span" to="/my/myOrdere/noPay">未支付</router-link>
        <router-link tag="span" to="/my/myOrdere/Paid">已支付</router-link>
        <router-link tag="span" to="/my/myOrdere/finished">已完成</router-link> -->
    <div @click="getAll">全部订单</div><br/>
    <div @click="getNoPay">未支付</div><br/>
    <div @click="getPaid">翼支付</div>
    
   
    </div>
    <div class="display_body">
        <ul>
            <li v-for="item in goodsinfo" :key="item._id">

                <div class="order_item">
                   
                    <ul >                    
                        <li v-for="good in item.goods" :key="good._id" class="good_item">
                            <div class="good_img">
                                <img :src="good.img1" />
                            </div>

                            <div class="good_info">
                                {{good.name}}
                            </div>
                            <div class="good_count">
                                {{good.goodCount}}
                            </div>
                            
                        </li>
                        
                    </ul>
                    <div class="op_order">
                        <div @click="goPay">去付款</div>
                        <div @click="deleteOrder">删除</div>
                    </div>
                </div>       

            </li>
        </ul>
    </div>
</div>
</template>

<script>

export default {
name:'myOrder',
components: {},
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
            var ar=[]
            ar=res.data.data
            console.log(JSON.parse( JSON.stringify(ar)))
           this.goodsinfo=JSON.parse( JSON.stringify(ar))
           console.log(this.goodsinfo)
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
            var length=this.orderList[i].length
            var isPay=this.orderList[i][length-1]

               if(!isPay){
                    var temp=[]
                for(let j=0;j<this.orderList[i].length;j++){
                    temp.push(this.orderList[i][j])
                }
                this.goodsinfo.push(temp)
               }
            }
       
    },
    getPaid(){
         this.goodsinfo=[]
    for(let i=0;i<this.orderList.length;i++){
            var length=this.orderList[i].length
            var isPay=this.orderList[i][length-1]

               if(isPay){
                    var temp=[]
                for(let j=0;j<this.orderList[i].length;j++){
                    temp.push(this.orderList[i][j])
                }
                this.goodsinfo.push(temp)
               }
            }
        
    }
},
}
</script>
<style scoped>
.main{width:100%;}
.top_body{display: flex;width: 100%;}
.top_body>div{width:200px;}
.display_body{width:100%;}
.order_item{border:1px solid grey;margin-top:30px;display: flex;justify-content: space-between;}
.good_item{display:flex;align-items: center;margin-bottom: 10px;}
.good_item>div{width:200px;}
.good_img>img{width:50px;}
.op_order{width:100px;height:100px;background-color: blueviolet;}
</style>