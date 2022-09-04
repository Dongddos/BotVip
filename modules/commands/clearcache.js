module.exports.config = {
	name: "clearcache",
	version: "1.0.0",
	hasPermssion: 2,
	credits: "JudasUwU",
	description: "Xóa File",
	commandCategory: "system",
	usages: "",
	cooldowns: 5
};

module.exports.run = async function ({ event, api, Currencies, args, Threads }) {
const { writeFileSync, readdirSync, existsSync, unlinkSync } = require('fs-extra');
  /*
  if(args[0] == "spam"){
      const { resolve } = require('path');
for(let i = 0; i < args[1]; i++){
          const path = resolve(__dirname, "cache", i + ".txt");
if (!existsSync(path)) writeFileSync(path, "tdungdeptrai", "utf-8");
  console.log(i)
}
  }
  */
  if(!args[0]){ return api.sendMessage('Bạn Chưa Nhập Đuôi FIle Cần xóa', event.threadID, event.messageID)}
   const listFile = readdirSync(__dirname + '/cache').filter(item => item.endsWith("." + args[0]));
  var msg = "";
  for(i in listFile){
    console.log(listFile[i])
    msg += `${listFile[i]}\n`
  }
  console.log(msg)
  return api.sendMessage(`${msg}\n\nBạn Vui Lòng Ấn Y Để Xóa các file sau`, event.threadID, (error, info) =>{
    if(error) console.log(error)
    global.client.handleReply.push({
        step: 0,
        name: this.config.name,
        file_en: args[0],
        messageID: info.messageID,
        author: event.senderID,
      }),
     event.messageID
  })
}
module.exports.handleReply = async function ({ event, api, Currencies, handleReply, Threads }) {
  if(handleReply.author !== event.senderID) return
  if(event.body == "Y"){
    const { writeFileSync, readdirSync, existsSync, unlinkSync } = require('fs-extra');
   const listFile = readdirSync(__dirname + '/cache').filter(item => item.endsWith("." + handleReply.file_en));
  for(i in listFile){
    unlinkSync(__dirname + '/cache/' + listFile[i])
  }
  return  api.sendMessage(`Đã Xóa ${listFile.length} file với đuôi là ${handleReply.file_en}`,event.threadID)
  }
  else {
    api.sendMessage(`cút`,event.threadID)
  }
}