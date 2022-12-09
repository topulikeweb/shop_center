export default {
  namespaced: true,
  state: () => ({
    address: JSON.parse(uni.getStorageSync('address') || '{}'),
    // 登录储存
    token: uni.getStorageSync('token' || ''),
    // 用户的信息
    userInfo: JSON.parse(uni.getStorageSync('userInfo') || '{}'),
    // 重新定向的object对象（将跳转之前的数据保存）
    redirectInfo: null
  }),
  mutations: {
    // 将address永久储存
    saveAddressToStorage (state) {
      uni.setStorageSync('address', JSON.stringify(state.address))
    },
    saveUserInfoToStorage (state) {
      uni.setStorageSync('userInfo', JSON.stringify(state.userInfo))
    },
    // 将token存入本地
    saveTokenToStorage (state) {
      uni.setStorageSync('token', JSON.stringify(state.token))
    },
    // 更新用户数据
    updateAddress (state, address) {
      state.address = address
      this.commit('m_user/saveAddressToStorage')
    },
    // 更新用户的信息存入userInfo之中
    updateUserInfo (state, UserInfo) {
      state.userInfo = UserInfo
      this.commit('m_user/saveUserInfoToStorage')
    },
    // 将token储存在本地
    updateToken (state, token) {
      state.token = token
      this.commit('m_user/saveTokenToStorage')
    },
    updateRedirectInfo (state, info) {
      state.redirectInfo = info
    }
  },
  getters: {
    addressStr (state) {
      if (!state.address.provinceName) {
        return ''
      }
      // 拼接 省，市，区，详细地址 的字符串并返回给用户
      return state.address.provinceName + state.address.cityName + state.address.countyName + state.address.detailInfo
    }
  }
}
