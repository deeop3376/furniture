<template>
<div class='main'>
    <div class="biaoti">
        新品上架
    </div>
    <div class="good">
        <ul class="goods_list">
    <!-- <li v-for="item in goodslist" :key="item.id">{{item.name}}</li> -->
    
    <router-link tag="li" :to="{path:'goodsinfo',query:{goodsId:item._id}}"  class="goods_item" v-for="(item,i) in goodslist" :key="i" >
        <div class="goods tool">            
            <div><img class="goods_img" :src="item.indexImg" /></div>
            <div class="goods_name" :title="item.name">
                {{item.name}}
            </div>
            <div class="goods_price">
                仅售：{{item.price}}
                销量：9999件
            </div>
        </div>  
    </router-link>

</ul>
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
    this.axios.get('/api2/goods/getGoodByPagination?index=0&&howmany=8').then((res)=>{
        if(res.data.status===0){
            this.goodslist=res.data.data
            
        }else{
            alert('failed')
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
.goods_list{width: 1200px;display: flex;margin:0 auto;flex-wrap:wrap;height: 510px;}
.goods_item{width: 300px;margin-top:20px;}
.goods{width: 80%;margin:0 auto;background-color: white;transition: all 0.6s ease;overflow: hidden;}
.goods_img{width: 100%}
.goods_item:hover{transform: scale(1.2,1.2)}
.goods_name{overflow: hidden;text-overflow: ellipsis;white-space: nowrap;}
</style>