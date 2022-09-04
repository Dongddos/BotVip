module.exports.config = {
  name: "pubgquiz",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "D-Jukie",
  description: "Câu hỏi dành cho người chơi pubg",
  commandCategory: "Giải trí",
  usages: "[type/help]",
  cooldowns: 0
};

module.exports.handleReply = async function({ api, event, args, handleReply, client, Threads, Users, Currencies }) {
    const { answer, messageID } = handleReply
    const answerUser = (event.body).toUpperCase()
    if (answerUser != "A" && answerUser != "B" && answerUser != "C") return
    if ( answerUser == answer ) {
        api.unsendMessage(messageID)
        await Currencies.increaseMoney(event.senderID, parseInt(100));
        return api.sendMessage(`=== 100$ ===\n» Chúc mừng bạn đã trả lời đúng, đáp án là: ${answer}`, event.threadID, event.messageID)
      }
      else 
        api.unsendMessage(messageID)
        return api.sendMessage(`» Tiếc quá, bạn trả lời sai rồi, đáp án là: ${answer}`, event.threadID, event.messageID)
    }
module.exports. run = async function({api, event, args, client}) {
  const axios = global.nodemodule['axios'];
  const fs = global.nodemodule["fs-extra"];
    const { createReadStream, unlinkSync, writeFileSync } = global.nodemodule["fs-extra"];
    const threadSetting = global.data.threadData.get(parseInt(event.threadID)) || {};
    const prefix = (threadSetting.hasOwnProperty("PREFIX")) ? threadSetting.PREFIX : global.config.PREFIX;
    const { threadID, messageID } = event;
    var type;
    if (args[0] == 'help') return api.sendMessage(`${this.config.name} [type]\nTpye gồm: random/rifle/srilfe/shotgun/sniper/smg/pistol/machine/throw/ammo/melee/muzzle/lower-rail/upper-rail/mags/stock`, event.threadID, event.messageID)
    switch (args[0]) {
        case "rifle":
            type = "rifle";
        break;
        case "srilfe":
            type = "srilfe";
        break;
        case "shotgun":
            type = "shotgun";
        break;
        case "sniper":
            type = "sniper";
        break;
        case "smg":
          type = "smg";
        break;
        case "piston":
            type = "piston";
        break;  
        case "machine":
            type = "machine";
        break; 
        case "throw":
            type = "throw";
        break; 
        case "ammo":
            type = "ammo";
        break; 
        case "melee":
            type = "melee";
        break; 
        case "muzzle":
            type = "muzzle";
        break; 
        case "lower-rail":
            type = "lower-rail";
        break; 
        case "upper-rail":
            type = "upper-rail";
        break; 
        case "mags":
            type = "mags";
        break; 
        case "stock":
            type = "stock";
        break; 
        default:
            type = "random";
        break;
    }
    try {
    const res = await axios.get(`https://ginxkin-api.herokuapp.com/api/pubg_quiz/${type}`);
    const linkGun = res.data.link
    const bodyy = res.data.body
    const imgthumnail = [];
    const getIMG = (await axios.get(`${linkGun}`, {
            responseType: "arraybuffer"
})).data;
        fs.writeFileSync( __dirname + `/cache/${event.senderID}.png`, Buffer.from(getIMG, "utf-8"));
        imgthumnail.push(fs.createReadStream(__dirname + `/cache/${event.senderID}.png`));
        return api.sendMessage({
                attachment: imgthumnail,
                body: bodyy
            }, event.threadID, (error, info) => {
                global.client.handleReply.push({
                        name: this.config.name,
                        messageID: info.messageID,
                        author: event.senderID,
                        answer: res.data.answer
                    })
                },
           event.messageID);
      } catch {
        return api.sendMessage('» Đã xảy ra lỗi khi lấy câu hỏi!!')
      }
}