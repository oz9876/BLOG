
// (function (w) {
//   function initFontSize (w) {
//     const c = document.documentElement.getBoundingClientRect()
//     let cw
//     if (c.width > w) {
//         cw = w
//       } else {
//         cw = c.width
//       }
//     document.documentElement.style.fontSize = cw / w * 100 + 'px'
//   }
//   initFontSize(w)
//   window.onresize = () => {
//     initFontSize(w)
//   }
// }(750))
// document.body.id = 'vux_view_box_body'

import 'babel-polyfill'
import './js/WebViewJavascriptBridge'
import './js/public-path'
import Vue from 'vue'
// import 'element-ui/lib/theme-default/index.css'
// import FastClick from 'fastclick'
import VueRouter from 'vue-router'
import { sync } from 'vuex-router-sync'
import App from './App'
import getStore from './store'
import 'swiper/dist/css/swiper.css'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import ElementUI from 'element-ui'
import VeeValidate from 'vee-validate'
import zh from 'vee-validate/dist/locale/zh_CN'
// import { UPDATE_LOADING_STATUS } from './store/mutation-types'
import apis from './fetch/apis'
import moment from 'moment'
// import VueScroller from 'vue-scroller'
// Vue.use(VueScroller)
(async () => {
  // 日期格式化组件
  Vue.prototype.$moment = moment
  Vue.use(ElementUI)
  const { Validator } = VeeValidate
  Validator.addLocale(zh)

    // vue校验
  Vue.use(VeeValidate, {
    locale: 'zh_CN',
    fieldsBagName: 'error'
  })

    // 手机号码校验
  Validator.extend('mobile', {
    messages: {
      zh_CN: field => field + '格式不正确'
    },
    validate: value => {
        return value.length === 11 && /^((13|14|15|17|18)[0-9]{1}\d{8})$/.test(value)
      }
  })

    // 修改默认错误提示
  const dictionary = {
    zh_CN: {
        messages: {
            required: (field) => `${field}不能为空`,
            between: (field, data) => `${field}必须在${data[0]}~${data[1]}之间`,
            confirmed: (field, data) => `${field}必须与${data[0]}相匹配`,
            max: (field, data) => `${field}最大长度不能超过${data[0]}`,
            min: (field, data) => `${field}最小长度不能小于${data[0]}`,
            digits: (field, data) => `${field}必须为数字，且长度必须等于${data[0]}`,
            min_value: (field, data) => `${field}数值不能小于${data[0]}`,
            max_value: (field, data) => `${field}数值不能大于${data[0]}`,
            not_in: (field, data) => `${field}不能为${data.join(',')}`
          }
      }
  }
  Validator.updateDictionary(dictionary)
    // swiper轮播插件
  Vue.use(VueAwesomeSwiper)
    // vue路由插件
  Vue.use(VueRouter)

  const routes = require('./routes.js')

  const routerConfigure = {
    routes
  }
  if (window.isHistoryMode) {
    routerConfigure.mode = 'history'
    routerConfigure.base = '/view/'
  }
    // 引入路由
  const router = new VueRouter(routerConfigure)
  // 请求
  Vue.prototype.$apis = apis(window.baseUrl, router)
  // 引入vuex相关
  const store = getStore(router)
    // FastClick.attach(document.body)
  sync(store, router)
    /* eslint-disable no-new */
  new Vue({
    store,
    router,
    render: h => h(App)
  }).$mount('#app-box')
})()
