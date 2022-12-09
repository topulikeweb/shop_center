<template>
  <view class="login-container">
    <uni-icons type="contact-filled" size="100" color="#AFAFAF"></uni-icons>
    <button type="primary" class="btn-login" open-type="getUserInfo"
            @getuserinfo="getUserProfile"
    >一键登录
    </button>
    <view class="tips-text">登录后享受更多的权益</view>
  </view>
</template>

<script>
import { uniIcons } from '@dcloudio/uni-ui'
import { mapMutations, mapState } from 'vuex'

export default {
  components: { uniIcons },
  data () {
    return {
      ...mapState('m_user', ['redirectInfo'])
    }
  },
  methods: {
    ...mapMutations('m_user', ['updateUserInfo', 'updateToken']),
    // 获取微信用户信息
    getUserProfile (e) {
      if (e.detail === 'getUserInfo:fail auth deny') {
        return uni.$showMsg('您取消了授权')
      }
      // 授权成功
      // 获取用户信息，将其存入vuex
      console.log(123123, e.detail.userInfo)
      this.updateUserInfo(e.detail.userInfo)
      // 将Token存入vuex
      this.getToken(e.detail)
      console.log(e.detail)
    },
    // 返回登陆之前的页面
    navigateBack () {
      if (this.redirectInfo && this.redirectInfo.openType === 'switchTab') {
        uni.navigateTo({
          url: this.redirectInfo.from,
          // 导航成功后，将vuex中的redirectInfo设为null
          complete: () => {
            this.redirectInfo = null
          }
        })
      }
    },
    // 获取token
    async getToken (info) {
      // state.token = token
      // this.commit('m_user/saveTokenToStorage')
      const [err, res] = await uni.login().catch(err => err)
      if (err || res.errMsg !== 'login:ok') return uni.$showError('登陆失败!')
      // 准备参数对象(这里要登陆了才有这些参数)
      const query = {
        code: res.code,
        encryptedData: info.encryptedData,
        iv: info.iv,
        rawData: info.rawData,
        signature: info.signature
      }
      // 获取token（这里的接口有问题，因此用一个假的token代替）
      // const { data: loginResult } = await uni.$http.post('/api/public/v1/users/wxlogin', query)
      // if (loginResult.meta.status !== 200) {
      //   console.log(res)
      //   return uni.$showMsg('登录失败，具体哪里失败，作者懒，懒得报')
      // }
      // 登录成功
      uni.$showMsg('恭喜恭喜，登录成功啦!!!')
      // 更新vuex中的token数据(因为token字符串返回有问题，就模拟字符串)
      const token = 'xunitokentokentokentoken'
      this.updateToken(token)
      // 将页面跳转到刚才的页面
      this.navigateBack()
    },

  }
}
</script>

<style scoped>
.login-container {
  height: 750rpx;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #f8f8f8;
  position: relative;
  overflow: hidden;
}

.login-container::after {
  content: ' ';
  display: block;
  position: absolute;
  width: 100%;
  height: 40px;
  left: 0;
  bottom: 0;
  background-color: white;
  border-radius: 100%;
  transform: translateY(50%);
}

.btn-login {
  width: 90%;
  border-radius: 100px;
  margin: 15px 0;
  background-color: #c00000;

}

.tips-text {
  font-size: 12px;
  color: gray;

}


</style>
