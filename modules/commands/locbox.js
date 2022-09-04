module.exports.config = {
  name: "locbox",
  version: "1.0.0",
  hasPermssion: 2,
  credits: "D-Jukie",
  description: "Rời khỏi các nhóm có số thành viên được chỉ định",
  commandCategory: "Admin",
  usages: "[number]",
  cooldowns: 1
}
module.exports. run = async ({ api, event,args, Threads }) => {
  var listbox = global.data.allThreadID
  var members = args[0] || 20
  var count = 0;
  var fail = 0
  var name = [];
  var i = 1;
  var listthread =[]

  for (var groupInfo of listbox) {
    var data =  await Threads.getInfo(groupInfo)
    if(data.participantIDs.length < members) {
      listthread.push(groupInfo);
    }
  }
  for (var id of listthread) {
    if(id != event.threadID) {
      api.removeUserFromGroup(api.getCurrentUserID(), id, function(err) {
        if(err) fail++
        })
      count++
      }
    }
  var msg = 'Lọc thất bại: ' + fail + ' nhóm\nLọc thành công ' + count + ' nhóm dưới ' + members + ' thành viên\n';
  return api.sendMessage(msg, event.threadID, event.messageID)
}