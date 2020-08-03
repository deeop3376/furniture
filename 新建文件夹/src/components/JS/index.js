import Vue from 'vue';
import messageBox from './messageBox';

var MessageBox= (opts)=>{
    // var defaults={
    //     title:'',
    //     content:'',
    //     ok:'',
    //     cancel:'',
    //     handleOk:null,
    //     handleCancel:null
    // }
    var MyComponent=Vue.extend(messageBox)

    var vm=new MyComponent({
        el:document.createElement('div'),
        data:{
            title:opts.title,
            content:opts.content,
            ok:opts.ok?opts.ok:null,
            cancel:opts.cancel?opts.cancel:null
        },
        methods:{
            handleOk(){
                if(opts.handleOk){
                    opts.handleOk()
                    document.body.removeChild(vm.$el)
                }
            },
            handleCancel(){
                if(opts.handleCancel){
                    opts.handleCancel()
                    document.body.removeChild(vm.$el)
                }
            }
        }
    })
    document.body.appendChild(vm.$el)
 }

 export default MessageBox