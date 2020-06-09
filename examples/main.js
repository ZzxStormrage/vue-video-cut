import Vue from 'vue'
import App from './App.vue'
import videoCut from '../packages/index'
// 注册组件库
Vue.use(videoCut)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
