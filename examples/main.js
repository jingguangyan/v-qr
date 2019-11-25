import Vue from 'vue'
import App from './App.vue'
import Vqr from '@/index'
Vue.use(Vqr)

Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('#app')
