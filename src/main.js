import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '@/styles/index.less'
import router from './router/index'

Vue.config.productionTip = false
Vue.use(ElementUI)

// 添加导航守卫
// to: 目标路由对象,里面的一个属性path就是目标路由的path值
router.beforeEach((to, from, next) => {
  // console.log(to, from, next)
  // 获取token
  let mytoken = localStorage.getItem('wanyufang')
  // console.log(mytoken)
  // 判断
  if (mytoken || to.path === '/login') {
    // 下一步
    next()
  } else {
    // 否则就重定向
    next({ path: '/login' })
  }
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
