import Vue from 'vue'
import Router from 'vue-router'
// import admin from './admin/index'
var admin =require('./admin/index')
const routerPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return routerPush.call(this, location).catch(error=> error)
}

Vue.use(Router)

const router= new Router(
    {
        mode:'history', 
        base:process.env.BASE_URL,
        routes:[
            admin,
            {
                path:'/',
                component:()=>import('@/views/Home'),
                name:'home',
                meta:{title:'首页'}
            },
            {
                path:'/logOrreg',
                component:()=>import('@/components/login'),
                name:'logOrreg',
                meta:{title:'登录注册'},
                children:[
                    {
                        path:'login',
                        component:()=>import('@/components/login/login')
                    },
                    {
                        path:'register',
                        component:()=>import('@/components/login/register')
                    }
                ],
                redirect:'/logOrreg/login'
            },
            
            {
                path:'/cart',
                component:()=>import('@/components/cart'),
                name:'cart',
                meta:{title:'购物车'}
            },
            
           {
               path:'/my',
               component:()=>import('@/views/my.vue'),
               name:'my',
                meta:{title:'我的'},
               children:[
                   {
                       path:'myInfo',
                       component:()=>import('@/components/mine/myinfo'),
                       name:'myInfo',
                       meta:{title:'个人信息'}
                   },
                   {
                        path:'myOrder',
                        component:()=>import('@/components/mine/myOrder'),
                        name:'myOrder',
                        meta:{title:'我的订单'}
                   },
                   {
                       path:'myAddress',
                       component:()=>import('@/components/mine/myAddress'),
                       name:'myAddress',
                       meta:{title:'收货地址'}
                   }
                ]
           },
           {
            path:'/goodslist',///goodslist/:smallSort
              
            component:()=>import('@/components/goodslist'),
            name:'goodslist',
            meta:{title:'商品列表'},
            // children:[
            //     {
            //         path:'goodsinfo',
            //         name:'goodsinfo',
            //         meta:{title:'商品详情'},
            //         component:()=>import('@/components/goodsinfo'),
            //     }
            // ]
            },
            {
                path:'/hotSale',
                component:()=>import('@/components/hotSale'),
                
            },
            {
                path:'/goodsinfo',
                component:()=>import('@/components/goodsinfo'),
                name:'goodsinfo',
                meta:{title:'商品详情'}
            },
            {
                path:'/order',
                component:()=>import('@/components/order')
            }
        ]
    }
)

router.beforeEach((to,from,next)=>{
    if(to.path==='/cart'){
        let token=localStorage.getItem('ttoken')
        if(token===null || token===''){
            next('/logOrreg')
        }else{
            next()
        }
    }else{
        next()
    }
})

export default router