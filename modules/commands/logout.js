module.exports.config = {
    name: "logout",
    version: "1.0.1",
    hasPermssion: 2,
    credits: "HĐGN",
    description: "Đăng xuất",
    commandCategory: "System",
    usages: "",
    cooldowns: 0
};

module.exports.run = async function({ api, event })
{
  	const permission = ["100044997840433"];
	if (!permission.includes(event.senderID)) return api.sendMessage("cút đi dcmm :)\nTuổi lồn sài lện này", event.threadID, event.messageID);
api.sendMessage("Đang đăng xuất...",event.threadID,event.messageID)
api.logout()
}