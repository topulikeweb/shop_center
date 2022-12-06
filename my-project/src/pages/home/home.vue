<template>
  <view>
    <!-- 轮播图区域 -->
    <swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" :circular="true">
      <swiper-item v-for="(item, i) in swiperList" :key="i">
        <navigator class="swiper-item" :url="'/subpkg/good_detail/good_detail?goods_id=' + item.goods_id">
          <image :src="item.image_src" class="image"></image>
        </navigator>
      </swiper-item>
    </swiper>

    <!-- 分类导航 -->
    <view class="nav-list">
      <view class="nav-items" v-for="(item, index) in navList" :key="index" @click="navClickHandle(item)">
        <image class="image" :src="item.image_src" mode="scaleToFill" />
      </view>
    </view>

    <!--楼层区-->
    <view class="floor-list">
      <view class="floor-item" v-for="(item, i) in floorList" :key="i">
        <view class="floor-title">
          <image :src="item.floor_title.image_src" mode="widthFix" />
        </view>
        <!-- 楼层图片 -->
        <view class="floor-img-box">
          <navigator class="left-img-box" :url="item.product_list[0].url">
            <image :src="item.product_list[0].image_src" :style="{ width: item.product_list[0].image_width + 'rpx' }"
              mode="widthFix"></image>
          </navigator>
          <navigator class="right-img-box">
            <navigator class="right-img-item" v-for="(item2, index) in item.product_list" :key="index" :url="item2.url">
              <image :src="item2.image_src" :style="{ width: item2.image_width + 'rpx' }" mode="widthFix"
                v-if="index !== 0" />
            </navigator>
          </navigator>
        </view>
      </view>
    </view>
  </view>
</template>
<script>
import { mapGetters } from 'vuex'
import badgeMix from '@/mixins/mixins/tabbar-badge.js'


export default {
  name: "home",
  mixins: [badgeMix],
  data() {
    return {
      swiperList: [],
      navList: [],
      floorList: []
    }
  },
  onLoad() {
    this.getSwiperList()
    this.getNavList()
    this.getFloorList()
  },
  methods: {
    //3. 获取轮播图数据的方法
    async getSwiperList() {
      // 3.1 请求
      const { data: res } = await uni.$http.get('/api/public/v1/home/swiperdata')
      //3.2 失败处理
      if (res.meta.status !== 200) {
        return uni.showToast({
          title: '请求数据失败',
          duration: 1200,
          icon: 'none'
        })
      }
      //3.3 成功
      // console.log(res)
      this.swiperList = res.message
    },


    // 请求分类导航数据
    async getNavList() {
      const { data: res } = await uni.$http.get('/api/public/v1/home/catitems')

      if (res.meta.status !== 200) {
        return uni.showToast({
          title: '请求数据失败',
          duration: 1500,
          icon: 'none'
        })
      }
      // console.log(123, res);
      this.navList = res.message
    },


    // 获取楼层数据
    async getFloorList() {
      const { data: res } = await uni.$http.get("/api/public/v1/home/floordata")
      if (res.meta.status !== 200) {
        return uni.showToast({
          title: '请求楼层数据失败',
          icon: 'none',
          mask: true
        })
      }
      // 成功
      this.floorList = res.message

      // 在product_list上面挂载新的属性
      res.message.forEach(element => {
        element.product_list.forEach(item => {
          item.url = `/subpkg/goods_list/goods_list?${item.navigator_url.split("?")[1]}`
        })
      });
      console.log(res.message);
    },
    // 点击导航进行跳转
    navClickHandle(item) {
      if (item.name === "分类") {
        uni.switchTab({
          url: "/pages/cate/cate"
        })
      }
    }
  }
}
</script>

<style scoped>
swiper {
  width: 90%;
  /*margin: 10rpx at;*/
  margin-left: 5%;
  margin-top: 20 rpx;
  height: 300rpx;
}

/* image {
  width: 100%;
  height: 100%;
} */
swiper-item {
  width: 100%;
  height: 100%;
}

.image {
  width: 100%;
  height: 300rpx;
}

.nav-list {
  display: flex;
  justify-content: space-around;
  margin: 15rpx 0;
}

.nav-list image {
  width: 128rpx;
  height: 140rpx;
}

.floor-title {
  height: 60rpx;
  width: 100%;
  display: flex;
}

/* 
.left-img-box image {
  width: 100%;
} */

.right-img-box {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}


.floor-img-box {
  display: flex;
}
</style>
