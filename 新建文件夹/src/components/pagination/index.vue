<template>
<div class='main'>
<ul>
    <li @click="goIndex" class="forbiden">首页</li>
    <li @click="goPre">上一页</li>
    <li v-for="(value, i) in arr1" :key="i" @click="go(value)" :class="value==index? 'active':''">{{value}}</li>
    <li @click="goNext">下一页</li>
    <li @click="goLast">尾页</li>
</ul>
  <!-- <div class="jump">
     总共：{{totalCount}}   <input type="text" v-model="jumpIndex" @keyup="checkNum"/><button @click="jump">跳转</button>
  </div> -->
</div>
</template>

<script>

export default {
name:'pagination',
components: {},
props:{
    disCount:{
        type:Number,
        default:1
    },
    totalCount:{
        type:Number,
        default:1
    },
},
data() {
return {
displayCount:this.disCount,//显示页码个数
total:this.totalCount,//总页数
index:1,//当前所在页码
arr1:[], //要显示的页码如：2，3，4，5，6，6
jumpIndex:1
}
},
created(){
    for(var i=1;i<=this.displayCount;i++){
       this.arr1.push(i)
    }
},
computed: {
    
},
watch: {
    disCount(newVal,oldVal){
        if(newVal){
            
            this.displayCount=newVal
            for(var i=1;i<=this.displayCount;i++){
                this.arr1.push(i)
            }
        }
    },
    totalCount(newVal,oldVal){
         
        if(newVal){
            this.total=newVal
        }
    }
},
methods: {


    go(index){
       this.index=index
       
       var length=this.arr1.length;
       
       if(this.index===this.arr1[length-1]){
           
           this.pushArr1()
       }
       if(this.index===this.arr1[0] &&this.index!=1){          
           this.pushArr1()
       }
       this.$emit('handleClick',this.index)
    },
    pushArr1(){
        this.arr1=[]
        var start=this.index-Math.floor(this.displayCount/2)
        
        if(start+this.displayCount>this.total){
            start=this.total-this.displayCount+1
            for(var i=start;i<=this.total;i++){
            this.arr1.push(i)
            
            }
            this.$emit('handleClick',this.index)
        }else{
           if(start<1){start=1}
            for(var i=start;i<start+this.displayCount;i++){
                this.arr1.push(i)
            }
            this.$emit('handleClick',this.index)
        }       
    },
    goNext(){
        if(this.index===this.total){            
        }
       else{
            this.index++
            this.$emit('handleClick',this.index)
            var length=this.arr1.length;
            if(this.index===this.arr1[length-1]){
            this.pushArr1()
        }
       }       
    },
    goPre(){
          if(this.index===1){            
        }
       else{
            this.index--        
            this.$emit('handleClick',this.index)    
            if(this.index===this.arr1[0]){
            this.pushArr1()
        }
       }
    },
    goIndex(){
        this.index=1
        this.$emit('handleClick',this.index)
        this.pushArr1()
    },
    goLast(){
        var length=this.arr1.length;
        this.index=this.total
        this.$emit('handleClick',this.index)
        this.pushArr1()
    }
},
}
</script>
<style scoped>
.main{width:100%;}
ul{display: flex;width:682px;justify-content: center;margin:0 auto;}
li{border:1px solid black;width: 60px;text-align: center;cursor:pointer;user-select: none;}
.active{background-color: blueviolet;}
li:hover{background-color:blueviolet;}
</style>