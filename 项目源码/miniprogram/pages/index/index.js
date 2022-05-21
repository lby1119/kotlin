// index.js
// const app = getApp()
const { envList } = require('../../envList.js');

Page({

    data: {
        current: 0,
        // 轮播图数组
       swiperList: [
        {
          goods_id:0,
          url:"../../images/3.png"
         },
        {
         goods_id:1,
         url:"../../images/1.png"
        },
        {
         goods_id:2,
         url:"../../images/2.png"
        },
       
      ],

      //活动数组
      activityList:[],
      activityLists:[],
      // ifget:false,
    
    },

    // showactivity(){
    //   console.log(this.data.activityList)
    // },

  
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
          console.log(size)
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

  


    onShow(){
      this.getActivityList()
      
    },
   
    onPullDownRefresh() {
      this.getActivityList()
    },

});

  