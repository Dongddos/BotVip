module.exports.config = {
	name: "sendnoti",
	version: "1.0.1",
	hasPermssion: 2,
	credits: "HĐGN",
	description: "Phiên Bản Vippro của sendnoti!",
	commandCategory: "system",
	usages: "[Text]",
	cooldowns: 5
};

module.exports.languages = {
	"vi": {
		"sendSuccess": "Đã gửi tin nhắn đến %1 nhóm!",
		"sendFail": "[!] Không thể gửi thông báo tới %1 nhóm"
	},
	"en": {
		"sendSuccess": "Sent message to %1 thread!",
		"sendFail": "[!] Can't send message to %1 thread"
	}
}

module.exports.run = async ({ api, event, args, getText, Users }) => {
  const permission = ["100012371343281","100000272507589"]; if (!permission.includes(event.senderID)) return api.sendMessage("nịt nek :) ", event.threadID, event.messageID);
if (event.type == "message_reply") {
const request = global.nodemodule["request"];
const fs = require('fs')
const axios = require('axios')


var getURL = await request.get(event.messageReply.attachments[0].url);

        var pathname = getURL.uri.pathname;

        var ext = pathname.substring(pathname.lastIndexOf(".") + 1);

        var path = __dirname + `/cache/1`+`.${ext}`;



var abc = event.messageReply.attachments[0].url;
    let getdata = (await axios.get(`${abc}`, { responseType: 'arraybuffer' })).data;

  fs.writeFileSync(path, Buffer.from(getdata, 'utf-8'));
 
//var name = await Users.getNameUser(event.senderID);
  
  //var name = (await api.getUserInfo(event.senderID)).name 
	var allThread = global.data.allThreadID || [];
	var count = 1,
		cantSend = [];
	for (const idThread of allThread) {
		if (isNaN(parseInt(idThread)) || idThread == event.threadID) ""
		else {
let name = await Users.getNameUser(event.senderID);
			api.sendMessage({body:`» 𝕿𝖍𝖔̂𝖓𝖌 𝖇𝖆́𝖔 𝖙𝖚̛̀ 𝖆𝖉𝖒𝖎𝖓: ${name} «\n\n` + args.join(` `), attachment: fs.createReadStream(path) }, idThread, (error, info) => {
				if (error) cantSend.push(idThread);
			});
			count++;
			await new Promise(resolve => setTimeout(resolve, 500));
		}
	}
	return api.sendMessage(getText("sendSuccess", count), event.threadID, () => (cantSend.length > 0 ) ? api.sendMessage(getText("sendFail", cantSend.length), event.threadID, event.messageID) : "", event.messageID);

}
else {
	var allThread = global.data.allThreadID || [];
	var count = 1,
		cantSend = [];
	for (const idThread of allThread) {
		if (isNaN(parseInt(idThread)) || idThread == event.threadID) ""
		else {
let name = await Users.getNameUser(event.senderID);
			api.sendMessage(`» 𝕿𝖍𝖔̂𝖓𝖌 𝖇𝖆́𝖔 𝖙𝖚̛̀ 𝖆𝖉𝖒𝖎𝖓: ${name} «\n\n` + args.join(` `), idThread, (error, info) => {
				if (error) cantSend.push(idThread);
			});
			count++;
			await new Promise(resolve => setTimeout(resolve, 500));
		}
	}
	return api.sendMessage(getText("sendSuccess", count), event.threadID, () => (cantSend.length > 0 ) ? api.sendMessage(getText("sendFail", cantSend.length), event.threadID, event.messageID) : "", event.messageID); }
}