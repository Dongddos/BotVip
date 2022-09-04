module.exports.config = {
  name: "cardin4",
  version: "2.0.0",
  hasPermssion: 0,
  credits: "D-Jukie",
  description: "Tạo card thông tin người dùng facebook",
  commandCategory: "Nhóm",
  usages: "",
  cooldowns: 10,
  dependencies: {
    canvas: "",
    axios: "",
    "fs-extra": "",
  },
};

module.exports.circle = async (image) => {
  const jimp = global.nodemodule["jimp"];
  image = await jimp.read(image);
  image.circle();
  return await image.getBufferAsync("image/png");
}
module.exports.run = async function ({ api, event, args, Users }) {
 let { senderID, threadID, messageID } = event;
const { loadImage, createCanvas } = require("canvas");
const request = require('request');
const fs = require("fs-extra")
const axios = require("axios")
const Canvas = require("canvas")
let pathImg = __dirname + `/cache/1.png`;
let pathAvata = __dirname + `/cache/2.png`;
let pathKhung = __dirname + `/cache/3.png`;
let pathAnime = __dirname + `/cache/0.png`;
var avtAnimee = (await axios.get(`https://taoanhdep.van-diendien1.repl.co/`)).data
var id = parseInt(args[0]) || 250
let avtAnime = (await axios.get(encodeURI(`${avtAnimee[id].imgAnime}`), { responseType: "arraybuffer" })).data;
if(event.type == "message_reply") { var uid = event.messageReply.senderID }
else var uid = event.senderID;
const res = await api.getUserInfoV2(uid); 
  var link = res.avatar
  let getAvatarOne = (await axios.get(link, { responseType: 'arraybuffer' })).data;
let bg = (
    await axios.get(encodeURI(`https://i.imgur.com/r7JzqdW.png`), {
      responseType: "arraybuffer",
    })
  ).data;
let khung = (await axios.get(encodeURI(`https://i.imgur.com/FXYZFUd.png`), { responseType: "arraybuffer" }) ).data;
  fs.writeFileSync(pathAvata, Buffer.from(getAvatarOne, 'utf-8'));
  var avataruser = await this.circle(pathAvata);
  fs.writeFileSync(pathImg, Buffer.from(bg, "utf-8"));
  fs.writeFileSync(pathKhung, Buffer.from(khung, "utf-8"));
  fs.writeFileSync(pathAnime, Buffer.from(avtAnime, "utf-8"));
/*-----------------download----------------------*/
if(!fs.existsSync(__dirname+`/cache/Play-Bold.ttf`)) { 
      let getfont = (await axios.get("https://drive.google.com/u/0/uc?id=1uni8AiYk7prdrC7hgAmezaGTMH5R8gW8&export=download", { responseType: "arraybuffer" })).data;
       fs.writeFileSync(__dirname+`/cache/Play-Bold.ttf`, Buffer.from(getfont, "utf-8"));
    };
if(!fs.existsSync(__dirname+`/cache/SVN-Apple.ttf`)) { 
      let getfont = (await axios.get("https://drive.google.com/u/0/uc?id=136jIOEOlCfg4Uk0LclzyC4nLC3ao1SCK&export=download", { responseType: "arraybuffer" })).data;
       fs.writeFileSync(__dirname+`/cache/SVN-Apple.ttf`, Buffer.from(getfont, "utf-8"));
    };
/*---------------------------------------------*/
let baseImage = await loadImage(pathImg);
let baseAvata = await loadImage(avataruser);
let baseKhung = await loadImage(pathKhung);
let baseAnime = await loadImage(pathAnime);
let canvas = createCanvas(baseImage.width, baseImage.height);
let ctx = canvas.getContext("2d");
ctx.drawImage(baseImage, 0, 0, canvas.width, canvas.height);
ctx.globalAlpha = 0.6
ctx.drawImage(baseAnime, 742, 170, 341, 341);
ctx.globalAlpha = 1
ctx.drawImage(baseAvata, 60, 138, 279, 279);
ctx.drawImage(baseKhung, 0, 0, canvas.width, canvas.height);
var birthday = res.birthday ? `${res.birthday}` : "...";
var love = res.relationship_status ? `${res.relationship_status}` : "Độc thân"
var location = res.location.name ? `${res.location.name}` : "..."
var hometown = res.hometown.name ? `${res.hometown.name}` : "..."
Canvas.registerFont(__dirname+`/cache/SVN-Apple.ttf`, { family: "SVN-Apple" });
ctx.font = `80px SVN-Apple`;
ctx.fillStyle = args[1] || '#000000'
ctx.textAlign = "center";
ctx.fillText(`${res.name}`, 670, 150);
var X = 410
Canvas.registerFont(__dirname+`/cache/Play-Bold.ttf`, { family: "Play-Bold" });
ctx.font = `35px Play-Bold`;
ctx.textAlign = "start";
const iconLived = await Canvas.loadImage("https://static.xx.fbcdn.net/rsrc.php/v3/ym/r/N_tq7yNW9DG.png");
ctx.drawImage(iconLived, X, 170+20, 30, 30);
ctx.fillText(`Đến từ ${hometown}`, X+50, 170+20+30);

const iconLive = await Canvas.loadImage("https://static.xx.fbcdn.net/rsrc.php/v3/yG/r/1sW88456A0B.png");
ctx.drawImage(iconLive, X, 220+20, 30, 30);
ctx.fillText(`Sống tại ${location}`, X+50, 240+30);

const iconFl = await Canvas.loadImage("https://static.xx.fbcdn.net/rsrc.php/v3/yv/r/JanwljMyOww.png");
ctx.drawImage(iconFl, X, 270+20, 30, 30);
ctx.fillText(`Có ${res.follow} người theo dõi`, X+50, 290+30);

const iconLove = await Canvas.loadImage("https://static.xx.fbcdn.net/rsrc.php/v3/yq/r/S0aTxIHuoYO.png");
ctx.drawImage(iconLove, X, 320+20, 30, 30);
ctx.fillText(`${love}`, X+50, 340+30);

const iconBirt = await Canvas.loadImage("https://static.xx.fbcdn.net/rsrc.php/v3/yB/r/ODICuZSjkMe.png");
ctx.drawImage(iconBirt, X, 370+20, 30, 30);
ctx.fillText(`Ngày sinh ${birthday}`, X+50, 390+30);
ctx.font = `20px Play-Bold`;
const iconLink = await Canvas.loadImage("https://static.xx.fbcdn.net/rsrc.php/v3/yk/r/lDkqhYEMOUY.png");
ctx.drawImage(iconLink, 22, 470, 30, 30);
ctx.fillText(`Liên kết ${res.link}`, 50+20, 470+20);

ctx.beginPath();
const imageBuffer = canvas.toBuffer();
fs.writeFileSync(pathImg, imageBuffer);
fs.removeSync(pathAvata);
return api.sendMessage({ attachment: fs.createReadStream(pathImg) },threadID,
  () => fs.unlinkSync(pathImg),messageID)
};

 