const axios = require("axios");
const fs = require("fs");
const { loadImage, createCanvas, registerFont } = require("canvas");

module.exports.config = {
    name: "banner",
    version: "1.0.0",
    hasPermssion: 0,
    credits: "Hanaku UwuU",
    description: "banner",
    commandCategory: "game",
    usages: "",
    cooldowns: 5
  };

module.exports.handleReply = async function({ api, event, handleReply }) {
    if (event.senderID != handleReply.author) return api.sendMessage('CúC', event.threaID);
    let pathImg = __dirname + `/cache/avatar_1.png`;
    const lengthchar = (await axios.get('https://run.mocky.io/v3/5fbcbc85-bc95-4691-8f51-422eb359732d')).data
    switch(handleReply.step) {
        case 1: {
            if(isNaN(event.body)) return api.sendMessage('Bạn phải nhập một con số', event.threadID, event.messageID)   
            api.unsendMessage(handleReply.messageID);
            return api.sendMessage(`Bạn chọn char mang ID ${event.body}, hãy reply tin nhắn này để nhập tên chính`, event.threadID, (err, info) => {
                global.client.handleReply.push({
                    step: 2,
                    name: "banner",
                    author: event.senderID,
                    idchart: event.body,
                    messageID: info.messageID
                });
            });
        }
        case 2: {
            api.unsendMessage(handleReply.messageID);
            return api.sendMessage(`Bạn chọn tên chính ${event.body}, hãy reply tin nhắn này để nhập tên phụ`, event.threadID, (err, info) => {
                global.client.handleReply.push({
                    step: 3,
                    name: "banner",
                    author: event.senderID,
                    idchart: handleReply.idchart,
                    tenchinh: event.body,
                    messageID: info.messageID
                });
            });
        }
        case 3: {
            api.unsendMessage(handleReply.messageID);
            return api.sendMessage(`Bạn chọn tên phụ ${event.body}, hãy reply tin nhắn này để nhập tên facebook`, event.threadID, (err, info) => {
                global.client.handleReply.push({
                    step: 4,
                    name: "banner",
                    author: event.senderID,
                    idchart: handleReply.idchart,
                    tenchinh: handleReply.tenchinh,
                    tenphu: event.body,
                    messageID: info.messageID
                });
            });
        }
        case 4: {
            api.unsendMessage(handleReply.messageID);
            return api.sendMessage(`Bạn chọn tên facebook ${event.body}, hãy reply tin nhắn này để nhập tên Instagram`, event.threadID, (err, info) => {
                global.client.handleReply.push({
                    step: 5,
                    name: "banner",
                    author: event.senderID,
                    idchart: handleReply.idchart,
                    tenchinh: handleReply.tenchinh,
                    tenphu: handleReply.tenphu,
                    facebook: event.body,
                    messageID: info.messageID
                });
            });
        }
        case 5: {
            api.unsendMessage(handleReply.messageID);
            const tenchinh = handleReply.tenchinh
            const idchart = handleReply.idchart
            const subname = handleReply.tenphu
            const facebook = handleReply.facebook
            const instagram = event.body
            registerFont(__dirname + `/cache/ArialUnicodeMS.ttf`, {
                family: "AUMS"
            });
            let img = await loadImage("https://imgur.com/kTKV4cG.jpg");
            let avatar = await loadImage(`${lengthchar[idchart].imgAnime}`);
            let canvas = createCanvas(img.width, img.height);
            var ctx = canvas.getContext("2d");
            ctx.fillStyle = lengthchar[idchart].colorBg;
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
            ctx.drawImage(avatar, 800, -160, 1100, 1100);
            ctx.textAlign = "start";
            ctx.font = "130px AUMS";
            ctx.fillStyle = lengthchar[idchart].colorBg;
            ctx.fillText(tenchinh, 95, 340);
            ctx.beginPath();
            ////////////////////////////////////////
          ctx.textAlign = "start";
   ctx.font = "70px UTM";
    ctx.fillStyle = "#fdfdfd";
            ctx.fillText(subname, 180, 440);
            ctx.restore();
            ctx.save(); 
          registerFont(__dirname + `/tad/phenomicon.ttf`, {
      family: "time" 
         });
            ctx.textAlign = "start";
            ctx.font = "50px time";
            ctx.fillText("@" + facebook, 240, 630)
            ctx.fillText("@" + instagram , 240,740)
            ctx.restore();
            ctx.save
            ctx.beginPath();
            const imageBuffer = canvas.toBuffer();
            fs.writeFileSync(pathImg, imageBuffer);
            return api.sendMessage({
                body: `ảnh của bạn đây`,
                attachment: fs.createReadStream(pathImg)
            }, event.threadID, event.messageID);
        }
    }
}


module.exports.run = async function({ api, event }) {
    if (!fs.existsSync(__dirname + `/cache/ArialUnicodeMS.ttf`)) {
        let getfont = (await axios.get(`https://github.com/J-JRT/Font/blob/mainV2/ArialUnicodeMS.ttf?raw=true`, { responseType: "arraybuffer" })).data;
        fs.writeFileSync(__dirname + `/cache/ArialUnicodeMS.ttf`, Buffer.from(getfont, "utf-8"));
    };
    return api.sendMessage("Reply Tin Nhắn Này Để Chọn Char", event.threadID, (err, info) => {
        global.client.handleReply.push({
            step: 1,
            name: "banner",
            author: event.senderID,
            messageID: info.messageID
        });
    });
}