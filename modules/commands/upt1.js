
module.exports.config = {
	name:"upt1",
	version: "1.0.0",
	hasPermssion: 0,
	credits: "Mirai-Team",
	description: "Random ảnh theo api - uptime",
	commandCategory: "system",
	cooldowns: 3,
  dependencies: {
		"pidusage": ""
	}
};
function byte2mb(bytes) {
	const units = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
	let l = 0, n = parseInt(bytes, 10) || 0;
	while (n >= 1024 && ++l) n = n / 1024;
	return `${n.toFixed(n < 10 && l > 0 ? 1 : 0)} ${units[l]}`;
}
module.exports.run = async ({ api, event, args }) => {
const time = process.uptime(),
		hours = Math.floor(time / (60 * 60)),
		minutes = Math.floor((time % (60 * 60)) / 60),
		seconds = Math.floor(time % 60);
  var z_1 = (hours < 10) ? '0' + hours : hours;
    var x_1 = (minutes < 10) ? '0' + minutes : minutes;
    var y_1 = (seconds < 10) ? '0' + seconds : seconds;
    const axios = require('axios')
	const pidusage = await global.nodemodule["pidusage"](process.pid);
	const timeStart = Date.now();
  const fs = require('fs-extra');
   if (!fs.existsSync(__dirname +
        `/tad/SVN-AVENGEANCE.OTF`)) {
        let getfont = (await axios.get(`https://github.com/PLViet/fonts/raw/main/SVN-AVENGEANCE.OTF`, { responseType: "arraybuffer" })).data;
        fs.writeFileSync(__dirname + `/tad/SVN-AVENGEANCE.OTF`, Buffer.from(getfont, "utf-8"));
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

registerFont(__dirname + `/tad/SVN-AVENGEANCE.OTF`, {
      family: "UTM-Cafeta"
    });

 registerFont(__dirname + `/tad/SVN-Astronout.otf`, {
      family: "SVN-Astronout"
    });
  
  let k = args[0];
   if(args[0] == "list"){
    const alime = (await axios.get('https://run.mocky.io/v3/f502ab6a-7fe1-45ea-b2a6-88f8f643b8aa')).data
    var count = alime.listAnime.length;
      var data = alime.listAnime
      var page = 1;
      page = parseInt(args[1]) || 1;
      page < -1 ? page = 1 : "";
      var limit = 20;
      var numPage = Math.ceil(count/limit);
      var msg = ``;
      for(var i = limit*(page - 1); i < limit*(page-1) + limit; i++){
         if(i >= count) break;
        msg += `[ ${i+1} ] - ${data[i].ID} | ${data[i].name}\n`;
      }
      msg += `Trang (${page}/${numPage})\nDùng ${global.config.PREFIX}${this.config.name} list <số trang>`;
      return api.sendMessage(msg, event.threadID,event.messageID);
   }
  if(!k){
  var id = Math.floor(Math.random() * 848) +1
  } else {
    var id = k
  }
 
    const lengthchar = (await axios.get('https://run.mocky.io/v3/f502ab6a-7fe1-45ea-b2a6-88f8f643b8aa')).data
    console.log(lengthchar.length)
  const Canvas = require('canvas');
    let pathImg = __dirname + `/tad/avatar_1111231.png`;
    let pathAva = __dirname + `/tad/avatar_3dsc11.png`;
    let background = (await axios.get(encodeURI(`https://i.imgur.com/XfvlQvF.png`), { responseType: "arraybuffer" })).data;
    fs.writeFileSync(pathImg, Buffer.from(background, "utf-8"));
    let ava = (await axios.get(encodeURI(`${lengthchar[id - 1].imgAnime}`), { responseType: "arraybuffer" })).data;
    fs.writeFileSync(pathAva, Buffer.from(ava, "utf-8"));
    const request = require('request');
    const path = require('path');

  //const a = Math.floor(Math.random() * 820) + 1
  
  
let l1 = await loadImage(pathAva);
    let a = await loadImage(pathImg);
    let canvas = createCanvas(a.width, a.height);
    var ctx = canvas.getContext("2d");
    //ctx.fillStyle = lengthchar[id - 1].colorBg;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    ctx.drawImage(a, 0, 0, canvas.width, canvas.height);
 // ctx.drawImage(l1, 720, -160, 1100, 1100);
     
  ////////////////////////////////////////
   
    ctx.shadowColor = "#b103b9"
    ctx.shadowBlur = 30
    ctx.textAlign = "center";
  ctx.globalCompositeOperation = 'overlay'
    ctx.font = "250px UTM-Cafeta";
    ctx.fillStyle = "#fff";
    ctx.fillText(`${z_1} : ${x_1} : ${y_1}`, canvas.width / 2, 850);
  ctx.restore();
  registerFont(__dirname + `/tad/SVN-Astronout.otf`, {
      family: "SVN-Astronout"
    });
    ctx.save();
    ctx.shadowColor = "#fff"
    ctx.shadowBlur = 30
    ctx.textAlign = 'center'
    ctx.globalCompositeOperation = 'overlay'
    ctx.fillStyle = 'white'
    ctx.font = "230px SVN-Astronout";
    ctx.fillText("BraSL", canvas.width / 2, 1050);
    ctx.restore();
    ctx.save();
    ctx.beginPath();
    const imageBuffer = canvas.toBuffer();
   fs.writeFileSync(pathImg, imageBuffer);
  return api.sendMessage({
    body: `Bot đã hoạt động được ${hours} giờ ${minutes} phút ${seconds} giây.\n\n❯ Tổng người dùng: ${global.data.allUserID.length}\n❯ Tổng Nhóm: ${global.data.allThreadID.length}\n❯ Cpu đang sử dụng: ${pidusage.cpu.toFixed(1)}%\n❯ Ram đang sử dụng: ${byte2mb(pidusage.memory)}\n❯ Ping: ${Date.now() - timeStart}ms\n❯ ID Nhân Vật: ${id}`,
    attachment: fs.createReadStream(pathImg)
  },
    event.threadID,
    () => fs.unlinkSync(pathImg),
    fs.unlinkSync(pathAva),
    event.messageID
  );
}
