const cloud = require('wx-server-sdk');

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
});
const db = cloud.database();
const _ = db.command

exports.main = async (event, context) => {
 
  let { OPENID, APPID } = cloud.getWXContext()

  let com=event.com
  

    db.collection('users').
    where({
      openid:OPENID
    }).update({
      data:{
        comment:_.push(com)
      }
    })
    // console.log("bbb")
  
};