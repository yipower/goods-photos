<template>
  <view>
    <image mode="widthFix" :src="newnewAlbum[0].cover"></image>
    <view class="download">
      <view class="download_btn" @click="handleDownload">下载图片 </view>
    </view>
  </view>
</template>

<script>
export default {
  //   data() {
  //     return {
  //       album: [],
  //       id: 0,
  //       arr: {},
  //        params:{
  //         limit: 30,
  //         order: "new",
  //         skip: 0
  //       },
  //     };
  //   },
  onLoad(options) {
    console.log(options);
    this.id = options.id;
  },
  //   mounted() {
  //     this.getList();
  //      this.params.skip+=this.params.limit,
  //      this.getList()
  //   },
  //   methods: {
  //     getList() {
  //       this.request({
  //         url: "http://service.picasso.adesk.com/v1/wallpaper/album",
  //         data:this.params
  //       }).then((result) => {

  //          this.album=[...this.album,...result.res.album]

  //         let newArr = this.album.filter((item, index, arr) => {
  //           return item.id === this.id;
  //         });

  //         this.arr = newArr;
  //         console.log(this.arr);
  //       });
  //     },
  //   },

  data() {
    return {
      newnewAlbum: [],
      album: [],
    };
  },
  mounted() {
    this.getList();
  },
  methods: {
    getList() {
      this.album = getApp().globalData.newAlbum;
      let newArr = this.album.filter((item, index, arr) => {
        return item.id === this.id;
      });

      this.newnewAlbum = newArr;
      console.log(this.newnewAlbum);
    },
    async handleDownload() {
      await uni.showLoading({
        title:"下载中"
      })

     
      const result1 = await uni.downloadFile({ url: this. newnewAlbum[0].cover});
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