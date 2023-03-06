import Vue from 'vue'
import App from './App.vue'

import "./components/vant/index"
import "./components/elementUi/index"


Vue.config.productionTip = false
new Vue({
  render: h => h(App),
}).$mount('#app')
