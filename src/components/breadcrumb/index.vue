<template>
<div class='main'>
  <el-breadcrumb separator-class="el-icon-arrow-right">
    <el-breadcrumb-item :to="item.path" v-for="(item,i) in breadList" :key="i">{{item.meta.title}}</el-breadcrumb-item>
  </el-breadcrumb>
</div>
</template>

<script>

export default {
name:'breadcrumb',
components: {},
data() {
return {
    breadList: [] // 路由集合
}
},
computed: {},
watch: {
    $route() {
   this.getBreadcrumb();
  }
},
methods: {
  //   isHome(route) {
  //  return route.name === "home";
  // },
  getBreadcrumb() {
  //  let matched = this.$route.matched;
  //  //如果不是首页
  //  if (!this.isHome(matched[0])) {
  //   matched = [{ path: "/", meta: { title: "首页" } }].concat(matched);
  //  }
  //  this.breadList = matched;
   
  let matched = this.$route.matched.filter(item => item.name)
  this.breadList = matched
  }
},
created() {
  this.getBreadcrumb();
 }
}
</script>
<style scoped>
.main /deep/ .el-breadcrumb-item{color:red;}
</style>