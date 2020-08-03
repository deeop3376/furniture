import Vue from 'vue'

import store from './store'
import axios from 'axios'


import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)
import '../public/main.css'

import App from './App.vue'
import router from './router'
import vueLazyLoad from 'vue-lazyload'

Vue.use(vueLazyLoad,{
  loading:require('./loading.jpg')
})

axios.interceptors.request.use(
  config=>{
    if(window.localStorage.getItem('ttoken')){
      config.headers.ttoken=window.localStorage.getItem('ttoken')
        
    }
    return config
  },
  err=>{
    console.log('lan jie shibai')
  }
)
if(window.localStorage.getItem('ttoken')){
  axios.defaults.headers.common['ttoken'] = window.localStorage.getItem('ttoken')
}

Vue.prototype.axios=axios;
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
