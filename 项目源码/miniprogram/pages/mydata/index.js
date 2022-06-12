// pages/mydata/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userinfo:{},
    enroll:[],
    comment:[],
    comments:[],
    star:0,
  },

 

  

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
this.getenroll()
  },

  async getenroll(){

    let that=this
    await wx.cloud.callFunction({
      // 云函数名称
      name: 'getEnroll',
      // 传给云函数的参数
      data: {
       
      },
      success: function(res) {
        // console.log(res.result.res.data[0].enroll)
        that.setData({
          enroll:res.result.res.data[0].enroll,
          comment:res.result.res.data[0].comment
        })
      //  console.log(that.data.comment)
      that.getcomment()
      },
      fail: console.error
    });
    
   
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    const user=wx.getStorageSync("userinfo");
   
    this.setData({userinfo:user});
    this.getenroll()
  },

  getcomment(){
    // console.log(this.data.comment)
    let co=[]
    let comm=this.data.comment
   
    for(var i=0;i<comm.length;i+=2)
    { let c=[]
      c.push(comm[i])
      c.push(comm[i+1])
      co.push(c)

    }

   let star=this.data.enroll.length+this.data.comments.length
     star=parseInt(star/5);

    this.setData({
      comments:co,
      star:star
    })
    console.log(co)
  }
 
})