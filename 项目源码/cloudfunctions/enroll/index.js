const cloud = require('wx-server-sdk');

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
});
const db = cloud.database();
const _ = db.command

exports.main = async (event, context) => {
 
  let { OPENID, APPID } = cloud.getWXContext()

  let id=event.id
  let li=[id]
  let fail='false'
     res=await db.collection('users').where({
      openid:OPENID,
    }).get()

    

    res=res.data[0].enroll

    for(var i=0;i<res.length;i++)
    {
      if(id==res[i])
      {
        fail='true'
      }
    }
    // console.log(fail)
  
  

   
    
    if(fail=='false'){
      console.log('false')
      db.collection('users').
      where({
        openid:OPENID
      }).update({
        data:{
          enroll:_.push(id)
        }
      })
    }
    
    // console.log("bbb")
  
};