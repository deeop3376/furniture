<template>
<div class='main'>
    order
    <button @click="messageBox">dianji</button>
</div>
</template>

<script>
import MessageBox from '@/components/JS'
export default {
name:'orders',
components: {},
data() {
return {

}
},
computed: {},
watch: {},
methods: {
    messageBox(){
        MessageBox({
            title:'错误',
			content:'登录成功',
			ok:'确定',
			handleOk(){
				console.log('you click OK')
			}
        })
    }
},
}
</script>
<style scoped>

</style>