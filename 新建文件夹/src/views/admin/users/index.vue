<template>
<div class='main'>
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
             <li class="good_item" v-for="(item,i) in userList" :key="i">
                <div class="img">
                    <img :src="item.userHead"/>
                </div>
                <div class="good_name">{{item.username}}</div>
                <div class="good_price">邮箱：{{item.email}}</div>
                <div class="good_count">注册日期：{{item.createDate}}</div>
                
                <!-- <div class="manage" @click="manageGood(i)"><i class="el-icon-setting"></i>编辑</div> -->
                <div class="delete" @click="deleteUser(item._id,i)"><i class="el-icon-delete"></i>删除</div>
            </li>
            
             
        </ul>
       
    <div class="pagination"> 
        <pagination :disCount="disCount" :totalCount="totalCount" @handleClick="goIndex"></pagination>
    </div>
    
</div>
</div>
</template>

<script>

export default {
name:'users',
components: {},
data() {
return {
     disCount:0,
    totalCount:0,
    nowPageNum:1,
    userList:[]
}
},
created() {
    this.axios.get('/api2/user/getAllUser').then((res)=>{
        if(res.data.status===0){
            this.userList=res.data.data
        }
    })
},
watch: {},
methods: {
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
    deleteUser(userId,i){

    }
},
}
</script>
<style scoped>
.main{width:100%;height: 100%;border:1px solid grey;background-color: white}
.main_body{width:1000px;margin-top:30px;border-radius:5px;margin-left:10px;margin:0 auto}
.searchbox{width:300px}
.goods{width:1000px;height:430px;}
.good_item{display: flex;width:100%;justify-content: space-around;align-items: center;background-color: #ECEDF0;
border-radius:5px;}
.good_item:not(:last-of-type){margin-bottom:10px;}
.img,.delete{width:50px;}
.good_price,.good_count{width:200px}
.img,.delete,.good_name{text-align: center;cursor:pointer}
.good_name{width:100px;}
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