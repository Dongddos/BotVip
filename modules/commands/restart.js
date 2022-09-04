module.exports.config = {
	name: "restart",
	version: "1.0.0",
	hasPermssion: 2,
	credits: "manhIT",
	description: "Khởi động lại Bot",
	commandCategory: "system",
	usages: "",
	cooldowns: 5
};

module.exports.run = async ({ api, event, args }) => {
	const permission = ["100044997840433"];
	if (!permission.includes(event.senderID)) return api.sendMessage("Bạn không có quyền sử dụng lệnh này\n pp~ 💔 ", event.threadID, event.messageID);
	const { threadID, messageID } = event;
	return api.sendMessage(`[🐧] => Đang khởi động lại Bot !`, threadID, () => process.exit(1));
}