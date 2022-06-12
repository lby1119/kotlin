// pages/searchMassage/index.js
import { areaList } from '../../common/area';

Page({

  /**
   * 页面的初始数据
   */
   data: {
    areaList,
    show:true,
    option1: [
      { text: '全部志愿', value: '全部志愿' },
      { text: '今日热榜', value: '今日热榜' },
      // { text: '精选专区', value: '精选专区' },
    ],
    option2: [
      { text: '全国各地', value: '全国各地' },
      { text: '北京市', value: '北京市' },
      { text: '天津市', value: '天津市' },
      { text: '河北省', value: '河北省' },
      { text: '山西省', value: '山西省' },
      { text: '内蒙古自治区', value: '内蒙古自治区' },
      { text: '辽宁省', value: '辽宁省' },
      { text: '吉林省', value: '吉林省' },
      { text: '黑龙江省', value: '黑龙江省' },
      { text: '上海市', value: '上海市' },

      { text: '江苏省', value: '江苏省' },
      { text: '浙江省', value: '浙江省' },
      { text: '安徽省', value: '安徽省' },
      { text: '福建省', value: '福建省' },
      { text: '江西省', value: '江西省' },
      { text: '山东省', value: '山东省' },
      { text: '河南省', value: '河南省' },
      { text: '湖北省', value: '湖北省' },
      { text: '湖南省', value: '湖南省' },
      { text: '广东省', value: '广东省' },

      { text: '广西壮族自治区', value: '广西壮族自治区' },
      { text: '海南省', value: '海南省' },
      { text: '重庆市', value: '重庆市' },
      { text: '四川省', value: '四川省' },
      { text: '贵州省', value: '贵州省' },
      { text: '云南省', value: '云南省' },
      { text: '西藏自治区', value: '西藏自治区' },
      { text: '陕西省', value: '陕西省' },

      { text: '甘肃省', value: '甘肃省' },
      { text: '青海省', value: '青海省' },
      { text: '宁夏回族自治区', value: '宁夏回族自治区' },
      { text: '新疆维吾尔自治区', value: '新疆维吾尔自治区' },
      { text: '台湾省', value: '台湾省' },
      { text: '香港特别行政区', value: '香港特别行政区' },
      { text: '澳门特别行政区', value: '澳门特别行政区' },

    ],
    value1:'全部志愿',
    value2: '全国各地',
    //活动数组
    activityList:[],
    activityLists:[],
    imgUrl:''
  },

  async getActivityList(){
     
    let that=this
    let activity=[]
    let act=[]
    let activitys=[]
    let size=0
    let i
    wx.cloud.callFunction({
      // 云函数名称
      name: 'getActivity',
      // 传给云函数的参数
      data: {
       
      },
      success: function(res) {
        //  that.data.activityList=res.result.res.data
       activity.unshift(res.result.res.data)
       that.setData({
         activityList:activity[0]
       })
        console.log(that.data.activityList)

         size=that.data.activityList.length
        // console.log(size)
        for(i=0;i<=size/2;i++)
          {
            act=[]
            act.push(that.data.activityList[i*2])
            if((2*i+1)<size)
            {act.push(that.data.activityList[i*2+1])}
            activitys.push(act)
          }

        that.setData({
          activityLists:activitys,
        })
        console.log(that.data.activityLists)
      },
      fail: console.error
    });
  // this.data.ifget=true;
  //console.log(this.data.activityList)
  
  

  },

  // 根据省份选择
  async getProvince(){
    let that=this
    let activity=[]
    let act=[]
    let activitys=[]
    let size=0
    let i
    let pro=that.data.value2
    wx.cloud.callFunction({
      // 云函数名称
      name: 'getProvince',
      // 传给云函数的参数
      data: {
       province:pro
      },
      success: function(res) {
        //  that.data.activityList=res.result.res.data
       activity.unshift(res.result.res.data)
       that.setData({
         activityList:activity[0]
       })
        console.log(that.data.activityList)

         size=that.data.activityList.length
        // console.log(size)
        for(i=0;i<=size/2;i++)
          {
            act=[]
            act.push(that.data.activityList[i*2])
            if((2*i+1)<size)
            {act.push(that.data.activityList[i*2+1])}
            activitys.push(act)
          }

        that.setData({
          activityLists:activitys,
        })
        console.log(that.data.activityLists)
      },
      fail: console.error
    });
  // this.data.ifget=true;
  //console.log(this.data.activityList)
  },

  // 省份改变时调用
  provinceChange(){
    // console.log(this.data.value2)
    this.getProvince()
  },


  // 热榜调用
  async getHotActivity(){
    let that=this
    let activity=[]
    let act=[]
    let activitys=[]
    let size=0
    let i
    let pro=that.data.value2
    wx.cloud.callFunction({
      // 云函数名称
      name: 'getHotActivity',
      // 传给云函数的参数
      data: {
      
      },
      success: function(res) {
        //  that.data.activityList=res.result.res.data
       activity.unshift(res.result.res.data)
       that.setData({
         activityList:activity[0]
       })
        console.log(that.data.activityList)

         size=that.data.activityList.length
        // console.log(size)
        for(i=0;i<=size/2;i++)
          {
            act=[]
            act.push(that.data.activityList[i*2])
            if((2*i+1)<size)
            {act.push(that.data.activityList[i*2+1])}
            activitys.push(act)
          }

        that.setData({
          activityLists:activitys,
        })
        console.log(that.data.activityLists)
      },
      fail: console.error
    });
  },

  // option1改变时调用
  option1Change(){
    this.getHotActivity()
  },

  getDetail(e){
    var imgurl=e.currentTarget.id
    wx.setStorageSync('img', imgurl)
    wx.navigateTo({
      url: '../messageDetail/index',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

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
    this.getActivityList()
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