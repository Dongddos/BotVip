module.exports.config = {
    name: "fbvideo",
    version: "1.0.1",
    hasPermssion: 0,
    credits: "tdunguwu",
    description: "",
    commandCategory: "media",
    cooldowns: 0,
    dependencies: {
        "fs-extra": "",
    "axios": "",
        "request": ""
    },
  
};
module.exports.run = async ({ api, event,args }) => {{
    
  const axios = require("axios");
    const fs = global.nodemodule["fs-extra"];
    const request = global.nodemodule["request"];
   const { threadID, messageID, senderID, body } = event;
   
let text = args.join(" ")
  if (!text) return api.sendMessage('Vui nhập link fbvd', event.threadID, event.messageID);
  const length_0 = parseInt(text.length)
 const link = args.join(" ").trim().replace(/\s+/g, " ").replace(/(\s+\|)/g, "|").replace(/\|\s+/g, "|").split("|")[0];
const res = await axios.get
(`https://apid.chinhle4447.repl.co/v2/fbget?url=${text}`);
var url = res.data.data.medias[0].url;

   var callback = () => api.sendMessage({body:``,attachment: fs.createReadStream(__dirname + "/cache/fb.mp4")}, event.threadID, () => fs.unlinkSync(__dirname + "/cache/fb.mp4"),event.messageID);
   return request(encodeURI(`${url}`)).pipe(fs.createWriteStream(__dirname+'/cache/fb.mp4')).on('close',() => callback());     
}}