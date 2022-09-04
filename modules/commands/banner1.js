module.exports.config = {
    name: "banner1",
    version: "1.0.0",
    hasPermssion: 0,
    credits: "Raiku",
    description: "abcxyz",
    commandCategory: "Tạo ảnh",
    usages: "",
    cooldowns: 5
};
module.exports.wrapText = (ctx, text, maxWidth) => {
	return new Promise(resolve => {
    ctx.textAlign = "center";
		if (ctx.measureText(text).width < maxWidth) return resolve([text]);
		if (ctx.measureText('W').width > maxWidth) return resolve(null);
		const words = text.split(' ');
		const lines = [];
		let line = '';
		while (words.length > 0) {
      ctx.textAlign = "center";
			let split = false;
			while (ctx.measureText(words[0]).width >= maxWidth) {
				const temp = words[0];
				words[0] = temp.slice(0, -1);
				if (split) words[1] = `${temp.slice(-1)}${words[1]}`;
				else {
					split = true;
					words.splice(1, 0, temp.slice(-1));
				}
			}
			if (ctx.measureText(`${line}${words[0]}`).width < maxWidth) line += `${words.shift()} `;
			else {
        ctx.textAlign = "center";
				lines.push(line.trim());
				line = '';
			}
			if (words.length === 0) lines.push(line.trim());
		}
    ctx.textAlign = "center"
		return resolve(lines);
	});
}
module.exports.run = async function ({ api, event, client, args }) {
  switch (args[0]) {
      case "1": {
  const text1 = args.join(" ").trim().replace(/\s+/g, " ").replace(/(\s+\|)/g, "|").replace(/\|\s+/g, "|").split("|")[1] || "TEXT",
    //text2 = args.join(" ").trim().replace(/\s+/g, " ").replace(/(\s+\|)/g, "|").replace(/\|\s+/g, "|").split("|")[1] || "TEXT",
    text2 = args.join(" ").trim().replace(/\s+/g, " ").replace(/(\s+\|)/g, "|").replace(/\|\s+/g, "|").split("|")[2] || "TEXT";
  color = args.join(" ").trim().replace(/\s+/g, " ").replace(/(\s+\|)/g, "|").replace(/\|\s+/g, "|").split("|")[3] || "red";
    const { loadImage, createCanvas } = require("canvas");
    const fs = require('fs')
    const request = require('request');
    const path = require('path');
    const axios = require('axios');
    const Canvas = require('canvas');
    let pathImg = __dirname + `/tad/avatar_1.png`;
    let background = (await axios.get(encodeURI(`https://imgur.com/Wy6cc05.png`), { responseType: "arraybuffer" })).data;
    fs.writeFileSync(pathImg, Buffer.from(background, "utf-8"));
    if (!fs.existsSync(__dirname +
      `/tad/Catamaran.ttf`)) {
      let getfont = (await axios.get(`https://github.com/PLViet/fonts/raw/main/Catamaran.ttf`, { responseType: "arraybuffer" })).data;
      fs.writeFileSync(__dirname + `/tad/Catamaran.ttf`, Buffer.from(getfont, "utf-8"));
    };
    if (!fs.existsSync(__dirname +
      `/tad/Metropolis-Black.ttf`)) {
      let getfont1 = (await axios.get(`https://github.com/PLViet/fonts/blob/main/Metropolis-Black.otf?raw=true`, { responseType: "arraybuffer" })).data;
      fs.writeFileSync(__dirname + `/tad/Metropolis-Black.ttf`, Buffer.from(getfont1, "utf-8"));
    };
    if (!fs.existsSync(__dirname +
      `/tad/UTMAlterGothic.ttf`)) {
      let getfont1 = (await axios.get(`https://github.com/PLViet/fonts/blob/main/UTM%20Alter%20Gothic.ttf?raw=true`, { responseType: "arraybuffer" })).data;
      fs.writeFileSync(__dirname + `/tad/UTMAlterGothic.ttf`, Buffer.from(getfont1, "utf-8"));
    }
      let a = await loadImage(pathImg);
      let canvas = createCanvas(a.width, a.height);
      let ctx = canvas.getContext("2d");
    let canvas2 = createCanvas(a.width, a.height);
    let ctx1 = canvas2.getContext("2d");
    let canvas3 = createCanvas(a.width, a.height);
    let ctx2 = canvas3.getContext("2d");
    ctx.drawImage(a , 0, 0, canvas.width, canvas.height)
    ctx.save();
    ctx.globalCompositeOperation = "hue"
    ctx.fillStyle = color
    ctx.fillRect(0, 0, canvas.width, canvas.height) 
    ctx.restore();
  Canvas.registerFont(__dirname + `/tad/Catamaran.ttf`, {
    family: "Catamaran"
  });
    ctx1.font = '180px Catamaran'
    ctx1.globalAlpha = 0.6
    ctx1.strokeStyle = "#fff"
    ctx1.lineWidth = 3
    ctx1.textAlign = "center";
	ctx1.strokeStyle = "rgba(255,255,255,0.5)"
    ctx1.strokeText(text1.toUpperCase(), canvas.width / 2,
                canvas.height / 2 + 51)
   ctx1.restore();
    ctx2.save();
ctx.drawImage(canvas2 , 0, 0, canvas.width, canvas.height)
     Canvas.registerFont(__dirname + `/tad/Metropolis-Black.ttf`, {
    family: "Metropolis-Black"
  });
      ctx2.font = "130px Metropolis-Black";
    ctx2.textAlign = "center";
    ctx2.shadowColor = 'white';
    ctx2.shadowBlur = 30;
    ctx2.fillStyle = 'white'
    ctx2.textAlign = 'center' 
    ctx2.fillText(text1.toUpperCase(), canvas.width / 2, 390)
	ctx2.restore()
    ctx2.save()
    ctx.drawImage(canvas3 , 0, 0, canvas.width, canvas.height)
     Canvas.registerFont(__dirname + `/tad/UTMAlterGothic.ttf`, {
    family: "UTM Alter Gothic"
  });
    ctx.font = "35px UTM Alter Gothic";
    ctx.textAlign = "center";
    ctx.shadowColor = 'black'
    ctx.shadowBlur = 15;
    ctx.fillStyle = "white"  
    const lines = text2.toUpperCase()
   const tad = await this.wrapText(ctx, lines, 1500);
    ctx.fillText(tad.join('\n'), canvas.width / 2,
                canvas.height / 2 + 120)
   ctx.beginPath();
  const imageBuffer = canvas.toBuffer();
  fs.writeFileSync(pathImg, imageBuffer);
  return api.sendMessage({
    body: "Ảnh Của Bạn Đây",
    attachment: fs.createReadStream(pathImg)
  },
    event.threadID,
    () => fs.unlinkSync(pathImg),
    event.messageID
  );
 }
      case "2": {
  const text1 = args.join(" ").trim().replace(/\s+/g, " ").replace(/(\s+\|)/g, "|").replace(/\|\s+/g, "|").split("|")[1] || "TEXT",
    //text2 = args.join(" ").trim().replace(/\s+/g, " ").replace(/(\s+\|)/g, "|").replace(/\|\s+/g, "|").split("|")[1] || "TEXT",
    text2 = args.join(" ").trim().replace(/\s+/g, " ").replace(/(\s+\|)/g, "|").replace(/\|\s+/g, "|").split("|")[2] || "TEXT";
  color = args.join(" ").trim().replace(/\s+/g, " ").replace(/(\s+\|)/g, "|").replace(/\|\s+/g, "|").split("|")[3] || "red";
    const { loadImage, createCanvas } = require("canvas");
    const fs = require('fs')
    const request = require('request');
    const path = require('path');
    const axios = require('axios');
    const Canvas = require('canvas');
    let pathImg = __dirname + `/tad/avatar_1.png`;
    let background = (await axios.get(encodeURI(`https://i.imgur.com/HFok8LJ.png`), { responseType: "arraybuffer" })).data;
    fs.writeFileSync(pathImg, Buffer.from(background, "utf-8"));
    if (!fs.existsSync(__dirname +
      `/tad/Catamaran.ttf`)) {
      let getfont = (await axios.get(`https://github.com/PLViet/fonts/raw/main/Catamaran.ttf`, { responseType: "arraybuffer" })).data;
      fs.writeFileSync(__dirname + `/tad/Catamaran.ttf`, Buffer.from(getfont, "utf-8"));
    };
    if (!fs.existsSync(__dirname +
      `/tad/Metropolis-Black.ttf`)) {
      let getfont1 = (await axios.get(`https://github.com/PLViet/fonts/blob/main/Metropolis-Black.otf?raw=true`, { responseType: "arraybuffer" })).data;
      fs.writeFileSync(__dirname + `/tad/Metropolis-Black.ttf`, Buffer.from(getfont1, "utf-8"));
    };
    if (!fs.existsSync(__dirname +
      `/tad/UTMAlterGothic.ttf`)) {
      let getfont1 = (await axios.get(`https://github.com/PLViet/fonts/blob/main/UTM%20Alter%20Gothic.ttf?raw=true`, { responseType: "arraybuffer" })).data;
      fs.writeFileSync(__dirname + `/tad/UTMAlterGothic.ttf`, Buffer.from(getfont1, "utf-8"));
    }
      let a = await loadImage(pathImg);
      let canvas = createCanvas(a.width, a.height);
      let ctx = canvas.getContext("2d");
    let canvas2 = createCanvas(a.width, a.height);
    let ctx1 = canvas2.getContext("2d");
    let canvas3 = createCanvas(a.width, a.height);
    let ctx2 = canvas3.getContext("2d");
    ctx.drawImage(a , 0, 0, canvas.width, canvas.height)
    ctx.save();
    ctx.globalCompositeOperation = "hue"
    ctx.fillStyle = color
    ctx.fillRect(0, 0, canvas.width, canvas.height) 
    ctx.restore();
  Canvas.registerFont(__dirname + `/tad/Catamaran.ttf`, {
    family: "Catamaran"
  });
    ctx1.font = '180px Catamaran'
    ctx1.globalAlpha = 0.6
    ctx1.strokeStyle = "#fff"
    ctx1.lineWidth = 3
    ctx1.textAlign = "center";
	ctx1.strokeStyle = "rgba(255,255,255,0.5)"
    ctx1.strokeText(text1.toUpperCase(), canvas.width / 2,
                canvas.height / 2 + 51)
   ctx1.restore();
    ctx2.save();
ctx.drawImage(canvas2 , 0, 0, canvas.width, canvas.height)
     Canvas.registerFont(__dirname + `/tad/Metropolis-Black.ttf`, {
    family: "Metropolis-Black"
  });
      ctx2.font = "130px Metropolis-Black";
    ctx2.textAlign = "center";
    ctx2.shadowColor = 'white';
    ctx2.shadowBlur = 30;
    ctx2.fillStyle = 'white'
    ctx2.textAlign = 'center' 
    ctx2.fillText(text1.toUpperCase(), canvas.width / 2, 590)
	ctx2.restore()
    ctx2.save()
    ctx.drawImage(canvas3 , 0, 0, canvas.width, canvas.height)
     Canvas.registerFont(__dirname + `/tad/UTMAlterGothic.ttf`, {
    family: "UTM Alter Gothic"
  });
    ctx.font = "35px UTM Alter Gothic";
    ctx.textAlign = "center";
    ctx.shadowColor = 'black'
    ctx.shadowBlur = 15;
    ctx.fillStyle = "white"  
    const lines = text2.toUpperCase()
   const tad = await this.wrapText(ctx, lines, 1500);
    ctx.fillText(tad.join('\n'), canvas.width / 2,
                canvas.height / 2 + 120)
   ctx.beginPath();
  const imageBuffer = canvas.toBuffer();
  fs.writeFileSync(pathImg, imageBuffer);
  return api.sendMessage({
    body: "Ảnh Của Bạn Đây",
    attachment: fs.createReadStream(pathImg)
  },
    event.threadID,
    () => fs.unlinkSync(pathImg),
    event.messageID
  );
 }
default: {
        return api.sendMessage(`Bạn đã dùng sai cách, hãy xem hdsd:\n/banner1 1 | text1 | text2 | color \n /banner1 2 | text1 | text2 | color`, event.threadID, event.messageID); 
        
        }
      
      }
        
}