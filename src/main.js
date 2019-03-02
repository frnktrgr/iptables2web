import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

window.$ = window.jQuery = require('jquery');

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
