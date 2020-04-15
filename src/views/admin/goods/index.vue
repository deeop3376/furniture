<template>
<div class='main'>
    <!-- 名字<input type="text" v-model="name" /><br/>
    描述<input type="text" v-model="desc" /><br/>
    数量<input type="text" v-model="count" /><br/>
    价格<input type="text" v-model="price" /><br/>
    大分类<input type="text" v-model="bigSort" /><br/>
    小分类<input type="text" v-model="smallSort" /><br/>
    图片地址<input type="text" v-model="imgUrl" /><br/>
    颜色<input type="text" v-model="imgColor" /><br/>
<button @click="toSubmit">提交</button>

<button @click="addSort">fenlei</button> -->
<div class="tou">
<!-- <div class="search_box">
    <input class="search_text" type="text" placeholder="请输入搜索内容">
    <div class="search_btn">搜索</div>

</div> -->
<h1>商品管理页面</h1>
</div>
 
<div class="main_body">
    
        <ul class="goods">
             <li class="good_item" v-for="(item,i) in goodList" :key="i">
                <div class="img">
                    <img :src="item.img1"/>
                </div>
                <div class="good_name">{{item.name}}</div>
                <div class="good_price">单价：{{item.price}}</div>
                <div class="good_count">库存：{{item.count}}</div>
                <div class="manage" @click="manageGood(i)"><i class="el-icon-setting"></i>编辑</div>
                <div class="delete" @click="deleteGood(item._id)"><i class="el-icon-delete"></i>删除</div>
            </li>
            
             
        </ul>
    <div class="pagination">
        <pagination :disCount="disCount" :totalCount="totalCount" @handleClick="goIndex"></pagination>
    </div>
</div>
</div>
</template>

<script>
import pagination from '@/components/pagination'
export default {
name:'addGoods',
components: {
    pagination
},
data() {
return {
    disCount:0,
    totalCount:0,
    goodList:[],
    nowPageNum:1
}
},
created(){
    this.axios.get('/api2/goods/getGoodsLength').then((res)=>{
        
        this.totalCount=Math.ceil(res.data.data/8)
       
        if(this.totalCount>7){
            this.disCount=7
        }else{
            this.disCount=this.totalCount
        }
    })
},
mounted(){
    this.axios.get('/api2/goods/getGoodByPagination?index=0&&howmany=8').then((res)=>{
        if(res.data.status===0){
            this.goodList=res.data.data
        }else{
            alert('failed')
        }
    })

},
methods: {
   manageGood(index){
       var goodInfo=JSON.stringify(this.goodList[index])
       this.$router.push({name:'editGood',params:{good:goodInfo}})
   },
    goIndex(payload){
        
        if(this.nowPageNum!=payload){
            var index=payload-1
            this.axios.get('/api2/goods/getGoodByPagination?index='+index+'&&howmany=8').then((res)=>{
        if(res.data.status===0){
            this.goodList=res.data.data
        }else{
            alert('failed') 
        }
    })
    this.nowPageNum=payload;
        }
    },
    addSort(){
        
        
        var sorts=[
            {bigSort:'卧室',smallSorts:[{smallSort:'床'},{smallSort:'衣柜'}]},
            {bigSort:'卧室',smallSorts:[{smallSort:'床'},{smallSort:'衣柜'}]},
            {bigSort:'卧室',smallSorts:[{smallSort:'床'},{smallSort:'衣柜'}]},
            {bigSort:'卧室',smallSorts:[{smallSort:'床'},{smallSort:'衣柜'}]},
            {bigSort:'卧室',smallSorts:[{smallSort:'床'},{smallSort:'衣柜'}]},
            {bigSort:'卧室',smallSorts:[{smallSort:'床'},{smallSort:'衣柜'}]},
            {bigSort:'卧室',smallSorts:[{smallSort:'床'},{smallSort:'衣柜'}]},
            {bigSort:'卧室',smallSorts:[{smallSort:'床'},{smallSort:'衣柜'}]},
            {bigSort:'卧室',smallSorts:[{smallSort:'床'},{smallSort:'衣柜'}]},
            {bigSort:'卧室',smallSorts:[{smallSort:'床'},{smallSort:'衣柜'}]},
            ]
        this.axios.post('/api2/sort/addSort',{sorts}).then((res)=>{
            if(res.data.status===0){
                console.log('success')
            }else{
                console.log('error')
            }
        })
    },
    toSubmit(){
        var obj={}
        obj.imgUrl=this.imgUrl
        obj.imgColor=this.imgColor
        var img=[]
        img.push(obj)
        console.log(typeof this.count)
        this.axios.post('/api2/goods/addGoods?a=2',{
            name:this.name,desc:this.desc,count:this.count,price:this.price,bigSort:this.bigSort,smallSort:this.smallSort,img
        }).then((res)=>{
            if(res.data.status===0){
                console.log('success')
            }else{
                console.log('failed')
            }
        })
    }
},
}
</script>
<style scoped>
.main{width:100%;height: 100%;}
.tou{width: 500px;}
.search_box{display: flex;}
.search_text{width:400px;height: 40px;}
.search_btn{width:60px;height: 42px;border:1px solid grey;border-left: none;text-align: center;line-height: 42px;
background-color: grey;}
.main_body{width:1000px;margin-top:30px;border-radius:5px;margin-left:10px;}
.goods{width:1000px;height:430px;}
.good_item{display: flex;width:100%;justify-content: space-around;align-items: center;background-color: #ECEDF0;
border-radius:5px;}
.good_item:not(:last-of-type){margin-bottom:10px;}
.img,.good_price,.good_count,.manage,.delete{width:140px;}
.img,.manage,.delete,.good_name{text-align: center;}
.good_name{width:500px;}
.img>img{width:40px;}
.pagination{margin:0 auto;width:671px;margin-top:10px;}
</style>