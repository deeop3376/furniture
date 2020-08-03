<template>
<div class='main'>
    <div class="left_body">

        <ul class="goodslist">
            <li class="goods_item" @mouseenter="sub_goodslist1(item)" @mouseleave="hide_goodslist"
            v-for="item in bigSortList" :key="item._id">
                <div class="item_content">{{item}}</div>
                <div class="arrow"><i class="el-icon-arrow-right arror"></i></div>
            </li>          
        </ul>       
    </div>
    <div class="right_body">
        <div class="lunbo">
            <ul class="img_list">
                <li class="img_item active1"><img src="@/assets/sofa2.jpg" /></li>
                <li class="img_item"><img src="@/assets/sofa3.jpg" /></li>
                <li class="img_item"><img src="@/assets/sofa4.jpg" /></li>
            </ul>
            <!-- <input type="button" @click="gonext" value=">" />
           <input type="button" @click="gopre"  value="<" /> -->
           <i class="el-icon-arrow-left gopre" @click="gopre"></i>
           <i class="el-icon-arrow-right gonext" @click="gonext"></i>
        </div>
        <div :class="sub_goodslist" @mouseenter="keep_sub" @mouseleave="hide_goodslist">
            <ul class="item_ul">
                <router-link tag="li" :to="{path:'/goodslist',query:{smallSort:item.smallSort}}" class="item_li" v-for="item in smallSortList" :key="item._id">
                    {{item.smallSort}}
                </router-link>
            </ul>
        </div>
    </div>
</div>
</template>

<script>

export default {
name:'hotSale',
components: {},
data() {
return {
    sub_menu:'',
    index:0,
    imglists:[],
    bigSortList:[],//左侧的大分类
    smallSortList:[],//大分类下的小分类
    sub_goodslist:'sub_goodslist'
}
},
created(){
    this.axios.get('/api2/sort/getBigSort').then((res)=>{
        if(res.data.status===0){
             this.bigSortList=res.data.data
            //  for(var i=0;i<res.data.data.length;i++){
            //         if(this.bigSortList.indexOf(res.data.data[i].bigSort)==-1){
            //             this.bigSortList.push(res.data.data[i].bigSort)
            //         }
                    
            //     }
           
        }
    })
},
watch: {},
methods: {
    findGoodsBySmallSort(){
        this.$router.push('/goodslist')
    },
    keep_sub(){
        this.sub_goodslist='sub_goodslist active'
    },
    sub_goodslist1(bigSort){
       
        this.sub_goodslist='sub_goodslist active'
        this.axios.get('/api2/sort/getSmallSort?bigSort='+bigSort).then((res)=>{
            if(res.data.status===0){
                this.smallSortList=res.data.data
               
                this.$nextTick(function(){
                    
                })
            }
        })
    },
    hide_goodslist(){
        // document.querySelector('.sub_goodslist').className='sub_goodslist'
        this.sub_goodslist='sub_goodslist'
    },
     gonext(){
         this.index++
        if(this.index>=this.imglists.length){this.index=0}
        for(var i=0;i<this.imglists.length;i++){
            this.imglists[i].className='img_item'
        }
         
        this.imglists[this.index].className='img_item active1'
       
    },
    gopre(){
        this.index--
         if(this.index<0){this.index=this.imglists.length-1}
        for(var i=0;i<this.imglists.length;i++){
            this.imglists[i].className='img_item'
        }
        this.imglists[this.index].className='img_item active1'
        
    }
     
},
mounted(){
   
    this.imglists=document.querySelectorAll('.img_item')
    setInterval(this.gonext,3000)
}
}
</script> 
<style scoped>
.main{display: flex;margin:0 auto;}
.left_body{flex:1;height: 500px;background-color: #272E43;}
.goodslist{display: flex;flex-direction: column;height: 100%;}
.goods_item{flex:1;width: 100%;display: flex;align-items: center;cursor: pointer;}
.item_content{width: 80%;margin: 0 auto;display: flex;justify-content: space-between;color:white;font-size: 20px;}
.goods_item:hover{background-color:#313F6B;}
.right_body{flex:3;height: 500px;border:1px solid #ccc;position: relative;}
.sub_goodslist{height: 100%;background-color: #777D90;position:absolute;visibility: hidden;
width:0px;overflow: hidden;transition: all .5s ease-in-out;}
.item_ul{display:flex;flex-direction: column;flex-wrap:wrap;}
.item_li{width:200px;height: 50px;line-height: 50px;text-align: center;color:white;cursor: pointer;}
.item_li:hover{background-color: #272E43}
.active{visibility: visible;z-index: 155;width:200px;}
.img_item{position: absolute;height: 500px;width: 100%;visibility: hidden;opacity: 0;transition: all 1s ease-out;z-index: 7;}
.img_item>img{height: 500px;width: 100%;}
input{position:absolute;z-index: 19;}
input:last-child{left:100px;}
.active1{visibility: visible;opacity: 1;}
.gonext{position:absolute;z-index: 19;font-size: 60px;top:220px;color:gray;cursor: pointer;left:850px;}
.gonext:hover{color:black;}
.gopre{position:absolute;z-index: 19;font-size: 60px;top:220px;color:gray;cursor: pointer;}
.gopre:hover{color:black;}
.arror{font-size: 30px;color:grey;position: relative;left:-50px;}
</style> 