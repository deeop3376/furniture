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
<h1>商品列表页面</h1>

</div>
  
<div class="main_body">
    <div class="search">
        <el-input class="searchbox"
        placeholder="请输入内容"
        v-model="searchContent"
        clearable>
        </el-input>
        <el-button type="primary" plain>搜索</el-button>
        分类查看：
        <select @change="getSmallSort">
            <option value="">全部</option>
            <option :value="item.bigSort" v-for="(item,i) in bigSort" :key="i">{{item.bigSort}}</option>
        </select>
        <select @change="getGoodBySmallSort">
            <option value="">全部</option>
            <option :value="item.smallSort" v-for="(item,i) in smallSort" :key="i">{{item.smallSort}}</option>
        </select>
    </div>
        <ul class="goods">
             <li class="good_item" v-for="(item,i) in goodList" :key="i">
                <div class="img">
                    <img :src="item.indexImg"/>
                </div>
                <div class="good_name">{{item.name}}</div>
                <div class="good_price">单价：{{item.price}}</div>
                <div class="good_count">库存：{{item.count}}</div>
                <div class="saleOrNot">
                    <el-switch
                    v-model="item.isSale"
                    active-color="#13ce66"
                    active-text="上架"
                    inactive-text="下架"
                    inactive-color="#ff4949" @change="getSaleOrNot(item.isSale)">
                    </el-switch>
                </div>
                <div class="manage" @click="manageGood(i)"><i class="el-icon-setting"></i>编辑</div>
                <div class="delete" @click="deleteGood(item._id,i)"><i class="el-icon-delete"></i>删除</div>
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
    nowPageNum:1,
    saleOrNot:true,
    bigSort:'',
    smallSort:'',
    searchContent:''
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
    this.axios.get('/api2/sort/getBigSort').then((res)=>{
        if(res.data.status===0){
            this.bigSort=res.data.data
        }
    })
},
mounted(){
    
    this.axios.get('/api2/goods/getGoodByPagination?index=0&&howmany=8').then((res)=>{
        if(res.data.status===0){
            this.goodList=res.data.data
           
        }else{
           console.log('failed')
        }
    })

},
methods: {
    getGoodBySmallSort(e){
      

        this.axios.get('/api2/goods/findGoodsBySmallSort?index=0&&howmany=8&&smallSort='+e.target.value).then((res)=>{
            if(res.data.status===0){
                
                this.goodList=res.data.data
                
            }else{
               
            }
        })
    },
    getSmallSort(e){
        // if(e.target.value==''){
        //     this.axios.get('/api2/sort/getSmallSort').then((res)=>{
        //         if(res.data.status===0){
        //             this.smallSort=res.data.data
        //         }
        //     })
        // }
        this.axios.get('/api2/sort/getSmallSort?bigSort='+e.target.value).then((res)=>{
            if(res.data.status===0){
                this.smallSort=res.data.data
               
            }
        })
    },
    getSaleOrNot(value){
        
    },
    deleteGood(goodId,index){
        
        this.axios.post('/api2/goods/deleteGood',{goodId:goodId}).then((res)=>{
            if(res.data.status===0){
                this.goodList.splice(index,1)
            }else{
                alert(res.data.msg)
            }
        })
    },
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
                   console.log('failed')
                }
    })
    this.nowPageNum=payload;
        }
    },

    toSubmit(){
        var obj={}
        obj.imgUrl=this.imgUrl
        obj.imgColor=this.imgColor
        var img=[]
        img.push(obj)
      
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
.main{width:100%;height: 100%;border:1px solid grey;background-color: white}
.tou{width: 500px;}
select{width:150px;height: 40px;margin-left:50px;}
.main_body{width:1000px;margin-top:30px;border-radius:5px;margin-left:10px;margin:0 auto}
.searchbox{width:300px}
.goods{width:1000px;height:430px;}
.good_item{display: flex;width:100%;justify-content: space-around;align-items: center;background-color: #ECEDF0;
border-radius:5px;}
.good_item:not(:last-of-type){margin-bottom:10px;}
.img,.good_price,.good_count,.manage,.delete{width:100px;}
.img,.manage,.delete,.good_name{text-align: center;cursor:pointer}
.good_name{width:300px;}
.img>img{width:40px;}
.el-switch .el-switch__label{position: absolute;
  display: none;
  color: #fff;}
.el-switch .el-switch__label--right{z-index: 1;right:-10px}
.el-switch .el-switch__label--left{z-index: 1;right:-10px}
.pagination{margin:0 auto;width:671px;margin-top:10px;}
.el-switch .el-switch__label.is-active {
  display: block;
}
</style>