export default {
  namespaced: true,
  state: () => ({
    address: JSON.parse(uni.getStorageSync('address') || '{}')
  }),
  mutations: {
    // 更新用户数据
    updateAddress (state, address) {
      state.address = address
      // state.address = ({
      //   cityName: "兰州市",
      //   countyName: "海珠区",
      //   detailInfo: "新港中路397号",
      //   errMsg: "chooseAddress:ok",
      //   nationalCode: "510000",
      //   postalCode: "510000",
      //   provinceName: "广东省",
      //   telNumber: "020-81167888",
      //   userName: "张三"
      // })
      this.commit('m_user/saveAddressToStorage')
    },
    // 将address永久储存
    saveAddressToStorage (state) {
      uni.setStorageSync('address', JSON.stringify(state.address))
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
