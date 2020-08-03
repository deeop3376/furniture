<template>
<div class='main'>
    <span class="order_sure">确认订单</span>
    <hr/>
    <div class="goods_info">
        <div class="address">
           地址： 河南省郑州市惠济区万达广场
        </div>
        <div class="goods_head">
        <div class="ul_head">
            <div class="li_img">商品图片</div>
            <div class="li_desc">商品描述</div>
            <div class="li_price">商品单价</div>
            <div class="li_count">购买数量</div>
            <div class="li_sum_price">总计</div>
        </div>
        </div>
        <div class="goods_list">
            <ul class="ul_goods">
                <li class="li_goods" v-for="item in goodInfo" :key="item._id">
                    <img class="good_img" :src="item.indexImg" />
                    <div class="good_desc">{{item.name}}</div>
                    <div class="good_price">￥{{item.price}}</div>
                    <div class="good_count">{{item.goodCount}}</div>
                    <div class="good_sum_price">{{item.price*item.goodCount}}</div>
                </li>
            </ul>
        </div>
        <div class="how_much">
            <div class="display_right">
                <p>一共{{sum_count}}件</p>
                <p>一共{{sum_price}}元</p>
                <div class="toPay" @click="toPay">确认付款</div>
            </div>
        </div>
    </div>
</div>
</template>

<script>

export default {
name:'order',
components: {},
data() {
return {
    goodInfo:[],
    sum_count:0,
    sum_price:0
}
},
activated() {
   this.sum_count=0//第二次进入该页面，data里面的值是第一次的值，所以要在这里重新赋值
   this.sum_price=0
  
   //goods是一个对象数组形如：[{goodId:'11',goodCount:222},{...}]
  var goods=JSON.parse(window.sessionStorage.getItem('goods'))
//    console.log(goods)
 console.log(goods)
 var self=this
    this.axios.post('/api2/goods/getGood1',{goods}).then((res)=>{
        var status=res.data.status
        console.log('----------------')
     
        if(status===0){
            if(res.data.data instanceof Array){
                 self.goodInfo=res.data.data
                 console.log(self.goodInfo)
            //    for(var i=0;i<goods.length;i++){
            //         this.goodInfo[i]=Object.assign(goodsInfo[i],goods[i])
            //     }
                //this.goodInfo数组会出现__ob__: Observer属性，使用v-for遍历goodInfo属性遍历不到
            //   this.goodInfo= JSON.parse(JSON.stringify(this.goodInfo))
              for(let j=0;j<self.goodInfo.length;j++){  //合计总数量和总金额
                  self.sum_count=self.goodInfo[j].goodCount+self.sum_count
                  self.sum_price=self.goodInfo[j].goodCount*self.goodInfo[j].price+self.sum_price
              }
            }
        }
    })
    
    
},
watch: {},
methods: {
    toPay(){
        this.axios.post('/api2/order/addOrder',{
            userId:window.sessionStorage.getItem('userId'),
            goods:JSON.parse(window.sessionStorage.getItem('goods')),
            address:'河南省郑州市惠济区'
        }).then((res)=>{
            if(res.data.status===0){
                alert('submit order success')
            }
        })
    }
},
deactivated(){
    window.sessionStorage.removeItem('goods')
}
}
</script>
<style scoped>
.main{width: 100%;}
.goods_info{width: 80%;min-width: 700px;margin:0 auto;}
.ul_goods{width:100%;}
.li_goods{border:1px solid grey;display: flex;justify-content: space-between;align-items: center;}
.good_img{width: 50px;height: 50px;}
.how_much{display:flex;flex-direction: row-reverse;}
.order_sure{font-size: 30px;}
.address{font-size:20px;height: 50px;line-height: 50px;}
.toPay{width: 70px;height: 40px;background-color:coral;color:white;line-height: 40px;border-radius: 2px;}
.good_desc{font-size:10px;width: 70px;height: 90px;overflow: hidden;text-align: center;}
.goods_head{width: 100%;}
.ul_head{display: flex;justify-content: space-between}
</style>