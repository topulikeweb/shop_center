<!-- 自定义搜索框 -->
<template>
    <!--  -->
    <view class="my-search-container">
        <view class="my-search-box" @click="forsearch()">
            <uni-icons type="search" size="30" class="icons"></uni-icons>
            <text class="search">Search</text>
        </view>
    </view>
</template>

<script>
import { uniIcons } from '@dcloudio/uni-ui'
//import uniBadge from '@dcloudio/uni-ui/lib/uni-badge/uni-badge.vue' //也可使用此方式引入组件
export default {
    components: { uniIcons },
    data() {
        return {

        }
    },
    methods: {
        // 点击自定义的搜索框进行跳转
        forsearch() {
            uni.navigateTo({
                url: `/subpkg/search/tosearch`
            })
        }
    },
    //生命周期 - 创建完成（访问当前this实例）
    created() {

    },
    //生命周期 - 挂载完成（访问DOM元素）
    mounted() {

    }
}
</script>
<style scoped>
/* @import url(); 引入css类 */
.my-search-container {
    top: 0;
    /* position: fixed; */
    /* display: flex; */
    height: 50px;
    width: 100%;
    background-color: #ef4a4b;
    z-index: 999;
}

.my-search-box {
    width: 80%;
    margin: auto auto;
    background-color: rgb(248, 241, 228);
    height: 30px;
    border-radius: 15px;
    z-index: 9999;
}

.icons {
    position: relative;
    left: 20px;
}

.search {
    /* display: block; */
    position: absolute;
    left: 45%;
    font-size: 14px;
    height: 30px;
    text-align: center;
    line-height: 40px;
    color: rgb(90, 91, 92);
}
</style>