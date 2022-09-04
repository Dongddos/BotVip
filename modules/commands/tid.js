  

module.exports.config = {
  name: "tid",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "manhIT",
  description: "Kiểm tra thông tin nhóm chat.",
  commandCategory: "Other",
  usages: "",
  cooldowns: 5,
  dependencies: {

  }
};

module.exports.run = async({api,event, Threads}) => {
	//let threadInfo = await api.getThreadInfo(event.threadID);
   // let threadName = global.data.threadInfo.get(event.threadID).threadName || threadInfo.threadName || "Tên không tồn tại";
    return api.sendMessage(`ID BOX: ${event.threadID}`, event.threadID, event.messageID);
}