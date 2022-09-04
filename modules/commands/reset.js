module.exports.config = {
	name: "reset",
	version: "1.0.2",
	hasPermssion: 2,
	credits: "Khánh Milo",
	description: "Khởi động lại bot",
	commandCategory: "admin",
	cooldowns: 5,
	dependencies: {
		"eval": ""
	}
};

module.exports.run = async ({ api, event, args, client, utils }) => {
		//const permission = ["100044997840433"];
	//if (!permission.includes(event.senderID)) return api.sendMessage("Bạn không có quyền sử dụng lệnh này\n pp~ 💔 ", event.threadID, event.messageID);
    const eval = require("eval");
    return api.sendMessage("[🐧] => Đang Reset Bot ! :)", event.threadID, () => eval("module.exports = process.exit(1)", true), event.messageID);

   }
