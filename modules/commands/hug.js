module.exports.config = {
 name: "hug",
 version: "1.0.1",
 hasPermssion: 0,
 credits: ".",
 description: "Ảnh", //nhập thứ bạn muốn
 commandCategory: "Game", //Phần hiển thị trên help
 usages: "", //cách sử dụng
 cooldowns: 1, //thời gian chờ cách nhau
 
 };
   
module.exports.run = async ({ api, event, }) => {
 const axios = require('axios');
 const request = require('request');
 const fs = require("fs");
 var mention = Object.keys(event.mentions)[0];
 let tag = event.mentions[mention].replace("@", "");
 axios.get('https://nekos.life/api/v2/img/hug').then(res => { //nhập api từ nekos.life
 let ext = res.data.url.substring(res.data.url.lastIndexOf(".") + 1);
 
 let callback = function() {
      api.sendMessage({
        body: "Ôm " + tag + " ấm thật đấy <3",
        mentions: [{
          tag: tag,
          id: Object.keys(event.mentions)[0]
        }],
        attachment: fs.createReadStream(__dirname + `/cache/dog.${ext}`)
     }, event.threadID, () => fs.unlinkSync(__dirname + `/cache/dog.${ext}`), event.messageID);
    };
    request(res.data.url).pipe(fs.createWriteStream(__dirname + `/cache/dog.${ext}`)).on("close", callback);
   })
}