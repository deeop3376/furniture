<template>
  <div class="main">
    <div class="content">
      <input type="text" />
      <button>搜索</button>
    </div>
  </div>
</template>

<script>

export default {
  name: "search",
  components: {},
  data() {
    return {};
  },
  computed: {},
  watch: {},
  methods: {}
};
</script>
<style scoped>
.main{
    width:100%;
    display: flex;
}
.main .content{
    margin:0 auto
}
.main .content input {
  height: 40px;
  width: 500px;
  font-size:18px;
}
.main .content button {
  height: 42px;
  width: 100px;
}
</style>