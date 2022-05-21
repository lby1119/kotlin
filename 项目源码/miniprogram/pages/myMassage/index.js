// pages/user/index.js
Page({
  data: {
    userinfo:{},
   
   
  },
  onShow(){
    const user=wx.getStorageSync("userinfo");
   
   this.setData({userinfo:user});
      
  }
})