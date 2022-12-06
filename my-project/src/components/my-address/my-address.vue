<template>
  <view>
    <!-- 选择收货地址的盒子 -->
    <view class="address-choose-box" v-if="JSON.stringify(address)==='{}'">
      <button type="primary" size="mini" class="btnChooseAddress"
              @click="chooseAddress">
        请选择收货地址+
      </button>
    </view>

<!--    &lt;!&ndash;    添加收获地址&ndash;&gt;-->
<!--    <view>-->
<!--      <button type="primary" size="mini" class="addAddress">添加收货地址-->
<!--      </button>-->
<!--    </view>-->

    <!-- 渲染收货信息的盒子 -->
    <view class="address-info-box" v-else @click="chooseAddress">
      <view class="row1">
        <view class="row1-left">
          <view class="username">收货人：
            <text>{{ address.userName }}</text>
          </view>
        </view>
        <view class="row1-right">
          <view class="phone">电话：
            <text>{{ address.telNumber }}</text>
          </view>
          <uni-icons type="arrowright" size="16"></uni-icons>
        </view>
      </view>
      <view class="row2">
        <view class="row2-left">收货地址:</view>
        <view class="row2-right">{{ addressStr }}
        </view>
      </view>
    </view>

    <!-- 底部的边框线 -->
    <image src="/static/cart_border@2x.png" class="address-border"></image>
  </view>
</template>

<script>
import { mapGetters, mapMutations, mapState } from 'vuex'

export default {
  data () {
    return {}
  },
  methods: {
    ...mapMutations('m_user', ['updateAddress']),
    async chooseAddress () {
      // 调用小程序的chooseAddress的方法，调用之前要在manifest中配置
      // chooseAddress return two Array one is success a thor is
      const [err, succ] = await uni.chooseAddress().catch(err => err)
      if (succ.errMsg === 'chooseAddress:ok' && err === null) {
        // 将地址保存在vuex的address中
        console.log(succ.provinceName)
        this.updateAddress(succ)
      }
      // // 如果用户没有授权，重新让用户进行授权
      // if ((err.errMsg === 'chooseAddress:fail auth deny' || err.errMsg === 'chooseAddress:fail authorize no response') && err) {
      //   await this.reAuth()
      // }
    },
    // 重新发起收货地址的
    // async reAuth () {
    //   const [err2, confirmResult] = await uni.showModal({
    //     content: '检测到您没打开地址权限，是否去设置打开？',
    //     confirmText: "确认",
    //     cancelText: "取消",
    //   })
    //   if (err) {
    //     return
    //   }
    //   // 如果用户点击了取消
    //   if (confirmResult.cancel) return uni.$showMsg('您取消了授权')
    //   if (confirmResult.confirm) return uni.openSetting({
    //     success: (settingResult) => {
    //       // 3.4.2 地址授权的值等于 true，提示用户 “授权成功”
    //       if (settingResult.authSetting['scope.address']) return uni.$showMsg('授权成功！请选择地址')
    //       // 3.4.3 地址授权的值等于 false，提示用户 “您取消了地址授权”
    //       if (!settingResult.authSetting['scope.address']) return uni.$showMsg('您取消了地址授权！')
    //     }
    //   })
    // }
  },
  computed: {
    // 获取地址
    ...mapState('m_user', ['address']),
    // 获取拼接的地址字符串
    ...mapGetters('m_user', ['addressStr']),
  }
}
</script>

<style scoped>

/*底部边框线的样式*/
.address-border {
  display: block;
  width: 100%;
  height: 5px;
}


/*第一行*/
.row1 {
  display: flex;
  justify-content: space-between;
}

.row1-right {
  display: flex;
  align-items: center;
}

.phone {
  margin-right: 5px;
}


/*第二行*/
.row2 {
  display: flex;
  align-items: center;
  margin-top: 10px;
}

.row2-left {
  white-space: nowrap;
}


/*选择收货地址的盒子*/
.address-choose-box {
  height: 90px;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* 渲染收货信息的盒子*/
.address-info-box {
  font-size: 12px;
  height: 90px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0 5px;
}
</style>
