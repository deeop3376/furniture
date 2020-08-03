<template>
<div class='main'>
    <input type="text" placeholder="请输入大分类" v-model="bigSort" />
    <input type="text" placeholder="请输入小分类" v-model="smallSort" />
    <div class="submit" @click="addSort">提交</div>
</div>
</template>

<script>

export default {
name:'addSort',
components: {},
data() {
return {
    bigSort:'',
    smallSort:''
}
},
computed: {},
watch: {},
methods: {
    addSort(){
        if(this.bigSort!==''&&this.smallSort!==''){
            this.axios.post('/api2/sort/addSort',{
                bigSort:this.bigSort,
                smallSort:this.smallSort
            }).then((res)=>{
                if(res.data.status===0){
                    alert('add sort success')
                }
            })
        }
    }
},
}
</script>
<style scoped>

</style>