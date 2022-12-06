import { mapGetters } from "vuex";
// 封装tabbar的购物车栏的数字显示
export default {
  watch: {
    total: {
      handler () {
        this.setBadge()
      }
    }
  },
  computed: {
    ...mapGetters('m_cart', ['total'])
  },
  methods: {
    setBadge () {
      uni.setTabBarBadge({
        index: 2,
        text: this.total + ''
      })
    }
  },
  onShow () {
    this.setBadge()
  }
}
