export default(params)=>{
    // 请求前显示加载中
   uni.showLoading({
        title: "加载中",
       
    });
    return new Promise((resolve,reject)=>{
        uni.request({
            ...params,
           
            success: res => {
                resolve(res.data)
               },
            fail:err=>{
                reject(err)
            },
            complete(){
                // 成功回调加载后隐藏掉
                uni.hideLoading();
            }
        })
        
    })
}