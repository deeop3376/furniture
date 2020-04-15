<template>
<div class="main_body1">
<div class='main'>
    <div class="logo">
        <img src="@/assets/logo1.jpg">
    </div>
    <div class="content">
        <ul class="sort">
            <!-- <li v-for="item in bigSortList" :key="item._id" class="sort_item">{{item.bigSort}}</li> -->
            <li class="sort_item" v-for="item in indexSortList" :key="item._id" @mouseover="pullList(item.smallSort)"
             @mouseout="hideList">{{item.smallSort}}</li>
            
        </ul>
        
    </div>
    
    <div class="search">
        <input class="search_text" type="text"><div class="search_btn"></div>
    </div>
</div>
<div class="down_item" @mouseout="hideList">
        <div :class="sub_sortinfo"  @mouseover="keepDown">
            <ul class="sub_sort">
                <!-- <li v-for="item in smallSort" :key="item._id" @click="findGoodsBySmallSort(item.smallSort)" class="sub_sort_item">{{item.smallSort}}</li> -->
                <router-link :to="{path:'/goodsinfo',query:{goodsId:item._id}}" tag="li" class="sub_sort_item" v-for="item in indexGoods" :key="item._id" >
                    <div class="sub_good">
                        <div class="goodImg">
                            <img class="good_img" :src="item.img[0].imgUrl" alt="商品图片" />
                        </div>
                        <div class="good_info">
                            {{item.name}}
                        </div>
                    </div>
                    
                </router-link>
                
            </ul>
        </div>
    </div>
</div>
</template>

<script>

export default {
name:'sort',
components: {},
data() {
return {
   
    smallSort:[],
    sub_sortinfo:'sub_sortInfo',
    indexSortList:[],
    indexGoods:[]
}
},
mounted() {
 
},
created(){
     this.axios.get('/api2/indexSmallSort/getIndexSmallSort').then((res)=>{
         if(res.data.status===0){
             this.indexSortList=res.data.data
             
         }
     })
},
methods: {
    findGoodsBySmallSort(smallSort){
        
        this.$router.push('/goodslist/'+smallSort)
    },
    pullList(smallSort){
        
        var self=this
        var timer=null
                self.axios.get('/api2/goods/getIndexGoods?indexSmallSort='+smallSort).then((res)=>{
                    if(res.data.status===0){
                        self.indexGoods=res.data.data               
                        self.$nextTick(function(){                
                            self.sub_sortinfo='sub_sortInfo active'                  
                        })
                    }
                })
    },

    hideList(){
        this.sub_sortinfo='sub_sortInfo'
    },
    keepDown(){
        this.sub_sortinfo='sub_sortInfo active'
    }
},
}
</script>
<style scoped>
*{box-sizing: border-box;}
.main_body1{width: 100%;}
.main{width: 100%;position: relative;display: flex;justify-content: space-around;}
.logo{height: 100px;flex:0.75;display:flex;align-items: center;}
.content{height: 100px;flex:2.25;}
.search{height: 100px;flex:1;}
.sort{display: flex;height: 100px;}
.sort_item{flex:1;line-height: 100px;text-align: center;}
/* .sort_item:not(:last-child){border-right: 1px grey solid;}    */

.down_item{position: relative;}
.sub_sortInfo{position: absolute;z-index: 99;visibility:hidden;opacity: 0;width: 100%;
transition: all .4s ease;background-color: white;border-top:1px solid #ccc;}
.sub_sort{display: flex;height: 210px;width: 90%;flex-wrap: wrap;margin:0 auto;}
.sub_sort_item{width: 200px;}
.active{opacity: 1;visibility: visible;}

.search{display: flex;align-items: center;}
.search_text{height: 50px;flex:4}
.search_btn{height: 50px;flex:1;background-color: brown;}
.good_img{width: 150px;height: 150px;}
.sub_good{width: 150px;margin:0 auto;text-align: center;}
.vline{display: inline-block;border-left: 1px solid #ccc;height: 150px;margin-top:20px;}

</style>