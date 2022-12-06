export default {
  // 为当前模块开启命名空间，相当于让这个模块有一个自己的空间
  namespaced: true,
  state: () => ({
    // 购物车的数组，用来存储购物车中每个商品的信息对象
    // 每个商品的信息对象，都包含如下 6 个属性：
    // { goods_id, goods_name, goods_price, goods_count, goods_small_logo, goods_state }
    cart: JSON.parse(uni.getStorageSync('cart') || '[]')
  }),
  actions: {},
  mutations: {
    addToCate (state, goods) {
      // 先查找购物车里面的物品id有没有一样的
      // 如果找到了的话，findResult就是商品的信息，如果不是的话就返回undefined
      const findResult = state.cart.find((x) => {
        return x.goods_id === goods.goods_id
      })
      // 如果没有找到
      if (!findResult) {
        state.cart.push(goods)
      } else {
        findResult.goods_count++
      }
      this.commit('m_cart/saveToStorage')
    },
    // 将数据永久存在本地
    saveToStorage (state) {
      uni.setStorageSync('cart', JSON.stringify(state.cart))
    },
    // 修改复选框的选中状态
    updateGoodsstates (state, goods) {
      const findResult = state.cart.find((x) => {
        return x.goods_id === goods.goods_id
      })
      if (findResult) {
        // 将勾选状态改变
        findResult.goods_state = goods.goods_state
        // 将修改后的数据永久储存在本地
        this.commit('m_cart/saveToStorage')
      }
    },
    updateGoodscount (state, goods) {
      const findResult = state.cart.find(x => {
        return x.goods_id === goods.goods_id
      })
      if (findResult) {
        findResult.goods_count = goods.goods_count
        this.commit('m_cart/saveToStorage')
      }
    },
    // 删除购物车的商品
    deleteCartGoods (state, goods) {
      state.cart = state.cart.filter(item => {
        return goods.goods_id !== item.goods_id
      })
      this.commit('m_cart/saveToStorage')
    },
    // 点击全选改变所有的状态
    updateAllGoodsState (state, newchecked) {
      state.cart.forEach(item => item.goods_state = newchecked)
      console.log(state.cart)
    },
  },
  // getters用于过滤数据
  getters: {
    // 统计购物车总商品数量
    total (state) {
      let c = 0
      state.cart.forEach(x => {
        return c += x.goods_count
      })
      return c
    },
    // 找到勾选的总个数
    checkedCount (state) {
      return state.cart.filter(x => x.goods_state === true
      ).reduce((total, item) => total += item.goods_count, 0)
    },
    // 计算商品总价格
    checkedGoodsAmount (state) {
      return state.cart.filter(item => item.goods_state === true)
      .reduce((total, item) => total + item.goods_price * item.goods_count, 0)
    }
  }
}
