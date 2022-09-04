module.exports.config = {
	name: "log",
	eventType: ["log:unsubscribe","log:subscribe","log:thread-name"],
	version: "1.0.0",
	credits: "BraSL fix",
	description: "Ghi lại thông báo các hoạt đông của bot!",
    envConfig: {
        enable: true
    }
};

module.exports.run = async function({ api, event, Threads, args, Users }) {
	
	 var datathread = await api.getThreadInfo(event.threadID);
     var namethread = datathread.name;
  var name = await api.getUserInfoV5(event.author)
	 var names = name[0].o0.data.messaging_actors[0].name
    const moment = require("moment-timezone");
    var gio = moment.tz("Asia/Ho_Chi_Minh").format("HH:mm:ss D/MM/YYYY");
	
    const logger = require("../../utils/log");
    if (!global.configModule[this.config.name].enable) return;
    var formReport =  "💌 Bot Notification 💟" +
	                    "\n\n» 💭Box name: " + `${namethread}` +
                        "\n» 💭BoxID: " + event.threadID +
                        "\n» 🕺Hành động: {task}" +
                        "\n» 🙄name user: " + names +
                        "\n» 🏃‍♂️Hành động được tạo bởi userID: \n» " + event.author + " «" +
                        "\n» " + Date.now() +" «" +
						"\n\n-----------------------\n" +
						`⚡Time: ${gio}`,
						
	   task = "";

    switch (event.logMessageType) {
      /*  case "log:thread-name": {
            const oldName = (await Threads.getData(event.threadID)).name || "Không tên",
                    newName = event.logMessageData.name || "Không tên";
            task = "Tên nhóm từ: '" + oldName + "'\n thành '" + newName + "'";
            await Threads.setData(event.threadID, {name: newName});
            break;
        }*/
        case "log:subscribe": {
            if (event.logMessageData.addedParticipants.some(i => i.userFbId == api.getCurrentUserID())) task = "Bot đã vào một nhóm mới!";
            break;
        }
        case "log:unsubscribe": {
            if (event.logMessageData.leftParticipantFbId== api.getCurrentUserID()) task = "Bot đã bị kick ra khỏi nhóm!"
            break;
        }
        default: 
            break;
    }

    if (task.length == 0) return;

    formReport = formReport
    .replace(/\{task}/g, task);

    return api.sendMessage(formReport, global.config.ADMINBOT[0], (error, info) => {
        if (error) return logger(formReport, "[ Logging Event ]");
    });
}