<template>
  <view>
    <!--  如果token不存在就显示登录组件-->
    <my-login v-if="!token"></my-login>

    <!--  用户登录后就显示用户信息组件(不存在token的时候)-->
    <my-userinfo v-else></my-userinfo>
  </view>
</template>

<script>
import mixin from 'mixins/mixins/tabbar-badge'
import { mapState } from 'vuex'
import MyLogin from '@/components/my-login/my-login'
import MyUserinfo from '@/components/my-userinfo/my-userinfo'

export default {
  name: "my",
  components: { MyUserinfo, MyLogin },
  mixins: ['mixin'],
  computed: {
    ...mapState('m_user', ['token'])
  }
}
</script>

<style scoped>

</style>
