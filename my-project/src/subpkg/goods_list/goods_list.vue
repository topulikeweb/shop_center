<!--商品列表  -->
<template>
    <view class="goods-box">
        <text class="total">为您找到{{ total }}条相关数据:</text>
        <view class="goods-items" v-for="(item, index) in goodsList" hover-class="goods-items-hover"
            :animation="animationData" @click="gotodetail(item)">
            <!-- 左侧商品介绍 -->
            <view class="goods-image-box">
                <image class="goods-image-item" :src="item.goods_small_logo || defaultImage" mode="widthFix" />
            </view>
            <!-- 右侧商品介绍 -->
            <view class="goods-induce">{{ item.goods_name }}</view>
            <!-- 商品标题 -->
            <text class="goods-price">{{ item.goods_price | toFixed }}￥</text>
        </view>
    </view>

</template>

<script>
import { $http } from '@escook/request-miniprogram'

export default {
    data() {
        return {
            // 请求得到的商品数据
            goodsList: [],
            // 发起请求的参数
            queryObj: {
                // 查询的关键字
                query: '',
                // 商品携带的id
                cid: '',
                // 每页显示多少条数据
                pagesize: 10,
                // 页码值
                pagenum: 1,
                // 动画的参数
                animationData: {},
            },
            flag: false,// 节流阀
            // 请求出来的结果
            total: 0,
            // 图片未加载出来的时候显示
            defaultImage: 'https://tse4-mm.cn.bing.net/th/id/OIP-C.tgnJpntImFognfxa_wINyAHaHa?w=194&h=194&c=7&r=0&o=5&dpr=1.3&pid=1.7'

        }
    },
    onLoad(option) {
        // console.log(option);
        // option 是页面跳转的时候携带的参数
        this.queryObj.query = option.query || ''
        this.queryObj.cid = option.cid || ''
        // console.log(option.query);
        this.getGoodsList()
    },
    methods: {
        async getGoodsList(callback) {
            this.flag = true

            const { data: res } = await uni.$http.get(`/api/public/v1/goods/search`, this.queryObj)

            this.flag = false

            // 数据请求完毕执行回调
            callback && callback()

            if (res.meta.status !== 200) {
                return uni.$showMsg()
            }
            // 将新请求出来的数据和旧数据进行拼接(这里不会和其他商品重复的原因是，当我离开这个页面，由于goodsList没有进行本地储存，里面的数据，在我离开页面后就会消失)           
            this.goodsList = [...this.goodsList, ...res.message.goods]
            // console.log(this.goodsList);
            this.total = res.message.total
        },
        gotodetail(item) {
            uni.navigateTo({
                url: `/subpkg/good_detail/good_detail?goods_id=${item.goods_id}`
            })
        }
    },
    filters: {
        toFixed(price) {
            return price.toFixed(2)
        },
    },
    //生命周期 - 创建完成（访问当前this实例）
    created(option) {
        // console.log(option);
    },
    //生命周期 - 挂载完成（访问DOM元素）
    mounted() {
    },

    // 触底触发的函数
    onReachBottom() {
        // 如果数据已经请求完，就不让页面继续增加了
        if (this.queryObj.pagenum * this.queryObj.pagesize >= this.total) {
            return uni.$showMsg('数据加载完毕')
        }
        // 如果正在请求数据
        if (this.flag) {
            return
        }
        // 让页数加一
        this.queryObj.pagenum += 1
        this.getGoodsList()
    },
    // 下拉刷新
    onPullDownRefresh() {
        if (this.flag) {
            return
        }
        this.queryObj.pagenum = 1
        this.total = 0
        this.flag = false
        this.goodsList = []
        // 请求到数据后进行回调
        this.getGoodsList(() => {
            uni.stopPullDownRefresh({
                success: (result) => { uni.$showMsg('坤坤你刷新成功啦') },
                fail: (error) => { uni.$showMsg('刷新失败,可能练习时长不够') }
            })
        })
    },
}
</script>
<style scoped>
/* @import url(); 引入css类 */
.goods-image-item {
    width: 230rpx;
    height: 230rpx;
}

.goods-image-box {
    width: 230rpx;
    height: 230rpx;
}

.goods-items {
    margin-top: 20px;
    width: 96%;
    border-radius: 10px;
    height: 230rpx;
    /* opacity: .8; */
    /* background-color: rgb(227, 223, 223); */
    background: rgba(89, 88, 88, 0.6);
    backdrop-filter: blur(150px);
    display: flex;
    margin-bottom: 30px;
    color: rgb(98, 96, 96);
    text-indent: 1em;
}

.goods-items-hover {
    position: relative;
    left: 100px;
    background-color: blanchedalmond;
    border-radius: 10px;
    color: rgb(251, 157, 157);
}

.goods-items ::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(235, 228, 228, 0.8);
    z-index: -3;
}


.goods-induce {
    padding-left: 5px;
    margin-left: 40rpx;
    margin-top: 10px;
    margin-right: 20rpx;
}

.goods-price {
    position: absolute;
    bottom: 8px;
    right: 20px;
    font-size: 35rpx;
    color: rgb(58, 57, 57);
}

.total {
    width: 100%;
    height: 20px;
    text-indent: 2em;
    margin-left: 5px;
    position: relative;
    top: 10px;
    color: rgb(104, 103, 103);
}
</style>