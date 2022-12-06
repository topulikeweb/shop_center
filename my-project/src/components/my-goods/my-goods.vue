<!--  -->
<template>
  <view class="body">
    <view class="goods-item-left">
      <radio :checked="goods.goods_state" color="#C00000"
             v-if="showRadio" @click="radioClickHandler"></radio>
      <image :src="goods.goods_small_logo" class="goods-pic"
      ></image>
      <!-- 商品价格 -->
      <view class="goods-price">￥{{ goods.goods_price }}</view>
      <text class="goodsName">{{ goods.goods_name }}</text>
    </view>
    <view class="goods-info-box">
      <!-- 商品数量 -->
      <uni-number-box :min="1" v-if="showNum" :value="goods.goods_count"
                      @change="numchange" class="numberbox"></uni-number-box>
    </view>
  </view>
</template>

<script>

export default {
  props: {
    goods: {
      type: Object,
      default: {}
    },
    // 是否展示图片左侧的 radio
    showRadio: {
      type: Boolean,
      // 如果外界没有指定 show-radio 属性的值，则默认不展示 radio 组件
      default: false,
    },
    // 是否展示数据框
    showNum: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {}
  },

  methods: {
    radioClickHandler () {
      // 点击radio框的时候就会触发radio-change自定义事件
      this.$emit('radio-change', {
        goods_id: this.goods.goods_id,
        goods_state: !this.goods.goods_state
      })
      console.log(1212, this.goods)
    },
    numchange (value) {
      this.$emit('num-change', {
        goods_id: this.goods.goods_id,
        goods_count: +value
      })
    },
  },
  //生命周期 - 创建完成（访问当前this实例）
  created () {
    // console.log(1111, this.goods)
  },
  //生命周期 - 挂载完成（访问DOM元素）
  mounted () {
  },
  onLoad () {

  }
}
</script>
<style scoped>

/* @import url(); 引入css类 */
.goods-item-left {
  margin-right: 5px;
  display: flex;
  justify-content: space-between;
  /*flex-wrap: wrap;*/
}

.goods-pic {
  width: 100px;
  height: 100px;
  display: block;
  float: left;
}

.goods-item-right {
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: space-between;
}


.goods-info-box {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  float: right;
}

.goods-price {
  font-size: 16px;
  color: #c00000;
  position: relative;
  left: 10%;
  top: 150rpx;
}

.goodsName {
  display: block;
  width: 70%;
  height: 100rpx;
  font-size: 13px;
}

radio {
  position: relative;
  top: 70rpx;
}

image {
  width: 30%;
  margin-left: 10rpx;
}

.numberbox {
  position: relative;
  /*right: 0px;*/
}

</style>
