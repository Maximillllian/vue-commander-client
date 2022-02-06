import Vue from 'vue'
import App from './App.vue'
import axios from './plugins/axios'
import './assets/css/normalize.css'
import 'material-icons/iconfont/material-icons.css';

Vue.config.productionTip = false
Vue.use(axios)

new Vue({
  render: h => h(App),
}).$mount('#app')
