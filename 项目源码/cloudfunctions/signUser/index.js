const cloud = require('wx-server-sdk');

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
});
const db = cloud.database();


exports.main = async (event, context) => {
  // console.log(event.num)
  // console.log(event.list)
  // console.log(event.user)
  let { OPENID, APPID } = cloud.getWXContext()
  res=await db.collection('users').where({
    openid:OPENID
  }).get()

  console.log(res.data.length)
  

  if(res.data.length==0){
   await db.collection('users').add({
      data:{
        openid:OPENID,
        num:event.num,
        list:event.list,
      }
    })
  //  console.log("aaa")
  }
  else{
    db.collection('users').
    where({
      openid:OPENID
    }).update({
      data:{
        list:event.list,
        num:event.num
      }
    })
    // console.log("bbb")
  }
};