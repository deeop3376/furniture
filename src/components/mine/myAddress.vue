<template>
<div class='main'>
    <div class="content">
        <ul>
            <li class="shipping" v-for="(item,i) in myAddress" :key="i">
                <div class="name">收件人： <span class="shippingInfo">{{item.name}}</span></div>
                <div class="address">地址：<span class="shippingInfo"> {{item.address}}</span></div>
                <div class="phone">手机号：<span class="shippingInfo"> {{item.phone}}</span></div>
            </li>
        <li class="newAddress" @click="showWindow">添加地址</li>
    </ul>
    
    <el-dialog width="30%" title="添加收货地址" :visible.sync="modelShow" 
    		   :show-close="true"
               :close-on-click-modal="true"
               :close-on-press-escape="false"
               
    >
        <el-form  :model="shipping" size="small" label-width="100px">
            <el-row>
                <el-form-item label="收件人姓名：" >
                    <el-input class="search-input" v-model="shipping.name"/>
                </el-form-item>
                <el-form-item label="省份：">
                    <select @change="getProvince">
                        <option value="">请选择省份</option>
                        <option :value="item" v-for="(item,i) in province" :key="i">{{item}}</option>
                    </select>
                </el-form-item>
                <el-form-item label="城市：">
                    <select @change="getVillage">
                        <option value="">请选择市</option>
                        <option :value="item.citysName" v-for="(item,i) in village" :key="i">{{item.citysName}}</option>
                    </select>
                </el-form-item>
                <el-form-item label="具体地址：">
                    <el-input type="text" class="search-input" v-model="nowDetailAddress"/>
                </el-form-item>

                <el-form-item label="手机号：">
                    <el-input type="text" class="search-input" v-model="shipping.phone"/>
                </el-form-item>
            </el-row>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button type="primary" @click="addShipping">确 定</el-button>
        </div>
    </el-dialog>
    </div>

</div>
</template>

<script>

export default {
name:'myAddress',
components: {},
data() {
return {
    myAddress:[],
    shipping:{
        name:'',
        address:'',
        phone:0
    },
    modelShow:false,
    province:[],
    village:[],
    allProvince:[],
    detailAddress:'',
    nowProvince:'',
    nowVillage:'',
    nowDetailAddress:''
}
},

watch: {},
methods: {
    getProvince(e){
        
        this.nowProvince=e.target.value
        for(var i=0;i<this.allProvince.length;i++){
                if(this.allProvince[i].provinceName==this.nowProvince){
                    this.village=this.allProvince[i].citys
                   
                }
            }
    },
    getVillage(e){
        this.nowVillage=e.target.value
       
    },
    showWindow(){
        this.modelShow=true
        
        this.axios.get('/api2/user/getCity').then((res)=>{
            
            this.allProvince=res.data.provinces
            for(var i=0;i<res.data.provinces.length;i++){
                this.province.push(res.data.provinces[i].provinceName)
            }
            
        })
    },
    addShipping(){
        
        this.modelShow=false
        this.shipping.address=this.nowProvince+this.nowVillage+this.nowDetailAddress
        this.axios.post('/api2/user/addShipping',{
            shipping:this.shipping,
            userId:window.sessionStorage.getItem('userId')
        }).then((res)=>{
            if(res.data.status===0){
                this.axios.get('/api2/user/getShipping?userId='+window.sessionStorage.getItem('userId')).then((res)=>{
                        if(res.data.status===0){
                            this.myAddress=res.data.data
                        
                        }else{
                            console.log('failed')
                        }
                    })
            }else{
               console.log('failed')
            }
        })
    }
},
created() {
   
    this.axios.get('/api2/user/getShipping?userId='+window.sessionStorage.getItem('userId')).then((res)=>{
        if(res.data.status===0){
            this.myAddress=res.data.data
           
        }else{
            console.log('failed')
        }
    })
}, 
}
</script>
<style scoped>

.shipping{border:1px solid grey;width:90%;margin:0 auto;margin-top: 10px;background-color: #ECEDF0;border-radius:3px;}
.newAddress{border:1px solid grey;width:30%;margin:0 auto;margin-top: 10px;background-color: #ECEDF0;border-radius:3px;
height: 70px;line-height: 70px;text-align: center;cursor: pointer;}
.shippingInfo{font-size: 10px;}
</style>