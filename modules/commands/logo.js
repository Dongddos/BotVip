module.exports.config = {
	name:"logo",
	version: "1.0.0",
	hasPermssion: 0,
	credits: "Mirai-Team",
	description: "Random ảnh theo api - uptime",
	commandCategory: "system",
	cooldowns: 3
};

module.exports.run = async ({ api, event, args }) => {
  const text1 = args.join(" ").trim().replace(/\s+/g, " ").replace(/(\s+\|)/g, "|").replace(/\|\s+/g, "|").split("|")[0] || "TEXT",
    text2 = args.join(" ").trim().replace(/\s+/g, " ").replace(/(\s+\|)/g, "|").replace(/\|\s+/g, "|").split("|")[1] || "TEXT",
    color1 = args.join(" ").trim().replace(/\s+/g, " ").replace(/(\s+\|)/g, "|").replace(/\|\s+/g, "|").split("|")[2] || "#ffffff",
color2 = args.join(" ").trim().replace(/\s+/g, " ").replace(/(\s+\|)/g, "|").replace(/\|\s+/g, "|").split("|")[3] || "#111111"

    const axios = require('axios')
	// const pidusage = await global.nodemodule["pidusage"](process.pid);
	const timeStart = Date.now();
  const fs = require('fs-extra');
   if (!fs.existsSync(__dirname +
        `/tad/SVN-REVOLUTION.TTF`)) {
        let getfont = (await axios.get(`https://github.com/PLViet/fonts/raw/main/SVN-REVOLUTION.TTF`, { responseType: "arraybuffer" })).data;
        fs.writeFileSync(__dirname + `/tad/SVN-REVOLUTION.TTF`, Buffer.from(getfont, "utf-8"));
      }
         if (!fs.existsSync(__dirname +
      `/tad/phenomicon.ttf`)) {
      let getfont2 = (await axios.get(`https://github.com/hanakuUwU/font/raw/main/phenomicon.ttf`, { responseType: "arraybuffer" })).data;
      fs.writeFileSync(__dirname + `/tad/phenomicon.ttf`, Buffer.from(getfont2, "utf-8"));
    };
  if (!fs.existsSync(__dirname +
      `/tad/CaviarDreams.ttf`)) {
      let getfont3 = (await axios.get(`https://github.com/hanakuUwU/font/raw/main/CaviarDreams.ttf`, { responseType: "arraybuffer" })).data;
      fs.writeFileSync(__dirname + `/tad/CaviarDreams.ttf`, Buffer.from(getfont3, "utf-8"));
    };
   const { loadImage, createCanvas, registerFont } = require("canvas");
  
  const Canvas = require('canvas');
    let pathImg = __dirname + `/tad/avatar_1111231.png`;
   
    let background = (await axios.get(encodeURI(`https://lh3.googleusercontent.com/-fJXKeIC8E2w/YY-PQO_pOzI/AAAAAAAA0rg/clQv41eetT0e3d1LZS6lgxuZ8ARbnzuywCNcBGAsYHQ/s0/Logo-block.png`), { responseType: "arraybuffer" })).data;
    fs.writeFileSync(pathImg, Buffer.from(background, "utf-8"));
    // let ava = (await axios.get(encodeURI(`${lengthchar[id - 1].imgAnime}`), { responseType: "arraybuffer" })).data;
    // fs.writeFileSync(pathAva, Buffer.from(ava, "utf-8"));
    const request = require('request');
    const path = require('path');
   
  
    let a = await loadImage(pathImg);
    let canvas = createCanvas(a.width, a.height);
    var ctx = canvas.getContext("2d");
     ctx.clearRect(0, 0, canvas.width, canvas.height)
          ctx.save();
          ctx.fillStyle = '#111'
          ctx.fillRect(0, 0, canvas.width, canvas.height)
          ctx.restore();
          ctx.save();
          ctx.globalCompositeOperation = 'destination-out'
          ctx.drawImage(a, 0, 0, canvas.width, canvas.height )
          ctx.save();
  Canvas.registerFont(__dirname + `/tad/SVN-REVOLUTION.TTF`, {
    family: "SVN-REVOLUTION"
  });
          ctx.textAlign = 'center'
          ctx.font = '300px SVN-REVOLUTION'
          ctx.fillText(text1, canvas.width / 2, 1450)
          ctx.restore();
          ctx.save();
          ctx.textAlign = 'center'
          ctx.font = '100px SVN-REVOLUTION'
          ctx.fillText(text2, canvas.width / 2, 1650)
          ctx.restore();
          ctx.restore();
          ctx.globalCompositeOperation = 'destination-over'
          var logoAg = ctx.createLinearGradient(0, 0, 0, 2000)
          logoAg.addColorStop(0, color1)
          logoAg.addColorStop(1, color2)
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
  },
    event.threadID,
    () => fs.unlinkSync(pathImg),
    // fs.unlinkSync(pathAva),
    event.messageID
  );
}