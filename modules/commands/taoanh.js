module.exports.config = {
    name: "taoanh",
    version: "1.0.0",
    hasPermssion: 2,
    credits: "BraSL",
    description: "như tên",
    commandCategory: "taoanh",
    usages: "",
    cooldowns: 3
    
};
module.exports.run = async({api,event,args}) => {
    const fs = global.nodemodule["fs-extra"];
    const request = global.nodemodule["request"];
    const axios = global.nodemodule['axios'];  
    const { threadID, messageID, mentions } = event;
  var info = await api.getUserInfoV2(event.senderID);
  if (this.config.credits != 'BraSL') {
        console.log('\x1b[33m[ WARN ]\x1b[37m » Đổi credits con cặc đjt mẹ mày luôn đấy con chó:))');
        return api.sendMessage('[ WARN ] Phát hiện người điều hành bot ' + global.config.BOTNAME + ' đổi credits modules "' + this.config.name + '"', threadID, messageID);
      }
  switch (args[0]) {
      case "1": { 
         const id = args.join(" ").trim().replace(/\s+/g, " ").replace(/(\s+\|)/g, "|").replace(/\|\s+/g, "|").split("|")[0];
       
		return	api.sendMessage(`⏳ Đang khởi tạo chương trình tạo ảnh!`,threadID, (err, info) => {
            setTimeout(() => {
            	api.unsendMessage(info.messageID)
            var callback = () =>  api.sendMessage({body:`của bạn nek`,attachment: fs.createReadStream(__dirname + "/cache/1.png")}, event.threadID, () => fs.unlinkSync(__dirname + "/cache/1.png"),event.messageID); 
       return request(encodeURI(`https://api-velgrynd.chinhle4447.repl.co/api/canvas/gfx5?teks=${id}`)).pipe(fs.createWriteStream(__dirname+'/cache/1.png')).on('close',() => callback());    
    }, 3000);
          }, messageID);
       }
      case "2": { 
         const id = args.join(" ").trim().replace(/\s+/g, " ").replace(/(\s+\|)/g, "|").replace(/\|\s+/g, "|").split("|")[1];
        const name = args.join(" ").trim().replace(/\s+/g, " ").replace(/(\s+\|)/g, "|").replace(/\|\s+/g, "|").split("|")[2];
      
		return	api.sendMessage(`⏳ Đang khởi tạo chương trình tạo ảnh!`,threadID, (err, info) => {
            setTimeout(() => {
            	api.unsendMessage(info.messageID)
            var callback = () =>  api.sendMessage({body:`của bạn nek`,attachment: fs.createReadStream(__dirname + "/cache/1.png")}, event.threadID, () => fs.unlinkSync(__dirname + "/cache/1.png"),event.messageID); 
       return request(encodeURI(`https://api-velgrynd.chinhle4447.repl.co/api/canvas/gfx3?teks1=${id}&teks2=${name}`)).pipe(fs.createWriteStream(__dirname+'/cache/1.png')).on('close',() => callback());    
    }, 3000);
          }, messageID);
       }
         case "3": { 
         const id = args.join(" ").trim().replace(/\s+/g, " ").replace(/(\s+\|)/g, "|").replace(/\|\s+/g, "|").split("|")[1];
        
		return	api.sendMessage(`⏳ Đang khởi tạo chương trình tạo ảnh!`,threadID, (err, info) => {
            setTimeout(() => {
            	api.unsendMessage(info.messageID)
            var callback = () =>  api.sendMessage({body:`của bạn nek`,attachment: fs.createReadStream(__dirname + "/cache/1.png")}, event.threadID, () => fs.unlinkSync(__dirname + "/cache/1.png"),event.messageID); 
       return request(encodeURI(`https://api-velgrynd.chinhle4447.repl.co/api/canvas/gfx1?teks=${id}`)).pipe(fs.createWriteStream(__dirname+'/cache/1.png')).on('close',() => callback());    
    }, 3000);
          }, messageID);
       }
      case "4": { 
         const id = args.join(" ").trim().replace(/\s+/g, " ").replace(/(\s+\|)/g, "|").replace(/\|\s+/g, "|").split("|")[1];
        
			return api.sendMessage(`⏳ Đang khởi tạo chương trình tạo ảnh!`,threadID, (err, info) => {
            setTimeout(() => {
            	api.unsendMessage(info.messageID)
            var callback = () =>  api.sendMessage({body:`của bạn nek`,attachment: fs.createReadStream(__dirname + "/cache/1.png")}, event.threadID, () => fs.unlinkSync(__dirname + "/cache/1.png"),event.messageID); 
       return request(encodeURI(`https://api-velgrynd.chinhle4447.repl.co/api/canvas/gfx2?teks=${id}`)).pipe(fs.createWriteStream(__dirname+'/cache/1.png')).on('close',() => callback());    
    }, 3000);
          }, messageID);
       }
      case "5": { 
         const id = args.join(" ").trim().replace(/\s+/g, " ").replace(/(\s+\|)/g, "|").replace(/\|\s+/g, "|").split("|")[1];
        const name = args.join(" ").trim().replace(/\s+/g, " ").replace(/(\s+\|)/g, "|").replace(/\|\s+/g, "|").split("|")[2];
        
			return api.sendMessage(`⏳ Đang khởi tạo chương trình tạo ảnh!`,threadID, (err, info) => {
            setTimeout(() => {
            	api.unsendMessage(info.messageID)
            var callback = () =>  api.sendMessage({body:`của bạn nek`,attachment: fs.createReadStream(__dirname + "/cache/1.png")}, event.threadID, () => fs.unlinkSync(__dirname + "/cache/1.png"),event.messageID); 
       return request(encodeURI(`https://api-velgrynd.chinhle4447.repl.co/api/canvas/gfx4?teks1=${id}&teks2=${name}`)).pipe(fs.createWriteStream(__dirname+'/cache/1.png')).on('close',() => callback());    
    }, 3000);
          }, messageID);
       }
     default: {
        return api.sendMessage(``, event.threadID, event.messageID); 
        
        }
       
  };  
}   
