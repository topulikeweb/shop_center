<!-- 商品详情 -->
<template>
    <view v-if="goodDetailList.goods_name">
        <!-- 轮播图区域 -->
        <swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" :circular="true">
            <swiper-item v-for="(item, i) in goodDetailList.pics" :key="i">
                <image :src="item.pics_big" @click="preview(i)"></image>
            </swiper-item>
        </swiper>

        <!-- 商品信息区域 -->
        <view class="goods-info-box">
            <!-- 商品价格 -->
            <view class="price">￥{{ goodDetailList.goods_price }}</view>
            <!-- 信息主体区域 -->
            <view class="goods-info-body">
                <!-- 商品名称 -->
                <view class="goods-name">{{ goodDetailList.goods_name }}</view>
                <!-- 收藏 -->
                <view class="favi">
                    <uni-icons type="star" size="18" color="rgb(138, 138, 2)"></uni-icons>
                    <text>收藏</text>
                </view>
                <!-- 运费 -->
                <view class="yf">快递：免运费</view>
            </view>
        </view>
        <!-- 商品详情信息 -->
        <rich-text :nodes="goodDetailList.goods_introduce" class="richText"></rich-text>
        <view class="goodsNav">
            <uni-goods-nav :fill="true" :option="option" @click="onclick" @buttonClick="buttonclick"></uni-goods-nav>
        </view>
    </view>
</template>

<script>
import { uniIcons } from '@dcloudio/uni-ui'
export default {
    components: { uniIcons },
    data() {
        return {
            goodDetailList: {},
            options: [{
                icon: 'shop',
                text: '店铺'
            }, {
                icon: 'cart',
                text: '购物车',
                info: 2
            }],
            // 右侧按钮组的配置对象
            buttonGroup: [{
                text: '加入购物车',
                backgroundColor: '#ff0000',
                color: '#fff'
            },
            {
                text: '立即购买',
                backgroundColor: '#ffa200',
                color: '#fff'
            }],
            defaultImage: 'my-project/public/OIP-C.jpg'

        }
    },
    //生命周期 - 创建完成（访问当前this实例）
    created() {
    },
    //生命周期 - 挂载完成（访问DOM元素）
    mounted() {

    },
    onLoad(options) {
        this.getgoodsdetail(options.goods_id)
    },
    methods: {
        async getgoodsdetail(item) {
            const { data: res } = await uni.$http.get('/api/public/v1/goods/detail?goods_id=' + item)
            if (res.meta.status !== 200) {
                return uni.$showMsg()
            }
            // 解决图片底部空白的部分,并且解决，webp在ios显示问题
            res.message.goods_introduce = res.message.goods_introduce.replace(/<img /g, '<img style="display:block;" ').replace(/webp/g, 'jpg')
            this.goodDetailList = res.message
            console.log(this.goodDetailList);
        },
        preview(i) {
            // 调用 uni.previewImage() 方法预览图片
            uni.previewImage({
                // 预览时，默认显示图片的索引
                current: i,
                // 所有图片 url 地址的数组
                urls: this.goodDetailList.pics.map(x => x.pics_big)
            })
        },
        // 点击底部栏左侧
        onclick() {
            console.log(111)
        },
        // 点击底部栏右侧
        buttonclick() {
            // 跳转到购物车页面
            uni.switchTab({
                url: '/pages/cart/cart'
            })
        }
    }
}
</script>
<style scoped>
swiper {
    width: 100%;
    height: 750rpx;
    margin: 0 auto;
}

swiper image {
    width: 100%;
    height: 100%;
}

.goods-info-box {
    width: 100%;
}

.price {
    font-size: 25px;
    /* margin-top: 100px; */
    color: rgb(227, 226, 226);
    width: 90%;
    margin: 4% auto;
    position: relative;
    top: 70%;
    border-radius: 10px;
    background-color: rgb(220, 107, 107);
}

.goods-info-body {
    position: relative;
    top: 20px;
    width: 90%;
    height: 150px;
    margin-left: 5%;
    background-color: rgb(229, 225, 225);
    padding-top: 10px;
    padding-left: 10px;
    border-radius: 20px;
    font-size: 17px;
    font-weight: 400;
    color: rgb(84, 83, 83);
}


.yf {
    width: 100%;
    position: absolute;
    left: 10px;
    font-size: 17px;
    color: rgb(190, 131, 131);
    bottom: 10px;
}

.favi text {
    color: rgb(138, 138, 2);
    position: absolute;
    left: 30px;
}

.richText {
    position: relative;
    top: 50px;
}

.goodsNav {
    width: 100%;
    position: fixed;
    bottom: 1px;
}
</style>