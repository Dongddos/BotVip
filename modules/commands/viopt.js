module.exports.config = {
    name: "viopt",
    version: "1.0.0",
    hasPermssion: 2,
    credits: "BraSL",
    description: "thuê số đt trên VIOPT.COM",
    commandCategory: "ADMIN",
    usages: "[thuê/check]",
    cooldowns: 3
    
};
module.exports.run = async({api,event,args}) => {
    const fs = global.nodemodule["fs-extra"];
    const request = global.nodemodule["request"];
    const axios = global.nodemodule['axios'];  
    const { threadID, messageID, mentions } = event;
  var token = "2b06f80c2ff6436aab5576461a3bba10";
  switch (args[0]) {
      case "-tt": { 
         return api.sendMessage(`Thông tin thanh toán\n\nBank: Techcombank\nCTK: NGUYEN DUC PHUONG\nSTK: 19036122852011\nNội dung chuyển khoản: GMEFBFFCAMG\n\nMOMO: HUỲNH L VĂN THÀNH\nSTK: 01293243476\nNội dung chuyển khoản: Vietle11\n\nLưu ý: Nạp tối thiểu là 10.000vnd`, event.threadID, event.messageID);
       }
      case "-a": { 
         return api.sendMessage(`List nhà mạng trên VIOPT\n\n ID: 1 ⇏ MOBIFONE\n ID: 2 ⇏ VINAPHONE\n ID: 3 ⇏ VIETTEL\n ID: 4 ⇏ VIETNAMOBILE\n ID: 5 ⇏ ITELECOM`, event.threadID, event.messageID);
       }
         case "-dv": { 
           const res = (await axios.get(`https://api.viotp.com/service/get?token=${token}`)).data
    var count = res.data.length;
      var data = res.data
      var page = 1;
      page = parseInt(args[1]) || 1;
      page < -1 ? page = 1 : "";
      var limit = 25;
      var numPage = Math.ceil(count/limit);
      var msg = ``;
      for(var i = limit*(page - 1); i < limit*(page-1) + limit; i++){
         if(i >= count) break;
        msg += `[ ${i+1} ] - ${data[i].name} | ${data[i].price}\n`;
      }
      msg += `Trang (${page}/${numPage})\nDùng ${global.config.PREFIX}${this.config.name} list <số trang>`;
      return api.sendMessage(msg, event.threadID,event.messageID);
      
        }
       case "-m": {
    const res = await axios.get(`https://api.viotp.com/users/balance?token=${token}`); 
    if (res.data.success == false)  return api.sendMessage(`TOKEN không hợp lệ`, event.threadID, event.messageID);
    var money = res.data.data.balance 
      var success = res.data.success 
      return api.sendMessage(`số tiền hiện có của bạn trên VIOPT là: ${money}`, event.threadID, event.messageID);
 };
       case "-o": {   
          const id = args.join(" ").trim().replace(/\s+/g, " ").replace(/(\s+\|)/g, "|").replace(/\|\s+/g, "|").split("|")[1] || "7"
          const name = args.join(" ").trim().replace(/\s+/g, " ").replace(/(\s+\|)/g, "|").replace(/\|\s+/g, "|").split("|")[2] || "VIETTEL"
        const res = await axios.get(`https://api.viotp.com/request/get?token=${token}&serviceId=${id}&network=${name}`)
          if (res.data.status_code == 401)  return api.sendMessage(`TOKEN không hợp lệ `, event.threadID, event.messageID);
          if (res.data.status_code == -1)  return api.sendMessage(`Nhà mạng không hợp lệ, chỉ chấp nhận: MOBIFONE, VINAPHONE, VIETTEL, VIETNAMOBILE, ITELECOM, METFONE`, event.threadID, event.messageID);
         if (res.data.status_code == -2)  return api.sendMessage(`Số dư quý khách không đủ !`, event.threadID, event.messageID);
          var phone_number = res.data.data.phone_number
          var request_id = res.data.data.request_id
     var money = res.data.data.balance
     return api.sendMessage(`Tạo yêu cầu thành công !\nSĐT: ${phone_number}\nID check: ${request_id}\nSố tiền còn lại: ${money}vnd`, event.threadID, event.messageID);      
   }
      case "-c": {
        
           const id = args.join(" ").trim().replace(/\s+/g, " ").replace(/(\s+\|)/g, "|").replace(/\|\s+/g, "|").split("|")[1];
        const res = await axios.get(`https://api.viotp.com/session/get?requestId=${id}&token=${token}`)
            if (res.data.success == false) { return api.sendMessage(`TOKEN không hợp lệ`, event.threadID, event.messageID);}
            if (res.data.status_code == -2) {return api.sendMessage(`ID không đúng`, event.threadID, event.messageID);}
       var phone = res.data.data.Phone
            var code = res.data.data.Code
          var SmsContent = res.data.data.SmsContent
        var CreatedTime = res.data.data.CreatedTime
          return api.sendMessage(`Check thành công !\nSĐT: ${phone}\nCODE: ${code}\nNội dung: ${SmsContent}\n\nThời gian tạo: ${CreatedTime}`, event.threadID, event.messageID);    
  }
      case "-sd": {
        
           const id = args.join(" ").trim().replace(/\s+/g, " ").replace(/(\s+\|)/g, "|").replace(/\|\s+/g, "|").split("|")[1];
        const sodau = args.join(" ").trim().replace(/\s+/g, " ").replace(/(\s+\|)/g, "|").replace(/\|\s+/g, "|").split("|")[2];
        const res = await axios.get(`https://api.viotp.com/request/get?token=${token}&serviceId=${id}&prefix=${sodau}`)
            if (res.data.success == false)  return api.sendMessage(`TOKEN không hợp lệ `, event.threadID, event.messageID);
          if (res.data.status_code == -1)  return api.sendMessage(`Đầu số muốn lấy không hợp lệ`, event.threadID, event.messageID);
          var phone_number = res.data.data.phone_number
          var request_id = res.data.data.request_id
        var money = res.data.data.balance
     return api.sendMessage(`Tạo yêu cầu thành công !\nSĐT: ${phone_number}\nID check: ${request_id}\nSố tiền còn lại: ${money}vnd`, event.threadID, event.messageID);   
  }
      case "-socu": {
        const id = args.join(" ").trim().replace(/\s+/g, " ").replace(/(\s+\|)/g, "|").replace(/\|\s+/g, "|").split("|")[1];
        const number = args.join(" ").trim().replace(/\s+/g, " ").replace(/(\s+\|)/g, "|").replace(/\|\s+/g, "|").split("|")[2];
        const res = await axios.get(`https://api.viotp.com/request/get?token=${token}&serviceId=${id}&number=${number}`)
            if (res.data.success == false)  return api.sendMessage(`TOKEN không hợp lệ `, event.threadID, event.messageID);
          if (res.data.status_code == -4)  return api.sendMessage(`Hiện không có sẵn số điện thoại phù hợp, vui lòng thử lại sau!`, event.threadID, event.messageID);
          var phone_number = res.data.data.phone_number
          var request_id = res.data.data.request_id
        var money = res.data.data.balance
     return api.sendMessage(`Tạo yêu cầu thành công !\nSĐT: ${phone_number}\nID check: ${request_id}\nSố tiền còn lại: ${money}vnd`, event.threadID, event.messageID);   
  }
     default: {
        return api.sendMessage(`"Bạn có thể dùng: \n» /viopt -m -> xem số tiền \n» /viopt -a -> xem các nhà mạng\n» /viopt -dv -> xem các dịch vụ trên VIOPT\n» /viopt -o -> để thuê sdt\n» /viopt -c -> để check mã code\n» /viopt -sd -> chọn đầu số muốn thuê (vd: 039,098)\n» /viopt -socu -> thuê lại số cũ\n» HDSD: /viopt <case>"`, event.threadID, event.messageID); 
        
        }
       
  };  
}   
