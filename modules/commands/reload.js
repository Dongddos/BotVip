module.exports.config = {
	name: "reload",
	version: "1.0.0",
	hasPermssion: 1,
	credits: "Chill with Tea",
	description: "Khởi động lại Bot",
	commandCategory: "Penguin",
	usages: "reload + time",
	cooldowns: 5
};

module.exports.run = async ({ api, event, args }) => {
	const { threadID, messageID } = event;
	var time = args.join(" ");
	var rstime = "20";
	if (!time) rstime = "20";
	else rstime = time;
	api.sendMessage(`[𝑷𝑮🐧] => Sẽ reload lại bot sau ${rstime} giây nữa !`, threadID);
	return setTimeout(() => { api.sendMessage("[🐧] => Đang Reload Bot !",event.threadID,() => process.exit(1) )},	rstime * 1000);
}