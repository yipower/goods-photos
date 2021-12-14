<template>
  <view>
    sdasdasd
    <!-- <view class="album_bg" v-for="(item) in wallpage" :key="item.id">
      <view :src="item.thumb  ">
        <image ></image>
        <view class="album_info">
          <view class="album_name">{{ album.name }}</view>
          <view class="album_btn">关注专辑</view>
        </view>
      </view>
    </view> -->
  </view>
</template>

<script>
export default {
 
  data() {
    return {
      params: {
        limit: 30,
        order: "new",
        skip: 0,
        first: 1,
      },
      album: {},
      wallpaper: [],
      id:-1
    };
  },
  onLoad(options){
      console.log(options.id);
      this.id=options.id
      console.log(this.id);
      this.getList(this.id)
  },
  methods: {
    getList() {
      this.request({
        url: `http://157.122.54.189:6006/image/v1/wallpaper/album/${this.id}/wallpaper`,
        data: this.params,
      }).then((result) => {
        console.log(result);
        this.album = result.res.album;
        this.wallpaper = result.res.wallpaper;
      });
    },
  },
};
</script>

<style>
</style>