module.exports.config = {
  name: "banneralime",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "Hanaku",
  description: "just a banner",
  commandCategory: "admin",
  usages: "",
  cooldowns: 0
};
module.exports.wrapText = (ctx, text, maxWidth) => {
	return new Promise(resolve => {
		if (ctx.measureText(text).width < maxWidth) return resolve([text]);
		if (ctx.measureText('W').width > maxWidth) return resolve(null);
		const words = text.split(' ');
		const lines = [];
		let line = '';
		while (words.length > 0) {
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
				lines.push(line.trim());
				line = '';
			}
			if (words.length === 0) lines.push(line.trim());
		}
		return resolve(lines);
	});
} 
module.exports.run = async function ({ api, args, event, Users, permssion, Currencies }) { // Users, permssion, Currencies for what use?
    try {
        const owo = args.join(" ").trim().replace(/\s+/g, " ").replace(/(\s+\|)/g, "|").replace(/\|\s+/g, "|").split("|")[0] || "24"

        if (owo == "random" || owo == "Random" || owo == "ngẫu nhiên") {
            var id = Math.floor(Math.random() * 848) + 1
        } else {
            var id = owo
        }
        const name = args.join(" ").trim().replace(/\s+/g, " ").replace(/(\s+\|)/g, "|").replace(/\|\s+/g, "|").split("|")[1] || "name"
        const subname = args.join(" ").trim().replace(/\s+/g, " ").replace(/(\s+\|)/g, "|").replace(/\|\s+/g, "|").split("|")[2] || "info"
        const lines = args.join(" ").trim().replace(/\s+/g, " ").replace(/(\s+\|)/g, "|").replace(/\|\s+/g, "|").split("|")[3] || "info"
        const title = args.join(" ").trim().replace(/\s+/g, " ").replace(/(\s+\|)/g, "|").replace(/\|\s+/g, "|").split("|")[4] || "info"
        // args.join(" ").trim().replace(/\s+/g, " ").replace(/(\s+\|)/g, "|").replace(/\|\s+/g, "|").split("|")[n!]
        const fs = require('fs-extra');
        const { loadImage, createCanvas, registerFont } = require("canvas");
        
        
        
const Canvas = require('canvas');
        const axios = require('axios');
        const lengthchar = (await axios.get('https://run.mocky.io/v3/f502ab6a-7fe1-45ea-b2a6-88f8f643b8aa')).data
        // console.log(lengthchar.length)
        // why the f not use those?
        const request = require('request');
        const path = require('path');



        // what the f again??
        let pathImg = __dirname + `/tad/avatar_11134231.png`;
        let pathLine = __dirname + `/tad/avatar_11121231.png`;
        let pathAva = __dirname + `/tad/avatar_3dsc12311.png`;
        let pathIcon = __dirname + `/tad/avatar_3ds23c12311.png`;
        let pathIconIG = __dirname + `/tad/sssss.png`;
        let pathIcongithub = __dirname + `/tad/owo.png`;
        let line = __dirname + `/tad/12341o.png`;


        let line1 = (await axios.get(encodeURI(`https://imgur.com/g2xNV2C.png`), { responseType: "arraybuffer" })).data;
        fs.writeFileSync(line, Buffer.from(line1, "utf-8"));
        let background = (await axios.get(encodeURI(`https://imgur.com/qBMs0FN.png`), { responseType: "arraybuffer" })).data;
        fs.writeFileSync(pathImg, Buffer.from(background, "utf-8"));
        let ava = (await axios.get(encodeURI(`${lengthchar[id].imgAnime}`), { responseType: "arraybuffer" })).data;
        fs.writeFileSync(pathAva, Buffer.from(ava, "utf-8"));
        if (!fs.existsSync(__dirname +
            `/tad/SVN-REVOLUTION.TTF`)) {
            let getfont = (await axios.get(`https://github.com/PLViet/fonts/raw/main/SVN-REVOLUTION.TTF`, { responseType: "arraybuffer" })).data;
            fs.writeFileSync(__dirname + `/tad/SVN-REVOLUTION.TTF`, Buffer.from(getfont, "utf-8"));
        };
      if (!fs.existsSync(__dirname +
      `/tad/HOBOSTD.otf`)) {
      let getfon2t = (await axios.get(`https://github.com/PLViet/fonts/raw/main/HOBOSTD.OTF`, { responseType: "arraybuffer" })).data;
      fs.writeFileSync(__dirname + `/tad/HOBOSTD.otf`, Buffer.from(getfon2t, "utf-8"));
    };
        let icon3 = (await axios.get(encodeURI(`https://imgur.com/38Ws4qZ.png`), { responseType: "arraybuffer" })).data;
        fs.writeFileSync(pathIcongithub, Buffer.from(icon3, "utf-8"));
        let liness = (await axios.get(encodeURI(`https://i.imgur.com/QM2K2Bq.png`), { responseType: "arraybuffer" })).data;
        fs.writeFileSync(pathLine, Buffer.from(liness, "utf-8"));
        let icon = (await axios.get(encodeURI(`https://imgur.com/zmMas6s.png`), { responseType: "arraybuffer" })).data;
        fs.writeFileSync(pathIcon, Buffer.from(icon, "utf-8"));
        let icon2 = (await axios.get(encodeURI(`https://imgur.com/QsJPESz.png`), { responseType: "arraybuffer" })).data;
        fs.writeFileSync(pathIconIG, Buffer.from(icon2, "utf-8"));
registerFont(__dirname + `/tad/SVN-REVOLUTION.TTF`, {
            family: "SVN-REVOLUTION"
        });
      registerFont(__dirname + `/tad/HOBOSTD.otf`, {
            family: "HOBOSTD"
        });

        // what the fuck is this, really, what THE FUCK IS THIS?
        let l1 = await loadImage(pathAva);
        let a = await loadImage(pathImg);
        let p = await loadImage(pathLine);
        let g = await loadImage(pathIcon);
        let l = await loadImage(line);
        let r = await loadImage(pathIconIG);
        let o = await loadImage(pathIcongithub);


        let canvas = createCanvas(a.width, a.height);
        var ctx = canvas.getContext("2d");
      
        
      
        ctx.drawImage(a, 0, 0, canvas.width, canvas.height);
        ctx.drawImage(l1, -100, -70, 1000, 1000);
        ctx.beginPath();
        ctx.globalCompositeOperation = "destination-out";
        ctx.drawImage(p, 0, 0, canvas.width, canvas.height);
        ctx.globalCompositeOperation = "destination-over";
        ctx.fillStyle = lengthchar[id].colorBg
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.globalCompositeOperation = "source-over";
        ctx.beginPath();

        ctx.textAlign = "start";
        ctx.strokeStyle = lengthchar[id].colorBg;
        ctx.filter = "brightness(90%) contrast(110%)";
        ctx.font = "116px SVN-REVOLUTION";
        ctx.fillText(name, 850, 390);
        ctx.restore();
        ctx.save();
    ////
    ctx.textAlign = "start";
    ctx.fillStyle = "#ffffff";
    ctx.font = "48px HOBOSTD"
    ctx.fillText(subname, 1025, 635)
    ctx.font = "48px HOBOSTD"
    ctx.fillStyle = "#ffffff";
    const abc = await this.wrapText(ctx, lines, 750);
    ctx.fillText(abc.join('\n'), 1025, 720)
    ////
    
    ctx.textAlign = "start";
    ctx.fillStyle = "#ffff";
    ctx.font = "48px HOBOSTD"
    ctx.fillText(title, 1025, 810)
   // ctx.textAlign = "start";
   // ctx.fillStyle = "#ffff";
    //ctx.font = "35px HOBOSTD"
    //ctx.fillText("@BraSL", 1340, 730)
    ctx.globalAlpha = 0.5
    ctx.drawImage(l, 0, 0, l.width, l.height);
    ctx.save()
      
    ctx.beginPath();
      const imageBuffer = canvas.toBuffer();
  fs.writeFileSync(pathImg, imageBuffer);
  return api.sendMessage({
    body: "Ảnh Của Bạn Đây",
    attachment: fs.createReadStream(pathImg)
  },
    event.threadID,
    () => fs.unlinkSync(pathImg),
    fs.unlinkSync(pathAva),
    fs.unlinkSync(pathLine),
    fs.unlinkSync(pathIconIG),    
    fs.unlinkSync(pathIcongithub),
    fs.unlinkSync(line),
    event.messageID
  );
  } catch(e){
    console.log(e)
    return api.sendMessage("Liên Hệ https://www.facebook.com/hanaku.user để biết thêm chi tiết")
  } 
}