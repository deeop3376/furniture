<template>
<div class='main'>
    名字<input type="text" v-model="name" /><br/>
    描述<input type="text" v-model="desc" /><br/>
    数量<input type="text" v-model="count" /><br/>
    价格<input type="text" v-model="price" /><br/>
    大分类<input type="text" v-model="bigSort" /><br/>
    小分类<input type="text" v-model="smallSort" /><br/>
    图片地址<input type="text" v-model="imgUrl" /><br/>
    颜色<input type="text" v-model="imgColor" /><br/>
<button @click="toSubmit">提交</button>
<input type="text" v-model="bbsort">
<input type="text" v-model="bbsort">
<input type="text" v-model="bbsort">
<input type="text" v-model="bbsort">
<button @click="addSort">fenlei</button>
</div>
</template>

<script>

export default {
name:'addGoods',
components: {},
data() {
return {
    name:'fff',
    desc:'fff',
    count:0,
    price:0,
    bigSort:'ff',
    smallSort:'ff',
    imgUrl:'ff',
    imgColor:'ff'
}
},
methods: {
    addSort(){
        
        var smallSorts=[{smallSort:'书桌'}]
        var sorts=[{bigSort:'书房',smallSorts:smallSorts}]
        this.axios.post('/api2/sort/addSort',{sorts}).then((res)=>{

        })
    },
    toSubmit(){
        var obj={}
        obj.imgUrl=this.imgUrl
        obj.imgColor=this.imgColor
        var img=[]
        img.push(obj)
        console.log(typeof this.count)
        this.axios.post('/api2/goods/addGoods?a=2',{
            name:this.name,desc:this.desc,count:this.count,price:this.price,bigSort:this.bigSort,smallSort:this.smallSort,img
        }).then((res)=>{
            if(res.data.status===0){
                console.log('success')
            }else{
                console.log('failed')
            }
        })
    }
},
}
</script>
<style scoped>

</style>