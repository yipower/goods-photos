<template>
  <view>
     <image mode="widthFix" :src="newnewvertical[0].thumb"></image>
<view class="download">
      <view class="download_btn" @click="handleDownload">下载图片 </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      id: 0,
      newnewvertical:[]
    };
  },
  onLoad(options) {
    console.log(options);
    this.id = options.id;
    this.getList();
  },
  methods: {
    getList() {
      let vertical = getApp().globalData.vertical;
     
      let newArr4 = vertical.filter((item, index, arr) => {
          return item.id === this.id;
      });
     
      this.newnewvertical=newArr4
     
    },
     async handleDownload() {
      await uni.showLoading({
        title:"下载中"
      })

     
      const result1 = await uni.downloadFile({ url: this. newnewvertical[0].thumb})
      const { tempFilePath } = result1[1];

      const result2 = await uni.saveImageToPhotosAlbum({ filePath: tempFilePath });
     

      uni.hideLoading();
      await uni.showToast({
        title:"下载成功"
      })
    }
  },
};
</script>

<style lang="scss" scoped>
image {
  width: 100%;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
}
.download {
  
  .download_btn {
    color: $color;
   position: absolute;
   bottom: 30rpx;
    left: 50%;
    font-weight: 700;
    font-size: 40rpx;
    transform: translateX(-50%);
  border: 4px solid $color;
  border-radius: 20rpx;
  }
}
</style>