module.exports.config = {
    name: "info",
    version: "1.0.0",
    hasPermssion: 0,
    credits: "D-Jukie",
    description: "Xem thông tin của người dùng facebook",
    commandCategory: "Nhóm",
    usages: "[reply/tag/id]",
    cooldowns: 3
    
};
module.exports.run = async({api,event,args}) => {
    const fs = global.nodemodule["fs-extra"];
    const request = global.nodemodule["request"];
    const axios = global.nodemodule['axios'];  

    if(!args[0]){
    if(event.type == "message_reply") { uid = event.messageReply.senderID }
    else uid = event.senderID;
   const res = await axios.get(`https://www.nguyenmanh.name.vn/api/fbInfo?id=${uid}&apikey=nf7dOsyM`);  
    var gender = res.data.result.gender == 'male' ? "Nam" : res.data.result.gender == 'female' ? "Nữ" : "Không công khai";
    var birthday = res.data.result.birthday ? `${res.data.result.birthday}` : "...";
    var love = res.data.result.love ? `${res.data.result.love}` : "Độc Thân"
    var location = res.data.result.location ? `${res.data.result.location}` : "..."
	var hometown = res.data.result.hometown ? `${res.data.result.hometown}` : "Không công khai"
    var url_profile = res.data.result.profileUrl  ? `${res.data.result.profileUrl}` : `${url_profile}`
      var web = res.data.result.website ? `${res.data.result.website}` : ""
      var quotes = res.data.result.quotes ? `${res.data.result.quotes}` : ""
      var about = res.data.result.about ? `${res.data.result.about}` : ""
      
    var callback = () => api.sendMessage({body:`👤Tên: ${res.data.result.name}\n🔎UID: ${uid}\n👀Follow: ${res.data.result.follow}\n👭 Giới tính: ${gender}\n🎉 Sinh Nhật: ${birthday}\n💌 Mối quan hệ: ${love}\n🏡 Sống tại: ${location}\n🌏Đến từ: ${hometown}\n📌URL cá nhân: ${url_profile}\n💻Website: ${web}\n⚜Trích dẫn: ${quotes}\n💤about: ${about}`,
        attachment : fs.createReadStream(__dirname + "/cache/1.png")}, event.threadID,
        () => fs.unlinkSync(__dirname + "/cache/1.png"),event.messageID); 
    return request(encodeURI(`https://graph.facebook.com/${uid}/picture?height=1500&width=1500&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`)).pipe(fs.createWriteStream(__dirname+'/cache/1.png')).on('close',
        () => callback());
   }

    else {
    if (args.join().indexOf('@') !== -1){
    var mentions = Object.keys(event.mentions)
    const res = await axios.get(`https://www.nguyenmanh.name.vn/api/fbInfo?id=${mentions}&apikey=nf7dOsyM`);  
   var gender = res.data.result.gender == 'male' ? "Nam" : res.data.result.gender == 'female' ? "Nữ" : "Không công khai";
    var birthday = res.data.result.birthday ? `${res.data.result.birthday}` : "...";
    var love = res.data.result.love ? `${res.data.result.love}` : "Độc Thân"
    var location = res.data.result.location ? `${res.data.result.location}` : "..."
	var hometown = res.data.result.hometown ? `${res.data.result.hometown}` : "Không công khai"
    var url_profile = res.data.result.profileUrl  ? `${res.data.result.profileUrl}` : `${url_profile}`
      var web = res.data.result.website ? `${res.data.result.website}` : ""
      var quotes = res.data.result.quotes ? `${res.data.result.quotes}` : ""
      var about = res.data.result.about ? `${res.data.result.about}` : ""
      
    var callback = () => api.sendMessage({body:`👤Tên: ${res.data.result.name}\n🔎UID: ${uid}\n👀Follow: ${res.data.result.follow}\n👭 Giới tính: ${gender}\n🎉 Sinh Nhật: ${birthday}\n💌 Mối quan hệ: ${love}\n🏡 Sống tại: ${location}\n🌏Đến từ: ${hometown}\n📌URL cá nhân: ${url_profile}\n💻Website: ${web}\n⚜Trích dẫn: ${quotes}\n💤about: ${about}`,
        attachment: fs.createReadStream(__dirname + "/cache/1.png")}, event.threadID,
        () => fs.unlinkSync(__dirname + "/cache/1.png"),event.messageID); 
    return request(encodeURI(`https://graph.facebook.com/${mentions}/picture?height=1500&width=1500&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`)).pipe(fs.createWriteStream(__dirname+'/cache/1.png')).on('close',
        () => callback());
    }
    else {
      var res_ID = await api.getUID(args[0]) || args[0]
    const res = await axios.get(`https://www.nguyenmanh.name.vn/api/fbInfo?id=${res_ID}&apikey=nf7dOsyM`);  
  var gender = res.data.result.gender == 'male' ? "Nam" : res.data.result.gender == 'female' ? "Nữ" : "Không công khai";
    var birthday = res.data.result.birthday ? `${res.data.result.birthday}` : "...";
    var love = res.data.result.love ? `${res.data.result.love}` : "Độc Thân"
    var location = res.data.result.location ? `${res.data.result.location}` : "..."
	var hometown = res.data.result.hometown ? `${res.data.result.hometown}` : "Không công khai"
    var url_profile = res.data.result.profileUrl  ? `${res.data.result.profileUrl}` : `${url_profile}`
      var web = res.data.result.website ? `${res.data.result.website}` : ""
      var quotes = res.data.result.quotes ? `${res.data.result.quotes}` : ""
      var about = res.data.result.about ? `${res.data.result.about}` : ""
      
    var callback = () => api.sendMessage({body:`👤Tên: ${res.data.result.name}\n🔎UID: ${uid}\n👀Follow: ${res.data.result.follow}\n👭 Giới tính: ${gender}\n🎉 Sinh Nhật: ${birthday}\n💌 Mối quan hệ: ${love}\n🏡 Sống tại: ${location}\n🌏Đến từ: ${hometown}\n📌URL cá nhân: ${url_profile}\n💻Website: ${web}\n⚜Trích dẫn: ${quotes}\n💤about: ${about}`,
        attachment: fs.createReadStream(__dirname + "/cache/1.png")}, event.threadID,
        () => fs.unlinkSync(__dirname + "/cache/1.png"),event.messageID); 
    return request(encodeURI(`https://graph.facebook.com/${res_ID}/picture?height=1500&width=1500&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`)).pipe(fs.createWriteStream(__dirname+'/cache/1.png')).on('close',
        () => callback());
    }
  }
}