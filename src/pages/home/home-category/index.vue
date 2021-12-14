<template>
  <view class="home_category">
    <navigator class="cate_item"
    v-for="(item) in category"
    :key="item.id"
    :url="`/pages/detail2/DetailCategory?id=${item.id}`"
    >   
      <image 
      :src="item.cover"
      mode="aspectFill"
      ></image>
      <text>
        {{item.name}}
      </text>
    </navigator>

  </view>
</template>

<script>
export default {
  data(){
    return{
      category:[]
    }
  },
  
  mounted(){
    uni.setNavigationBarTitle({title:"分类"})
     this.getList();
  },
  methods:{
    getList(){
      this.request({
        url:"http://service.picasso.adesk.com/v1/vertical/category",
      }).then(result=>{
        // console.log(result);
        this.category=result.res.category
        console.log(this.category);
      })
    }
  }
}
</script>

<style lang="scss">
.home_category {
  display: flex;
  flex-wrap: wrap;
  .cate_item {
   padding: 5rpx;
   width: 33.3%;
   position: relative;
    image {
      width: 100%;
      height: 240rpx;
    }

    text {
      position: absolute;
      bottom: 0;
      color: #fff;
      font-size: 35rpx;
       background-image: linear-gradient(to right top,rgba(0,0,0,.3),rgba(0,0,0,0));
      left: 30rpx;
      bottom: 10rpx;
    }
  }
}
</style>