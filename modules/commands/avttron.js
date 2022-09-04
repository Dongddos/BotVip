module.exports.config = {
    name: "avtfb",
    version: "1.0.0",
    hasPermssion: 0,
    credits: "Trung Kiên",
    description: "Circle",
    commandCategory: "Tiện ích",
    usages: "Circle",
    cooldowns: 5
};

module.exports.run = async ({ event, api, args, Users }) => {
  const fs = global.nodemodule["fs-extra"];
    const request = global.nodemodule["request"];
    const axios = global.nodemodule['axios'];  

    if(!args[0]){
    if(event.type == "message_reply") { uid = event.messageReply.senderID }
    else uid = event.senderID;
   
    var callback = () => api.sendMessage({body:`avt của bạn đây`,
        attachment: fs.createReadStream(__dirname + "/cache/1.png")}, event.threadID,
        () => fs.unlinkSync(__dirname + "/cache/1.png"),event.messageID); 
    return request(encodeURI(`https://graph.facebook.com/${uid}/picture?height=1500&width=1500&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`)).pipe(fs.createWriteStream(__dirname+'/cache/1.png')).on('close',
        () => callback());
    }
}