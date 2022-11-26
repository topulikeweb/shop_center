<template>
  <view>
    <search></search>
    <view class="scroll-view-container">
      <!-- 左侧的滚动视图区域 -->
      <scroll-view class="left-scroll-view" scroll-y="true" :style="{ height: wh + 'px' }">
        <view :class="['left-scroll-view-item', index === active ? 'active' : ' ']" v-for="(item, index) in cateList"
          :key="index" @click="changeActive(index)">{{
              item.cat_name
          }}</view>
      </scroll-view>
      <!-- 右侧的滚动视图区域 -->
      <scroll-view class="right-scroll-view" scroll-y :style="{ height: wh + 'px' }" :scroll-top="scrollTop">
        <view v-for="(item, index) in cateList2" :key="index" class="cate_List">
          <!-- 二级标题 -->
          <view class="secondTitle">{{ item.cat_name }}</view>
          <!-- 三级标题 -->
          <view v-for="(item2, index) in item.children" class="image-item" :key="index">
            <view class="image-items" @click="toGoodsdetail(item2)">
              <image :src="item2.cat_icon.replace('dev', 'web')" mode="widthFix" class="detailImage" />
            </view>
            <view>{{ item2.cat_name }}</view>
          </view>
        </view>
      </scroll-view>
    </view>
  </view>
</template>

<script>
export default {
  name: "cate",
  data() {
    return {
      wh: 0,// 设备屏幕的高度
      cateList: [], // 页面的分类数据(一级分类)
      active: 0, // 当前所在的索引，判断是否激活
      cateList2: [], // 二级分类
      scrollTop: 0// 默认滚动条的位置
    }
  },
  created() {
    this.getscreenHeigth()
    this.getcateList()
  },
  methods: {
    // 获取设备信息
    getscreenHeigth() {
      const SystemInfo = uni.getSystemInfoSync()
      // console.log(121212);
      this.wh = SystemInfo.windowHeight// 获取可视区域屏幕的高度
    },
    // 获取分类数据
    async getcateList() {
      const { data: res } = await uni.$http.get("/api/public/v1/categories")
      if (res.meta.status !== 200) {
        return uni.showToast({
          title: "获取数据失败",
          duration: 1500,
          icon: "none"
        })
      }
      // 成功
      this.cateList = res.message
      this.changeActive(0)
    },
    //（根据index的值来确定点击的对象）
    changeActive(index) {
      this.active = index// 改变active的值
      this.cateList2 = this.cateList[index].children
      // for (let i = 0; i < this.cateList2.length; i++) {
      //   this.cateList3.push(this.cateList2[i].children)
      // }
      this.scrollTop = this.scrollTop === 0 ? 1 : 0//每次切换一级标题，都要将右边的二级三级标题视图改为顶部
    },
    toGoodsdetail(item2) {
      uni.navigateTo({
        url: `/subpkg/goods_list/goods_list?cid=${item2.cat_id}`
      })
    },
    forsearch() {
      console.log(1212);
      // uni.navigateTo({
      //   url: `/subpkg/search/search`
      // })
    }
  },
}
</script>

<style scoped>
.scroll-view-container {
  /* top: 50px; */
  display: flex
}

.left-scroll-view {
  width: 300rpx;
}

.left-scroll-view-item {
  background-color: rgba(230, 223, 223, 0.359);
  text-align: center;
  height: 85rpx;
  line-height: 85rpx;
  font-size: 15px;
  color: rgb(88, 87, 87);
  border-bottom: 0.5px solid rgb(217, 215, 215);
  font-weight: 530;
}

.left-scroll-view-item.active::before {
  display: block;
  /* position: absolute; */
  float: left;
  left: 1px;
  content: ' ';
  width: 5rpx;
  height: 40rpx;
  margin-top: 18%;
  background-color: red
}

.left-scroll-view-item.active {
  transition: all 0.6s;
}

/* 表示同时有两个类就执行 */
.left-scroll-view-item.active {
  color: rgb(246, 89, 53);
  height: 120rpx;
  line-height: 120rpx;
}

.right-scroll-view-item {
  background-color: rgba(244, 242, 242, 0.359);
  text-align: center;
  line-height: 60rpx;
  font-size: 17px;
  color: #000;
  font-weight: 500;
}

.secondTitle {
  background-color: rgb(233, 232, 232);
  width: 100%;
  height: 60rpx;
  text-align: center;
  font-size: 35rpx;
  font-weight: 600;
  color: rgb(236, 123, 123);
  line-height: 60rpx;
}

.cate_List {
  display: flex;
  flex-wrap: wrap;
}

.detailImage {
  width: 100%;
}

.image-item {
  border: 0.1px solid rgb(232, 226, 226);
  border-radius: 10px;
  width: 32%;
  margin-top: 30px;
  text-align: center;
  font-size: 15px;
  font-weight: 520;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  /* margin-left: 10px; */
}

.image-item:target {
  border: 0.1px solid rgb(177, 170, 170);
}

.image-items {
  width: 100%;
  height: 100%;
}
</style>
