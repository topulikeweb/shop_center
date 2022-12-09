<template>
  <!-- 最外层的容器 -->
  <view class="my-settle-container">
    <!-- 最外层的容器 -->
    <view class="my-settle-container">
      <!-- 全选区域 -->
      <label class="radio">
        <radio color="#C00000" :checked="FullChecked"
               @click="updateAllGoodsState(!FullChecked)"/>
        <text>全选</text>
      </label>

      <!-- 合计区域 -->
      <view class="amount-box">
        合计:
        <text class="amount">￥{{ checkedGoodsAmount }}</text>
      </view>

      <!-- 结算按钮 -->
      <view class="btn-settle" @click="settle">结算({{ checkedCount }})</view>
    </view>
  </view>
</template>

<script>
import { mapGetters, mapMutations, mapState } from 'vuex'

export default {
  data () {
    return {
      // 倒计时时间
      second: 3,
    }
  },
  created () {
    console.log(123, this.checkedCount)
    console.log(this.checkedGoodsAmount)
  },
  computed: {
    ...mapGetters('m_cart', ['checkedCount', 'total', 'checkedGoodsAmount']),
    ...mapGetters('m_user', ['addressStr']),
    ...mapState('m_user', ['token']),
    ...mapState('m_user', ['redirectInfo']),
    ...mapState('m_cart', ['cart']),
    FullChecked () {
      return this.total === this.checkedCount
    }
  },
  methods: {
    ...mapMutations('m_cart', ['updateAllGoodsState']),
    ...mapMutations('m_user', ['updateRedirectInfo']),
    settle () {
      // 1. 先判断是否勾选了要结算的商品
      if (!this.checkedCount) return uni.$showMsg('请选择要结算的商品！')

      // 2. 再判断用户是否选择了收货地址
      if (!this.addressStr) return uni.$showMsg('请选择收货地址！')

      // 3. 最后判断用户是否登录了
      if (!this.token) return this.DelayNavigate()

      this.payOrder()
    },
    // 判断用户是否登录，如果没有登录就强制跳转出
    showTips (n) {
      // 展现一个提示框
      uni.showToast({
        icon: 'none',
        title: `请登录后结算 还有${n}秒跳转到登录界面`,
        // 为提示框添加透明遮罩，防止点击穿透
        mask: true,
        duration: 1500
      })
    },
    DelayNavigate () {
      // 设置定时器时间
      this.second = 3
      this.showTips(this.second)
      // 设置一个定时器，然后每一秒执行一次
      const timer = setInterval(() => {
        this.second--
        this.showTips(this.second)
        // 判断秒数是否小于0
        if (this.second <= 0) {
          clearInterval(timer)
          uni.switchTab({
            url: '/pages/my/my',
            // 执行成功后进行的回调
            success: () => {
              // 将跳转的信息传给vuex中的updateRedirectInfo保存
              this.updateRedirectInfo({
                openType: 'switchTab',
                // 从哪个页面跳转的
                from: '/pages/cart/cart'
              })
            }
          })
        }
      }, 1000)
    }, // 支付
    async payOrder () {
      const orderInfo = {
        order_price: 0.01,
        consignee_addr: this.addressStr,
        goods: this.cart.filter(x => x.goods_state).map(x => ({
          goods_id: x.goods_id,
          goods_number: x.goods_count,
          goods_price: x.goods_price
        }))
      }
      const { data: res } = await uni.$http.post('/api/public/v1/my/orders/create', orderInfo)
      if (res.meta.status !== 200) {
        return uni.$showMsg('数据创建失败')
      }
      const orderNumber = res.message.order_number
      console.log(orderNumber)

      // 发起请求订单
      const { data: succ } = await uni.$http.post('/api/public/v1/my/orders/req_unifiedorder', {
        order_number,
        orderNumber
      })
      if (succ.meta.status !== 200) {
        return uni.$showMsg('请求订单数据失败')
      }
      // 获取订单的必要参数
      const payInfo = succ.message.pay


      // 发起微信支付
      // 调用uni.requestPayment来进行支付
      const [err, success] = await uni.requestPayment(payInfo)
      // 未完成支付
      if (err) {
        uni.$showMsg('订单未支付')
      }
      // 完成了支付
      const { data: res3 } = await uni.$http.post('/api/public/v1/my/orders/chkOrder', { order_number: orderNumber })
      // 检测到订单未支付
      if (res3.meta.status !== 200) {
        uni.$showMsg('订单未支付')
      }
      uni.showToast({
        title: '订单支付成功',
        icon: success
      })
    }
  }
  ,
  mounted () {
    console.log(1233, this.cart)
  }
}
</script>

<style lang="scss">
.my-settle-container {
  /* 底部固定定位 */
  position: fixed;
  bottom: 0;
  left: 0;
  /* 设置宽高和背景色 */
  width: 100%;
  height: 50px;
  background-color: cyan;
}

.my-settle-container {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 50px;
  // 将背景色从 cyan 改为 white
  background-color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 5px;
  font-size: 14px;

  .radio {
    display: flex;
    align-items: center;
  }

  .amount {
    color: #c00000;
  }

  .btn-settle {
    height: 50px;
    min-width: 100px;
    background-color: #c00000;
    color: white;
    line-height: 50px;
    text-align: center;
    padding: 0 10px;
  }
}
</style>
