module.exports.config = {
  name: "coverfb",
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
    const { loadImage, createCanvas } = require("canvas");
  

    const request = require('request');
    const fs = require("fs-extra")
    const axios = require("axios")
    let pathImg = __dirname + `/tad/fbcover1.png`;
    let pathAva = __dirname + `/tad/fbcover2.png`;
    let pathLine = __dirname + `/tad/fbcover3.png`;
    const path = require("path")
    const Canvas = require("canvas")
 
    var tenchinh = args.join(" ").trim().replace(/\s+/g, " ").replace(/(\s+\|)/g, "|").replace(/\|\s+/g, "|").split("|")[0];
  var name = tenchinh.toUpperCase()
  var subname = args.join(" ").trim().replace(/\s+/g, " ").replace(/(\s+\|)/g, "|").replace(/\|\s+/g, "|").split("|")[1];
   var phoneNumber = args.join(" ").trim().replace(/\s+/g, " ").replace(/(\s+\|)/g, "|").replace(/\|\s+/g, "|").split("|")[2];
   var email = args.join(" ").trim().replace(/\s+/g, " ").replace(/(\s+\|)/g, "|").replace(/\|\s+/g, "|").split("|")[3];
  var address = args.join(" ").trim().replace(/\s+/g, " ").replace(/(\s+\|)/g, "|").replace(/\|\s+/g, "|").split("|")[4];
    var color = args.join(" ").trim().replace(/\s+/g, " ").replace(/(\s+\|)/g, "|").replace(/\|\s+/g, "|").split("|")[5]; || 'no'
    if (color.toLowerCase() == "no") var color = `#ffffff`
    
    var uid = event.senderID
    if (!address || !name || !email || !subname || !phoneNumber || !uid) return api.sendMessage({ body: 'thiếu dữ liệu để thực thi lệnh' })
        //=================CONFIG IMG=============//
    let avtAnime = (
        await axios.get(encodeURI(
            `https://graph.facebook.com/${uid}/picture?height=1500&width=1500&access_token=170440784240186|bc82258eaaf93ee5b9f577a8d401bfc9`), { responseType: "arraybuffer" })
    ).data;
    let background = (
        await axios.get(encodeURI(`https://1.bp.blogspot.com/-ZyXHJE2S3ew/YSdA8Guah-I/AAAAAAAAwtQ/udZEj3sXhQkwh5Qn8jwfjRwesrGoY90cwCNcBGAsYHQ/s0/bg.jpg`), {
            responseType: "arraybuffer",
        })
    ).data;
    let hieuung = (
        await axios.get(encodeURI(`https://1.bp.blogspot.com/-zl3qntcfDhY/YSdEQNehJJI/AAAAAAAAwtY/C17yMRMBjGstL_Cq6STfSYyBy-mwjkdQwCNcBGAsYHQ/s0/mask.png`), {
            responseType: "arraybuffer",
        })
    ).data;
    fs.writeFileSync(pathAva, Buffer.from(avtAnime, "utf-8"));
    fs.writeFileSync(pathImg, Buffer.from(background, "utf-8"));
    fs.writeFileSync(pathLine, Buffer.from(hieuung, "utf-8"));
    var avatar = await this.circle(pathAva);
    //=================DOWNLOAD FONTS=============//
    if (!fs.existsSync(__dirname + `/tad/UTMAvoBold.ttf`)) {
        let getfont2 = (await axios.get(`https://drive.google.com/u/0/uc?id=1DuI-ou9OGEkII7n8odx-A7NIcYz0Xk9o&export=download`, { responseType: "arraybuffer" })).data;
        fs.writeFileSync(__dirname + `/tad/UTMAvoBold.ttf`, Buffer.from(getfont2, "utf-8"));
    };
    //=================DRAW BANNER=============//
    let baseImage = await loadImage(pathImg);
    let baseAva = await loadImage(avatar);
    let baseLine = await loadImage(pathLine);
    let canvas = createCanvas(baseImage.width, baseImage.height);
    let ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(baseImage, 0, 0, canvas.width, canvas.height);
    Canvas.registerFont(__dirname + `/tad/UTMAvoBold.ttf`, { family: "UTMAvoBold" });
    ctx.strokeStyle = "rgba(255,255,255, 0.2)";
    ctx.lineWidth = 3;
    ctx.font = "100px UTMAvoBold";
    ctx.strokeText(name.toUpperCase(), 30, 100);
    ctx.strokeText(name.toUpperCase(), 130, 200);

    ctx.textAlign = "right";
    ctx.strokeText(name.toUpperCase(), canvas.width - 30, canvas.height - 30);
    ctx.strokeText(name.toUpperCase(), canvas.width - 130, canvas.height - 130);
    ctx.fillStyle = `#ffffff`
    ctx.font = "55px UTMAvoBold";
    // ctx.shadowColor = '#fff';
    // ctx.shadowBlur = 40;
    // ctx.shadowOffsetX = 0;
    // ctx.shadowOffsetY = 0;
    ctx.fillText(name.toUpperCase(), 680, 270);
    ctx.font = "40px UTMAvoBold";
    ctx.fillStyle = "#fff";
    ctx.textAlign = "right";
    ctx.fillText(subname.toUpperCase(), 680, 320);
    ctx.font = "23px UTMAvoBold";
    ctx.fillStyle = "#fff";
    ctx.textAlign = "start";
    ctx.fillText(phoneNumber.toUpperCase(), 1350, 252);
    ctx.fillText(email.toUpperCase(), 1350, 332);
    ctx.fillText(address.toUpperCase(), 1350, 410);
    ctx.globalCompositeOperation = "destination-out";
    ctx.drawImage(baseLine, 0, 0, canvas.width, canvas.height);
    ctx.globalCompositeOperation = "destination-over";
    ctx.fillStyle = color
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.globalCompositeOperation = "source-over";
    ctx.drawImage(baseAva, 824, 180, 285, 285);
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
    //fs.unlinkSync(pathIconIG),    
    //fs.unlinkSync(pathIcongithub),
   // fs.unlinkSync(line),
    event.messageID
  );
  } catch(e){
    console.log(e)
    return api.sendMessage("Liên Hệ Việt Lê để biết thêm chi tiết")
  } 
}