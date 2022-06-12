const cloud = require('wx-server-sdk');

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
});
const db = cloud.database();


exports.main = async (event, context) => {
 
  let { OPENID, APPID } = cloud.getWXContext()
  var list=[
    [],[],[],[],[],[],[],[],[],[],[],[], ]

  var enroll=[]
  var comment=[]

  

  res=await db.collection('users').where({
      openid:OPENID
  }).get()

  if(res.data.length==0){
    await db.collection('users').add({
      data:{
        openid:OPENID,
        num:0,
        list:list,
        enroll:enroll,
        comment:comment,
      }
    })
  }
 
   
  //  console.log("aaa")
  
};