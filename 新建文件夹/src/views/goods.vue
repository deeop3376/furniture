<template>
<div class='main'>
    <tou/>
<sort />
<goodsinfo />
</div>
</template>

<script>
import goodsinfo from '@/components/goodsinfo'
import sort from '@/components/sort'
import tou from "@/components/header";
export default {
name:'goods',
components: {
    goodsinfo,
    sort,
    tou
},
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

</style>