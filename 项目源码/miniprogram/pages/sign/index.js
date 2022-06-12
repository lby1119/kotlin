let num =0
 
 
Page({
  /**
   * 页面的初始数据
   */
  data: {
    data_arr:["日","一","二","三","四","五","六"],
    year:"",
    month:"",
    today:[],
    num:0,
 
    nowlist:[],
    signList:[
      [],[],[],[],[],[],[],[],[],[],[],[],
    ],

    hasUserInfo:false,
    signday:false,
  },


  qiandao(){ 
    
    let m = wx.getStorageSync('day')
    
    var time = new Date().getDate()
    
    if(m!=time){
    
    wx.showToast({
      title: '今日已成功签到',
      duration:2000
    })
    num=1+this.data.num
    // console.log(this.data.num)
    // console.log(num+'aaa')
    let cloudId=wx.getStorageSync('cloudId')
    let list=this.data.signList
    list[new Date().getMonth()].push(new Date().getDate())
    // console.log("1111111")
    // console.log(cloudId)

    
    
     wx.setStorageSync('day', new Date().getDate()) 
    // wx.setStorageSync('month', new Date().getMonth()+1)
    // wx.setStorageSync('num', this.data.num)

    wx.cloud.callFunction({
      // 云函数名称
      name: 'signUser',
      // 传给云函数的参数
      data: {
       user:cloudId,
       num:num,
       list:list
      },
      success: function(res) {
        //  that.data.activityList=res.result.res.data
      //  activity.unshift(res.result.res.data)
      
      },
      fail: console.error
    });



    let todaylist = this.data.today
    todaylist.push({
      today:time
    })
    
    this.setData({
      num:num,
      today:todaylist,
      signList:list
    })
    
    
    this.showCalendar()
   
    
}
else{
  wx.showToast({
    title: '今日已签到',
    icon:'error',
    duration:11000
  })

}
   
  },
 

  async getUserSign(){
    let that=this
    wx.cloud.callFunction({
      // 云函数名称
      name: 'getUserSign',
      // 传给云函数的参数
      data: {
       
      },
      success: function(res) {
       console.log(res)
       that.setData({
         signList:res.result.list,
         num:res.result.num
       })
       
     
      
      },
      fail: console.error
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let HasUserInfo=wx.getStorageSync('hasUserInfo') 
    
    
 
  //  let number = wx.getStorageSync('num')   
   let day = wx.getStorageSync('day')
   let getmonth =wx.getStorageSync('month')
   let nowlist = this.data.nowlist
   nowlist.push({
     today:day,
     month:getmonth
   })
    this.setData({
      // num:number,
     today:nowlist,
     hasUserInfo:HasUserInfo
    })
   
    let now = new Date()
    let year = now.getFullYear()
    // month获取是从 0~11
    let month = now.getMonth() + 1
    this.setData({
      year,month
    })


    if(HasUserInfo==false)
    {
      
      wx.reLaunch({
        url: '/pages/myMassage/index'
      })
    }
    this.getUserSign()
    this.showCalendar()
   
 
  },


  onShow(){
    let HasUserInfo=wx.getStorageSync('hasUserInfo')
    this.setData({
      hasUserInfo:HasUserInfo
    })
    
    
    if(HasUserInfo==false)
    {
       wx.showToast({
        title: '请先登陆',
        icon:'error',
        duration:2000
      })
      
    
    }
    this.getUserSign()
    this.showCalendar()
    
  },


  showCalendar(){
    let {year,month} = this.data
    // console.log(month)
    //以下两个month已经+1
    let currentMonthDays = new Date(year,month,0).getDate() //获取当前月份的天数
    let startWeek = new Date(year + '/' + month + '/' + 1).getDay(); //本月第一天是从星期几开始的
    this.setData({
      currentMonthDays,startWeek
    })
    // console.log(this.data.currentMonthDays)
    // console.log(this.data.startWeek)
  },
 
  //上个月按钮
  bindPreMonth(){
    let {year,month} = this.data
    //判断是否是1月
    if(month - 1 >= 1){
      month = month - 1 
    }else{
      month = 12
      year = year - 1
    }
    this.setData({
      month,year
    })
    this.showCalendar()
  },
 
  //下个月按钮
  bindNextMonth(){
    let {year,month} = this.data
    //判断是否是12月
    if(month + 1 <= 12){
      month = month + 1 
    }else{
      month = 1
      year = year + 1
    }
    this.setData({
      month,year
    })
    this.showCalendar()
  }
 
})