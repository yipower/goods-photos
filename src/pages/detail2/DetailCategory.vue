<template>
  <view>
    <view class="category_tab">
      <view class="category_tab_title">
        <view class="title_inner">
          <uni-segmented-control
            :values="items.map(v=>v.title)"
            :current="current"
            @clickItem="onClickItem"
            style-type="text"
            active-color="#d4237a"
          ></uni-segmented-control>
        </view>
        <view class="iconfont iconsearch"></view>
      </view>
      <scroll-view @scrolltolower="handleScrolltolower" enable-flex scroll-y class="category_tab_content">
        <navigator class="cate_item"
        v-for="item in vertical"
        :key="item.id"
        :url="`/pages/detail7/DetailThree?id=${item.id}`"
        >
        
        <image :src="item.thumb" mode="widthFix" ></image>
        </navigator>
      </scroll-view>
    </view>
  </view>
</template>

<script>
import { uniSegmentedControl } from "@dcloudio/uni-ui";
export default {
  components: { uniSegmentedControl },
  data() {
    return {
      vertical: [],
      id: 0,
      params: {
        limit: 30,
        skip: 0,
        order: "new",
      },
      items: [
        { title: "最新", order: "new" },
        { title: "热门", order: "hot" },
      ],
      current: 0,
      hasMore:true
    };
  },
  onLoad(options) {
    console.log(options);
    this.id = options.id;
  },
  mounted() {
    this.getList();
  },
  methods: {
    getList() {
      this.request({
        url: `http://service.picasso.adesk.com/v1/vertical/category/${this.id}/vertical`,
        data: this.params,
      }).then((result) => {
        if(result.res.vertical.length===0){
            this.hasMore=false
            uni.showToast({
                title:"没有更多数据了",
                icon:'none'
            })
        };
        // console.log(result);
        
        this.vertical = [...this.vertical,...result.res.vertical];
          getApp().globalData.vertical=this.vertical
      });
    },
    onClickItem(e) {
      if (this.current !== e.currentIndex) {
        this.current = e.currentIndex;
      }
      this.params.order = this.items[e.currentIndex].order;
       this.params.skip=0;
        this.vertical=[];
      this.getList();
    },
    handleScrolltolower(){
         if(this.hasMore){
             this.params.skip+=this.params.limit
         }else{
               uni.showToast({
          title:"没有更多数据了",
          icon:"none"
        })
         }
       
        this.getList();
    },
  },
};
</script>

<style lang="scss" scoped>
.category_tab{
  .category_tab_title{
    position: relative;
    .title_inner{
      width: 60%;
      margin: 0 auto;
    }
    .iconsearch{
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      right: 5%;
    }
  }
  .category_tab_content{
    display: flex;
    flex-wrap: wrap;
    height: calc(100vh - 36px);
    .cate_item{
      width: 33.33%;
      border: 5rpx solid #fff;
      image{

      }
    }
  }
}
</style>