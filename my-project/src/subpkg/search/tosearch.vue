<!--  -->
<template>
    <view>
        <!-- 搜索框 -->
        <view class="search-box">
            <uni-search-bar @input="toinput" :radius="100" cancelButton="none" class="searchBox"></uni-search-bar>
        </view>
        <!-- 搜索历史 -->
        <view class="History-box" v-if="hd">
            <view class="history">
                <uni-icons type="search" size="28" />
                <text class="text">搜索历史</text>
                <button hover-class="button-hover" @click="deleteAll" class="deleteAll">
                    清空
                </button>
            </view>

            <!-- 搜索历史记录列表区 -->
            <view class="BigBox">
                <view v-for="(item, index) in historys" class="history-list-box">
                    <view class="historyName" @click="tohistory(index)" id="reference">{{ item }}</view>
                </view>
            </view>
        </view>

        <!--搜索结果 -->
        <view class="sugg-list" v-for="(item, index) in SearchList">
            <view class="sugg-list-item" @click="toSearchDetail(item.goods_id)">{{ item.goods_name }}</view>
            <uni-icons class="icons" type="circle" size="14" />
        </view>
    </view>
</template>

<script>
import { uniIcons } from '@dcloudio/uni-ui'


export default {
    components: { uniIcons },
    data() {
        return {
            timer: null,
            kw: '',
            SearchList: [],// 搜索结果列表
            historyList: [],
            hd: true,
        }
    },
    computed: {
        historys() {
            return [...this.historyList].reverse()
        }
    },
    methods: {
        // 输入数据的时候调用
        toinput(event) {
            clearTimeout(this.timer)
            this.timer = setTimeout(() => {
                this.kw = event
                this.getSearchList()
                if (!event) {
                    this.SearchList = []
                }
            }, 800)
            console.log(this.kw);
            console.log(this.historyList);
        },
        // 保存搜索记录
        saveHistory() {
            // this.historyList.push(this.kw)
            // 将Array数组转换为Set对象（因为set不能有重复数据）
            let set = new Set(this.historyList)
            // 添加数据，如果对象之中有就添加不进去
            set.add(this.kw)
            // 将Array对象转换为数组
            this.historyList = Array.from(set)
            // 将搜索记录储存在本地
            uni.setStorageSync('kw', JSON.stringify(this.historyList))
        },
        async getSearchList() {
            // 如果数据为空，就不发起请求
            if (!this.kw) {
                return this.isempty()
            }
            const { data: res } = await uni.$http.get(`/api/public/v1/goods/qsearch`, { query: this.kw })
            if (res.meta.status !== 200) {
                return uni.$showMsg()
            }
            // 成功
            this.SearchList = res.message
            this.hd = this.SearchList.length === 0 ? true : false
        },
        // 判断搜索输入框是否为空
        isempty() {
            // 如果数据为空，就不发起请求   
            this.hd = true// 将搜素历史显现出来
            return this.SearchList = []
        },
        toSearchDetail(goods_id) {
            uni.navigateTo({
                url: `/subpkg/good_detail/good_detail?goods_id=${goods_id}`
            })
            // 当用户点击搜素出来的建议的时候，才记录输入内容当搜素记录
            this.saveHistory()
        },
        tohistory(index) {
            this.kw = this.historyList[index]
            this.getSearchList()
        },
        deleteAll() {
            this.historyList = []
            uni.setStorageSync('kw', [])
        }
    },
    //生命周期 - 创建完成（访问当前this实例）
    created() {
        this.historyList = JSON.parse(uni.getStorageSync('kw'))
    },
    //生命周期 - 挂载完成（访问DOM元素）
    mounted() {
    }
}
</script>
<style scoped>
/* @import url(); 引入css类 */
.search-box {
    position: sticky;
    top: 0;
    z-index: 999;
    background-color: rgb(227, 225, 224);
}

.sugg-list {
    width: 100%;
    position: relative;
}

.sugg-list-item {
    /* height:110rpx ; */
    background-color: rgb(238, 235, 235);
    width: 85%;
    margin-left: 10%;
    margin-top: 40px;
    text-indent: 2em;
    /* line-height: 100rpx; */
    font-size: 14px;
    color: rgb(107, 107, 107);
    transition: all 0.6s;
}

.sugg-list-item:hover {
    background-color: rgb(245, 213, 202);
    /* font-size: 16px; */
    color: rgb(12, 12, 12);
    border-radius: 10px;
}

.icons {
    position: absolute;
    left: 20px;
    top: 3px;
}

.BigBox {
    margin-top: 40px;
    display: flex;
    /* justify-content: space-around; */
    flex-wrap: wrap;
}

.historyName {
    color: rgb(112, 111, 111);
    height: 40px;
    line-height: 40px;
    text-align: center;
    margin-right: 10px;
    margin-top: 15px;
    margin-left: 10px;
    background-color: rgb(199, 204, 204);
    width: 70px;
    border-radius: 10px;
}

.historyName:hover {
    background-color: rgb(255, 156, 114);
}

.history {
    height: 30px;
    width: 100%;
    margin-left: 10px;
    position: relative;
    top: 20px;
}

.text {
    position: absolute;
    left: 40px;
    line-height: 35px;
    font-size: 18px;
    font-weight: 530;
}
.deleteAll{
    width:20%;
    background-color: rgb(237, 236, 234);
    position: absolute;
    border-radius: 10px;
    right: 40px;
    height: 40px;
    top: 5px;
    color: rgb(96, 95, 95);
    transition: all 0.6s;
    font-size: 16px;
}
.deleteAll:hover{
    background-color: rgb(247, 155, 49);
    color: brown;
}
</style>