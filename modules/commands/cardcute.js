const fonts = "/cache/Play-Bold.ttf"
const downfonts = "https://drive.google.com/u/0/uc?id=1uni8AiYk7prdrC7hgAmezaGTMH5R8gW8&export=download"
const fontsLink = 20
const fontsInfo = 28
const colorName = "#00FF00"
module.exports.config = {
  name: "cardcute",
  version: "2.0.1",
  hasPermssion: 0,
  credits: "D-Jukie mod by Lê Định",
  description: "Tạo card thông tin theo phong cách cute",
  commandCategory: "tạo ảnh",
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
  if ((this.config.credits) != "D-Jukie mod by Lê Định") { return api.sendMessage(`⚡️Phát hiện credits đã bị thay đổi`, event.threadID, event.messageID)}
  let { senderID, threadID, messageID } = event;
  const { loadImage, createCanvas } = require("canvas");
  const request = require('request');
  const fs = global.nodemodule["fs-extra"];
  const axios = global.nodemodule["axios"];
  const Canvas = global.nodemodule["canvas"];
  let pathImg = __dirname + `/cache/1.png`;
  let pathAvata = __dirname + `/cache/2.png`;
  /*                 */
  if(event.type == "message_reply") { uid = event.messageReply.senderID }
    else uid = event.senderID;
    const res = await api.getUserInfoV2(uid); 
  var link = res.avatar
  let getAvatarOne = (await axios.get(link, { responseType: 'arraybuffer' })).data;
  let bg = (
    await axios.get(encodeURI(`https://i.imgur.com/YCKqKyy.png`), {
      responseType: "arraybuffer",
    })
  ).data;
  fs.writeFileSync(pathAvata, Buffer.from(getAvatarOne, 'utf-8'));
  avataruser = await this.circle(pathAvata);
  fs.writeFileSync(pathImg, Buffer.from(bg, "utf-8"));

/*-----------------download----------------------*/
if(!fs.existsSync(__dirname+`${fonts}`)) { 
      let getfont = (await axios.get(`${downfonts}`, { responseType: "arraybuffer" })).data;
       fs.writeFileSync(__dirname+`${fonts}`, Buffer.from(getfont, "utf-8"));
    };
/*---------------------------------------------*/

  let baseImage = await loadImage(pathImg);
  let baseAvata = await loadImage(avataruser);
  let canvas = createCanvas(baseImage.width, baseImage.height);
  let ctx = canvas.getContext("2d");
  ctx.drawImage(baseImage, 0, 0, canvas.width, canvas.height);
  ctx.drawImage(baseAvata, 50, 130, 270, 270);
    var gender = res.gender == 'male' ? "Nam" : res.gender == 'female' ? "Nữ" : "Không công khai";
    var birthday = res.birthday ? `${res.birthday}` : "Đã Ẩn Thông Tin";
    var love = res.relationship_status ? `${res.relationship_status}` : "Độc Thân"
    var location = res.location.name ? `${res.location.name}` : "Đã Ẩn Thông Tin"
  Canvas.registerFont(__dirname+`${fonts}`, {
        family: "Play-Bold"
    });
  ctx.font = `${fontsInfo}px Play-Bold`;
  ctx.fillStyle = "#D3D3D3";
  ctx.textAlign = "start";
  fontSize = 22;
  ctx.fillText(`Full Name : ${res.name}`, 410, 172);
  ctx.fillStyle = "#99CCFF";
  ctx.textAlign = "start";
  fontSize = 22;
  ctx.fillText(`Giới tính: ${gender}`, 410, 208);
ctx.fillStyle = "#FFFFE0";
  ctx.textAlign = "start";
  fontSize = 22;
  ctx.fillText(`Lượt Follow: ${res.follow} người theo dõi`, 410, 244);
  ctx.fillStyle = "#FFE4E1";
  ctx.textAlign = "start";
  fontSize = 22;
  ctx.fillText(`Relationship with: ${love}`, 410, 281);
  ctx.fillStyle = "#9AFF9A";
  ctx.textAlign = "start";
  fontSize = 22;
  ctx.fillText(`Birthday: ${birthday}`, 410, 320);
  ctx.fillStyle = "#FF6A6A";
  ctx.textAlign = "start";
  fontSize = 22;
  ctx.fillText(`Nơi Ở Hiện Tại: ${location}`, 410, 357);
ctx.fillStyle = "#EEC591";
  ctx.textAlign = "start";
  fontSize = 22;
  ctx.fillText(`UID Facebook: ${uid}`, 410, 397);
  ctx.font = `${fontsLink}px Play-Bold`;
  ctx.fillStyle = "#FFBBFF";
  ctx.textAlign = "start";
  fontSize = 23;  
  ctx.fillText(`Link Facebook: ${res.link}`, 30, 450);
  ctx.beginPath();
  const imageBuffer = canvas.toBuffer();
  fs.writeFileSync(pathImg, imageBuffer);
  fs.removeSync(pathAvata);
  
  return api.sendMessage(
    { attachment: fs.createReadStream(pathImg) },
    threadID,
    () => fs.unlinkSync(pathImg),
    messageID
  );
};