module.exports.config = {
name: "fbcover3",
version: "1.0.0",
hasPermssion: 0,
credits: "BraSL",
description: "Tạo ảnh bìa phong cách dịch vụ facebook",
commandCategory: "game",
usages: "Tạo ảnh bìa phong cách dịch vụ facebook",
cooldowns: 0,
dependencies: {
    "fs-extra": "",
    "request": "",
    "axios": ""
 }
};
module.exports.run = async function ({ api, args, event, permssion }) {

    const request = require('request');
  const fs = require("fs-extra")
  const axios = require("axios")
  
  const { threadID, messageID, senderID, body } = event;
  if(!args[0]) return api.sendMessage('Vui lòng nhập tên chính!!!', threadID, messageID)
  else return api.sendMessage(`🔍 Bạn đã chọn tên chính là: ${args.join(" ").toUpperCase()}\n\n(Reply tin nhắn này và chọn ngày sinh của bạn)`,event.threadID, (err, info) => {
     return global.client.handleReply.push({
        type: "birthday",
        name: `fbcover3`,
        author: senderID,
        tenchinh: args.join(" ").toUpperCase(),
        messageID: info.messageID
      });
  },event.messageID);
}
module.exports.handleReply = async function({ api, event, args, handleReply, client, __GLOBAL, Threads, Users, Currencies }) {
  module.exports.circle = async (image) => {
    const { threadID, messageID, senderID, body } = event;
    const jimp = require("jimp")
    
    image = await jimp.read(image);
    image.circle();
    return await image.getBufferAsync("image/png");
}
    const { loadImage, createCanvas } = require("canvas");
    const fs = require("fs-extra")
    const axios = require("axios")
   const res = await axios.get(`https://www.nguyenmanh.name.vn/api/fbInfo?id=${event.senderID}&apikey=nf7dOsyM`);  
    const Canvas = require("canvas")
    let pathBg = __dirname + '/cache/bg.png';
    let pathAva = __dirname + '/cache/av.png';
    let pathLine = __dirname + '/cache/li.png';
    const path = require("path")
  const __root = path.resolve(__dirname, "tad");
 
  //=================CONFIG TEXT=============//
  switch (handleReply.type) {
    case "birthday": {
      
      api.unsendMessage(handleReply.messageID);
      return api.sendMessage(`🔍 Bạn đã chọn birthday là ${event.body.toUpperCase()}\n\n(Reply tin nhắn này nhập vào gender của bạn)`,event.threadID, function (err, info) {
        return global.client.handleReply.push({
          type: "gender",
          name: `fbcover3`,
          author: event.senderID,
          birthday: event.body,
          tenchinh: handleReply.tenchinh,
          messageID: info.messageID
        });
      },event.messageID)
    }
    case "gender": {
      api.unsendMessage(handleReply.messageID);
      return api.sendMessage(`🔍 Bạn đã chọn gender là : ${event.body.toUpperCase()}\n\(Reply tin nhắn này để nhập love của bạn)`,event.threadID, function (err, info) {
        return global.client.handleReply.push({
          type: "love",
          name: `fbcover3`,
          author: event.senderID,
          gender: event.body,
          tenchinh: handleReply.tenchinh,
          birthday: handleReply.birthday,
          messageID: info.messageID
        });
      },event.messageID) 
    }
   /* case "follow": {
      api.unsendMessage(handleReply.messageID);
      return api.sendMessage(`🔍 Bạn đã chọn follow là : ${event.body.toUpperCase()}\n\(Reply tin nhắn này để nhập love của bạn)`,event.threadID, function (err, info) {
        return global.client.handleReply.push({
          type: "love",
          name: `fbcover3`,
          author: event.senderID,
          gender: handleReply.gender,
          tenchinh: handleReply.tenchinh,
          birthday: handleReply.birthday,
          follow: event.body,
          messageID: info.messageID
        });
      },event.messageID) 
    }*/
    case "love": {
      api.unsendMessage(handleReply.messageID);
      return api.sendMessage(`🔍 Bạn đã chọn love là : ${event.body.toUpperCase()}\nReply tin nhắn này để nhập hometown của bạn`,event.threadID, function (err, info) {
        return global.client.handleReply.push({
          type: "hometown",
          name: `fbcover3`,
          author: event.senderID,
          gender: handleReply.gender,
          tenchinh: handleReply.tenchinh,
          birthday: handleReply.birthday,
          love: event.body,
          //follow: handleReply.follow,
          messageID: info.messageID
        });
      },event.messageID) 
    }
      case "hometown": {
      api.unsendMessage(handleReply.messageID);
      return api.sendMessage(`🔍 Bạn đã chọn hometown là : ${event.body.toUpperCase()}\nReply tin nhắn này để nhập location của bạn`,event.threadID, function (err, info) {
        return global.client.handleReply.push({
          type: "create",
          name: `fbcover3`,
          author: event.senderID,
          gender: handleReply.gender.toUpperCase(),
          tenchinh: handleReply.tenchinh.toUpperCase(),
          love: handleReply.love.toUpperCase(),
          birthday: handleReply.birthday.toUpperCase(),
          hometown: event.body.toUpperCase(),
          //follow: handleReply.follow.toUpperCase(),
          messageID: info.messageID
        });
      },event.messageID) 
    }
     
    case "create": {
     
      var follow = res.data.result.follow
      var location = event.body
      var love = handleReply.love//.toUpperCase()
      var hometown = handleReply.hometown//.toUpperCase()
     // var address = handleReply.address//.toUpperCase()
      var name = handleReply.tenchinh//.toUpperCase()
     // var follow = handleReply.follow//.toUpperCase()
      var birthday = handleReply.birthday//.toUpperCase()
      var gender = handleReply.gender//.toUpperCase()
      api.unsendMessage(handleReply.messageID);
      api.sendMessage(`⏳ Đang khởi tạo chương trình tạo ảnh!`,event.threadID, (err, info) => {
      setTimeout(() => {
              api.unsendMessage(info.messageID);
     }, 1000);
          }, event.messageID);
      //=================CONFIG IMG=============//
      let avt = (await axios.get(encodeURI(`https://graph.facebook.com/${event.senderID}/picture?height=1500&width=1500&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`), {
        responseType: "arraybuffer"
    })).data;
    let background = (await axios.get(encodeURI(`https://i.imgur.com/OC7ZYE6.png`), {
        responseType: "arraybuffer"
    })).data;
    let hieuung = (await axios.get(encodeURI(`https://i.imgur.com/ETTWIEL.png`), {
        responseType: "arraybuffer"
    })).data;
    fs.writeFileSync(pathAva, Buffer.from(avt, "utf-8"));
    fs.writeFileSync(pathBg, Buffer.from(background, "utf-8"));
    fs.writeFileSync(pathLine, Buffer.from(hieuung, "utf-8"));
    var avatar = await this.circle(pathAva);
      //=================DOWNLOAD FONTS=============//
      if (!fs.existsSync(__dirname + '/tad/UTMAvoBold.ttf')) {
        let getfont2 = (await axios.get(`https://drive.google.com/u/0/uc?id=1DuI-ou9OGEkII7n8odx-A7NIcYz0Xk9o&export=download`, {
            responseType: "arraybuffer"
        })).data;
        fs.writeFileSync(__dirname + '/tad/UTMAvoBold.ttf', Buffer.from(getfont2, "utf-8"));
    };
    if (!fs.existsSync(__dirname + '/tad/Baloo Regular.ttf')) {
        let getfont1 = (await axios.get(`https://drive.google.com/u/0/uc?id=1IrxrZxo1ht3jur4ZI5MxH9Ri6HspO6YS&export=download`, {
            responseType: "arraybuffer"
        })).data;
        fs.writeFileSync(__dirname + '/tad/Baloo Regular.ttf', Buffer.from(getfont1, "utf-8"));
    };
      //=================DRAW BANNER=============//
     let baseBg = await loadImage(pathBg);
    let baseAva = await loadImage(avatar);
    let baseLine = await loadImage(pathLine);
    let canvas = createCanvas(baseBg.width, baseBg.height);
    let ctx = canvas.getContext("2d");
    ctx.shadowlove = '#fff';
    ctx.shadowBlur = 0;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;
    ctx.drawImage(baseBg, 0, 0, canvas.width, canvas.height);
    Canvas.registerFont(__dirname + '/tad/UTMAvoBold.ttf', {
        family: "UTMAvoBold"
    });
    ctx.strokeStyle = "rgba(255,255,255, 0.2)";
    ctx.lineWidth = 3;
      ctx.restore()
    ctx.save()
    ctx.textAlign = "center";
    ctx.font = "150px UTMAvoBold";
    ctx.strokeText(name, 220, 131);
    ctx.strokeText(name, 543, 383);
    ctx.strokeText(name, 361, 630);
    ctx.strokeText(name, 211, 857);
    ctx.strokeText(name, 2000, 131);
    ctx.strokeText(name, 2323, 383);
    ctx.strokeText(name, 2141, 630);
    ctx.strokeText(name, 1991, 857);
    ctx.drawImage(baseLine, 0, 0, canvas.width, canvas.height);
     ctx.shadowColor = 'white';
    ctx.shadowBlur = 30;
    ctx.drawImage(baseAva, 356, 233, 404, 404);
    
    ctx.shadowBlur = 0;
    ctx.font = "45px UTMAvoBold";
     
    ctx.save()
    ctx.textAlign = "center";
    var l = ctx.measureText(name).width;
    ctx.fillStyle = '#8317d9'

    ctx.transform(1, 0, -0.4, 1, 0, 0)
    ctx.fillRect(1650, 303, canvas.width + l - 2350, 90)
    ctx.transform(1, 0, 0.4, 1, 0, 0);
    Canvas.registerFont(__dirname + "/tad/Baloo Regular.ttf", {
        family: "Baloo Regular"
    });
    ctx.font = "50px Baloo Regular";
    ctx.restore()
    ctx.save()
    ctx.textAlign = "left";
    ctx.fillStyle = '#38b6ff'
    ctx.fillText(name.toUpperCase(), 1590, 365);
    ctx.font = "42px Baloo Regular";
    ctx.fillStyle = '#5adfe3'
    ctx.fillText(birthday, 1777, 474 + 3);
    ctx.fillText(gender, 1762, 544 + 3);
    ctx.fillText(follow, 1708, 615 + 3);
    ctx.fillText(love, 1783, 687 + 3);
    ctx.fillText(hometown, 1719, 764 + 3);
    ctx.fillText(location, 1745, 836 + 3);
    ctx.fillText(event.senderID, 1639, 902 + 3);
      ctx.save()
    const imageBuffer = canvas.toBuffer();
    fs.writeFileSync(pathBg, imageBuffer);
      return api.sendMessage(
        { attachment: fs.createReadStream(pathBg) },
        event.threadID,event.messageID
      );
    }
  }
}