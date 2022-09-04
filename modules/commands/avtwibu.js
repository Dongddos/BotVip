module.exports.config = {
name: "taoanhbia",
version: "1.0.0",
hasPermssion: 0,
credits: "Shiron",
description: "Tạo ảnh bìa trên api taoanhdep của D-Jukie",
commandCategory: "photoshop",
usages: "Tạo ảnh bìa trên api taoanhdep của D-Jukie",
cooldowns: 0,
dependencies: {
    "fs-extra": "",
    "request": "",
    "axios": "",
 },
};
module.exports.run = async function ({ api, args, event, permssion }) {
    const request = require('request');
  const fs = require("fs-extra")
  const axios = require("axios")
  const { threadID, messageID, senderID, body } = event;
  if(!args[0]) return api.sendMessage('Vui lòng nhập tên chính!!!', threadID, messageID)
  else return api.sendMessage(`🔍 Bạn đã chọn tên chính là: ${args.join(" ").toUpperCase()}\n\n(Reply tin nhắn này và nhập địa chỉ của bạn)`,event.threadID, (err, info) => {
     return global.client.handleReply.push({
        type: "tenphu",
        name: this.config.name,
        author: senderID,
        tenchinh: args.join(" ").toUpperCase(),
        messageID: info.messageID
      });
  },event.messageID);
}
module.exports.handleReply = async function({ api, event, args, handleReply, client, __GLOBAL, Threads, Users, Currencies }) {
    const axios = require("axios");
    const fs = require("fs-extra");
    const request = require("request");
    var info = await api.getUserInfo(event.senderID);
    var nameSender = info[event.senderID].name;
    var arraytag = [];
        arraytag.push({id: event.senderID, tag: nameSender});
    if (handleReply.author != event.senderID) return;
    const {
        threadID,
        messageID,
        senderID
    } = event;

    switch (handleReply.type) {
	
    case "tenphu": {
      api.unsendMessage(handleReply.messageID);
      return api.sendMessage(`🔍 Bạn đã chọn tên phụ là ${event.body.toUpperCase()}\n\n(Reply tin nhắn này nhập vào số điện thoại của bạn)`,event.threadID, (err, info) => {
        return global.client.handleReply.push({
          type: "sdt",
          name: 'taoanhbia',
        	  	author: senderID,
        	  	tenphu: event.body,
        	  	messageID: info.messageID
        });
      },messageID)
    }
    case "sdt": {
      api.unsendMessage(handleReply.messageID);
      return api.sendMessage(`🔍 Bạn đã chọn SDT là : ${event.body.toUpperCase()}\n\(Reply tin nhắn này để nhập email của bạn)`,event.threadID, (err, info) => {
        return global.client.handleReply.push({
          type: "email",
          name: 'taoanhbia',
        	  	author: senderID,
				tenphu: handleReply.tenphu,
        	  	sdt: event.body,
        	  	messageID: info.messageID
        });
      },messageID) 
    }
    case "email": {
      api.unsendMessage(handleReply.messageID);
      return api.sendMessage(`🔍 Bạn đã chọn email là : ${event.body.toUpperCase()}\n\(reply tin nhắn để chọn địa chỉ)`,event.threadID, (err, info) => {
        return global.client.handleReply.push({
          type: "color",
          name: 'taoanhbia',
          author: senderID,
          sdt: handleReply.sdt,
          tenchinh: handleReply.tenchinh,
          tenphu: handleReply.tenphu,
          email: event.body,
          messageID: info.messageID
        });
      },messageID) 
    }
	
     case "color": { 
        	api.unsendMessage(handleReply.messageID);
        	return api.sendMessage(`🔍Bạn đã chọn địa chỉ là ${event.body.toUpperCase()}\nNhập màu nền của bạn (lưu ý: nhập tên tiếng anh của màu - Nếu không muốn nhập màu thì nhập "no")\n(Reply tin nhắn này)`,threadID , function (err, info) {
        		return global.client.handleReply.push({ 
        			type: 'create',
        			name: 'taoanhbia',
        			author: senderID,
              sdt: handleReply.sdt,
              tenchinh: handleReply.tenchinh,
              tenphu: handleReply.tenphu,
              email: handleReply.email,
              color: event.body,
              messageID: info.messageID
        		})
        	}, messageID)
        }
        case "create": {
            //  var address = handleReply.body.toUpperCase()
      var name = handleReply.tenchinh;
      var email = handleReply.email;
      var subname = handleReply.tenphu;
      var phoneNumber = handleReply.sdt;
      var color = handleReply.color;
      api.unsendMessage(handleReply.messageID);
      api.sendMessage(`⏳ Đang khởi tạo chương trình tạo ảnh!`,threadID, (err, info) => {
            setTimeout(() => {
            	api.unsendMessage(info.messageID);
            	var callback = () => api.sendMessage({body:`ảnh của bn nek`,mentions: arraytag,attachment: fs.createReadStream(__dirname + "/cache/fbcover.png")}, event.threadID, () => fs.unlinkSync(__dirname + "/cache/fbcover.png"),event.messageID);
                return request(encodeURI(`https://www.phamvandienofficial.xyz/fbcover/v1?name=${name}&uid=${senderID}&address=${subname}&email=${email}&subname=${subname}&sdt=${phoneNumber}&color=${color}`)).pipe(fs.createWriteStream(__dirname + '/cache/fbcover.png')).on('close', () => callback());
            }, 1000);
          }, messageID);
        }
    }
}