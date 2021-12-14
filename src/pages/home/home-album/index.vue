<template>
  <scroll-view 
  scroll-y="true"  
  @scrolltolower="handleToLower"
  class="album_scroll_view"
  >
    <!-- 轮播图开始 -->
    <view class="album_swiper">
      <swiper
      autoplay
      indicator-dots
      circular
      >
        <swiper-item
        v-for="item in banner"
        :key="item.id"
        >
          <image :src="item.thumb" mode="widthFix"></image>
        </swiper-item>
      </swiper>
    </view>
    <!-- 轮播图结束 -->

      <!-- 列表 开始 -->
    <view class="album_list">
      <navigator
      v-for="(item) in album"
      :key="item.id"
      :url="`/pages/detail/Detail?id=${item.id}`"
      
      >
        <view class="album_img">
          <image
            mode="aspectFill"
            :src="item.cover"
          ></image>
        </view>
        <view class="album_info">
          <view class="album_name">
            {{item.name}}
          </view>
          <view class="album_desc">{{item.desc}}</view>
          <view class="album_btn">
            <view class="album_attention">关注</view>
          </view>
        </view>
      </navigator>
    </view>
    <!-- 列表 结束 -->
  </scroll-view>
</template>

<script>
//  使用 setNavigationBarTitle 修改 页面标题

//  发送请求获取数据

//  使用 swiper 轮播图组件

//  使用 scroll-view 组件实现分页

//  点击跳转到 专辑详情页

export default {
  // 修改标题
  data(){
    return{
      params:{
        limit: 30,
        order: "new",
        skip: 0
      },
       // 轮播图数字
      banner: [],
      // 列表数组
      album: [],
      hasMore:true
    }
  },
  mounted(){
    
    uni.setNavigationBarTitle({title:"专辑"})
    this.getList();
    
  },
  methods:{
    getList(){
      this.request({
        url:"http://service.picasso.adesk.com/v1/wallpaper/album",
        data:this.params
      })
      .then(result=>{
        console.log(result);
       if (this.banner.length === 0) {
          this.banner = result.res.banner;
        };
       if(result.res.album===0){
         this.hasMore=false
         uni.showToast({
           title:'没有更多数据了',
           icon:"none"
         })
         console.log(result.res);
       }
        this.album=[...this.album,...result.res.album]
        getApp().globalData.newAlbum=this.album
      console.log(getApp().globalData);
      })
    },
    handleToLower(){
    
      if(this.hasMore){
        this.params.skip+=this.params.limit,
        this.getList();
      }else{
        uni.showToast({
          title:"没有更多数据了",
          icon:"none"
        })
      }
     
    },
   
      
    
  }
}
</script>

<style lang="scss">
.album_scroll_view {
  height: calc(100vh - 36px);
}
.album_swiper {
  margin-bottom: 10rpx;
  swiper {
    // 750rpx 326.0869565217392
    // height: calc(750rpx / 2.3 );
    height: 326.1rpx;
    image {
      height: 100%;
    }
  }
}
.album_list {
  navigator {
    padding: 10rpx 5rpx;
    display: flex;
    .album_img {
      flex: 2;
      image {
        width: 200rpx;
        height: 200rpx;
      }
    }

    .album_info {
      flex: 5;
      position: relative;
      .album_name {
        color: black;
        font-weight: 600;
        
      }

      .album_desc {
        font-size: 24rpx;
      }

      .album_btn {
        position: absolute;
        right: 0;
        bottom: 0;
        overflow: hidden;
        color: $color;
        .album_attention {
          border: 1rpx solid $color;
        }
      }
    }
  }
}
</style>