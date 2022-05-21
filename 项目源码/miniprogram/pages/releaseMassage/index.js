// pages/releaseMassage/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showUploadTip: false,
    haveGetImgSrc: false,
    envId: '',
    imgSrc: '',
    title:'',
    username:'',
    telephone:'',
    message:'',
    imgpath:'',
    province:'',
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },


  realseMassage(){
    
    
    wx.cloud.callFunction({
      // 云函数名称
      name: 'realseMassage',
      // 传给云函数的参数
      data: {
        title:this.data.title,
        username:this.data.username,
        telephone:this.data.telephone,
        detail:this.data.message,
        imageUrl:this.data.imgSrc,
        province:this.data.province,
      },
      success: function(res) {
        console.log(res.data) 
      },
      fail: console.error
    });
     
    wx.reLaunch({
      url: '/pages/index/index'
    })
 
  },


  gettime(){
   var time=new Date();
  // console.log(time.getTime())
  this.data.imgpath=time.getTime();
  },

  uploadImg() {
    this.gettime();
    wx.showLoading({
      title: '',
    });
    // 让用户选择一张图片
    wx.chooseImage({
      count: 1,
      success: chooseResult => {
        // 将图片上传至云存储空间
        wx.cloud.uploadFile({
          // 指定上传到的云路径
          cloudPath: 'images/'+this.data.imgpath+'.png',
          // 指定要上传的文件的小程序临时文件路径
          filePath: chooseResult.tempFilePaths[0],
          config: {
            env: this.data.envId
          }
        }).then(res => {
          console.log('上传成功', res);
          
          this.setData({
            haveGetImgSrc: true,
            imgSrc: res.fileID
          });
          wx.hideLoading();
        }).catch((e) => {
          console.log(e);
          wx.hideLoading();
        });
      },
    });

    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})