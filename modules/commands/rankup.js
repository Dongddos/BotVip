module.exports.config = {
    name: "rankup"
    , version: "1.0.1"
    , hasPermssion: 1
    , credits: "Mirai Team"
    , description: "Thông báo rankup cho từng nhóm, người dùng"
    , commandCategory: "system"
    , dependencies: {
        "fs-extra": ""
    }
    , cooldowns: 3
    , envConfig: {
        autoUnsend: !0
        , unsendMessageAfter: 5
    }
}, module.exports.handleEvent = async function({
    api: e
    , event: a
    , Currencies: t
    , Users: n
    , getText: s
}) {
    var {
        threadID: r
        , senderID: o
    } = a;
    const {
        createReadStream: i
        , existsSync: d
        , mkdirSync: u
    } = global.nodemodule["fs-extra"];
    r = String(r), o = String(o);
    const c = global.data.threadData.get(r) || {};
    if (o == global.data.botID) return;
    let l = (await t.getData(o))
        .exp;
    if (l = l += 1, isNaN(l)) return;
    if (void 0 !== c.rankup && 0 == c.rankup) return void await t.setData(o, {
        exp: l
    });
    const g = Math.floor(Math.sqrt(1 + 4 * l / 3 + 1) / 2)
        , m = Math.floor(Math.sqrt(1 + 4 * (l + 1) / 3 + 1) / 2);
    if (void 0 !== c.rankup && 0 == c.rankup | m > g && 1 != m) {
        const t = global.data.userName.get(o) || await n.getNameUser(o);
        var p, h = void 0 === c.customRankup ? msg = s("levelup") : msg = c.customRankup;
        h = h.replace(/\{name}/g, t)
            .replace(/\{level}/g, m), d(__dirname + "/cache/rankup/") && u(__dirname + "/cache/rankup/", {
                recursive: !0
            }), p = d(__dirname + `/cache/rankup/rankup.mp4`) ? {
                body: h
                , attachment: i(__dirname + `/cache/rankup/rankup.mp4`)
                , mentions: [{
                    tag: t
                    , id: o
                }]
            } : {
                body: h
                , mentions: [{
                    tag: t
                    , id: o
                }]
            };
        const l = this.config.name;
        e.sendMessage(p, r, (async function(a, t) {
            return global.configModule[l].autoUnsend ? (await new Promise((e => setTimeout(e, 1e3 * global.configModule[l].unsendMessageAfter))), e.unsendMessage(t.messageID)) : void 0
        }))
    }
    await t.setData(o, {
        exp: l
    })
}, module.exports.languages = {
    vi: {
        on: "bật"
        , off: "tắt"
        , successText: "thành công thông báo rankup!"
        , levelup: "Trình độ chém gió của {name} đã đạt tới level {level}"
    }
    , en: {
        on: "on"
        , off: "off"
        , successText: "success notification rankup!"
        , levelup: "{name}, your keyboard hero level has reached level {level}"
    }
}, module.exports.run = async function({
    api: e
    , event: a
    , Threads: t
    , getText: n
}) {
    const {
        threadID: s
        , messageID: r
    } = a;
    let o = (await t.getData(s))
        .data;
    return void 0 === o.rankup || 0 == o.rankup ? o.rankup = !0 : o.rankup = !1, await t.setData(s, {
        data: o
    }), global.data.threadData.set(s, o), e.sendMessage(`${1==o.rankup?n("on"):n("off")} ${n("successText")}`, s, r)
};
