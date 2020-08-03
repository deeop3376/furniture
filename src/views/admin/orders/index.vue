<template>
<div class='main'>
    <h1>商品列表页面</h1>
  <div class="main_body">
    <div class="search">
        <el-input class="searchbox"
        placeholder="请输入内容"
        v-model="searchContent"
        clearable>
        </el-input>
        <el-button type="primary" plain>搜索</el-button>
       
    </div>
        <ul class="goods">
             <li class="good_item" v-for="(item,i) in orderList" :key="i">
                <div class="userId">{{item.userId}}</div>
                <div class="good_name">{{item._id}}</div>
                <div class="good_price">创建时间：{{item.createDate}}</div>
                
                <div class="saleOrNot">
                    <el-switch
                    v-model="item.isSend"
                    active-color="#13ce66"
                    active-text="已发货"
                    inactive-text="未发货"
                    inactive-color="#ff4949" @change="getSaleOrNot(item.isSale)">
                    </el-switch>
                </div>
                
                <div class="delete" @click="deleteOrder(item._id,i)"><i class="el-icon-delete"></i>删除</div>
            </li>
            
             
        </ul>
       
    <div class="pagination"> 
        <pagination :disCount="disCount" :totalCount="totalCount" @handleClick="goIndex"></pagination>
    </div>
    
</div>

</div>
</template>

<script>
import MessageBox from '@/components/JS'
import pagination from '@/components/pagination'
export default {
name:'orders',
components: {pagination},
data() {
return {
    orderList:[],
   nowPageNum:1,
    disCount:0,
    totalCount:0,
}
},
created() {
    this.axios.get('/api2/order/getAllOrder?index=0&&howmany=8').then((res)=>{
        if(res.data.status===0){
            this.orderList=res.data.data
            
            // for(var i=0;i<this.orderList.length;i++){
            //     var time=this.orderList[i].createDate+''
            //     this.orderList[i].createDate=new Date(time).getTime()
            // }
            // console.log(new Date(this.orderList[0].createDate).toLocaleDateString())
        }else{
            alert('get order failed')
        }
    })
},
watch: {},
methods: {
    selectRow(){},
    messageBox(){
        MessageBox({
            title:'错误',
			content:'登录成功',
			ok:'确定',
			handleOk(){
				console.log('you click OK')
			}
        })
    },
    getSaleOrNot(value){
    
    },
    goIndex(payload){
        
        if(this.nowPageNum!=payload){
            var index=payload-1
            this.axios.get('/api2/order/getAllOrder?index='+index+'&&howmany=8').then((res)=>{
                if(res.data.status===0){
                    this.orderList=res.data.data
                    // console.log(this.goodList)
                }else{
                    alert('failed') 
                }
    })
    this.nowPageNum=payload;
        }
    },
    deleteOrder(orderId,i){

    }
},
}
</script>
<style scoped>
.main{width:100%;height: 100%;border:1px solid grey;background-color: white}

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