<template>
<div class='main'>
    <Header/>
    <div class="tou">
         
    <sort/>
    <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      
        <el-breadcrumb-item>商品列表</el-breadcrumb-item>
  
    </el-breadcrumb>
    </div>
<loading v-if="flag"/>
<div v-if="goodslist==[]" class="noneContent">暂无内容</div>
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
                销量：{{item.saleCount}}件
            </div>
        </div> 
    </router-link>

</ul>
<div class="pagination">
    <pagination :disCount="disCount" :totalCount="totalCount" @handleClick="goIndex"></pagination>
</div>

</div>
</template>

<script>
import Header from '@/components/header'
import breadcrumb from '@/components/breadcrumb'
import pagination from '@/components/pagination'
import loading from '@/components/loading'
import sort from '@/components/sort'
export default {
name:'goods_list',
components: {Header,breadcrumb,pagination,loading,sort},
data() {
return {
    smallSort:'',
    goodslist:[],
    disCount:0,//每页展示的页码个数
    totalCount:0,//总页数
    nowPageNum:1,
    flag:true
}
},
// created() {
      
// },
mounted() {
    
},
activated(){
var query=this.$route.query.smallSort
    this.smallSort=query

   
    this.axios.get('/api2/goods/getGoodsLengthBySmallSort?smallSort='+this.smallSort).then((res)=>{
        
        if(res.data.status===0){

            this.totalCount=Math.ceil(res.data.data/10)
       
            if(this.totalCount>7){
                this.disCount=7
            }else{
                this.disCount=this.totalCount
            }
        }else{
            this.flag=false
        }
        this.axios.get('/api2/goods/findGoodsBySmallSort?index=0&&howmany=10&&smallSort='+this.smallSort).then((res)=>{
        var status=res.data.status
        if(status==0){
            this.goodslist=res.data.data
            this.flag=false
        }else{
            this.goodslist=[]


        }
    })
    })

},

methods: {
    // goGoodsInfo(goodId){
    //     this.$router.push('/goodsinfo?goodsId='+goodId)
    // },
    goIndex(payload){
        if(this.nowPageNum!=payload){
            var index=payload-1
            this.axios.get('/api2/goods/findGoodsBySmallSort?index='+index+'&&howmany=8&&smallSort='+this.smallSort).then((res)=>{
                if(res.data.status===0){
                    this.goodslist=res.data.data
                    
                }else{
                    console.log('goodslist error')
                }
    })
    this.nowPageNum=payload;
        }
    },
},
}
</script>
<style scoped>
*{margin:0;padding:0}
.main{width: 100%;}
.tou{width: 1250px;margin:0 auto;}
.goods_list{width: 1300px;display: flex;margin:0 auto;flex-wrap:wrap;height: 510px;}
.goods_item{width: 20%;margin-top:20px;}
.goods_img:hover{transform: scale(1.2,1.2)}
.goods{width: 80%;margin:0 auto;background-color: white;transition: all 0.6s ease;overflow: hidden;}
.goods_img{width: 100%}
.goods_name{overflow: hidden;text-overflow: ellipsis;white-space: nowrap;}
.pagination{width:100%;margin-top:50px;}
.noneContent{width:100%;height:100%;text-align: center;line-height: 500px;font-size: 40px;}
</style>