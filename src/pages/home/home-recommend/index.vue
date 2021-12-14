<template>
  <scroll-view
    @scrolltolower="handleToLower"
    scroll-y
    class="recommend_view"
    v-if="recommends.length > 0"
  >
    <!-- 推荐” 列表开始 -->
    <view class="recommend_wrap">
      <navigator class="commend_list" v-for="(item) in recommends" 
      :key="item.id" 
      :url='`/pages/detail8/DetailTwo?id=${item.id}`'
      
      >
        <image mode="widthFix" :src="item.thumb"></image>
      </navigator>
    </view>
    <!-- 推荐” 列表结束 -->

    <view class="monthes_wrap">
      <!-- 标题 -->
      <view class="monthes_title">
        <view class="monthes_title_info">
          <view class="monthes_info">
            <text> {{ monthes.DD }} / {{ monthes.MM }} 月 </text>
          </view>
          <view class="monthes_text">
            {{ monthes.title }}
          </view>
        </view>
        <view class="monthes_title_more">更多></view>
      </view>
      <!-- 内容 -->
      <view class="monthes_content">
        <navigator class="monthes_item" v-for="item in monthes.items" 
        :key="item.id"
        :url='`/pages/detail4/DetailCommend2?id=${item.id}`'
        
        >
          <image mode="aspectFill" :src="item.thumb"></image>
        </navigator>
      </view>
    </view>
    <!-- “月份” 列表 开始-->

    <!-- 热门开始 -->
    <view class="hots_wrap">
      <view class="hots_title">
         <text> 热门 </text>
      </view> 
      <view class="hots_content">
        <navigator class="hot_item"
        v-for="item in hots"
        :key="item.id"
        :url='`/pages/detail5/DetailCommend3?id=${item.id}`'
        
        >
          <image mode="widthFix" :src="item.thumb"></image>
        </navigator>
      </view>
    </view>
    <!-- 热门结束 -->
  </scroll-view>
</template>

<script>
import moment from "moment";
import request from "@/utils/request"
export default {
 
  data() {
    return {
      recommends: [],
      monthes: {},
      hots: [],
      params: {
        // 要获取几条
        limit: 30,
        // 关键字
        order: "hot",
        // 要跳过几条
        skip: 0
      },
      hasMore:true
    };
   
  },
  mounted() {
    this.getList();
   
  },
  methods: {
    getList() {
      request({
        url: "http://service.picasso.adesk.com/v3/homepage/vertical",
        data: this.params
      }).then((result) => {
        // 判断有没有下一页数据
        if (result.res.vertical.length === 0) {
          this.hasMore = false;
          uni.showToast({
            title: "没有更多数据了",
            icon: "none"
          });
          return;
        }

        if(this.recommends.length===0){
          // console.log(result);
          this.recommends = result.res.homepage[1].items;
          this.monthes = result.res.homepage[2];
          
          // console.log(this.monthes);
          getApp().globalData.recommends=this.recommends
          this.monthes.MM = moment(this.monthes.stime).format("MM");
          this.monthes.DD = moment(this.monthes.stime).format("DD");
           getApp().globalData.recommendsMonths=this.monthes
        }
        this.hots=[...this.hots,...result.res.vertical]
        getApp().globalData.recommendsHots=this.hots
        
      });
    },
    
    handleToLower() {
      /* 
      1 修改参数  skip+=limit;
      2 重新发送请求 getList()
      3 请求回来成功  hots 数据的叠加 
       */
      if(this.hasMore){
        this.params.skip += this.params.limit;
      this.getList();
      }else{
        uni.showToast({
            title:"没有更多数据了",
            icon:"none"
          })
        
      }
      
    },
  },
};
</script>

<style lang="scss">
.recommend_view {
  height: calc(100vh - 36px);
}
.recommend_wrap {
  display: flex;
  flex-wrap: wrap;

  .commend_list {
    width: 50%;

    image {
      padding: 2rpx 2rpx;
    }
  }
}
.monthes_wrap {
  .monthes_title {
    display: flex;
    justify-content: space-between;
    .monthes_title_info {
      font-weight: 700;
      display: flex;

      padding: 20rpx;
      .monthes_info {
        text {
          color: $color;
          margin-right: 20rpx;
        }
      }

      .monthes_text {
      }
    }

    .monthes_title_more {
      font-weight: 700;
      margin-top: 20rpx;
      margin-right: 50rpx;
      color: $color;
      font-size: 26rpx;
    }
  }

  .monthes_content {
    display: flex;
    flex-wrap: wrap;
    .monthes_item {
      width: 33%;
      padding: 2rpx 2rpx;
      image {
        width: 100%;
      }
    }
  }
}
.hots_wrap {
  .hots_title {
    padding: 20rpx;
    text {
      border-left: 20rpx solid $color;
      padding-left: 20rpx;
      font-size: 34rpx;
      font-weight: 600;
    }
  }

  .hots_content {
    display: flex;
    flex-wrap: wrap;
    .hot_item {
      width: 33.33%;
      border: 5rpx solid #fff;
      image {
      }
    }
  }
}
</style>