<template>
<div class='main'>
    <breadcrumb />
<div class="good_info">

     <h2>添加商品</h2>
    <div class="form_item">
        名称： <input type="text" placeholder="请输入商品名" v-model="goodName" />
    </div>
    <div class="form_item">
        规格： <input type="text" placeholder="请输入商品规格" v-model="goodFormat" />
    </div>
    <div class="form_item">
        描述： <input type="text" placeholder="请输入商品描述" v-model="goodDesc" />
    </div>
    <div class="form_item">
        价格： <input type="text" class="priceNum" v-model="goodPrice" />
        库存： <input type="text" class="priceNum" v-model="goodCount" />
    </div>

    <div class="form_item">
        大分类： <select @change="getSmallSort">
            <option value="">请选择大分类</option>
            <option :value="item" v-for="(item,i) in bigSort" :key="i">{{item}}</option>
        </select>
            小分类：
        <select @change="getSortId">
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
      <div class="toSubmit" @click="toSubmit">
          提交
      </div>
     


</div>

</div>
</template>

<script>
import breadcrumb from '@/components/breadcrumb'
export default {
name:'addGood',
components: {breadcrumb},
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
        goodName:'',
        goodPrice:0,
        goodCount:0,
        goodDesc:'',
        bigSort:'',
        smallSort:'',
        newSortId:'',
        imgFiles:[],
        goodFormat:''
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
        // if(this.newSortId!==''){
        //     this.axios.post('/api2/image/uploadGoodImg',this.formdata,option).then((res)=>{
        //           this.axios.post('/api2/goods/addGoods',{
        //                 name:this.goodName,
        //                 desc:this.goodDesc,
        //                 price:this.goodPrice,
        //                 count:this.goodCount,
        //                 sortId:this.newSortId
        //             }).then((res)=>{
        //                 if(res.data.status===0){
        //                     console.log(res.data.data)
        //                 }else{
        //                     alert('failed')
        //                 }
        //             })           
        // })
        // }else{
        //     alert('please choose sort')
        // }
        for(var img of this.imgFiles){
            this.formdata.append('file',img,img.name)
        }
        // console.log(this.formdata.getAll('file'))
        // console.log('-------------------------------------')
       if(this.newSortId!==''){
           
                  this.axios.post('/api2/goods/addGoods',{
                        name:this.goodName,
                        desc:this.goodDesc,
                        price:this.goodPrice,
                        count:this.goodCount,
                        sortId:this.newSortId,
                        guige:this.goodFormat
                    }).then((res)=>{
                        if(res.data.status===0){
                            console.log(res.data.data)
                            this.axios.post('/api2/goods/uploadTest',this.formdata,option).then((res)=>{
                                if(res.data.status===0){
                                    console.log('img success')
                                    alert('success')
                                }
                            })
                        }else{
                            alert('failed')
                        }
                    })           
        
        }else{
            alert('please choose sort')
        }
},

    getSmallSort(e){
        
        this.chooseBigSort=e.target.value
        this.axios.get('/api2/sort/getSmallSort?bigSort='+this.chooseBigSort).then((res)=>{
            if(res.data.status===0){
                this.smallSort=res.data.data
            }
        })
    },
    getSortId(e){
        this.chooseSmallSort=e.target.value
        this.axios.get('/api2/sort/getSortIdBySmallSort?smallSort='+this.chooseSmallSort).then((res)=>{
            if(res.data.status===0){
                this.newSortId=res.data.data.sortId
            }
        })
    },
    uploadImg(e){
        if(e.target.files[0]){
            console.log('111111')
        }else{
            console.log('2222222222')
        }
        this.imgFiles.push(e.target.files[0])
        var filepath=e.target.files[0]
        var binaryData=[]
        binaryData.push(filepath)
            this.url = window.URL.createObjectURL(new Blob(binaryData, {type: "application/zip"})) ;
       
        this.imgs.push(this.url)
        
        
        // this.formdata.append('file',filepath,filepath.name)
      
        
    },
    deleteImg(i){
       
        this.imgs.splice(i,1)
       this.imgFiles.splice(i,1)
        //  this.formdata.delete('')
        console.log(i)
    },
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