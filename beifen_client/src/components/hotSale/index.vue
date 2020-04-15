<template>
<div class='main'>
    <div class="left_body">
        <!-- <div class="left_top"></div>
        <div class="left_bottom"></div> -->
        <ul class="goodslist">
            <li class="goods_item" @mouseenter="sub_goodslist" @mouseleave="hide_goodslist"><div class="item_content">浴室</div></li>
            <li class="goods_item" @mouseenter="sub_goodslist" @mouseleave="hide_goodslist"><div class="item_content">卧室</div></li>
            <li class="goods_item" @mouseenter="sub_goodslist" @mouseleave="hide_goodslist"><div class="item_content">客厅</div></li>
           <li class="goods_item" @mouseenter="sub_goodslist" @mouseleave="hide_goodslist"><div class="item_content">浴室</div></li>
            <li class="goods_item" @mouseenter="sub_goodslist" @mouseleave="hide_goodslist"><div class="item_content">卧室</div></li>
            <li class="goods_item" @mouseenter="sub_goodslist" @mouseleave="hide_goodslist"><div class="item_content">客厅</div></li>
            <li class="goods_item" @mouseenter="sub_goodslist" @mouseleave="hide_goodslist"><div class="item_content">浴室</div></li>
            <li class="goods_item" @mouseenter="sub_goodslist" @mouseleave="hide_goodslist"><div class="item_content">卧室</div></li>
            <li class="goods_item" @mouseenter="sub_goodslist" @mouseleave="hide_goodslist"><div class="item_content">客厅</div></li>
            <li class="goods_item" @mouseenter="sub_goodslist" @mouseleave="hide_goodslist"><div class="item_content">客厅</div></li>
        </ul>
        
    </div>
    <div class="right_body">
        <div class="lunbo">
            <ul class="img_list">
                <li class="img_item active1"><img src="@/assets/sofa2.jpg" /></li>
                <li class="img_item"><img src="@/assets/sofa3.jpg" /></li>
                <li class="img_item"><img src="@/assets/sofa4.jpg" /></li>
            </ul>
            <input type="button" @click="gonext" value=">" />
           <input type="button" @click="gopre"  value="<" />
        </div>
        <div class="sub_goodslist">
            <ul>
                <li>{{sub_menu}}</li>
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
    imglists:[]
}
},
computed: {},
watch: {},
methods: {
    sub_goodslist(ev){
        document.querySelector('.sub_goodslist').className='sub_goodslist active'
        this.sub_menu=ev.target.childNodes[0].childNodes[0].innerHTML
    },
    hide_goodslist(){
        document.querySelector('.sub_goodslist').className='sub_goodslist'
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
        
    },
     test(){console.log('1111111')}
},
mounted(){
   
    this.imglists=document.querySelectorAll('.img_item')
    setInterval(this.gonext,3000)
}
}
</script>
<style scoped>
.main{display: flex;margin:0 auto;}
.left_body{flex:1;height: 500px;background-color: darkslategray;}
.goodslist{display: flex;flex-direction: column;height: 100%;}
.goods_item{flex:1;width: 100%;display: flex;align-items: center;}
.item_content{width: 80%;margin: 0 auto;display: flex;justify-content: space-between;color:white}
.goods_item:hover{background-color:chocolate;}
.right_body{flex:3;height: 500px;border:1px solid #ccc;position: relative;}
.sub_goodslist{width: 200px;height: 100%;background-color: crimson;position:absolute;visibility: hidden;}
.active{visibility: visible;z-index: 55;}
.img_item{position: absolute;height: 500px;width: 100%;visibility: hidden;opacity: 0;transition: all 1s ease-out;z-index: 7;}
.img_item>img{height: 500px;width: 100%;}
input{position:absolute;z-index: 19;}
input:last-child{left:100px;}
.active1{visibility: visible;opacity: 1;}
</style> 