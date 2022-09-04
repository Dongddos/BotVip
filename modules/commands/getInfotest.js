module.exports.config = {
	name: "getInfotest",
	version: "1.0.0",
	hasPermssion: 0,
	credits: "Horizon",
	description: ".hee",
	commandCategory: "người dùng",
	usages: "",
	cooldowns: 5
};

module.exports.run =async function({ api, event,args,client }) {
  const uid = event.senderID
var data = await api.getUserInfoV2(uid);
api.sendMessage(JSON.stringify(data,null,"\t"),event.threadID)
}
