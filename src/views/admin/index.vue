<template>
<div class='main'>
   
        <div class="tou"><h1>网上商城后台管理系统</h1></div>
        <div class="main_body">
            <div class="aside">
                <ul>
                    <router-link tag="li" to="/bs/goods" class="aside_item">
                    <i class="el-icon-s-goods"></i>商品管理</router-link>
                    <router-link tag="li" to="/bs/orders" class="aside_item">
                     <i class="el-icon-s-order"></i>订单管理</router-link>
                    <router-link tag="li" to="/bs/users" class="aside_item">
                    <i class="el-icon-user-solid"></i>用户管理</router-link>
                </ul>
            </div>
            <div class="content">
                
                    <router-view/>
               
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

}
},
computed: {},
watch: {},
methods: {

},
}
</script>
<style scoped>
.tou{height: 50px;background-color: teal;}
.main_body{display: flex;}
.aside{width: 300px;height: 580px;background-color: #34495E;border-radius:10px;margin: 10px 10px;color:#ABB4BE;}
.aside_item{height: 40px;line-height: 40px;text-align: center;}
.aside_item:hover{background-color: #EDEDED}
.content{width:1030px;height:580px;background-color: white;border-radius:10px;margin-top:10px;overflow: scroll;}
</style>