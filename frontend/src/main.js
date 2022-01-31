// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

Vue.config.productionTip = false
//导入element-ui
import ElementUI from 'element-ui'

import 'element-ui/lib/theme-chalk/index.css'
//注册element-ui插件
Vue.use(ElementUI)
import VueResource from 'vue-resource'

Vue.use(VueResource)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
