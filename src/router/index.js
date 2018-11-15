import Vue from 'vue'
import VueResource from 'vue-resource'
import Router from 'vue-router'
import Form from '@/components/Form'
import Ok from '@/components/Ok'
import VueMask from 'v-mask'
import VueLocalStorage from 'vue-localstorage'
import VeeValidate from 'vee-validate'
import VueScrollTo from 'vue-scrollto'
import 'babel-polyfill'
/*
import { polyfill } from 'es6-promise'
polyfill()
*/

require('../../static/template.css')
if (process.env['NODE_ENV'] === 'development') {
  require('../../static/dev.css')
}

Vue.use(VeeValidate, {
  errorBagName: 'verrors'
})
Vue.use(VueLocalStorage, {
  name: 'ls'
})
Vue.use(VueResource)
Vue.http.options.emulateJSON = true
Vue.use(Router)
Vue.use(VueMask)
Vue.use(VueScrollTo)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Form',
      component: Form
    },
    {
      path: '/thankyou',
      name: 'Thankyou',
      component: Ok
    }
  ]
})
