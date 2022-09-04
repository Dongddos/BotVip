/*
	NettruyenModules- An unofficial API for http://nettruyenone.com/
	Version 1.0.0
	Made by Thieu Trung Kien in 2022.
*/
/*
-----------------------------------------------------------------
	Modules importing
-----------------------------------------------------------------
*/
const got = require("got"),
	cheerio = require("cheerio"),
	fs = require("fs-extra"),
	axios = require("axios");
module.exports.config = {
	name: "nettruyen",
	version: "1.0.0",
	hasPermssion: 0,
	credits: "Thiệu Trung Kiên",
	description: "",
	commandCategory: "cc",
	usages: "",
	cooldowns: 0
}, module.exports.onLoad = async function() {
	fs.existsSync(__dirname + "/nettruyen") || fs.mkdirSync(__dirname + "/nettruyen", {
		recursive: !0
	})
}, module.exports.run = async function({
	api: e,
	event: t,
	args: n
}) {
	if (!n[0]) return e.sendMessage("Thieu keyword", t.threadID);
	const a = await got(`http://www.nettruyenone.com/tim-truyen?keyword=${encodeURIComponent(n.join(" "))}`),
		r = cheerio.load(a.body),
		i = r("#ctl00_divCenter").find(".Module-170 > div > div > div > div > figure > div > a"),
		o = [];
	for (let e = 0; e < i.length; e++) {
		const t = r(i[e]).attr("title"),
			n = r(i[e]).find("img").attr("data-original").replace("//", "https://"),
			a = r(i[e]).attr("href");
		o.push({
			title: t,
			images: n,
			url: a
		})
	}
	var s = o.length,
		d = 1;
	(d = parseInt(n[1]) || 1) < -1 && (d = 1);
	Math.ceil(s / 5);
	for (var c = "", l = [], h = 5 * (d - 1); h < 5 * (d - 1) + 5 && !(h >= s); h++) {
		const e = o[h].title,
			t = (await axios.get(o[h].images, {
				responseType: "stream"
			})).data;
		l.push(t), c += `[${h+1}].${e}\n\n`
	}
  
	const p = o;
	return e.sendMessage({
		body: c,
		attachment: l
	}, t.threadID, ((e, n) => {
		global.client.handleReply.push({
			name: this.config.name,
			messageID: n.messageID,
			author: t.senderID,
			url: p,
			type: "info"
		})
	}), t.messageID)
}, module.exports.handleReply = async function({
	handleReply: e,
	api: t,
	event: n
}) {
	if (e.author != n.senderID) return t.sendMessage("Cut", n.threadID);
	switch (e.type) {
		case "info": {
			const a = await got(e.url[n.body - 1].url),
				r = cheerio.load(a.body),
				i = r("#ctl00_divCenter > article"),
				o = (r(i).find("h1").text(), []),
				s = r(".list-chapter > nav > ul > li").find(".col-xs-5 > a");
			for (let e = 0; e < s.length; e++) {
				const t = r(s[e]).attr("href");
				o.push(t)
			}
      o.reverse();
			const d = o;
			return t.sendMessage("Hiện tại đang có " + o.length + " chap!\nVui lòng reply số thứ tự để chọn", n.threadID, ((e, t) => {
				global.client.handleReply.push({
					name: this.config.name,
					messageID: t.messageID,
					author: n.senderID,
					chapter: d,
					type: "read"
				})
			}), n.messageID)
		}
		case "read": {
			var a = [],
				r = [];
			const i = await got(e.chapter[n.body - 1]),
				o = cheerio.load(i.body),
				s = o("#ctl00_divCenter > div").find(".reading-detail > div").find("img"),
				d = [];
			for (let e = 0; e < s.length; e++) {
				const t = o(s[e]).attr("data-original").replace("//", "https://");
				d.push(t)
			}
			for (let e in d) await axios({
				method: "get",
				url: `${d[e]}`,
				responseType: "stream",
				headers: {
					Referer: "http://www.nettruyenone.com/",
					Connection: "keep-alive",
					Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
					"Accept-Encoding": "gzip, deflate"
				}
			}).then((function(t) {
				t.data.pipe(fs.createWriteStream(__dirname + `/nettruyen/${e}.jpg`))
			}));
			setTimeout((() => {
				for (let e = 0; e < d.length; e++) a.push(fs.createReadStream(__dirname + `/nettruyen/${e}.jpg`)), r.push(__dirname + `/nettruyen/${e}.jpg`);
				return t.sendMessage({
					body: "ok",
					attachment: a
				}, n.threadID, (() => {
					for (let e of r) fs.unlinkSync(e)
				}))
			}), 10000)
		}
	}
};