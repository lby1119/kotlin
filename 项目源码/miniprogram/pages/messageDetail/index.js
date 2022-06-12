// pages/message/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title:'',
    username:'',
    province:'',
    imgurl:'',
    telephone:'',
    detail:'',
    comment:'',
    id:'',

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
   this.getDetail()

  },

  async getDetail()
 {
   let that=this
   let imgurl=wx.getStorageSync('img')
   wx.cloud.callFunction({
    // 云函数名称
    name: 'getDetail',
    // 传给云函数的参数
    data: {
     imgurl:imgurl
    },
    success: function(res) {
    console.log(res.result.res.data[0])
     res=res.result.res.data[0]
     that.setData({
      title:res.title,
      username:res.username,
      province:res.province,
      imgurl:res.imageUrl,
      telephone:res.telephone,
      detail:res.detail,
      id:res._id,
      
     })
     
    },
    fail: console.error
  });

  
 },

  comment(){
  wx.showToast({
    title: '留言已收到',
    duration:1000
  })
  let comm=[this.data.title,this.data.comment]

  wx.cloud.callFunction({
    // 云函数名称
    name: 'comment',
    
    // 传给云函数的参数
    data: {
      com:comm
    },
    success: function(res) {
      
    },
    fail: console.error
  });
  // this.setData({
  //   comment:'',
  // })
 },

  enroll(){
    let HasUserInfo=wx.getStorageSync('hasUserInfo')
   

    
    if(HasUserInfo==false)
    {
       wx.showToast({
        title: '请先登陆',
        icon:'error',
        duration:2000
      })
      
      


    
    }else{
      wx.showToast({
        title: '报名成功',
        duration:1000
      })

      wx.cloud.callFunction({
        // 云函数名称
        name: 'enroll',
        // 传给云函数的参数
        data: {
          id:this.data.title
        },
        success: function(res) {
          
        },
        fail: console.error
      });
    }
   
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
      this.getDetail()
  },


})