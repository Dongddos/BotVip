module.exports.config = {
  name: "info2",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "Horizon",
  description: ".hee",
  commandCategory: "người dùng",
  usages: "", 
  cooldowns: 5 
};
module.exports.run =async function({ api, event,args,client }) { 
  const fs = global.nodemodule["fs-extra"]; 
  const request = global.nodemodule["request"]; 
  const axios = global.nodemodule['axios']; 
  
  var data = await api.getUserInfoV2(event.senderID); var name = data.name 
  var username = data.username
var follow = data.follow
var uid = data.uid
var about = data.about
var gender = data.gender
var birthday = data.birthday
var love = data.relationship_status
var rela = data.love.name
var location = data.location
var hometown = data.hometown
var url_profile = data.link
var web = data.website v
var quotes = data.quotes
var link = data.imgavt


api.sendMessage(`👤Tên: ${name || null}\n💟UserName: ${username}\n🔎UID: ${uid}\n👀Follow: ${follow}\n👭 Giới tính: ${gender}\n🎉 Sinh Nhật: ${birthday}\n💌 Mối quan hệ: ${love}\n💞Love name: ${rela}\n🏡 Sống tại: ${location}\n🌏Đến từ: ${hometown}\n💻Website: ${web}\n📌URL cá nhân: ${url_profile}\n⚜Trích dẫn: ${quotes}`, event.threadID); 
  
  
  }




//msg = `💟UserName: ${username}\n🔎UID: ${uid}\n👀Follow: ${follow}\n👭 Giới tính: ${gender}\n🎉 Sinh Nhật: ${birthday}\n💌 Mối quan hệ: ${love}\n💞Love name: ${rela}\n🏡 Sống tại: ${location}\n🌏Đến từ: ${hometown}\n💻Website: ${web}\n📌URL cá nhân: ${url_profile}\n⚜Trích dẫn: ${quotes}`