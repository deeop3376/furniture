export default{
    path:'/my',
    component:()=>import('@/views/my'),
    children:[
        {
            path:'myinfo',
            component:()=>import('@/components/mine/myinfo')
        }
    ]
}