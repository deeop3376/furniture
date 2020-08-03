<template>
<div class='main'>
    <div class="biaoti">
        新品上架
    </div>
    <div class="main_body">
        <div class="bigImg">
            <img src="@/assets/newGood.jpg" alt="bigImg" />
        </div>
        <div class="good">
            <ul class="goods_list">
                <!-- <li v-for="item in goodslist" :key="item.id">{{item.name}}</li> -->
                
                <router-link tag="li" :to="{path:'goodsinfo',query:{goodsId:item._id}}"  class="goods_item" v-for="(item,i) in goodslist" :key="i" >
                    <div class="goods tool">            
                        <div><img class="goods_img" v-lazy="item.indexImg" /></div>
                        <div class="goods_name" :title="item.name">
                            {{item.name}}
                        </div>
                        <div class="goods_price">
                            仅售：<span class="price">￥{{item.price}}</span>
                            销量：<span>{{item.saleCount}}</span>件
                        </div>
                    </div>  
                </router-link>

            </ul>
         </div>
    </div>
</div>
</template>

<script>

export default {
name:'',
components: {},
data() {
return {
    goodslist:[]
}
},
mounted() {
    this.axios.get('/api2/goods/getGoodByPagination?index=0&&howmany=4').then((res)=>{
        if(res.data.status===0){
            this.goodslist=res.data.data
            
        }else{
           console.log('get newGood error')
        }
    })
},
watch: {},
methods: {

},
}
</script>
<style scoped>
.main{width: 100%;}
.biaoti{border-bottom: 1px solid grey;font-size: 30px;}
.main_body{width:100%;display: flex;}
.bigImg{width:620px;margin-top:20px;}
.goods_list{width: 600px;display: flex;margin:0 auto;flex-wrap:wrap;}
.goods_item{width: 300px;margin-top:20px;}
.goods{width: 80%;margin:0 auto;background-color: white;transition: all 0.6s ease;overflow: hidden;}
.goods_img{width: 100%}
.goods_img:hover{transform: scale(1.2,1.2)}
.goods_name{overflow: hidden;text-overflow: ellipsis;white-space: nowrap;}
img{cursor:pointer}
.price{font-size: 20px;font-weight: 700}
</style>