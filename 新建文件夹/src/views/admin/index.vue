<template>
<div class='main'>
   
        <div class="tou"><h1>网上商城后台管理系统</h1></div>
        <!-- <div class="main_body">
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
        </div> -->
        <el-row class="tac">

  <el-col :span="3">
    
    <el-menu
      :default-openeds='["1","2","3"]'
      class="el-menu-vertical-demo"
      
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b">
      <el-menu-item index="4"> <i class="el-icon-location"></i>总览</el-menu-item>
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>商品管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="1-1">
            <router-link tag="span" to="/bs/goods">查看商品</router-link>
          </el-menu-item>
           <el-menu-item index="1-2">
            <router-link tag="span" to="/bs/addGood">添加商品</router-link>
          </el-menu-item>
           <el-menu-item index="1-3">
            <router-link tag="span" to="/bs/addSort">添加分类</router-link>
          </el-menu-item>
        </el-menu-item-group>
       
      </el-submenu>
      <el-submenu index="2">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>订单管理</span>
        </template>
        <el-menu-item-group>
         
          <el-menu-item index="2-1">
           
            <router-link tag="span" to="/bs/orders">查看订单</router-link>
            </el-menu-item>
          <el-menu-item index="2-2">订单统计</el-menu-item>
        </el-menu-item-group>
       
      </el-submenu>
      <el-submenu index="3">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>用户管理</span>
        </template>
        <el-menu-item-group>
         
          <el-menu-item index="3-1">
            <router-link tag="span" to="/bs/users">查看用户</router-link>
          </el-menu-item>
          <el-menu-item index="3-2">用户统计</el-menu-item>
        </el-menu-item-group>
       
      </el-submenu>
    </el-menu>
  </el-col>
  <el-col :span="21">
      
                
                    <router-view/>
                
            
  </el-col>
</el-row>
</div>
</template>

<script>

export default {
name:'',
components: {},
data() {
return {
 arr:[1,2,3,4,5]
}
},
computed: {},
watch: {},
methods: {
    viewGood(){
        this.router.push()
    }
},
}
</script>
<style scoped>
.el-menu-item{min-width:150px;}
.tou{height: 50px;background-color: teal;}
.main_body{display: flex;}
.aside{width: 300px;height: 580px;background-color: #34495E;border-radius:10px;margin: 10px 10px;color:#ABB4BE;}
.aside_item{height: 40px;line-height: 40px;text-align: center;}
.aside_item:hover{background-color: #EDEDED}
.content{width:1030px;height:580px;background-color: white;border-radius:10px;margin-top:10px;overflow: scroll;}
</style>