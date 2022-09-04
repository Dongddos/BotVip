
 module.exports.config = {
	name:"taologo",
	version: "1.0.0",
	hasPermssion: 0,
	credits: "BraSL",
	description: "Tạo logos",
	commandCategory: "tạo ảnh",
	cooldowns: 3
};
module.exports.handleReply = async function({ api, event, handleReply }) {
  const axios = require('axios');
  var fs = require('fs-extra'),{ join } = require('path');
  const Canvas = require('canvas');

  const { loadImage, createCanvas, registerFont } = require("canvas");
    if (event.senderID != handleReply.author) return api.sendMessage('CúC', event.threaID);
    let pathImg = __dirname + `/cache/avatar_1.png`;
  
    const lengthchar = (await axios.get('https://run.mocky.io/v3/52e20c82-dd81-423d-bcbb-bfa3a352638f')).data
    
    switch(handleReply.step) {
        case 1: {
            if(isNaN(event.body)) return api.sendMessage('Bạn phải nhập một con số', event.threadID, event.messageID)   
            api.unsendMessage(handleReply.messageID);
            return api.sendMessage(`Bạn chọn logo mang ID ${event.body}, hãy reply tin nhắn này để nhập tên`, event.threadID, (err, info) => {
                global.client.handleReply.push({
                    step: 2,
                    name: "taologo",
                    author: event.senderID,
                    idchart: event.body,
                    messageID: info.messageID
                });
            });
        }
        case 2: {
            api.unsendMessage(handleReply.messageID);
            return api.sendMessage(`Bạn chọn tên  ${event.body}, hãy reply tin nhắn này để nhập Slogan`, event.threadID, (err, info) => {
                global.client.handleReply.push({
                    step: 3,
                    name: "taologo",
                    author: event.senderID,
                    idchart: handleReply.idchart,
                    tenchinh: event.body,
                    messageID: info.messageID
                });
            });
        }
		
		case 3: {
            api.unsendMessage(handleReply.messageID);
            return api.sendMessage(`Bạn đã nhập Slogan là ${event.body}, hãy reply tin nhắn này để nhập color1`, event.threadID, (err, info) => {
                global.client.handleReply.push({
                    step: 4,
                    name: "taologo",
                    author: event.senderID,
                    idchart: handleReply.idchart,
                    tenchinh: handleReply.tenchinh,
					Slogan: event.body,
                    messageID: info.messageID
                });
            });
        }
		
		case 4: {
            api.unsendMessage(handleReply.messageID);
            return api.sendMessage(`Bạn đã nhập color1 là ${event.body}, hãy reply tin nhắn này để nhập color2`, event.threadID, (err, info) => {
                global.client.handleReply.push({
                    step: 5,
                    name: "taologo",
                    author: event.senderID,
                    idchart: handleReply.idchart,
                    tenchinh: handleReply.tenchinh,
					Slogan: handleReply.Slogan,
					color1: event.body,
                    messageID: info.messageID
                });
            });
        }
        
       
        case 5: {
            api.unsendMessage(handleReply.messageID);
            const idchart = handleReply.idchart
            const text1 = handleReply.tenchinh
            const text2 = handleReply.Slogan
            const color1 = handleReply.color1
			      const color2 = event.body
              //const nenn = nen       
            let img = await loadImage("https://i.imgur.com/6PHRIRt.png");
            let avatar = await loadImage(`${lengthchar[idchart].c}`);
            let canvas = createCanvas(img.width, img.height);
            var ctx = canvas.getContext("2d");
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          ctx.fillStyle = "white";
            
          ctx.save();
        
          ctx.fillRect(0, 0, canvas.width, canvas.height)
          ctx.restore();
          ctx.save();
          ctx.globalCompositeOperation = 'destination-out'
          ctx.drawImage(avatar, canvas.width / 2 - 300, 100, 600, 600)
          ctx.save();
  Canvas.registerFont(__dirname + `/tad/UTM-Bitsumishi-Pro.ttf`, {
    family: "UTM-Bitsumishi-Pro"
  });
          ctx.textAlign = 'center'
          ctx.font = '120px UTM-Bitsumishi-Pro'
          ctx.fillText(text1.toUpperCase(), canvas.width / 2, 830)
          ctx.restore();
          ctx.save();
          ctx.textAlign = 'center'
          ctx.font = '50px UTM-Bitsumishi-Pro'
          ctx.fillText(text2.toUpperCase(), canvas.width / 2, 900)
          ctx.restore();
          ctx.restore();
          ctx.globalCompositeOperation = 'destination-over'
          var logoAg = ctx.createLinearGradient(0, 0, 0, 2000)
          logoAg.addColorStop(0, color1)
          logoAg.addColorStop(4, color2)
          ctx.fillStyle = logoAg
          ctx.fillRect(0, 0, canvas.width, canvas.height)
          ctx.restore();
          ctx.save();
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
module.exports.run = async function({ api, event,args }) {
const { loadImage, createCanvas } = require("canvas");
   const fs = require('fs')
    const request = require('request');
    const path = require('path');
    const axios = require('axios');
    const Canvas = require('canvas');
  if (!fs.existsSync(__dirname +
      `/tad/UTM-Bitsumishi-Pro.ttf`)) {
      let getfont = (await axios.get(`https://github.com/PLViet/fonts/raw/main/UTM-Bitsumishi-Pro.ttf`, { responseType: "arraybuffer" })).data;
      fs.writeFileSync(__dirname + `/tad/UTM-Bitsumishi-Pro.ttf`, Buffer.from(getfont, "utf-8"));
    };
    return api.sendMessage("Reply Tin Nhắn Này Để Chọn logo", event.threadID, (err, info) => {
        global.client.handleReply.push({
            step: 1,
            name: "taologo",
            author: event.senderID,
            messageID: info.messageID
        });
    });
              }