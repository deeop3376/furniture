<template>
<div class='main'>
    <Header/>
<ul class="goods_list">
    <!-- <li v-for="item in goodslist" :key="item.id">{{item.name}}</li> -->
    
    <router-link tag="li" :to="{path:'/goodsinfo',query:{goodsId:item._id}}" class="goods_item" v-for="item in goodslist" :key="item._id" >
        <div class="goods tool">
            
            <div><img class="goods_img" :src="item.img1" /></div>
            <div class="goods_name" :title="item.name">
                {{item.name}}
            </div>
            <div class="goods_price">{{item.price}}</div>
            
            <div class="buyOrCart tool">
                <div class="buy">立即购买</div>
                <div class="addCart">加购物车 </div>
            </div>
        </div> 
    </router-link>
</ul>
</div>
</template>

<script>
import Header from '@/components/header'
export default {
name:'goods_list',
components: {Header},
data() {
return {
    smallSort:'',
    goodslist:[]
}
},
created() {
     
},
mounted() {
    
},
activated(){
var query=this.$route.query.smallSort
    this.smallSort=query
    
    this.axios.get('/api2/goods/findGoodsBySmallSort?smallSort='+this.smallSort).then((res)=>{
        var status=res.data.status
        if(status==0){
            this.goodslist=res.data.data
            
        }else{
            console.log('error')
        }
    })
},
methods: {
    
},
}
</script>
<style scoped>
*{margin:0;padding:0}
.main{width: 100%;}
.goods_list{width: 1300px;display: flex;margin:0 auto;flex-wrap:wrap}
.goods_item{width: 20%;}
.goods{width: 80%;margin:0 auto;background-color: white;transition: all 0.6s ease;overflow: hidden;}
.goods_img{width: 100%}
.goods_name{overflow: hidden;text-overflow: ellipsis;white-space: nowrap;}
.buyOrCart{display: flex;width: 100%;position: relative;visibility: hidden;transform: translateX(-100%);transition: all 1s ease-in;}
.buy{width: 50%;height:25px;background-color: cadetblue}
.addCart{width: 50%;height:25px;background-color: darkgreen}
.goods:hover{box-shadow: 5px 5px 10px  grey;}
.goods:hover >.buyOrCart{transform: translateX(0);visibility: visible;}
</style>