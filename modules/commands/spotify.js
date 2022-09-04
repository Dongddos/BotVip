'use strict';
module.exports.config = {
    name: 'spotify',
    ver: '1.0.0',
    role: 0,
    author: ['MạnhG'],
    description: 'Phát nhạc thông qua link spotify hoặc từ khoá tìm kiếm.',
    enDesc: 'Play music through spotify or search by keyword.',
    caterory: ['', ''],
    timestamps: 5
};
var rdPath = `spotify` + Math.floor(Math.random() * 99999999);
const { statSync, createReadStream, unlinkSync } = require("node:fs");
var _scMp3 = `https://nguyenmanh.name.vn/api/spotify?url=`;
var _scSearch =`https://nguyenmanh.name.vn/api/spSearch?query=`;
const axios = require('axios');

async function checkSend(linkurl, api, event, global) {
    const { threadID, messageID } = event;
    const apikey = global.config.manhG;
    try {
        api.sendMessage(`Loading, please wait...`, threadID, (err, info) => setTimeout(() => { api.unsendMessage(info.messageID) }, 10000));
       const {data} = await axios.get(_scMp3 + linkurl + '&apikey='+ apikey);
        if (data.status != 200) return api.sendMessage(data.message, threadID);
        let title = data.result.name;
        let link = data.result.preview_audio;
        var path = __dirname + `/cache/${rdPath}.mp3`;
            await global.utils.downloadFile(link, path)
            await api.sendMessage({ body: title, attachment: createReadStream(path) }, threadID, messageID);
            return await unlinkSync(path)
    } catch (e) {
        console.log(e.stack);
        return api.sendMessage(e.message, threadID, messageID);
    }
}
async function sendLinkSearch(linkurl, title, api, event, global) {
    const { threadID, messageID } = event;
    const apikey = global.config.manhG;
    try {
        api.sendMessage(`Loading, please wait...`, threadID, (err, info) => setTimeout(() => { api.unsendMessage(info.messageID) }, 10000));
        var path = __dirname + `/cache/${rdPath}.mp3`;
            await global.utils.downloadFile(linkurl, path)
            await api.sendMessage({ body: title, attachment: createReadStream(path) }, threadID, messageID);
            return await unlinkSync(path)
    } catch (e) {
        console.log(e.message);
        return api.sendMessage(e.message, threadID, messageID);
    }
}

module.exports.onMessage = async function({ event, api, args, global }) {
    const { threadID, messageID, senderID } = event;
    const apikey = global.config.manhG;
    if (args.join(" ").indexOf("https://") == 0) {
        const linkurl = encodeURI(args.join(" "));
        await checkSend(linkurl, api, event, global);
    } else if (args.join(" ") == "") {
        return api.sendMessage("Reply tin nhắn này nhập thời gian tìm kiếm SoundCloud(Là 1 con số 3 < timeSearch < 9)\n\nVí dụ:\n4 -> get những bài nhạc ngắn\n7 -> get những bài nhạc siêu dài", threadID, (err, info) => {
            global.reply.push({
                step: 1,
                name: this.config.name,
                messageID: info.messageID,
                content: {
                    id: senderID,
                    timeSearch: "",
                    keySearch: ""
                }
            })
        }, messageID);
    } else {
        var results = [],
            link = [],
            _title =[],
            msg = "",
            num = 0,
            value;
        const keywordSearch = args.join(" ");
        const {data} = await axios.get(_scSearch + keywordSearch + '&apikey=' + apikey);
        if (data.status != 200) return api.sendMessage(data.message, threadID);
        results = data.result;
        for (let i = 0; i < 6; i++) {
            if (results[i] != undefined) {
                if (results[i].duration.length <= 4){
                    num = num += 1;
                    var title = results[i].name;
                    var url = results[i].preview_audio;
                    var time = results[i].duration;
                    var external_url = results[i].external_urls;
                    link.push(url);
                    _title.push(title);
                    msg += `${num}.《${time}》 ${title}\n☞ External url: ${external_url}\n\n`;
                }
            }
        }
        var bodySend = `»🔎 There are ${link.length} results matching your search keyword:\n\n${msg}» Please reply (feedback) choose one of the above searches.`;
        api.sendMessage({
                body: bodySend
            }, threadID, (error, info) => {
                global.reply.push({
                    step: "reply_bodySend",
                    name: this.config.name,
                    messageID: info.messageID,
                    author: event.senderID,
                    idYT: link,
                    _scTitle: _title
                })
            },
            messageID);
        return;
    }
}

module.exports.onReply = async function({ event, api, args, reply, global }) {
    const { threadID, senderID, messageID, body } = event;
    const apikey = global.config.manhG;

    function number1(x) {
        if (isNaN(x)) {
            return 'Not a Number!';
        }
        return (x < 4 || x > 8);
    }

    function number(x) {
        if (isNaN(x)) {
            return 'Not a Number!';
        }
        return (x < 1 || x > 10);
    }

    const input = body.trim();
    const sendC = (msg, step, content) => api.sendMessage(msg, threadID, (err, info) => {
        global.reply.splice(global.reply.indexOf(reply), 1);
        api.unsendMessage(reply.messageID);
        global.reply.push({
            step: step,
            name: this.config.name,
            messageID: info.messageID,
            content: content
        })
    }, messageID);

    let content = reply.content;
    switch (reply.step) {
        case 1:
            content.timeSearch = input;
            if (number1(body)) return api.sendMessage('Chọn từ 4 -> 8, baby. love uwu ❤️', threadID, messageID);
            sendC("Reply tin nhắn này nhập từ cần tìm kiếm hoặc url audio", 2, content);
            break;

        case 2:
            content.keySearch = input;
            global.reply.splice(global.reply.indexOf(reply), 1);
            api.unsendMessage(reply.messageID);
            let c = content;
            if (c.keySearch.indexOf("https://") == 0) {
                const linkurl = (c.keySearch);
                await checkSend(linkurl, api, event, global);
            } else {
                let results = [],
                    link = [],
                    _title = [],
                    msg = "",
                    num = 0,
                    value;
                const keywordSearch = args.join(" ");
                const {data} = await axios.get(_scSearch + keywordSearch + '&apikey=' + apikey);
                if (data.status != 200) return api.sendMessage(data.message, threadID);
                results = data.result;
                for (let i = 0; i < 6; i++) {
                    if (results[i] != undefined) {
                        if (results[i].duration.length <= c.timeSearch) {
                            num = num += 1;
                            var title = results[i].name;
                            var url = results[i].preview_audio;
                            var time = results[i].duration;
                            var external_url = results[i].external_urls;
                            link.push(url);
                            _title.push(title);
                            msg += `${num}.《${time}》 ${title}\n☞ External url: ${external_url}\n\n`;
                        }
                    }
                }
                var bodySend = `»🔎 There are ${link.length} results matching your search keyword:\n\n${msg}» Please reply (feedback) choose one of the above searches.`;
                api.sendMessage({
                        body: bodySend
                    }, threadID, (error, info) => {
                        global.reply.push({
                            step: "reply_bodySend",
                            name: this.config.name,
                            messageID: info.messageID,
                            author: event.senderID,
                            idYT: link,
                            _scTitle: _title
                        })
                    },
                    messageID);
                return;
            }
            break;

        case "reply_bodySend":
            global.reply.splice(global.reply.indexOf(reply), 1);
            if (number(body)) return api.sendMessage('Choose from 1 -> 10, baby. love uwu ❤️', threadID, messageID);
            api.unsendMessage(reply.messageID);
            await sendLinkSearch(reply.idYT[body - 1], reply._scTitle[body - 1], api, event, global);
            break;

        default:
            break;
    }
}