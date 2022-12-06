import Vue from 'vue'
import App from './App'
import { $http } from '@escook/request-miniprogram'
import store from './vuex/store'
import { uniIcons } from '@dcloudio/uni-ui'
//wx顶级对象建议使用uni替换
uni.$http = $http
// 配置请求根路径
$http.baseUrl = 'https://api-ugo-web.itheima.net'

// 请求开始之前做一些事情
$http.beforeRequest = function (options) {
  uni.showLoading({
    title: '数据加载中...',
  })
}

// 请求完成之后做一些事情
$http.afterRequest = function () {
  uni.hideLoading()
}
// 定义弹窗(duration:弹窗时间)
uni.$showMsg = function (title = "数据加载失败", duration = 2000) {
  uni.showToast({
    title,
    icon: 'none',
    duration
  })
}
Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
  ...App,
  store,

})
app.$mount()
