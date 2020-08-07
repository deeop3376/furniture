<template>
  <div class="main_body1">
    <div class="main">
      <div class="logo">
        <img class="logoimg" src="@/assets/logo1.jpg" />
      </div>
      <div class="content">
        <ul class="sort">
          <!-- <li v-for="item in bigSortList" :key="item._id" class="sort_item">{{item.bigSort}}</li> -->
          <li
            class="sort_item"
            v-for="item in indexSortList"
            :key="item._id"
            @mouseover="pullList(item.sortId)"
            @mouseout="hideList"
          >{{item.smallSort}}</li>
        </ul>
      </div>

      <div class="search">
        <input @keyup="searchGood1" class="search_text" v-model="searchWord" type="text" />
        <div @click="searchGood" class="search_btn">
          <i class="el-icon-search"></i>
        </div>
      </div>
    </div>
    <div class="down_item" @mouseout="hideList">
      <!-- <div :class="sub_sortinfo"  @mouseover="keepDown"> -->
      <ul :class="sub_sortinfo" @mouseover="keepDown">
        <!-- <li v-for="item in smallSort" :key="item._id" @click="findGoodsBySmallSort(item.smallSort)" class="sub_sort_item">{{item.smallSort}}</li> -->
        <router-link
          :to="{path:'/goodsinfo',query:{goodsId:item._id}}"
          tag="li"
          class="sub_sort_item"
          v-for="item in indexGoods"
          :key="item._id"
        >
          <div class="sub_good">
            <div class="goodImg">
              <img class="good_img" :src="item.indexImg" alt="商品图片" />
            </div>
            <div class="good_info">{{item.name}}</div>
          </div>
        </router-link>
      </ul>
      <!-- </div> -->
    </div>
  </div>
</template>

<script>
export default {
  name: "sort",
  components: {},
  data() {
    return {
      smallSort: [],
      sub_sortinfo: "sub_sortInfo",
      indexSortList: [],
      indexGoods: [],
      searchWord: ""
    };
  },
  mounted() {},
  created() {
    this.axios.get("/api2/sort/getIndexSmallSort").then(res => {
      if (res.data.status === 0) {
        this.indexSortList = res.data.data;
      }
    });
  },
  activated(){
    this.hideList()
  },
  methods: {
    searchGood1(e){
      if(e.code==='Enter'){
        this.searchGood()
      }
    },
    searchGood() {
      this.$router.push({
        path: "/searchPage",
        query: { searchWord: this.searchWord }
      });
    },
    findGoodsBySmallSort(smallSort) {
      this.$router.push("/goodslist/" + smallSort);
    },
    pullList(sortId) {
      var self = this;
      self.sub_sortinfo = "sub_sortInfo active";
      self.axios.get("/api2/goods/getIndexGoods?sortId=" + sortId).then(res => {
        if (res.data.status === 0) {
          self.indexGoods = res.data.data;
          self.$nextTick(function() {});
        } else {
          self.indexGoods = [];
        }
      });
    },

    hideList() {
      this.sub_sortinfo = "sub_sortInfo";
    },
    keepDown() {
      this.sub_sortinfo = "sub_sortInfo active";
    }
  }
};
</script>
<style scoped>
* {
  box-sizing: border-box;
}
.main_body1 {
  width: 100%;
}
.main {
  width: 100%;
  position: relative;
  display: flex;
  justify-content: space-around;
}
.logo {
  height: 100px;
  flex: 0.75;
  display: flex;
  align-items: center;
}

.content {
  height: 100px;
  flex: 2.25;
}
.search {
  height: 100px;
  flex: 1;
}
.sort {
  display: flex;
  height: 100px;
}
.sort_item {
  flex: 1;
  line-height: 100px;
  text-align: center;
  cursor: pointer;
  font-weight: 700
}
/* .sort_item:not(:last-child){border-right: 1px grey solid;}    */

.down_item {
  position: relative;
  width: 100%;
}
.sub_sortInfo1 {
  position: absolute;
  z-index: 99;
  visibility: hidden;
  width: 100%;
  transition: all 0.4s ease;
  background-color: white;
  border-top: 1px solid #ccc;
}
.sub_sortInfo {
  display: flex;
  height: 0px;
  width: 100%;
  flex-wrap: wrap;
  margin: 0 auto;
  position: absolute;
  z-index: 99;
  visibility: hidden;
  transition: all 0.4s ease;
  background-color: white;
  border-top: 1px solid #ccc;
  overflow: hidden;
  justify-content: center;
}
.sub_sort_item {
  width: 200px;
}
.active {
  visibility: visible;
  height: 200px;
}

.search {
  display: flex;
  align-items: center;
}
.search_text {
  height: 50px;
  flex: 4;
}
.search_btn {
  height: 50px;
  flex: 1;
  background-color: brown;
  text-align: center;
}
.good_img {
  width: 150px;
  height: 150px;
}
.sub_good {
  width: 150px;
  margin: 0 auto;
  text-align: center;
}
.vline {
  display: inline-block;
  border-left: 1px solid #ccc;
  height: 150px;
  margin-top: 20px;
}
.el-icon-search {
  color: white;
  line-height: 50px;
}
</style>