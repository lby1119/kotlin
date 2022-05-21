const cloud = require('wx-server-sdk');

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
});
const db = cloud.database();


exports.main = async (event, context) => {
  
  let { OPENID, APPID } = cloud.getWXContext()
  res=await db.collection('users').where({
    openid:OPENID
  }).get()

  let signList=[
    [],[],[],[],[],[],[],[],[],[],[],[],
  ]
  let list=[]
  let num=0
  // console.log(res.data.length)
  

  if(res.data.length==0){
      // console.log('0')
    
      list=signList,
      num=0
    
   
  }
  else{
      // console.log('1')
      // console.log(res.data[0])
      list=res.data[0].list,
      num=res.data[0].num
      // console.log(list)
   
  }

  return{
    list:list,
    num:num
  }

};