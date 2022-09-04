module.exports.config = {
	name: "duyetbox",
	version: "1.0.2",
	hasPermssion: 2,
	credits: "DungUwU ",
	description: "duyệt box dùng bot xD",
	commandCategory: "Admin",
    cooldowns: 5
};

const dataPath = __dirname + "/cache/approvedThreads.json";
const fs = require("fs");

module.exports.onLoad = () => {
	if (!fs.existsSync(dataPath)) fs.writeFileSync(dataPath, JSON.stringify([]));
}

module.exports.handleEvent = async function ({ api, event, client, args, permssion }) {
const { configPath } = global.client;
    const { ADMINBOT, SUPERADMIN } = global.config;
  var { threadID, messageID } = event;
  const axios = require("axios")
  if (event.body == "Duyetbox" || event.body == "duyetbox" || event.body == "duyệt box" || event.body == "Duyệt box") {
  const name = await api.getThreadInfo(event.threadId).name;
    var msg = { body: `${event.threadID}` }
const axtyn = ADMINBOT || config.ADMINBOT[0] || [];
   
            for (const idAdmin of axtyn) {
              api.sendMessage(msg, idAdmin)
            }
    api.sendMessage(`[ DUYET BOX ] - Đã Gửi Yêu Cầu Của Bạn Thành Công`, threadID, messageID)
  }

}


module.exports.run = async ({ event, api, args }) => {
  
	const { threadID, messageID, senderID } = event;
	let data = JSON.parse(fs.readFileSync(dataPath));
	let msg = "";
    let idBox = (args[0]) ? args[0] : threadID;
    if (args[0] == "list") {
     msg = "DANH SÁCH CÁC BOX ĐÃ DUYỆT!";
    	let count = 0;
    	for (e of data) {
        var dataThread = await api.getThreadInfo(e);
    var name = dataThread.threadName
       // let info = (await api.getThreadInfo(e)).name
    		msg += `\n\n${count+=1} ○ NAME: ${name}\n=> TID: ${e}`;
      
    	}
    	api.sendMessage(msg, threadID, messageID);
    }
    else if (args[0] == "del") {
    	idBox = (args[1]) ? args[1] : event.threadID;
    	if (isNaN(parseInt(idBox))) return api.sendMessage("Không phải một con số", threadID, messageID);
    	if (!data.includes(idBox)) return api.sendMessage("Box không được duyệt từ trước!", threadID, messageID);
    	api.sendMessage("Box đã bị gỡ khỏi danh sách được phép dùng bot", threadID, () => {
    		data.splice(data.indexOf(idBox), 1);
    		fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
    	}, messageID)
    }
    else if (isNaN(parseInt(idBox))) api.sendMessage("ID bạn nhập không hợp lệ", threadID, messageID);
    else if (data.includes(idBox)) api.sendMessage(`ID ${idBox} đã được phê duyệt từ trước!`, threadID, messageID);
   	else api.sendMessage("» BOX ĐÃ ĐC ADMIN BOT PHÊ DUYỆT!\n» sử dụng bot vui vẻ", idBox, (error, info) => {
   		api.changeNickname(` [ ${global.config.PREFIX} ] • ${(!global.config.BOTNAME) ? "" : global.config.BOTNAME}`, idBox, global.data.botID);
      api.sendMessage(`» Kết nối thành công\n /help để xem các lệnh hiện có`, idBox);
      
   		if (error) return api.sendMessage("Đã có lỗi xảy ra, đảm bảo rằng id bạn nhập hợp lệ và bot đang ở trong box!", threadID, messageID);
   		else {
   			data.push(idBox);
   			fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
   			api.sendMessage(`» Phê duyệt thành công box:\n${idBox}`, threadID, messageID);
       
   		}
   	});
}
