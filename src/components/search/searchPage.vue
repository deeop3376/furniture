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
<ul class="goods_list">

    
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
<footer1 />
</div>
</template>

<script>
import Header from '@/components/header'
import breadcrumb from '@/components/breadcrumb'
import pagination from '@/components/pagination'
import loading from '@/components/loading'
import sort from '@/components/sort'
import footer1 from '@/components/footer1'
export default {
name:'searchPage',
components: {Header,breadcrumb,pagination,loading,sort,footer1},
data() {
return {
    searchGood:'',
    goodslist:[],
    disCount:0,//每页展示的页码个数
    totalCount:0,//总页数
    nowPageNum:0,
    flag:true
}
},
// created() {
      
// },
watch: {
    $route(){
        history.go(0)
    }
},
created(){
this.searchGoodsList()
},
methods: {
    searchGoodsList(){
        var query=this.$route.query.searchWord
    this.searchGood=query
    this.axios.get('/api2/goods/searchGoodLength?searchGood='+this.searchGood).then((res)=>{
        if(res.data.status===0){
            this.totalCount=Math.ceil(res.data.data/10)
       
            if(this.totalCount>7){
                this.disCount=7
            }else{
                this.disCount=this.totalCount
            }
        }
    })
    this.axios.get('/api2/goods/searchGood?searchGood='+this.searchGood+'&&index=0&&howmany=10').then((res)=>{
        if(res.data.status===0){
            
            this.goodslist=res.data.data
            this.flag=false
        }
    })
    },
    goIndex(payload){

      if(this.nowPageNum!=payload){
            var index=payload-1
            this.axios.get('/api2/goods/searchGood?searchGood='+this.searchGood+'&&howmany=10&&index='+index).then((res)=>{
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
/* .goods_item:hover{transform: scale(1.2,1.2)} */
.goods{width: 80%;margin:0 auto;background-color: white;transition: all 0.6s ease;overflow: hidden;}
.goods_img{width: 100%}
.goods_name{overflow: hidden;text-overflow: ellipsis;white-space: nowrap;}
.pagination{width:100%;margin-top:50px;}
.goods_img:hover{transform: scale(1.2,1.2)}
</style>