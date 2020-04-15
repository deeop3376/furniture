import Vue from 'vue'
import Router from 'vue-router'
// import admin from './admin/index'
var admin =require('./admin/index')
const routerPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return routerPush.call(this, location).catch(error=> error)
}

Vue.use(Router)

export default new Router(
    {
        mode:'history',
        base:process.env.BASE_URL,
        routes:[
            
            {
                path:'/',
                component:()=>import('@/views/Home')
            },
            {
                path:'/logOrreg',
                component:()=>import('@/components/login'),
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
                path:'/register',
                component:()=>import('@/components/register')
            },
            {
                path:'/cart',
                component:()=>import('@/components/cart')
            },
            
           {
               path:'/my',
               component:()=>import('@/views/my.vue'),
               children:[
                   {
                       path:'myInfo',
                       component:()=>import('@/components/mine/myinfo')
                   },
                   {
                    path:'myOrder',
                    component:()=>import('@/components/mine/myOrder')
                }
                ]
           },
           {
            path:'/goodslist/',///goodslist/:smallSort
              
            component:()=>import('@/components/goodslist')
            },
            {
                path:'/hotSale',
                component:()=>import('@/components/hotSale')
            },
            {
                path:'/goodsinfo',
                component:()=>import('@/components/goodsinfo')
            },
            {
                path:'/order',
                component:()=>import('@/components/order')
            },
            {
                path:'/addGoods',
                component:()=>import('@/views/admin/goods')
            },
            admin,
            {
                path:'/page',
                component:()=>import('@/components/pagination')
            }
        ]
    }
)