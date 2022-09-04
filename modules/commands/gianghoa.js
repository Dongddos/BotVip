const fs = require("fs");
module.exports.config = {
name: "gianghoa2",
	version: "1.9.1",
	hasPermssion: 0,
	credits: "Duck",
	description: "giảng hòa 2=)",
	commandCategory: "Không cần dấu lệnh",
	usages: "ko cần prefix chỉ cần chat anh bạn à",
	cooldowns: 5,
};
module.exports.handleEvent = function({ api, event, client, __GLOBAL }) {
	var { threadID, messageID } = event;
	if (event.body.indexOf("Anh bạn à")==0 || (event.body.indexOf ("làm hòa")==0)|| (event.body.indexOf("Giảng hòa")==0)|| (event.body.indexOf("anh bạn à")==0)) {
		var msg = {
				body: "A nh bạn à! Đừng nóng.Hãy giảng hòa😈! ",
				attachment: fs.createReadStream(__dirname + `/noprefix/gianghoa.mp4`)
			}
			api.sendMessage(msg, threadID, messageID);
		}
	}
	module.exports.run = function({ api, event, client, __GLOBAL }) {

}
