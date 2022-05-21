const cloud = require('wx-server-sdk');

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
});
const db = cloud.database();

//发不信息详情页
exports.main = async (event, context) => {
  db.collection('details').add({
    // data 字段表示需新增的 JSON 数据
    data: {
      // _id: 'todo-identifiant-aleatoire', // 可选自定义 _id，在此处场景下用数据库自动分配的就可以了
      title: event.title,
      username:event.username,
      province:event.province,
      telephone:event.telephone,
      detail:event.detail,
      imageUrl:event.imageUrl,
      createTime:db.serverDate() //添加时间
    },
    success: function(res) {
      // res 是一个对象，其中有 _id 字段标记刚创建的记录的 id
      console.log(res)
    }
  })
};