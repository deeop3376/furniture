<template>
<div class='main'>
<div class="good_info">
    <!-- 
        商品名称 库存 价格 
     -->
    <div class="form_item">
        名称： <input type="text" v-model="goodInfo.name" />
    </div>
    <div class="form_item">
        描述： <input type="text" v-model="goodInfo.desc" />
    </div>
    <div class="form_item">
        价格： <input type="text" v-model="goodInfo.price" />
       
    </div>
    <div class="form_item">
        库存： <input type="text" v-model="goodInfo.count" />
    </div>
    <div class="form_item">
        大分类： <select @change="getBigSort">
            <option value="">请选择大分类</option>
            <option :value="item.bigSort" v-for="(item,i) in bigSort" :key="i">{{item.bigSort}}</option>
        </select>
    </div>
    <div class="form_item">
        小分类： 
        <select @change="getSmallSort">
            <option value="">请选择小分类</option>
            <option :value="item.smallSort" v-for="(item,i) in smallSort" :key="i">{{item.smallSort}}</option>
            
        </select>
    </div>
    <p>商品图片：</p>
      <div class="img_container">
          <ul class="good_imgs">
              <li v-for="(item,i) in imgs" :key="i" @click="deleteImg(i)">            
                  <img :src="item">                  
                  <div class="deleteImg">
                      <i class="deleteIcon el-icon-delete"></i>
                  </div>
              </li>
              
              <li>
                  <div class="addImg">
                      <i class="el-icon-plus"></i>
                      <input type="file" name="file" accept="image/jpeg,image/jpg,image/png,image/PNG" @change="uploadImg"/>
                  </div>
              </li>
          </ul>
         
      </div>
      <div class="toSubmit" @click="toSubmit">
          提交
      </div>
</div>

</div>
</template>

<script>

export default {
name:'editGood',
components: {},
data() {
    return{
        url:'',
        imgs:[],
        goodInfo:'',
        bigSort:[],
        chooseBigSort:'',
        chooseSmallSort:'',
        smallSort:[],
        formdata:new FormData()
    }
},
 
methods: {
    toSubmit(){
        
        console.log(this.goodInfo)
        console.log(this.chooseSmallSort)
        var option={
            headers:{
                'Content-Type':'multipart/form-data'
            }
        }
        this.axios.post('/api2/goods/uploadTest',this.formdata,option).then((res)=>{

        })
        this.axios.post('/api2/goods/updateGood',{
            name:this.goodInfo.name,
            price:parseInt(this.goodInfo.price),
            desc:this.goodInfo.desc,
            count:parseInt(this.goodInfo.count),
            bigSort:this.chooseBigSort,
            smallSort:this.chooseSmallSort,
            goodId:this.goodInfo._id
        }).then((res)=>{
            if(res.data.status===0){
                alert('success')
            }else{
                alert('failed')
            }
        })
    },
    getBigSort(e){
        
        this.chooseBigSort=e.target.value
        this.axios.get('/api2/sort/getSmallSort?bigSort='+this.chooseBigSort).then((res)=>{
            if(res.data.status===0){
                this.smallSort=res.data.data
            }
        })
    },
    getSmallSort(e){
        this.chooseSmallSort=e.target.value
    },
    uploadImg(e){
        
        var filepath=e.target.files[0]
        
        var binaryData=[]
        binaryData.push(filepath)
            this.url = window.URL.createObjectURL(new Blob(binaryData, {type: "application/zip"})) ;
       
        this.imgs.push(this.url)
        
        
        this.formdata.append('file',filepath,filepath.name)
      
        
    },
    deleteImg(i){
       
        this.imgs.splice(i,1)
    }
},
created(){
    var self=this;
    this.axios.get('/api2/sort/getBigSort').then((res)=>{
        if(res.data.status===0){
            this.bigSort=res.data.data
        }
    })
},
mounted(){
    
    this.goodInfo= JSON.parse(this.$route.params.good)
    // var temp=JSON.parse(JSON.stringify(this.goodInfo.img))
    var temp=this.goodInfo.img
    for(var i=0;i<temp.length;i++){
        this.imgs.push(temp[i].imgUrl)
    }
   
},
}
</script>
<style scoped>
.main{width:100%;}
.good_info{width:500px;margin:0 auto;}
.form_item{margin-top:30px;}
.form_item>select{width:200px;height: 50px;}
input{width:400px;height:50px;border:none;border-bottom: 1px solid grey;outline-style: none;}
.img_container{width:400px;margin:0 auto;}
.good_imgs{display:flex;flex-wrap:wrap;}
.good_imgs>li{width:80px;height: 100px;border:1px solid grey;position: relative;margin-top:10px;}
.good_imgs>li>img{width:80px;height: 100px;}
.good_imgs>li:not(:last-of-type){margin-right:20px;}
.deleteImg{position: absolute;top:0;left:0;background-color: rgba(0, 0, 0, 0.3);width:80px;height: 100px;
display: flex;justify-content: center;align-items: center;opacity: 0;font-size: 30px;}
.deleteImg:hover{opacity: 1;}
.good_imgs>li:last-of-type{font-size: 30px;text-align: center;line-height: 100px;}
.good_imgs>li:last-of-type:hover{color:#409EFF;cursor:pointer}
input[type=file]{width:80px;height:100px;position:absolute;top:0;left:0;opacity: 0;}
.toSubmit{width:200px;height: 50px;background-color: #008080;margin:0 auto;text-align: center;line-height: 50px;
border-radius:10px;}
</style>