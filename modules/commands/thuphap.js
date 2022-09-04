module.exports.config = {

 name: "thuphap",

 version: "1.0.0",

 hasPermssion: 0,

 credits: "D-jukie, DuyVuong, ChinhLe",

 description: "Canvas thoi ma?",

 commandCategory: "image",

 usages: "[0 -> 3] | [ 1 -> 3 ] | [Text] | [Text 2]",

 cooldowns: 5

};

module.exports.run = async ({ event, api, args }) => {

    if (this.config.credits != 'D-jukie, DuyVuong, ChinhLe') return;

    let { senderID, threadID, messageID } = event;

    const { loadImage, createCanvas } = require("canvas");

    const request = require("request");

    const fs = require("fs-extra");

    const axios = require("axios");

    let pathImg = __dirname + `/cache/1.png`;

    let pathAva = __dirname + `/cache/2.png`;

    let pathLine = __dirname + `/cache/3.png`;

    let pathTick = __dirname + `/cache/4.png`;

    const path = require("path");

    const Canvas = require("canvas");

    const __root = path.resolve(__dirname, "cache");

    if(!args[0]) return api.sendMessage('Sai cú pháp\n[0 -> 3] | [ 1 -> 3 ] | [Text] | [Text 2]', threadID, messageID);

    /*------------------------Background-----------------------*/

    var dsCover = [{

        tpCover: "https://lh3.googleusercontent.com/-nUwoTGWnfGA/YZjFyVXf7MI/AAAAAAAA1Ug/XX9QE_4WbFMQZaIJrpkDzvoUzg7JkYPbACNcBGAsYHQ/s0/thuphap1.jpg",



        tpColor: "#222222"

    },

    {

        tpCover: "https://lh3.googleusercontent.com/-2ZPI8b5CSv4/YZj-PpDjwKI/AAAAAAAA1U4/UIj7lGXgAAsTDuwQjpZu8WXyLxMUR-S7ACNcBGAsYHQ/s0/thuphap2.jpg",



        tpColor: "#48413a"

    },

    {

        tpCover: "https://lh3.googleusercontent.com/-mUDbRYZ8Cv8/YZkAOAkVIFI/AAAAAAAA1VA/9MtWRZzAqFc0D3I8iORn3bj0f2sRP6bHQCNcBGAsYHQ/s0/thuphap3.jpg",



        tpColor: "#c75a53"

    },

    {

        tpCover: "https://lh3.googleusercontent.com/-pZyh72jJKbo/YZkA0ss2V7I/AAAAAAAA1VI/juO1Wc2Ee24yKDlBDvhoMdMmivKlYeypgCNcBGAsYHQ/s0/thuphap4.jpg",



        tpColor: "#747757"

    },

    ];

    const content = args.join(" ").trim().replace(/\s+/g, " ").replace(/(\s+\|)/g, "|").replace(/\|\s+/g, "|").split("|");

    let background = (

    await axios.get(encodeURI(dsCover[content[0]].tpCover), {

      responseType: "arraybuffer",

     })

    ).data;

    fs.writeFileSync(pathImg, Buffer.from(background, "utf-8"));

    if(!fs.existsSync(__dirname+`/cache/UTM ThuPhap Thien An.ttf`)) { 

      let getfont2 = (await axios.get(`https://doc-0c-7s-docs.googleusercontent.com/docs/securesc/qe9uttu8qtg3mdqnc7r2u3chn2edrk4o/40plia0opeomvgudemfmvvpgdpun2v0l/1657516575000/16814754255549577344/14870807920430039795/13yc7LNHFn59ONiOXqeDvCqCwFaoiqpxb?ax=ACxEAsbLW9BoNL4P77z_MG4QCNyymJex0m_vhLXNIxOEEXjDosPrqyH5S_0Cqkv_JKMzgKVQ8zs-jmfBr1cnAdYnGrSzI9F1CV7kvLlGWm6yUwyMUbTvAl0Nutj1kjYXGal5jM6-6BgIjCPdt8-CjybifI0imUrqS2V_mycG-m-WeyZaswEGxgCf9AYpd7ZxmoLDREAHQj-H_ruyG_uEyOED2lqO-6W9QeAVuf0ndIG0YIDw00kD8LPwrWhdn7zB614AJ3J87Czi9FyK-zfn1tUi7T1jsyxmhhOu2w5n0F8ZG2-zxjvvlNOJ79npcoPGGOgA0rmGTTWpE3ZwvpHKyC8ZADE7dTnqhuDZBxAL1a13QO9-wdDcVFfeH9-31HjI1ML_YQ0jyeCEQpAWrHYywyQtWO68_fsMWGcyM7B64QLdvM5oHppgC0cqXA-gZ6YdD9-jJdnvzeDR8JUoW2FupeL688ZWYTEC328tvSlWoiPzogzVRrIdWYbdS6UTHWzR4ZiVmI8Id6MgKPKZ8Pm-2yQjxND6kEwG4fxvLwwvFgl47_I0MRJtrzujqmU6RD4TlbRTDw9P1ewu01qDpOK9qWC9MEMqYO0F6xuh9NXrTz0j1neprMbggngtqzZfc2zR8vf3Sg5El-dyW5lbJLHY5gR9tPbIW9d4XvgIprCgwbBfhTGfSj3xMVqD4WS71s4rqv-s2yef_fO8BltTfyO8&uuid=f9f3e4dd-b9d5-4ac6-b006-0c45aa52add5&authuser=0&nonce=41ap8sccvr9uq&user=14870807920430039795&hash=i122i4pj5v9rjvq25miom3rh0b7aqj8r`, { responseType: "arraybuffer" })).data;

       fs.writeFileSync(__dirname+`/cache/UTM ThuPhap Thien An.ttf`, Buffer.from(getfont2, "utf-8"));

    };

    let baseImage = await loadImage(pathImg);

    let canvas = createCanvas(baseImage.width, baseImage.height);

    let ctx = canvas.getContext("2d");

    var name = content[0]

    ctx.drawImage(baseImage, 0, 0, canvas.width, canvas.height);

    Canvas.registerFont(__dirname+`/cache/UTM ThuPhap Thien An.ttf`, {

            family: "UTM ThuPhap Thien An"

    });

    ctx.textAlign = "center";

    ctx.fillStyle = dsCover[content[0]].tpColor;

    var q = content[2]

    var p = content[3]

    var n = content[4]

    if (content[1] == '1') {

      var m = 150 - ctx.measureText(q).width;

      if (m < 30) {m = 30}

      if (m > 90) {m = 90}

      ctx.font = m + "px UTM ThuPhap Thien An";

      ctx.fillText(q, canvas.width / 2, canvas.height / 2 +25);

   }

   if (content[1] == '2') {

      var m = 140 - ctx.measureText(q).width;

      if (m < 30) {m = 30}

      if (m > 90) {m = 90}

      ctx.font = m + "px UTM ThuPhap Thien An";

      ctx.fillText(q, canvas.width / 2, canvas.height / 2 - 95);

      ctx.fillText(p, canvas.width / 2, canvas.height / 2 + 110);

   }

   if (content[1] == '3') {

    var m = 130 - ctx.measureText(q).width;

    if (m < 30) {m = 30}

    if (m > 90) {m = 90}

    ctx.font = m + "px UTM ThuPhap Thien An";

    ctx.fillText(q, canvas.width / 2, canvas.height / 2 - 145);

    ctx.fillText(p, canvas.width / 2, canvas.height / 2);

    ctx.fillText(n, canvas.width / 2, canvas.height / 2 + 155);

   }

   const imageBuffer = canvas.toBuffer();

   fs.writeFileSync(pathImg, imageBuffer);

   return api.sendMessage(

     { attachment: fs.createReadStream(pathImg) },

     threadID,messageID

   );

   /* CODER ĐƯỢC CODE BY D-JUKIE VÀ CÁI NÀY ĐƯỢC CODE TRÊN LAWERBOT ĐƯỢC COVER BY DUYVUONG (ADMIN PR0JECT LAWERBOT) */

   /* xin vĩnh biệt cụ nào de/leak code bọn t:)) */

}