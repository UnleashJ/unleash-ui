import Vue from 'vue'
import App from './App.vue'
import UnleashUI from '../packages'
Vue.use(UnleashUI)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
