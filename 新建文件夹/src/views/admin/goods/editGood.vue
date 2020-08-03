<template>
<div class='main'>
    
<div class="good_info">
    <!-- 
        商品名称 库存 价格 
     -->
     <h2>添加商品</h2>
    <div class="form_item">
        名称： <input type="text" v-model="goodName" />
    </div>
    <div class="form_item">
        描述： <input type="text" v-model="goodDesc" />
    </div>
    <div class="form_item">
        价格： <input type="text" class="priceNum" v-model="goodPrice" />
        库存： <input type="text" class="priceNum" v-model="goodCount" />
    </div>

    <div class="form_item">
        大分类： <select @change="getBigSort">
            <option value="">请选择大分类</option>
            <option :value="item.bigSort" v-for="(item,i) in bigSort" :key="i">{{item.bigSort}}</option>
        </select>
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
      <br/>
      <div class="toSubmit" @click="toSubmit1">
          提交
      </div>
     

       <!-- <div class="toSubmit" @click="toSubmit">
          测试
      </div>
      <div class="toSubmit" @click="cancelAxios">
          cancel
      </div> -->
</div>

</div>
</template>

<script>

export default {
name:'editGood',
components: {},
data() {
    return{
        // url:'',
        imgs:[],
        // goodInfo:'',
         bigSort:[],
        // chooseBigSort:'',
        // chooseSmallSort:'',
        // smallSort:[],
        formdata:new FormData(),
        goodName:'的名字',
        goodPrice:666,
        goodCount:999,
        goodDesc:'这是一个描述',
        bigSort:'',
        smallSort:'',
        newSortId:'',
        
    }
},
 
methods: {
    // toTest(){
    //     var query='5e9ab61e33dc051414295361'
    //     this.axios.get('/api2/goods/getIndexGoods?sortId=5e9ab51633dc051414295350').then((res)=>{
    //         if(res.data.status===0){
    //             console.log(res.data.data)
    //         }else{
    //             console.log(res.data.msg)
    //         }
    //     })
    // },
    toSubmit(){
        
       
        var option={
            headers:{
                'Content-Type':'multipart/form-data'
            }
        }
       this.axios.post('/api2/image/uploadGoodImg',this.formdata,option).then((res)=>{
           console.log('aaaaa')
           this.axios.post('/api2/sort/addSort',{bigSort:this.bigSort,smallSort:this.smallSort}).then((res)=>{
           console.log('bbbbbbbbb')
                  this.axios.post('/api2/goods/addGoods',{
           name:this.goodName,
           desc:this.goodDesc,
           price:this.goodPrice,
           count:this.goodCount
       }).then((res)=>{
           console.log('ccccccccccc')
       })
       })
       })
       
    },
    toSubmit1(){
        
       
        var option={
            headers:{
                'Content-Type':'multipart/form-data'
            }
        }
        console.log(this.formdata.entries().next().done)
       
        this.axios.post('/api2/goods/updateGood',{
           name:this.goodName,
           desc:this.goodDesc,
           price:this.goodPrice,
           count:this.goodCount,
           imgId:this.goodInfo.imgId,
           sortId:this.newSortId,
           goodId:this.goodInfo._id
        }).then((res)=>{
                
               if(res.data.status===0&&this.formdata.entries().next().done!=true){
                   this.axios.post('/api2/image/updateImage',this.formdata,option).then((res)=>{
                       if(res.data.status===0){
                           alert('success')
                       }
                   })
               }
               else{
                   alert('without pic successs')
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
        this.axios.get('/api2/sort/getSortIdBySmallSort?smallSort='+this.chooseSmallSort).then((res)=>{
            if(res.data.status===0){
                this.newSortId=res.data.data.sortId
            }
        })
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
        this.formdata.get()
        //  this.formdata.delete('')
        console.log(i)
    },
    // cancelAxios(){
    //     var self=this;
    //     const CancelToken = this.axios.CancelToken
    //     const source=CancelToken.source();
    //     this.axios.get('http://www.baidu.com',{cancelToken:source.token})
    //     .catch(function(e){
    //         if(self.axios.isCancel(e)){
    //             console.log('request cancel',e.message)
    //         }else{
    //             console.log('error')
    //         }
    //     });
    //     // source.cancel();
    // }
},
created(){
    // var self=this;
    this.axios.get('/api2/sort/getBigSort').then((res)=>{
        if(res.data.status===0){
            this.bigSort=res.data.data
        }
    })
    
},
mounted(){
    
    this.goodInfo= JSON.parse(this.$route.params.good)
    this.goodName=this.goodInfo.name
    this.goodPrice=this.goodInfo.price
    this.goodCount=this.goodInfo.count
    this.goodDesc=this.goodInfo.desc
    // var temp=JSON.parse(JSON.stringify(this.goodInfo.img))
    var temp=this.goodInfo.img
    for(var i=0;i<temp.length;i++){
        this.imgs.push(temp[i])
    }
   
},
}
</script>
<style scoped>
.main{width:100%;}
.good_info{width:500px;margin:0 auto;}
.form_item{margin-top:30px;}
.form_item>select{width:150px;height: 50px;}
input{width:400px;height:50px;border:none;border-bottom: 1px solid grey;outline-style: none;}
.priceNum{width:170px;}
.img_container{width:400px;margin:0 auto;}
.good_imgs{display:flex;flex-wrap:wrap;}
.good_imgs>li{width:82px;height: 102px;border:1px solid grey;position: relative;margin-top:10px;}
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