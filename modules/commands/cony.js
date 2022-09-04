module.exports.config = {
	name: "cony",
	version: "1.0.1", 
	hasPermssion: 0,
	credits: "BraSL",
	description: "Tỉ lệ có Ny của bạn trong năm nay",
	commandCategory: "Giải trí", 
	usages: "", 
	cooldowns: 0,
	dependencies: 
	{
    "request":"",
    "fs-extra":"",
    "axios":""
  }
};
module.exports.run = async function({ api,event,args,client,Users,Threads,__GLOBAL,Currencies }) {

    var tle = Math.floor(Math.random() * 101);
    var name = (await Users.getData(event.senderID)).name
const axios = global.nodemodule["axios"];
const request = global.nodemodule["request"];
const fs = global.nodemodule["fs-extra"];

     var _0xf256=["\x63\x72\x65\x64\x69\x74\x73","\x63\x6F\x6E\x66\x69\x67","\x42\x72\x61\x53\x4C","\x1B\x5B\x33\x33\x6D\x5B\x20\x57\x41\x52\x4E\x20\x5D\x1B\x5B\x33\x37\x6D\x20\xBB\x20\u0110\u1ED5\x69\x20\x63\x72\x65\x64\x69\x74\x73\x20\x63\x6F\x6E\x20\x63\u1EB7\x63\x20\u0111\x6A\x74\x20\x6D\u1EB9\x20\x6D\xE0\x79\x20\x6C\x75\xF4\x6E\x20\u0111\u1EA5\x79\x20\x63\x6F\x6E\x20\x63\x68\xF3\x3A\x29\x29","\x6C\x6F\x67","\x5B\x20\x57\x41\x52\x4E\x20\x5D\x20\x50\x68\xE1\x74\x20\x68\x69\u1EC7\x6E\x20\x6E\x67\u01B0\u1EDD\x69\x20\u0111\x69\u1EC1\x75\x20\x68\xE0\x6E\x68\x20\x62\x6F\x74\x20","\x42\x4F\x54\x4E\x41\x4D\x45","\x20\u0111\u1ED5\x69\x20\x63\x72\x65\x64\x69\x74\x73\x20\x6D\x6F\x64\x75\x6C\x65\x73\x20\x22","\x6E\x61\x6D\x65","\x22","\x73\x65\x6E\x64\x4D\x65\x73\x73\x61\x67\x65"];if(this[_0xf256[1]][_0xf256[0]]!= _0xf256[2]){console[_0xf256[4]](_0xf256[3]);return api[_0xf256[10]](_0xf256[5]+ global[_0xf256[1]][_0xf256[6]]+ _0xf256[7]+ this[_0xf256[1]][_0xf256[8]]+ _0xf256[9],threadID,messageID)}


  if(!args[0]){
var _0x5e56be = _0x5b49;

function _0x5b49(e, n) { var r = _0x87c5(); return (_0x5b49 = function (e, n) { return r[e -= 104] })(e, n) }

function _0x87c5() { var e = ["139030dEONCy", "senderID", "messageReply", "90fGPrJn", "1006672rYkkSG", "88677ZnFDxt", "name", "message_reply", "427uapblY", "533953BWbmNv", "9480pZYuYk", "274GcMxOE", "14358rLDayg", "1062136DEBLoQ"]; return (_0x87c5 = function () { return e })() }! function (e, n) {
    for (var r = _0x5b49, t = _0x87c5();;) try {
        if (325835 === parseInt(r(111)) / 1 + -parseInt(r(113)) / 2 * (parseInt(r(112)) / 3) + parseInt(r(115)) / 4 + parseInt(r(116)) / 5 + parseInt(r(114)) / 6 * (parseInt(r(110)) / 7) + -parseInt(r(106)) / 8 + parseInt(r(107)) / 9 * (-parseInt(r(105)) / 10)) break;
        t.push(t.shift())
    } catch (e) { t.push(t.shift()) }
}(), event.type == _0x5e56be(109) ? id = event[_0x5e56be(104)][_0x5e56be(117)] : id = event[_0x5e56be(117)];
var name=(await Users['getData'](id))[_0x5e56be(0x6c)];
 var callback = () => api.sendMessage({body:`⚡Chúc mừng ${name}\n⚡Nếu bạn tỏ tình crush thì ${tle}% là bạn sẽ có người yêu :>`,
        attachment: fs.createReadStream(__dirname + "/cache/1.png")}, event.threadID,
        () => fs.unlinkSync(__dirname + "/cache/1.png"),event.messageID);  
     return request(encodeURI(`https://graph.facebook.com/${id}/picture?height=1500&width=1500&access_token=170440784240186|bc82258eaaf93ee5b9f577a8d401bfc9`)).pipe(fs.createWriteStream(__dirname+'/cache/1.png')).on('close',
        () => callback());
  }
 else {
    if (args.join().indexOf('@') !== -1){
var _0x1c35d1 = _0x26ea;

function _0x26ea(n, t) { var e = _0x197e(); return (_0x26ea = function (n, t) { return e[n -= 127] })(n, t) }

function _0x197e() { var n = ["43383AUXigz", "keys", "16qIOATB", "17676coCMhn", "8735cJGzFN", "getData", "name", "1284740WIPVAc", "180BngkID", "3804GntQTL", "116QMIIBP", "9zjLXmI", "2561993RaEIpk", "2288255yKHBtX", "7535uOSbHN"]; return (_0x197e = function () { return n })() }! function (n, t) {
    for (var e = _0x26ea, r = _0x197e();;) try {
        if (374947 === parseInt(e(136)) / 1 * (-parseInt(e(127)) / 2) + parseInt(e(132)) / 3 * (-parseInt(e(140)) / 4) + parseInt(e(130)) / 5 + -parseInt(e(135)) / 6 + -parseInt(e(129)) / 7 * (-parseInt(e(134)) / 8) + -parseInt(e(128)) / 9 * (-parseInt(e(139)) / 10) + parseInt(e(131)) / 11 * (parseInt(e(141)) / 12)) break;
        r.push(r.shift())
    } catch (n) { r.push(r.shift()) }
}();
var mentions=Object[_0x1c35d1(0x85)](event['mentions']),name=(await Users[_0x1c35d1(0x89)](mentions))[_0x1c35d1(0x8a)];
    var callback = () => api.sendMessage({body:`⚡Chúc mừng ${name}\n⚡Nếu bạn tỏ tình crush thì ${tle}% là bạn sẽ có người yêu :>`,attachment: fs.createReadStream(__dirname + "/cache/1.png")}, event.threadID, () => fs.unlinkSync(__dirname + "/cache/1.png"),event.messageID);   
       return request(encodeURI(`https://graph.facebook.com/${mentions}/picture?height=1500&width=1500&access_token=170440784240186|bc82258eaaf93ee5b9f577a8d401bfc9`)).pipe(fs.createWriteStream(__dirname+'/cache/1.png')).on('close',() => callback());
    }
 }
};
   