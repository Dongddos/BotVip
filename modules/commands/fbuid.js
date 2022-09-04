module.exports.config = {
  name: "fbuid",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "BraSL",
  description: "Lấy UID của link của Profile.",
  commandCategory: "info",
  usages: "",
  cooldowns: 0
  
}

module.exports.run = async ({ api, event, args }) => {
  var { threadID, messageID } = event;
 
  try {
    var id = await api.getUID(args[0] || event.messageReply.body);
    return api.sendMessage(id, event.threadID, event.messageID)
    console.log(id)
  }
  catch (e) {
    return api.sendMessage("nó đi đâu r tìm không thấy bác ạ!", threadID, messageID)
  }
}