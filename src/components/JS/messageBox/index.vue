<template>
<div class="messageBox">
    <h2>{{title}}</h2>
    <p>{{content}}</p>
    <div>
        <div v-if="cancel" @click="handleCancel">{{cancel}}</div>
        <div v-if="ok" @click="handleOk">{{ok}}</div>
    </div>
</div>

</template>

<script>

export default {
name:'messageBox',
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
.messageBox{width:100%;height: 100%;border: 3px solid gray;border-radius: 4px;background-color: greenyellow;box-shadow: hotpink 3px 3px 3px 3px;position: absolute;top:0;left:0;}
.messageBox h2{text-align: center;line-height: 40px;font-size: 18px}
.messageBox p{text-align: center;line-height: 40px}
.messageBox>div{display: flex;position: absolute;bottom: 0;width:100%;border-top: 1px gray solid;}
.messageBox > div div{flex: 1;text-align: center;line-height: 30px;border-right: gray 1px solid}
.messageBox >div div:last-child{border:none}
</style>