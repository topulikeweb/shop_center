<template>
  <view>
    <my-address/>
    <!-- 购物车商品列表的标题区域 -->
    <view class="cart-title">
      <!-- 购物车商品列表的标题区域 -->
      <view class="cart-title">
        <!-- 左侧的图标 -->
        <uni-icons type="shop" size="18"></uni-icons>
        <!-- 描述文本 -->
        <text class="cart-title-text" >购物车</text>
        <!-- <search></search> -->
      </view>
    </view>

    <view class="cart-container" v-if="cart.length !== 0">
      <uni-swipe-action>
        <block v-for="(goods, index) in cart" :key="index">
          <uni-swipe-action-item :right-options="options"
                                 @click="swipeActionClickHandler(goods)">
            <my-goods :goods="goods" @radio-change="radioChangeHandler"
                      :show-radio="true"
                      @num-change="numberChangeHandler"></my-goods>
          </uni-swipe-action-item>
        </block>
      </uni-swipe-action>


      <!--结算区-->
      <view class="cart-container">
        <my-settle/>
      </view>
    </view>

    <!-- 空白购物车区域 -->
    <view class="empty-cart" v-else>
      <image src="/static/cart_empty@2x.png" class="empty-img"></image>
      <text class="tip-text">空空如也~</text>
    </view>
  </view>
</template>

<script>
import { uniIcons } from '@dcloudio/uni-ui'
import { mixin } from 'mixins/mixins/tabbar-badge.js'
import { mapMutations, mapState } from 'vuex'
import MyAddress from '@/components/my-address/my-address'
import MySettle from '@/components/my-settle/my-settle'

export default {
  components: { MySettle, MyAddress, uniIcons },
  mixin: [mixin],
  name: "cart",
  data () {
    return {
      options: [{
        text: '删除', // 显示的文本内容
        style: {
          backgroundColor: '#C00000' // 按钮的背景颜色
        }
      }]
    }
  },
  computed: {
    ...mapState('m_cart', ['cart'])
  },
  onLoad (options) {

  },
  created () {
    console.log(this.cart);
  },
  methods: {
    ...mapMutations('m_cart', ['updateGoodsstates', 'updateGoodscount', 'deleteCartGoods']),
    // 复选框发生改变
    radioChangeHandler (e) {
      this.updateGoodsstates(e)
      // console.log(this.cart )
    },
    // 数框发生改变
    numberChangeHandler (e) {
      this.updateGoodscount(e)
      console.log(e)
    },
    // 点击滑动删除按钮
    swipeActionClickHandler (e) {
      this.deleteCartGoods(e)
    },
  },
}
</script>

<style scoped>
.cart-title {
  height: 40px;
  display: flex;
  align-items: center;
  font-size: 14px;
  padding-left: 5px;
  border-bottom: 1px solid #efefef;
}

.cart-title-text {
  margin-left: 10px;
}

.buttonChoseAddress {
  width: 60%;
  height: 70rpx;
  position: relative;
  top: 20px;
}

.cart-container {
  padding-bottom: 50px;
}

.empty-cart {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 150px;
}

.empty-img {
  width: 90px;
  height: 90px;
}

.tip-text {
  font-size: 12px;
  color: gray;
  margin-top: 15px;
}

</style>
