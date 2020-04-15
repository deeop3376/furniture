<template>
<div class='main'>
    
   <div>
    <ul class="img">
        <li class="item">
            <img src="@/assets/sofa1/a.jpg">
        </li>
        <li class="item">
            <img src="@/assets/sofa1/b.jpg">
        </li>
        <li class="item">
            <img src="@/assets/sofa1/c.jpg">
        </li>
        <li class="item">
            <img src="@/assets/sofa1/d.jpg">
        </li>
    </ul>
    
   </div>
   <div>
       <ul class="cir">
        <li data-index='0' class="circle"></li>
        <li data-index='1' class="circle"></li>
        <li data-index='2' class="circle"></li>
        <li data-index='3' class="circle"></li>
    </ul>
   </div>
</div>

</template>

<script>

export default {
name:'lunbo',
components: {},
data() {
return {
 
}
},
computed: {},
created(){

},
mounted() {
      var item=document.querySelectorAll('.item')
      var circle=document.querySelectorAll('.circle')
    var index=0
    function changeImg(index){
        
        if(item[index]!=undefined){
            item[index].className='item active'           
        }
        
    }
    function clearIndex(){
        for(var i=0;i<item.length;i++){
                item[i].className='item'
            
        }
    }
    for(var j=0;j<item.length;j++){
        circle[j].addEventListener('click',function(){
            var ai=this.getAttribute('data-index')
            index=ai
        })
    }
    setInterval(function(){
        
        clearIndex()
        changeImg(index)
        index=index+1
        if(index>=item.length){index=0}
        
    },3000)
},
beforeUpdate(){
      
},
methods: {
    
},
}
</script>
<style scoped>
img{width: 800px;height: 400px;}
.img{position: relative;width: 800px;height: 400px;overflow: hidden;}
.item{position:absolute;opacity: 0;transition: opacity 1s ease-out;}

.active{opacity: 1;z-index: 2;}
.cir{display: flex;}
.circle{width: 10px;height: 10px;border-radius:50%;border:1px solid grey;z-index: 30;margin-left: 10px;
position: relative;top:380px;left: -150px;}
.active1{background-color: gray;}
</style>