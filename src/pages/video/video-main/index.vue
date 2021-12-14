<template>
  <scroll-view class="video_wrap"  @scrolltolower="handleScrolltolower" scroll-y >
      <view class="video_main">
    <view class="video_item" v-for="item in videowp" :key="item.id" @click="handleGoVideo(item)">
      <image :src="item.img"
      mode="widthFix"
      > </image>
    </view>
    </view>
  </scroll-view>
</template>

<script>
export default {
  props: {
    urlobj: Object,
  },
  data() {
    return {
      videowp: [],
      hasMore:true
    };
  },
  methods: {
    getList() {
      this.request({
        url: this.urlobj.url,
        data: this.urlobj.params,
      }).then((result) => {
        console.log(result);
        if(result.res.videowp.length===0){
            this.hasMore=false
            uni.showToast({
                title:"没有更多数据了",
                icon:'none'
            })
        }
        this.videowp =[...this.videowp,... result.res.videowp]
      });
    },
    handleScrolltolower(item){
        if(this.hasMore){
            this.urlobj.params.skip+=this.urlobj.params.limit
            this.getList();
        }else{
            uni.showToast({
                title:"没有更多数据了",
                icon:"none"
            })
        }
    },
    handleGoVideo(item){
        getApp().globalData.video=item
        uni.navigateTo({
        url:"/pages/videoPlay/index"
      })
    }
  },
  watch: {
    urlobj() {
      this.videowp=[];
      this.getList();
    }
  },
  mounted() {
      
    this.getList();
    
  },
};
</script>

<style lang="scss" scoped>
.video_wrap{
    height: calc(100vh - 36px);
}
.video_main {
    display: flex;
    flex-wrap: wrap;   
  .video_item {
      width: 33.3%;
      padding: 3rpx 3rpx;
    image {
        width: 100%;
    }

  }
}
</style>