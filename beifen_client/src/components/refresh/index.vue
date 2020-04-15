<template>
<div class='main'></div>
</template>

<script>

export default {
name:'refresh',
components: {},
beforeRouteEnter(to,from,next){
    next(vm => {
                vm.$router.replace(from.path)
            })
}
}
</script>
<style scoped>

</style>